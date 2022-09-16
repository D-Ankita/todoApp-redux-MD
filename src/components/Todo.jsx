import { useDispatch, useSelector } from "react-redux";
import { ADD_TODO, DELETE_TODO } from "../redux/action/todo.actions";
import uniqid from 'uniqid';

const { useState } = require("react")

function Todo() {
	const todos = useSelector((state) => state.todo)
	const [textInput, setTextInput] = useState("")
	const dispatch = useDispatch();
	const add_todo = () => {
		dispatch({ type: ADD_TODO, payload: { todo: {id:uniqid(), description:textInput} } })
		window.localStorage.setItem('todolist', JSON.stringify(todos));
	}

	const delete_todo = (event) => {
		dispatch({ type: DELETE_TODO, payload: { todoID:event.target.id } })
	}

	const handelSubmit = (event) => {
		event.preventDefault()
		add_todo()
		setTextInput("")
	}


	const handelChange = (event) => {
		setTextInput(event.target.value)
	}


	return (<>
		<form onSubmit={handelSubmit}>
			<h3>Todo List</h3>
			<label htmlFor="textInput">Todo </label>
			<input id="textInput" value={textInput} onChange={handelChange} placeholder="Add a task"></input>
			<button type="submit">Add</button>
		</form>
		<div>
			{
				todos.map((todo) => { 
					return (<div key={todo.id}>
						<p >{todo.description} </p><button id={todo.id} onClick={delete_todo}>Delete</button>
					</div>) })
			}
		</div>
	</>)
}

export default Todo;