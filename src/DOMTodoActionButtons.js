import { DOMController } from "./DOMController";
import { ListStorageController } from "./ListStorageController";

export class ActionButtonsManager {

  static #deleteButton = document.querySelector(".delete-action");
  static #moveButton = document.querySelector(".move-action");
  static #editButton = document.querySelector(".edit-action");
  static #moreInfoButton = document.querySelector(".moreInfo-action");
  static #checkButton = document.querySelector(".check-action");

  static get deleteButton() {
    console.log("aaa");
    return document.querySelector(".delete-action");
  }
  static get moveButton() {
    return ActionButtonsManager.#moveButton;
  }
  static get editButton() {
    return ActionButtonsManager.#editButton;
  }
  static get moreInfoButton() {
    return ActionButtonsManager.#moreInfoButton;
  }
  static get checkButton() {
    return ActionButtonsManager.#checkButton;
  }

  static #deleteEvent(e) {
    const currentList = ListStorageController.activeList;
    const currentTodo = e.target.parentNode.parentNode;
    const todoIndex = currentTodo.dataset.index;

    ListStorageController.removeTodo(currentList.name, todoIndex);

    DOMController.reloadMainContent();
  }



  static loadEvents(todo) {
    const deleteButton = todo.querySelector(".delete-action");
    deleteButton.addEventListener("click", ActionButtonsManager.#deleteEvent);

  }


}
