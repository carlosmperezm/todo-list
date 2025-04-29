import { TodoList } from "./TodosList";
import { Todo } from "./Todo";
import { createUITodo } from "./createUITodo";

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


  static loadAllTodosFromActiveList() {
    const activeListHTML = DOMListManager.getActiveList();
    const activeListObj = ListStorageController.getList(activeListHTML.name);
    const activeList = TodoList.from(activeListObj);
    const counterHTML = DOMListManager.getCounterFromList(activeList.name);
    counterHTML.textContent = activeList.getAll().length;

    ListStorageController.getAllTodosFrom(activeList.name).forEach(todoJSON => {
      const todo = Todo.from(todoJSON);
      const todoHTML = createUITodo(todo);
      DOMListManager.#mainPanel.appendChild(todoHTML);
    })
  }


  static createSideListElement(todoList) {
    const listNameContainer = document.createElement("div");
    const listName = document.createElement("span");
    const counterContainer = document.createElement("span");
    const counter = document.createElement("span");

    listNameContainer.classList.add("list-name-container")
    listNameContainer.dataset.active = todoList.active;
    listNameContainer.name = todoList.name;
    listNameContainer.setAttribute("name", todoList.name);

    listName.textContent = todoList.name;

    counterContainer.classList.add("counter-container");
    counter.textContent = todoList.getAll().length;

    counterContainer.appendChild(counter);

    listNameContainer.appendChild(listName);
    listNameContainer.appendChild(counterContainer);

    return listNameContainer;
  }

  static setCounterOfTodos(listName, numberOfTodos) {
    DOMListManager.getCounterFromList(listName).textContent = numberOfTodos;
  }

  static loadAllTodosFromActiveList() {
    const activeListHTML = DOMListManager.getActiveList();
    const activeListObj = ListStorageController.getList(activeListHTML.name);
    const activeList = TodoList.from(activeListObj);

    DOMListManager.setCounterOfTodos(activeList.name, activeList.getAll().length);

    ListStorageController.getAllTodosFrom(activeList.name).forEach(todoJSON => {
      const todo = Todo.from(todoJSON);
      const todoHTML = DOMController.TodoManager.createTodo(todo);
      DOMListManager.#mainPanel.appendChild(todoHTML);

    })

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
      // 6. Remove the form from the screejn
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
    DOMListManager.form.parentElement.removeChild(DOMListManager.form);
    DOMListManager.#form = DOMListManager.#createForm();
  }

}
