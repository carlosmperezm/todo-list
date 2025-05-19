import { DOMController } from "./DOMController";
import { ListStorageController } from "./ListStorageController";

export class ActionButtonsManager {

  static getDeleteButton(todoHTML) {
    return todoHTML.querySelector(".delete-action");
  }
  static getEditButton(todoHTML) {
    return todoHTML.querySelector(".edit-action");
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
    // CHeck if there is a To-do expanded already
    const expandedTodo = document.querySelector(".todo-form");
    if (expandedTodo) {
      // Cancel that expanded todo before expand a new one
      const cancelButton = expandedTodo.querySelector(".cancel-button");
      const clickEvent = new MouseEvent("click");
      cancelButton.dispatchEvent(clickEvent);
    }
    // After checked, expand the current To-do
    const currentTodoHTML = event.target.parentNode.parentNode;
    DOMController.TodoManager.expandTodoInfo(currentTodoHTML);
  }



  static loadEvents(todoHTML) {
    // Add Delete event
    const deleteButton = ActionButtonsManager.getDeleteButton(todoHTML);
    deleteButton.addEventListener("click", ActionButtonsManager.#deleteEvent);

    const checkButton = ActionButtonsManager.getCheckButton(todoHTML);
    checkButton.addEventListener("click", ActionButtonsManager.#markDoneEvent);

    const moreEditButton = ActionButtonsManager.getEditButton(todoHTML);
    moreEditButton.addEventListener("click", ActionButtonsManager.#MoreInfoEvent);

  }


}
