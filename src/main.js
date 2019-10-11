/**
 * @author Kuitos
 * @since 2019-05-16
 */

// import React from 'react';
// import ReactDOM from 'react-dom';
import Vue from 'vue';
import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start } from 'qiankun';
// import Framework from './Framework';
import Framework from './App.vue';

let app = null;

function render({ appContent, loading }) {

  /*
  examples for vue
   */
  if (!app) {
    app = new Vue({
      el: '#app',
      data() {
        return {
          content: appContent,
          loading,
        };
      },
      render(h) {
        return h(Framework, {
          props: {
            content: this.content,
            loading: this.loading,
          },
        });
      },
    });
  } else {
    app.content = appContent;
    app.loading = loading;
  }

  // const container = document.getElementById('container');
  // ReactDOM.render(<Framework loading={loading} content={appContent}/>, container);
}

function genActiveRule(routerPrefix) {
  return location => location.pathname.startsWith(routerPrefix);
}

render({ loading: true });

registerMicroApps(
  [
    { name: 'app1', entry: '//localhost:8081', render, activeRule: genActiveRule('/app1') },
    { name: 'app2', entry: '//localhost:8082', render, activeRule: genActiveRule('/app2') },
  ],
  {
    beforeLoad: [app => {
      console.log('before load', app);
    }],
    beforeMount: [app => {
      console.log('before mount', app);
    }],
    afterUnmount: [app => {
      console.log('after unload', app);
    }],
  },
);

setDefaultMountApp('/app1');
runAfterFirstMounted(() => console.info('first app mounted'));

start();
