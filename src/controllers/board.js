import {RenderPosition, TaskNumber} from "../const";
import {getAmountTasks} from "../mock/filter";
import {createNoTasksMarkup} from "../components/board";
import Render from "../utils/render";
import Sort from "../components/sort";
import Tasks from "../components/tasks";
import ButtonLoadMore from "../components/button-load-more";
import TaskController from "./task";

let tasksCount = TaskNumber.SHOW;

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._sortComponent = new Sort();
    this._tasksComponent = new Tasks();
    this._buttonLoadMoreComponent = new ButtonLoadMore();
  }

  _renderTasks(tasks, startTask, endTask) {
    tasks.slice(startTask, endTask).forEach((task) => new TaskController(this._tasksComponent).render(task));
  }

  render(tasks) {
    const container = this._container.getElement();

    if (getAmountTasks(tasks).archive === tasks.length) {
      Render.render(container, Render.createElement(createNoTasksMarkup), RenderPosition.BEFOREEND);
      return;
    }

    Render.render(container, this._sortComponent.getElement(), RenderPosition.AFTERBEGIN);
    Render.render(container, this._tasksComponent.getElement(), RenderPosition.BEFOREEND);
    this._renderTasks(tasks, TaskNumber.INDEX_START, TaskNumber.SHOW);
    Render.render(container, this._buttonLoadMoreComponent.getElement(), RenderPosition.BEFOREEND);

    this._buttonLoadMoreComponent.setClickHandler(() => {
      const prevTasksCount = tasksCount;
      tasksCount += TaskNumber.SHOW;

      this._renderTasks(tasks, prevTasksCount, tasksCount);

      if (tasksCount >= tasks.length) {
        Render.remove(this._buttonLoadMoreComponent);
      }
    });
  }
}