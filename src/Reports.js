import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Form, Button } from "react-bootstrap";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import DonationTable from "./DonationTable";
import { sampleDonations, sampleDonors } from "./sampleData";
import moment from "moment";
import { db } from "./firebase-config";
import { doc, query, collection, where, getDocs } from "firebase/firestore";

const Reports = () => {
  const startOfMonth = moment().startOf("month").format("YYYY-MM-DD hh:mm");
  const endOfMonth = moment().endOf("month").format("YYYY-MM-DD hh:mm");
  const [checkbox, setCheckbox] = useState({ check: "member" });
  const [donor, setDonor] = useState(-1);
  const [donation, setDonation] = useState([]);
  const [dateRange, setDateRange] = useState([
    new Date(startOfMonth),
    new Date(endOfMonth),
  ]);

  // TODO: export this to its own logic.tsx
  const getDonationById = async (id) => {
    const categoryDocRef = doc(db, `/members/${id}`);

    const q = query(
      collection(db, "donation"),
      where("donorId", "==", categoryDocRef)
    );

    const ticketDocsSnap = await getDocs(q);
    const responseContent = ticketDocsSnap.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  };

  const membersCollection = collection(db, "members");

  const onMemberSelect = (e) => {
    setDonor(parseInt(e.target.value));
  };

  useEffect(() => {
    // const getMembers = async () => {
    //   const data = await getDocs(membersCollection);
    //   data.forEach((doc) => {
    //     let values = null;
    //     console.log(`${doc.id} => ${doc.data().firstName}`);
    //     console.log(doc.data().lastName);
    //     values = doc.id;
    //   });
    // };

    getDonationById("BEt9v41FVR9MAeLSvsy9");

    const result = sampleDonations.filter((donation) => {
      if (donor !== -1) {
        return (
          moment(donation.donationDate) >= new Date(startOfMonth) &&
          moment(donation.donationDate) <= new Date(endOfMonth) &&
          donation.donorId === donor
        );
      } else {
        return (
          moment(donation.donationDate) >= new Date(startOfMonth) &&
          moment(donation.donationDate) <= new Date(endOfMonth)
        );
      }
    });

    setDonation(dataFormatter(result));
    // getMembers();
  }, []);

  const SelectBasicExample = () => {
    return (
      <Form.Select
        onChange={onMemberSelect}
        className="form-member"
        aria-label="Default select example"
        value={donor}
      >
        <option disabled value={-1} key={-1}>
          Member List
        </option>
        {sampleDonors.map((donor) => {
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
    //
    const handleChange = (e) => {
      e.persist();

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
    setDateRange(date);
    const [beginDate, endDate] = date;
    const result = sampleDonations.filter((donation) => {
      if (donor !== -1) {
        return (
          moment(donation.donationDate) >= beginDate &&
          moment(donation.donationDate) <= endDate &&
          donation.donorId === donor
        );
      } else {
        return (
          moment(donation.donationDate) >= beginDate &&
          moment(donation.donationDate) <= endDate
        );
      }
    });

    setDonation(dataFormatter(result));
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
            {/* <Button variant="primary" onClick={() => {

            }}>
              Get Data
            </Button> */}
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
            {/* <Button variant="primary" onClick={() => {

          }}>
            Get Data
          </Button> */}
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
