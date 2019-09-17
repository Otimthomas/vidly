import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            movies: getMovies()
         }
    }

    handleDelete = (movie) => {
       const movies = this.state.movies.filter(m => m._id !== movie._id);
       this.setState({movies});
    }

    render() {
        const {length: count} = this.state.movies; 
        if (count === 0)
            return <p>There are no movies in the database</p>;

        return (
            <React.Fragment>
                <p>There are {count} in the database...</p>
                <table className="table">
                <thead>
                    <tr>
                        <td>Title</td>
                        <td>Genre</td>
                        <td>Stock</td>
                        <td>Rate</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.movies.map(movie => 
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td>
                                <button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            </React.Fragment>
        )
    }
}
 
export default Movies;