import React from 'react';
import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';

// set up testing envirement to run like a browser in command line
const HTML =
  '<!DOCTYPE html>' +
  '<html>' +
    '<body>' +
    '</body>' +
  '</html>';

global.document = jsdom.jsdom(HTML);
global.window = global.document.defaultView;
const $ = jquery(global.window);

// build 'renderComponent' halper that should render a given react class
const renderComponent = function (ComponentClass, props, state) {
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );

  return $(ReactDOM.findDOMNode(componentInstance)); //produces HTML
};

// build helper for simulating events
$.fn.simulate = function (eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};

// set up chai-jquery
chaiJquery(chai, chai.util, $);

export { renderComponent, expect };
