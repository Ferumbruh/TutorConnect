import { useState } from 'react';
import { Form, FormGroup, FormControl, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LoginForm({ setIsAuthenticated, setRole, setUsername }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setServerError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('username', data.name);

        setIsAuthenticated(true);


        console.log('login successful:', data);

        setRole(data.role);
        setUsername(data.name);
        
        navigate('/');
      } else {
        setServerError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setServerError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const signupRedirect = () => {
    navigate('/signup');
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 shadow-lg rounded bg-white" style={{ maxWidth: "400px", margin: "auto" }}>
      <h2 className="text-center mb-4">Welcome to TutorConnect!</h2>
      <h2 className="text-center mb-4">Login</h2>
      

      {serverError && <Alert variant="danger">{serverError}</Alert>}

      {/* Email Field */}
      <FormGroup controlId="email" className="mb-3">
        <Form.Label>Email</Form.Label>
        <FormControl
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          isInvalid={!!errors.email}
          required
        />
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
      </FormGroup>

      {/* Password Field */}
      <FormGroup controlId="password" className="mb-3">
        <Form.Label>Password</Form.Label>
        <FormControl
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          isInvalid={!!errors.password}
          required
        />
        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
      </FormGroup>

      <Button type="submit" variant="primary" className="w-100" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </Button>

      <p className="text-center mt-3">
        Don't have an account?{' '}
        <Button variant="link" onClick={signupRedirect}>
          Sign up
        </Button>
      </p>
    </Form>
  );
}

export default LoginForm;
