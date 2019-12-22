import {RenderPosition, TaskNumber, SortType} from "../const";
import {getAmountTasks} from "../mock/filter";
import {createNoTasksMarkup} from "../components/board";
import Render from "../utils/render";
import Sort from "../components/sort";
import Tasks from "../components/tasks";
import ButtonLoadMore from "../components/button-load-more";
import TaskController from "./task";
import Common from "../utils/common";

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._tasks = [];
    this._showingTasks = [];

    this._sortComponent = new Sort();
    this._tasksComponent = new Tasks();
    this._buttonLoadMoreComponent = new ButtonLoadMore();

    this._onOpen = this._onOpen.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this.onEscKeyDown = this.onEscKeyDown.bind(this);

    this._tasksCount = TaskNumber.SHOW;
    this._taskController = null;
    this._currentTask = null;
    this._currentEditTask = null;

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  _renderTasks(tasks, startTask, endTask) {
    tasks.slice(startTask, endTask).forEach((task) => new TaskController(this._tasksComponent, this._onOpen).render(task));
  }

  render(tasks) {
    const container = this._container.getElement();
    this._tasks = tasks;

    if (getAmountTasks(this._tasks).archive === this._tasks.length) {
      Render.render(container, Render.createElement(createNoTasksMarkup), RenderPosition.BEFOREEND);
      return;
    }

    Render.render(container, this._sortComponent.getElement(), RenderPosition.AFTERBEGIN);
    Render.render(container, this._tasksComponent.getElement(), RenderPosition.BEFOREEND);
    this._renderTasks(this._tasks, TaskNumber.INDEX_START, TaskNumber.SHOW);
    Render.render(container, this._buttonLoadMoreComponent.getElement(), RenderPosition.BEFOREEND);

    this._showingTasks = this._tasks;
    this._renderButtonLoadMore(this._showingTasks);
  }

  _onSortTypeChange(sortType) {
    if (!document.querySelector(`.load-more`)) {
      this._tasksCount = TaskNumber.SHOW;
      this._renderButtonLoadMore(this._showingTasks);
    }

    let sortedTasks = [];

    switch (sortType) {
      case SortType.DATE_DOWN:
        sortedTasks = this._tasks.slice().sort((taskA, taskB) => taskB.dueDate - taskA.dueDate);
        break;
      case SortType.DATE_UP:
        sortedTasks = this._tasks.slice().sort((taskA, taskB) => taskA.dueDate - taskB.dueDate);
        break;
      case SortType.DEFAULT:
        this._tasksCount = TaskNumber.SHOW;
        sortedTasks = this._tasks;
        break;
    }
    this._showingTasks = sortedTasks;

    const taskListElement = this._tasksComponent.getElement();
    taskListElement.innerHTML = ``;

    this._renderTasks(sortedTasks, TaskNumber.INDEX_START, this._tasksCount);
  }

  _renderButtonLoadMore() {
    if (this._tasksCount >= this._showingTasks.length) {
      return;
    }

    const container = this._container.getElement();

    Render.render(container, this._buttonLoadMoreComponent.getElement(), RenderPosition.BEFOREEND);

    this._buttonLoadMoreComponent.setClickHandler(() => {
      const prevTasksCount = this._tasksCount;
      this._tasksCount += TaskNumber.SHOW;

      this._renderTasks(this._showingTasks, prevTasksCount, this._tasksCount);

      if (this._tasksCount >= this._showingTasks.length) {
        Render.remove(this._buttonLoadMoreComponent);
      }
    });
  }

  _onOpen(taskComponent, editTaskComponent, taskController) {
    if (this._currentTask && this._currentTask !== taskComponent.getElement()) {
      this._onClose();
    }

    this._currentTask = taskComponent.getElement();
    this._currentEditTask = editTaskComponent.getElement();
    this._taskController = taskController;

    editTaskComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._onClose();
    });

    document.addEventListener(`keydown`, this.onEscKeyDown);
  }

  _onClose() {
    this._taskController._replaceEditToTask(this._currentTask, this._currentEditTask);
    document.removeEventListener(`keydown`, this.onEscKeyDown);
  }

  onEscKeyDown(evt) {
    if (Common.isEscKey(evt)) {
      this._onClose();
    }
  }
}
