import { useEffect } from "react";
import { ADD_TODO, DELETE_TODO } from "../action/todo.actions";

// window.localStorage.getItem('user');
let initialState = []
if(JSON.parse(window.localStorage.getItem('todolist')) !== null)
{
 initialState = JSON.parse(window.localStorage.getItem('todolist'))
}
console.log("initialState",initialState);
const todoReducer = (state = initialState, action) => {

	const { type, payload } = action;
	switch (type) {
		case ADD_TODO:
			return [...state, payload.todo];
		case DELETE_TODO:
			let todoIndex = state.findIndex((todo) => {
				return todo.id === payload.todoID;
			});
			let stateCopy = [...state]
			let deleted = stateCopy.splice(todoIndex, 1)[0];
			return stateCopy
		default:
			return state
	}

}
export default todoReducer;