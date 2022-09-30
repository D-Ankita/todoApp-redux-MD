import { useDispatch, useSelector } from "react-redux";
import { ADD_TODO, DELETE_TODO, EDIT_TODO } from "../redux/action/todo.actions";
import uniqid from 'uniqid';
import Todo from "./Todo";
import styles from './TodoList.module.css'
import { GrFormAdd } from "react-icons/gr";

const { useState } = require("react")
function TodoList() {
	const todos = useSelector((state) => state.todo)
	const [textInput, setTextInput] = useState("")
	const [isEditOn, setIsEditOn] = useState(false)
	const dispatch = useDispatch();

	//everytime todos get updated these two lines will execute
	console.log("todos updated", todos);
	window.localStorage.setItem('todolist', JSON.stringify(todos));


	const add_todo = () => {
		dispatch({ type: ADD_TODO, payload: { todo: { id: uniqid(), description: textInput, isComplete:false } } })
		window.localStorage.setItem('todolist', JSON.stringify(todos));
		// console.log("after add", todos);
	}


	const handelSubmit = (event) => {
		event.preventDefault()
		add_todo()
		setTextInput("")
	}

	const handelChange = (event) => {
		setTextInput(event.target.value)
	}


	return (<div className={styles.todo}>
		<div className={styles.logo}>		</div>
		<form onSubmit={handelSubmit} className={styles.todoContainer}>
			<h3 className={styles.heading}>Todo List</h3>
			{/* <label htmlFor="textInput">Todo </label> */}
			<input className={styles.todoInput} id="textInput" value={textInput} onChange={handelChange} placeholder="Add a task"></input>
			<button type="submit" className={styles.submitButton}>➕</button>
		</form>
		<div className={styles.todoListContainer}>
			{
				todos.map((todo) => {
					// console.log("------",todo);
					return (
						<Todo key={todo.id} todo={todo}/>
						)
				})
			}
		</div>
	</div>)
}

export default TodoList;