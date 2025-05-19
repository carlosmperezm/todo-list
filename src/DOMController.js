import "./button.css"
import "./sideListName.css"
import plusIcon from "./assets/icons/plus.svg";

import { DOMListManager } from "./DOMListManager";
import { DOMTodoManager } from "./DOMTodoManager";
import { ListStorageController } from "./ListStorageController";
import { TodoList } from "./TodosList";
import { Todo } from "./Todo";

export class DOMController {
  static #mainPanel = document.querySelector(".main-panel");
  static #sidePanel = document.querySelector(".side-panel");

  static #ListManager = DOMListManager;
  static #TodoManager = DOMTodoManager;


  static get mainPanel() {
    return DOMController.#mainPanel;
  }

  static get sidePanel() {
    return DOMController.#sidePanel;
  }

  static get ListManager() {
    return DOMController.#ListManager;
  }

  static get TodoManager() {
    return DOMController.#TodoManager;
  }

  static getAddTodoButton() {
    const addTodoButton = DOMController.mainPanel.querySelector("#addTodo");
    return addTodoButton;
  }

  static getAddListButton() {
    const addListButton = DOMController.sidePanel.querySelector("#addList");
    return addListButton;
  }


  static removeButton(buttonId) {
    const button = document.querySelector(`#${buttonId}`);
    button.parentNode.removeChild(button);
  }


  static createAddButton(text) {
    const button = document.createElement("button");
    const icon = document.createElement("img");
    const textContainer = document.createElement("span");

    button.id = "".toLowerCase().replace(" ", "");
    textContainer.textContent = text;
    icon.src = plusIcon;

    button.appendChild(icon);
    button.appendChild(textContainer);
    button.classList.add("add-button");

    return button;
  }

  static loadAddListButton() {
    const addListButton = DOMController.createAddButton("Add List");
    addListButton.id = "addList";
    DOMController.sidePanel.appendChild(addListButton);
  }

  static loadAddTodoButton() {
    const addTodoButton = DOMController.createAddButton("Add Todo");
    addTodoButton.id = "addTodo";

    DOMController.mainPanel.appendChild(addTodoButton);

  }

  static reloadMainContent() {
    // Remove all todos
    DOMController.ListManager.removeAllTodosfromMainPanel();
    // Remove the button
    DOMController.removeButton("addTodo");
    // Load all todos
    DOMController.ListManager.loadAllTodosFromActiveList();
    // Load the button again
    DOMController.loadAddTodoButton();

    DOMController.getAddTodoButton().addEventListener("click", () =>
      DOMController.TodoManager.loadForm())
  }

  static reloadSideContent() {
    // 1. Remove all the lists
    const allListsHTML = document.querySelectorAll(".list-name-container");
    allListsHTML.forEach(listHTML => {
      DOMController.sidePanel.removeChild(listHTML);
    })

    // 2. Remove the button 
    DOMController.removeButton("addList");

    // 3. Reload all the lists from the Storage
    ListStorageController.getAllLists().forEach(list => {
      DOMController.ListManager.loadList(list.name);
    })
    //4. Load the button back
    DOMController.loadAddListButton();

    DOMController.getAddListButton().addEventListener("click", () =>
      DOMController.ListManager.loadForm())
  }

  static loadSideContent() {
    // 3. Reload all the lists from the Storage
    ListStorageController.getAllLists().forEach(list => {
      DOMController.ListManager.loadList(list.name);
    })
    //4. Load the button back
    DOMController.loadAddListButton();

    DOMController.getAddListButton().addEventListener("click", () =>
      DOMController.ListManager.loadForm())
  }

  static loadMainContent() {
    // Load all todos
    DOMController.ListManager.loadAllTodosFromActiveList();
    // Load the button again
    DOMController.loadAddTodoButton();

    DOMController.getAddTodoButton().addEventListener("click", () =>
      DOMController.TodoManager.loadForm())
  }


  static loadDefaultLists() {

    const personalList = new TodoList("personal")
    const workList = new TodoList("work");
    const schoolList = new TodoList("school");

    const todo1 = new Todo("Pick up Mom");
    const todo2 = new Todo("Do the landry");
    const todo3 = new Todo("Call granma");
    const todo4 = new Todo("Fix some bugs");
    const todo5 = new Todo("Do school homework");

    personalList.add(todo1);
    personalList.add(todo2);
    personalList.add(todo3);
    workList.add(todo4);
    schoolList.add(todo5);

    ListStorageController.saveList(personalList.name, personalList);
    ListStorageController.saveList(workList.name, workList);
    ListStorageController.saveList(schoolList.name, schoolList);

  }

}
