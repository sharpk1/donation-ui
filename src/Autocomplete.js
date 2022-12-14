import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const ComboBox = (props) => {
  const { options } = props;
  console.log("options: ", options);

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
  // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
  // const options = [
  //   { label: "Kush Shah", id: 1 },
  //   { label: "Tom Smith", id: 2 },
  //   { label: "John Doe", id: 3 },
  // ];

  return (
    <div className="autocomplete-members">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={transformOptions(options)}
        sx={{ width: 300 }}
        // style={{ maxHeight: "38px" }}
        renderInput={(params) => (
          <TextField {...params} label="Member" size="small" />
        )}
      />
    </div>
  );
};

export default ComboBox;
