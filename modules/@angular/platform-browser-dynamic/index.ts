/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {COMMON_DIRECTIVES, COMMON_PIPES} from '@angular/common';
import {COMPILER_PROVIDERS, CompilerConfig, XHR, RUNTIME_COMPILER_FACTORY,} from '@angular/compiler';
import {AppModule, AppModuleRef, ApplicationRef, Compiler, ComponentRef, ComponentResolver, ExceptionHandler, PLATFORM_DIRECTIVES, PLATFORM_PIPES, ReflectiveInjector, Type, coreLoadAndBootstrap, bootstrapModule, bootstrapModuleFactory, isDevMode, OpaqueToken, PlatformRef, getPlatform, assertPlatform, createPlatform, PLATFORM_INITIALIZER, CompilerOptions, CompilerFactory, createPlatformFactory} from '@angular/core';
import {BROWSER_APP_PROVIDERS, BrowserModule, WORKER_APP_APPLICATION_PROVIDERS, WORKER_SCRIPT, WORKER_UI_APPLICATION_PROVIDERS, browserPlatform, workerAppPlatform, workerUiPlatform, BROWSER_PLATFORM_PROVIDERS} from '@angular/platform-browser';

import {Console, ReflectionCapabilities, reflector} from './core_private';
import {getDOM, initDomAdapter} from './platform_browser_private';
import {PromiseWrapper} from './src/facade/async';
import {ConcreteType, isPresent, stringify} from './src/facade/lang';
import {CachedXHR} from './src/xhr/xhr_cache';
import {XHRImpl} from './src/xhr/xhr_impl';

/**
 * @deprecated The compiler providers are already included in the {@link CompilerFactory} that is
 * contained the {@link browserDynamicPlatform}()`.
 */
export const BROWSER_APP_COMPILER_PROVIDERS: Array<any /*Type | Provider | any[]*/> = [
  COMPILER_PROVIDERS, {
    provide: CompilerConfig,
    useFactory: (platformDirectives: any[], platformPipes: any[]) => {
      return new CompilerConfig({
        deprecatedPlatformDirectives: platformDirectives,
        deprecatedPlatformPipes: platformPipes
      });
    },
    deps: [PLATFORM_DIRECTIVES, PLATFORM_PIPES]
  },
  {provide: XHR, useClass: XHRImpl},
  {provide: PLATFORM_DIRECTIVES, useValue: COMMON_DIRECTIVES, multi: true},
  {provide: PLATFORM_PIPES, useValue: COMMON_PIPES, multi: true}
];

/**
 * @experimental
 */
export const CACHED_TEMPLATE_PROVIDER: Array<any /*Type | Provider | any[]*/> =
    [{provide: XHR, useClass: CachedXHR}];

function initReflector() {
  reflector.reflectionCapabilities = new ReflectionCapabilities();
}

/**
 * CompilerFactory for the browser dynamic platform
 *
 * @experimental
 */
export const BROWSER_DYNAMIC_COMPILER_FACTORY =
    RUNTIME_COMPILER_FACTORY.withDefaults({providers: [{provide: XHR, useClass: XHRImpl}]});

/**
 * Providers for the browser dynamic platform
 *
 * @experimental
 */
export const BROWSER_DYNAMIC_PLATFORM_PROVIDERS: Array<any /*Type | Provider | any[]*/> = [
  BROWSER_PLATFORM_PROVIDERS,
  {provide: CompilerFactory, useValue: BROWSER_DYNAMIC_COMPILER_FACTORY},
  {provide: PLATFORM_INITIALIZER, useValue: initReflector, multi: true},
];

/**
 * @experimental API related to bootstrapping are still under review.
 */
export const browserDynamicPlatform =
    createPlatformFactory('browserDynamic', BROWSER_DYNAMIC_PLATFORM_PROVIDERS);

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
 * ## API (version 1)
 *
 * - `appComponentType`: The root component which should act as the application. This is
 *   a reference to a `Type` which is annotated with `@Component(...)`.
 * - `customProviders`: An additional set of providers that can be added to the
 *   app injector to override default injection behavior.
 *
 * ## API (version 2)
 * - `appComponentType`: The root component which should act as the application. This is
 *   a reference to a `Type` which is annotated with `@Component(...)`.
 * - `providers`, `directives`, `pipes`, `modules`, `precompile`: Defines the properties
 *   of the dynamically created module that is used to bootstrap the module.
 *
 * Returns a `Promise` of {@link ComponentRef}.
 *
 * @experimental This api cannot be used with the offline compiler and thus is still subject to
 * change.
 */
// Note: We are using typescript overloads here to have 2 function signatures!
export function bootstrap<C>(
    appComponentType: ConcreteType<C>,
    customProviders?: Array<any /*Type | Provider | any[]*/>): Promise<ComponentRef<C>>;
export function bootstrap<C>(
    appComponentType: ConcreteType<C>,
    {providers, directives, pipes, modules, precompile, compilerOptions}?: {
      providers?: Array<any /*Type | Provider | any[]*/>,
      directives?: any[],
      pipes?: any[],
      modules?: any[],
      precompile?: any[],
      compilerOptions?: CompilerOptions
    }): Promise<ComponentRef<C>>;
export function bootstrap<C>(
    appComponentType: ConcreteType<C>,
    customProvidersOrDynamicModule?: Array<any /*Type | Provider | any[]*/>| {
      providers: Array<any /*Type | Provider | any[]*/>,
      directives: any[],
      pipes: any[],
      modules: any[],
      precompile: any[],
      compilerOptions: CompilerOptions
    }): Promise<ComponentRef<C>> {
  let compilerOptions: CompilerOptions;
  let compilerProviders: any = [];
  let providers: any[] = [];
  let directives: any[] = [];
  let pipes: any[] = [];
  let modules: any[] = [];
  let precompile: any[] = [];
  if (customProvidersOrDynamicModule instanceof Array) {
    providers = customProvidersOrDynamicModule;
  } else if (customProvidersOrDynamicModule) {
    providers = normalizeArray(customProvidersOrDynamicModule.providers);
    directives = normalizeArray(customProvidersOrDynamicModule.directives);
    pipes = normalizeArray(customProvidersOrDynamicModule.pipes);
    modules = normalizeArray(customProvidersOrDynamicModule.modules);
    precompile = normalizeArray(customProvidersOrDynamicModule.precompile);
    compilerOptions = customProvidersOrDynamicModule.compilerOptions;
  }

  @AppModule({
    providers: providers,
    modules: modules.concat([BrowserModule]),
    directives: directives,
    pipes: pipes,
    precompile: precompile.concat([appComponentType])
  })
  class DynamicModule {
  }

  return bootstrapModule(
             DynamicModule, browserDynamicPlatform(),
             CompilerFactory.mergeOptions(compilerOptions, {deprecatedAppProviders: providers}))
      .then((moduleRef) => {
        const appRef: ApplicationRef = moduleRef.injector.get(ApplicationRef);
        return appRef.bootstrap(appComponentType);
      });
}

/**
 * @deprecated Create an {@link AppModule} that includes the {@link WorkerUiModule} and use {@link
 * bootstrapModule}
 * with the {@link workerUiPlatform}() instead.
 */
export function bootstrapWorkerUi(
    workerScriptUri: string,
    customProviders?: Array<any /*Type | Provider | any[]*/>): Promise<ApplicationRef> {
  console.warn(
      'bootstrapWorkerUi is deprecated. Create an @AppModule that includes the `WorkerUiModule` and use `bootstrapModule` with the `workerUiPlatform()` instead.');
  var app = ReflectiveInjector.resolveAndCreate(
      [
        WORKER_UI_APPLICATION_PROVIDERS, BROWSER_APP_COMPILER_PROVIDERS,
        {provide: WORKER_SCRIPT, useValue: workerScriptUri},
        isPresent(customProviders) ? customProviders : []
      ],
      workerUiPlatform().injector);
  // Return a promise so that we keep the same semantics as Dart,
  // and we might want to wait for the app side to come up
  // in the future...
  return PromiseWrapper.resolve(app.get(ApplicationRef));
}

/**
 * @deprecated The compiler providers are already included in the {@link CompilerFactory} that is
 * contained the {@link workerAppPlatform}().
 */
const WORKER_APP_COMPILER_PROVIDERS: Array<any /*Type | Provider | any[]*/> = [
  COMPILER_PROVIDERS, {
    provide: CompilerConfig,
    useFactory: (platformDirectives: any[], platformPipes: any[]) => {
      return new CompilerConfig({
        deprecatedPlatformDirectives: platformDirectives,
        deprecatedPlatformPipes: platformPipes
      });
    },
    deps: [PLATFORM_DIRECTIVES, PLATFORM_PIPES]
  },
  {provide: XHR, useClass: XHRImpl},
  {provide: PLATFORM_DIRECTIVES, useValue: COMMON_DIRECTIVES, multi: true},
  {provide: PLATFORM_PIPES, useValue: COMMON_PIPES, multi: true}
];


/**
 * @deprecated Create an {@link AppModule} that includes the {@link WorkerAppModule} and use {@link
 * bootstrapModule}
 * with the {@link workerAppPlatform}() instead.
 */
export function bootstrapWorkerApp(
    appComponentType: Type,
    customProviders?: Array<any /*Type | Provider | any[]*/>): Promise<ComponentRef<any>> {
  console.warn(
      'bootstrapWorkerApp is deprecated. Create an @AppModule that includes the `WorkerAppModule` and use `bootstrapModule` with the `workerAppPlatform()` instead.');
  var appInjector = ReflectiveInjector.resolveAndCreate(
      [
        WORKER_APP_APPLICATION_PROVIDERS, WORKER_APP_COMPILER_PROVIDERS,
        isPresent(customProviders) ? customProviders : []
      ],
      workerAppPlatform().injector);
  return coreLoadAndBootstrap(appComponentType, appInjector);
}

function normalizeArray(arr: any[]): any[] {
  return arr ? arr : [];
}