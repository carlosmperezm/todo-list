import { Todo } from "./Todo";
import { TodoList } from "./TodosList";
import { ListStorageController } from "./ListStorageController";

import { createUITodo } from "./createUITodo";
import { createSideUIListName } from "./createSideUIListName";
import { createTodoForm } from "./createTodoForm";

const mainPanel = document.querySelector('.main-panel');
const sidePanel = document.querySelector(".side-panel");


export class EventHandler {

  static createTodo(evt) {
    const formBackground = document.querySelector(".form-background");
    evt.preventDefault();

    const title = document.querySelector("#todoTitle").value;
    const description = document.querySelector("#todoDescription").value;
    const dueDate = document.querySelector("#dueDate").value;
    // const piority = document.querySelector("#todo");

    const todo = new Todo(title, description, dueDate);
    const currentListHTML = document.querySelector(".list-name-container[data-active=true]");
    const currentListObj = ListStorageController.getList(currentListHTML.name);
    console.log("currentListObj", currentListObj)
    const currentList = TodoList.fromJSON(currentListObj);


    currentList.add(todo);

    ListStorageController.saveList(currentList.name, currentList);
    currentListHTML.querySelector(".counter-container span").textContent = currentList.getAll().length;

    document.body.removeChild(formBackground);

  }

  static loadAllTodos() {
    const currentListHTML = document.querySelector(".list-name-container[data-active=true]");
    const currentListObj = ListStorageController.getList(currentListHTML.name);
    console.log(currentListObj);
    const currentList = TodoList.fromJSON(currentListObj);

    currentListHTML.querySelector(".counter-container span").textContent = currentList.getAll().length;

    ListStorageController.getAllTodosFrom(currentList.name).forEach(todoJSON => {
      const todo = Todo.fromJSON(todoJSON);
      const todoHTML = createUITodo(todo);
      mainPanel.appendChild(todoHTML);
    })
  }

  static loadForm() {
    const form = createTodoForm();
    document.body.appendChild(form);

  }

}
