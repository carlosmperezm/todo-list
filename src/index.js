import "./styles.css";

import { TodoList } from "./TodosList.js";
import { EventHandler } from "./EventHandler.js";
import { ListStorageController } from "./ListStorageController.js";
import { DOMController } from "./DOMController.js";




function loadAddListButton() {
  DOMController.loadAddListButton("Add List");
  const addListButton = DOMController.getAddListButton();

  addListButton.addEventListener("click", () => {

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
      DOMController.ListManager.loadList(list.name);
      // 6. Remove the form from the screejn
      DOMController.ListManager.removeForm();

      DOMController.reloadSideContent();
    });


  });

}

DOMController.TodoManager.form.addEventListener("click", (evt) => {
  // Check for the event on the background of the form only
  // Because clicks in inputs bubble up to the entire form
  if (evt.target.className === "form-background")
    DOMController.TodoManager.removeForm();
})

document.body.addEventListener("click", (evt) => {
  // if (evt.target.className === "form-background") {
  //   const form = document.querySelector(".form-background");
  //   document.body.removeChild(form);
  // }


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
  console.log(evt.target);

  if (evt.target.id == "addList") {
    // TODO: this event is being trigged but
    // we need it out of this scope.
    console.log("waaa");

  }

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
DOMController.loadAddListButton("Add List");

DOMController.getAddTodoButton().addEventListener("click", () => {

  DOMController.TodoManager.loadForm();
})

console.log(DOMController.getAddListButton());
const addListButton = document.querySelector("#addList");
// const a = DOMController.getAddListButton();
addListButton.addEventListener("click", () => {
  console.log("wii");
  //TODO: This event is not being trigged

  // 1. Show list form to create the list
  // DOMController.ListManager.loadForm();

  // DOMController.ListManager.form.addEventListener("submit", evt => {
  //   evt.preventDefault();
  //   // 2. Get the data 
  //   const listName = DOMController.ListManager.getFormData();
  //   // 3. Create the list
  //   const list = new TodoList(listName);
  //   // 4. call the list Storage Controller to save the list 
  //   ListStorageController.saveList(list.name, list);
  //   // 5. Show the list in the DOM
  //   DOMController.ListManager.loadList(list.name);
  //   // 6. Remove the form from the screejn
  //   DOMController.ListManager.removeForm();
  //
  //   DOMController.reloadSideContent();
  // });


});





document.addEventListener("DOMContentLoaded", () => {
  DOMController.reloadSideContent();
  DOMController.ListManager.loadAllTodosFromActiveList();
});



// DOMController.TodoManager.deleteButton.addEventListener("click", evt => {
// TODO::Set up the delete functionality
// DOMController.TodoManager.removeTodo(, evt.dataset.index)
// })

