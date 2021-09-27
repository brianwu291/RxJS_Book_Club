import React from 'react';
import ReactDOM from 'react-dom';

import createObservable from './createObservable';
import subscriber from './subscriber';

function App() {
  const subscriberCallback = subscriber => {
    console.log('stream start');
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.next(4);
    console.log('stream end');
    subscriber.complete();
  };
  const source$ = createObservable(subscriberCallback);
  const subscribeConfig = {
    next: data => console.log(`Observable 第一次訂閱: ${data}`),
    complete: () => console.log('首次訂閱完成'),
  };
  subscriber(source$, subscribeConfig);

  return (
    <div>
      App
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
