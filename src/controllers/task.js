import {RenderPosition} from "../const";
import Render from "../utils/render";
import Task from "../components/task";
import EditTask from "../components/task-edit";

export default class TaskController {
  constructor(container, onOpen) {
    this._container = container.getElement();
    this._taskComponent = null;
    this._taskEditComponent = null;

    this.onOpen = onOpen;
  }

  render(task) {
    this._taskComponent = new Task(task);
    this._taskEditComponent = new EditTask(task);

    this._taskComponent.setClickHandler(() => this._replaceTaskToEdit());

    Render.render(this._container, this._taskComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _replaceTaskToEdit() {
    Render.replace(this._taskEditComponent.getElement(), this._taskComponent.getElement());
    this.onOpen(this._taskComponent, this._taskEditComponent, this);
  }

  _replaceEditToTask(taskComponent, taskEditComponent) {
    Render.replace(taskComponent, taskEditComponent);
  }
}
