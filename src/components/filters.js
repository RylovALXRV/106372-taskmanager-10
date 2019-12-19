import {FILTER_NAMES} from "../const";
import {getAmountTasks} from "../mock/filter";
import AbstractComponent from "./abstract-component";

const DEFAULT_FILTER_INDEX = 0;

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
  return (
    `<section class="main__filter filter container">
      ${createFiltersMarkup(tasks)}
      </section>`
  );
};

export default class Filters extends AbstractComponent {
  constructor(tasks) {
    super();

    this._tasks = tasks;
  }

  getTemplate() {
    return createFiltersTemplate(this._tasks);
  }
}

export {createFiltersTemplate};
