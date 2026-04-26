import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, firebaseConfigIssue, googleProvider } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

function getLoginErrorMessage(err) {
  const code = err?.code || "";

  if (firebaseConfigIssue) return firebaseConfigIssue;
  if (code === "auth/invalid-credential") return "Invalid email or password.";
  if (code === "auth/user-not-found") return "No account found for this email.";
  if (code === "auth/wrong-password") return "Incorrect password.";
  if (code === "auth/configuration-not-found") {
    return "Firebase Authentication is not configured for this project. Enable Authentication and Email/Password sign-in in Firebase Console.";
  }

  return err?.message || "Login failed. Please try again.";
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const nav = useNavigate();

  const login = async () => {
    if (firebaseConfigIssue) {
      alert(firebaseConfigIssue);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, pass);
      nav("/dashboard");
    } catch (err) {
      alert(getLoginErrorMessage(err));
    }
  };

  const loginWithGoogle = async () => {
    if (firebaseConfigIssue) {
      alert(firebaseConfigIssue);
      return;
    }

    try {
      await signInWithPopup(auth, googleProvider);
      nav("/dashboard");
    } catch (err) {
      alert(getLoginErrorMessage(err));
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPass(e.target.value)} />
      <button onClick={login}>Login</button>
      <p>or</p>
      <button onClick={loginWithGoogle}>Continue with Google</button>
      <p><Link to="/signup">Create account</Link></p>
    </div>
  );
}
