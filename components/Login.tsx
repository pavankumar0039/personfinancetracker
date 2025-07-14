"use client";

import { useState } from "react";

type Props = {
    onSubmit: (data: {
        name?: string;
        email: string;
        password: string;
        type: string;
    }) => void;
};

const Login = ({ onSubmit }: Props) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const toggleMode = () => {
        setIsLogin((prev) => !prev);
        setFormData({ name: "", email: "", password: "" });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { name, email, password } = formData;

        const dataToSend = {
            email,
            password,
            ...(isLogin ? {} : { name }),
            type: isLogin ? "login" : "signup",
        };

        onSubmit(dataToSend);
    };

    return (
        <div className="flex min-h-screen items-center justify-center ">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    {isLogin ? "Login to Your Account" : "Create a New Account"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>

                <div className="text-center mt-4">
                    {isLogin ? (
                        <p>
                            Don’t have an account?{" "}
                            <button
                                type="button"
                                onClick={toggleMode}
                                className="text-blue-600 hover:underline"
                            >
                                Sign Up
                            </button>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={toggleMode}
                                className="text-blue-600 hover:underline"
                            >
                                Login
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
