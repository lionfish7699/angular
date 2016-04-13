'use strict';var lang_1 = require('angular2/src/facade/lang');
var di_1 = require('angular2/src/core/di');
var dom_adapter_1 = require('angular2/src/platform/dom/dom_adapter');
var debug_node_1 = require('angular2/src/core/debug/debug_node');
var dom_renderer_1 = require('angular2/src/platform/dom/dom_renderer');
var core_1 = require('angular2/core');
var debug_renderer_1 = require('angular2/src/core/debug/debug_renderer');
var CORE_TOKENS = lang_1.CONST_EXPR({ 'ApplicationRef': core_1.ApplicationRef, 'NgZone': core_1.NgZone });
var INSPECT_GLOBAL_NAME = 'ng.probe';
var CORE_TOKENS_GLOBAL_NAME = 'ng.coreTokens';
/**
 * Returns a {@link DebugElement} for the given native DOM element, or
 * null if the given native element does not have an Angular view associated
 * with it.
 */
function inspectNativeElement(element) {
    return debug_node_1.getDebugNode(element);
}
exports.inspectNativeElement = inspectNativeElement;
function _createConditionalRootRenderer(rootRenderer) {
    if (lang_1.assertionsEnabled()) {
        return _createRootRenderer(rootRenderer);
    }
    return rootRenderer;
}
function _createRootRenderer(rootRenderer) {
    dom_adapter_1.DOM.setGlobalVar(INSPECT_GLOBAL_NAME, inspectNativeElement);
    dom_adapter_1.DOM.setGlobalVar(CORE_TOKENS_GLOBAL_NAME, CORE_TOKENS);
    return new debug_renderer_1.DebugDomRootRenderer(rootRenderer);
}
/**
 * Providers which support debugging Angular applications (e.g. via `ng.probe`).
 */
exports.ELEMENT_PROBE_PROVIDERS = lang_1.CONST_EXPR([
    new di_1.Provider(core_1.RootRenderer, { useFactory: _createConditionalRootRenderer, deps: [dom_renderer_1.DomRootRenderer] })
]);
exports.ELEMENT_PROBE_PROVIDERS_PROD_MODE = lang_1.CONST_EXPR([new di_1.Provider(core_1.RootRenderer, { useFactory: _createRootRenderer, deps: [dom_renderer_1.DomRootRenderer] })]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfcHJvYmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLVFQSXR4dFhaLnRtcC9hbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RlYnVnL25nX3Byb2JlLnRzIl0sIm5hbWVzIjpbImluc3BlY3ROYXRpdmVFbGVtZW50IiwiX2NyZWF0ZUNvbmRpdGlvbmFsUm9vdFJlbmRlcmVyIiwiX2NyZWF0ZVJvb3RSZW5kZXJlciJdLCJtYXBwaW5ncyI6IkFBQUEscUJBQXVELDBCQUEwQixDQUFDLENBQUE7QUFDbEYsbUJBQTRDLHNCQUFzQixDQUFDLENBQUE7QUFDbkUsNEJBQWtCLHVDQUF1QyxDQUFDLENBQUE7QUFDMUQsMkJBQXNDLG9DQUFvQyxDQUFDLENBQUE7QUFDM0UsNkJBQThCLHdDQUF3QyxDQUFDLENBQUE7QUFDdkUscUJBQW1ELGVBQWUsQ0FBQyxDQUFBO0FBQ25FLCtCQUFtQyx3Q0FBd0MsQ0FBQyxDQUFBO0FBRTVFLElBQU0sV0FBVyxHQUFHLGlCQUFVLENBQUMsRUFBQyxnQkFBZ0IsRUFBRSxxQkFBYyxFQUFFLFFBQVEsRUFBRSxhQUFNLEVBQUMsQ0FBQyxDQUFDO0FBRXJGLElBQU0sbUJBQW1CLEdBQUcsVUFBVSxDQUFDO0FBQ3ZDLElBQU0sdUJBQXVCLEdBQUcsZUFBZSxDQUFDO0FBRWhEOzs7O0dBSUc7QUFDSCw4QkFBcUMsT0FBTztJQUMxQ0EsTUFBTUEsQ0FBQ0EseUJBQVlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO0FBQy9CQSxDQUFDQTtBQUZlLDRCQUFvQix1QkFFbkMsQ0FBQTtBQUVELHdDQUF3QyxZQUFZO0lBQ2xEQyxFQUFFQSxDQUFDQSxDQUFDQSx3QkFBaUJBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1FBQ3hCQSxNQUFNQSxDQUFDQSxtQkFBbUJBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO0lBQzNDQSxDQUFDQTtJQUNEQSxNQUFNQSxDQUFDQSxZQUFZQSxDQUFDQTtBQUN0QkEsQ0FBQ0E7QUFFRCw2QkFBNkIsWUFBWTtJQUN2Q0MsaUJBQUdBLENBQUNBLFlBQVlBLENBQUNBLG1CQUFtQkEsRUFBRUEsb0JBQW9CQSxDQUFDQSxDQUFDQTtJQUM1REEsaUJBQUdBLENBQUNBLFlBQVlBLENBQUNBLHVCQUF1QkEsRUFBRUEsV0FBV0EsQ0FBQ0EsQ0FBQ0E7SUFDdkRBLE1BQU1BLENBQUNBLElBQUlBLHFDQUFvQkEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0E7QUFDaERBLENBQUNBO0FBRUQ7O0dBRUc7QUFDVSwrQkFBdUIsR0FBVSxpQkFBVSxDQUFDO0lBQ3ZELElBQUksYUFBUSxDQUFDLG1CQUFZLEVBQ1osRUFBQyxVQUFVLEVBQUUsOEJBQThCLEVBQUUsSUFBSSxFQUFFLENBQUMsOEJBQWUsQ0FBQyxFQUFDLENBQUM7Q0FDcEYsQ0FBQyxDQUFDO0FBRVUseUNBQWlDLEdBQVUsaUJBQVUsQ0FDOUQsQ0FBQyxJQUFJLGFBQVEsQ0FBQyxtQkFBWSxFQUFFLEVBQUMsVUFBVSxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxDQUFDLDhCQUFlLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDT05TVF9FWFBSLCBhc3NlcnRpb25zRW5hYmxlZCwgaXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtJbmplY3RhYmxlLCBwcm92aWRlLCBQcm92aWRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtET019IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZG9tX2FkYXB0ZXInO1xuaW1wb3J0IHtEZWJ1Z05vZGUsIGdldERlYnVnTm9kZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGVidWcvZGVidWdfbm9kZSc7XG5pbXBvcnQge0RvbVJvb3RSZW5kZXJlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fcmVuZGVyZXInO1xuaW1wb3J0IHtSb290UmVuZGVyZXIsIE5nWm9uZSwgQXBwbGljYXRpb25SZWZ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtEZWJ1Z0RvbVJvb3RSZW5kZXJlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGVidWcvZGVidWdfcmVuZGVyZXInO1xuXG5jb25zdCBDT1JFX1RPS0VOUyA9IENPTlNUX0VYUFIoeydBcHBsaWNhdGlvblJlZic6IEFwcGxpY2F0aW9uUmVmLCAnTmdab25lJzogTmdab25lfSk7XG5cbmNvbnN0IElOU1BFQ1RfR0xPQkFMX05BTUUgPSAnbmcucHJvYmUnO1xuY29uc3QgQ09SRV9UT0tFTlNfR0xPQkFMX05BTUUgPSAnbmcuY29yZVRva2Vucyc7XG5cbi8qKlxuICogUmV0dXJucyBhIHtAbGluayBEZWJ1Z0VsZW1lbnR9IGZvciB0aGUgZ2l2ZW4gbmF0aXZlIERPTSBlbGVtZW50LCBvclxuICogbnVsbCBpZiB0aGUgZ2l2ZW4gbmF0aXZlIGVsZW1lbnQgZG9lcyBub3QgaGF2ZSBhbiBBbmd1bGFyIHZpZXcgYXNzb2NpYXRlZFxuICogd2l0aCBpdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluc3BlY3ROYXRpdmVFbGVtZW50KGVsZW1lbnQpOiBEZWJ1Z05vZGUge1xuICByZXR1cm4gZ2V0RGVidWdOb2RlKGVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ29uZGl0aW9uYWxSb290UmVuZGVyZXIocm9vdFJlbmRlcmVyKSB7XG4gIGlmIChhc3NlcnRpb25zRW5hYmxlZCgpKSB7XG4gICAgcmV0dXJuIF9jcmVhdGVSb290UmVuZGVyZXIocm9vdFJlbmRlcmVyKTtcbiAgfVxuICByZXR1cm4gcm9vdFJlbmRlcmVyO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlUm9vdFJlbmRlcmVyKHJvb3RSZW5kZXJlcikge1xuICBET00uc2V0R2xvYmFsVmFyKElOU1BFQ1RfR0xPQkFMX05BTUUsIGluc3BlY3ROYXRpdmVFbGVtZW50KTtcbiAgRE9NLnNldEdsb2JhbFZhcihDT1JFX1RPS0VOU19HTE9CQUxfTkFNRSwgQ09SRV9UT0tFTlMpO1xuICByZXR1cm4gbmV3IERlYnVnRG9tUm9vdFJlbmRlcmVyKHJvb3RSZW5kZXJlcik7XG59XG5cbi8qKlxuICogUHJvdmlkZXJzIHdoaWNoIHN1cHBvcnQgZGVidWdnaW5nIEFuZ3VsYXIgYXBwbGljYXRpb25zIChlLmcuIHZpYSBgbmcucHJvYmVgKS5cbiAqL1xuZXhwb3J0IGNvbnN0IEVMRU1FTlRfUFJPQkVfUFJPVklERVJTOiBhbnlbXSA9IENPTlNUX0VYUFIoW1xuICBuZXcgUHJvdmlkZXIoUm9vdFJlbmRlcmVyLFxuICAgICAgICAgICAgICAge3VzZUZhY3Rvcnk6IF9jcmVhdGVDb25kaXRpb25hbFJvb3RSZW5kZXJlciwgZGVwczogW0RvbVJvb3RSZW5kZXJlcl19KVxuXSk7XG5cbmV4cG9ydCBjb25zdCBFTEVNRU5UX1BST0JFX1BST1ZJREVSU19QUk9EX01PREU6IGFueVtdID0gQ09OU1RfRVhQUihcbiAgICBbbmV3IFByb3ZpZGVyKFJvb3RSZW5kZXJlciwge3VzZUZhY3Rvcnk6IF9jcmVhdGVSb290UmVuZGVyZXIsIGRlcHM6IFtEb21Sb290UmVuZGVyZXJdfSldKTtcbiJdfQ==