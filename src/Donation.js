import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import DonationTable from "./DonationTable";
import moment from "moment";
import ComboBox from "./Autocomplete";
import { getMembers } from "./logic";
// import { db } from "./firebase-config";
// import { getDocs, collection } from "firebase/firestore";

const Donation = () => {
  const [selectedMember, setSelectedMember] = useState({
    firstName: "",
    lastName: "",
    donorId: "",
  });
  const [show, setShow] = useState(false);
  const [options, setOptions] = useState([]);
  const [num, setNum] = useState([]);
  const [donation, setDonation] = useState({
    donorId: "",
    firstName: "",
    lastName: "",
    donationAmount: {
      offering: 0,
      tithes: 0,
      mission: 0,
      buildingFund: 0,
    },
  });

  useEffect(() => {
    getMembers()
      .then((result) => {
        const activeMembers = result.filter((member) => {
          return member.isActive === true;
        });
        setOptions(activeMembers);
      })
      .catch((err) => {
        console.error(err);
        setOptions([]);
      });
  }, []);

  const onSaveHandler = () => {
    let newArr = [...num];
    donation.donorId = selectedMember.donorId;
    donation.firstName = selectedMember.firstName;
    donation.lastName = selectedMember.lastName;
    newArr.push(donation);
    setNum(newArr);

    setDonation({
      firstName: "",
      lastName: "",
      donationAmount: {
        offering: 0,
        tithes: 0,
        mission: 0,
        buildingFund: 0,
      },
    });
  };

  const handleClose = () => {
    // find the element in the array you are changing

    // make that change to the object

    // replace that element in the array with the new one
    setDonation({
      firstName: "",
      lastName: "",
      donationAmount: {
        offering: 0,
        tithes: 0,
        mission: 0,
        buildingFund: 0,
      },
    });

    setShow(false);
  };
  const handleShow = (data) => {
    setDonation({
      firstName: data.firstName,
      lastName: data.lastName,
      donationAmount: {
        offering: data.donationAmount.offering,
        tithes: data.donationAmount.tithes,
        mission: data.donationAmount.mission,
        buildingFund: data.donationAmount.buildingFund,
      },
    });
    setShow(true);
  };

  const date = moment(new Date()).format("MM/DD/YYYY");

  const memberSelect = (e) => {
    setSelectedMember({
      firstName: "",
      lastName: "",
      donorId: "",
    });
    setSelectedMember({
      firstName: e.firstName,
      lastName: e.lastName,
      donorId: e.id,
    });
  };

  return (
    <>
      <div className="reports-header">Donations from {date}</div>
      <Form className="donation-form">
        <Row className="mb-3" style={{ textAlign: "center" }}>
          <Form.Group as={Col} controlId="formGridMembers">
            <Form.Label>Members</Form.Label>
            <ComboBox options={options} memberSelect={memberSelect} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridOffering">
            <Form.Label>Offering</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={donation?.donationAmount.offering}
              onChange={(e) => {
                setDonation({
                  ...donation,
                  donationAmount: {
                    ...donation.donationAmount,
                    offering: parseInt(e.target.value),
                  },
                });
              }}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridTithes">
            <Form.Label>Tithes</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={donation?.donationAmount.tithes}
              onChange={(e) => {
                setDonation({
                  ...donation,
                  donationAmount: {
                    ...donation.donationAmount,
                    tithes: parseInt(e.target.value),
                  },
                });
              }}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridMission">
            <Form.Label>Mission</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={donation?.donationAmount.mission}
              onChange={(e) => {
                setDonation({
                  ...donation,
                  donationAmount: {
                    ...donation.donationAmount,
                    mission: parseInt(e.target.value),
                  },
                });
              }}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridBuilding">
            <Form.Label>Building Fund</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={donation?.donationAmount.buildingFund}
              onChange={(e) => {
                setDonation({
                  ...donation,
                  donationAmount: {
                    ...donation.donationAmount,
                    buildingFund: parseInt(e.target.value),
                  },
                });
              }}
            />
          </Form.Group>
          <Form.Group as={Col} style={{ alignSelf: "flex-end" }}>
            <Button
              onClick={() => {
                onSaveHandler();
              }}
              disabled={selectedMember.donorId === ""}
              variant="success"
            >
              Save
            </Button>
          </Form.Group>
        </Row>
      </Form>
      <DonationTable donationData={num} handleShow={handleShow} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Donation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Col style={{ textAlign: "center" }}>
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  className="text-center"
                  type="firstName"
                  value={donation["firstName"]}
                  onChange={(e) => {
                    setDonation({ ...donation, firstName: e.target.value });
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  className="text-center"
                  type="lastName"
                  value={donation["lastName"]}
                  onChange={(e) => {
                    setDonation({ ...donation, lastName: e.target.value });
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridOffering">
                <Form.Label>Offering</Form.Label>
                <Form.Control
                  className="text-center"
                  type="number"
                  value={donation.donationAmount.offering || 0}
                  onChange={(e) => {
                    setDonation({
                      ...donation,
                      offering: parseInt(e.target.value),
                    });
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridTithes">
                <Form.Label>Tithes</Form.Label>
                <Form.Control
                  className="text-center"
                  type="number"
                  value={donation.donationAmount.tithes || 0}
                  onChange={(e) => {
                    setDonation({
                      ...donation,
                      tithes: parseInt(e.target.value),
                    });
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridMission">
                <Form.Label>Mission</Form.Label>
                <Form.Control
                  className="text-center"
                  type="number"
                  value={donation.donationAmount.mission || 0}
                  onChange={(e) => {
                    setDonation({
                      ...donation,
                      mission: parseInt(e.target.value),
                    });
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridBuilding">
                <Form.Label>Building Fund</Form.Label>
                <Form.Control
                  className="text-center"
                  type="number"
                  value={donation.donationAmount.buildingFund || 0}
                  onChange={(e) => {
                    setDonation({
                      ...donation,
                      buildingFund: parseInt(e.target.value),
                    });
                  }}
                />
              </Form.Group>
            </Col>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Donation;
