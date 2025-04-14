import "./styles.css";


import { Todo } from "./Todo.js";
import { TodoList } from "./TodosList.js";

import { createUITodo } from "./createUITodo.js";
import { createSideUIListName } from "./createSideUIListName.js";
import { createAddButton } from "./createButton.js";
import { createTodoForm } from "./createTodoForm.js";

import { EventHandler } from "./EventHandler.js";

// const myTodo1 = new Todo("My Todo1", "nov-2-25");
// const myTodo2 = new Todo("My Todo2", "nov-2-25");
// const myTodo3 = new Todo("My Todo3", "nov-2-25");
// const myTodo4 = new Todo("My Todo4", "nov-2-25");
// const myTodo5 = new Todo("My Todo5", "nov-2-25");
// const myTodo6 = new Todo("My Todo6", "nov-2-25");
// const myTodo7 = new Todo("My Todo7", "nov-2-25");

const defaultList = new TodoList("Work");
defaultList.active = true;
localStorage.setItem(defaultList.name, JSON.stringify(defaultList))
const defaultList2 = new TodoList("School");

// defaultList.add(myTodo1);
// defaultList.add(myTodo2);
// defaultList.add(myTodo3);
// defaultList.add(myTodo4);
// defaultList.add(myTodo5);
// defaultList.add(myTodo6);
// defaultList.add(myTodo7);

// defaultList2.add(myTodo1);
// defaultList2.add(myTodo2);
// defaultList2.add(myTodo3);
// defaultList2.add(myTodo4);
// defaultList2.add(myTodo5);
// defaultList2.add(myTodo6);

const uiList = createSideUIListName(defaultList);
const uiList2 = createSideUIListName(defaultList2);


const mainPanel = document.querySelector(".main-panel");
const sidePanel = document.querySelector(".side-panel");

const addTodoButton = createAddButton("Add Todo");

addTodoButton.addEventListener("click", () => {

  const form = createTodoForm();
  document.body.appendChild(form);

  form.addEventListener("click", (evt) => {
    if (evt.target.className === "form-background") {
      document.body.removeChild(form);
    }
  })

  form.addEventListener("submit", (evt) => {

    EventHandler.createTodo(evt);

    const currentListHTML = document.querySelector(".list-name-container[data-active=true]");
    const currentListJSON = JSON.parse(localStorage.getItem(currentListHTML.name));
    const currentList = TodoList.fromJSON(currentListJSON);

    const allTodosHTML = document.querySelectorAll(".todo-container");

    for (const todo of allTodosHTML) {
      console.log(todo)
      mainPanel.removeChild(todo);

    }


    currentList.getAll().forEach(todoJson => {
      const todo = Todo.fromJSON(todoJson);
      const todoHTML = createUITodo(todo);
      mainPanel.appendChild(todoHTML);
    })

  });
  //(evt) => {

  //   evt.preventDefault();
  //   // console.log("Heyyyyy");
  //
  //   const title = document.querySelector("#todoTitle").value;
  //   const description = document.querySelector("#todoDescription").value;
  //   const dueDate = document.querySelector("#dueDate").value;
  //   // const piority = document.querySelector("#todo");
  //   const todo = new Todo(title, description, dueDate);
  //
  //   defaultList.add(todo);
  //
  //
  //   console.log(defaultList.getAll().length);
  //   const index = String(defaultList.getAll().length - 1);
  //
  //
  //   TodoController.saveTodo(index, todo);
  //
  //   console.log(defaultList);
  //   console.log(index);
  //   console.log(TodoController.getTodo(index))
  //
  //   document.body.removeChild(form);
  //
  // })

});

const addListButton = createAddButton("Add List");

// const todoUi1 = createUITodo(myTodo1);
// mainPanel.appendChild(todoUi1);
//
// const todoUi2 = createUITodo(myTodo2);
// mainPanel.appendChild(todoUi2);
//
// const todoUi3 = createUITodo(myTodo3);
// mainPanel.appendChild(todoUi3);
//
// const todoUi4 = createUITodo(myTodo4);
// mainPanel.appendChild(todoUi4);
//
// const todoUi5 = createUITodo(myTodo5);
// mainPanel.appendChild(todoUi5);
//
// const todoUi6 = createUITodo(myTodo6);
// mainPanel.appendChild(todoUi6);


mainPanel.appendChild(addTodoButton);

sidePanel.appendChild(uiList);
sidePanel.appendChild(uiList2);

sidePanel.appendChild(addListButton);



