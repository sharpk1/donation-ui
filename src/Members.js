import React from "react";
import MemberListBox from "./MemberListBox";
import Navbar from "./Navbar";

const Members = () => {
  return (
    <>
      <Navbar />
      <div className="reports-header">Members</div>
      <MemberListBox />
    </>
  );
};

export default Members;
