import "./styles.css";

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


// DOMController.TodoManager.actionButtons.deleteButton.addEventListener("click", e => {
//   console.log(e.target);
//   // TODO::Set up the delete functionality
//   // DOMController.TodoManager.removeTodo(, evt.dataset.index)
// })


document.addEventListener("DOMContentLoaded", () => loadContent());

const activeList = DOMController.ListManager.getActiveList();
if (activeList === "null") {
  ListStorageController.setActiveList("personal");
  const personalHTMLList = DOMController.ListManager.getList("personal");
  DOMController.ListManager.setActiveList(personalHTMLList);

}


function loadContent() {
  DOMController.reloadSideContent();
  DOMController.reloadMainContent();

  // DOMController.TodoManager.loadEvents();

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


}


