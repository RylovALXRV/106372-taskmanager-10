import Util from "../utils";

const createButtonLoadMoreTemplate = () => {
  return (
    `<button class="load-more" type="button">Load more</button>`
  );
};

const removeButtonLoadMore = (button, currentTasksCount, tasks) => {
  if (currentTasksCount >= tasks) {
    button.getElement().remove();
    button.removeElement();
  }
};

export default class ButtonLoadMore {
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

export {removeButtonLoadMore};
