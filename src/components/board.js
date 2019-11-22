import {createTaskTemplate} from "./task";
import {createTaskEditTemplate} from "./task-edit";
import {createButtonLoadMoreTemplate} from "./button-load-more";

const TASK_COUNT = 4;

const appendTasks = () => {
  return new Array(TASK_COUNT).join(createTaskTemplate());
};

export const createBoardTemplate = () => {
  return (
    `<section class="board container">
        <div class="board__filter-list">
          <a href="#" class="board__filter">SORT BY DEFAULT</a>
          <a href="#" class="board__filter">SORT BY DATE up</a>
          <a href="#" class="board__filter">SORT BY DATE down</a>
        </div>

        <div class="board__tasks">
          ${createTaskEditTemplate()}
          ${appendTasks()}
        </div>
        ${createButtonLoadMoreTemplate()}
      </section>`
  );
};
