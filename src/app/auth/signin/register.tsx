"use client";
import Button from "@/components/atoms/button";
import Input from "@/components/atoms/input";
import Typography from "@/components/atoms/typography";
import { JSX, useState } from "react";

interface RegisterProps {
  onSubmit: (name: string) => void;
  onClose?: () => void;
  isLoading?: boolean;
}

export default function RegisterModal({
  onSubmit,
  onClose,
  isLoading = false,
}: RegisterProps): JSX.Element {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  const handleClose = () => {
    if (onClose && !isLoading) {
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isLoading) {
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mx-4 gap-4 flex flex-col">
        <div className="flex justify-between items-center">
          <Typography className="text-xl font-semibold">
            Complete Registration
          </Typography>
          {onClose && !isLoading && (
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isLoading}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        <Typography className="text-sm text-gray-600">
          We couldn't find an account with this email. Please enter your name to
          create a new account.
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
            disabled={isLoading}
          />

          <div className="flex gap-3">
            {onClose && (
              <Button
                type="button"
                label="Cancel"
                onClick={handleClose}
                className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
                disabled={isLoading}
              />
            )}
            <Button
              type="submit"
              label={isLoading ? "Creating Account..." : "Create Account"}
              className="flex-1"
              disabled={isLoading || !name.trim()}
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
