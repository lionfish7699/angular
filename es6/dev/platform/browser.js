export { AngularEntrypoint } from 'angular2/src/core/angular_entrypoint';
export { BROWSER_PROVIDERS, CACHED_TEMPLATE_PROVIDER, ELEMENT_PROBE_PROVIDERS, ELEMENT_PROBE_PROVIDERS_PROD_MODE, inspectNativeElement, BrowserDomAdapter, By, Title, DOCUMENT, enableDebugTools, disableDebugTools } from 'angular2/src/platform/browser_common';
import { isPresent, CONST_EXPR } from 'angular2/src/facade/lang';
import { BROWSER_PROVIDERS, BROWSER_APP_COMMON_PROVIDERS } from 'angular2/src/platform/browser_common';
import { COMPILER_PROVIDERS } from 'angular2/compiler';
import { platform, reflector } from 'angular2/core';
import { ReflectionCapabilities } from 'angular2/src/core/reflection/reflection_capabilities';
import { XHRImpl } from "angular2/src/platform/browser/xhr_impl";
import { XHR } from 'angular2/compiler';
import { Provider } from 'angular2/src/core/di';
/**
 * An array of providers that should be passed into `application()` when bootstrapping a component.
 */
export const BROWSER_APP_PROVIDERS = CONST_EXPR([
    BROWSER_APP_COMMON_PROVIDERS,
    COMPILER_PROVIDERS,
    new Provider(XHR, { useClass: XHRImpl }),
]);
/**
 * Bootstrapping for Angular applications.
 *
 * You instantiate an Angular application by explicitly specifying a component to use
 * as the root component for your application via the `bootstrap()` method.
 *
 * ## Simple Example
 *
 * Assuming this `index.html`:
 *
 * ```html
 * <html>
 *   <!-- load Angular script tags here. -->
 *   <body>
 *     <my-app>loading...</my-app>
 *   </body>
 * </html>
 * ```
 *
 * An application is bootstrapped inside an existing browser DOM, typically `index.html`.
 * Unlike Angular 1, Angular 2 does not compile/process providers in `index.html`. This is
 * mainly for security reasons, as well as architectural changes in Angular 2. This means
 * that `index.html` can safely be processed using server-side technologies such as
 * providers. Bindings can thus use double-curly `{{ syntax }}` without collision from
 * Angular 2 component double-curly `{{ syntax }}`.
 *
 * We can use this script code:
 *
 * {@example core/ts/bootstrap/bootstrap.ts region='bootstrap'}
 *
 * When the app developer invokes `bootstrap()` with the root component `MyApp` as its
 * argument, Angular performs the following tasks:
 *
 *  1. It uses the component's `selector` property to locate the DOM element which needs
 *     to be upgraded into the angular component.
 *  2. It creates a new child injector (from the platform injector). Optionally, you can
 *     also override the injector configuration for an app by invoking `bootstrap` with the
 *     `componentInjectableBindings` argument.
 *  3. It creates a new `Zone` and connects it to the angular application's change detection
 *     domain instance.
 *  4. It creates an emulated or shadow DOM on the selected component's host element and loads the
 *     template into it.
 *  5. It instantiates the specified component.
 *  6. Finally, Angular performs change detection to apply the initial data providers for the
 *     application.
 *
 *
 * ## Bootstrapping Multiple Applications
 *
 * When working within a browser window, there are many singleton resources: cookies, title,
 * location, and others. Angular services that represent these resources must likewise be
 * shared across all Angular applications that occupy the same browser window. For this
 * reason, Angular creates exactly one global platform object which stores all shared
 * services, and each angular application injector has the platform injector as its parent.
 *
 * Each application has its own private injector as well. When there are multiple
 * applications on a page, Angular treats each application injector's services as private
 * to that application.
 *
 * ## API
 *
 * - `appComponentType`: The root component which should act as the application. This is
 *   a reference to a `Type` which is annotated with `@Component(...)`.
 * - `customProviders`: An additional set of providers that can be added to the
 *   app injector to override default injection behavior.
 *
 * Returns a `Promise` of {@link ComponentRef}.
 */
export function bootstrap(appComponentType, customProviders) {
    reflector.reflectionCapabilities = new ReflectionCapabilities();
    let appProviders = isPresent(customProviders) ? [BROWSER_APP_PROVIDERS, customProviders] : BROWSER_APP_PROVIDERS;
    return platform(BROWSER_PROVIDERS).application(appProviders).bootstrap(appComponentType);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtTGs5blJKT3MudG1wL2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXIudHMiXSwibmFtZXMiOlsiYm9vdHN0cmFwIl0sIm1hcHBpbmdzIjoiQUFBQSxTQUFRLGlCQUFpQixRQUFPLHNDQUFzQyxDQUFDO0FBQ3ZFLFNBQ0UsaUJBQWlCLEVBQ2pCLHdCQUF3QixFQUN4Qix1QkFBdUIsRUFDdkIsaUNBQWlDLEVBQ2pDLG9CQUFvQixFQUNwQixpQkFBaUIsRUFDakIsRUFBRSxFQUNGLEtBQUssRUFDTCxRQUFRLEVBQ1IsZ0JBQWdCLEVBQ2hCLGlCQUFpQixRQUNaLHNDQUFzQyxDQUFDO09BRXZDLEVBQU8sU0FBUyxFQUFFLFVBQVUsRUFBQyxNQUFNLDBCQUEwQjtPQUM3RCxFQUNMLGlCQUFpQixFQUNqQiw0QkFBNEIsRUFDN0IsTUFBTSxzQ0FBc0M7T0FDdEMsRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG1CQUFtQjtPQUM3QyxFQUFlLFFBQVEsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlO09BQ3hELEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxzREFBc0Q7T0FDcEYsRUFBQyxPQUFPLEVBQUMsTUFBTSx3Q0FBd0M7T0FDdkQsRUFBQyxHQUFHLEVBQUMsTUFBTSxtQkFBbUI7T0FDOUIsRUFBQyxRQUFRLEVBQUMsTUFBTSxzQkFBc0I7QUFFN0M7O0dBRUc7QUFDSCxhQUFhLHFCQUFxQixHQUEyQyxVQUFVLENBQUM7SUFDdEYsNEJBQTRCO0lBQzVCLGtCQUFrQjtJQUNsQixJQUFJLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFDLENBQUM7Q0FDdkMsQ0FBQyxDQUFDO0FBRUg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtRUc7QUFDSCwwQkFDSSxnQkFBc0IsRUFDdEIsZUFBd0Q7SUFDMURBLFNBQVNBLENBQUNBLHNCQUFzQkEsR0FBR0EsSUFBSUEsc0JBQXNCQSxFQUFFQSxDQUFDQTtJQUNoRUEsSUFBSUEsWUFBWUEsR0FDWkEsU0FBU0EsQ0FBQ0EsZUFBZUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EscUJBQXFCQSxFQUFFQSxlQUFlQSxDQUFDQSxHQUFHQSxxQkFBcUJBLENBQUNBO0lBQ2xHQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxpQkFBaUJBLENBQUNBLENBQUNBLFdBQVdBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsQ0FBQ0E7QUFDM0ZBLENBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHtBbmd1bGFyRW50cnlwb2ludH0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvYW5ndWxhcl9lbnRyeXBvaW50JztcbmV4cG9ydCB7XG4gIEJST1dTRVJfUFJPVklERVJTLFxuICBDQUNIRURfVEVNUExBVEVfUFJPVklERVIsXG4gIEVMRU1FTlRfUFJPQkVfUFJPVklERVJTLFxuICBFTEVNRU5UX1BST0JFX1BST1ZJREVSU19QUk9EX01PREUsXG4gIGluc3BlY3ROYXRpdmVFbGVtZW50LFxuICBCcm93c2VyRG9tQWRhcHRlcixcbiAgQnksXG4gIFRpdGxlLFxuICBET0NVTUVOVCxcbiAgZW5hYmxlRGVidWdUb29scyxcbiAgZGlzYWJsZURlYnVnVG9vbHNcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2Jyb3dzZXJfY29tbW9uJztcblxuaW1wb3J0IHtUeXBlLCBpc1ByZXNlbnQsIENPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1xuICBCUk9XU0VSX1BST1ZJREVSUyxcbiAgQlJPV1NFUl9BUFBfQ09NTU9OX1BST1ZJREVSU1xufSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlcl9jb21tb24nO1xuaW1wb3J0IHtDT01QSUxFUl9QUk9WSURFUlN9IGZyb20gJ2FuZ3VsYXIyL2NvbXBpbGVyJztcbmltcG9ydCB7Q29tcG9uZW50UmVmLCBwbGF0Zm9ybSwgcmVmbGVjdG9yfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7UmVmbGVjdGlvbkNhcGFiaWxpdGllc30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0aW9uX2NhcGFiaWxpdGllcyc7XG5pbXBvcnQge1hIUkltcGx9IGZyb20gXCJhbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlci94aHJfaW1wbFwiO1xuaW1wb3J0IHtYSFJ9IGZyb20gJ2FuZ3VsYXIyL2NvbXBpbGVyJztcbmltcG9ydCB7UHJvdmlkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcblxuLyoqXG4gKiBBbiBhcnJheSBvZiBwcm92aWRlcnMgdGhhdCBzaG91bGQgYmUgcGFzc2VkIGludG8gYGFwcGxpY2F0aW9uKClgIHdoZW4gYm9vdHN0cmFwcGluZyBhIGNvbXBvbmVudC5cbiAqL1xuZXhwb3J0IGNvbnN0IEJST1dTRVJfQVBQX1BST1ZJREVSUzogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPSBDT05TVF9FWFBSKFtcbiAgQlJPV1NFUl9BUFBfQ09NTU9OX1BST1ZJREVSUyxcbiAgQ09NUElMRVJfUFJPVklERVJTLFxuICBuZXcgUHJvdmlkZXIoWEhSLCB7dXNlQ2xhc3M6IFhIUkltcGx9KSxcbl0pO1xuXG4vKipcbiAqIEJvb3RzdHJhcHBpbmcgZm9yIEFuZ3VsYXIgYXBwbGljYXRpb25zLlxuICpcbiAqIFlvdSBpbnN0YW50aWF0ZSBhbiBBbmd1bGFyIGFwcGxpY2F0aW9uIGJ5IGV4cGxpY2l0bHkgc3BlY2lmeWluZyBhIGNvbXBvbmVudCB0byB1c2VcbiAqIGFzIHRoZSByb290IGNvbXBvbmVudCBmb3IgeW91ciBhcHBsaWNhdGlvbiB2aWEgdGhlIGBib290c3RyYXAoKWAgbWV0aG9kLlxuICpcbiAqICMjIFNpbXBsZSBFeGFtcGxlXG4gKlxuICogQXNzdW1pbmcgdGhpcyBgaW5kZXguaHRtbGA6XG4gKlxuICogYGBgaHRtbFxuICogPGh0bWw+XG4gKiAgIDwhLS0gbG9hZCBBbmd1bGFyIHNjcmlwdCB0YWdzIGhlcmUuIC0tPlxuICogICA8Ym9keT5cbiAqICAgICA8bXktYXBwPmxvYWRpbmcuLi48L215LWFwcD5cbiAqICAgPC9ib2R5PlxuICogPC9odG1sPlxuICogYGBgXG4gKlxuICogQW4gYXBwbGljYXRpb24gaXMgYm9vdHN0cmFwcGVkIGluc2lkZSBhbiBleGlzdGluZyBicm93c2VyIERPTSwgdHlwaWNhbGx5IGBpbmRleC5odG1sYC5cbiAqIFVubGlrZSBBbmd1bGFyIDEsIEFuZ3VsYXIgMiBkb2VzIG5vdCBjb21waWxlL3Byb2Nlc3MgcHJvdmlkZXJzIGluIGBpbmRleC5odG1sYC4gVGhpcyBpc1xuICogbWFpbmx5IGZvciBzZWN1cml0eSByZWFzb25zLCBhcyB3ZWxsIGFzIGFyY2hpdGVjdHVyYWwgY2hhbmdlcyBpbiBBbmd1bGFyIDIuIFRoaXMgbWVhbnNcbiAqIHRoYXQgYGluZGV4Lmh0bWxgIGNhbiBzYWZlbHkgYmUgcHJvY2Vzc2VkIHVzaW5nIHNlcnZlci1zaWRlIHRlY2hub2xvZ2llcyBzdWNoIGFzXG4gKiBwcm92aWRlcnMuIEJpbmRpbmdzIGNhbiB0aHVzIHVzZSBkb3VibGUtY3VybHkgYHt7IHN5bnRheCB9fWAgd2l0aG91dCBjb2xsaXNpb24gZnJvbVxuICogQW5ndWxhciAyIGNvbXBvbmVudCBkb3VibGUtY3VybHkgYHt7IHN5bnRheCB9fWAuXG4gKlxuICogV2UgY2FuIHVzZSB0aGlzIHNjcmlwdCBjb2RlOlxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL3RzL2Jvb3RzdHJhcC9ib290c3RyYXAudHMgcmVnaW9uPSdib290c3RyYXAnfVxuICpcbiAqIFdoZW4gdGhlIGFwcCBkZXZlbG9wZXIgaW52b2tlcyBgYm9vdHN0cmFwKClgIHdpdGggdGhlIHJvb3QgY29tcG9uZW50IGBNeUFwcGAgYXMgaXRzXG4gKiBhcmd1bWVudCwgQW5ndWxhciBwZXJmb3JtcyB0aGUgZm9sbG93aW5nIHRhc2tzOlxuICpcbiAqICAxLiBJdCB1c2VzIHRoZSBjb21wb25lbnQncyBgc2VsZWN0b3JgIHByb3BlcnR5IHRvIGxvY2F0ZSB0aGUgRE9NIGVsZW1lbnQgd2hpY2ggbmVlZHNcbiAqICAgICB0byBiZSB1cGdyYWRlZCBpbnRvIHRoZSBhbmd1bGFyIGNvbXBvbmVudC5cbiAqICAyLiBJdCBjcmVhdGVzIGEgbmV3IGNoaWxkIGluamVjdG9yIChmcm9tIHRoZSBwbGF0Zm9ybSBpbmplY3RvcikuIE9wdGlvbmFsbHksIHlvdSBjYW5cbiAqICAgICBhbHNvIG92ZXJyaWRlIHRoZSBpbmplY3RvciBjb25maWd1cmF0aW9uIGZvciBhbiBhcHAgYnkgaW52b2tpbmcgYGJvb3RzdHJhcGAgd2l0aCB0aGVcbiAqICAgICBgY29tcG9uZW50SW5qZWN0YWJsZUJpbmRpbmdzYCBhcmd1bWVudC5cbiAqICAzLiBJdCBjcmVhdGVzIGEgbmV3IGBab25lYCBhbmQgY29ubmVjdHMgaXQgdG8gdGhlIGFuZ3VsYXIgYXBwbGljYXRpb24ncyBjaGFuZ2UgZGV0ZWN0aW9uXG4gKiAgICAgZG9tYWluIGluc3RhbmNlLlxuICogIDQuIEl0IGNyZWF0ZXMgYW4gZW11bGF0ZWQgb3Igc2hhZG93IERPTSBvbiB0aGUgc2VsZWN0ZWQgY29tcG9uZW50J3MgaG9zdCBlbGVtZW50IGFuZCBsb2FkcyB0aGVcbiAqICAgICB0ZW1wbGF0ZSBpbnRvIGl0LlxuICogIDUuIEl0IGluc3RhbnRpYXRlcyB0aGUgc3BlY2lmaWVkIGNvbXBvbmVudC5cbiAqICA2LiBGaW5hbGx5LCBBbmd1bGFyIHBlcmZvcm1zIGNoYW5nZSBkZXRlY3Rpb24gdG8gYXBwbHkgdGhlIGluaXRpYWwgZGF0YSBwcm92aWRlcnMgZm9yIHRoZVxuICogICAgIGFwcGxpY2F0aW9uLlxuICpcbiAqXG4gKiAjIyBCb290c3RyYXBwaW5nIE11bHRpcGxlIEFwcGxpY2F0aW9uc1xuICpcbiAqIFdoZW4gd29ya2luZyB3aXRoaW4gYSBicm93c2VyIHdpbmRvdywgdGhlcmUgYXJlIG1hbnkgc2luZ2xldG9uIHJlc291cmNlczogY29va2llcywgdGl0bGUsXG4gKiBsb2NhdGlvbiwgYW5kIG90aGVycy4gQW5ndWxhciBzZXJ2aWNlcyB0aGF0IHJlcHJlc2VudCB0aGVzZSByZXNvdXJjZXMgbXVzdCBsaWtld2lzZSBiZVxuICogc2hhcmVkIGFjcm9zcyBhbGwgQW5ndWxhciBhcHBsaWNhdGlvbnMgdGhhdCBvY2N1cHkgdGhlIHNhbWUgYnJvd3NlciB3aW5kb3cuIEZvciB0aGlzXG4gKiByZWFzb24sIEFuZ3VsYXIgY3JlYXRlcyBleGFjdGx5IG9uZSBnbG9iYWwgcGxhdGZvcm0gb2JqZWN0IHdoaWNoIHN0b3JlcyBhbGwgc2hhcmVkXG4gKiBzZXJ2aWNlcywgYW5kIGVhY2ggYW5ndWxhciBhcHBsaWNhdGlvbiBpbmplY3RvciBoYXMgdGhlIHBsYXRmb3JtIGluamVjdG9yIGFzIGl0cyBwYXJlbnQuXG4gKlxuICogRWFjaCBhcHBsaWNhdGlvbiBoYXMgaXRzIG93biBwcml2YXRlIGluamVjdG9yIGFzIHdlbGwuIFdoZW4gdGhlcmUgYXJlIG11bHRpcGxlXG4gKiBhcHBsaWNhdGlvbnMgb24gYSBwYWdlLCBBbmd1bGFyIHRyZWF0cyBlYWNoIGFwcGxpY2F0aW9uIGluamVjdG9yJ3Mgc2VydmljZXMgYXMgcHJpdmF0ZVxuICogdG8gdGhhdCBhcHBsaWNhdGlvbi5cbiAqXG4gKiAjIyBBUElcbiAqXG4gKiAtIGBhcHBDb21wb25lbnRUeXBlYDogVGhlIHJvb3QgY29tcG9uZW50IHdoaWNoIHNob3VsZCBhY3QgYXMgdGhlIGFwcGxpY2F0aW9uLiBUaGlzIGlzXG4gKiAgIGEgcmVmZXJlbmNlIHRvIGEgYFR5cGVgIHdoaWNoIGlzIGFubm90YXRlZCB3aXRoIGBAQ29tcG9uZW50KC4uLilgLlxuICogLSBgY3VzdG9tUHJvdmlkZXJzYDogQW4gYWRkaXRpb25hbCBzZXQgb2YgcHJvdmlkZXJzIHRoYXQgY2FuIGJlIGFkZGVkIHRvIHRoZVxuICogICBhcHAgaW5qZWN0b3IgdG8gb3ZlcnJpZGUgZGVmYXVsdCBpbmplY3Rpb24gYmVoYXZpb3IuXG4gKlxuICogUmV0dXJucyBhIGBQcm9taXNlYCBvZiB7QGxpbmsgQ29tcG9uZW50UmVmfS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJvb3RzdHJhcChcbiAgICBhcHBDb21wb25lbnRUeXBlOiBUeXBlLFxuICAgIGN1c3RvbVByb3ZpZGVycz86IEFycmF5PGFueSAvKlR5cGUgfCBQcm92aWRlciB8IGFueVtdKi8+KTogUHJvbWlzZTxDb21wb25lbnRSZWY+IHtcbiAgcmVmbGVjdG9yLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMgPSBuZXcgUmVmbGVjdGlvbkNhcGFiaWxpdGllcygpO1xuICBsZXQgYXBwUHJvdmlkZXJzID1cbiAgICAgIGlzUHJlc2VudChjdXN0b21Qcm92aWRlcnMpID8gW0JST1dTRVJfQVBQX1BST1ZJREVSUywgY3VzdG9tUHJvdmlkZXJzXSA6IEJST1dTRVJfQVBQX1BST1ZJREVSUztcbiAgcmV0dXJuIHBsYXRmb3JtKEJST1dTRVJfUFJPVklERVJTKS5hcHBsaWNhdGlvbihhcHBQcm92aWRlcnMpLmJvb3RzdHJhcChhcHBDb21wb25lbnRUeXBlKTtcbn1cbiJdfQ==