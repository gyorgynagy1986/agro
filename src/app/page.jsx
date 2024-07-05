
// pages/data.js
import React from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../lib/firebase"; // Ensure this points to your Firebase config file

// Fetcher function to get data from Firestore
async function fetchMembers() {
  const querySnapshot = await getDocs(collection(db, "members"), { cache: 'no-store' });
  const members = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return members;
}

export default async function Home() {
  const data = await fetchMembers();


  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Public Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id} className="border p-4 mb-2 flex items-center">
            {item.photoURL && (
              <img
                src={item.photoURL}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-full mr-4"
              />
            )}
            <div>
              <div>Name: {item.name}</div>
              <div>Job: {item.job}</div>
              <div>Location: {item.location}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

