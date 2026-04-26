import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function SOSButton({ location, user }) {
  const sendSOS = async () => {
    if (!location) return alert("Location not ready");

    await addDoc(collection(db, "alerts"), {
      lat: location[0],
      lng: location[1],
      user: user?.email || "anonymous",
      time: new Date().toISOString(),
      status: "active",
    });

    alert("🚨 SOS SENT!");
  };

  return (
    <button onClick={sendSOS} className="sos-btn">
      🚨 Send SOS Alert
    </button>
  );
}
