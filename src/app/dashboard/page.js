"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import { collection, deleteDoc, doc, getDocs, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { ref, deleteObject } from "firebase/storage"; 
import { db, auth, storage } from "../../lib/firebase";
import FormComponent from "./FormComponent";
import MemberListComponent from "./MemberListComponent";
import LoadingSpinnerComponent from "./LoadingSpinnerComponent";

const fetcher = async () => {
  const querySnapshot = await getDocs(collection(db, "members"));
  const documents = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return documents;
};

export default function Home() {
  const [user, setUser] = useState(null);
  const [editingMember, setEditingMember] = useState(null); // State for editing member
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();
  
  // Fetching the data
  const { data, error } = useSWR("members", fetcher, { revalidateOnFocus: false });

  console.log('this is from the client side',data)


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

  const handleDelete = async (id) => {
    if (!user) {
      alert("You must be logged in to delete a member.");
      return;
    }

    setLoading(true);
    try {
      // Get the document to be deleted
      const docRef = doc(db, "members", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const docData = docSnap.data();

        // Delete the photo from storage if it exists
        if (docData.photoURL) {
          const photoRef = ref(storage, docData.photoURL);
          await deleteObject(photoRef);
          console.log("Photo deleted from storage: ", docData.photoURL);
        }
      }

      // Delete the document from Firestore
      await deleteDoc(docRef);
      console.log("Document deleted with ID: ", id);
      mutate("members");
    } catch (error) {
      console.error("Error deleting document: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
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
  if (!data) return <LoadingSpinnerComponent />;

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

        <FormComponent 
          user={user} 
          editingMember={editingMember} 
          setEditingMember={setEditingMember} 
          mutate={mutate} 
        />

        <MemberListComponent 
          members={data} 
          handleEdit={handleEdit} 
          handleDelete={handleDelete} 
          loading={loading} 
        />

        {loading && <LoadingSpinnerComponent />}
      </div> : <LoadingSpinnerComponent /> } 
    </>
  );
}