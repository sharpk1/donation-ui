import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const ComboBox = (props) => {
  const { options, memberSelect, num } = props;
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    setSelectedMember(null);
  }, [num]);

  return (
    <div className="autocomplete-members">
      <Autocomplete
        onChange={(_event, newValue) => {
          setSelectedMember(newValue);
          memberSelect(newValue);
        }}
        value={selectedMember}
        disablePortal
        id="combo-box-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Member" size="small" />
        )}
        getOptionLabel={(option) => {
          return `${option.firstName} ${option.lastName}`;
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
      />
    </div>
  );
};

export default ComboBox;
