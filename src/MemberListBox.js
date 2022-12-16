import React, { useEffect, useState } from "react";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { getMembers } from "./logic";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";

const MemberListBox = () => {
  // IMPORTANT: selected means inactiveMembers in this context. The component likes to think list on the right is not being utilizes or a truey state
  const [select, setSelected] = useState([]);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [options, setOptions] = useState([]);

  const transformOptions = (data) => {
    let final = [];
    data.forEach((donor) => {
      let name = `${donor.firstName} ${donor.lastName}`;
      let id = donor.id;
      final.push({
        label: name,
        value: id,
      });
    });
    return final;
  };

  useEffect(() => {
    let inactiveMembers = [];
    getMembers()
      .then((result) => {
        result.forEach((donor) => {
          if (donor.isActive === false) {
            inactiveMembers.push(donor.id);
          }
        });
        setSelected(inactiveMembers);
        setOptions(transformOptions(result));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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

  const removeFromSelected = (data, id) => {
    for (var i = 0; i < data.length; i++) {
      if (data[i] === id) {
        data.splice(i, 1);
        break;
      }
    }
  };

  const makeMemberChange = async (isActive, donorSelected) => {
    const membersRef = doc(db, "members", donorSelected);
    await updateDoc(membersRef, {
      isActive: isActive,
    }).catch((error) => {
      console.error(error.message);
    });
  };

  const listBoxOnChange = (_selected, selection, controlKey) => {
    let tempArray = [...select];
    selection.forEach((donorSelected) => {
      if (controlKey === "selected") {
        // isActive will be set to true
        makeMemberChange(true, donorSelected);
        removeFromSelected(tempArray, donorSelected);
      } else {
        // isActive will be set to false
        makeMemberChange(false, donorSelected);
        tempArray.push(donorSelected);
      }
    });
    setSelected(tempArray);
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
      <DualListBox
        onChange={listBoxOnChange}
        options={options}
        selected={select}
      />
    </>
  );
};

export default MemberListBox;
