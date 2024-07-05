import React, { useState, useEffect } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../lib/firebase";

const FormComponent = ({ user, editingMember, setEditingMember, mutate }) => {
  const [name, setName] = useState("Kiss Tamás");
  const [job, setJob] = useState("telephelyvezető, telephelyi felvásárlás");
  const [phone, setPhone] = useState("+36 70 709 18 27");
  const [email, setEmail] = useState("tamas.kiss@bsvgro.hu");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingMember) {
      setName(editingMember.name);
      setJob(editingMember.job);
      setPhone(editingMember.phone);
      setEmail(editingMember.email);
    }
  }, [editingMember]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      alert("You must be logged in to add a member.");
      return;
    }

    setLoading(true);
    try {
      let photoURL = "";

      if (file) {
        const storageRef = ref(storage, `members/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        photoURL = await getDownloadURL(snapshot.ref);
      }

      if (editingMember) {
        // Update the existing member
        const docRef = doc(db, "members", editingMember.id);
        await updateDoc(docRef, {
          name,
          job,
          phone,
          email,
          photoURL: photoURL || editingMember.photoURL, // Use the new photoURL if a new file was uploaded, otherwise keep the existing one
        });
        console.log("Document updated with ID: ", docRef.id);
      } else {
        // Add a new member
        const docRef = await addDoc(collection(db, "members"), {
          name,
          job,
          phone,
          email,
          photoURL,
        });
        console.log("Document written with ID: ", docRef.id);
      }

      mutate("members");
      setName("");
      setJob("");
      setPhone("");
      setEmail("");
      setFile(null);
      setEditingMember(null);

    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
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
            className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
          Phone Number
        </label>
        <div className="mt-2">
          <input
            id="phone"
            name="phone"
            type="text"
            autoComplete="phone"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          disabled={loading}
        >
          {loading ? "Loading..." : (editingMember ? "Update Member" : "Add Member")}
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
