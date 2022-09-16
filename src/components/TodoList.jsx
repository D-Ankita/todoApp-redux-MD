import { useDispatch, useSelector } from "react-redux";
import { ADD_TODO, DELETE_TODO, EDIT_TODO } from "../redux/action/todo.actions";
import uniqid from 'uniqid';
import Todo from "./Todo";

const { useState } = require("react")

function TodoList() {
	const todos = useSelector((state) => state.todo)
	const [textInput, setTextInput] = useState("")
	const [isEditOn, setIsEditOn] = useState(false)
	const dispatch = useDispatch();

	//everytime todos get updated these two lines will execute
	console.log("todos", todos);
	window.localStorage.setItem('todolist', JSON.stringify(todos));


	const add_todo = () => {
		dispatch({ type: ADD_TODO, payload: { todo: { id: uniqid(), description: textInput } } })
		window.localStorage.setItem('todolist', JSON.stringify(todos));
		console.log("after add", todos);
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
					// console.log(todo);
					return (
						<Todo key={todo.id} todo={todo}/>
						)
				})
			}
		</div>
	</>)
}

export default TodoList;