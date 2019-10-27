import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";
import _ from "lodash";

class Movies extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: [],
			genres: [],
			pageSize: 4,
			currentPage: 1,
			searchQuery: "",
			selectedGenre: null,
			sortColumn: {
				path: "title",
				order: "asc"
			}
		};
	}

	componentDidMount() {
		const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
		this.setState({ movies: getMovies(), genres });
	}

	handleDelete = (movie) => {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
	};

	handleInconChange = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
	};

	handleSort = (sortColumn) => {
		//console.log(path);
		// this.setState({sortColumn: {path, order: 'asc'}});
		// console.log(this.state.sortColumn);
		this.setState({ sortColumn });
	};

	getPagedData = () => {
		const {
			currentPage,
			pageSize,
			movies: allMovies,
			selectedGenre,
			searchQuery,
			sortColumn
		} = this.state;

		let filtered = allMovies;
		if (searchQuery)
			filtered = allMovies.filter((m) =>
				m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		else if (selectedGenre && selectedGenre._id)
			filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

		const movies = paginate(sorted, currentPage, pageSize);

		return { totalCount: filtered.length, data: movies };
	};

	handleSearch = (query) => {
		this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
	};

	render() {
		const { length: count } = this.state.movies;
		const {
			currentPage,
			pageSize,
			genres,
			selectedGenre,
			searchQuery,
			sortColumn
		} = this.state;

		if (count === 0) return <p>There are no movies in the database</p>;

		const { totalCount, data: movies } = this.getPagedData();

		return (
			<React.Fragment>
				<div className='row'>
					<div className='col-3'>
						<ListGroup
							items={genres}
							onItemSelect={this.handleGenreSelect}
							itemSelected={selectedGenre}
						/>
					</div>
					<div className='col'>
						<Link className='btn btn-primary' to='/movies/new'>
							Add Movie
						</Link>
						<p>There are {totalCount} in the database...</p>
						<SearchBox value={searchQuery} onChange={this.handleSearch} />
						<MoviesTable
							movies={movies}
							onLike={this.handleInconChange}
							onDelete={this.handleDelete}
							onSort={this.handleSort}
							sortColumn={sortColumn}
						/>
						<Pagination
							itemCount={totalCount}
							pageSize={pageSize}
							onPageChange={this.handlePageChange}
							currentPage={currentPage}
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Movies;
