import {RenderPosition} from "../const";
import Common from "../utils/common";
import Render from "../utils/render";
import Task from "../components/task";
import EditTask from "../components/task-edit";

let currentTask = null;
let currentEditTask = null;

const replaceEditToTask = () => {
  Render.replace(currentTask, currentEditTask);
  document.removeEventListener(`keydown`, onEscKeyDown);
};

const closeEditTask = () => {
  replaceEditToTask();

  currentTask = null;
  currentEditTask = null;
};

const onEscKeyDown = (evt) => {
  if (Common.isEscKey(evt)) {
    closeEditTask();
  }
};

export default class TaskController {
  constructor(container) {
    this._container = container.getElement();

    this._taskComponent = null;
    this._taskEditComponent = null;

    // this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  // как здесь исправить закомментированный код? И сделать все в компоненте.
  // и возможно ли при такой реализации?
  // я как понимаю здесь такая же ситуация возникает, которую мы разбирали ранее?

  render(task) {
    this._taskComponent = new Task(task);
    this._taskEditComponent = new EditTask(task);

    this._taskComponent.setClickHandler(() => {
      if (currentTask) {
        closeEditTask();
      }

      if (currentTask !== this._taskComponent.getElement()) {
        this._replaceTaskToEdit();
      }

      currentTask = this._taskComponent.getElement();
      currentEditTask = this._taskEditComponent.getElement();
    });

    this._taskEditComponent.setSubmitHandler(() => closeEditTask());

    Render.render(this._container, this._taskComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _replaceTaskToEdit() {
    Render.replace(this._taskEditComponent.getElement(), this._taskComponent.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  }

  // _replaceEditToTask() {
  //   Render.replace(currentTask, currentEditTask);
  //   document.removeEventListener(`keydown`, this._onEscKeyDown);
  // }
  //
  // _closeEditTask() {
  //   this._replaceEditToTask();
  //
  //   currentTask = null;
  //   currentEditTask = null;
  // }
  //
  // _onEscKeyDown(evt) {
  //   if (Common.isEscKey(evt)) {
  //     this._closeEditTask();
  //   }
  // }
}
