import React from "react";
import MemberItemComponent from "./MemberItemComponent";

const MemberListComponent = ({ members, handleEdit, handleDelete, loading }) => (
  <ul className="mt-6">
    {members.map((member) => (
      <MemberItemComponent
        key={member.id}
        member={member}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        loading={loading}
      />
    ))}
  </ul>
);

export default MemberListComponent;
