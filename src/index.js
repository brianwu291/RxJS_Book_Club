import React from 'react';
import ReactDOM from 'react-dom';

// import createObservable from './createObservable';
// import createSubject from './createSubject';

function App() {
  // observable

  // const subscriberCallback = subscriber => {
  //   console.log('stream start');
  //   subscriber.next(1);
  //   subscriber.next(2);
  //   subscriber.next(3);
  //   subscriber.next(4);
  //   subscriber.complete();
  //   console.log('stream end');
  //   Promise.resolve()
  //     .then(() => {
  //       subscriber.next(4);
  //       subscriber.complete();
  //       console.log('stream end');
  //     });
  // };

  // const source$ = createObservable(subscriberCallback);

  // const subscribeConfigOne = {
  //   next: data => console.log(`Observable 第一次訂閱: ${data}`),
  //   complete: () => {
  //     console.log('首次訂閱完成');
  //   },
  // };
  // source$.subscribe(subscribeConfigOne);
  
  // const subscribeConfigTwo = {
  //   next: data => console.log(`Observable 第二次訂閱: ${data}`),
  //   complete: () => {
  //     console.log('第二次訂閱完成');
  //   },
  // };
  // source$.subscribe(subscribeConfigTwo);




  // subject

  // const source$ = createSubject();

  // source$.subscribe((data) => {
  //   console.log(`Subject 第一次訂閱: ${data}`);
  // });
  // source$.next(1);
  // source$.next(2);

  // source$.subscribe((data) => {
  //   console.log(`Subject 第二次訂閱: ${data}`);
  // });
  // source$.next(3);
  // source$.next(4);

  // source$.subscribe((data) => {
  //   console.log(`Subject 第三次訂閱: ${data}`);
  // });
  // source$.next(5);
  // source$.complete();

  return (
    <div>
      App
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
