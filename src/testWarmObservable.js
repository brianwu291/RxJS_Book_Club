import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

const URL = 'https://jsonplaceholder.typicode.com/todos/1';

export default function testWarmObservable() {
  const subscriberCallback = subscriber => {
    console.log('開始進行 API 呼叫');
    // fetch
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        // 取得回應的內容，並傳到 subscriber 內
        subscriber.next(data);
        // 結束資料流
        subscriber.complete();
      });
  }

  const apiRequest$ = new Observable(subscriberCallback);

  // const sharedApiRequest$ =  apiRequest$.pipe(share());
  
  // 第一次訂閱時，才呼叫 API
  apiRequest$.subscribe(result => {
    console.log('第一次 API 呼叫結果');
    console.log(result);
  });
  
  // 第二次訂閱時，會重新跑一次流程，因此會再次呼叫 API
  apiRequest$.subscribe(result => {
    console.log('第二次 API 呼叫結果')
    console.log(result);
  });

  // // 第一次訂閱時，才呼叫 API
  // sharedApiRequest$.subscribe(result => {
  //   console.log('第一次 API 呼叫結果');
  //   console.log(result);
  // });

  // // 第二次訂閱時，會重新跑一次流程，因此會再次呼叫 API
  // sharedApiRequest$.subscribe(result => {
  //   console.log('第二次 API 呼叫結果')
  //   console.log(result);
  // });

}