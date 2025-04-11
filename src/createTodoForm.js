import "./form.css";

export function createTodoForm() {
  const formBacground = document.createElement("div");
  formBacground.classList.add("form-background");

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

  formBacground.appendChild(form)
  return formBacground;
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
