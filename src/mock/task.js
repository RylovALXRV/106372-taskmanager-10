import {Colors} from "../const";
import {getRandomNumber, getRandomValue, isRandomBoolean} from "../utils";

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
  DESCRIPTION: [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`],
  TAGS: [`homework`, `theory`, `practice`, `intensive`, `keks`]
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sing = isRandomBoolean() ? 1 : -1;
  const diffValue = sing * getRandomNumber(0, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateRepeatingDays = () => {
  return Object.assign({}, TaskFeature.DEFAULT_REPEATING_DAYS, {
    'mo': isRandomBoolean(),
    'tu': isRandomBoolean(),
    'we': isRandomBoolean(),
    'th': isRandomBoolean(),
    'fr': isRandomBoolean(),
    'sa': isRandomBoolean(),
    'su': isRandomBoolean()
  });
};

const generateTags = () => {
  return TaskFeature.TAGS.filter(() => isRandomBoolean()).slice(0, 3);
};

const generateTask = () => {
  const dueDate = isRandomBoolean() ? null : getRandomDate();

  return {
    color: getRandomValue(Colors),
    description: getRandomValue(TaskFeature.DESCRIPTION),
    dueDate,
    isArchive: isRandomBoolean(),
    isFavorite: isRandomBoolean(),
    repeatingDays: dueDate ? TaskFeature.DEFAULT_REPEATING_DAYS : generateRepeatingDays(),
    tags: new Set(generateTags())
  };
};

const generateTasks = (count) => {
  return new Array(count).fill(``).map(generateTask);
};

export {generateTasks};
