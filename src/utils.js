const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`
};

const TaskNumber = {
  COUNT: 22,
  INDEX_START: 0,
  SHOW: 8
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export default class Util {
  static render(container, template, position) {
    switch (position) {
      case RenderPosition.BEFOREEND:
        container.append(template);
        break;
      case RenderPosition.AFTERBEGIN:
        container.prepend(template);
        break;
      case RenderPosition.AFTEREND:
        container.after(template);
        break;
    }
  }

  static createElement(template) {
    const divElement = document.createElement(`div`);
    divElement.innerHTML = template;

    return divElement.firstElementChild;
  }

  static formatTime(date) {
    const hours = castTimeFormat(date.getHours() % 12);
    const minutes = castTimeFormat(date.getMinutes());

    const interval = date.getHours() > 11 ? `pm` : `am`;

    return `${hours}:${minutes} ${interval}`;
  }

  static getRandomElement(elements) {
    return elements[Math.floor(Math.random() * elements.length)];
  }

  static getRandomInteger(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  static isRandomBoolean() {
    return Math.random() > 0.5;
  }
}

export {RenderPosition, TaskNumber};
