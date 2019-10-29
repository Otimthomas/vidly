import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import auth from "../services/authService";

class MoviesTable extends Component {
	constructor() {
		super();
		const user = auth.getCurrentUser();
		if (user && user.isAdmin) this.columns.push(this.deleteColumn);
	}

	columns = [
		{
			path: "title",
			label: "Title",
			content: (movie) =>
				this.props.user ? (
					<Link to={`movies/${movie._id}`}>{movie.title}</Link>
				) : (
					<p>{movie.title}</p>
				)
		},
		{
			path: "genre.name",
			label: "Genre"
		},
		{
			path: "numberInStock",
			label: "Stock"
		},
		{
			path: "dailyRentalRate",
			label: "Rate"
		},
		{
			key: "Like",
			content: (movie) => (
				<Like
					isLiked={movie.liked}
					onIconChange={() => this.props.onLike(movie)}
				/>
			)
		}
	];

	deleteColumn = {
		key: "Delete",
		content: (movie) => (
			<button
				onClick={() => this.props.onDelete(movie)}
				className='btn btn-danger btn-sm'>
				Delete
			</button>
		)
	};

	render() {
		const { movies, onSort, sortColumn } = this.props;
		return (
			<Table
				data={movies}
				columns={this.columns}
				onSort={onSort}
				sortColumn={sortColumn}
			/>
		);
	}
}

export default MoviesTable;
