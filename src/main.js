import Util, {RenderPosition, TaskNumber} from "./utils";
import SiteMenu from "./components/menu";
import Board from "./components/board";
import Sort from "./components/sort";
import Tasks from "./components/tasks";
import Filters from "./components/filters";
import ButtonLoadMore, {removeButtonLoadMore} from "./components/button-load-more";
import NoTasks from "./components/no-tasks";
import {renderTask} from "./components/task";
import {generateTasks} from "./mock/task";
import {getAmountTasks} from "./mock/filter";

const mainElement = document.querySelector(`.main`);
const controlElement = mainElement.querySelector(`.main__control`);

const tasks = generateTasks(TaskNumber.COUNT);

const boardComponent = new Board();
const boardElement = boardComponent.getElement();
const sortComponent = new Sort();
const tasksComponent = new Tasks();
const tasksElement = tasksComponent.getElement();

const renderTasks = (tasksCard, startTask, endTask) => {
  return tasksCard.slice(startTask, endTask).map((task) => {
    return renderTask(task, tasksElement);
  });
};

const renderButtonLoadMore = () => {
  const buttonLoadMoreElement = new ButtonLoadMore().getElement();

  buttonLoadMoreElement.addEventListener(`click`, () => {
    const prevTasksCount = tasksCount;
    tasksCount += TaskNumber.SHOW;

    renderTasks(tasks, prevTasksCount, tasksCount);
    removeButtonLoadMore(tasksCount, TaskNumber.COUNT);
  });

  Util.render(boardElement, buttonLoadMoreElement, RenderPosition.BEFOREEND);
};

const renderBoardElement = (tasksCard) => {
  Util.render(mainElement, boardElement, RenderPosition.BEFOREEND);

  if (getAmountTasks(tasks).archive === tasksCard.length) {
    Util.render(boardElement, new NoTasks().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  Util.render(boardElement, sortComponent.getElement(), RenderPosition.AFTERBEGIN);
  Util.render(boardElement, tasksElement, RenderPosition.BEFOREEND);
  renderTasks(tasks, TaskNumber.INDEX_START, TaskNumber.SHOW);
  renderButtonLoadMore();
};

const fillPageElements = () => {
  renderBoardElement(tasks);
  Util.render(controlElement, new SiteMenu().getElement(), RenderPosition.BEFOREEND);
  Util.render(controlElement, new Filters(tasks).getElement(), RenderPosition.AFTEREND);
};

let tasksCount = TaskNumber.SHOW;

fillPageElements();
