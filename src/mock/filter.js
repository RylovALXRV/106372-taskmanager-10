const FilterNames = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `tags`,
  `archive`
];

const FilterBy = {
  'archive': (tasks) => {
    return tasks.filter((task) => {
      const {isArchive} = task;
      return !!isArchive;
    });
  },
  'favorites': (tasks) => {
    return tasks.filter((task) => {
      const {isFavorite} = task;
      return !!isFavorite;
    });
  },
  'overdue': (tasks) => {
    return tasks.filter((task) => {
      const {dueDate} = task;
      return !!dueDate && (dueDate < Date.now());
    });
  },
  'repeating': (tasks) => {
    return tasks.filter((task) => {
      const {repeatingDays} = task;
      return Object.values(repeatingDays).some(Boolean);
    });
  },
  'tags': (tasks) => {
    return tasks.filter((task) => {
      const {tags} = task;
      return !!Array.from(tags).length;
    });
  },
  'today': (tasks) => {
    const date = new Date();

    return tasks.filter((task) => {
      const {dueDate} = task;
      return !!dueDate && (dueDate.getDate() === date.getDate());
    });
  }
};

const getFilteredTasks = (tasks) => {
  return Object.assign({}, {
    'all': tasks,
    'overdue': FilterBy.overdue(tasks),
    'today': FilterBy.today(tasks),
    'favorites': FilterBy.favorites(tasks),
    'repeating': FilterBy.repeating(tasks),
    'tags': FilterBy.tags(tasks),
    'archive': FilterBy.archive(tasks)
  });
};

const generateFilters = (tasks) => {
  const filteredTasks = getFilteredTasks(tasks);

  return FilterNames.map((filter) => {
    return {
      title: filter,
      count: filteredTasks[filter].length
    };
  });
};

export {generateFilters};
