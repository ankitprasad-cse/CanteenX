"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type CSSProperties, type FormEvent } from "react";

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
    textAlign: "center",
    marginBottom: "24px",
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

  roleSelector: {
    display: "flex",
    background: "#eef3f0",
    borderRadius: "12px",
    padding: "4px",
    marginBottom: "20px",
    gap: "4px",
  },

  roleButton: {
    flex: 1,
    height: "38px",
    border: "none",
    borderRadius: "9px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.15s ease",
  },

  errorContainer: {
    padding: "12px 14px",
    background: "#fdf2f2",
    border: "1px solid #f8b4b4",
    borderRadius: "9px",
    color: "#9b1c1c",
    fontSize: "13px",
    lineHeight: 1.4,
    marginBottom: "16px",
  },

  fields: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
  },

  label: {
    color: "#26332d",
    fontSize: "13px",
    fontWeight: 600,
  },

  input: {
    width: "100%",
    height: "46px",
    boxSizing: "border-box",
    padding: "11px 13px",
    border: "1px solid #d9e1dd",
    borderRadius: "9px",
    background: "#ffffff",
    color: "#17201c",
    fontSize: "14px",
    outline: "none",
  },

  button: {
    width: "100%",
    height: "48px",
    marginTop: "2px",
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

  footer: {
    marginTop: "24px",
    paddingTop: "19px",
    borderTop: "1px solid #e7ebe9",
    textAlign: "center",
    color: "#68736e",
    fontSize: "14px",
    lineHeight: 1.5,
  },

  link: {
    color: "#176b4d",
    fontWeight: 700,
    textDecoration: "none",
  },
};

interface AuthResponse {
  error?: string;
  success?: boolean;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An unexpected error occurred. Please try again.";
}

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"STUDENT" | "STAFF">("STUDENT");
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const roleQuery = params.get("role");
      if (roleQuery === "staff") {
        setRole("STAFF");
      } else if (roleQuery === "student") {
        setRole("STUDENT");
      }
    }
  }, []);

  const handleRoleChange = (newRole: "STUDENT" | "STAFF") => {
    if (newRole !== role) {
      setRole(newRole);
      setIdentifier("");
      setError("");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedIdentifier = identifier.trim();
    if (!trimmedIdentifier) {
      setError(
        role === "STUDENT"
          ? "Please enter your Student SIN."
          : "Please enter your Staff Number."
      );
      return;
    }

    setLoading(true);

    try {
      const endpoint = role === "STUDENT" ? "/api/auth/student" : "/api/auth/staff";
      const body =
        role === "STUDENT"
          ? { action: "login", sin: trimmedIdentifier }
          : { action: "login", staffNumber: trimmedIdentifier };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data: unknown = await res.json();
      const authData = (data && typeof data === "object" ? data : {}) as AuthResponse;

      if (!res.ok) {
        throw new Error(authData.error || "Login failed. Please check your credentials.");
      }

      if (role === "STUDENT") {
        router.push("/student");
      } else {
        router.push("/staff");
      }
      router.refresh();
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const getInputStyle = (name: string): CSSProperties => ({
    ...styles.input,
    borderColor: focused === name ? "#176b4d" : "#d9e1dd",
    boxShadow:
      focused === name
        ? "0 0 0 3px rgba(23, 107, 77, 0.10)"
        : "none",
  });

  const getRoleButtonStyle = (buttonRole: "STUDENT" | "STAFF"): CSSProperties => {
    const isActive = role === buttonRole;
    return {
      ...styles.roleButton,
      background: isActive ? "#ffffff" : "transparent",
      color: isActive ? "#176b4d" : "#68736e",
      boxShadow: isActive ? "0 2px 6px rgba(23, 43, 34, 0.08)" : "none",
    };
  };

  return (
    <main style={styles.page}>
      <div style={styles.backgroundCircle1} />
      <div style={styles.backgroundCircle2} />
      <div style={styles.backgroundCircle3} />
      <div style={styles.line} />

      <section style={styles.content}>
        <div style={styles.card}>
          <div style={styles.logoWrapper}>
            <div style={styles.logo}>
              <span style={styles.logoText}>🍴</span>
            </div>
          </div>

          <header style={styles.header}>
            <p style={styles.eyebrow}>Campus Canteen</p>
            <h1 style={styles.title}>Welcome back</h1>
            <p style={styles.description}>
              Sign in to order from your campus canteen and keep your orders in one place.
            </p>
          </header>

          <div style={styles.roleSelector}>
            <button
              type="button"
              style={getRoleButtonStyle("STUDENT")}
              onClick={() => handleRoleChange("STUDENT")}
            >
              Student
            </button>
            <button
              type="button"
              style={getRoleButtonStyle("STAFF")}
              onClick={() => handleRoleChange("STAFF")}
            >
              Staff
            </button>
          </div>

          {error && <div style={styles.errorContainer}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.fields}>
            <div style={styles.field}>
              <label htmlFor="identifier" style={styles.label}>
                {role === "STUDENT" ? "Student SIN" : "Staff Number"}
              </label>

              <input
                id="identifier"
                name="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={
                  role === "STUDENT" ? "Enter your SIN" : "Enter your Staff Number"
                }
                autoComplete="off"
                style={getInputStyle("identifier")}
                onFocus={() => setFocused("identifier")}
                onBlur={() => setFocused(null)}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div style={styles.footer}>
            New here?{" "}
            <Link href={`/signup?role=${role.toLowerCase()}`} style={styles.link}>
              Create an account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}