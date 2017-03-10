/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import App from '../components/App';

// Child routes
import home from './home';
import login from './login';
import error from './error';

import live from  './dashboardPages/live';
import finances from  './dashboardPages/finances';
import logs from  './dashboardPages/logs';
import blank from './dashboardPages/blank';
import Header from '../components/Header';

export default [
  {
    path: '/',

  // keep in mind, routes are evaluated in order
    children: [
      home,
      login,
      live,
      finances,
      logs,
      error,
    ],

    async action({ next, render, context, isAuthenticated }) {
      const component = await next();
      console.log(isAuthenticated)
      if (component === undefined) return component;
      return render(
        <div>
          <div id="page-wrapper" className="page-wrapper">
            <App authenticated={isAuthenticated} context={context}>{component}</App>
          </div>
        </div>
      );
    },
  },
  {
    path: '/error',
    children: [
      error,
    ],
    async action({ next, render, context }) {
      // console.log('inside error');
      const component = await next();
      // console.log('inside error with component', component);
      if (component === undefined) return component;
      return render(
        <App context={context}>{component}</App>
      );
    },
  },
];
