import React from "react";
import PropTypes from "prop-types";

export function Task(props) {
	return (
		<li className="list-group-item item">
			{props.element}
			<button
				type="button"
				className="btn btn-outline-danger"
				onClick={props.function}>
				X
			</button>
		</li>
	);
}

Task.propTypes = {
	element: PropTypes.string,
	function: PropTypes.func
};
