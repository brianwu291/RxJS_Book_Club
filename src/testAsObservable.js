"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
function testAsObservable() {
    var Student = /** @class */ (function () {
        function Student() {
            this._score$ = new rxjs_1.Subject();
        }
        Object.defineProperty(Student.prototype, "score$", {
            get: function () {
                return this._score$.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        Student.prototype.updateScore = function (score) {
            // 大於 60 才推送成績事件
            if (score > 60) {
                this._score$.next(score);
            }
        };
        return Student;
    }());
    var Peter = new Student();
    Peter.score$.subscribe(function (score) {
        console.log("\u76EE\u524D\u6210\u7E3E: " + score);
    });
    Peter.updateScore(70);
    Peter.updateScore(50);
    Peter.updateScore(80);
    Peter.score$.next(50);
}
exports["default"] = testAsObservable;
