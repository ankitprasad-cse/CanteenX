"use client";

import type { FormEvent, ReactNode } from "react";
import AuthBackground from "./AuthBackground";

type AuthLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  mode: "login" | "signup";
  children?: ReactNode;
  footer?: ReactNode;
};

export default function AuthLayout({
  eyebrow,
  title,
  description,
  mode,
  children,
  footer,
}: AuthLayoutProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        background: "#f5f7f6",
        color: "#17201c",
      }}
    >
      <AuthBackground />

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "rgba(255,255,255,0.76)",
          pointerEvents: "none",
        }}
      />

      <section
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "460px",
            boxSizing: "border-box",
            padding: "38px 40px",
            background: "rgba(255,255,255,0.97)",
            border: "1px solid rgba(23,107,77,0.12)",
            borderRadius: "20px",
            boxShadow: "0 18px 50px rgba(23,43,34,0.12)",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                width: "58px",
                height: "58px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "16px",
                background: "#176b4d",
              }}
            >
              <span
                style={{
                  fontSize: "25px",
                  lineHeight: 1,
                  filter: "grayscale(1) brightness(0) invert(1)",
                }}
              >
                🍴
              </span>
            </div>
          </div>

          {/* Heading */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            <p
              style={{
                margin: "0 0 8px",
                color: "#176b4d",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {eyebrow}
            </p>

            <h1
              style={{
                margin: 0,
                color: "#17201c",
                fontSize: "32px",
                lineHeight: 1.15,
                fontWeight: 750,
                letterSpacing: "-0.025em",
              }}
            >
              {title}
            </h1>

            <p
              style={{
                maxWidth: "370px",
                margin: "12px auto 0",
                color: "#68736e",
                fontSize: "15px",
                lineHeight: 1.6,
              }}
            >
              {description}
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {children}

            <button
              type="submit"
              style={{
                width: "100%",
                minHeight: "48px",
                marginTop: "4px",
                border: "none",
                borderRadius: "10px",
                background: "#176b4d",
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 6px 16px rgba(23,107,77,0.14)",
              }}
            >
              {mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>

          {/* Footer */}
          {footer && (
            <div
              style={{
                marginTop: "24px",
                paddingTop: "20px",
                borderTop: "1px solid #e7ebe9",
                textAlign: "center",
                color: "#68736e",
                fontSize: "14px",
                lineHeight: 1.5,
              }}
            >
              {footer}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}