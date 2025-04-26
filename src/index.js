import "./styles.css";

import { TodoList } from "./TodosList.js";
import { EventHandler } from "./EventHandler.js";
import { ListStorageController } from "./ListStorageController.js";
import { DOMController } from "./DOMController.js";
import { DOMTodoManager } from "./DOMTodoManager.js";
import { DOMListManager } from "./DOMListManager.js";

const sidePanel = document.querySelector(".side-panel");


function loadDefaultLists() {
  const personalList = new TodoList("Personal")
  const workList = new TodoList("Work");
  const schoolList = new TodoList("School");

  workList.active = true;

  ListStorageController.saveList(personalList.name, personalList);
  ListStorageController.saveList(workList.name, workList);
  ListStorageController.saveList(schoolList.name, schoolList);

  const personalListHTML = DOMController.createSideListElement(personalList);
  const workListHTML = DOMController.createSideListElement(workList);
  const schoolListHTML = DOMController.createSideListElement(schoolList);


  sidePanel.appendChild(personalListHTML);
  sidePanel.appendChild(workListHTML);
  sidePanel.appendChild(schoolListHTML);
}


function loadAddListButton() {
  DOMController.loadAddListButton("Add List");
  const addListButton = DOMController.getAddListButton();

  addListButton.addEventListener("click", () => {
    // TODO:

    // 1. Show list form to create the list
    DOMController.ListManager.loadForm();
    const form = DOMController.ListManager.form;
    // 2. Get the data 
    let listName;

    form.addEventListener("submit", evt => {
      evt.preventDefault();
      listName = DOMController.ListManager.getFormData();

      // 3. Create the list
      const list = new TodoList(listName);
      // 4. call the list Storage Controller to save the list 
      ListStorageController.saveList(list.name, list);
      // 5. Show the list in the DOM
      DOMListManager.loadList(list.name);
      // 6. Remove the form from the screejn
      DOMListManager.removeForm();
    });


  });

}

function loadAddTodoButton() {
  DOMController.loadAddTodoButton("Add Todo");
  DOMController.getAddTodoButton().addEventListener("click", () => {
    DOMController.TodoManager.loadForm();
  })

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

    DOMController.reloadMainContent();

    DOMController.getAddTodoButton().addEventListener("click", () => {
      DOMController.TodoManager.loadForm();
    })

  }
})


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

//TODO: Fix: the event "submit" is being pulled from all the
// forms. We don't want that
//
// DOMController.TodoManager.form.addEventListener("submit", (evt) => {
//
//   EventHandler.retrieveTodoData(evt);
//
//   DOMController.reloadMainContent();
//
//   DOMController.getAddTodoButton().addEventListener("click", () => {
//     DOMController.TodoManager.loadForm();
//   })
// });
//
// This is the one we had before 
// document.body.addEventListener("submit", (evt) => {
//
//   if (evt.target.className === ".form-background") {
//
//     EventHandler.retrieveTodoData(evt);
//
//     DOMController.reloadMainContent();
//
//     DOMController.getAddTodoButton().addEventListener("click", () => {
//       DOMController.TodoManager.loadForm();
//     })
//   }
//
// });



ListStorageController.setInactiveList("Work");
ListStorageController.setInactiveList("School");

DOMController.ListManager.loadList("Personal");
DOMController.ListManager.loadList("Work");
DOMController.ListManager.loadList("School");
DOMController.loadAddTodoButton("Add Todo");

DOMController.getAddTodoButton().addEventListener("click", () => {
  DOMController.TodoManager.loadForm();
})
loadAddListButton();


const personalList = DOMController.ListManager.getList("Personal")
DOMController.ListManager.setActiveList(personalList);
ListStorageController.setActiveList(personalList.name);



document.addEventListener("DOMContentLoaded", () => {
  DOMController.ListManager.loadAllTodosFromActiveList();
});

DOMController.TodoManager.deleteButton.addEventListener("click", evt => {
  // TODO::Set up the delete functionality
  // DOMController.TodoManager.removeTodo(, evt.dataset.index)
})

