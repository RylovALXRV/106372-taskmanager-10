import {RenderPosition, TaskNumber, SortType} from "../const";
import {getAmountTasks} from "../mock/filter";
import {createNoTasksMarkup} from "../components/board";
import Render from "../utils/render";
import Sort from "../components/sort";
import Tasks from "../components/tasks";
import ButtonLoadMore from "../components/button-load-more";
import TaskController from "./task";
import Common from "../utils/common";

const SortedTask = {
  [SortType.DATE_DOWN]: (tasks) => {
    return tasks.slice().sort(Common.compareDateDown);
  },
  [SortType.DATE_UP]: (tasks) => {
    return tasks.slice().sort(Common.compareDateUp);
  },
  [SortType.DEFAULT]: (tasks) => {
    return tasks;
  }
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._tasks = [];
    this._sortedTasks = [];

    this._sortComponent = new Sort();
    this._tasksComponent = new Tasks();
    this._buttonLoadMoreComponent = new ButtonLoadMore();

    this._onOpen = this._onOpen.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this.onEscKeyDown = this.onEscKeyDown.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._tasksCount = TaskNumber.SHOW;
    this._taskController = null;
    this._currentTask = null;
    this._currentEditTask = null;

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  _renderTasks(tasks, startTask, endTask) {
    tasks.slice(startTask, endTask).forEach((task) => new TaskController(this._tasksComponent, this._onOpen, this._onDataChange).render(task));
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

    if (this._tasksCount < this._tasks.length) {
      this._renderButtonLoadMore(this._tasks);
    }
  }

  _onDataChange(taskController, oldData, newData) {
    const index = this._tasks.findIndex((task) => task === oldData);

    if (index === -1) {
      return;
    }

    this._tasks = [].concat(this._tasks.slice(0, index), newData, this._tasks.slice(index + 1));

    taskController.render(this._tasks[index]);
  }

  _onSortTypeChange(sortType) {
    if (sortType === SortType.DEFAULT) {
      this._tasksCount = TaskNumber.SHOW;
    }

    this._sortedTasks = SortedTask[sortType](this._tasks);

    const taskListElement = this._tasksComponent.getElement();
    taskListElement.innerHTML = ``;

    this._renderTasks(this._sortedTasks, TaskNumber.INDEX_START, this._tasksCount);

    if (this._tasksCount < this._sortedTasks.length) {
      Render.remove(this._buttonLoadMoreComponent);
      this._renderButtonLoadMore(this._sortedTasks);
    }
  }

  _renderButtonLoadMore(tasks) {
    const container = this._container.getElement();

    Render.render(container, this._buttonLoadMoreComponent.getElement(), RenderPosition.BEFOREEND);

    this._buttonLoadMoreComponent.setClickHandler(() => {
      const prevTasksCount = this._tasksCount;
      this._tasksCount += TaskNumber.SHOW;

      this._renderTasks(tasks, prevTasksCount, this._tasksCount);

      if (this._tasksCount >= tasks.length) {
        Render.remove(this._buttonLoadMoreComponent);
      }
    });
  }

  _onOpen(taskComponent, editTaskComponent, taskController) {
    if (this._currentTask && this._currentTask !== taskComponent.getElement()) {
      this._onClose();
    }

    this._currentTask = taskComponent.getElement();
    this._currentEditTask = editTaskComponent;
    this._taskController = taskController;

    editTaskComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._onClose();
    });

    document.addEventListener(`keydown`, this.onEscKeyDown);
  }

  _onClose() {
    this._currentEditTask.reset();

    this._taskController._replaceEditToTask(this._currentTask, this._currentEditTask.getElement());
    document.removeEventListener(`keydown`, this.onEscKeyDown);
    this._currentTask = null;
  }

  onEscKeyDown(evt) {
    if (Common.isEscKey(evt)) {
      this._onClose();
    }
  }
}
