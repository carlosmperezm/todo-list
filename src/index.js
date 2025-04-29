import "./styles.css";

import { TodoList } from "./TodosList.js";
import { ListStorageController } from "./ListStorageController.js";
import { DOMController } from "./DOMController.js";




DOMController.loadAddTodoButton("Add Todo");


DOMController.loadAddListButton("Add List");


DOMController.sidePanel.addEventListener("click", (evt) => {
  if (evt.target.className === "list-name-container") {
    const activeListHTML = DOMController.ListManager.getActiveList();
    ListStorageController.toggleActive(activeListHTML.name);
    DOMController.ListManager.toggleActive(activeListHTML);

    ListStorageController.setActiveList(evt.target.name);
    ListStorageController.setInactiveAllListBut(evt.target.name);
    DOMController.ListManager.toggleActive(evt.target);

    DOMController.reloadMainContent();
  }

})



// DOMController.TodoManager.deleteButton.addEventListener("click", evt => {
// TODO::Set up the delete functionality
// DOMController.TodoManager.removeTodo(, evt.dataset.index)
// })


document.addEventListener("DOMContentLoaded", () => loadContent());


function loadContent() {
  DOMController.reloadSideContent();
  DOMController.reloadMainContent();

  const formBackground = DOMController.TodoManager.form

  formBackground.addEventListener("click", e => {
    if (e.target.className === formBackground.className) {
      DOMController.TodoManager.cleanForm();
      DOMController.TodoManager.removeForm();
    }
  })

  formBackground.addEventListener("submit", (evt) => {
    evt.preventDefault();
    // Get the data from the form and work on it
    DOMController.TodoManager.retrieveTodoData(formBackground);
    // clean the form before delete 
    DOMController.TodoManager.cleanForm();
    DOMController.TodoManager.removeForm();
    // // After the data is precessed reload the main content
    DOMController.reloadMainContent();
  });

  // DOMController.getAddTodoButton().addEventListener("click", () =>
  //   DOMController.TodoManager.loadForm())


  // DOMController.getAddListButton().addEventListener("click", () =>
  //   DOMController.ListManager.loadForm())

}


