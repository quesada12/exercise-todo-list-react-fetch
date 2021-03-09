import React from "react";
import { useState, useEffect } from "react";
import "../../styles/style.css";
import { Task } from "../component/task.js";

export function Todolist() {
	//States
	const [inputValue, setInputValue] = useState("");
	const [lenItems, setlenItems] = useState("");
	const [items, setItems] = useState([]);

	//CARGA INICIAL
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/quesada12")
			.then(response => response.json())
			.then(result => setItems(result))
			.catch(error => console.log("error", error));
	}, []);

	//ACTUALIZACION
	useEffect(() => {
		setlenItems(items.length);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/quesada12", {
			method: "PUT",
			body: JSON.stringify(items),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				console.log(error);
			});
	});

	//Events
	const addItem = e => {
		if (e.key == "Enter" && inputValue != "") {
			let item = { label: inputValue, done: false };
			setItems(prevState => [...prevState, item]);
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

	const deleteList = e => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/quesada12", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.text())
			.then(result => {
				console.log(result);
				fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/quesada12",
					{
						method: "POST",
						body: "[]",
						headers: {
							"Content-Type": "application/json"
						}
					}
				)
					.then(response => response.text())
					.then(result => {
						console.log(result);
						fetch(
							"https://assets.breatheco.de/apis/fake/todos/user/quesada12"
						)
							.then(response => response.json())
							.then(result => setItems(result))
							.catch(error => console.log("error", error));
					})
					.catch(error => console.log("error", error));
			})
			.catch(error => console.log("error", error));
	};

	// Structure
	let itemsMap = items.map((element, index) => {
		return (
			<Task
				element={element.label}
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
					<li className="list-group-item item">
						<strong>{lenItems} items left</strong>
						<button
							type="button"
							className="btn btn-danger"
							onClick={e => deleteList(e)}>
							Eliminar Lista
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
}
