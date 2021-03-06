import {COLORS, DAYS} from "../const";
import Common from "../utils/common";
import AbstractSmartComponent from "./abstract-smart-component";
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';

const createCardColorsMarkup = (currentColor) => {
  return COLORS.map((color) => {
    return (
      `<input
       type="radio"
       id="color-${color}-4"
       class="card__color-input card__color-input--${color} visually-hidden"
       name="color"
       value="${color}"
       ${color === currentColor ? `checked` : ``}/>
     <label
       for="color-${color}-4"
       class="card__color card__color--${color}">${color}</label>`
    );
  }).join(``);
};

const createRepeatingDaysMarkup = (repeatingDays) => {
  return DAYS.map((day) => {
    return (
      `<input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${day}-4"
        name="repeat"
        value="${day}"
        ${repeatingDays[day] ? `checked` : ``}/>
      <label class="card__repeat-day" for="repeat-${day}-4">${day}</label>`
    );
  }).join(``);
};

const createHashtagsMarkup = (hashtags) => {
  return hashtags.map((hashtag) => {
    return (
      `<span class="card__hashtag-inner">
        <input
          type="hidden"
          name="hashtag"
          value="${hashtag}"
          class="card__hashtag-hidden-input"/>
        <p class="card__hashtag-name">
          #${hashtag}
        </p>
        <button type="button" class="card__hashtag-delete">
          delete
        </button>
      </span>`
    );
  }).join(``);
};

const isRepeatingDaysMarkup = (isRepeat, repeatingDays) => {
  return isRepeat ? `<fieldset class="card__repeat-days">
                        <div class="card__repeat-days-inner">
                          ${createRepeatingDaysMarkup(repeatingDays)}
                        </div>
                      </fieldset>` : ``;
};

const isDateMarkup = (isDate, fullDate) => {
  return isDate ? `<fieldset class="card__date-deadline">
                     <label class="card__input-deadline-wrap">
                       <input
                         class="card__date"
                         type="text"
                         placeholder=""
                         name="date"
                         value="${fullDate}"/>
                     </label>
                   </fieldset>` : ``;
};

const isRepeating = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean);
};

const createTaskEditTemplate = (task, options = {}) => {
  const {color, description, dueDate, tags} = task;
  const {isDateShowing, isRepeatingTask, activeRepeatingDays} = options;

  const isExpired = dueDate instanceof Date && dueDate < Date.now();

  const isBlockSaveButton = (isDateShowing && isRepeatingTask) || (isRepeatingTask && !isRepeating(activeRepeatingDays));

  const date = (isDateShowing && dueDate) ? Common.formatDate(dueDate) : ``;
  const time = (isDateShowing && dueDate) ? Common.formatTime(dueDate) : ``;

  const deadline = isExpired ? `card--deadline` : ``;
  const repeatClass = isRepeatingTask ? `card--repeat` : ``;

  return (
    `<article class="card card--edit card--${color} ${repeatClass} ${deadline}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text">${description}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${isDateShowing ? `yes` : `no`}</span>
                </button>
                ${isDateMarkup(isDateShowing, [date, time].join(` `))}
                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${isRepeatingTask ? `yes` : `no`}</span>
                </button>
                ${isRepeatingDaysMarkup(isRepeatingTask, activeRepeatingDays)}
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${createHashtagsMarkup(Array.from(tags))}
                </div>

                <label>
                  <input
                    type="text"
                    class="card__hashtag-input"
                    name="hashtag-input"
                    placeholder="Type new hashtag here"/>
                </label>
              </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${createCardColorsMarkup(color)}
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit" ${isBlockSaveButton ? `disabled` : ``}>save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};

export default class EditTask extends AbstractSmartComponent {
  constructor(task) {
    super();

    this._task = task;
    this._isDateShowing = !!task.dueDate;
    this._isRepeatingTask = Object.values(task.repeatingDays).some(Boolean);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);
    this._flatpickr = null;

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createTaskEditTemplate(this._task, {
      isDateShowing: this._isDateShowing,
      isRepeatingTask: this._isRepeatingTask,
      activeRepeatingDays: this._activeRepeatingDays
    });
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  reset() {
    const task = this._task;

    this._isDateShowing = !!task.dueDate;
    this._isRepeatingTask = Object.values(task.repeatingDays).some(Boolean);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);

    this.rerender();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, () => {
      this._isDateShowing = !this._isDateShowing;

      this.rerender();
    });

    element.querySelector(`.card__repeat-toggle`).addEventListener(`click`, () => {
      this._isRepeatingTask = !this._isRepeatingTask;

      this.rerender();
    });

    element.querySelector(`.card__colors-inner`).addEventListener(`change`, (evt) => {
      this._task.color = evt.target.value;

      this.rerender();
    });

    const repeatDays = element.querySelector(`.card__repeat-days`);
    if (repeatDays) {
      repeatDays.addEventListener(`change`, (evt) => {
        const target = evt.target;
        this._activeRepeatingDays[target.value] = target.checked;

        this.rerender();
      });
    }
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    if (this._isDateShowing) {
      const dateElement = this.getElement().querySelector(`.card__date`);
      this._flatpickr = flatpickr(dateElement, {
        altInput: true,
        allowInput: true,
        defaultDate: this._task.dueDate,
      });
    }
  }

  _getEditFormElement() {
    return this.getElement().querySelector(`form`);
  }

  setSubmitHandler(handler) {
    this._getEditFormElement().addEventListener(`submit`, handler);
  }
}

export {createTaskEditTemplate};
