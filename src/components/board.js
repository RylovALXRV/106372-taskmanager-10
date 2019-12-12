import Util from "../utils";

export const createNoTasksMarkup = () => {
  return (
    `<p class="board__no-tasks">Click «ADD NEW TASK» in menu to create your first task</p>`
  );
};

const createBoardTemplate = () => {
  return (
    `<section class="board container"></section>`
  );
};

export default class Board {
  constructor(tasks) {
    this._element = null;
    this._tasks = tasks;
  }

  getTemplate() {
    return createBoardTemplate(this._tasks);
  }

  getElement() {
    if (!this._element) {
      this._element = Util.createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
