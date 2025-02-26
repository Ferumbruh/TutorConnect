import React, { useState } from 'react';
import {
  Container,
  Navbar,
  Nav,
  Button,
  Form,
  FormGroup,
  FormControl,
  Alert,
  Card,
  NavDropdown,
  Modal,
} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import TutorAvailability from './tutoravailability'; // Importing TutorAvailability component
import AddEvent from './AddEvent'; // Importing AddEvent component

// Dummy authentication function
const authenticateUser = (username, password) => {
  if (username === 'tutor' && password === 'pass') {
    return 'tutor';
  }
  if (username === 'student' && password === 'pass') {
    return 'student';
  }
  return null;
};

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
  const getLinkStyle = (path) => ({
    color: location.pathname === path ? '#FFD700' : 'white',
    fontWeight: location.pathname === path ? 'bold' : '500',
  });
  const getDropdownItemStyle = (path) => ({
    color: location.pathname === path ? '#FFD700' : 'white',
    backgroundColor: location.pathname === path ? '#555' : '#333',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
  });
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
              <NavDropdown.Item onClick={() => setIsAuthenticated(false)} style={{ color: 'red' }}>
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
  const getLinkStyle = (path) => ({
    color: location.pathname === path ? '#00FF00' : 'white',
    fontWeight: location.pathname === path ? 'bold' : '500',
  });
  const getDropdownItemStyle = (path) => ({
    color: location.pathname === path ? '#00FF00' : 'white',
    backgroundColor: location.pathname === path ? '#333' : '#222',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
  });
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
              <NavDropdown.Item onClick={() => setIsAuthenticated(false)} style={{ color: 'red' }}>
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(''); // 'tutor' or 'student'

  const handleLogin = (e) => {
    e.preventDefault();
    const userRole = authenticateUser(username, password);
    if (userRole) {
      setIsAuthenticated(true);
      setRole(userRole);
      setShowAlert(false);
    } else {
      setShowAlert(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <Container
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}
      >
        <h1 className="text-center mb-4" style={{ fontSize: '3rem', fontWeight: 'bold' }}>
          TutorConnect
        </h1>
        <Card className="shadow-lg p-4">
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            {showAlert && (
              <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                Invalid username or password. Please try again.
              </Alert>
            )}
            <Form onSubmit={handleLogin}>
              <FormGroup controlId="username" className="mb-3">
                <FormControl
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup controlId="password" className="mb-3">
                <FormControl
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormGroup>
              <Button type="submit" variant="primary">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Router>
      {role === 'tutor' ? <TutorNavbar setIsAuthenticated={setIsAuthenticated} /> : <StudentNavbar setIsAuthenticated={setIsAuthenticated} />}
      <Routes>
        <Route path="/" element={<HomePage username={username} role={role} />} />
        <Route path="/tutors" element={<TutorsPage />} />
        <Route path="/resources" element={
          <Container className="mt-4">
            <h2>Resources</h2>
            <p>Useful resources will appear here.</p>
          </Container>
        } />
        <Route path="/tools" element={
          <Container className="mt-4">
            <h2>Tools</h2>
            <p>Various tools available will be listed here.</p>
          </Container>
        } />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/tutoravailability" element={<TutorAvailability />} /> 
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/tutor-session-calendar" element={<TutorSessionCalendar />} />
      </Routes>
    </Router>
  );
}

export default App;
