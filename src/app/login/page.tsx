"use client";

import { Button } from "@/components/ui/Button";
import { GlassContainer } from "@/components/ui/GlassContainer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<string>("login");
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "login") {
      // login(formData);
      router.push("/dashboard");
    } else {
      // signUp(formData);
      router.push("/dashboard");
    }
  };

  return (
    <main
      style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <GlassContainer
        style={{ maxWidth: "400px", width: "100%", padding: "40px" }}
      >
        {state === "login" ? (
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h1
              style={{
                fontSize: "2rem",
                marginBottom: "0.5rem",
                fontWeight: 700,
              }}
            >
              Welcome Back
            </h1>
            <p style={{ color: "var(--md-sys-color-secondary)" }}>
              Sign in to access your dashboard
            </p>
          </div>
        ) : (
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h1
              style={{
                fontSize: "2rem",
                marginBottom: "0.5rem",
                fontWeight: 700,
              }}
            >
              Create Account
            </h1>
            <p style={{ color: "var(--md-sys-color-secondary)" }}>
              Sign up to get started with your dashboard
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {state !== "login" && (
            <div>
              <label
                htmlFor="name"
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: 500,
                }}
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="name"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid var(--input-border)",
                  background: "var(--input-background)",
                  color: "var(--input-color)",
                  fontSize: "1rem",
                }}
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 500,
              }}
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="student@university.edu"
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid var(--input-border)",
                background: "var(--input-background)",
                color: "var(--input-color)",
                fontSize: "1rem",
              }}
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 500,
              }}
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid var(--input-border)",
                background: "var(--input-background)",
                color: "var(--input-color)",
                fontSize: "1rem",
              }}
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              fontSize: "0.875rem",
            }}
          >
            <Link
              href="#"
              style={{
                color: "var(--md-sys-color-primary)",
                textDecoration: "none",
              }}
            >
              Forgot password?
            </Link>
          </div>

          <Button
            variant="filled"
            type="submit"
            disabled={isLoading}
            style={{ height: "48px", fontSize: "1rem", marginTop: "0.5rem" }}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div
          style={{
            marginTop: "2rem",
            textAlign: "center",
            fontSize: "0.875rem",
          }}
        >
          <p
            onClick={() =>
              setState((prev) => (prev === "login" ? "register" : "login"))
            }
            style={{ color: "var(--md-sys-color-secondary)" }}
          >
            {state === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <span
              style={{
                color: "var(--md-sys-color-primary)",
                fontWeight: 600,
              }}
            >
              click here
            </span>
          </p>
        </div>
      </GlassContainer>
    </main>
  );
}
