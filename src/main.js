import Util, {RenderPosition, TaskNumber} from "./utils";
import SiteMenu from "./components/menu";
import Board, {createNoTasksMarkup} from "./components/board";
import Sort from "./components/sort";
import Tasks from "./components/tasks";
import Filters from "./components/filters";
import ButtonLoadMore, {removeButtonLoadMore} from "./components/button-load-more";
import {renderTask} from "./components/task";
import {generateTasks} from "./mock/task";
import {getAmountTasks} from "./mock/filter";

let tasksCount = TaskNumber.SHOW;
const mainElement = document.querySelector(`.main`);
const controlElement = mainElement.querySelector(`.main__control`);

const tasks = generateTasks(TaskNumber.COUNT);

const boardComponent = new Board(tasks);
const boardElement = boardComponent.getElement();
const buttonLoadMoreComponent = new ButtonLoadMore();
const buttonLoadMoreElement = buttonLoadMoreComponent.getElement();
const sortComponent = new Sort();
const tasksComponent = new Tasks();
const tasksElement = tasksComponent.getElement();

const renderTasks = (tasksCard, startTask, endTask) => {
  return tasksCard.slice(startTask, endTask).map((task) => renderTask(task, tasksElement));
};

const renderButtonLoadMore = () => {
  buttonLoadMoreElement.addEventListener(`click`, () => {
    const prevTasksCount = tasksCount;
    tasksCount += TaskNumber.SHOW;

    renderTasks(tasks, prevTasksCount, tasksCount);
    removeButtonLoadMore(buttonLoadMoreComponent, tasksCount, TaskNumber.COUNT);
  });

  Util.render(boardElement, buttonLoadMoreElement, RenderPosition.BEFOREEND);
};

const renderBoardElement = () => {
  Util.render(mainElement, boardElement, RenderPosition.BEFOREEND);

  if (getAmountTasks(tasks).archive !== tasks.length) {
    Util.render(boardElement, sortComponent.getElement(), RenderPosition.AFTERBEGIN);
    Util.render(boardElement, tasksElement, RenderPosition.BEFOREEND);
    renderTasks(tasks, TaskNumber.INDEX_START, TaskNumber.SHOW);
    renderButtonLoadMore();
  } else {
    Util.render(boardElement, Util.createElement(createNoTasksMarkup), RenderPosition.BEFOREEND);
  }
};

const fillPageElements = () => {
  renderBoardElement();
  Util.render(controlElement, new SiteMenu().getElement(), RenderPosition.BEFOREEND);
  Util.render(controlElement, new Filters(tasks).getElement(), RenderPosition.AFTEREND);
};

fillPageElements();
