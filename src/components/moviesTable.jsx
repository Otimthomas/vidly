import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
	columns = [
		{
			path: "title",
			label: "Title"
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
		},
		{
			key: "Delete",
			content: (movie) => (
				<button
					onClick={() => this.props.onDelete(movie)}
					className='btn btn-danger btn-sm'>
					Delete
				</button>
			)
		}
	];
	render() {
		const { movies, onSort, sortColumn, columns } = this.props;
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
