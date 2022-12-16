import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const ComboBox = (props) => {
  const { options, memberSelect } = props;

  const transformOptions = (data) => {
    let final = [];
    data.forEach((donor) => {
      let name = `${donor.firstName} ${donor.lastName}`;
      let id = donor.id;
      final.push({
        label: name,
        id: id,
      });
    });
    return final;
  };

  console.log(transformOptions(options));

  return (
    <div className="autocomplete-members">
      <Autocomplete
        onChange={(_event, newValue) => {
          console.log(newValue);
          memberSelect(newValue);
          console.log(JSON.stringify(newValue, null, " "));
        }}
        disablePortal
        id="combo-box-demo"
        options={transformOptions(options)}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Member" size="small" />
        )}
        isOptionEqualToValue={(option, value) => option.id === value.id}
      />
    </div>
  );
};

export default ComboBox;
