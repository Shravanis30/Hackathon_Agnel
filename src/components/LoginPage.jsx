import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
  } catch (error) {
    console.error("Error logging in:", error.message);
  }
}


function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const navigate = useNavigate();

    const handleLogin = () => {
        // Add login logic here
        navigate("/home"); // Redirect to Home Page after successful login
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login Data:", formData);
        // Add Firebase login logic here
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-blue-600 text-2xl font-bold mb-4 text-center">
                    Login
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={handleLogin}
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg text-white font-semibold"
                    >
                        Login
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Don’t have an account?{" "}
                        <a href="/register" className="text-blue-600 hover:underline">
                            Register
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
