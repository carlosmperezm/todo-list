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

function removeButton(buttonId) {
  const button = document.querySelector(`#${buttonId}`);
  button.parentNode.removeChild(button);
}

function loadList(name, active = false) {
  const listObj = ListStorageController.getList(name) | undefined;
  let list;

  if (!listObj) {
    list = new TodoList(name);
    ListStorageController.saveList(list.name, list);
  }
  else {
    list = TodoList.fromJSON(listObj);
  }
  list.active = active;
  const listHTML = createSideUIListName(list);
  listHTML.dataset.active = active;
  sidePanel.appendChild(listHTML);

  return listHTML;
}

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


function loadAddListButton() {
  const addListButton = createAddButton("Add List");
  addListButton.id = "addList";
  sidePanel.appendChild(addListButton);

  addListButton.addEventListener("click", () => {
    // TODO:
  });

}

function loadAddTodoButton() {
  const addTodoButton = createAddButton("Add Todo");
  addTodoButton.id = "addTodo";
  mainPanel.appendChild(addTodoButton);

  addTodoButton.addEventListener("click", () => {
    const form = createTodoForm();

    document.body.appendChild(form);
  });
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

  if (evt.target.className === "list-name-container") {
    console.log("clicked");
    const activeListHTML = document.querySelector(".list-name-container[data-active=true]");
    const activeListObj = ListStorageController.getList(activeListHTML.name);
    const activeList = TodoList.fromJSON(activeListObj);
    activeListHTML.dataset.active = false;
    activeList.active = false;
    ListStorageController.saveList(activeList.name, activeList);


    const targetListObj = ListStorageController.getList(evt.target.name);
    const targetList = TodoList.fromJSON(targetListObj);
    evt.target.dataset.active = true;
    targetList.active = true;
    ListStorageController.saveList(targetList.name, targetList);
    console.log("clicked2");
    //TODO:

    reloadMainContent()
    // reloadSideContent();

  }
})

function reloadMainContent() {
  removeAllTodosfromMainPanel();
  removeButton("addTodo");
  EventHandler.loadAllTodos();
  loadAddTodoButton();
}

function reloadSideContent() {
  const allListsHTML = document.querySelectorAll(".list-name-container");
  allListsHTML.forEach(listHTML => {

    sidePanel.removeChild(listHTML);
  });
  removeButton("addList");


  loadList("Personal");
  loadList("Work")
  loadList("School")
  loadAddListButton();
}


document.body.addEventListener("submit", (evt) => {

  EventHandler.createTodo(evt);
  reloadMainContent();

});



// loadDefaultLists();

loadList("Personal", true)
loadList("Work")
loadList("School")
loadAddTodoButton();
loadAddListButton();


const activeListHTML = document.querySelector('.list-name-container[name="Personal"]');
// activeListHTML.dataset.active = true;
const activeListObj = ListStorageController.getList(activeListHTML.name);
const activeList = TodoList.fromJSON(activeListObj);
activeList.active = true;
ListStorageController.saveList(activeList.name, activeList);
// loadList("Personal");



document.addEventListener("DOMContentLoaded", () => {
  EventHandler.loadAllTodos();
  console.log("Page Loaded");
});


