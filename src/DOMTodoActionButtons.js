import { DOMController } from "./DOMController";
import { ListStorageController } from "./ListStorageController";

export class ActionButtonsManager {

  static getDeleteButton(todoHTML) {
    return todoHTML.querySelector(".delete-action");
  }
  static getMoveButton(todoHTML) {
    return todoHTML.querySelector(".delete-action");
  }
  static getEditButton(todoHTML) {
    return todoHTML.querySelector(".delete-action");
  }
  static getMoreInfoButton(todoHTML) {
    return todoHTML.querySelector(".moreInfo-action");
  }
  static getCheckButton(todoHTML) {
    return todoHTML.querySelector(".check-action");
  }

  static #deleteEvent(event) {
    const currentList = ListStorageController.activeList;
    const currentTodoHTML = event.target.parentNode.parentNode;
    const todoIndex = currentTodoHTML.dataset.index;

    ListStorageController.removeTodo(currentList.name, todoIndex);

    DOMController.reloadMainContent();
  }

  static #markDoneEvent(event) {
    const currentList = ListStorageController.activeList;
    const currentTodoHTML = event.target.parentNode.parentNode;
    const todoIndex = currentTodoHTML.dataset.index;

    ListStorageController.markDone(currentList.name, todoIndex);

    DOMController.reloadMainContent();

  }

  static #MoreInfoEvent(event) {
    const currentTodoHTML = event.target.parentNode.parentNode;
    DOMController.TodoManager.expandTodoInfo(currentTodoHTML);
  }



  static loadEvents(todoHTML) {
    // Add Delete event
    const deleteButton = ActionButtonsManager.getDeleteButton(todoHTML);
    deleteButton.addEventListener("click", ActionButtonsManager.#deleteEvent);

    const checkButton = ActionButtonsManager.getCheckButton(todoHTML);
    checkButton.addEventListener("click", ActionButtonsManager.#markDoneEvent);

    const moreInfoButton = ActionButtonsManager.getMoreInfoButton(todoHTML);
    moreInfoButton.addEventListener("click", ActionButtonsManager.#MoreInfoEvent);

  }


}
