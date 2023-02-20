import React, { useEffect, useState } from "react";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { getMembers } from "./logic";
import { doc, updateDoc, collection, addDoc } from "firebase/firestore";
import { db } from "./firebase-config";

const MemberListBox = () => {
  // IMPORTANT: selected means inactiveMembers in this context. The component likes to think list on the right is not being utilizes or a truey state
  const [select, setSelected] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [options, setOptions] = useState([]);
  const [allMembers, setAllMembers] = useState([]);

  const addMember = async () => {
    try {
      let filtered = allMembers.filter((member) => {
        return (
          member.firstName.toLowerCase() === firstName.toLowerCase() &&
          member.lastName.toLowerCase() === lastName.toLowerCase()
        );
      });

      if (filtered.length > 0) {
        alert("Member CANNOT be added because they already exist in system.");
      } else {
        const docRef = await addDoc(collection(db, "members"), {
          firstName: firstName,
          lastName: lastName,
          dateAdded: new Date(),
          isActive: true,
        });
        refreshMembers();
        setFirstName("");
        setLastName("");
        console.log("Document written with ID: ", docRef.id);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

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

  const refreshMembers = () => {
    let inactiveMembers = [];
    let members = [];
    getMembers()
      .then((result) => {
        result.forEach((donor) => {
          members.push({
            firstName: donor.firstName,
            lastName: donor.lastName,
          });
          if (donor.isActive === false) {
            inactiveMembers.push(donor.id);
          }
        });
        setAllMembers(members);
        setSelected(inactiveMembers);
        setOptions(transformOptions(result));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    refreshMembers();
    // eslint-disable-next-line
  }, []);

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
    selection.forEach(async (donorSelected) => {
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
      <Form className="add-member-form">
        <Row className="mb-3" style={{ textAlign: "center" }}>
          <Form.Group as={Row} controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="firstName"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group as={Row} controlId="formGridLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="lastName"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group as={Row} controlId="saveMember">
            <Form.Group
              as={Row}
              style={{ textAlign: "left", paddingTop: "10px", margin: "auto" }}
            >
              <Button
                onClick={addMember}
                variant="success"
                disabled={firstName === "" || lastName === ""}
              >
                Add Member
              </Button>
            </Form.Group>
          </Form.Group>
        </Row>
      </Form>
      <div className="memberHeaderSection">
        <h1 className="activeMembers">Active Members</h1>
        <h1 className="inactiveMembers">Inactive Members</h1>
      </div>
      <DualListBox
        onChange={listBoxOnChange}
        options={options}
        selected={select}
      />
    </>
  );
};

export default MemberListBox;
