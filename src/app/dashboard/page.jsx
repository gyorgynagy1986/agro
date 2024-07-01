"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import storage functions
import { db, auth, storage } from "../../lib/firebase"; // Ensure this points to your Firebase config file

const fetcher = async () => {
  const querySnapshot = await getDocs(collection(db, "members"));
  const documents = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return documents;
};

export default function Home() {
  const { data, error } = useSWR("members", fetcher);
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null); // State for file
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      alert("You must be logged in to add a member.");
      return;
    }

    try {
      let photoURL = "";
    
      if (file) {
        const storageRef = ref(storage, `members/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        photoURL = await getDownloadURL(snapshot.ref);
      }

      const docRef = await addDoc(collection(db, "members"), {
        name,
        job,
        location,
        photoURL,
      });


      console.log("Document written with ID: ", docRef.id);
      mutate("members");
      setName("");
      setJob("");
      setLocation("");
      setFile(null);

      
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleDelete = async (id) => {
    if (!user) {
      alert("You must be logged in to delete a member.");
      return;
    }

    try {
      await deleteDoc(doc(db, "members", id));
      console.log("Document deleted with ID: ", id);
      mutate("members");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      router.push("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
    { user ? 
      <div className="container mx-auto">
        <header className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">Firestore Data</h1>
          {user ? (
            <div className="flex items-center space-x-4">
              <span>{user.email}</span>
              <button onClick={handleSignOut} className="bg-red-500 text-white px-3 py-1 rounded">
                Sign Out
              </button>
            </div>
          ) : (
            <span>Not logged in</span>
          )}
        </header>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="job" className="block text-sm font-medium leading-6 text-gray-900">
              Job
            </label>
            <div className="mt-2">
              <input
                id="job"
                name="job"
                type="text"
                autoComplete="job"
                required
                value={job}
                onChange={(e) => setJob(e.target.value)}
                className=" pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
              Location
            </label>
            <div className="mt-2">
              <input
                id="location"
                name="location"
                type="text"
                autoComplete="location"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
              Photo
            </label>
            <div className="mt-2">
              <input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="flex pl-4 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Member
            </button>
          </div>
        </form>

        <ul className="mt-6">
          {data.map((item) => (
            <li key={item.id} className="border p-4 mb-2 flex justify-between items-center">
              <div>
                <div>Name: {item.name}</div>
                <div>Job: {item.job}</div>
                <div>Location: {item.location}</div>
                {item.photoURL && <img src={item.photoURL} alt={item.name} className="w-16 h-16 object-cover rounded-full" />}
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div> : 'upss' } 
    </>
  );
}
