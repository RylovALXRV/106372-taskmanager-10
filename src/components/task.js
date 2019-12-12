import {MONTH_NAMES} from "../const";
import Util, {RenderPosition} from "../utils";
import EditTask from "./task-edit";

const BUTTON_CONTROLS = [`edit`, `archive`, `favorites`];

const ButtonDefault = {
  edit: false,
  archive: false,
  favorites: false
};

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
    const time = isDateShowing ? Util.formatTime(dueDate) : ``;

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

const createButtonsControlMarkup = () => {
  return BUTTON_CONTROLS.map((button) => {
    return `<button type="button" class="card__btn card__btn--${button} ${BUTTON_CONTROLS[ButtonDefault] ? `card__btn--disabled` : ``}">${button}</button>`;
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
            ${createButtonsControlMarkup()}
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

export default class Task {
  constructor(task) {
    this._element = null;
    this._task = task;
  }

  getTemplate() {
    return createTaskTemplate(this._task);
  }

  getElement() {
    if (!this._element) {
      this._element = Util.createElement(this.getTemplate());
    }
    return this._element;
  }

  getEditButtonElement() {
    return this.getElement().querySelector(`.card__btn--edit`);
  }

  removeElement() {
    this._element = null;
  }
}

const replaceEditToTask = () => {
  document.querySelector(`.board__tasks`).replaceChild(currentTask, currentEditTask);
  document.removeEventListener(`keydown`, onEscKeyDown);
};

const closeEditTask = () => {
  replaceEditToTask();
  currentTask = null;
  currentEditTask = null;
};

const onEscKeyDown = (evt) => {
  const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

  if (isEscKey) {
    closeEditTask();
  }
};

export const renderTask = (task, parentElement) => {
  const taskEditComponent = new EditTask(task);
  const taskComponent = new Task(task);

  const replaceTaskToEdit = () => {
    parentElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const editButtonElement = taskComponent.getEditButtonElement();
  editButtonElement.addEventListener(`click`, () => {

    if (currentTask) {
      closeEditTask();
    }

    if (currentTask !== taskComponent.getElement()) {
      replaceTaskToEdit();
    }

    currentTask = taskComponent.getElement();
    currentEditTask = taskEditComponent.getElement();
  });

  const editFormElement = taskEditComponent.getEditFormElement();
  editFormElement.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    closeEditTask();
  });

  Util.render(parentElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

let currentTask = null;
let currentEditTask = null;
