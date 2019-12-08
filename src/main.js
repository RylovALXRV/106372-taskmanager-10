import Util, {RenderPosition, TaskNumber} from "./utils";
import SiteMenu from "./components/menu";
import Board from "./components/board";
import Filters from "./components/filters";
import {renderButtonLoadMore} from "./components/button-load-more";
import {renderTask} from "./components/task";
import {generateTasks} from "./mock/task";

const tasks = generateTasks(TaskNumber.COUNT);

const boardComponent = new Board();
const boardElement = boardComponent.getElement().querySelector(`.board__tasks`);
const mainElement = document.querySelector(`.main`);
const controlElement = mainElement.querySelector(`.main__control`);

export const renderTasks = (tasksCard, startTask, endTask) => {
  return tasksCard.slice(startTask, endTask).map((task) => {
    return renderTask(task, boardElement);
  });
};

const fillBoardElement = () => {
  Util.render(mainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);
  renderTasks(tasks, TaskNumber.INDEX_START, TaskNumber.SHOW);
  renderButtonLoadMore(tasks);
};

const fillPageElements = () => {
  fillBoardElement();
  Util.render(controlElement, new SiteMenu().getElement(), RenderPosition.BEFOREEND);
  Util.render(controlElement, new Filters(tasks).getElement(), RenderPosition.AFTEREND);
};

fillPageElements();
