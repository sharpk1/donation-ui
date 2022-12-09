import React, { useState } from "react";
import Navbar from "./Navbar";
import { Form } from "react-bootstrap";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css"; // or

const SelectBasicExample = () => {
  return (
    <Form.Select className="form-member" aria-label="Default select example">
      <option>Member List</option>
      <option value="1">Tom Smith</option>
      <option value="2">John Doe</option>
      <option value="3">Kush Shah</option>
    </Form.Select>
  );
};

const Reports = () => {
  const [checkbox, setCheckbox] = useState({ check: "" });
  const CheckExample = () => {
    const { check } = checkbox;

    const handleChange = (e) => {
      e.persist();
      console.log(e.target.value);

      setCheckbox((prevState) => ({
        ...prevState,
        check: e.target.value,
      }));

      console.log("checkbox: ", checkbox);
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
  return (
    <div>
      <Navbar />
      <h1>Reports Page</h1>
      <CheckExample />
      {checkbox.check === "member" && (
        <>
          <div className="member-info">
            <SelectBasicExample />
            <DateRangePicker />
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;
