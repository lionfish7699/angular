'use strict';var xhr_1 = require('angular2/src/compiler/xhr');
var xhr_impl_1 = require('angular2/src/web_workers/worker/xhr_impl');
var renderer_1 = require('angular2/src/web_workers/worker/renderer');
var lang_1 = require('angular2/src/facade/lang');
var api_1 = require('angular2/src/core/render/api');
var core_1 = require('angular2/core');
var common_1 = require("angular2/common");
var client_message_broker_1 = require('angular2/src/web_workers/shared/client_message_broker');
var service_message_broker_1 = require('angular2/src/web_workers/shared/service_message_broker');
var serializer_1 = require("angular2/src/web_workers/shared/serializer");
var api_2 = require("angular2/src/web_workers/shared/api");
var di_1 = require('angular2/src/core/di');
var render_store_1 = require('angular2/src/web_workers/shared/render_store');
var PrintLogger = (function () {
    function PrintLogger() {
        this.log = lang_1.print;
        this.logError = lang_1.print;
        this.logGroup = lang_1.print;
    }
    PrintLogger.prototype.logGroupEnd = function () { };
    return PrintLogger;
})();
exports.WORKER_APP_PLATFORM = lang_1.CONST_EXPR([core_1.PLATFORM_COMMON_PROVIDERS]);
exports.WORKER_APP_APPLICATION_COMMON = lang_1.CONST_EXPR([
    core_1.APPLICATION_COMMON_PROVIDERS,
    common_1.FORM_PROVIDERS,
    serializer_1.Serializer,
    new di_1.Provider(core_1.PLATFORM_PIPES, { useValue: common_1.COMMON_PIPES, multi: true }),
    new di_1.Provider(core_1.PLATFORM_DIRECTIVES, { useValue: common_1.COMMON_DIRECTIVES, multi: true }),
    new di_1.Provider(client_message_broker_1.ClientMessageBrokerFactory, { useClass: client_message_broker_1.ClientMessageBrokerFactory_ }),
    new di_1.Provider(service_message_broker_1.ServiceMessageBrokerFactory, { useClass: service_message_broker_1.ServiceMessageBrokerFactory_ }),
    renderer_1.WebWorkerRootRenderer,
    new di_1.Provider(api_1.RootRenderer, { useExisting: renderer_1.WebWorkerRootRenderer }),
    new di_1.Provider(api_2.ON_WEB_WORKER, { useValue: true }),
    render_store_1.RenderStore,
    new di_1.Provider(core_1.ExceptionHandler, { useFactory: _exceptionHandler, deps: [] }),
    xhr_impl_1.WebWorkerXHRImpl,
    new di_1.Provider(xhr_1.XHR, { useExisting: xhr_impl_1.WebWorkerXHRImpl })
]);
function _exceptionHandler() {
    return new core_1.ExceptionHandler(new PrintLogger());
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FwcF9jb21tb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLVFQSXR4dFhaLnRtcC9hbmd1bGFyMi9zcmMvcGxhdGZvcm0vd29ya2VyX2FwcF9jb21tb24udHMiXSwibmFtZXMiOlsiUHJpbnRMb2dnZXIiLCJQcmludExvZ2dlci5jb25zdHJ1Y3RvciIsIlByaW50TG9nZ2VyLmxvZ0dyb3VwRW5kIiwiX2V4Y2VwdGlvbkhhbmRsZXIiXSwibWFwcGluZ3MiOiJBQUFBLG9CQUFrQiwyQkFBMkIsQ0FBQyxDQUFBO0FBQzlDLHlCQUErQiwwQ0FBMEMsQ0FBQyxDQUFBO0FBQzFFLHlCQUFvQywwQ0FBMEMsQ0FBQyxDQUFBO0FBQy9FLHFCQUFpRCwwQkFBMEIsQ0FBQyxDQUFBO0FBQzVFLG9CQUEyQiw4QkFBOEIsQ0FBQyxDQUFBO0FBQzFELHFCQU1PLGVBQWUsQ0FBQyxDQUFBO0FBQ3ZCLHVCQUE4RCxpQkFBaUIsQ0FBQyxDQUFBO0FBQ2hGLHNDQUdPLHVEQUF1RCxDQUFDLENBQUE7QUFDL0QsdUNBR08sd0RBQXdELENBQUMsQ0FBQTtBQUNoRSwyQkFBeUIsNENBQTRDLENBQUMsQ0FBQTtBQUN0RSxvQkFBNEIscUNBQXFDLENBQUMsQ0FBQTtBQUNsRSxtQkFBdUIsc0JBQXNCLENBQUMsQ0FBQTtBQUM5Qyw2QkFBMEIsOENBQThDLENBQUMsQ0FBQTtBQUV6RTtJQUFBQTtRQUNFQyxRQUFHQSxHQUFHQSxZQUFLQSxDQUFDQTtRQUNaQSxhQUFRQSxHQUFHQSxZQUFLQSxDQUFDQTtRQUNqQkEsYUFBUUEsR0FBR0EsWUFBS0EsQ0FBQ0E7SUFFbkJBLENBQUNBO0lBRENELGlDQUFXQSxHQUFYQSxjQUFlRSxDQUFDQTtJQUNsQkYsa0JBQUNBO0FBQURBLENBQUNBLEFBTEQsSUFLQztBQUVZLDJCQUFtQixHQUM1QixpQkFBVSxDQUFDLENBQUMsZ0NBQXlCLENBQUMsQ0FBQyxDQUFDO0FBRS9CLHFDQUE2QixHQUEyQyxpQkFBVSxDQUFDO0lBQzlGLG1DQUE0QjtJQUM1Qix1QkFBYztJQUNkLHVCQUFVO0lBQ1YsSUFBSSxhQUFRLENBQUMscUJBQWMsRUFBRSxFQUFDLFFBQVEsRUFBRSxxQkFBWSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUNuRSxJQUFJLGFBQVEsQ0FBQywwQkFBbUIsRUFBRSxFQUFDLFFBQVEsRUFBRSwwQkFBaUIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFDN0UsSUFBSSxhQUFRLENBQUMsa0RBQTBCLEVBQUUsRUFBQyxRQUFRLEVBQUUsbURBQTJCLEVBQUMsQ0FBQztJQUNqRixJQUFJLGFBQVEsQ0FBQyxvREFBMkIsRUFBRSxFQUFDLFFBQVEsRUFBRSxxREFBNEIsRUFBQyxDQUFDO0lBQ25GLGdDQUFxQjtJQUNyQixJQUFJLGFBQVEsQ0FBQyxrQkFBWSxFQUFFLEVBQUMsV0FBVyxFQUFFLGdDQUFxQixFQUFDLENBQUM7SUFDaEUsSUFBSSxhQUFRLENBQUMsbUJBQWEsRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUM3QywwQkFBVztJQUNYLElBQUksYUFBUSxDQUFDLHVCQUFnQixFQUFFLEVBQUMsVUFBVSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQztJQUN6RSwyQkFBZ0I7SUFDaEIsSUFBSSxhQUFRLENBQUMsU0FBRyxFQUFFLEVBQUMsV0FBVyxFQUFFLDJCQUFnQixFQUFDLENBQUM7Q0FDbkQsQ0FBQyxDQUFDO0FBRUg7SUFDRUcsTUFBTUEsQ0FBQ0EsSUFBSUEsdUJBQWdCQSxDQUFDQSxJQUFJQSxXQUFXQSxFQUFFQSxDQUFDQSxDQUFDQTtBQUNqREEsQ0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1hIUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3hocic7XG5pbXBvcnQge1dlYldvcmtlclhIUkltcGx9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy93b3JrZXIveGhyX2ltcGwnO1xuaW1wb3J0IHtXZWJXb3JrZXJSb290UmVuZGVyZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy93b3JrZXIvcmVuZGVyZXInO1xuaW1wb3J0IHtwcmludCwgVHlwZSwgQ09OU1RfRVhQUiwgaXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtSb290UmVuZGVyZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlbmRlci9hcGknO1xuaW1wb3J0IHtcbiAgUExBVEZPUk1fRElSRUNUSVZFUyxcbiAgUExBVEZPUk1fUElQRVMsXG4gIEV4Y2VwdGlvbkhhbmRsZXIsXG4gIEFQUExJQ0FUSU9OX0NPTU1PTl9QUk9WSURFUlMsXG4gIFBMQVRGT1JNX0NPTU1PTl9QUk9WSURFUlMsXG59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtDT01NT05fRElSRUNUSVZFUywgQ09NTU9OX1BJUEVTLCBGT1JNX1BST1ZJREVSU30gZnJvbSBcImFuZ3VsYXIyL2NvbW1vblwiO1xuaW1wb3J0IHtcbiAgQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksXG4gIENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5X1xufSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL2NsaWVudF9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge1xuICBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksXG4gIFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeV9cbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJ2aWNlX21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7U2VyaWFsaXplcn0gZnJvbSBcImFuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VyaWFsaXplclwiO1xuaW1wb3J0IHtPTl9XRUJfV09SS0VSfSBmcm9tIFwiYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9hcGlcIjtcbmltcG9ydCB7UHJvdmlkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7UmVuZGVyU3RvcmV9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3N0b3JlJztcblxuY2xhc3MgUHJpbnRMb2dnZXIge1xuICBsb2cgPSBwcmludDtcbiAgbG9nRXJyb3IgPSBwcmludDtcbiAgbG9nR3JvdXAgPSBwcmludDtcbiAgbG9nR3JvdXBFbmQoKSB7fVxufVxuXG5leHBvcnQgY29uc3QgV09SS0VSX0FQUF9QTEFURk9STTogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPVxuICAgIENPTlNUX0VYUFIoW1BMQVRGT1JNX0NPTU1PTl9QUk9WSURFUlNdKTtcblxuZXhwb3J0IGNvbnN0IFdPUktFUl9BUFBfQVBQTElDQVRJT05fQ09NTU9OOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9IENPTlNUX0VYUFIoW1xuICBBUFBMSUNBVElPTl9DT01NT05fUFJPVklERVJTLFxuICBGT1JNX1BST1ZJREVSUyxcbiAgU2VyaWFsaXplcixcbiAgbmV3IFByb3ZpZGVyKFBMQVRGT1JNX1BJUEVTLCB7dXNlVmFsdWU6IENPTU1PTl9QSVBFUywgbXVsdGk6IHRydWV9KSxcbiAgbmV3IFByb3ZpZGVyKFBMQVRGT1JNX0RJUkVDVElWRVMsIHt1c2VWYWx1ZTogQ09NTU9OX0RJUkVDVElWRVMsIG11bHRpOiB0cnVlfSksXG4gIG5ldyBQcm92aWRlcihDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSwge3VzZUNsYXNzOiBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeV99KSxcbiAgbmV3IFByb3ZpZGVyKFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSwge3VzZUNsYXNzOiBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnlffSksXG4gIFdlYldvcmtlclJvb3RSZW5kZXJlcixcbiAgbmV3IFByb3ZpZGVyKFJvb3RSZW5kZXJlciwge3VzZUV4aXN0aW5nOiBXZWJXb3JrZXJSb290UmVuZGVyZXJ9KSxcbiAgbmV3IFByb3ZpZGVyKE9OX1dFQl9XT1JLRVIsIHt1c2VWYWx1ZTogdHJ1ZX0pLFxuICBSZW5kZXJTdG9yZSxcbiAgbmV3IFByb3ZpZGVyKEV4Y2VwdGlvbkhhbmRsZXIsIHt1c2VGYWN0b3J5OiBfZXhjZXB0aW9uSGFuZGxlciwgZGVwczogW119KSxcbiAgV2ViV29ya2VyWEhSSW1wbCxcbiAgbmV3IFByb3ZpZGVyKFhIUiwge3VzZUV4aXN0aW5nOiBXZWJXb3JrZXJYSFJJbXBsfSlcbl0pO1xuXG5mdW5jdGlvbiBfZXhjZXB0aW9uSGFuZGxlcigpOiBFeGNlcHRpb25IYW5kbGVyIHtcbiAgcmV0dXJuIG5ldyBFeGNlcHRpb25IYW5kbGVyKG5ldyBQcmludExvZ2dlcigpKTtcbn1cbiJdfQ==