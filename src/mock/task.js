import {COLORS, Tag, Day} from "../const";
import Common from "../utils/common";

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
  const sing = Common.isRandomBoolean() ? 1 : -1;
  const diffValue = sing * Common.getRandomInteger(Day.FIRST, Day.LAST);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateRepeatingDays = () => {
  return {
    'mo': Common.isRandomBoolean(),
    'tu': Common.isRandomBoolean(),
    'we': Common.isRandomBoolean(),
    'th': Common.isRandomBoolean(),
    'fr': Common.isRandomBoolean(),
    'sa': Common.isRandomBoolean(),
    'su': Common.isRandomBoolean()
  };
};

const generateTags = () => {
  return TaskFeature.TAGS.filter(() => Common.isRandomBoolean()).slice(Tag.MIN, Tag.MAX);
};

const generateTask = () => {
  const dueDate = Common.isRandomBoolean() ? null : getRandomDate();

  return {
    color: Common.getRandomElement(COLORS),
    description: Common.getRandomElement(TaskFeature.DESCRIPTIONS),
    dueDate,
    isArchive: Common.isRandomBoolean(),
    isFavorite: Common.isRandomBoolean(),
    repeatingDays: dueDate ? Object.assign({}, TaskFeature.DEFAULT_REPEATING_DAYS) : generateRepeatingDays(),
    tags: new Set(generateTags())
  };
};

const generateTasks = (count) => {
  return new Array(count).fill(``).map(generateTask);
};

export {generateTasks};
