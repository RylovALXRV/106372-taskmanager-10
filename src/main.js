import {createSiteMenuTemplate} from "./components/menu";
import {createFiltersTemplate} from "./components/filters";
import {createBoardTemplate, renderTasks} from "./components/board";
import {generateTasks} from "./mock/task";
import {removeButtonLoadMore} from "./components/button-load-more";

const Task = {
  COUNT: 22,
  FILTER_INDEX_START: 0,
  INDEX_START: 1,
  SHOW: 8
};

const tasks = generateTasks(Task.COUNT);

const mainElement = document.querySelector(`.main`);
const controlElement = mainElement.querySelector(`.main__control`);

const render = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const fillPageElements = () => {
  render(mainElement, createBoardTemplate(tasks, Task.INDEX_START, Task.SHOW));
  render(controlElement, createSiteMenuTemplate());
  render(document.querySelector(`.main__control`), createFiltersTemplate(tasks.slice(Task.FILTER_INDEX_START, Task.SHOW)), `afterend`);
};

fillPageElements();

const loadMoreElement = document.querySelector(`.load-more`);
let tasksCount = Task.SHOW;

loadMoreElement.addEventListener(`click`, () => {
  const prevTasksCount = tasksCount;
  tasksCount += prevTasksCount;

  render(document.querySelector(`.board__tasks`), renderTasks(tasks, prevTasksCount, tasksCount));
  render(document.querySelector(`.main__control`), createFiltersTemplate(tasks.slice(Task.FILTER_INDEX_START, tasksCount)), `afterend`);
  removeButtonLoadMore(tasksCount, Task.COUNT);
});
