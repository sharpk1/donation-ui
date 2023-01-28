import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Form, Button } from "react-bootstrap";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import DonationTable from "./DonationTable";
import moment from "moment";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

const Reports = () => {
  const [options, setOptions] = useState([]);
  const startOfMonth = moment().startOf("month").format("YYYY-MM-DD hh:mm");
  const endOfMonth = moment().endOf("month").format("YYYY-MM-DD hh:mm");
  const [checkbox, setCheckbox] = useState({ check: "member" });
  const [donor, setDonor] = useState(-1);
  const [donation, setDonation] = useState([]);
  const [donations, setDonations] = useState([]);
  const [dateRange, setDateRange] = useState([
    new Date(startOfMonth),
    new Date(endOfMonth),
  ]);
  const [individualDonations, setIndividualDonations] = useState([]);

  const onMemberSelect = (e) => {
    setDonor(e.target.value);
  };

  useEffect(() => {
    const getMembers = async () => {
      const membersCollection = collection(db, "members");
      const data = await getDocs(membersCollection);
      const responseContent = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setOptions(responseContent);
    };
    getMembers();
  }, []);

  const getId = (array, id, isIndex) => {
    for (var i = 0, len = array.length; i < len; i++) {
      if (array[i].donorId.id === id) {
        if (isIndex) {
          return i;
        } else {
          return true;
        }
      }
    }
    return false; // Nothing found
  };

  const getDonations = async (start, end) => {
    const donationCollection = collection(db, "donation");
    const data = await getDocs(donationCollection);
    const responseContent = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const final = [];
    const allDonations = [];
    responseContent.forEach((donation, i) => {
      if (
        moment(donation.donationDate.toDate()).isSameOrAfter(start, "day") &&
        moment(donation.donationDate.toDate()).isSameOrBefore(end, "day")
      ) {
        allDonations.push(donation);
        if (getId(final, donation.donorId.id, false)) {
          let index = getId(final, donation.donorId.id, true);
          for (const property in donation.donationAmount) {
            final[index].donationAmount[property] +=
              donation.donationAmount[property];
          }
        } else {
          final.push(donation);
        }
      }
    });
    setDonations(final);
    setIndividualDonations(allDonations);

    if (donor !== -1) {
      const result = donations.filter((donation) => {
        return donation.donorId.id === donor;
      });
      setDonation(dataFormatter(result));
    } else {
      setDonation(dataFormatter(final));
    }
  };

  // useEffect(() => {
  //   console.log("useEffect");
  //   getDonationById("BEt9v41FVR9MAeLSvsy9");

  //   // const getDonations = async () => {
  //   //   const donationCollection = collection(db, "donation");
  //   //   const data = await getDocs(donationCollection);
  //   //   const responseContent = data.docs.map((doc) => ({
  //   //     ...doc.data(),
  //   //     id: doc.id,
  //   //   }));

  //   //   const final = [];

  //   //   responseContent.forEach((donation, i) => {
  //   //     if (getId(final, donation.donorId.id, false)) {
  //   //       let index = getId(final, donation.donorId.id, true);
  //   //       for (const property in donation.donationAmount) {
  //   //         final[index].donationAmount[property] +=
  //   //           donation.donationAmount[property];
  //   //       }
  //   //     } else {
  //   //       final.push(donation);
  //   //     }
  //   //   });

  //   //   setDonations(final);
  //   // };
  //   // TODO: send this to a helper method
  //   const [start, end] = dateRange;
  //   getDonations(start, end);
  //   // const result = donations.filter((donation) => {
  //   //   if (donor !== -1) {
  //   //     return (
  //   //       donation.donationDate.toDate() >= new Date(start) &&
  //   //       donation.donationDate.toDate() <= new Date(end) &&
  //   //       donation.donorId.id === donor
  //   //     );
  //   //   } else {
  //   //     return (
  //   //       moment(donation.donationDate) >= new Date(startOfMonth) &&
  //   //       moment(donation.donationDate) <= new Date(endOfMonth)
  //   //     );
  //   //   }
  //   // });
  //   // console.log(result);

  //   // setDonation(dataFormatter(result));

  //   // getMembers();
  // }, [donor, checkbox.check]);

  const SelectBasicExample = () => {
    return (
      <Form.Select
        onChange={(e) => {
          onMemberSelect(e);
        }}
        className="form-member"
        aria-label="Default select example"
        value={donor}
      >
        <option disabled value={-1} key={-1}>
          Member List
        </option>
        {options?.map((donor) => {
          return (
            <option key={donor.id} value={donor.id}>
              {donor.firstName + " " + donor.lastName}
            </option>
          );
        })}
      </Form.Select>
    );
  };

  const CheckExample = () => {
    const { check } = checkbox;

    // Reset the table
    // Remove who was the member from the state
    const handleChange = (e) => {
      e.persist();
      setDonations([]);
      setDonor(-1);
      setCheckbox((prevState) => ({
        ...prevState,
        check: e.target.value,
      }));
    };

    return (
      <Form className="radio-group">
        <Form.Check
          value={"member"}
          type={"radio"}
          id={`member-radio`}
          label={`Reports by Member`}
          onChange={handleChange}
          checked={check === "member"}
        />
        <Form.Check
          value={"timeframe"}
          type={"radio"}
          id={`timeframe-radio`}
          label={`Reports by Timeframe`}
          onChange={handleChange}
          checked={check === "timeframe"}
        />
      </Form>
    );
  };

  const dataFormatter = (data) => {
    if (Array.isArray(data)) {
      return data;
    } else {
      return [data];
    }
  };

  const dateRangeHandler = (date) => {
    const [start, end] = date;
    setDateRange(date);
    getDonations(start, end);
  };

  return (
    <div>
      <Navbar />
      <div className="reports-header">Reports</div>
      <CheckExample />
      {checkbox.check === "member" && (
        <>
          <div className="member-info">
            <SelectBasicExample />
            <DateRangePicker
              format={"MM/dd/yyyy"}
              onClean={() => {
                setDateRange([null, null]);
              }}
              value={dateRange}
              onOk={dateRangeHandler}
              className="datepicker-member"
            />
            <Button variant="primary">Get Data</Button>
            <Button
              variant="danger"
              onClick={() => {
                setDonor(-1);
                setDonation([]);
                setDateRange([null, null]);
              }}
            >
              Clear Filters
            </Button>
          </div>
          <DonationTable
            donationData={donation}
            donorSelected={donor}
            individualDonations={individualDonations}
          />
        </>
      )}
      {checkbox.check === "timeframe" && (
        <>
          <div className="member-info">
            <DateRangePicker
              format={"MM/dd/yyyy"}
              onClean={() => {
                setDateRange([null, null]);
              }}
              value={dateRange}
              onOk={dateRangeHandler}
              className="datepicker-member"
            />
            <Button variant="primary">Get Data</Button>
            <Button
              variant="danger"
              onClick={() => {
                setDonor(-1);
                setDonation([]);
                setDateRange([null, null]);
              }}
            >
              Clear Filters
            </Button>
          </div>
          <DonationTable donationData={donation} />
        </>
      )}
    </div>
  );
};

export default Reports;
