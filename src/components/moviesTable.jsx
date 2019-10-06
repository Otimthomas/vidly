import React, { Component } from "react";
import Like from "./common/like";
import MoviesHeader from "./common/moviesHeader";

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
		{ key: "Like" },
		{ key: "Delete" }
	];
	render() {
		const { movies, onLike, onDelete, onSort, sortColumn } = this.props;
		return (
			<table className='table'>
				{/* <thead>
					<tr>
						<th onClick={() => this.raiseSort("title")}>Title</th>
						<th onClick={() => this.raiseSort("genre.name")}>Genre</th>
						<th onClick={() => this.raiseSort("numberInStock")}>Stock</th>
						<th onClick={() => this.raiseSort("dailyRentalRate")}>Rate</th>
						<th></th>
						<th></th>
					</tr>
				</thead> */}
				<MoviesHeader
					columns={this.columns}
					sortColumn={sortColumn}
					onSort={onSort}
				/>
				<tbody>
					{movies.map((movie) => (
						<tr key={movie._id}>
							<td>{movie.title}</td>
							<td>{movie.genre.name}</td>
							<td>{movie.numberInStock}</td>
							<td>{movie.dailyRentalRate}</td>
							<td>
								<Like
									isLiked={movie.liked}
									onIconChange={() => onLike(movie)}
								/>
							</td>
							<td>
								<button
									onClick={() => onDelete(movie)}
									className='btn btn-danger btn-sm'>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}

export default MoviesTable;
