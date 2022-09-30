import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TODO, DELETE_TODO, EDIT_TODO, UPDATE_TODO } from "../redux/action/todo.actions";
import styles from './Todo.module.css'

import { MdDelete, MdFileDownloadDone } from "react-icons/md";
import { BsPencilFill } from 'react-icons/bs'

function Todo({ todo }) {
	// console.log(todo);
	const todos = useSelector((state) => state.todo)

	const [isEditOn, setIsEditOn] = useState(false)
	const [localValue, setLocalValue] = useState(todo.description)
	const [localIsComplete, setLocalIsComplete] = useState(todo.isComplete)
	const dispatch = useDispatch();

	const update_todo = (event) => {
		console.log("localIsComplete before", localIsComplete);
		setLocalIsComplete(!localIsComplete)
		dispatch({ type: UPDATE_TODO, payload: { todoID: event.target.id, updateStatus: !localIsComplete } })
		console.log("localIsComplete--after", localIsComplete);
	}
	const delete_todo = (event) => {
		console.log("delete", event.target.id);
		dispatch({ type: DELETE_TODO, payload: { todoID: event.target.id } })
	}

	const edit_todo = (event) => {
		console.log("edit_todo", event);
		setIsEditOn(true)
		// dispatch({type:EDIT_TODO, payload: { todoID:event.target.id, }})
	}
	const save_todo = (event) => {
		console.log("save_todo", event.target.id);
		setIsEditOn(false)
		dispatch({ type: EDIT_TODO, payload: { todoID: event.target.id, updateText: localValue } })
	}

	const handelEdit = (event) => {
		setLocalValue(event.target.value)
	}
	return <div key={todo.id} className={styles.todo}>
		{localIsComplete ? <input id={todo.id} value={localValue} disabled={!isEditOn} onChange={handelEdit} className={styles.todoItemDone}></input> : <input id={todo.id} value={localValue} disabled={!isEditOn} onChange={handelEdit} className={styles.todoItem}></input>}

		<button id={todo.id} onClick={update_todo} className={styles.Button}  >{localIsComplete ? '🎯' : '⭕'}</button>

		<button id={todo.id} onClick={delete_todo} className={styles.Button} >🗑️</button>
		{isEditOn ? <button id={todo.id} onClick={save_todo} className={styles.Button}>✅</button> : <button id={todo.id} onClick={edit_todo} className={styles.Button} disabled={localIsComplete}>✏️</button >}

	</div>
}
export default Todo;



