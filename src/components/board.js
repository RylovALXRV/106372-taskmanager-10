import {createTaskTemplate} from "./task";
import {createTaskEditTemplate} from "./task-edit";
import {createButtonLoadMoreTemplate} from "./button-load-more";

const renderTasks = (tasks, startTasks, tasksCount) => {
  return tasks.slice(startTasks, tasksCount).map((task) => createTaskTemplate(task)).join(``);
};

const createBoardTemplate = (tasks, startTasks, tasksCount) => {
  return (
    `<section class="board container">
        <div class="board__filter-list">
          <a href="#" class="board__filter">SORT BY DEFAULT</a>
          <a href="#" class="board__filter">SORT BY DATE up</a>
          <a href="#" class="board__filter">SORT BY DATE down</a>
        </div>

        <div class="board__tasks">
          ${createTaskEditTemplate(tasks[0])}
          ${renderTasks(tasks, startTasks, tasksCount)}
        </div>
        ${createButtonLoadMoreTemplate()}
      </section>`
  );
};

export {createBoardTemplate, renderTasks};
