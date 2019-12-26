import {MONTH_NAMES, ButtonControl} from "../const";
import Common from "../utils/common";
import AbstractComponent from "./abstract-component";

const createHashtagsMarkup = (hashtags) => {
  return hashtags.map((hashtag) => {
    return (
      `<span class="card__hashtag-inner">
        <span class="card__hashtag-name">
          #${hashtag}
        </span>
      </span>`
    );
  }).join(``);
};

const createHashtagsTemplate = (hashtags) => {
  return hashtags.size ? (
    `<div class="card__hashtag">
      <div class="card__hashtag-list">
        ${createHashtagsMarkup(Array.from(hashtags))}
      </div>
    </div>`
  ) : ``;
};

const createDatesMarkup = (dueDate) => {
  const isDateShowing = !!dueDate;

  if (isDateShowing) {
    const date = isDateShowing ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : ``;
    const time = isDateShowing ? Common.formatTime(dueDate) : ``;

    return (
      `<div class="card__dates">
        <div class="card__date-deadline">
          <p class="card__input-deadline-wrap">
            <span class="card__date">${date}</span>
            <span class="card__time">${time}</span>
          </p>
        </div>
      </div>`
    );
  }

  return ``;
};

const createButtonsControlMarkup = (task) => {
  return Object.keys(ButtonControl).map((button) => {
    return `<button type="button" class="card__btn card__btn--${button.toLocaleLowerCase()} ${task[ButtonControl[button]] ? `card__btn--disabled` : ``}">${button}</button>`;
  }).join(``);
};

const createTaskTemplate = (task) => {
  const {color, description, dueDate, repeatingDays, tags} = task;

  const isExpired = dueDate instanceof Date && dueDate < Date.now();

  const repeatClass = Object.values(repeatingDays).some(Boolean) ? `card--repeat` : ``;
  const deadline = isExpired ? `card--deadline` : ``;

  return (
    `<article class="card card--${color} ${repeatClass} ${deadline}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            ${createButtonsControlMarkup(task)}
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              ${createDatesMarkup(dueDate)}
              ${createHashtagsTemplate(tags)}
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};

export default class Task extends AbstractComponent {
  constructor(task) {
    super();

    this._task = task;
  }

  getTemplate() {
    return createTaskTemplate(this._task);
  }

  _getEditButtonElement() {
    return this.getElement().querySelector(`.card__btn--edit`);
  }

  _getArchiveElement() {
    return this.getElement().querySelector(`.card__btn--archive`);
  }

  _getFavoritesElement() {
    return this.getElement().querySelector(`.card__btn--favorites`);
  }

  setClickEditHandler(handler) {
    this._getEditButtonElement().addEventListener(`click`, handler);
  }

  setClickArchiveHandler(handler) {
    this._getArchiveElement().addEventListener(`click`, handler);
  }

  setClickFavoritesHandler(handler) {
    this._getFavoritesElement().addEventListener(`click`, handler);
  }
}
