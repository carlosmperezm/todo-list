import { Todo } from "./Todo";
import { TodoList } from "./TodosList";
import { ListStorageController } from "./ListStorageController";

export class EventHandler {

  static createTodo(evt) {
    const formBackground = document.querySelector(".form-background");
    evt.preventDefault();

    const title = document.querySelector("#todoTitle").value;
    const description = document.querySelector("#todoDescription").value;
    const dueDate = document.querySelector("#dueDate").value;
    // const piority = document.querySelector("#todo");

    const todo = new Todo(title, description, dueDate);
    const currentListHTML = document.querySelector(".list-name-container[data-active=true]");
    const currentListJSON = JSON.parse(localStorage.getItem(currentListHTML.name));
    const currentList = TodoList.fromJSON(currentListJSON);

    console.log(currentList);


    currentList.add(todo);

    ListStorageController.saveList(currentList.name, currentList);
    currentListHTML.querySelector(".counter-container span").textContent = currentList.getAll().length;

    document.body.removeChild(formBackground);

  }
}
