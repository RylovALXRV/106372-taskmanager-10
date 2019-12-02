import {generateFilters} from "../mock/filter";

const FILTER_CHECKED_COUNT = 0;

const removeFiltersTemplate = () => {
  const filterElement = document.querySelector(`.main__filter`);
  if (filterElement) {
    filterElement.remove();
  }
};

const createFiltersMarkup = (tasks) => {
  const filters = generateFilters(tasks);

  return filters.map((filter, i) => {
    const {title, count} = filter;
    return (
      `<input
          type="radio"
          id="filter__${title}"
          class="filter__input visually-hidden"
          name="filter"
          ${i === FILTER_CHECKED_COUNT ? `checked` : ``}
        />
        <label for="filter__${title}" class="filter__label">
          ${title} <span class="filter__${title}-count">${count}</span></label
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

export {createFiltersTemplate};
