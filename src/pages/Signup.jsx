
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firebaseConfigIssue } from "../firebase";
import { useNavigate } from "react-router-dom";

function getSignupErrorMessage(err) {
  const code = err?.code || "";

  if (firebaseConfigIssue) return firebaseConfigIssue;
  if (code === "auth/email-already-in-use") return "This email is already in use.";
  if (code === "auth/invalid-email") return "Please enter a valid email address.";
  if (code === "auth/weak-password") return "Password must be at least 6 characters.";
  if (code === "auth/operation-not-allowed") {
    return "Email/Password sign-up is disabled in Firebase Console.";
  }
  if (code === "auth/configuration-not-found") {
    return "Firebase Authentication is not configured for this project. Enable Authentication and Email/Password sign-in in Firebase Console.";
  }

  return err?.message || "Signup failed. Please try again.";
}

export default function Signup() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const nav = useNavigate();

  const signup = async () => {
    if (firebaseConfigIssue) {
      alert(firebaseConfigIssue);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email.trim(), pass);
      nav("/");
    } catch (err) {
      alert(getSignupErrorMessage(err));
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPass(e.target.value)}
      />
      <button onClick={signup}>Signup</button>
    </div>
  );
}
