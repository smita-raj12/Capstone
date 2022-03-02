import React from "react";
import Select from "../common/Select";

const SelectBox = ({
    name,
    value,
    options,
    onChange,
}) => {
  //console.log("value",value);
    return (
        <Select
            name={name}
            value={value}
            label={name}
            options={options}
            onChange={(e) => onChange(e.currentTarget.value)}
        />
    );
};

export default SelectBox;
