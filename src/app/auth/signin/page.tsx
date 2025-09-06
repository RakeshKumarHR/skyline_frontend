"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Input from "@/components/atoms/input";
import Button from "@/components/atoms/button";
import MovieIcon from "@/assets/movie";
import Typography from "@/components/atoms/typography";
import { TypographyVariant } from "../../../../enums/typography";
import RegisterModal from "./register";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        // Check if the error indicates user not found (404-like scenario)
        if (
          res.error.includes("Invalid credentials") ||
          res.error.includes("User not found")
        ) {
          setShowRegisterModal(true);
        } else {
          setError("Invalid email or password. Please try again.");
        }
      } else {
        router.push("/movies");
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        setShowRegisterModal(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (name: string) => {
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Register the user
      await axios.post("http://localhost:8000/api/auth/register", {
        name: name.trim(),
        email,
        password,
      });

      // Close the modal
      setShowRegisterModal(false);

      // Automatically sign in the user after registration
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(
          "Registration successful, but sign-in failed. Please try logging in again."
        );
      } else {
        router.push("/home");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      setShowRegisterModal(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowRegisterModal(false);
    setError("");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 ">
      <div className="bg-white rounded-2xl shadow-xl p-4 w-full max-w-sm">
        <div className="flex justify-center mb-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <MovieIcon className="h-4 w-4" />
          </div>
        </div>

        <div className="text-center mb-2">
          <Typography className="font-SemiBold">Skyline Cinema</Typography>
          <Typography
            className="text-gray-500"
            variant={TypographyVariant.Caption}
          >
            Sign in to access our movie catalog
          </Typography>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-lg">
            <Typography className="text-[10px] text-red-600">
              {error}
            </Typography>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-2">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />

          <Button
            type="submit"
            className="w-full"
            label={isLoading ? "Signing In..." : "Sign In"}
            onClick={handleLogin}
            disabled={isLoading}
          />
        </form>
      </div>

      {showRegisterModal && <RegisterModal onSubmit={handleRegister} />}
    </div>
  );
}
