import { capitalize } from "@/common/utils";

const modulesContext = require.context("../modules/", true, /store\.js$/);

// Преобразуем каждый файл в модуль vuex
export default modulesContext.keys().reduce((modules, filename) => {
  const moduleName = filename.split("/")[1].replace(/^\w/, capitalize);

  modules[moduleName] =
    modulesContext(filename).default || modulesContext(filename);

  return modules;
}, {});
