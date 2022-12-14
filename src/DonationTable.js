import React from "react";
import Button from "react-bootstrap/Button";
import { amountFormatter } from "./logic";

const DonationTable = (props) => {
  const { donationData, handleShow } = props;

  const totals = {
    offering: 0,
    tithes: 0,
    mission: 0,
    buildingFund: 0,
  };

  // const transformDonationData = (data) => {
  //   let finalArray = [];
  //   for (let i = 0; i < data.length; i++) {
  //     // if the finalArray already has that person
  //     if (getId(finalArray, data[i].id, false)) {
  //       // find in finalArray where that person is
  //       let index = getId(finalArray, data[i].id, true);

  //       // go into donationAmount
  //       for (const property in finalArray[index].donationAmount) {
  //         finalArray[index].donationAmount[property] +=
  //           data[i].donationAmount[property];
  //       }
  //     } else {
  //       finalArray.push(data[i]);
  //     }
  //   }

  //   return finalArray;
  // };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Offering</th>
          <th scope="col">Tithes</th>
          <th scope="col">Mission</th>
          <th scope="col">Building Fund</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {donationData?.map((data) => {
          totals.offering += data.donationAmount.offering;
          totals.tithes += data.donationAmount.tithes;
          totals.mission += data.donationAmount.mission;
          totals.buildingFund += data.donationAmount.buildingFund;
          return (
            <tr>
              <th scope="row">{data.donorId}</th>
              <td>{data.firstName}</td>
              <td>{data.lastName}</td>
              <td>{amountFormatter(data.donationAmount.offering)}</td>
              <td>{amountFormatter(data.donationAmount.tithes)}</td>
              <td>{amountFormatter(data.donationAmount.mission)}</td>
              <td>{amountFormatter(data.donationAmount.buildingFund)}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    handleShow(data);
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
          );
        })}
        <tr className="totals">
          <th scope="row"> </th>
          <td></td>
          <td className="totals-cell">TOTALS: </td>
          <td>{amountFormatter(totals.offering)}</td>
          <td>{amountFormatter(totals.tithes)}</td>
          <td>{amountFormatter(totals.mission)}</td>
          <td>{amountFormatter(totals.buildingFund)}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};

export default DonationTable;
