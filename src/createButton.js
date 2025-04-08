import "./button.css"
import plusIcon from "./assets/icons/plus.svg";

export function createAddButton(text) {
  const button = document.createElement("button");
  const icon = document.createElement("img");
  const textContainer = document.createElement("span");

  textContainer.textContent = text;
  icon.src = plusIcon;

  button.appendChild(icon);
  button.appendChild(textContainer);
  button.classList.add("add-button");

  return button;
}
