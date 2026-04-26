import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import Navbar from "../components/Navbar";

export default function Admin() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "alerts"), (snap) => {
      setAlerts(snap.docs.map((doc) => doc.data()));
    });
    return () => unsub();
  }, []);

  return (
    <div>
      <Navbar />
      <h2>🚨 Admin Panel</h2>
      {alerts.map((a, i) => (
        <div key={i}>
          📍 {a.lat}, {a.lng} | 👤 {a.user}
        </div>
      ))}
    </div>
  );
}