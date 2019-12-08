import Util, {RenderPosition, TaskNumber} from "../utils";
import {renderTasks} from "../main";

let tasksCount = TaskNumber.SHOW;

const createButtonLoadMoreTemplate = () => {
  return (
    `<button class="load-more" type="button">Load more</button>`
  );
};

const removeButtonLoadMore = (currentTasksCount, tasks) => {
  const loadMoreElement = document.querySelector(`.load-more`);

  if (loadMoreElement && currentTasksCount >= tasks) {
    loadMoreElement.remove();
  }
};

class ButtonLoadMore {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createButtonLoadMoreTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = Util.createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

const renderButtonLoadMore = (tasks) => {
  const boardElement = document.querySelector(`.board__tasks`);
  const buttonLoadMoreElement = new ButtonLoadMore().getElement();

  buttonLoadMoreElement.addEventListener(`click`, () => {
    const prevTasksCount = tasksCount;
    tasksCount += TaskNumber.SHOW;

    renderTasks(tasks, prevTasksCount, tasksCount);
    removeButtonLoadMore(tasksCount, TaskNumber.COUNT);
  });

  Util.render(boardElement, buttonLoadMoreElement, RenderPosition.AFTEREND);
};

export {renderButtonLoadMore};
