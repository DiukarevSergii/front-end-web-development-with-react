import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// eslint-disable-next-line
it('renders without crashing', () => {
  const div = document.createElement('div');
  // eslint-disable-next-line
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
