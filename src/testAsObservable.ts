import { Subject } from 'rxjs';


export default function testAsObservable() {
  class Student {
    private _score$ = new Subject();
  
    get score$() {
      return this._score$.asObservable();
    }
  
    updateScore(score: any) {
      // 大於 60 才推送成績事件
      if (score > 60) {
        this._score$.next(score);
      }
    }
  }
  
  const Peter = new Student();
  
  Peter.score$.subscribe(score => {
    console.log(`目前成績: ${score}`);
  });
  
  Peter.updateScore(70);
  Peter.updateScore(50);
  Peter.updateScore(80);
}
