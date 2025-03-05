const express = require('express');
const path = require('path');
const { google } = require('googleapis');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const authRoutes = require('./middleware/authRoutes');
const app = express();


// Configure CORS to allow requests only from your frontend
const corsOptions = {
  origin: ["https://tutorconnectfrontend.onrender.com", "http://localhost:3001"],
  methods: "GET,POST",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Google OAuth2 Client Setup for Calendar API
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://tutorconnect-1u9q.onrender.com/auth/callback"
);

// Google Authentication with Account
app.get('/check-auth', (req, res) => {
  if (oauth2Client.credentials && oauth2Client.credentials.access_token) {
    res.json({ authenticated: true });
  } else {
    res.json({ authenticated: false });
  }
});

// Google Authentication Route
app.get('/auth', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar'],
  });
  res.redirect(authUrl);
});

// Callback after Google Authentication
app.get('/auth/callback', async (req, res) => {
  try {
    const code = req.query.code;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Redirect back to AddEvent.js page (frontend)
    res.redirect('https://tutorconnectfrontend.onrender.com/add-event');
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).send('Authentication failed');
  }
});

// Route to handle adding events to Google Calendar
const { DateTime } = require('luxon'); // Import Luxon for better time handling

app.post('/add-event', async (req, res) => {
  console.log('Received event data:', req.body);

  if (!oauth2Client.credentials || !oauth2Client.credentials.access_token) {
    return res.status(400).json({ error: 'User not authenticated' });
  }

  const { title, startDateTime, endDateTime, description, location } = req.body;

  // Convert start and end time to UTC
  const start = DateTime.fromISO(startDateTime, { zone: "local" }).toUTC().toISO();
  const end = DateTime.fromISO(endDateTime, { zone: "local" }).toUTC().toISO();

  if (!start || !end) {
    return res.status(400).json({ error: 'Invalid date format' });
  }

  const event = {
    summary: title,
    location: location || 'Online',
    description: description || 'No description',
    start: {
      dateTime: start, // Send UTC time
      timeZone: 'UTC', // Explicitly set UTC
    },
    end: {
      dateTime: end,
      timeZone: 'UTC',
    },
  };

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  try {
    await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });
    res.json({ message: 'Event created successfully' });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Google Sheets API
const sheets = google.sheets('v4');

// Route to handle tutor availability submission
app.post('/submit-availability', async (req, res) => {
  const { name, subject, 
          sunday_start, sunday_end, 
          monday_start, monday_end, 
          tuesday_start, tuesday_end, 
          wednesday_start, wednesday_end, 
          thursday_start, thursday_end, 
          friday_start, friday_end, 
          saturday_start, saturday_end } = req.body;

  const convertTo12HourFormat = (time) => {
    if (!time) return ""; 
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const formatAvailability = (start, end) => {
    return start && end ? `${convertTo12HourFormat(start)} - ${convertTo12HourFormat(end)}` : "Not Available";
  };

  const tutorEntry = [
    `${name} - ${subject}`,
    formatAvailability(sunday_start, sunday_end),
    formatAvailability(monday_start, monday_end),
    formatAvailability(tuesday_start, tuesday_end),
    formatAvailability(wednesday_start, wednesday_end),
    formatAvailability(thursday_start, thursday_end),
    formatAvailability(friday_start, friday_end),
    formatAvailability(saturday_start, saturday_end)
  ];

  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, 'credentials.json'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const authClient = await auth.getClient();
    const spreadsheetId = process.env.SPREADSHEET_ID;

    await sheets.spreadsheets.values.append({
      auth: authClient,
      spreadsheetId,
      range: 'Sheet1!A:H',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [tutorEntry],
      },
    });

    res.json({ message: 'Availability added successfully' });
  } catch (error) {
    console.error('Error updating spreadsheet:', error);
    res.status(500).json({ error: 'Failed to update spreadsheet' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
