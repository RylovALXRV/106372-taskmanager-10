import moment from "moment";

export default class Common {

  static formatTime(date) {
    return moment(date).format(`hh:mm A`);
  }

  static formatDate(date) {
    return moment(date).format(`DD MMMM`);
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

  static compareDateDown(taskA, taskB) {
    return taskB.dueDate - taskA.dueDate;
  }

  static compareDateUp(taskA, taskB) {
    return taskA.dueDate - taskB.dueDate;
  }
}
