import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const ComboBox = (props) => {
  const { options, memberSelect } = props;
  const [selectedMember, setSelectedMember] = useState(null);

  // useEffect(() => {
  //   const close = document.getElementsByClassName(
  //     "MuiAutocomplete-clearIndicator"
  //   )[0];
  //   // Add a Click Event Listener to the button
  //   // close.addEventListener("click", () => {
  //   //   alert("Add your Own Functionality Here...");
  //   // });
  //   const hey = () => {
  //     console.log("bruh");
  //   };
  //   if (close) {
  //     close.addEventListener("click", hey, false);
  //   }
  // }, [selectedMember]);

  console.log(options);

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
