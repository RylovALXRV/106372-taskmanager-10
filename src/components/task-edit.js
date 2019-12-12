import {COLORS, MONTH_NAMES, DAYS} from "../const";
import Util from "../utils";

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
      <label class="card__repeat-day" for="repeat-mo-4">${day}</label>`
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

const createTaskEditTemplate = (task) => {
  const {color, description, dueDate, repeatingDays, tags} = task;

  const isDateShowing = !!dueDate;
  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isRepeatingTask = Object.values(repeatingDays).some(Boolean);

  const date = isDateShowing ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : ``;
  const deadline = isExpired ? `card--deadline` : ``;
  const repeatClass = isRepeatingTask ? `card--repeat` : ``;
  const time = isDateShowing ? Util.formatTime(dueDate) : ``;

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
                ${isRepeatingDaysMarkup(isRepeatingTask, repeatingDays)}
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
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};

export default class EditTask {
  constructor(task) {
    this._element = null;
    this._task = task;
  }

  getTemplate() {
    return createTaskEditTemplate(this._task);
  }

  getElement() {
    if (!this._element) {
      this._element = Util.createElement(this.getTemplate());
    }
    return this._element;
  }

  getEditFormElement() {
    return this.getElement().querySelector(`form`);
  }

  removeElement() {
    this._element = null;
  }
}

export {createTaskEditTemplate};
