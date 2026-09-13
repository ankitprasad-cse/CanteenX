"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, type CSSProperties, type FormEvent } from "react";
import AuthBackground from "../../src/components/auth/AuthBackground";

const styles: Record<string, CSSProperties> = {
  page: {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    overflow: "auto",
    background: "#f5f7f6",
    color: "#17201c",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 1,
    background: "rgba(255, 255, 255, 0.76)",
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
    padding: "32px 20px",
  },

  card: {
    width: "100%",
    maxWidth: "460px",
    boxSizing: "border-box",
    padding: "32px 36px",
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
    marginBottom: "20px",
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
    marginBottom: "18px",
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

  staffSuccessCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "20px 16px",
    background: "rgba(23, 107, 77, 0.05)",
    border: "1px solid rgba(23, 107, 77, 0.18)",
    borderRadius: "14px",
    gap: "10px",
    marginBottom: "6px",
  },

  staffSuccessTitle: {
    margin: 0,
    color: "#176b4d",
    fontSize: "18px",
    fontWeight: 700,
  },

  staffSuccessLabel: {
    margin: 0,
    color: "#526059",
    fontSize: "13px",
  },

  staffNumberBadge: {
    padding: "8px 20px",
    background: "#ffffff",
    border: "2px solid #176b4d",
    borderRadius: "10px",
    color: "#176b4d",
    fontSize: "24px",
    fontWeight: 800,
    letterSpacing: "0.08em",
  },

  staffNotice: {
    margin: "4px 0 6px",
    color: "#68736e",
    fontSize: "13px",
    lineHeight: 1.45,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  label: {
    color: "#26332d",
    fontSize: "13px",
    fontWeight: 600,
  },

  input: {
    width: "100%",
    height: "44px",
    boxSizing: "border-box",
    padding: "10px 12px",
    border: "1px solid #d9e1dd",
    borderRadius: "9px",
    background: "#ffffff",
    color: "#17201c",
    fontSize: "14px",
    outline: "none",
  },

  button: {
    width: "100%",
    height: "46px",
    marginTop: "3px",
    border: "none",
    borderRadius: "9px",
    background: "#176b4d",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    boxShadow: "0 6px 16px rgba(23, 107, 77, 0.14)",
  },

  footer: {
    marginTop: "20px",
    paddingTop: "17px",
    borderTop: "1px solid #e7ebe9",
    textAlign: "center",
    color: "#68736e",
    fontSize: "13px",
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
  staffNumber?: string;
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

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [role, setRole] = useState<"STUDENT" | "STAFF">(() => {
    const roleQuery = searchParams.get("role");
    return roleQuery === "staff" ? "STAFF" : "STUDENT";
  });

  const [sin, setSin] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [generatedStaffNumber, setGeneratedStaffNumber] = useState<string | null>(null);

  const handleRoleChange = (newRole: "STUDENT" | "STAFF") => {
    if (newRole !== role) {
      setRole(newRole);
      setSin("");
      setName("");
      setDob("");
      setError("");
      setGeneratedStaffNumber(null);
    }
  };

  const getInputStyle = (fieldName: string): CSSProperties => ({
    ...styles.input,
    borderColor: focused === fieldName ? "#176b4d" : "#d9e1dd",
    boxShadow:
      focused === fieldName
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const trimmedName = name.trim();
    const trimmedDob = dob.trim();
    const trimmedSin = sin.trim();

    if (!trimmedName) {
      setError("Please enter your full name.");
      return;
    }

    if (!trimmedDob) {
      setError("Please select your date of birth.");
      return;
    }

    if (role === "STUDENT" && !trimmedSin) {
      setError("Please enter your Student Identification Number (SIN).");
      return;
    }

    setLoading(true);

    try {
      const endpoint = role === "STUDENT" ? "/api/auth/student" : "/api/auth/staff";
      const payload =
        role === "STUDENT"
          ? { action: "signup", sin: trimmedSin, name: trimmedName, dob: trimmedDob }
          : { action: "signup", name: trimmedName, dob: trimmedDob };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data: unknown = await res.json();
      const responseData = (data && typeof data === "object" ? data : {}) as AuthResponse;

      if (!res.ok) {
        throw new Error(responseData.error || "Signup failed. Please try again.");
      }

      if (role === "STUDENT") {
        router.push("/student");
        router.refresh();
      } else {
        if (responseData.staffNumber) {
          setGeneratedStaffNumber(responseData.staffNumber);
        } else {
          router.push("/staff");
          router.refresh();
        }
      }
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.logoWrapper}>
        <div style={styles.logo}>
          <span style={styles.logoText}>🍴</span>
        </div>
      </div>

      <header style={styles.header}>
        <p style={styles.eyebrow}>Campus Canteen</p>

        <h1 style={styles.title}>Create your account</h1>

        <p style={styles.description}>
          Join the campus canteen and make ordering your food faster and easier.
        </p>
      </header>

      <div style={styles.roleSelector}>
        <button
          type="button"
          style={getRoleButtonStyle("STUDENT")}
          onClick={() => handleRoleChange("STUDENT")}
          disabled={loading || Boolean(generatedStaffNumber)}
        >
          Student
        </button>
        <button
          type="button"
          style={getRoleButtonStyle("STAFF")}
          onClick={() => handleRoleChange("STAFF")}
          disabled={loading || Boolean(generatedStaffNumber)}
        >
          Staff
        </button>
      </div>

      {error && <div style={styles.errorContainer}>{error}</div>}

      {generatedStaffNumber ? (
        <div style={styles.staffSuccessCard}>
          <h2 style={styles.staffSuccessTitle}>Registration Successful!</h2>
          <p style={styles.staffSuccessLabel}>Your assigned Staff Number is:</p>
          <div style={styles.staffNumberBadge}>{generatedStaffNumber}</div>
          <p style={styles.staffNotice}>
            Please save this Staff Number. You will need it to log in next time.
          </p>
          <button
            type="button"
            style={styles.button}
            onClick={() => {
              router.push("/staff");
              router.refresh();
            }}
          >
            Continue to Staff Dashboard
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          {role === "STUDENT" && (
            <div style={styles.field}>
              <label htmlFor="sin" style={styles.label}>
                Student SIN
              </label>

              <input
                id="sin"
                name="sin"
                type="text"
                placeholder="Enter your student SIN"
                autoComplete="off"
                value={sin}
                onChange={(e) => setSin(e.target.value)}
                style={getInputStyle("sin")}
                onFocus={() => setFocused("sin")}
                onBlur={() => setFocused(null)}
                disabled={loading}
              />
            </div>
          )}

          <div style={styles.field}>
            <label htmlFor="name" style={styles.label}>
              Full name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={getInputStyle("name")}
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused(null)}
              disabled={loading}
            />
          </div>

          <div style={styles.field}>
            <label htmlFor="dob" style={styles.label}>
              Date of Birth
            </label>

            <input
              id="dob"
              name="dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              style={getInputStyle("dob")}
              onFocus={() => setFocused("dob")}
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
            {loading
              ? "Creating account..."
              : `Create ${role === "STUDENT" ? "Student" : "Staff"} account`}
          </button>
        </form>
      )}

      <div style={styles.footer}>
        Already have an account?{" "}
        <Link href={`/login?role=${role.toLowerCase()}`} style={styles.link}>
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <main style={styles.page}>
      <AuthBackground />

      <div style={styles.overlay} />

      <section style={styles.content}>
        <Suspense fallback={<div style={styles.card} />}>
          <SignupForm />
        </Suspense>
      </section>
    </main>
  );
}