import {RenderPosition, TaskNumber} from "./const";
import {generateTasks} from "./mock/task";
import Render from "./utils/render";
import Board from "./components/board";
import BoardController from "./controllers/board";
import SiteMenu from "./components/menu";
import Filters from "./components/filters";

const mainElement = document.querySelector(`.main`);
const controlElement = document.querySelector(`.main__control`);

const tasks = generateTasks(TaskNumber.COUNT);

const siteMenuComponent = new SiteMenu();
const filterComponent = new Filters(tasks);
const boardComponent = new Board(tasks);
const boardController = new BoardController(boardComponent);

Render.render(controlElement, siteMenuComponent.getElement(), RenderPosition.BEFOREEND);
Render.render(mainElement, filterComponent.getElement(), RenderPosition.BEFOREEND);
Render.render(mainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);
boardController.render(tasks);
