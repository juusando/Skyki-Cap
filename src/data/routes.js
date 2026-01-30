import React from 'react';

// Define the pages and UI components
const pages = {
  Home: 'Home',
  DesignSystem: "DesignSystem",
};

const uiComponents = {
  Test: 'Test',
};

// Create a default route for the Home page from pages folder
const HomeComponent = React.lazy(() => import(`../pages/Home.jsx`));

// Create routes with dynamic imports for both 'pages' and 'ui' directories
const pageRoutes = Object.keys(pages).map(page => {
  const Component = React.lazy(() => import(`../pages/${pages[page]}.jsx`));
  return {
    path: `/${page.toLowerCase()}`,
    element: <Component />,
  };
});

const uiRoutes = Object.keys(uiComponents).map(component => {
  const Component = React.lazy(() => import(`../ui/atom/${uiComponents[component]}.jsx`));
  return {
    path: `/ui/atom/${component.toLowerCase()}`,
    element: <Component />,
  };
});

// Add the default route for Home
const defaultRoute = {
  path: '/',
  element: <HomeComponent />,
};

// Export both the default route and the dynamically generated routes from 'pages' and 'ui'
export default [defaultRoute, ...pageRoutes, ...uiRoutes];
