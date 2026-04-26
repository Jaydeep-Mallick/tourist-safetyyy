import { useState } from "react";
import MapView from "../components/MapView";
import SOSButton from "../components/SOSButton";
import Navbar from "../components/Navbar";
import { auth } from "../firebase";

export default function Dashboard() {
  const [location, setLocation] = useState(null);

  return (
    <div className="dashboard-page">
      <Navbar />
      <main className="dashboard-shell">
        <section className="dashboard-card dashboard-head">
          <p className="dashboard-kicker">Tourist Safety</p>
          <h2>Welcome back</h2>
          <p className="dashboard-subtitle">Track your live position and trigger emergency SOS when needed.</p>
        </section>

        <section className="dashboard-card dashboard-map-wrap">
          <MapView setLocation={setLocation} />
        </section>

        <section className="dashboard-card dashboard-actions">
          <SOSButton location={location} user={auth.currentUser} />
        </section>
      </main>
    </div>
  );
}
