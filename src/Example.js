import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Navbar from "./Navbar";

const GridComplexExample = () => {
  const [show, setShow] = useState(false);

  const [num, setNum] = useState([]);
  const [donation, setDonation] = useState({
    firstName: "",
    lastName: "",
    offering: 0,
    tithes: 0,
    mission: 0,
    buildingFund: 0,
  });

  const onSaveHandler = () => {
    console.log(donation);
    let newArr = [...num];
    newArr.push(donation);
    setNum(newArr);
    setDonation({
      firstName: "",
      lastName: "",
      offering: 0,
      tithes: 0,
      mission: 0,
      buildingFund: 0,
    });
  };

  const amountFormatter = (amount) => {
    if (amount === 0) {
      return "";
    } else {
      return `$${amount}`;
    }
  };

  const handleClose = () => {
    // find the element in the array you are changing

    // make that change to the object

    // replace that element in the array with the new one

    setShow(false);
  };
  const handleShow = (data) => {
    setDonation({
      firstName: data.firstName,
      lastName: data.lastName,
      offering: data.offering,
      tithes: data.tithes,
      mission: data.mission,
      buildingFund: data.buildingFund,
    });
    setShow(true);
  };

  return (
    <>
      <Navbar />
      <Form className="donation-form">
        <Row className="mb-3" style={{ textAlign: "center" }}>
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
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
              type="number"
              value={donation["offering"]}
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
              type="number"
              value={donation["tithes"]}
              onChange={(e) => {
                setDonation({ ...donation, tithes: parseInt(e.target.value) });
              }}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridMission">
            <Form.Label>Mission</Form.Label>
            <Form.Control
              type="number"
              value={donation["mission"]}
              onChange={(e) => {
                setDonation({ ...donation, mission: parseInt(e.target.value) });
              }}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridBuilding">
            <Form.Label>Building Fund</Form.Label>
            <Form.Control
              type="number"
              value={donation["buildingFund"]}
              onChange={(e) => {
                setDonation({
                  ...donation,
                  buildingFund: parseInt(e.target.value),
                });
              }}
            />
          </Form.Group>
          <Form.Group as={Col} style={{ alignSelf: "flex-end" }}>
            <Button
              onClick={() => {
                onSaveHandler();
              }}
              variant="success"
            >
              Save
            </Button>
          </Form.Group>
        </Row>
      </Form>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Offering</th>
            <th scope="col">Tithes</th>
            <th scope="col">Mission</th>
            <th scope="col">Building Fund</th>
            <th scope="col">Edit?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>$80</td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              {/* <Button variant="primary" onClick={handleShow}>
                Edit
              </Button> */}
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              {/* <Button variant="primary" onClick={handleShow}>
                Edit
              </Button> */}
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>Bird</td>
            <td></td>
            <td>$25</td>
            <td></td>
            <td></td>
            <td>
              {/* <Button variant="primary" onClick={handleShow}>
                Edit
              </Button> */}
            </td>
          </tr>
          {num.map((data) => {
            return (
              <tr>
                <th scope="row">4</th>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{amountFormatter(data.offering)}</td>
                <td>{amountFormatter(data.tithes)}</td>
                <td>{amountFormatter(data.mission)}</td>
                <td>{amountFormatter(data.buildingFund)}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleShow(data);
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
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
                  value={donation["offering"]}
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
                  value={donation["tithes"]}
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
                  value={donation["mission"]}
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
                  value={donation["buildingFund"]}
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

export default GridComplexExample;
