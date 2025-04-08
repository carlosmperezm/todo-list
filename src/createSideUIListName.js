import "./sideListName.css";

export function createSideUIListName(todoList) {
  const listNameContainer = document.createElement("div");
  const title = document.createElement("span");
  const counterContainer = document.createElement("span");
  const counter = document.createElement("span");

  listNameContainer.classList.add("list-name-container")

  title.textContent = todoList.name;

  counterContainer.classList.add("counter-container");
  counter.textContent = todoList.getAll().length;

  counterContainer.appendChild(counter);

  listNameContainer.appendChild(title);
  listNameContainer.appendChild(counterContainer);

  return listNameContainer;
}
