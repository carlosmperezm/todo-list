import "./todo.css";
import "./form.css";

import checkSvg from "./assets/icons/check.svg";
import infoSvg from "./assets/icons/info.svg";
import moveSvg from "./assets/icons/move.svg";
import trashSvg from "./assets/icons/trash.svg";
import editSvg from "./assets/icons/edit.svg";

import { ListStorageController } from "./ListStorageController";
import { DOMController } from "./DOMController";
import { Todo } from "./Todo";
import { TodoList } from "./TodosList";
import { ActionButtonsManager } from "./DOMTodoActionButtons";




export class DOMTodoManager {
  static #mainPanel = document.querySelector(".main-panel");
  static #sidePanel = document.querySelector(".side-panel");
  static #listStorage = ListStorageController;
  static #form = DOMTodoManager.createTodoForm();
  static #actionButtons = ActionButtonsManager;
  static #todo;

  static loadEvents = DOMTodoManager.actionButtons.loadEvents;


  static get actionButtons() {
    return DOMTodoManager.#actionButtons;
  }

  static get form() {
    return DOMTodoManager.#form;
  }

  static createTodo(todo) {
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


    DOMTodoManager.loadEvents(todoContainer);

    return todoContainer;
  }

  static loadForm() {
    // Get the form
    const formContainer = DOMTodoManager.form;
    // Load the form in the DOM
    document.body.appendChild(formContainer);
  }

  static createTodoForm() {
    const formBackground = document.createElement("div");
    formBackground.classList.add("form-background");

    const form = document.createElement("form");
    form.classList.add("todo-form");

    const titleContainer = document.createElement("p");
    const titleLabel = document.createElement("label");
    const titleInput = document.createElement("input");
    titleContainer.classList.add("input-container");
    titleLabel.textContent = "Title";
    titleLabel.htmlFor = "todoTitle";
    titleInput.id = "todoTitle";
    titleInput.name = "todoTitle";
    titleInput.required = true;
    titleInput.placeholder = "Ex: Pick up mom from the airport";

    const descriptionContainer = document.createElement("p");
    const descriptionLabel = document.createElement("label");
    const descriptionInput = document.createElement("textarea");
    descriptionContainer.classList.add("input-container");
    descriptionLabel.textContent = "Description";
    descriptionLabel.htmlFor = "todoDescription";
    descriptionInput.id = "todoDescription";
    descriptionInput.name = "todoDescription"
    descriptionInput.placeholder = "Ex: Bring some snacks and a guava smothie";

    const dueDateContainer = document.createElement("p");
    const dueDateLabel = document.createElement("label");
    const dueDateInput = document.createElement("input");
    dueDateContainer.classList.add("input-container");
    dueDateLabel.textContent = "Due Date";
    dueDateLabel.htmlFor = "dueDate"
    dueDateInput.id = "dueDate";
    dueDateInput.name = "dueDate";
    dueDateInput.type = "date";

    const priorityInputsContainer = createPriorityInputsContainer();

    const createTodoButton = document.createElement("button");
    createTodoButton.textContent = "Create Todo";
    createTodoButton.classList.add("add-button");

    titleContainer.appendChild(titleLabel);
    titleContainer.appendChild(titleInput);

    descriptionContainer.appendChild(descriptionLabel);
    descriptionContainer.appendChild(descriptionInput);

    dueDateContainer.appendChild(dueDateLabel);
    dueDateContainer.appendChild(dueDateInput);

    form.appendChild(titleContainer);
    form.appendChild(descriptionContainer);
    form.appendChild(dueDateContainer);
    form.appendChild(priorityInputsContainer);
    form.appendChild(createTodoButton);

    formBackground.appendChild(form)

    return formBackground;
  }

  static removeTodo(listName, todoIndex) {
    DOMTodoManager.#listStorage.removeTodo(listName, todoIndex);
    DOMController.reloadMainContent();
  }

  static cleanForm() {
    DOMTodoManager.form.querySelectorAll("input").forEach(input => {
      input.value = "";
    })
  }

  static removeForm() {
    const form = DOMTodoManager.form;

    console.log(form === null, form);

    if (form) {
      console.log("removing form", form)
      form.parentNode.removeChild(form);
    }

  }

  static retrieveTodoData() {

    // Get the data
    const title = document.querySelector("#todoTitle").value;
    const description = document.querySelector("#todoDescription").value;
    const dueDate = document.querySelector("#dueDate").value;
    // const piority = document.querySelector("#todo");

    // Create a new todo with the data
    const todo = new Todo(title, description, dueDate);
    // Get the current list where user want to add the todo
    const currentListHTML = DOMController.ListManager.getActiveList();
    // Transform the list into a TodoList type
    const currentListObj = ListStorageController.getList(currentListHTML.name);
    const currentList = TodoList.from(currentListObj);
    // Add the new todo to the list
    currentList.add(todo);
    // Save the list in the storage
    ListStorageController.saveList(currentList.name, currentList);
    // Update the todo counter of that list
    DOMController.ListManager.getCounterFromList(currentList.name, currentList.getAll().length);

  }

}



function createPriorityInputsContainer() {

  const priorityContainer = document.createElement("fieldset");
  priorityContainer.classList.add("priority-container");

  const fieldsetName = document.createElement("legend");
  fieldsetName.textContent = "Choose a Priority";

  const highContainer = document.createElement("p");
  const highLabel = document.createElement("label");
  const highInput = document.createElement("input");
  highLabel.textContent = "High";
  highLabel.classList.add("high-priority");
  highLabel.htmlFor = "highPriority";
  highInput.id = "highPriority";
  highInput.type = "radio";
  highInput.value = "high";
  highInput.name = "todoPriority";

  const mediumContainer = document.createElement("p");
  const mediumLabel = document.createElement("label");
  const mediumInput = document.createElement("input");
  mediumLabel.textContent = "Medium"
  mediumLabel.classList.add("medium-priority");
  mediumLabel.htmlFor = "mediumPriority";
  mediumInput.id = "mediumPriority";
  mediumInput.type = "radio";
  mediumInput.value = "medium";
  mediumInput.name = "todoPriority";
  mediumInput.checked = true;


  const lowContainer = document.createElement("p");
  const lowLabel = document.createElement("label");
  const lowInput = document.createElement("input");
  lowLabel.textContent = "Low"
  lowLabel.classList.add("low-priority");
  lowLabel.htmlFor = "lowPriority";
  lowInput.id = "lowPriority";
  lowInput.type = "radio";
  lowInput.value = "low";
  lowInput.name = "todoPriority";


  highContainer.appendChild(highLabel);
  highContainer.appendChild(highInput);
  mediumContainer.appendChild(mediumLabel);
  mediumContainer.appendChild(mediumInput);
  lowContainer.appendChild(lowLabel);
  lowContainer.appendChild(lowInput);

  priorityContainer.appendChild(fieldsetName);
  priorityContainer.appendChild(highContainer);
  priorityContainer.appendChild(mediumContainer);
  priorityContainer.appendChild(lowContainer);

  return priorityContainer;
}
