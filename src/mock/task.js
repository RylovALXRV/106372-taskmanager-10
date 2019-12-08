import {COLORS} from "../const";
import Util from "../utils";

const Day = {
  FIRST: 0,
  LAST: 7
};

const Tag = {
  MIN: 0,
  MAX: 3
};

const TaskFeature = {
  DEFAULT_REPEATING_DAYS: {
    'mo': false,
    'tu': false,
    'we': false,
    'th': false,
    'fr': false,
    'sa': false,
    'su': false
  },
  DESCRIPTIONS: [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`],
  TAGS: [`homework`, `theory`, `practice`, `intensive`, `keks`]
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sing = Util.isRandomBoolean() ? 1 : -1;
  const diffValue = sing * Util.getRandomInteger(Day.FIRST, Day.LAST);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateRepeatingDays = () => {
  return {
    'mo': Util.isRandomBoolean(),
    'tu': Util.isRandomBoolean(),
    'we': Util.isRandomBoolean(),
    'th': Util.isRandomBoolean(),
    'fr': Util.isRandomBoolean(),
    'sa': Util.isRandomBoolean(),
    'su': Util.isRandomBoolean()
  };
};

const generateTags = () => {
  return TaskFeature.TAGS.filter(() => Util.isRandomBoolean()).slice(Tag.MIN, Tag.MAX);
};

const generateTask = () => {
  const dueDate = Util.isRandomBoolean() ? null : getRandomDate();

  return {
    color: Util.getRandomElement(COLORS),
    description: Util.getRandomElement(TaskFeature.DESCRIPTIONS),
    dueDate,
    isArchive: Util.isRandomBoolean(),
    isFavorite: Util.isRandomBoolean(),
    repeatingDays: dueDate ? Object.assign({}, TaskFeature.DEFAULT_REPEATING_DAYS) : generateRepeatingDays(),
    tags: new Set(generateTags())
  };
};

const generateTasks = (count) => {
  return new Array(count).fill(``).map(generateTask);
};

export {generateTasks};
