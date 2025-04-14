import "./sideListName.css";

export function createSideUIListName(todoList) {
  const listNameContainer = document.createElement("div");
  const listName = document.createElement("span");
  const counterContainer = document.createElement("span");
  const counter = document.createElement("span");

  listNameContainer.classList.add("list-name-container")
  listNameContainer.dataset.active = todoList.active;
  listNameContainer.name = todoList.name;

  listName.textContent = todoList.name;

  counterContainer.classList.add("counter-container");
  counter.textContent = todoList.getAll().length;

  counterContainer.appendChild(counter);

  listNameContainer.appendChild(listName);
  listNameContainer.appendChild(counterContainer);

  return listNameContainer;
}
