import React from "react";
import Joi from "joi-browser";
import * as customerService from "../services/customerService";
import Form from "./common/form";

class Customers extends Form {
	state = {
		customers: [],
		data: {
			name: "",
			phone: ""
		},
		errors: {}
	};

	schema = {
		name: Joi.string()
			.required()
			.label("Name"),
		phone: Joi.string()
			.required()
			.label("Phone")
	};

	async componentDidMount() {
		const { data: customers } = await customerService.getCustomers();
		this.setState({ customers });
	}

	doSubmit = async (event) => {
		const { data: customer } = await customerService.saveCustomer(
			this.state.data
		);
		this.setState({ customers: [...this.state.customers, customer] });
		this.setState({
			data: {
				name: "",
				phone: ""
			}
		});
	};

	handleDelete = async (customer) => {
		const originalCustomers = [...this.state.customers];
		const updated = originalCustomers.filter((c) => c._id !== customer._id);
		this.setState({ customers: updated });

		try {
			await customerService.deleteCustomer(customer._id);
		} catch (ex) {
			if (ex.response && ex.response.status === 404)

			this.setState({ movies: originalCustomers });
		}
	};

	render() {
		return (
			<>
				<h1>Customers</h1>
				<div className='row'>
					<div className='col-6'>
						<form onSubmit={this.handleSubmit}>
							{this.renderInput("name", "Name")}
							{this.renderInput("phone", "Phone")}
							{this.renderButton("Create")}
						</form>
					</div>
					<div className='col'>
						{this.state.customers.map((customer, index) => (
							<div key={customer._id}>
								<hr />
								<h4>
									{index + 1}. Name: {customer.name}
								</h4>
								<p>Phone: {customer.phone}</p>
								<p>IsGold: {customer.isGold.toString()}</p>
								<button
									className='btn btn-danger'
									onClick={() => this.handleDelete(customer)}>
									Delete
								</button>
							</div>
						))}
					</div>
				</div>
			</>
		);
	}
}

export default Customers;
