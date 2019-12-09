import Util from "../utils";

const createButtonLoadMoreTemplate = () => {
  return (
    `<button class="load-more" type="button">Load more</button>`
  );
};

const removeButtonLoadMore = (currentTasksCount, tasks) => {
  const loadMoreElement = document.querySelector(`.load-more`);

  if (loadMoreElement && currentTasksCount >= tasks) {
    loadMoreElement.remove();
    new ButtonLoadMore().removeElement();
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
