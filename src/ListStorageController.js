export class ListStorageController {
  static saveList(name, list) {
    localStorage.setItem(name, JSON.stringify(list));
  }
  static getList(name) {
    return JSON.parse(localStorage.getItem(name));
  }
}
