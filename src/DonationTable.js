import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { aggregateCalculator, amountFormatter } from "./logic";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

const DonationTable = (props) => {
  const [show, setShow] = useState(false);
  const [donorData, setDonorData] = useState([]);
  const [donor, setDonor] = useState("");
  const { donationData, handleShow, individualDonations } = props;

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
    console.log(individualDonations);
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
              {newList.map((donation) => {
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
    for (let i = 0; i < individualDonations.length; i++) {
      if (individualDonations[i].donorId.id === data.donorId.id) {
        final.push(individualDonations[i]);
      }
    }
    return final;
  };

  const Test = (props) => {
    // const { newList } = props;
    console.log(donorData);
    console.log(donor);
    const newList = extractMember(donor);
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
              {newList.map((donation) => {
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
          {donationData.map((data) => {
            totals.offering += data.donationAmount.offering;
            totals.tithes += data.donationAmount.tithes;
            totals.mission += data.donationAmount.mission;
            totals.buildingFund += data.donationAmount.buildingFund;
            const newList = extractMember(data);
            console.log(newList);
            return (
              <>
                {show && <Test />}
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
                        // handleShow(data);
                        setShow(true);
                        setDonorData(individualDonations);
                        setDonor(data);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      style={{ marginLeft: "5px" }}
                      variant="danger"
                      onClick={() => {
                        handleShow(data);
                      }}
                    >
                      Delete
                    </Button>
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
