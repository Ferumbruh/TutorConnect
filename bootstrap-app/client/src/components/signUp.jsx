import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [formData, setFormData] = useState({
        //role defaults to student, dropdown menu for role selection
        role: 'student',
        name: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState({});
    const [suggestions, setSuggestions] = useState([]); 
    // Controls domain auto-suggestion dropdown
    const [showSuggestions, setShowSuggestions] = useState(false);
    // Tracks highlighted suggestion
    const [highlightIndex, setHighlightIndex] = useState(-1); 
    // Reference for click detection
    const inputRef = useRef(null); 
    // Navigation hook, redirects after signup
    const navigate = useNavigate();

// Array of common email domains
    const domains = ["gmail.com", "yahoo.com", "outlook.com", "icloud.com", "hotmail.com"];

    // Validates the form before submission
    const validateForm = () => {
        const newErrors = {};
        if (!formData.role) {
            newErrors.role = "Please select a role.";
        }
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }
        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handles email input changes (for auto-suggestions)
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, email: value });
        setHighlightIndex(-1); 

        const atIndex = value.indexOf("@");

        if (atIndex !== -1) {
            const typedDomain = value.slice(atIndex + 1);
            const username = value.slice(0, atIndex + 1);

            const filteredDomains = domains
                .filter(domain => domain.startsWith(typedDomain))
                .map(domain => username + domain);

            setSuggestions(filteredDomains);
            setShowSuggestions(filteredDomains.length > 0);
        } else {
            setShowSuggestions(false);
        }
    };

    // Handles selecting a suggestion
    const handleSelect = (suggestion) => {
        setFormData({ ...formData, email: suggestion });
        setShowSuggestions(false);
        setHighlightIndex(-1);
    };

    // Handles keyboard navigation for auto-suggestions
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

    // Close suggestions if clicking outside
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

    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        console.log("Signup Data:", formData);

        // TODO: Backend signup logic here
        // Define endpoint for request
        try {
        const response = await fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
       if(response.ok){
        console.log("Signup successful:", data);
        // Clear any previous errors
        setError({});
        // Redirect to home page after successful signup
        navigate("/login");
       }else{
        // Handle signup failure
        console.log("Signup failed:", data);
        setError({ server: data.message });
       }
    } catch (error) {
        // Handle signup error (request error)
        console.error("Error during signup attempt:", error);
        setError({ server: "Error occurred during signup" });
    }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
             {/* Role Selection Dropdown */}
      <label htmlFor="role">Sign up as:</label>
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="Student">Student</option>
        <option value="Tutor">Tutor</option>
      </select>
      {error.role && <p>{error.role}</p>}

            {/* NAME FIELD */}
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                placeholder="Enter Name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {error.name && <p>{error.name}</p>}

            {/* EMAIL FIELD WITH AUTO-SUGGEST */}
            <div ref={inputRef} style={{ position: "relative" }}>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    placeholder="Enter Email"
                    name="email"
                    value={formData.email}
                    onChange={handleEmailChange}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    required
                    style={{ width: "100%", padding: "8px" }}
                />
                {showSuggestions && (
                    <div
                        style={{
                            position: "absolute",
                            background: "white",
                            border: "1px solid #ccc",
                            width: "100%",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            zIndex: 1000,
                            maxHeight: "150px",
                            overflowY: "auto",
                        }}
                    >
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                onClick={() => handleSelect(suggestion)}
                                style={{
                                    padding: "10px",
                                    cursor: "pointer",
                                    borderBottom: "1px solid #eee",
                                    backgroundColor: highlightIndex === index ? "#f0f0f0" : "white",
                                }}
                                onMouseEnter={() => setHighlightIndex(index)}
                                onMouseLeave={() => setHighlightIndex(-1)}
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {error.email && <p>{error.email}</p>}

            {/* PASSWORD FIELD */}
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            {error.password && <p>{error.password}</p>}
            {error.server && <p>{error.server}</p>}
            <br />
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignUp;
