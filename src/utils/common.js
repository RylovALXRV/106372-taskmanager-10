const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export default class Common {
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

  static isEscKey(evt) {
    return evt.key === `Escape` || evt.key === `Esc`;
  }

  static isTags(tag) {
    return !!tag.size;
  }

  static isRepeatingDays(days) {
    return Object.values(days).some(Boolean);
  }

  static isToday(date, currentDate) {
    return !!date && date.getDate() === currentDate;
  }

  static isOverdue(date) {
    return !!date && date < Date.now();
  }
}
