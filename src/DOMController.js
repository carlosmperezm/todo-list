import "./button.css"
import "./sideListName.css"
import plusIcon from "./assets/icons/plus.svg";

import { DOMListManager } from "./DOMListManager";
import { DOMTodoManager } from "./DOMTodoManager";

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
    const addTodoButton = DOMController.mainPanel.querySelector('#addTodo');
    return addTodoButton;
  }

  static getAddListButton() {
    const addListButton = DOMController.sidePanel.querySelector('#addList');
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


}
