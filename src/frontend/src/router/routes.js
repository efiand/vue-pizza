const CARET = "^";
const COLON = ":";
const UNDERSCORE = "_";
const NOT_FOUND_PAGE = "NotFound";

const importAll = (views) =>
  views.keys().map((key) => key.slice(2).replace("View.vue", "").split("/"));

const pages = importAll(require.context("../views", true, /.vue$/));

const generateRoute = (path) => {
  // Обработка корневых директорий, которые начинаются с index. Например: файл views/index/*
  if (path[0].toLowerCase().startsWith("index") && path.length > 1) {
    path.shift();
  }

  // Обработка корневых файлов. Например: файлы views/IndexView.vue, views/ProfileView.vue
  if (path.length === 1) {
    const shortcut = path[0].toLowerCase();

    if (shortcut.startsWith("index")) {
      return "";
    }

    if (shortcut.startsWith(UNDERSCORE)) {
      return shortcut.replace(UNDERSCORE, COLON);
    }

    return shortcut;
  }

  const lastElement = path[path.length - 1];

  if (lastElement.toLowerCase().startsWith("index")) {
    // Обработка файлов */Index.vue
    path.pop();
  } else if (lastElement.startsWith(UNDERSCORE)) {
    // Обработка динамических маршрутов.
    path[path.length - 1] = lastElement.replace(UNDERSCORE, COLON);
  }

  return path.map((item) => item.toLowerCase()).join("/");
};

const filterChildren = (item) => item.indexOf(CARET) !== -1;

const getChildrenByPath = pages
  .filter((path) => path.some(filterChildren))
  .map((path) => {
    // Note: copy path and remove special char ^
    const copy = [...path];
    copy[copy.length - 1] = copy[copy.length - 1].slice(1);
    const key = `/${generateRoute(copy.slice(0, copy.length - 1))}`;
    return {
      path,
      route: `/${generateRoute(copy)}`,
      key,
    };
  })
  .reduce((acc, cur) => {
    const key = cur.key;
    delete cur.key;
    if (acc[key]) {
      acc[key].push(cur);
    } else {
      acc[key] = [cur];
    }
    return acc;
  }, {});

const handleNotFoundPage = async () => {
  const module = await import(`../views/${NOT_FOUND_PAGE}View.vue`);
  const component = await module.default;

  return {
    path: "*",
    component,
  };
};

export default pages
  .filter((path) => !path.some(filterChildren))
  .map(async (path) => {
    if (path.includes(NOT_FOUND_PAGE)) {
      return await handleNotFoundPage();
    }

    const { default: component } = await import(
      `../views/${path.join("/")}View.vue`
    );
    const { meta = {}, name } = component;
    const route = `/${generateRoute([...path])}`;

    let children = [];
    if (getChildrenByPath[route]) {
      const promises = getChildrenByPath[route].map(async ({ path, route }) => {
        const { default: childComponent } = await import(
          `../views/${path.join("/")}View.vue`
        );
        return {
          path: route,
          name: childComponent.name,
          component: childComponent,
          meta: childComponent.meta || {},
        };
      });
      children = await Promise.all(promises);
    }

    return {
      path: route,
      name,
      component,
      meta,
      children,
    };
  });
