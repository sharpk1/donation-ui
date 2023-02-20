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
  const [donor, setDonor] = useState(-1);
  const [donation, setDonation] = useState([]);
  const [dateRange, setDateRange] = useState([
    new Date(startOfMonth),
    new Date(endOfMonth),
  ]);
  const [individualDonations, setIndividualDonations] = useState([]);
  const [revisedDonations, setRevisedDonations] = useState([]);

  useEffect(() => {
    const [start, end] = dateRange;
    getDonations(start, end);
    // eslint-disable-next-line
  }, [donor]);

  const onMemberSelect = (e) => {
    if (e.target.value === "-1") {
      setDonor(-1);
    } else {
      setDonor(e.target.value);
    }
  };

  useEffect(() => {
    const getMembers = async () => {
      const membersCollection = collection(db, "members");
      const data = await getDocs(membersCollection);
      const responseContent = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      let filtered = responseContent.filter((donor) => {
        return donor.isActive === true;
      });
      setOptions(filtered);
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
    return false;
  };

  const getDonations = async (start, end) => {
    const donationCollection = collection(db, "donation");
    const data = await getDocs(donationCollection);

    let tempAr = [];
    data.docs.forEach((doc) => {
      tempAr.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    const responseContent = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const final = [];
    const allDonations = [];

    // truly an enigma of a code block
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

    // eslint-disable-next-line
    let filtered = tempAr.filter((donation) => {
      if (
        moment(donation.donationDate.toDate()).isSameOrAfter(start, "day") &&
        moment(donation.donationDate.toDate()).isSameOrBefore(end, "day")
      ) {
        return donation;
      }
    });

    setRevisedDonations(filtered);

    // TODO: Removing this because `donations` is not even being used
    // setDonations(final);
    setIndividualDonations(allDonations);
    if (donor !== -1) {
      // THIS IS BEING CHANGED FROM donations.filter to final.filter
      const result = final.filter((donation) => {
        return donation.donorId.id === donor;
      });
      setDonation(dataFormatter(result));
    } else {
      setDonation(dataFormatter(final));
    }
  };

  const ReportsMemberSelectBox = () => {
    return (
      <Form.Select
        onChange={(e) => {
          onMemberSelect(e);
        }}
        className="form-member"
        aria-label="Default select example"
        value={donor}
      >
        <option value={-1} key={-1}>
          All Members
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
      <div className="member-info">
        <ReportsMemberSelectBox />
        <DateRangePicker
          format={"MM/dd/yyyy"}
          onClean={() => {
            setDateRange([null, null]);
          }}
          value={dateRange}
          onOk={dateRangeHandler}
          className="datepicker-member"
        />
        <Button variant="primary" style={{ marginRight: "5px" }}>
          Get Data
        </Button>
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
        revisedDonations={revisedDonations}
        isDonation={false}
        donationData={donation}
        donorSelected={donor}
        individualDonations={individualDonations}
      />
    </div>
  );
};

export default Reports;
