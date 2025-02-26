import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });

const [error, setError] = useState({});

const navigate = useNavigate();
const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
    }
    if (!formData.password.trim()) {
        newErrors.password = 'Password is required';
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
    };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
        console.log('Login Data:', formData);
        return;
    }
    //TODO: Backend login logic here
    // Define endpoint
    try {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        }); 
        const data = await response.json();
        if (response.ok) {
            console.log('Login successful:', data);
            // Clear any previous errors
            setError({});
            // Redirect to home page after successful login
            navigate('/');
        } else {
            // Handle login failure
            console.error('Login failed:', data);
            setError({server: data.message});
        }  
    } catch (error) {
        // Handle login error (request error)
        console.error('Error during login attempt:', error);
        setError({server: 'Failed to login'});
    }    
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      {error.email && <p>{error.email}</p>}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      {error.password && <p>{error.password}</p>}
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
