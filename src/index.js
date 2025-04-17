import "./styles.css";


import { Todo } from "./Todo.js";
import { TodoList } from "./TodosList.js";

import { createUITodo } from "./createUITodo.js";
import { createSideUIListName } from "./createSideUIListName.js";
import { createAddButton } from "./createButton.js";
import { createTodoForm } from "./createTodoForm.js";

import { EventHandler } from "./EventHandler.js";
import { ListStorageController } from "./ListStorageController.js";

const mainPanel = document.querySelector(".main-panel");
const sidePanel = document.querySelector(".side-panel");


function loadDefaultLists() {
  const personalList = new TodoList("Personal")
  const workList = new TodoList("Work");
  const schoolList = new TodoList("School");

  workList.active = true;

  ListStorageController.saveList(personalList.name, personalList);
  ListStorageController.saveList(workList.name, workList);
  ListStorageController.saveList(schoolList.name, schoolList);

  const personalListHTML = createSideUIListName(personalList);
  const workListHTML = createSideUIListName(workList);
  const schoolListHTML = createSideUIListName(schoolList);


  sidePanel.appendChild(personalListHTML);
  sidePanel.appendChild(workListHTML);
  sidePanel.appendChild(schoolListHTML);
}



function loadButtons() {

  const addTodoButton = createAddButton("Add Todo");
  const addListButton = createAddButton("Add List");

  mainPanel.appendChild(addTodoButton);
  sidePanel.appendChild(addListButton);
}


function removeAllTodosfromMainPanel() {

  const allTodosHTML = document.querySelectorAll(".todo-container");

  allTodosHTML.forEach(todo => mainPanel.removeChild(todo));
}


document.body.addEventListener("click", (evt) => {
  if (evt.target.className === "form-background") {
    const form = document.querySelector(".form-background");
    document.body.removeChild(form);
  }
})


document.body.addEventListener("submit", (evt) => {

  EventHandler.createTodo(evt);

  removeAllTodosfromMainPanel();

  EventHandler.loadAllTodos();

});



loadDefaultLists();
loadButtons();

document.addEventListener("DOMContentLoaded", () => {
  EventHandler.loadAllTodos();
  console.log("Page Loaded");
});

const addTodoButton = mainPanel.querySelector(".add-button");
addTodoButton.addEventListener("click", () => {
  const form = createTodoForm();

  document.body.appendChild(form);
});

