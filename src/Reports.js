import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Form, Button } from "react-bootstrap";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import DonationTable from "./DonationTable";
import { sampleDonations, sampleDonors } from "./sampleData";
import moment from "moment";

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

  const onMemberSelect = (e) => {
    setDonor(parseInt(e.target.value));
  };

  useEffect(() => {
    console.log(startOfMonth);
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
        <Form.Check
          value={"custom"}
          type={"radio"}
          id={`custom-radio`}
          label={`Reports by Custom Date`}
          onChange={handleChange}
          checked={check === "custom"}
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
    </div>
  );
};

export default Reports;

// [
//   "2022-12-02T02:35:02.270Z",
//   "2023-01-01T02:35:02.270Z"
// ]
