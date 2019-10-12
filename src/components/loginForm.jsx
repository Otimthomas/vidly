import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";

class LoginForm extends Component {
	state = {
		data: {
			username: "",
			password: ""
		},
		errors: {}
	};

	schema = {
		username: Joi.string().required(),
		password: Joi.string().required()
	};

	validate() {
		const options = { abortEarly: false };
		const { error } = Joi.validate(this.state.data, this.schema, options);

		if (!error) return null;
		let errors = {};
		for (let item of error.details) errors[item.path[0]] = item.message;
		return errors;
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const errors = this.validate();
		console.log(errors);
		this.setState({ errors: errors || {} });
		if (errors) return;
		// handle some server work
		console.log("Submitted");
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
		console.log(errorMessage);
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];
		const data = { ...this.state.data };
		data[input.name] = input.value;
		this.setState({ data, errors });
	};

	render() {
		const { data, errors } = this.state;
		return (
			<div>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					<Input
						name='username'
						value={data.username}
						label='Username'
						onChange={this.handleChange}
						error={errors.username}
					/>
					<Input
						name='password'
						value={data.password}
						label='Password'
						onChange={this.handleChange}
						error={errors.password}
					/>
					<button className='btn btn-primary'>Login</button>
				</form>
			</div>
		);
	}
}

export default LoginForm;
