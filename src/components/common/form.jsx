import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import Textarea from "./textArea";

class Form extends Component {
	state = {
		data: {},
		errors: {}
	};

	validate() {
		const options = { abortEarly: false };
		const { error } = Joi.validate(this.state.data, this.schema, options);

		if (!error) return null;
		let errors = {};
		for (let item of error.details) errors[item.path[0]] = item.message;
		console.log(errors);
		return errors;
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const errors = this.validate();
		//console.log(errors);
		this.setState({ errors: errors || {} });
		if (errors) return;
		this.doSubmit();
	};

	validateProperty({ value, name }) {
		const obj = { [name]: value };
		const schema = { [name]: this.schema[name] };
		const { error } = Joi.validate(obj, schema);
		return error ? error.details[0].message : null;
	}

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(input);
		//console.log(errorMessage);
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];
		const data = { ...this.state.data };
		data[input.name] = input.value;
		this.setState({ data, errors });
	};

	renderInput(name, label, type = "text") {
		const { data, errors } = this.state;
		return (
			<Input
				name={name}
				value={data[name]}
				label={label}
				type={type}
				onChange={this.handleChange}
				error={errors[name]}
			/>
		);
	}

	renderSelect(name, label, options) {
		const { data, errors } = this.state;
		return (
			<Select
				name={name}
				options={options}
				value={data[name]}
				label={label}
				onChange={this.handleChange}
				error={errors[name]}
			/>
		);
	}

	renderTextareat(name, label) {
		const { data, errors } = this.state;
		return (
			<Textarea
				name={name}
				value={data[name]}
				label={label}
				onChange={this.handleChange}
				error={errors[name]}
			/>
		);
	}

	renderButton(label) {
		return (
			<button className='btn btn-primary' disabled={this.validate()}>
				{label}
			</button>
		);
	}
}

export default Form;
