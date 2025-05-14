import "./styles.css";

import { ListStorageController } from "./ListStorageController.js";
import { DOMController } from "./DOMController.js";


function loadContent() {
  DOMController.loadSideContent();

  // Make sure there's an active list before load the main content
  const activeList = DOMController.ListManager.getActiveList();
  console.log("activeList:",activeList);
  // If there is no active list after the DOM loads
  if (activeList === null) {
    // then set the list Personal by default
    ListStorageController.setActiveList("personal");
    const personalHTMLList = DOMController.ListManager.getList("personal");
    DOMController.ListManager.setActiveList(personalHTMLList);
  }

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

  // After we garantee there's an active list.
  // Load the main content ( the to-dos of the current active list).
  DOMController.loadMainContent();



  const formBackground = DOMController.TodoManager.form

  formBackground.addEventListener("click", e => {
    if (e.target.className === formBackground.className) {
      DOMController.TodoManager.cleanForm();
      DOMController.TodoManager.removeForm();
    }
  });
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


document.addEventListener("DOMContentLoaded", () => loadContent());
