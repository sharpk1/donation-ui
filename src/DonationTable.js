import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { aggregateCalculator, amountFormatter } from "./logic";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import moment from "moment";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";

const DonationTable = (props) => {
  const [show, setShow] = useState(false);
  const [donorData, setDonorData] = useState([]);
  const [donor, setDonor] = useState("");
  const [editMode, setEditMode] = useState(false);
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
  const [editModalShow, setEditModalShow] = useState(false);

  const {
    donationData,
    handleShow,
    individualDonations,
    isDonation,
    revisedDonations,
  } = props;

  console.log("individualDonations: ", individualDonations);
  console.log("donationData: ", donationData);

  const totals = {
    offering: 0,
    tithes: 0,
    mission: 0,
    buildingFund: 0,
  };

  const handleClose = () => {
    // find the element in the array you are changing

    // make that change to the object

    // replace that element in the array with the new one
    // setDonation({
    //   firstName: "",
    //   lastName: "",
    //   donationAmount: {
    //     offering: 0,
    //     tithes: 0,
    //     mission: 0,
    //     buildingFund: 0,
    //   },
    // });

    setShow(false);
  };

  const ModalEdit = (props) => {
    const { data } = props;
    console.log(data.donorId.firstName);
    const newList = individualDonations.filter((donation) => {
      console.log(donation.donorId.id);
      console.log(data.donorId.id);
      return donation.donorId.id === data.donorId.id;
    });

    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Viewing Donations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover size="sm">
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
              {newList.map((donation, i) => {
                return (
                  <tr>
                    <td>{donation.firstName}</td>
                    <td>{donation.firstName}</td>
                    <td>{donation.lastName}</td>
                    <td>{donation.donationAmount.offering}</td>
                  </tr>
                );
              })}
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
Save Changes
</Button> */}
        </Modal.Footer>
      </Modal>
    );
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
    // const { newList } = props;
    console.log(donorData);
    console.log(donor);
    console.log(revisedDonations);
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
              {newList.map((donation) => {
                return (
                  <tr>
                    <td class="td">
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
          {/* <Button variant="primary" onClick={handleClose}>
Save Changes
</Button> */}
        </Modal.Footer>
      </Modal>
    );
  };

  const EditDonationModal = (data) => {
    const [editDonationData, setEditDonationData] = useState({
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
      setEditDonationData({
        donorId: data.data.donorId,
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        donationAmount: {
          offering: data.data.donationAmount.offering,
          tithes: data.data.donationAmount.tithes,
          mission: data.data.donationAmount.mission,
          buildingFund: data.data.donationAmount.buildingFund,
        },
      });
    }, [data]);

    const handleEditModalClose = () => {
      setEditModalShow(!editModalShow);
    };

    const onSaveHandler = async () => {
      const donationRef = doc(db, "donation", data.data.donationId);
      await updateDoc(
        donationRef,
        {
          donationAmount: {
            offering: editDonationData.donationAmount.offering,
            tithes: editDonationData.donationAmount.tithes,
            mission: editDonationData.donationAmount.mission,
            buildingFund: editDonationData.donationAmount.buildingFund,
          },
        },
        console.log("donation updated")
      ).catch((error) => {
        console.error(error.message);
      });
    };

    return (
      <Modal show={editModalShow} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit Donation for {data.data.firstName} {data.data.lastName}
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
                  value={editDonationData.donationAmount.offering}
                  onChange={(e) => {
                    setEditDonationData({
                      ...editDonationData,
                      donationAmount: {
                        ...editDonationData.donationAmount,
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
                  value={editDonationData.donationAmount.tithes}
                  onChange={(e) => {
                    setEditDonationData({
                      ...editDonationData,
                      donationAmount: {
                        ...editDonationData.donationAmount,
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
                  value={editDonationData.donationAmount.mission}
                  onChange={(e) => {
                    setEditDonationData({
                      ...editDonationData,
                      donationAmount: {
                        ...editDonationData.donationAmount,
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
                  value={editDonationData.donationAmount.buildingFund}
                  onChange={(e) => {
                    setEditDonationData({
                      ...editDonationData,
                      donationAmount: {
                        ...editDonationData.donationAmount,
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
                    // Push();
                  }}
                  // disabled={selectedMember.donorId === ""}
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
          {/* <Button variant="primary" onClick={handleClose}>
Save Changes
</Button> */}
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

            let newList;
            if (individualDonations) {
              newList = extractMember(data);
            }

            console.log(newList);
            // setDonation({
            //   ...data,
            //   donationAmount: {
            //     ...data.donationAmount,
            //     offering: parseInt(e.target.value),
            //   },
            // });

            // Get the donation data, set it to the state,
            // set the value to the state
            // set the onchange to the new state when changes are made
            // Save the donation by keying off the donation ID
            return (
              <>
                {show && <DonationModal />}
                {editModalShow && <EditDonationModal data={data} />}
                <tr>
                  <th scope="row">{"               "}</th>
                  <td>{data.firstName}</td>
                  <td>{data.lastName}</td>
                  {editMode ? (
                    <>
                      <div>
                        <Form.Control
                          className="editableInput"
                          style={{ width: "auto" }}
                          type="number"
                          min="0"
                          value={data?.donationAmount.offering}
                          onChange={(e) => {
                            setDonation({
                              ...data,
                              donationAmount: {
                                ...data.donationAmount,
                                offering: parseInt(e.target.value),
                              },
                            });
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <td>{amountFormatter(data.donationAmount.offering)}</td>
                  )}
                  {editMode ? (
                    <>
                      <td>
                        <div>
                          <Form.Control
                            className="editableInput"
                            style={{ width: "auto" }}
                            type="number"
                            min="0"
                            value={data?.donationAmount.tithes}
                            onChange={(e) => {
                              setDonation({
                                ...data,
                                donationAmount: {
                                  ...data.donationAmount,
                                  tithes: parseInt(e.target.value),
                                },
                              });
                            }}
                          />
                        </div>
                      </td>
                    </>
                  ) : (
                    <td>{amountFormatter(data.donationAmount.tithes)}</td>
                  )}
                  {editMode ? (
                    <>
                      <td>
                        <div>
                          <Form.Control
                            className="editableInput"
                            style={{ width: "auto" }}
                            type="number"
                            min="0"
                            value={data?.donationAmount.mission}
                            onChange={(e) => {
                              setDonation({
                                ...data,
                                donationAmount: {
                                  ...data.donationAmount,
                                  mission: parseInt(e.target.value),
                                },
                              });
                            }}
                          />
                        </div>
                      </td>
                    </>
                  ) : (
                    <td>{amountFormatter(data.donationAmount.mission)}</td>
                  )}
                  {editMode ? (
                    <>
                      <td>
                        <div>
                          <Form.Control
                            className="editableInput"
                            style={{ width: "auto" }}
                            type="number"
                            min="0"
                            value={data?.donationAmount.buildingFund}
                            onChange={(e) => {
                              setDonation({
                                ...data,
                                donationAmount: {
                                  ...data.donationAmount,
                                  buildingFund: parseInt(e.target.value),
                                },
                              });
                            }}
                          />
                        </div>
                      </td>
                    </>
                  ) : (
                    <td>{amountFormatter(data.donationAmount.buildingFund)}</td>
                  )}

                  {/* <td>{amountFormatter(data.donationAmount.mission)}</td> */}
                  {/* <td>{amountFormatter(data.donationAmount.buildingFund)}</td> */}
                  <td></td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        if (isDonation === false) {
                          setShow(true);
                          setDonorData(individualDonations);
                          setDonor(data);
                        } else {
                          setEditModalShow(!editModalShow);
                          // setEditMode(!editMode);
                        }
                      }}
                    >
                      View Donations
                    </Button>
                    {/* <Button
                      style={{ marginLeft: "5px" }}
                      variant="danger"
                      onClick={() => {
                        handleShow(data);
                      }}
                    >
                      Delete
                    </Button> */}
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

// <Modal show={show} onHide={handleClose}>
//                   <Modal.Header closeButton>
//                     <Modal.Title>Viewing Donations</Modal.Title>
//                   </Modal.Header>
//                   <Modal.Body>
//                     <Table striped bordered hover size="sm">
//                       <thead>
//                         <tr>
//                           <th>Date</th>
//                           <th>Name</th>
//                           <th>Offering</th>
//                           <th>Tithes</th>
//                           <th>Mission</th>
//                           <th>Building Fund</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {newList.map((donation) => {
//                           return (
//                             <tr>
//                               <td>{donation.firstName}</td>
//                               <td>{donation.firstName}</td>
//                               <td>{donation.lastName}</td>
//                               <td>{donation.donationAmount.offering}</td>
//                             </tr>
//                           );
//                         })}
//                         <tr>
//                           <td>1</td>
//                           <td>Mark</td>
//                           <td>Otto</td>
//                           <td>@mdo</td>
//                         </tr>
//                         <tr>
//                           <td>2</td>
//                           <td>Jacob</td>
//                           <td>Thornton</td>
//                           <td>@fat</td>
//                         </tr>
//                         <tr>
//                           <td>3</td>
//                           <td colSpan={2}>Larry the Bird</td>
//                           <td>@twitter</td>
//                         </tr>
//                       </tbody>
//                     </Table>
//                   </Modal.Body>
//                   <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                       Close
//                     </Button>
//                     {/* <Button variant="primary" onClick={handleClose}>
// Save Changes
// </Button> */}
//                   </Modal.Footer>
//                 </Modal>
