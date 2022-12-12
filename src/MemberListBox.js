import React, { useState } from "react";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";

const MemberListBox = () => {
  const [select, setSelected] = useState(["one"]);
  const options = [
    { value: "one", label: "Kush Shah" },
    { value: "two", label: "Tom Smith" },
    { value: "three", label: "John Doe" },
  ];
  //   state = {
  //     selected: ["one"],
  //   };

  const onChange = (selected) => {
    setSelected(selected);
  };

  return (
    <DualListBox options={options} selected={select} onChange={onChange} />
  );
};

export default MemberListBox;
