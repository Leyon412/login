// Home.js
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Get the user ID from the currently authenticated user
          const userId = user.uid;

          // Reference to the user node in the Realtime Database
          const userRef = ref(getDatabase(), `users/${userId}`);

          // Fetch the user data
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            // Set the user data to the state
            setUserData(snapshot.val());
          } else {
            console.error('User data not found in the database.');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    });

    return () => {
      // Unsubscribe from the authentication state change when the component unmounts
      unsubscribe();
    };
  }, []); // Run the effect only once on component mount

  return (
    <div className="home-container">
      <h2>Welcome to Home</h2>
      {userData && (
        <div>
          <p>Email: {userData.email}</p>
          <p>Username: {userData.username}</p>
          {/* Display other user data as needed */}
        </div>
      )}
    </div>
  );
};

export default Home;
