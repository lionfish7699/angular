'use strict';var PromiseCompleter = (function () {
    function PromiseCompleter() {
        var _this = this;
        this.promise = new Promise(function (res, rej) {
            _this.resolve = res;
            _this.reject = rej;
        });
    }
    return PromiseCompleter;
})();
exports.PromiseCompleter = PromiseCompleter;
var PromiseWrapper = (function () {
    function PromiseWrapper() {
    }
    PromiseWrapper.resolve = function (obj) { return Promise.resolve(obj); };
    PromiseWrapper.reject = function (obj, _) { return Promise.reject(obj); };
    // Note: We can't rename this method into `catch`, as this is not a valid
    // method name in Dart.
    PromiseWrapper.catchError = function (promise, onError) {
        return promise.catch(onError);
    };
    PromiseWrapper.all = function (promises) {
        if (promises.length == 0)
            return Promise.resolve([]);
        return Promise.all(promises);
    };
    PromiseWrapper.then = function (promise, success, rejection) {
        return promise.then(success, rejection);
    };
    PromiseWrapper.wrap = function (computation) {
        return new Promise(function (res, rej) {
            try {
                res(computation());
            }
            catch (e) {
                rej(e);
            }
        });
    };
    PromiseWrapper.scheduleMicrotask = function (computation) {
        PromiseWrapper.then(PromiseWrapper.resolve(null), computation, function (_) { });
    };
    PromiseWrapper.isPromise = function (obj) { return obj instanceof Promise; };
    PromiseWrapper.completer = function () { return new PromiseCompleter(); };
    return PromiseWrapper;
})();
exports.PromiseWrapper = PromiseWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbWlzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtUVBJdHh0WFoudG1wL2FuZ3VsYXIyL3NyYy9mYWNhZGUvcHJvbWlzZS50cyJdLCJuYW1lcyI6WyJQcm9taXNlQ29tcGxldGVyIiwiUHJvbWlzZUNvbXBsZXRlci5jb25zdHJ1Y3RvciIsIlByb21pc2VXcmFwcGVyIiwiUHJvbWlzZVdyYXBwZXIuY29uc3RydWN0b3IiLCJQcm9taXNlV3JhcHBlci5yZXNvbHZlIiwiUHJvbWlzZVdyYXBwZXIucmVqZWN0IiwiUHJvbWlzZVdyYXBwZXIuY2F0Y2hFcnJvciIsIlByb21pc2VXcmFwcGVyLmFsbCIsIlByb21pc2VXcmFwcGVyLnRoZW4iLCJQcm9taXNlV3JhcHBlci53cmFwIiwiUHJvbWlzZVdyYXBwZXIuc2NoZWR1bGVNaWNyb3Rhc2siLCJQcm9taXNlV3JhcHBlci5pc1Byb21pc2UiLCJQcm9taXNlV3JhcHBlci5jb21wbGV0ZXIiXSwibWFwcGluZ3MiOiJBQUNBO0lBS0VBO1FBTEZDLGlCQVdDQTtRQUxHQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxJQUFJQSxPQUFPQSxDQUFDQSxVQUFDQSxHQUFHQSxFQUFFQSxHQUFHQTtZQUNsQ0EsS0FBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFDbkJBLEtBQUlBLENBQUNBLE1BQU1BLEdBQUdBLEdBQUdBLENBQUNBO1FBQ3BCQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNMQSxDQUFDQTtJQUNIRCx1QkFBQ0E7QUFBREEsQ0FBQ0EsQUFYRCxJQVdDO0FBWFksd0JBQWdCLG1CQVc1QixDQUFBO0FBRUQ7SUFBQUU7SUF1Q0FDLENBQUNBO0lBdENRRCxzQkFBT0EsR0FBZEEsVUFBa0JBLEdBQU1BLElBQWdCRSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUUvREYscUJBQU1BLEdBQWJBLFVBQWNBLEdBQVFBLEVBQUVBLENBQUNBLElBQWtCRyxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUV4RUgseUVBQXlFQTtJQUN6RUEsdUJBQXVCQTtJQUNoQkEseUJBQVVBLEdBQWpCQSxVQUFxQkEsT0FBbUJBLEVBQ25CQSxPQUEyQ0E7UUFDOURJLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLEtBQUtBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO0lBQ2hDQSxDQUFDQTtJQUVNSixrQkFBR0EsR0FBVkEsVUFBY0EsUUFBNEJBO1FBQ3hDSyxFQUFFQSxDQUFDQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUFDQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUNyREEsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7SUFDL0JBLENBQUNBO0lBRU1MLG1CQUFJQSxHQUFYQSxVQUFrQkEsT0FBbUJBLEVBQUVBLE9BQXlDQSxFQUM5REEsU0FBMkRBO1FBQzNFTSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQTtJQUMxQ0EsQ0FBQ0E7SUFFTU4sbUJBQUlBLEdBQVhBLFVBQWVBLFdBQW9CQTtRQUNqQ08sTUFBTUEsQ0FBQ0EsSUFBSUEsT0FBT0EsQ0FBQ0EsVUFBQ0EsR0FBR0EsRUFBRUEsR0FBR0E7WUFDMUJBLElBQUlBLENBQUNBO2dCQUNIQSxHQUFHQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUNyQkEsQ0FBRUE7WUFBQUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1hBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ1RBLENBQUNBO1FBQ0hBLENBQUNBLENBQUNBLENBQUNBO0lBQ0xBLENBQUNBO0lBRU1QLGdDQUFpQkEsR0FBeEJBLFVBQXlCQSxXQUFzQkE7UUFDN0NRLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLFdBQVdBLEVBQUVBLFVBQUNBLENBQUNBLElBQU1BLENBQUNBLENBQUNBLENBQUNBO0lBQzVFQSxDQUFDQTtJQUVNUix3QkFBU0EsR0FBaEJBLFVBQWlCQSxHQUFRQSxJQUFhUyxNQUFNQSxDQUFDQSxHQUFHQSxZQUFZQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUUvRFQsd0JBQVNBLEdBQWhCQSxjQUE2Q1UsTUFBTUEsQ0FBQ0EsSUFBSUEsZ0JBQWdCQSxFQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNsRlYscUJBQUNBO0FBQURBLENBQUNBLEFBdkNELElBdUNDO0FBdkNZLHNCQUFjLGlCQXVDMUIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGNsYXNzIFByb21pc2VDb21wbGV0ZXI8Uj4ge1xuICBwcm9taXNlOiBQcm9taXNlPFI+O1xuICByZXNvbHZlOiAodmFsdWU/OiBSIHwgUHJvbWlzZUxpa2U8Uj4pID0+IHZvaWQ7XG4gIHJlamVjdDogKGVycm9yPzogYW55LCBzdGFja1RyYWNlPzogc3RyaW5nKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgdGhpcy5yZXNvbHZlID0gcmVzO1xuICAgICAgdGhpcy5yZWplY3QgPSByZWo7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFByb21pc2VXcmFwcGVyIHtcbiAgc3RhdGljIHJlc29sdmU8VD4ob2JqOiBUKTogUHJvbWlzZTxUPiB7IHJldHVybiBQcm9taXNlLnJlc29sdmUob2JqKTsgfVxuXG4gIHN0YXRpYyByZWplY3Qob2JqOiBhbnksIF8pOiBQcm9taXNlPGFueT4geyByZXR1cm4gUHJvbWlzZS5yZWplY3Qob2JqKTsgfVxuXG4gIC8vIE5vdGU6IFdlIGNhbid0IHJlbmFtZSB0aGlzIG1ldGhvZCBpbnRvIGBjYXRjaGAsIGFzIHRoaXMgaXMgbm90IGEgdmFsaWRcbiAgLy8gbWV0aG9kIG5hbWUgaW4gRGFydC5cbiAgc3RhdGljIGNhdGNoRXJyb3I8VD4ocHJvbWlzZTogUHJvbWlzZTxUPixcbiAgICAgICAgICAgICAgICAgICAgICAgb25FcnJvcjogKGVycm9yOiBhbnkpID0+IFQgfCBQcm9taXNlTGlrZTxUPik6IFByb21pc2U8VD4ge1xuICAgIHJldHVybiBwcm9taXNlLmNhdGNoKG9uRXJyb3IpO1xuICB9XG5cbiAgc3RhdGljIGFsbDxUPihwcm9taXNlczogKFQgfCBQcm9taXNlPFQ+KVtdKTogUHJvbWlzZTxUW10+IHtcbiAgICBpZiAocHJvbWlzZXMubGVuZ3RoID09IDApIHJldHVybiBQcm9taXNlLnJlc29sdmUoW10pO1xuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gIH1cblxuICBzdGF0aWMgdGhlbjxULCBVPihwcm9taXNlOiBQcm9taXNlPFQ+LCBzdWNjZXNzOiAodmFsdWU6IFQpID0+IFUgfCBQcm9taXNlTGlrZTxVPixcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0aW9uPzogKGVycm9yOiBhbnksIHN0YWNrPzogYW55KSA9PiBVIHwgUHJvbWlzZUxpa2U8VT4pOiBQcm9taXNlPFU+IHtcbiAgICByZXR1cm4gcHJvbWlzZS50aGVuKHN1Y2Nlc3MsIHJlamVjdGlvbik7XG4gIH1cblxuICBzdGF0aWMgd3JhcDxUPihjb21wdXRhdGlvbjogKCkgPT4gVCk6IFByb21pc2U8VD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcyhjb21wdXRhdGlvbigpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVqKGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHNjaGVkdWxlTWljcm90YXNrKGNvbXB1dGF0aW9uOiAoKSA9PiBhbnkpOiB2b2lkIHtcbiAgICBQcm9taXNlV3JhcHBlci50aGVuKFByb21pc2VXcmFwcGVyLnJlc29sdmUobnVsbCksIGNvbXB1dGF0aW9uLCAoXykgPT4ge30pO1xuICB9XG5cbiAgc3RhdGljIGlzUHJvbWlzZShvYmo6IGFueSk6IGJvb2xlYW4geyByZXR1cm4gb2JqIGluc3RhbmNlb2YgUHJvbWlzZTsgfVxuXG4gIHN0YXRpYyBjb21wbGV0ZXI8VD4oKTogUHJvbWlzZUNvbXBsZXRlcjxUPiB7IHJldHVybiBuZXcgUHJvbWlzZUNvbXBsZXRlcjxUPigpOyB9XG59XG4iXX0=