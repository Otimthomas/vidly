import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSortAlphaDown,
	faSortAlphaUp
} from "@fortawesome/free-solid-svg-icons";

class MoviesHeader extends Component {
	raiseSort = (path) => {
		const sortColumn = { ...this.props.sortColumn };
		if (sortColumn.path === path) {
			sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
		} else {
			sortColumn.path = path;
			sortColumn.order = "asc";
		}
		this.props.onSort(sortColumn);
	};

	renderSortIcon = (column) => {
		const { sortColumn } = this.props;
		if (sortColumn.path !== column.path) return null;
		if (sortColumn.order === "asc")
			return <FontAwesomeIcon icon={faSortAlphaDown} />;
		return <FontAwesomeIcon icon={faSortAlphaUp} />;
	};

	render() {
		const { columns } = this.props;
		return (
			<thead>
				<tr>
					{columns.map((column) => (
						<th
							key={column.path || column.key}
							onClick={() => this.raiseSort(column.path)}>
							{column.label} {this.renderSortIcon(column)}
						</th>
					))}
				</tr>
			</thead>
		);
	}
}

export default MoviesHeader;
