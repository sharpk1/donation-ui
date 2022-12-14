import React, { useState } from "react";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const MemberListBox = () => {
  const [select, setSelected] = useState([1]);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [options, setOptions] = useState([
    { value: 1, label: "Kush Shah" },
    { value: 2, label: "Tom Smith" },
    { value: 3, label: "John Doe" },
  ]);

  const onChange = (selected) => {
    setSelected(selected);
  };

  const onSaveHandler = () => {
    let lastNum = options.at(-1).value + 1;
    const adjoinedName = firstName + " " + lastName;
    let tempArray = [...options];

    tempArray.push({
      value: lastNum,
      label: adjoinedName,
    });

    setOptions(tempArray);
  };

  return (
    <>
      <Form className="donation-form">
        <Row className="mb-3" style={{ textAlign: "center" }}>
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="firstName"
              value={firstName}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="lastName"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="saveMember">
            <Form.Group
              as={Col}
              style={{ textAlign: "left", marginTop: "31px" }}
            >
              <Button onClick={onSaveHandler} variant="success">
                Save
              </Button>
            </Form.Group>
          </Form.Group>
        </Row>
      </Form>
      <DualListBox options={options} selected={select} onChange={onChange} />
    </>
  );
};

export default MemberListBox;
