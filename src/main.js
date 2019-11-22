import {createSiteMenuTemplate} from "./components/menu";
import {createFiltersTemplate} from "./components/filters";
import {createBoardTemplate} from "./components/board";

const mainElement = document.querySelector(`.main`);
const controlElement = mainElement.querySelector(`.main__control`);

const render = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const fillPageElements = () => {
  render(mainElement, createFiltersTemplate());
  render(mainElement, createBoardTemplate());
  render(controlElement, createSiteMenuTemplate());
};

fillPageElements();
