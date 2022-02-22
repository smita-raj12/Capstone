import React, { Component } from "react";
import Input from "./Input";
import Select from "./Select";

class Form extends Component {
  state = {
    data: {},
    error:{}
  };

  handleChange = ({ currentTarget: input }) => {
    
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });

  };

  handleSubmit = (e) => {
    e.preventDefault();
  
    this.doSubmit();
  };

  renderButton(label) {
    return (
      <button className="btn btn-primary mt-3">
        {label}
      </button>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderInput(name, label, type = "text", readOnly = false) {
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        type={type}
        label={label}
        readOnly={readOnly}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
