import {RenderPosition} from "../const";
import Common from "../utils/common";
import Render from "../utils/render";
import Task from "../components/task";
import EditTask from "../components/task-edit";

export default class TaskController {
  constructor(container, onOpen) {
    this._container = container.getElement();
    this._taskComponent = null;
    this._taskEditComponent = null;

    this.onOpen = onOpen;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(task) {
    this._taskComponent = new Task(task);
    this._taskEditComponent = new EditTask(task);

    this._taskComponent.setClickHandler(() => this._replaceTaskToEdit());
    this._taskEditComponent.setSubmitHandler(() =>
      this._replaceEditToTask(this._taskComponent.getElement(), this._taskEditComponent.getElement()));

    Render.render(this._container, this._taskComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _replaceTaskToEdit() {
    this.onOpen(this._taskComponent.getElement(), this._taskEditComponent.getElement(), this);

    Render.replace(this._taskEditComponent.getElement(), this._taskComponent.getElement());
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceEditToTask(taskComponent, taskEditComponent) {
    Render.replace(taskComponent, taskEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  // если даже что-то сейчас работает и задачи закрываются, то обработчики не удаляются, как метод _onEscKeyDown(evt)
  // перенести в ф-ию, т.е. как передавать правильные аргументы this._replaceEditToTask(...), где их найти?
  _onEscKeyDown(evt) {
    if (Common.isEscKey(evt)) {
      this._replaceEditToTask(this._taskComponent.getElement(), this._taskEditComponent.getElement());
    }
  }
}
