import React from "react";

const MemberItemComponent = ({ member, handleEdit, handleDelete, loading }) => (
  <li className="border p-4 mb-2 flex justify-between items-center">
    <div>
      <div>Name: {member.name}</div>
      <div>Job: {member.job}</div>
      <div>Phone: {member.phone}</div>
      <div>Email: {member.email}</div>
      {member.photoURL && <img src={member.photoURL} alt={member.name} className="w-16 h-16 object-cover rounded-full" />}
    </div>
    <div className="flex space-x-2">
      <button
        onClick={() => handleEdit(member)}
        className="bg-blue-500 text-white px-3 py-1 rounded"
        disabled={loading}
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(member.id)}
        className="bg-red-500 text-white px-3 py-1 rounded"
        disabled={loading}
      >
        Delete
      </button>
    </div>
  </li>
);

export default MemberItemComponent;
