import "./styles.css";

import { TodoList } from "./TodosList.js";
import { ListStorageController } from "./ListStorageController.js";
import { DOMController } from "./DOMController.js";


DOMController.TodoManager.form.addEventListener("click", (evt) => {
  // Check for the event on the background of the form only
  // Because clicks in inputs bubble up to the entire form
  if (evt.target.className === "form-background")
    DOMController.TodoManager.removeForm();
})



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



DOMController.ListManager.loadList("Personal");

DOMController.loadAddTodoButton("Add Todo");
DOMController.getAddTodoButton().addEventListener("click", () => {
  DOMController.TodoManager.loadForm();
})


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
    // Must set the listener event in the new button created
    DOMController.getAddTodoButton().addEventListener("click", () => {
      DOMController.TodoManager.loadForm();
    })
  }

})



// DOMController.TodoManager.deleteButton.addEventListener("click", evt => {
// TODO::Set up the delete functionality
// DOMController.TodoManager.removeTodo(, evt.dataset.index)
// })


document.addEventListener("DOMContentLoaded", () => {
  DOMController.reloadSideContent();

  DOMController.ListManager.loadAllTodosFromActiveList();

  DOMController.getAddListButton().addEventListener("click", () => {
    // 1. Show list form to create the list
    DOMController.ListManager.loadForm();

    DOMController.ListManager.form.addEventListener("submit", evt => {
      evt.preventDefault();
      // 2. Get the data 
      const listName = DOMController.ListManager.getFormData();
      // 3. Create the list
      const list = new TodoList(listName);
      // 4. call the list Storage Controller to save the list 
      ListStorageController.saveList(list.name, list);
      // 5. Show the list in the DOM
      DOMController.ListManager.loadList(list.name);
      // 6. Remove the form from the screejn
      DOMController.ListManager.removeForm();

      DOMController.reloadSideContent();
    });


  },);
});




