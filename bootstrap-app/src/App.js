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
  Row,
  Col,
  NavDropdown,
} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
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
// Pages
const HomePage = ({ username }) => <h2 className="text-center mb-4">Welcome, {username}!</h2>;
const TutorsPage = () => <h2 className="text-center mb-4">Tutors</h2>;
const ResourcesPage = () => <h2 className="text-center mb-4">Resources</h2>;
const ToolsPage = () => <h2 className="text-center mb-4">Tools</h2>;
const ProfilePage = () => <h2 className="text-center mb-4">Profile</h2>;
// Custom Navbar for Students
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
  const isFeaturesActive = ['/tutors', '/resources', '/tools'].includes(location.pathname);
  const isProfileActive = location.pathname === '/profile';
  return (
    <Navbar
      expand="lg"
      className="shadow-lg"
      style={{
        background: 'linear-gradient(90deg, rgba(72,61,139,1) 0%, rgba(93,109,160,1) 50%, rgba(72,61,139,1) 100%)',
        padding: '15px 30px',
      }}
    >
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
              <NavDropdown.Item as={Link} to="/resources" style={getDropdownItemStyle('/resources')}>
                Resources
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/tools" style={getDropdownItemStyle('/tools')}>
                Tools
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
// Custom Navbar for Tutors
const TutorNavbar = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const getLinkStyle = (path) => ({
    color: location.pathname === path ? '#00FF00' : 'white', // For example, tutors see green as active
    fontWeight: location.pathname === path ? 'bold' : '500',
  });
  const getDropdownItemStyle = (path) => ({
    color: location.pathname === path ? '#00FF00' : 'white',
    backgroundColor: location.pathname === path ? '#333' : '#222',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
  });
  const isFeaturesActive = ['/tutors', '/resources', '/tools'].includes(location.pathname);
  const isProfileActive = location.pathname === '/profile';
  return (
    <Navbar
      expand="lg"
      className="shadow-lg"
      style={{
        background: 'linear-gradient(90deg, rgba(0,100,0,1) 0%, rgba(34,139,34,1) 50%, rgba(0,100,0,1) 100%)',
        padding: '15px 30px',
      }}
    >
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
              <NavDropdown.Item as={Link} to="/resources" style={getDropdownItemStyle('/resources')}>
                Resources
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/tools" style={getDropdownItemStyle('/tools')}>
                Tools
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
  const [role, setRole] = useState(''); // Will be either 'tutor' or 'student'
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
  return (
    <Router>
      <div className="App" style={{ background: '#F7F9FC', minHeight: '100vh', paddingTop: '50px' }}>
        {/* Navbar based on user role */}
        {isAuthenticated && role === 'tutor' && <TutorNavbar setIsAuthenticated={setIsAuthenticated} />}
        {isAuthenticated && role === 'student' && <StudentNavbar setIsAuthenticated={setIsAuthenticated} />}
        {/* Main Content */}
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <Row className="w-100 justify-content-center">
            <Col xs={12} md={6} lg={4}>
              {isAuthenticated ? (
                <Routes>
                  <Route path="/" element={<HomePage username={username} />} />
                  <Route path="/tutors" element={<TutorsPage />} />
                  <Route path="/resources" element={<ResourcesPage />} />
                  <Route path="/tools" element={<ToolsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Routes>
              ) : (
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
                      <Button type="submit" variant="primary" block>
                        Login
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}
export default App;