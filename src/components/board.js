import AbstractComponent from "./abstract-component";

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

export default class Board extends AbstractComponent {
  constructor(tasks) {
    super();

    this._tasks = tasks;
  }

  getTemplate() {
    return createBoardTemplate(this._tasks);
  }
}
