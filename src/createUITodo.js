import "./todo.css";
import checkSvg from "./assets/icons/check.svg";
import infoSvg from "./assets/icons/info.svg";
import moveSvg from "./assets/icons/move.svg";
import trashSvg from "./assets/icons/trash.svg";
import editSvg from "./assets/icons/edit.svg";


export function createUITodo(todo) {
  const todoContainer = document.createElement("div");
  const titleContainer = document.createElement("div");
  const actionsContainer = document.createElement("div");
  const title = document.createElement("span");
  const checkAction = document.createElement("img");
  const moreInfoAction = document.createElement("img");
  const moveAction = document.createElement("img");
  const deleteAction = document.createElement("img");
  const editAction = document.createElement("img");

  todoContainer.classList.add("todo-container");

  titleContainer.classList.add("title-container");

  actionsContainer.classList.add('actions-container');

  title.classList.add('todo-title');
  title.textContent = todo.title;


  checkAction.classList.add('check-action');
  checkAction.classList.add('action');
  checkAction.src = checkSvg;

  moreInfoAction.classList.add('moreInfo-action');
  moreInfoAction.classList.add('action');
  moreInfoAction.src = infoSvg;

  moveAction.classList.add('move-action');
  moveAction.classList.add('action');
  moveAction.src = moveSvg;

  deleteAction.classList.add('delete-action');
  deleteAction.classList.add('action');
  deleteAction.src = trashSvg;

  editAction.classList.add("edit-action")
  editAction.classList.add("action")
  editAction.src = editSvg;


  titleContainer.appendChild(title);

  actionsContainer.appendChild(checkAction);
  actionsContainer.appendChild(moreInfoAction);
  actionsContainer.appendChild(editAction);
  actionsContainer.appendChild(moveAction);
  actionsContainer.appendChild(deleteAction);

  todoContainer.appendChild(titleContainer);
  todoContainer.appendChild(actionsContainer);

  return todoContainer;
}
