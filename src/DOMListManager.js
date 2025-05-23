import trashSvg from "./assets/icons/trash.svg";

import { TodoList } from "./TodosList";
import { Todo } from "./Todo";

import { ListStorageController } from "./ListStorageController";
import { DOMController } from "./DOMController";


export class DOMListManager {
  static #sidePanel = document.querySelector(".side-panel");
  static #mainPanel = document.querySelector(".main-panel");
  static #form = DOMListManager.#createForm();

  static getList(listName) {
    const list = document.querySelector(`.list-name-container[name="${listName}"]`);
    return list;
  }

  static get form() {
    return DOMListManager.#form;
  }

  static #createForm() {
    const form = document.createElement("form");
    form.classList.add("create-list-form");

    const listName = document.createElement("input")
    listName.placeholder = "List Name";
    listName.name = "listName";
    listName.maxLength = 20;

    const submitButton = document.createElement("button");
    submitButton.textContent = "Create";

    form.appendChild(listName);
    form.appendChild(submitButton);

    return form;

  }

  static getActiveList() {
    const activeListHTML = document.querySelector(".list-name-container[data-active=true]");
    return activeListHTML;
  }


  static setActiveList(listHTML) {
    listHTML.dataset.active = true;
  }


  static toggleActive(listHTML) {
    const active = listHTML.dataset.active === "true";

    listHTML.dataset.active = active ? false : true;
  }


  static loadList(name) {
    const listObj = ListStorageController.getList(name);
    const list = TodoList.from(listObj);
    const listHTML = DOMListManager.createSideListElement(list);

    DOMListManager.#sidePanel.appendChild(listHTML);
  }

  static loadAllLists() {
    ListStorageController.getAllLists().forEach(list => DOMListManager.loadList(list.name));
  }


  static getCounterFromList(listName) {
    const listHTML = document.querySelector(`.list-name-container[name=${listName}`);
    const counterHTML = listHTML.querySelector(".counter-container span");
    return counterHTML;
  }


  static removeAllTodosfromMainPanel() {
    const allTodosHTML = document.querySelectorAll(".todo-container");
    allTodosHTML.forEach(todo => DOMListManager.#mainPanel.removeChild(todo));
  }


  static createSideListElement(todoList) {
    const listNameContainer = document.createElement("div");
    const listName = document.createElement("span");
    const counterContainer = document.createElement("span");
    const counter = document.createElement("span");
    const deleteButton = document.createElement("img");

    listNameContainer.classList.add("list-name-container")
    listNameContainer.dataset.active = todoList.active;
    listNameContainer.name = todoList.name;
    listNameContainer.setAttribute("name", todoList.name);

    listName.textContent = todoList.name;

    counterContainer.classList.add("counter-container");
    counter.textContent = todoList.getAll().length;

    deleteButton.classList.add('delete-action');
    deleteButton.src = trashSvg;
    deleteButton.addEventListener("click", () => {
      ListStorageController.removeList(todoList.name.toLowerCase());
      DOMController.reloadSideContent();
    })

    counterContainer.appendChild(counter);

    listNameContainer.appendChild(listName);
    listNameContainer.appendChild(counterContainer);
    listNameContainer.appendChild(deleteButton);

    return listNameContainer;
  }

  static setCounterOfTodos(listName, numberOfTodos) {
    DOMListManager.getCounterFromList(listName).textContent = numberOfTodos;
  }

  static loadAllTodosFromActiveList() {
    const activeList = ListStorageController.activeList;

    DOMListManager.setCounterOfTodos(activeList.name, activeList.getAll().length);

    let index = 0;
    const todosHTMLMarkedAsDone = [];

    ListStorageController.getAllTodosFrom(activeList.name).forEach(todoJSON => {
      const todo = Todo.from(todoJSON);
      const todoHTML = DOMController.TodoManager.createTodo(todo);

      todoHTML.dataset.index = index;
      todoHTML.dataset.done = todo.isDone;

      index++;

      if (!todo.isDone)
        DOMListManager.#mainPanel.appendChild(todoHTML);
      else {
        todosHTMLMarkedAsDone.push(todoHTML);
      }

    });
    todosHTMLMarkedAsDone.forEach(todoHTML =>
      DOMListManager.#mainPanel.appendChild(todoHTML));

  }

  static loadForm() {
    DOMListManager.form.addEventListener("submit", e => {
      e.preventDefault();
      // 2. Get the data 
      const listName = DOMController.ListManager.getFormData();
      // 3. Create the list
      const list = new TodoList(listName);
      // 4. call the list Storage Controller to save the list 
      ListStorageController.saveList(list.name, list);
      // 5. Show the list in the DOM
      DOMController.ListManager.loadList(list.name);
      // 6. Remove the form from the screen
      DOMController.ListManager.removeForm();

      DOMController.reloadSideContent();
    });

    DOMListManager.#sidePanel.appendChild(DOMListManager.form);
  }

  static getFormData() {
    const listName = DOMListManager.form.querySelector("input").value;
    return listName;
  }

  static removeForm() {
    const form = DOMListManager.form;
    form.parentElement.removeChild(form);
    DOMListManager.#form = DOMListManager.#createForm();
  }

}
