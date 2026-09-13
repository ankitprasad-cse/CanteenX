"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";

const styles: Record<string, CSSProperties> = {
  page: {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    overflow: "hidden",
    background: "#f5f7f6",
    color: "#17201c",
  },

  backgroundCircle1: {
    position: "absolute",
    width: "430px",
    height: "430px",
    borderRadius: "50%",
    background: "rgba(23, 107, 77, 0.065)",
    top: "-190px",
    left: "-110px",
    pointerEvents: "none",
  },

  backgroundCircle2: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "rgba(23, 107, 77, 0.045)",
    top: "80px",
    right: "14%",
    pointerEvents: "none",
  },

  backgroundCircle3: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "rgba(23, 107, 77, 0.05)",
    right: "-230px",
    bottom: "-260px",
    pointerEvents: "none",
  },

  line: {
    position: "absolute",
    width: "140%",
    height: "1px",
    left: "-20%",
    background: "rgba(23, 107, 77, 0.06)",
    transform: "rotate(-16deg)",
    top: "42%",
    pointerEvents: "none",
  },

  content: {
    position: "relative",
    zIndex: 2,
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    padding: "28px 20px",
  },

  card: {
    width: "100%",
    maxWidth: "460px",
    boxSizing: "border-box",
    padding: "38px 36px",
    background: "rgba(255, 255, 255, 0.98)",
    border: "1px solid rgba(23, 107, 77, 0.12)",
    borderRadius: "20px",
    boxShadow: "0 18px 50px rgba(23, 43, 34, 0.12)",
    textAlign: "center",
  },

  logoWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "16px",
  },

  logo: {
    width: "54px",
    height: "54px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "15px",
    background: "#176b4d",
  },

  logoText: {
    fontSize: "23px",
    lineHeight: 1,
    filter: "grayscale(1) brightness(0) invert(1)",
  },

  header: {
    marginBottom: "28px",
  },

  eyebrow: {
    margin: "0 0 7px",
    color: "#176b4d",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },

  title: {
    margin: 0,
    color: "#17201c",
    fontSize: "30px",
    lineHeight: 1.2,
    fontWeight: 700,
    letterSpacing: "-0.02em",
  },

  description: {
    maxWidth: "360px",
    margin: "10px auto 0",
    color: "#68736e",
    fontSize: "14px",
    lineHeight: 1.55,
  },

  stepLabel: {
    color: "#26332d",
    fontSize: "13px",
    fontWeight: 600,
    marginBottom: "10px",
    textAlign: "left",
  },

  roleSelector: {
    display: "flex",
    background: "#eef3f0",
    borderRadius: "12px",
    padding: "4px",
    marginBottom: "24px",
    gap: "4px",
  },

  roleButton: {
    flex: 1,
    height: "40px",
    border: "none",
    borderRadius: "9px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.15s ease",
  },

  actionsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  primaryButton: {
    width: "100%",
    height: "46px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    border: "none",
    borderRadius: "10px",
    background: "#176b4d",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
    textDecoration: "none",
    boxShadow: "0 6px 16px rgba(23, 107, 77, 0.14)",
  },

  secondaryButton: {
    width: "100%",
    height: "46px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    border: "1px solid rgba(23, 107, 77, 0.25)",
    borderRadius: "10px",
    background: "#ffffff",
    color: "#176b4d",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
    textDecoration: "none",
  },

  footer: {
    marginTop: "26px",
    paddingTop: "19px",
    borderTop: "1px solid #e7ebe9",
    color: "#68736e",
    fontSize: "13px",
  },
};

export default function WelcomePage() {
  const [role, setRole] = useState<"STUDENT" | "STAFF">("STUDENT");

  const getRoleButtonStyle = (buttonRole: "STUDENT" | "STAFF"): CSSProperties => {
    const isActive = role === buttonRole;
    return {
      ...styles.roleButton,
      background: isActive ? "#ffffff" : "transparent",
      color: isActive ? "#176b4d" : "#68736e",
      boxShadow: isActive ? "0 2px 6px rgba(23, 43, 34, 0.08)" : "none",
    };
  };

  const roleParam = role.toLowerCase();

  return (
    <main style={styles.page}>
      {/* Background elements */}
      <div style={styles.backgroundCircle1} />
      <div style={styles.backgroundCircle2} />
      <div style={styles.backgroundCircle3} />
      <div style={styles.line} />

      <section style={styles.content}>
        <div style={styles.card}>
          {/* Logo */}
          <div style={styles.logoWrapper}>
            <div style={styles.logo}>
              <span style={styles.logoText}>🍴</span>
            </div>
          </div>

          {/* Header */}
          <header style={styles.header}>
            <p style={styles.eyebrow}>Campus Canteen</p>
            <h1 style={styles.title}>Welcome to CanteenX</h1>
            <p style={styles.description}>
              Fast ordering, pickup verification, and order tracking for your campus canteen.
            </p>
          </header>

          {/* Step 1: Role Selection */}
          <p style={styles.stepLabel}>Select your account type</p>
          <div style={styles.roleSelector}>
            <button
              type="button"
              style={getRoleButtonStyle("STUDENT")}
              onClick={() => setRole("STUDENT")}
            >
              Student
            </button>
            <button
              type="button"
              style={getRoleButtonStyle("STAFF")}
              onClick={() => setRole("STAFF")}
            >
              Staff
            </button>
          </div>

          {/* Step 2: Action Selection */}
          <div style={styles.actionsWrapper}>
            <Link
              href={`/login?role=${roleParam}`}
              style={styles.primaryButton}
            >
              Log in as {role === "STUDENT" ? "Student" : "Staff"}
            </Link>

            <Link
              href={`/signup?role=${roleParam}`}
              style={styles.secondaryButton}
            >
              Sign up as {role === "STUDENT" ? "Student" : "Staff"}
            </Link>
          </div>

          <div style={styles.footer}>
            Smart Campus Food Services &copy; 2026
          </div>
        </div>
      </section>
    </main>
  );
}