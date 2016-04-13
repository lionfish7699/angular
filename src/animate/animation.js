'use strict';var lang_1 = require('angular2/src/facade/lang');
var math_1 = require('angular2/src/facade/math');
var util_1 = require('angular2/src/platform/dom/util');
var collection_1 = require('angular2/src/facade/collection');
var dom_adapter_1 = require('angular2/src/platform/dom/dom_adapter');
var Animation = (function () {
    /**
     * Stores the start time and starts the animation
     * @param element
     * @param data
     * @param browserDetails
     */
    function Animation(element, data, browserDetails) {
        var _this = this;
        this.element = element;
        this.data = data;
        this.browserDetails = browserDetails;
        /** functions to be called upon completion */
        this.callbacks = [];
        /** functions for removing event listeners */
        this.eventClearFunctions = [];
        /** flag used to track whether or not the animation has finished */
        this.completed = false;
        this._stringPrefix = '';
        this.startTime = lang_1.DateWrapper.toMillis(lang_1.DateWrapper.now());
        this._stringPrefix = dom_adapter_1.DOM.getAnimationPrefix();
        this.setup();
        this.wait(function (timestamp) { return _this.start(); });
    }
    Object.defineProperty(Animation.prototype, "totalTime", {
        /** total amount of time that the animation should take including delay */
        get: function () {
            var delay = this.computedDelay != null ? this.computedDelay : 0;
            var duration = this.computedDuration != null ? this.computedDuration : 0;
            return delay + duration;
        },
        enumerable: true,
        configurable: true
    });
    Animation.prototype.wait = function (callback) {
        // Firefox requires 2 frames for some reason
        this.browserDetails.raf(callback, 2);
    };
    /**
     * Sets up the initial styles before the animation is started
     */
    Animation.prototype.setup = function () {
        if (this.data.fromStyles != null)
            this.applyStyles(this.data.fromStyles);
        if (this.data.duration != null)
            this.applyStyles({ 'transitionDuration': this.data.duration.toString() + 'ms' });
        if (this.data.delay != null)
            this.applyStyles({ 'transitionDelay': this.data.delay.toString() + 'ms' });
    };
    /**
     * After the initial setup has occurred, this method adds the animation styles
     */
    Animation.prototype.start = function () {
        this.addClasses(this.data.classesToAdd);
        this.addClasses(this.data.animationClasses);
        this.removeClasses(this.data.classesToRemove);
        if (this.data.toStyles != null)
            this.applyStyles(this.data.toStyles);
        var computedStyles = dom_adapter_1.DOM.getComputedStyle(this.element);
        this.computedDelay =
            math_1.Math.max(this.parseDurationString(computedStyles.getPropertyValue(this._stringPrefix + 'transition-delay')), this.parseDurationString(this.element.style.getPropertyValue(this._stringPrefix + 'transition-delay')));
        this.computedDuration = math_1.Math.max(this.parseDurationString(computedStyles.getPropertyValue(this._stringPrefix + 'transition-duration')), this.parseDurationString(this.element.style.getPropertyValue(this._stringPrefix + 'transition-duration')));
        this.addEvents();
    };
    /**
     * Applies the provided styles to the element
     * @param styles
     */
    Animation.prototype.applyStyles = function (styles) {
        var _this = this;
        collection_1.StringMapWrapper.forEach(styles, function (value, key) {
            var dashCaseKey = util_1.camelCaseToDashCase(key);
            if (lang_1.isPresent(dom_adapter_1.DOM.getStyle(_this.element, dashCaseKey))) {
                dom_adapter_1.DOM.setStyle(_this.element, dashCaseKey, value.toString());
            }
            else {
                dom_adapter_1.DOM.setStyle(_this.element, _this._stringPrefix + dashCaseKey, value.toString());
            }
        });
    };
    /**
     * Adds the provided classes to the element
     * @param classes
     */
    Animation.prototype.addClasses = function (classes) {
        for (var i = 0, len = classes.length; i < len; i++)
            dom_adapter_1.DOM.addClass(this.element, classes[i]);
    };
    /**
     * Removes the provided classes from the element
     * @param classes
     */
    Animation.prototype.removeClasses = function (classes) {
        for (var i = 0, len = classes.length; i < len; i++)
            dom_adapter_1.DOM.removeClass(this.element, classes[i]);
    };
    /**
     * Adds events to track when animations have finished
     */
    Animation.prototype.addEvents = function () {
        var _this = this;
        if (this.totalTime > 0) {
            this.eventClearFunctions.push(dom_adapter_1.DOM.onAndCancel(this.element, dom_adapter_1.DOM.getTransitionEnd(), function (event) { return _this.handleAnimationEvent(event); }));
        }
        else {
            this.handleAnimationCompleted();
        }
    };
    Animation.prototype.handleAnimationEvent = function (event) {
        var elapsedTime = math_1.Math.round(event.elapsedTime * 1000);
        if (!this.browserDetails.elapsedTimeIncludesDelay)
            elapsedTime += this.computedDelay;
        event.stopPropagation();
        if (elapsedTime >= this.totalTime)
            this.handleAnimationCompleted();
    };
    /**
     * Runs all animation callbacks and removes temporary classes
     */
    Animation.prototype.handleAnimationCompleted = function () {
        this.removeClasses(this.data.animationClasses);
        this.callbacks.forEach(function (callback) { return callback(); });
        this.callbacks = [];
        this.eventClearFunctions.forEach(function (fn) { return fn(); });
        this.eventClearFunctions = [];
        this.completed = true;
    };
    /**
     * Adds animation callbacks to be called upon completion
     * @param callback
     * @returns {Animation}
     */
    Animation.prototype.onComplete = function (callback) {
        if (this.completed) {
            callback();
        }
        else {
            this.callbacks.push(callback);
        }
        return this;
    };
    /**
     * Converts the duration string to the number of milliseconds
     * @param duration
     * @returns {number}
     */
    Animation.prototype.parseDurationString = function (duration) {
        var maxValue = 0;
        // duration must have at least 2 characters to be valid. (number + type)
        if (duration == null || duration.length < 2) {
            return maxValue;
        }
        else if (duration.substring(duration.length - 2) == 'ms') {
            var value = lang_1.NumberWrapper.parseInt(this.stripLetters(duration), 10);
            if (value > maxValue)
                maxValue = value;
        }
        else if (duration.substring(duration.length - 1) == 's') {
            var ms = lang_1.NumberWrapper.parseFloat(this.stripLetters(duration)) * 1000;
            var value = math_1.Math.floor(ms);
            if (value > maxValue)
                maxValue = value;
        }
        return maxValue;
    };
    /**
     * Strips the letters from the duration string
     * @param str
     * @returns {string}
     */
    Animation.prototype.stripLetters = function (str) {
        return lang_1.StringWrapper.replaceAll(str, lang_1.RegExpWrapper.create('[^0-9]+$', ''), '');
    };
    return Animation;
})();
exports.Animation = Animation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1RUEl0eHRYWi50bXAvYW5ndWxhcjIvc3JjL2FuaW1hdGUvYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbIkFuaW1hdGlvbiIsIkFuaW1hdGlvbi5jb25zdHJ1Y3RvciIsIkFuaW1hdGlvbi50b3RhbFRpbWUiLCJBbmltYXRpb24ud2FpdCIsIkFuaW1hdGlvbi5zZXR1cCIsIkFuaW1hdGlvbi5zdGFydCIsIkFuaW1hdGlvbi5hcHBseVN0eWxlcyIsIkFuaW1hdGlvbi5hZGRDbGFzc2VzIiwiQW5pbWF0aW9uLnJlbW92ZUNsYXNzZXMiLCJBbmltYXRpb24uYWRkRXZlbnRzIiwiQW5pbWF0aW9uLmhhbmRsZUFuaW1hdGlvbkV2ZW50IiwiQW5pbWF0aW9uLmhhbmRsZUFuaW1hdGlvbkNvbXBsZXRlZCIsIkFuaW1hdGlvbi5vbkNvbXBsZXRlIiwiQW5pbWF0aW9uLnBhcnNlRHVyYXRpb25TdHJpbmciLCJBbmltYXRpb24uc3RyaXBMZXR0ZXJzIl0sIm1hcHBpbmdzIjoiQUFBQSxxQkFNTywwQkFBMEIsQ0FBQyxDQUFBO0FBQ2xDLHFCQUFtQiwwQkFBMEIsQ0FBQyxDQUFBO0FBQzlDLHFCQUFrQyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ25FLDJCQUErQixnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ2hFLDRCQUFrQix1Q0FBdUMsQ0FBQyxDQUFBO0FBSzFEO0lBNEJFQTs7Ozs7T0FLR0E7SUFDSEEsbUJBQW1CQSxPQUFvQkEsRUFBU0EsSUFBeUJBLEVBQ3REQSxjQUE4QkE7UUFuQ25EQyxpQkF3TENBO1FBdEpvQkEsWUFBT0EsR0FBUEEsT0FBT0EsQ0FBYUE7UUFBU0EsU0FBSUEsR0FBSkEsSUFBSUEsQ0FBcUJBO1FBQ3REQSxtQkFBY0EsR0FBZEEsY0FBY0EsQ0FBZ0JBO1FBbENqREEsNkNBQTZDQTtRQUM3Q0EsY0FBU0EsR0FBZUEsRUFBRUEsQ0FB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YSxJQUFJQSxRQUFRQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUNqQkEsd0VBQXdFQTtRQUN4RUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsSUFBSUEsSUFBSUEsSUFBSUEsUUFBUUEsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDNUNBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBO1FBQ2xCQSxDQUFDQTtRQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxRQUFRQSxDQUFDQSxTQUFTQSxDQUFDQSxRQUFRQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMzREEsSUFBSUEsS0FBS0EsR0FBR0Esb0JBQWFBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLFFBQVFBLENBQUNBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBO1lBQ3BFQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxRQUFRQSxDQUFDQTtnQkFBQ0EsUUFBUUEsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDekNBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLFFBQVFBLENBQUNBLFNBQVNBLENBQUNBLFFBQVFBLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBQzFEQSxJQUFJQSxFQUFFQSxHQUFHQSxvQkFBYUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7WUFDdEVBLElBQUlBLEtBQUtBLEdBQUdBLFdBQUlBLENBQUNBLEtBQUtBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBQzNCQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxHQUFHQSxRQUFRQSxDQUFDQTtnQkFBQ0EsUUFBUUEsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDekNBLENBQUNBO1FBQ0RBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBO0lBQ2xCQSxDQUFDQTtJQUVEYjs7OztPQUlHQTtJQUNIQSxnQ0FBWUEsR0FBWkEsVUFBYUEsR0FBV0E7UUFDdEJjLE1BQU1BLENBQUNBLG9CQUFhQSxDQUFDQSxVQUFVQSxDQUFDQSxHQUFHQSxFQUFFQSxvQkFBYUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBVUEsRUFBRUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7SUFDakZBLENBQUNBO0lBQ0hkLGdCQUFDQTtBQUFEQSxDQUFDQSxBQXhMRCxJQXdMQztBQXhMWSxpQkFBUyxZQXdMckIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERhdGVXcmFwcGVyLFxuICBTdHJpbmdXcmFwcGVyLFxuICBSZWdFeHBXcmFwcGVyLFxuICBOdW1iZXJXcmFwcGVyLFxuICBpc1ByZXNlbnRcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7TWF0aH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9tYXRoJztcbmltcG9ydCB7Y2FtZWxDYXNlVG9EYXNoQ2FzZX0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS91dGlsJztcbmltcG9ydCB7U3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7RE9NfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9hZGFwdGVyJztcblxuaW1wb3J0IHtCcm93c2VyRGV0YWlsc30gZnJvbSAnLi9icm93c2VyX2RldGFpbHMnO1xuaW1wb3J0IHtDc3NBbmltYXRpb25PcHRpb25zfSBmcm9tICcuL2Nzc19hbmltYXRpb25fb3B0aW9ucyc7XG5cbmV4cG9ydCBjbGFzcyBBbmltYXRpb24ge1xuICAvKiogZnVuY3Rpb25zIHRvIGJlIGNhbGxlZCB1cG9uIGNvbXBsZXRpb24gKi9cbiAgY2FsbGJhY2tzOiBGdW5jdGlvbltdID0gW107XG5cbiAgLyoqIHRoZSBkdXJhdGlvbiAobXMpIG9mIHRoZSBhbmltYXRpb24gKHdoZXRoZXIgZnJvbSBDU1Mgb3IgbWFudWFsbHkgc2V0KSAqL1xuICBjb21wdXRlZER1cmF0aW9uOiBudW1iZXI7XG5cbiAgLyoqIHRoZSBhbmltYXRpb24gZGVsYXkgKG1zKSAod2hldGhlciBmcm9tIENTUyBvciBtYW51YWxseSBzZXQpICovXG4gIGNvbXB1dGVkRGVsYXk6IG51bWJlcjtcblxuICAvKiogdGltZXN0YW1wIG9mIHdoZW4gdGhlIGFuaW1hdGlvbiBzdGFydGVkICovXG4gIHN0YXJ0VGltZTogbnVtYmVyO1xuXG4gIC8qKiBmdW5jdGlvbnMgZm9yIHJlbW92aW5nIGV2ZW50IGxpc3RlbmVycyAqL1xuICBldmVudENsZWFyRnVuY3Rpb25zOiBGdW5jdGlvbltdID0gW107XG5cbiAgLyoqIGZsYWcgdXNlZCB0byB0cmFjayB3aGV0aGVyIG9yIG5vdCB0aGUgYW5pbWF0aW9uIGhhcyBmaW5pc2hlZCAqL1xuICBjb21wbGV0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIF9zdHJpbmdQcmVmaXg6IHN0cmluZyA9ICcnO1xuXG4gIC8qKiB0b3RhbCBhbW91bnQgb2YgdGltZSB0aGF0IHRoZSBhbmltYXRpb24gc2hvdWxkIHRha2UgaW5jbHVkaW5nIGRlbGF5ICovXG4gIGdldCB0b3RhbFRpbWUoKTogbnVtYmVyIHtcbiAgICBsZXQgZGVsYXkgPSB0aGlzLmNvbXB1dGVkRGVsYXkgIT0gbnVsbCA/IHRoaXMuY29tcHV0ZWREZWxheSA6IDA7XG4gICAgbGV0IGR1cmF0aW9uID0gdGhpcy5jb21wdXRlZER1cmF0aW9uICE9IG51bGwgPyB0aGlzLmNvbXB1dGVkRHVyYXRpb24gOiAwO1xuICAgIHJldHVybiBkZWxheSArIGR1cmF0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3JlcyB0aGUgc3RhcnQgdGltZSBhbmQgc3RhcnRzIHRoZSBhbmltYXRpb25cbiAgICogQHBhcmFtIGVsZW1lbnRcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQHBhcmFtIGJyb3dzZXJEZXRhaWxzXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogSFRNTEVsZW1lbnQsIHB1YmxpYyBkYXRhOiBDc3NBbmltYXRpb25PcHRpb25zLFxuICAgICAgICAgICAgICBwdWJsaWMgYnJvd3NlckRldGFpbHM6IEJyb3dzZXJEZXRhaWxzKSB7XG4gICAgdGhpcy5zdGFydFRpbWUgPSBEYXRlV3JhcHBlci50b01pbGxpcyhEYXRlV3JhcHBlci5ub3coKSk7XG4gICAgdGhpcy5fc3RyaW5nUHJlZml4ID0gRE9NLmdldEFuaW1hdGlvblByZWZpeCgpO1xuICAgIHRoaXMuc2V0dXAoKTtcbiAgICB0aGlzLndhaXQoKHRpbWVzdGFtcDogYW55KSA9PiB0aGlzLnN0YXJ0KCkpO1xuICB9XG5cbiAgd2FpdChjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAvLyBGaXJlZm94IHJlcXVpcmVzIDIgZnJhbWVzIGZvciBzb21lIHJlYXNvblxuICAgIHRoaXMuYnJvd3NlckRldGFpbHMucmFmKGNhbGxiYWNrLCAyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHVwIHRoZSBpbml0aWFsIHN0eWxlcyBiZWZvcmUgdGhlIGFuaW1hdGlvbiBpcyBzdGFydGVkXG4gICAqL1xuICBzZXR1cCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kYXRhLmZyb21TdHlsZXMgIT0gbnVsbCkgdGhpcy5hcHBseVN0eWxlcyh0aGlzLmRhdGEuZnJvbVN0eWxlcyk7XG4gICAgaWYgKHRoaXMuZGF0YS5kdXJhdGlvbiAhPSBudWxsKVxuICAgICAgdGhpcy5hcHBseVN0eWxlcyh7J3RyYW5zaXRpb25EdXJhdGlvbic6IHRoaXMuZGF0YS5kdXJhdGlvbi50b1N0cmluZygpICsgJ21zJ30pO1xuICAgIGlmICh0aGlzLmRhdGEuZGVsYXkgIT0gbnVsbClcbiAgICAgIHRoaXMuYXBwbHlTdHlsZXMoeyd0cmFuc2l0aW9uRGVsYXknOiB0aGlzLmRhdGEuZGVsYXkudG9TdHJpbmcoKSArICdtcyd9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZnRlciB0aGUgaW5pdGlhbCBzZXR1cCBoYXMgb2NjdXJyZWQsIHRoaXMgbWV0aG9kIGFkZHMgdGhlIGFuaW1hdGlvbiBzdHlsZXNcbiAgICovXG4gIHN0YXJ0KCk6IHZvaWQge1xuICAgIHRoaXMuYWRkQ2xhc3Nlcyh0aGlzLmRhdGEuY2xhc3Nlc1RvQWRkKTtcbiAgICB0aGlzLmFkZENsYXNzZXModGhpcy5kYXRhLmFuaW1hdGlvbkNsYXNzZXMpO1xuICAgIHRoaXMucmVtb3ZlQ2xhc3Nlcyh0aGlzLmRhdGEuY2xhc3Nlc1RvUmVtb3ZlKTtcbiAgICBpZiAodGhpcy5kYXRhLnRvU3R5bGVzICE9IG51bGwpIHRoaXMuYXBwbHlTdHlsZXModGhpcy5kYXRhLnRvU3R5bGVzKTtcbiAgICB2YXIgY29tcHV0ZWRTdHlsZXMgPSBET00uZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnQpO1xuICAgIHRoaXMuY29tcHV0ZWREZWxheSA9XG4gICAgICAgIE1hdGgubWF4KHRoaXMucGFyc2VEdXJhdGlvblN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgIGNvbXB1dGVkU3R5bGVzLmdldFByb3BlcnR5VmFsdWUodGhpcy5fc3RyaW5nUHJlZml4ICsgJ3RyYW5zaXRpb24tZGVsYXknKSksXG4gICAgICAgICAgICAgICAgIHRoaXMucGFyc2VEdXJhdGlvblN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKHRoaXMuX3N0cmluZ1ByZWZpeCArICd0cmFuc2l0aW9uLWRlbGF5JykpKTtcbiAgICB0aGlzLmNvbXB1dGVkRHVyYXRpb24gPSBNYXRoLm1heCh0aGlzLnBhcnNlRHVyYXRpb25TdHJpbmcoY29tcHV0ZWRTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RyaW5nUHJlZml4ICsgJ3RyYW5zaXRpb24tZHVyYXRpb24nKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJzZUR1cmF0aW9uU3RyaW5nKHRoaXMuZWxlbWVudC5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdHJpbmdQcmVmaXggKyAndHJhbnNpdGlvbi1kdXJhdGlvbicpKSk7XG4gICAgdGhpcy5hZGRFdmVudHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIHRoZSBwcm92aWRlZCBzdHlsZXMgdG8gdGhlIGVsZW1lbnRcbiAgICogQHBhcmFtIHN0eWxlc1xuICAgKi9cbiAgYXBwbHlTdHlsZXMoc3R5bGVzOiB7W2tleTogc3RyaW5nXTogYW55fSk6IHZvaWQge1xuICAgIFN0cmluZ01hcFdyYXBwZXIuZm9yRWFjaChzdHlsZXMsICh2YWx1ZTogYW55LCBrZXk6IHN0cmluZykgPT4ge1xuICAgICAgdmFyIGRhc2hDYXNlS2V5ID0gY2FtZWxDYXNlVG9EYXNoQ2FzZShrZXkpO1xuICAgICAgaWYgKGlzUHJlc2VudChET00uZ2V0U3R5bGUodGhpcy5lbGVtZW50LCBkYXNoQ2FzZUtleSkpKSB7XG4gICAgICAgIERPTS5zZXRTdHlsZSh0aGlzLmVsZW1lbnQsIGRhc2hDYXNlS2V5LCB2YWx1ZS50b1N0cmluZygpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIERPTS5zZXRTdHlsZSh0aGlzLmVsZW1lbnQsIHRoaXMuX3N0cmluZ1ByZWZpeCArIGRhc2hDYXNlS2V5LCB2YWx1ZS50b1N0cmluZygpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSBwcm92aWRlZCBjbGFzc2VzIHRvIHRoZSBlbGVtZW50XG4gICAqIEBwYXJhbSBjbGFzc2VzXG4gICAqL1xuICBhZGRDbGFzc2VzKGNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGNsYXNzZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIERPTS5hZGRDbGFzcyh0aGlzLmVsZW1lbnQsIGNsYXNzZXNbaV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIHByb3ZpZGVkIGNsYXNzZXMgZnJvbSB0aGUgZWxlbWVudFxuICAgKiBAcGFyYW0gY2xhc3Nlc1xuICAgKi9cbiAgcmVtb3ZlQ2xhc3NlcyhjbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBjbGFzc2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSBET00ucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50LCBjbGFzc2VzW2ldKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV2ZW50cyB0byB0cmFjayB3aGVuIGFuaW1hdGlvbnMgaGF2ZSBmaW5pc2hlZFxuICAgKi9cbiAgYWRkRXZlbnRzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRvdGFsVGltZSA+IDApIHtcbiAgICAgIHRoaXMuZXZlbnRDbGVhckZ1bmN0aW9ucy5wdXNoKERPTS5vbkFuZENhbmNlbChcbiAgICAgICAgICB0aGlzLmVsZW1lbnQsIERPTS5nZXRUcmFuc2l0aW9uRW5kKCksIChldmVudDogYW55KSA9PiB0aGlzLmhhbmRsZUFuaW1hdGlvbkV2ZW50KGV2ZW50KSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhhbmRsZUFuaW1hdGlvbkNvbXBsZXRlZCgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUFuaW1hdGlvbkV2ZW50KGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBsZXQgZWxhcHNlZFRpbWUgPSBNYXRoLnJvdW5kKGV2ZW50LmVsYXBzZWRUaW1lICogMTAwMCk7XG4gICAgaWYgKCF0aGlzLmJyb3dzZXJEZXRhaWxzLmVsYXBzZWRUaW1lSW5jbHVkZXNEZWxheSkgZWxhcHNlZFRpbWUgKz0gdGhpcy5jb21wdXRlZERlbGF5O1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmIChlbGFwc2VkVGltZSA+PSB0aGlzLnRvdGFsVGltZSkgdGhpcy5oYW5kbGVBbmltYXRpb25Db21wbGV0ZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSdW5zIGFsbCBhbmltYXRpb24gY2FsbGJhY2tzIGFuZCByZW1vdmVzIHRlbXBvcmFyeSBjbGFzc2VzXG4gICAqL1xuICBoYW5kbGVBbmltYXRpb25Db21wbGV0ZWQoKTogdm9pZCB7XG4gICAgdGhpcy5yZW1vdmVDbGFzc2VzKHRoaXMuZGF0YS5hbmltYXRpb25DbGFzc2VzKTtcbiAgICB0aGlzLmNhbGxiYWNrcy5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKCkpO1xuICAgIHRoaXMuY2FsbGJhY2tzID0gW107XG4gICAgdGhpcy5ldmVudENsZWFyRnVuY3Rpb25zLmZvckVhY2goZm4gPT4gZm4oKSk7XG4gICAgdGhpcy5ldmVudENsZWFyRnVuY3Rpb25zID0gW107XG4gICAgdGhpcy5jb21wbGV0ZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW5pbWF0aW9uIGNhbGxiYWNrcyB0byBiZSBjYWxsZWQgdXBvbiBjb21wbGV0aW9uXG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKiBAcmV0dXJucyB7QW5pbWF0aW9ufVxuICAgKi9cbiAgb25Db21wbGV0ZShjYWxsYmFjazogRnVuY3Rpb24pOiBBbmltYXRpb24ge1xuICAgIGlmICh0aGlzLmNvbXBsZXRlZCkge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIHRoZSBkdXJhdGlvbiBzdHJpbmcgdG8gdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHNcbiAgICogQHBhcmFtIGR1cmF0aW9uXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBwYXJzZUR1cmF0aW9uU3RyaW5nKGR1cmF0aW9uOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIHZhciBtYXhWYWx1ZSA9IDA7XG4gICAgLy8gZHVyYXRpb24gbXVzdCBoYXZlIGF0IGxlYXN0IDIgY2hhcmFjdGVycyB0byBiZSB2YWxpZC4gKG51bWJlciArIHR5cGUpXG4gICAgaWYgKGR1cmF0aW9uID09IG51bGwgfHwgZHVyYXRpb24ubGVuZ3RoIDwgMikge1xuICAgICAgcmV0dXJuIG1heFZhbHVlO1xuICAgIH0gZWxzZSBpZiAoZHVyYXRpb24uc3Vic3RyaW5nKGR1cmF0aW9uLmxlbmd0aCAtIDIpID09ICdtcycpIHtcbiAgICAgIGxldCB2YWx1ZSA9IE51bWJlcldyYXBwZXIucGFyc2VJbnQodGhpcy5zdHJpcExldHRlcnMoZHVyYXRpb24pLCAxMCk7XG4gICAgICBpZiAodmFsdWUgPiBtYXhWYWx1ZSkgbWF4VmFsdWUgPSB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKGR1cmF0aW9uLnN1YnN0cmluZyhkdXJhdGlvbi5sZW5ndGggLSAxKSA9PSAncycpIHtcbiAgICAgIGxldCBtcyA9IE51bWJlcldyYXBwZXIucGFyc2VGbG9hdCh0aGlzLnN0cmlwTGV0dGVycyhkdXJhdGlvbikpICogMTAwMDtcbiAgICAgIGxldCB2YWx1ZSA9IE1hdGguZmxvb3IobXMpO1xuICAgICAgaWYgKHZhbHVlID4gbWF4VmFsdWUpIG1heFZhbHVlID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBtYXhWYWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdHJpcHMgdGhlIGxldHRlcnMgZnJvbSB0aGUgZHVyYXRpb24gc3RyaW5nXG4gICAqIEBwYXJhbSBzdHJcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHN0cmlwTGV0dGVycyhzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbChzdHIsIFJlZ0V4cFdyYXBwZXIuY3JlYXRlKCdbXjAtOV0rJCcsICcnKSwgJycpO1xuICB9XG59XG4iXX0=