import React from "react";
import { useState, useEffect } from "react";
import "../../styles/style.css";
import { Task } from "../component/task.js";

export function Todolist() {
	//States
	const [inputValue, setInputValue] = useState("");
	const [lenItems, setlenItems] = useState("");
	const [items, setItems] = useState([]);

	useEffect(() => {
		setlenItems(items.length);
	});

	//Events
	const addItem = e => {
		if (e.key == "Enter" && inputValue != "") {
			setItems(prevState => [...prevState, inputValue]);
			setInputValue("");
		}
	};

	const deleteItem = e => {
		setItems(
			items.filter((element, index) => {
				return index != e;
			})
		);
	};

	// Structure
	let itemsMap = items.map((element, index) => {
		return (
			<Task
				element={element}
				key={index}
				function={e => deleteItem(index)}
			/>
		);
	});

	return (
		<div className="mt-3">
			<h1 className="text-center display-4 text-primary">To Do List</h1>
			<div className="listContainer">
				<input
					className="list-group-item"
					autoFocus
					type="text"
					onKeyDown={e => addItem(e)}
					onChange={e => setInputValue(e.target.value)}
					value={inputValue}
					placeholder="Write task"></input>
				<ul className="list-group">
					{itemsMap}
					<li className="list-group-item">
						<strong>{lenItems} items left</strong>
					</li>
				</ul>
			</div>
		</div>
	);
}
