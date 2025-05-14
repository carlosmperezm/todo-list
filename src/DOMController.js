import "./button.css"
import "./sideListName.css"
import plusIcon from "./assets/icons/plus.svg";

import { DOMListManager } from "./DOMListManager";
import { DOMTodoManager } from "./DOMTodoManager";
import { ListStorageController } from "./ListStorageController";

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

    console.log("Main content reloaded")
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

    console.log("Side content reloaded")
  }

  static loadSideContent(){
    // 3. Reload all the lists from the Storage
    ListStorageController.getAllLists().forEach(list => {
      DOMController.ListManager.loadList(list.name);
    })
    //4. Load the button back
    DOMController.loadAddListButton();

    DOMController.getAddListButton().addEventListener("click", () =>
      DOMController.ListManager.loadForm())

    console.log("Side content loaded")

  }

  static loadMainContent(){
    // Load all todos
    DOMController.ListManager.loadAllTodosFromActiveList();
    // Load the button again
    DOMController.loadAddTodoButton();

    DOMController.getAddTodoButton().addEventListener("click", () =>
      DOMController.TodoManager.loadForm())

    console.log("Main content loaded")
  }


  static loadDefaultLists() {
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

}
