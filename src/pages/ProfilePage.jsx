import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null); // State to hold user data

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Retrieve user ID from local storage
    const userEmail = localStorage.getItem("userEmail"); // Retrieve user email

    if (userId && userEmail) {
      setUserData({ id: userId, email: userEmail }); // Set user data in state
    } else {
      console.log("No user data found in local storage.");
    }
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      {userData ? (
        <h1>Welcome, {userData.email}!</h1> // Display user email
      ) : (
        <h1>Please log in.</h1> // Prompt to log in if no user data
      )}
    </div>
  );
};

export default ProfilePage;
