import { XHR } from 'angular2/src/compiler/xhr';
import { WebWorkerXHRImpl } from 'angular2/src/web_workers/worker/xhr_impl';
import { WebWorkerRootRenderer } from 'angular2/src/web_workers/worker/renderer';
import { print, CONST_EXPR } from 'angular2/src/facade/lang';
import { RootRenderer } from 'angular2/src/core/render/api';
import { PLATFORM_DIRECTIVES, PLATFORM_PIPES, ExceptionHandler, APPLICATION_COMMON_PROVIDERS, PLATFORM_COMMON_PROVIDERS } from 'angular2/core';
import { COMMON_DIRECTIVES, COMMON_PIPES, FORM_PROVIDERS } from "angular2/common";
import { ClientMessageBrokerFactory, ClientMessageBrokerFactory_ } from 'angular2/src/web_workers/shared/client_message_broker';
import { ServiceMessageBrokerFactory, ServiceMessageBrokerFactory_ } from 'angular2/src/web_workers/shared/service_message_broker';
import { Serializer } from "angular2/src/web_workers/shared/serializer";
import { ON_WEB_WORKER } from "angular2/src/web_workers/shared/api";
import { Provider } from 'angular2/src/core/di';
import { RenderStore } from 'angular2/src/web_workers/shared/render_store';
class PrintLogger {
    constructor() {
        this.log = print;
        this.logError = print;
        this.logGroup = print;
    }
    logGroupEnd() { }
}
export const WORKER_APP_PLATFORM = CONST_EXPR([PLATFORM_COMMON_PROVIDERS]);
export const WORKER_APP_APPLICATION_COMMON = CONST_EXPR([
    APPLICATION_COMMON_PROVIDERS,
    FORM_PROVIDERS,
    Serializer,
    new Provider(PLATFORM_PIPES, { useValue: COMMON_PIPES, multi: true }),
    new Provider(PLATFORM_DIRECTIVES, { useValue: COMMON_DIRECTIVES, multi: true }),
    new Provider(ClientMessageBrokerFactory, { useClass: ClientMessageBrokerFactory_ }),
    new Provider(ServiceMessageBrokerFactory, { useClass: ServiceMessageBrokerFactory_ }),
    WebWorkerRootRenderer,
    new Provider(RootRenderer, { useExisting: WebWorkerRootRenderer }),
    new Provider(ON_WEB_WORKER, { useValue: true }),
    RenderStore,
    new Provider(ExceptionHandler, { useFactory: _exceptionHandler, deps: [] }),
    WebWorkerXHRImpl,
    new Provider(XHR, { useExisting: WebWorkerXHRImpl })
]);
function _exceptionHandler() {
    return new ExceptionHandler(new PrintLogger());
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FwcF9jb21tb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLUxrOW5SSk9zLnRtcC9hbmd1bGFyMi9zcmMvcGxhdGZvcm0vd29ya2VyX2FwcF9jb21tb24udHMiXSwibmFtZXMiOlsiUHJpbnRMb2dnZXIiLCJQcmludExvZ2dlci5jb25zdHJ1Y3RvciIsIlByaW50TG9nZ2VyLmxvZ0dyb3VwRW5kIiwiX2V4Y2VwdGlvbkhhbmRsZXIiXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sMkJBQTJCO09BQ3RDLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSwwQ0FBMEM7T0FDbEUsRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDBDQUEwQztPQUN2RSxFQUFDLEtBQUssRUFBUSxVQUFVLEVBQVksTUFBTSwwQkFBMEI7T0FDcEUsRUFBQyxZQUFZLEVBQUMsTUFBTSw4QkFBOEI7T0FDbEQsRUFDTCxtQkFBbUIsRUFDbkIsY0FBYyxFQUNkLGdCQUFnQixFQUNoQiw0QkFBNEIsRUFDNUIseUJBQXlCLEVBQzFCLE1BQU0sZUFBZTtPQUNmLEVBQUMsaUJBQWlCLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBQyxNQUFNLGlCQUFpQjtPQUN4RSxFQUNMLDBCQUEwQixFQUMxQiwyQkFBMkIsRUFDNUIsTUFBTSx1REFBdUQ7T0FDdkQsRUFDTCwyQkFBMkIsRUFDM0IsNEJBQTRCLEVBQzdCLE1BQU0sd0RBQXdEO09BQ3hELEVBQUMsVUFBVSxFQUFDLE1BQU0sNENBQTRDO09BQzlELEVBQUMsYUFBYSxFQUFDLE1BQU0scUNBQXFDO09BQzFELEVBQUMsUUFBUSxFQUFDLE1BQU0sc0JBQXNCO09BQ3RDLEVBQUMsV0FBVyxFQUFDLE1BQU0sOENBQThDO0FBRXhFO0lBQUFBO1FBQ0VDLFFBQUdBLEdBQUdBLEtBQUtBLENBQUNBO1FBQ1pBLGFBQVFBLEdBQUdBLEtBQUtBLENBQUNBO1FBQ2pCQSxhQUFRQSxHQUFHQSxLQUFLQSxDQUFDQTtJQUVuQkEsQ0FBQ0E7SUFEQ0QsV0FBV0EsS0FBSUUsQ0FBQ0E7QUFDbEJGLENBQUNBO0FBRUQsYUFBYSxtQkFBbUIsR0FDNUIsVUFBVSxDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDO0FBRTVDLGFBQWEsNkJBQTZCLEdBQTJDLFVBQVUsQ0FBQztJQUM5Riw0QkFBNEI7SUFDNUIsY0FBYztJQUNkLFVBQVU7SUFDVixJQUFJLFFBQVEsQ0FBQyxjQUFjLEVBQUUsRUFBQyxRQUFRLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUNuRSxJQUFJLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxFQUFDLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFDN0UsSUFBSSxRQUFRLENBQUMsMEJBQTBCLEVBQUUsRUFBQyxRQUFRLEVBQUUsMkJBQTJCLEVBQUMsQ0FBQztJQUNqRixJQUFJLFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxFQUFDLFFBQVEsRUFBRSw0QkFBNEIsRUFBQyxDQUFDO0lBQ25GLHFCQUFxQjtJQUNyQixJQUFJLFFBQVEsQ0FBQyxZQUFZLEVBQUUsRUFBQyxXQUFXLEVBQUUscUJBQXFCLEVBQUMsQ0FBQztJQUNoRSxJQUFJLFFBQVEsQ0FBQyxhQUFhLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFDN0MsV0FBVztJQUNYLElBQUksUUFBUSxDQUFDLGdCQUFnQixFQUFFLEVBQUMsVUFBVSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQztJQUN6RSxnQkFBZ0I7SUFDaEIsSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUMsV0FBVyxFQUFFLGdCQUFnQixFQUFDLENBQUM7Q0FDbkQsQ0FBQyxDQUFDO0FBRUg7SUFDRUcsTUFBTUEsQ0FBQ0EsSUFBSUEsZ0JBQWdCQSxDQUFDQSxJQUFJQSxXQUFXQSxFQUFFQSxDQUFDQSxDQUFDQTtBQUNqREEsQ0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1hIUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3hocic7XG5pbXBvcnQge1dlYldvcmtlclhIUkltcGx9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy93b3JrZXIveGhyX2ltcGwnO1xuaW1wb3J0IHtXZWJXb3JrZXJSb290UmVuZGVyZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy93b3JrZXIvcmVuZGVyZXInO1xuaW1wb3J0IHtwcmludCwgVHlwZSwgQ09OU1RfRVhQUiwgaXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtSb290UmVuZGVyZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlbmRlci9hcGknO1xuaW1wb3J0IHtcbiAgUExBVEZPUk1fRElSRUNUSVZFUyxcbiAgUExBVEZPUk1fUElQRVMsXG4gIEV4Y2VwdGlvbkhhbmRsZXIsXG4gIEFQUExJQ0FUSU9OX0NPTU1PTl9QUk9WSURFUlMsXG4gIFBMQVRGT1JNX0NPTU1PTl9QUk9WSURFUlMsXG59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtDT01NT05fRElSRUNUSVZFUywgQ09NTU9OX1BJUEVTLCBGT1JNX1BST1ZJREVSU30gZnJvbSBcImFuZ3VsYXIyL2NvbW1vblwiO1xuaW1wb3J0IHtcbiAgQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksXG4gIENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5X1xufSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL2NsaWVudF9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge1xuICBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksXG4gIFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeV9cbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJ2aWNlX21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7U2VyaWFsaXplcn0gZnJvbSBcImFuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VyaWFsaXplclwiO1xuaW1wb3J0IHtPTl9XRUJfV09SS0VSfSBmcm9tIFwiYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9hcGlcIjtcbmltcG9ydCB7UHJvdmlkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7UmVuZGVyU3RvcmV9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3N0b3JlJztcblxuY2xhc3MgUHJpbnRMb2dnZXIge1xuICBsb2cgPSBwcmludDtcbiAgbG9nRXJyb3IgPSBwcmludDtcbiAgbG9nR3JvdXAgPSBwcmludDtcbiAgbG9nR3JvdXBFbmQoKSB7fVxufVxuXG5leHBvcnQgY29uc3QgV09SS0VSX0FQUF9QTEFURk9STTogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPVxuICAgIENPTlNUX0VYUFIoW1BMQVRGT1JNX0NPTU1PTl9QUk9WSURFUlNdKTtcblxuZXhwb3J0IGNvbnN0IFdPUktFUl9BUFBfQVBQTElDQVRJT05fQ09NTU9OOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9IENPTlNUX0VYUFIoW1xuICBBUFBMSUNBVElPTl9DT01NT05fUFJPVklERVJTLFxuICBGT1JNX1BST1ZJREVSUyxcbiAgU2VyaWFsaXplcixcbiAgbmV3IFByb3ZpZGVyKFBMQVRGT1JNX1BJUEVTLCB7dXNlVmFsdWU6IENPTU1PTl9QSVBFUywgbXVsdGk6IHRydWV9KSxcbiAgbmV3IFByb3ZpZGVyKFBMQVRGT1JNX0RJUkVDVElWRVMsIHt1c2VWYWx1ZTogQ09NTU9OX0RJUkVDVElWRVMsIG11bHRpOiB0cnVlfSksXG4gIG5ldyBQcm92aWRlcihDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSwge3VzZUNsYXNzOiBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeV99KSxcbiAgbmV3IFByb3ZpZGVyKFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSwge3VzZUNsYXNzOiBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnlffSksXG4gIFdlYldvcmtlclJvb3RSZW5kZXJlcixcbiAgbmV3IFByb3ZpZGVyKFJvb3RSZW5kZXJlciwge3VzZUV4aXN0aW5nOiBXZWJXb3JrZXJSb290UmVuZGVyZXJ9KSxcbiAgbmV3IFByb3ZpZGVyKE9OX1dFQl9XT1JLRVIsIHt1c2VWYWx1ZTogdHJ1ZX0pLFxuICBSZW5kZXJTdG9yZSxcbiAgbmV3IFByb3ZpZGVyKEV4Y2VwdGlvbkhhbmRsZXIsIHt1c2VGYWN0b3J5OiBfZXhjZXB0aW9uSGFuZGxlciwgZGVwczogW119KSxcbiAgV2ViV29ya2VyWEhSSW1wbCxcbiAgbmV3IFByb3ZpZGVyKFhIUiwge3VzZUV4aXN0aW5nOiBXZWJXb3JrZXJYSFJJbXBsfSlcbl0pO1xuXG5mdW5jdGlvbiBfZXhjZXB0aW9uSGFuZGxlcigpOiBFeGNlcHRpb25IYW5kbGVyIHtcbiAgcmV0dXJuIG5ldyBFeGNlcHRpb25IYW5kbGVyKG5ldyBQcmludExvZ2dlcigpKTtcbn1cbiJdfQ==