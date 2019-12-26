import {RenderPosition} from "../const";
import Render from "../utils/render";
import Task from "../components/task";
import EditTask from "../components/task-edit";

export default class TaskController {
  constructor(container, onOpen, onDataChange) {
    this._container = container.getElement();
    this._taskComponent = null;
    this._taskEditComponent = null;

    this._onOpen = onOpen;
    this._onDataChange = onDataChange;
  }

  render(task) {
    const oldTaskComponent = this._taskComponent;
    const oldEditTaskComponent = this._taskEditComponent;

    this._taskComponent = new Task(task);
    this._taskEditComponent = new EditTask(task);

    this._taskComponent.setClickEditHandler(() => this._replaceTaskToEdit());

    this._taskComponent.setClickArchiveHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isArchive: !task.isArchive,
      }));
    });

    this._taskComponent.setClickFavoritesHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isFavorite: !task.isFavorite,
      }));
    });

    if (oldEditTaskComponent && oldTaskComponent) {
      Render.replace(this._taskComponent.getElement(), oldTaskComponent.getElement());
      Render.replace(this._taskEditComponent.getElement(), oldEditTaskComponent.getElement());
    } else {
      Render.render(this._container, this._taskComponent.getElement(), RenderPosition.BEFOREEND);
    }
  }

  _replaceTaskToEdit() {
    Render.replace(this._taskEditComponent.getElement(), this._taskComponent.getElement());
    this._onOpen(this._taskComponent, this._taskEditComponent, this);
  }

  _replaceEditToTask(taskComponent, taskEditComponent) {
    Render.replace(taskComponent, taskEditComponent);
  }
}
