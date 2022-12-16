import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { amountFormatter } from "./logic";
import moment from "moment";
import { db } from "./firebase-config";
import { doc, query, collection, where, getDocs } from "firebase/firestore";

const DonationTable = (props) => {
  const { donationData, handleShow, donorSelected, startOfMonth, endOfMonth } =
    props;
  const [donations, setDonations] = useState([]);

  const totals = {
    offering: 0,
    tithes: 0,
    mission: 0,
    buildingFund: 0,
  };

  // const getDonations = async () => {
  //   const donationCollection = collection(db, "donation");
  //   const data = await getDocs(donationCollection);
  //   const responseContent = data.docs.map((doc) => ({
  //     ...doc.data(),
  //     id: doc.id,
  //   }));
  //   setDonations(responseContent);
  // };

  // useEffect(() => {
  //   setDonations(donationData);
  // }, [donorSelected]);

  // const findById = (source, id, isIndex) => {
  //   if (source.length === 0) {
  //     return false;
  //   }
  //   for (var i = 0; i < source.length; i++) {
  //     console.log(source[i].donorId.id === id, ": hey");
  //     if (source[i].donorId.id === id) {
  //       if (isIndex) {
  //         return i;
  //       } else {
  //         return true;
  //       }
  //     }
  //   }
  // };

  // const dataTransform = (data) => {
  //   const final = [];
  //   for (let i = 0; i < data.length; i++) {
  //     console.log(data[i].firstName);
  //     console.log(findById(final, data[i].donorId.id, false));
  //     if (findById(final, data[i].donorId.id, false)) {
  //       const index = findById(final, data[i].donorId.id, true);
  //       console.log("index: ", index);
  //       for (const property in data[i].donationAmount) {
  //         final[index].donationAmount[property] +=
  //           data[i].donationAmount[property];
  //       }
  //     } else {
  //       final.push(data[i]);
  //     }
  //   }
  //   return final;
  // };

  console.log(donationData);
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
        {donationData.map((data) => {
          totals.offering += data.donationAmount.offering;
          totals.tithes += data.donationAmount.tithes;
          totals.mission += data.donationAmount.mission;
          totals.buildingFund += data.donationAmount.buildingFund;
          return (
            <tr>
              <th scope="row">{data.donorId.id}</th>
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
