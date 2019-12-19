import AbstractComponent from "./abstract-component";

const createButtonLoadMoreTemplate = () => {
  return (
    `<button class="load-more" type="button">Load more</button>`
  );
};

export default class ButtonLoadMore extends AbstractComponent {
  getTemplate() {
    return createButtonLoadMoreTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
