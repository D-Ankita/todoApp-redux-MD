import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TODO, DELETE_TODO, EDIT_TODO } from "../redux/action/todo.actions";

function Todo({todo}) {
	// console.log(todo);
	// const todos = useSelector((state) => state.todo)

	const [isEditOn, setIsEditOn] = useState(false)
	const [localValue,setLocalValue] = useState(todo.description)
	const dispatch = useDispatch();

	const delete_todo = (event) => {
		dispatch({ type: DELETE_TODO, payload: { todoID: event.target.id } })
	}

	const edit_todo = (event) => {
		setIsEditOn(true)
		// dispatch({type:EDIT_TODO, payload: { todoID:event.target.id, }})
	}
	const save_todo = (event) => {
		setIsEditOn(false)
		dispatch({ type: EDIT_TODO, payload: { todoID: event.target.id, updateText:localValue } })
	}

	const handelEdit = (event) => {
		setLocalValue(event.target.value)
	}
	return <div key={todo.id}>
		<input id={todo.id} value={localValue} disabled={!isEditOn} onChange={handelEdit}></input>
		<button id={todo.id} onClick={delete_todo}>Delete</button>
		{isEditOn ? <button id={todo.id} onClick={save_todo}>save</button> : <button id={todo.id} onClick={edit_todo}>Edit</button>}
	</div>
}
export default Todo;