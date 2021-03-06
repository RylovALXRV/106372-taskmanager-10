const COLORS = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`
];

const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

const FILTER_NAMES = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `tags`,
  `archive`
];

const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];

const ButtonControl = {
  EDIT: ``,
  ARCHIVE: `isArchive`,
  FAVORITES: `isFavorite`
};

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

const Day = {
  FIRST: 0,
  LAST: 7
};

const Tag = {
  MIN: 0,
  MAX: 3
};

const SortType = {
  DATE_DOWN: `date-down`,
  DATE_UP: `date-up`,
  DEFAULT: `default`
};

export {COLORS, MONTH_NAMES, DAYS, FILTER_NAMES, ButtonControl,
  RenderPosition, TaskNumber, Tag, Day, SortType};
