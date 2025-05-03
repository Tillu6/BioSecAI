import React from 'react';
export default function Profile() {
  return (
    <section aria-labelledby="profile-title">
      <h2 id="profile-title" className="text-xl font-semibold">User Settings</h2>
      <label>
        Biometric threshold:
        <input type="range" min="0" max="1" step="0.01" aria-valuemin="0" aria-valuemax="1" />
      </label>
      <button className="mt-4 px-4 py-2 bg-neon rounded">Save Settings</button>
    </section>
  );
}