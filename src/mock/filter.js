const isTags = (tag) => {
  return !!tag.size;
};

const isRepeatingDays = (days) => {
  return Object.values(days).some(Boolean);
};

const isToday = (date, currentDate) => {
  return !!date && date.getDate() === currentDate;
};

const isOverdue = (date) => {
  return !!date && date < Date.now();
};

const getAmountTasks = (tasks) => {
  const date = new Date();

  return tasks.reduce((accumulator, task) => {
    const {dueDate, isFavorite, repeatingDays, tags, isArchive} = task;
    const {all, overdue, today, favorites, repeating, archive} = accumulator;

    return {
      all: all + Number(!isArchive),
      overdue: overdue + Number(isOverdue(dueDate)),
      today: today + Number(isToday(dueDate, date.getDate())),
      favorites: favorites + Number(isFavorite),
      repeating: repeating + Number(isRepeatingDays(repeatingDays)),
      tags: accumulator.tags + Number(isTags(tags)),
      archive: archive + Number(isArchive)
    };
  }, {all: 0, overdue: 0, today: 0, favorites: 0, repeating: 0, tags: 0, archive: 0});
};

export {getAmountTasks};
