import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import {
  Container,
  Navbar,
  Nav,
  Button,
  NavDropdown,
  Modal,
} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import TutorAvailability from './tutoravailability'; // Importing TutorAvailability component
import AddEvent from './AddEvent'; // Importing AddEvent component
import SignUp from './components/signUp'; // Importing SignUp component
import LoginForm from './components/login'; // Importing Login component
import PrivateRoute from './components/privateRoute'; // Importing PrivateRoute component

// Dummy authentication function
/*const authenticateUser = (username, password) => {
  if (username === 'tutor' && password === 'pass') {
    return 'tutor';
  }
  if (username === 'student' && password === 'pass') {
    return 'student';
  }
  return null;
}; */

// API calls for Google Calendar and Sheets
const API_BASE_URL = "https://tutorconnect-1u9q.onrender.com";

const addEventToCalendar = async (eventData) => {
  try {
    const response = await fetch('http://localhost:3000/add-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });
    const data = await response.json();
    alert(data.message);
  } catch (error) {
    console.error('Error adding event:', error);
  }
};

const submitAvailability = async (availabilityData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/submit-availability`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(availabilityData),
    });
    const data = await response.json();
    alert(data.message);
  } catch (error) {
    console.error("Error submitting availability:", error);
    alert("Submission failed. Please try again.");
  }
};

// HomePage with Latest Announcements as a Modal Popup.
const HomePage = ({ username, role }) => {
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  return (
    <Container className="mt-4">
      <h2>Welcome, {username}!</h2>
      <p>
        This portal provides quick access to tutor sessions, availability updates, and useful resources.
        Explore the navigation menu to learn more.
      </p>

      <Modal show={showAnnouncement} onHide={() => setShowAnnouncement(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Latest Announcements</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {role === 'student' ? (
            <>
              Check out our <Link to="/tutors">tutors page</Link>,{' '}
              <Link to="/add-event">schedule a tutor session</Link>, and{' '}
              <Link to="/tutor-session-calendar">session calendar</Link>.
            </>
          ) : (
            <>
              Check out our <Link to="/tutors">tutor page</Link>,{' '}
              <Link to="/tutoravailability">tutor availability</Link>, and{' '}
              <Link to="/tutor-session-calendar">tutor session calendar</Link>.
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAnnouncement(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

const TutorsPage = () => (
  <>
    <Container fluid className="mt-4">
      <h2 className="text-center">Tutor Availability Spreadsheet</h2>
      <p className="text-center">
        Below is the up-to-date availability of our tutors. Please refer to this sheet for the most current schedules.
      </p>
    </Container>
    <Container fluid className="p-0">
      <iframe
        src="https://docs.google.com/spreadsheets/d/1bBMPhukDDXlUEuZJ99PH80tUXEsNiSB1Nx39bndzfhE/edit?usp=sharing&widget=true&headers=false"
        width="100%"
        height="600px"
        style={{ border: "1px solid #ccc", borderRadius: "10px" }}
        allowFullScreen
        title="Tutor Availability Spreadsheet"
      ></iframe>
    </Container>
  </>
);

const TutorSessionCalendar = () => (
  <Container fluid className="mt-4">
    <h2 className="text-center">Tutor Session Calendar</h2>
    <p className="text-center">
      Use this calendar to view and schedule tutor sessions. Click on a session for more details.
    </p>
    <Container fluid className="p-0">
      <iframe
        src="https://calendar.google.com/calendar/embed?src=rokuyoshi%40gmail.com&ctz=America/New_York"
        width="100%"
        height="600px"
        style={{ border: "1px solid #ccc", borderRadius: "10px" }}
        allowFullScreen
        title="Tutor Session Calendar"
      ></iframe>
    </Container>
  </Container>
);

const ProfilePage = () => (
  <Container className="mt-4">
    <h2>Your Profile</h2>
    <p>
      Manage your account details here. Update your information, view your session history, and customize your settings.
    </p>
  </Container>
);

const StudentNavbar = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const getLinkStyle = (path) => ({
    color: location.pathname === path ? '#FFD700' : 'white',
    fontWeight: location.pathname === path ? 'bold' : '500',
  });
  const getDropdownItemStyle = (path) => ({
    color: location.pathname === path ? '#FFD700' : 'white',
    backgroundColor: location.pathname === path ? '#555' : '#333',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
  });
  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/"); // Redirect to home
  };
  const isFeaturesActive = ['/tutors', '/add-event', '/tutor-session-calendar'].includes(location.pathname);
  const isProfileActive = location.pathname === '/profile';

  return (
    <Navbar expand="lg" className="shadow-lg" style={{
      background: 'linear-gradient(90deg, rgba(72,61,139,1) 0%, rgba(93,109,160,1) 50%, rgba(72,61,139,1) 100%)',
      padding: '15px 30px',
    }}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ fontSize: '1.8rem', fontWeight: 'bold', color: getLinkStyle('/').color }}>
          Student Portal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" style={getLinkStyle('/')}>Home</Nav.Link>
            <NavDropdown
              title={
                <span style={{ color: isFeaturesActive ? '#FFD700' : 'white', fontWeight: isFeaturesActive ? 'bold' : '500' }}>
                  Features
                </span>
              }
              id="features-dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item as={Link} to="/tutors" style={getDropdownItemStyle('/tutors')}>
                Tutors
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/add-event" style={getDropdownItemStyle('/add-event')}>
                Schedule a Tutor Session
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/tutor-session-calendar" style={getDropdownItemStyle('/tutor-session-calendar')}>
                Tutor Session Calendar
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={
                <span style={{ color: isProfileActive ? '#FFD700' : 'white', fontWeight: isProfileActive ? 'bold' : '500' }}>
                  Profile
                </span>
              }
              id="profile-dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item as={Link} to="/profile" style={getDropdownItemStyle('/profile')}>
                View Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} style={{ color: 'red' }}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const TutorNavbar = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const getLinkStyle = (path) => ({
    color: location.pathname === path ? '#00FF00' : 'white',
    fontWeight: location.pathname === path ? 'bold' : '500',
  });
  const getDropdownItemStyle = (path) => ({
    color: location.pathname === path ? '#00FF00' : 'white',
    backgroundColor: location.pathname === path ? '#333' : '#222',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
  });
  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/"); // Redirect to home
  };

  const isFeaturesActive = ['/tutors', '/tutoravailability'].includes(location.pathname);
  const isProfileActive = location.pathname === '/profile';

  return (
    <Navbar expand="lg" className="shadow-lg" style={{
      background: 'linear-gradient(90deg, rgba(0,100,0,1) 0%, rgba(34,139,34,1) 50%, rgba(0,100,0,1) 100%)',
      padding: '15px 30px',
    }}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ fontSize: '1.8rem', fontWeight: 'bold', color: getLinkStyle('/').color }}>
          Tutor Portal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" style={getLinkStyle('/')}>Home</Nav.Link>
            <NavDropdown
              title={
                <span style={{ color: isFeaturesActive ? '#00FF00' : 'white', fontWeight: isFeaturesActive ? 'bold' : '500' }}>
                  Features
                </span>
              }
              id="features-dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item as={Link} to="/tutors" style={getDropdownItemStyle('/tutors')}>
                Tutors
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/tutoravailability" style={getDropdownItemStyle('/tutoravailability')}>
                Tutor Availability
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/tutor-session-calendar" style={getDropdownItemStyle('/tutor-session-calendar')}>
                Tutor Session Calendar
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={
                <span style={{ color: isProfileActive ? '#00FF00' : 'white', fontWeight: isProfileActive ? 'bold' : '500' }}>
                  Profile
                </span>
              }
              id="profile-dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item as={Link} to="/profile" style={getDropdownItemStyle('/profile')}>
                View Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} style={{ color: 'red' }}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");

useEffect(() => {
  const token = localStorage.getItem('token');
  const storedRole = localStorage.getItem('role');
  const storedUsername = localStorage.getItem('username');
  if (token) {
    setIsAuthenticated(true);
    setRole(storedRole);
    setUsername(storedUsername|| "User");
  }
},[]);
  

  

  return (
    <Router>
    {isAuthenticated && (
        role === "tutor" ? (
            <TutorNavbar setIsAuthenticated={setIsAuthenticated} />
        ) : (
            <StudentNavbar setIsAuthenticated={setIsAuthenticated} />
        )
    )}

    <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<SignUp/>} />

        {/* Private Routes (Protected by PrivateRoute) */}
        <Route path="/" element={<PrivateRoute><HomePage username={username} role={role} /></PrivateRoute>} />
        <Route path="/tutors" element={<PrivateRoute><TutorsPage /></PrivateRoute>} />
        <Route path="/resources" element={
            <PrivateRoute>
                <Container className="mt-4">
                    <h2>Resources</h2>
                    <p>Useful resources will appear here.</p>
                </Container>
            </PrivateRoute>
        } />
        <Route path="/tools" element={
            <PrivateRoute>
                <Container className="mt-4">
                    <h2>Tools</h2>
                    <p>Various tools available will be listed here.</p>
                </Container>
            </PrivateRoute>
        } />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/tutoravailability" element={<PrivateRoute><TutorAvailability /></PrivateRoute>} />
        <Route path="/add-event" element={<PrivateRoute><AddEvent /></PrivateRoute>} />
        <Route path="/tutor-session-calendar" element={<PrivateRoute><TutorSessionCalendar /></PrivateRoute>} />

        {/* Redirect all unknown routes */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
    </Routes>
</Router>
  );
}
export default App;