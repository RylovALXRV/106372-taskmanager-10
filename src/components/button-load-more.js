const createButtonLoadMoreTemplate = () => {
  return (
    `<button class="load-more" type="button">Load more</button>`
  );
};

const removeButtonLoadMore = (currentTasksCount, tasksCount) => {
  const loadMoreElement = document.querySelector(`.load-more`);

  if (loadMoreElement && currentTasksCount >= tasksCount) {
    loadMoreElement.remove();
  }
};

export {createButtonLoadMoreTemplate, removeButtonLoadMore};
