import "./styles.css";

import { TodoList } from "./TodosList.js";
import { EventHandler } from "./EventHandler.js";
import { ListStorageController } from "./ListStorageController.js";
import { DOMController } from "./DOMController.js";

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

  const personalListHTML = DOMController.createSideListElement(personalList); //createSideUIListName(personalList);
  const workListHTML = DOMController.createSideListElement(workList); //createSideUIListName(workList);
  const schoolListHTML = DOMController.createSideListElement(schoolList);//createSideUIListName(schoolList);


  sidePanel.appendChild(personalListHTML);
  sidePanel.appendChild(workListHTML);
  sidePanel.appendChild(schoolListHTML);
}


function loadAddListButton() {
  DOMController.loadAddListButton("Add List");
  const addListButton = DOMController.getAddListButton();

  addListButton.addEventListener("click", () => {
    // TODO:
  });

}

function loadAddTodoButton() {
  DOMController.loadAddTodoButton("Add Todo");
  const addTodoButton = DOMController.getAddTodoButton();

  addTodoButton.addEventListener("click", () => {
    const form = DOMController.TodoManager.createTodoForm();

    document.body.appendChild(form);
  });
}


document.body.addEventListener("click", (evt) => {
  if (evt.target.className === "form-background") {
    const form = document.querySelector(".form-background");
    document.body.removeChild(form);
  }


  if (evt.target.className === "list-name-container") {

    const activeListHTML = DOMController.ListManager.getActiveList();
    ListStorageController.toggleActive(activeListHTML.name);
    DOMController.ListManager.toggleActive(activeListHTML);


    ListStorageController.setActiveList(evt.target.name);
    ListStorageController.setInactiveAllListBut(evt.target.name);
    DOMController.ListManager.toggleActive(evt.target);

    //TODO:

    reloadMainContent()
    // reloadSideContent();

  }
})

function reloadMainContent() {
  DOMController.ListManager.removeAllTodosfromMainPanel();
  DOMController.removeButton("addTodo");
  DOMController.ListManager.loadAllTodosFromActiveList();
  loadAddTodoButton();
}

function reloadSideContent() {
  const allListsHTML = document.querySelectorAll(".list-name-container");
  allListsHTML.forEach(listHTML => {

    sidePanel.removeChild(listHTML);
  });
  DOMController.removeButton("addList");
  // removeButton("addList");

  DOMController.ListManager.loadList("Personal");
  DOMController.ListManager.loadList("Work");
  DOMController.ListManager.loadList("School");

  loadAddListButton();
}


document.body.addEventListener("submit", (evt) => {

  EventHandler.createTodo(evt);
  reloadMainContent();

});



ListStorageController.setInactiveList("Work");
ListStorageController.setInactiveList("School");

DOMController.ListManager.loadList("Personal");
DOMController.ListManager.loadList("Work");
DOMController.ListManager.loadList("School");
loadAddTodoButton();
loadAddListButton();


const personalList = DOMController.ListManager.getList("Personal")
DOMController.ListManager.setActiveList(personalList);
ListStorageController.setActiveList(personalList.name);



document.addEventListener("DOMContentLoaded", () => {
  DOMController.ListManager.loadAllTodosFromActiveList();
});


