import Common from "../utils/common";

const getAmountTasks = (tasks) => {
  const date = new Date();

  return tasks.reduce((accumulator, task) => {
    const {dueDate, isFavorite, repeatingDays, tags, isArchive} = task;
    const {all, overdue, today, favorites, repeating, archive} = accumulator;

    return {
      all: all + Number(!isArchive),
      overdue: overdue + Number(Common.isOverdue(dueDate)),
      today: today + Number(Common.isToday(dueDate, date.getDate())),
      favorites: favorites + Number(isFavorite),
      repeating: repeating + Number(Common.isRepeatingDays(repeatingDays)),
      tags: accumulator.tags + Number(Common.isTags(tags)),
      archive: archive + Number(isArchive)
    };
  }, {all: 0, overdue: 0, today: 0, favorites: 0, repeating: 0, tags: 0, archive: 0});
};

export {getAmountTasks};
