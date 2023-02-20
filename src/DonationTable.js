import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { aggregateCalculator, amountFormatter } from "./logic";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import moment from "moment";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase-config";

const DonationTable = (props) => {
  const [show, setShow] = useState(false);
  const [donor, setDonor] = useState("");
  // const [donation, setDonation] = useState({
  //   donorId: "",
  //   firstName: "",
  //   lastName: "",
  //   donationAmount: {
  //     offering: 0,
  //     tithes: 0,
  //     mission: 0,
  //     buildingFund: 0,
  //   },
  // });
  const [editModalShow, setEditModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [editDonationData, setEditDonationData] = useState({
    donorId: "",
    donationId: "",
    firstName: "",
    lastName: "",
    donationAmount: {
      offering: 0,
      tithes: 0,
      mission: 0,
      buildingFund: 0,
    },
  });
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);

  const { donationData, isDonation, revisedDonations, donationsRefresh } =
    props;

  const totals = {
    offering: 0,
    tithes: 0,
    mission: 0,
    buildingFund: 0,
  };

  const handleClose = () => {
    setShow(false);
  };

  const extractMember = (data) => {
    let final = [];
    for (let i = 0; i < revisedDonations.length; i++) {
      if (revisedDonations[i].donorId.id === data.donorId.id) {
        final.push(revisedDonations[i]);
      }
    }
    return final;
  };

  const DonationModal = () => {
    const newList = extractMember(donor);

    newList.sort((x, y) => {
      return x.donationDate - y.donationDate;
    });

    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Viewing Donations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table
            striped
            bordered
            hover
            size="sm"
            style={{ width: "max-content" }}
          >
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Offering</th>
                <th>Tithes</th>
                <th>Mission</th>
                <th>Building Fund</th>
              </tr>
            </thead>
            <tbody>
              {newList.map((donation, index) => {
                return (
                  <tr key={index}>
                    <td className="td">
                      {moment(donation.donationDate.toDate()).format(
                        "MM/DD/YYYY"
                      )}
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      {donation.firstName} {donation.lastName}
                    </td>
                    <td align="right">
                      ${donation.donationAmount.offering || 0}
                    </td>
                    <td align="right">
                      ${donation.donationAmount.tithes || 0}
                    </td>
                    <td align="right">
                      ${donation.donationAmount.mission || 0}
                    </td>
                    <td align="right">
                      ${donation.donationAmount.buildingFund || 0}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const EditDonationModal = (data) => {
    const [editData, setEditData] = useState(editDonationData);

    const handleEditModalClose = () => {
      setEditModalShow(!editModalShow);
    };

    const onSaveHandler = async () => {
      const donationRef = doc(db, "donation", editDonationData.donationId);
      await updateDoc(
        donationRef,
        {
          donationAmount: {
            offering: editData.donationAmount.offering,
            tithes: editData.donationAmount.tithes,
            mission: editData.donationAmount.mission,
            buildingFund: editData.donationAmount.buildingFund,
          },
        },
        setEditModalShow(!editModalShow)
      ).catch((error) => {
        console.error(error.message);
      });

      donationsRefresh();
    };

    return (
      <Modal show={editModalShow} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit Donation for {editDonationData.firstName}{" "}
            {editDonationData.lastName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="edit-donation-form">
            <Row className="mb-3" style={{ textAlign: "center" }}>
              <Form.Group as={Col} controlId="formGridOffering">
                <Form.Label>Offering</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={editData.donationAmount.offering}
                  onChange={(e) => {
                    setEditData({
                      ...editData,
                      donationAmount: {
                        ...editData.donationAmount,
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
                  value={editData.donationAmount.tithes}
                  onChange={(e) => {
                    setEditData({
                      ...editData,
                      donationAmount: {
                        ...editData.donationAmount,
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
                  value={editData.donationAmount.mission}
                  onChange={(e) => {
                    setEditData({
                      ...editData,
                      donationAmount: {
                        ...editData.donationAmount,
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
                  value={editData.donationAmount.buildingFund}
                  onChange={(e) => {
                    setEditData({
                      ...editData,
                      donationAmount: {
                        ...editData.donationAmount,
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
                  disabled={
                    editDonationData.donationAmount.offering ===
                      editData.donationAmount.offering &&
                    editDonationData.donationAmount.tithes ===
                      editData.donationAmount.tithes &&
                    editDonationData.donationAmount.mission ===
                      editData.donationAmount.mission &&
                    editDonationData.donationAmount.buildingFund ===
                      editData.donationAmount.buildingFund
                  }
                  variant="success"
                >
                  Save
                </Button>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const editDataHandler = (data) => {
    setEditDonationData({
      donorId: data.donorId,
      donationId: data.donationId,
      firstName: data.firstName,
      lastName: data.lastName,
      donationAmount: {
        offering: data.donationAmount.offering,
        tithes: data.donationAmount.tithes,
        mission: data.donationAmount.mission,
        buildingFund: data.donationAmount.buildingFund,
      },
    });
  };

  const handleDeleteModalClose = () => {
    setDeleteModalShow(!deleteModalShow);
    setShowDeleteMessage(false);
    donationsRefresh();
    setEditDonationData({
      donorId: "",
      donationId: "",
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

  const handleDeleteConfirmation = async () => {
    await deleteDoc(doc(db, "donation", editDonationData.donationId)).then(
      () => {
        setShowDeleteMessage(true);
        console.log("deletion occured");
      }
    );
    setEditDonationData({
      donorId: "",
      donationId: "",
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

  const DeleteDonationModal = () => {
    return (
      <Modal show={deleteModalShow} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Are you sure you want to delete Donation for{" "}
            {editDonationData.firstName} {editDonationData.lastName}?
          </Modal.Title>
        </Modal.Header>
        {showDeleteMessage ? (
          <Modal.Body style={{ alignSelf: "center", color: "red" }}>
            Delete completed!
          </Modal.Body>
        ) : null}
        <Modal.Footer style={{ justifyContent: "space-between" }}>
          {showDeleteMessage ? null : (
            <Button variant="danger" onClick={handleDeleteConfirmation}>
              Yes
            </Button>
          )}
          <Button variant="secondary" onClick={handleDeleteModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Offering</th>
            <th scope="col">Tithes</th>
            <th scope="col">Mission</th>
            <th scope="col">Building Fund</th>
            <th scope="col"></th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {donationData.map((data, i) => {
            totals.offering += data.donationAmount.offering;
            totals.tithes += data.donationAmount.tithes;
            totals.mission += data.donationAmount.mission;
            totals.buildingFund += data.donationAmount.buildingFund;

            // let newList;
            // if (individualDonations) {
            //   newList = extractMember(data);
            // }

            return (
              <>
                {show && <DonationModal />}
                {editModalShow && <EditDonationModal data={data} />}
                {<DeleteDonationModal />}
                <tr>
                  <th scope="row">{"               "}</th>
                  <td>{data.firstName}</td>
                  <td>{data.lastName}</td>
                  <td>{amountFormatter(data.donationAmount.offering)}</td>
                  <td>{amountFormatter(data.donationAmount.tithes)}</td>
                  <td>{amountFormatter(data.donationAmount.mission)}</td>
                  <td>{amountFormatter(data.donationAmount.buildingFund)}</td>
                  <td></td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        if (isDonation === false) {
                          setShow(true);
                          // setDonorData(individualDonations);
                          setDonor(data);
                        } else {
                          editDataHandler(data);
                          setEditModalShow(!editModalShow);
                        }
                      }}
                    >
                      {isDonation === true
                        ? "Edit Donation"
                        : "View Donation(s)"}
                    </Button>
                    {isDonation === true ? (
                      <Button
                        style={{ marginLeft: "5px" }}
                        variant="danger"
                        onClick={() => {
                          editDataHandler(data);
                          setDeleteModalShow(true);
                        }}
                      >
                        Delete Donation
                      </Button>
                    ) : null}
                  </td>
                </tr>
              </>
            );
          })}
          <tr className="totals">
            <th scope="row"> </th>
            <td></td>
            <td className="totals-cell">MEMBER TOTALS: </td>
            <td>{amountFormatter(totals.offering)}</td>
            <td>{amountFormatter(totals.tithes)}</td>
            <td>{amountFormatter(totals.mission)}</td>
            <td>{amountFormatter(totals.buildingFund)}</td>
            <td>AGGREGATE: {aggregateCalculator(totals)}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default DonationTable;
