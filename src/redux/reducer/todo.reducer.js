import { useEffect } from "react";
import { ADD_TODO, DELETE_TODO, EDIT_TODO, UPDATE_TODO } from "../action/todo.actions";

// window.Storage.getItem('user');
let initialState = [] 
if (JSON.parse(window.localStorage.getItem('todolist')) !== null) {
	initialState = JSON.parse(window.localStorage.getItem('todolist'))
}
// console.log("initialState", initialState);
const todoReducer = (state = initialState, action) => {

	const { type, payload } = action;
	// console.log("payload",payload);
	switch (type) {
		case ADD_TODO:
			return [...state, payload.todo];
		case DELETE_TODO: {
			let stateCopy = [...state]
			let todoIndex = state.findIndex((todo) => {
				return todo.id === payload.todoID;
			});
			let deleted = stateCopy.splice(todoIndex, 1)[0];
			return stateCopy
		}
		case EDIT_TODO: {
			let stateCopy = [...state]
			let todoIndex = state.findIndex((todo) => {
				return todo.id === payload.todoID;
			});
			stateCopy[todoIndex].description = payload.updateText
			console.log("stateCopy",stateCopy);
			return stateCopy
		}
		case UPDATE_TODO: {
			let stateCopy = [...state]
			let todoIndex = state.findIndex((todo) => {
				return todo.id === payload.todoID;
			});
			stateCopy[todoIndex].isComplete = payload.updateStatus
			console.log("stateCopy",stateCopy);
			return stateCopy
		}
		default:
			return state
	}

}
export default todoReducer;

