import { useState, useRef, useEffect } from "react";
import { Form, FormGroup, FormControl, Button, Alert, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [formData, setFormData] = useState({
        role: "student",
        name: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(-1);
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const domains = ["gmail.com", "yahoo.com", "outlook.com", "icloud.com", "hotmail.com"];

    const validateForm = () => {
        const newErrors = {};
        if (!formData.role) newErrors.role = "Please select a role.";
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, email: value });
        setHighlightIndex(-1);
        setShowSuggestions(false);

        const atIndex = value.indexOf("@");
        if (atIndex !== -1) {
            const typedDomain = value.slice(atIndex + 1);
            const username = value.slice(0, atIndex + 1);

            const filteredDomains = domains
                .filter(domain => domain.startsWith(typedDomain))
                .map(domain => username + domain);

            setSuggestions(filteredDomains);
            setShowSuggestions(filteredDomains.length > 0);
        }
    };

    const handleSelect = (suggestion) => {
        setFormData({ ...formData, email: suggestion });
        setShowSuggestions(false);
        setHighlightIndex(-1);
    };

    const handleKeyDown = (e) => {
        if (showSuggestions) {
            if (e.key === "ArrowDown") {
                setHighlightIndex((prevIndex) =>
                    prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
                );
            } else if (e.key === "ArrowUp") {
                setHighlightIndex((prevIndex) =>
                    prevIndex > 0 ? prevIndex - 1 : prevIndex
                );
            } else if (e.key === "Enter") {
                if (highlightIndex >= 0) {
                    handleSelect(suggestions[highlightIndex]);
                    e.preventDefault();
                }
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowSuggestions(false);
                setHighlightIndex(-1);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setServerError("");

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Signup successful. Please log in.");
                navigate("/login");
                setErrors({});
            } else {
                setServerError(data.message || "Signup failed.");
            }
        } catch (error) {
            setServerError("Error occurred during signup.");
        } finally {
            setLoading(false);
        }
    };
   //Login redirect function
    const loginRedirect = () => {
        navigate('/login');
    };
    return (
        <Form onSubmit={handleSubmit} className="p-4 shadow-lg rounded bg-white" style={{ maxWidth: "400px", margin: "auto" }}>
            <h2 className="text-center mb-4">Welcome to TutorConnect!</h2>
            <h2 className="text-center mb-4">Sign Up</h2>

            {serverError && <Alert variant="danger">{serverError}</Alert>}

            {/* Role Selection */}
            <FormGroup className="mb-3">
                <Form.Label>Sign up as</Form.Label>
                <Form.Select
                    name="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    isInvalid={!!errors.role}
                >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>
            </FormGroup>

            {/* Name Field */}
            <FormGroup className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <FormControl
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    isInvalid={!!errors.name}
                    required
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </FormGroup>

            {/* Email Field with Auto-Suggestions */}
            <FormGroup className="mb-3" ref={inputRef} style={{ position: "relative" }}>
                <Form.Label>Email</Form.Label>
                <FormControl
                    type="text"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleEmailChange}
                    onKeyDown={handleKeyDown}
                    isInvalid={!!errors.email}
                    autoComplete="off"
                    required
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>

                {showSuggestions && (
                    <Dropdown.Menu show style={{ position: "absolute", width: "100%", zIndex: 1000 }}>
                        {suggestions.map((suggestion, index) => (
                            <Dropdown.Item
                                key={index}
                                onClick={() => handleSelect(suggestion)}
                                active={index === highlightIndex}
                            >
                                {suggestion}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                )}
            </FormGroup>

            {/* Password Field */}
            <FormGroup className="mb-3">
                <Form.Label>Password</Form.Label>
                <FormControl
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    isInvalid={!!errors.password}
                    required
                />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </FormGroup>

            <Button type="submit" variant="primary" className="w-100" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
            </Button>

            <p className="text-center mt-3">
                Already have an account?{" "}
                <Button variant="link" onClick={loginRedirect}>Login</Button>
            </p>
        </Form>
    );
}

export default SignUp;
