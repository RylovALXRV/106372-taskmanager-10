import {getAmountTasks} from "../mock/filter";
import Util from "../utils";
import {FILTER_NAMES} from "../const";

const DEFAULT_FILTER_INDEX = 0;

const removeFiltersTemplate = () => {
  const filterElement = document.querySelector(`.main__filter`);
  if (filterElement) {
    filterElement.remove();
  }
};

const createFiltersMarkup = (tasks) => {
  const amountTasks = getAmountTasks(tasks);

  return FILTER_NAMES.map((filterName, i) => {
    const isFilteredTasks = !!amountTasks[filterName];

    return (
      `<input
          type="radio"
          id="filter__${filterName}"
          class="filter__input visually-hidden"
          name="filter"
          ${i === DEFAULT_FILTER_INDEX ? `checked` : ``}
          ${isFilteredTasks ? `` : `disabled`}
        />
        <label for="filter__${filterName}" class="filter__label">
          ${filterName} <span class="filter__${filterName}-count">${amountTasks[filterName]}</span></label
        >`
    );
  }).join(``);
};

const createFiltersTemplate = (tasks) => {
  removeFiltersTemplate();

  return (
    `<section class="main__filter filter container">
      ${createFiltersMarkup(tasks)}
      </section>`
  );
};

export default class Filters {
  constructor(tasks) {
    this._element = null;
    this._tasks = tasks;
  }

  getTemplate() {
    return createFiltersTemplate(this._tasks);
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

export {createFiltersTemplate};
