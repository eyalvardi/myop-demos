import {importProvidersFrom} from "@angular/core";
import {DashboardComponent} from "./lib/dashboard/dashboard.component";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient} from "@angular/common/http";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "@nx-20-ng-19/shared";
import {exposeAngularComponent} from "@nx-20-ng-19/myop";
import {provideRouter} from "@angular/router";

export * from './lib/dashboard/dashboard.component';

//// Myop
export * from './lib/dashboard/myop-dashboard.component';
export * from './lib/dashboard/demos/myop-html-demo.component';
export * from './lib/dashboard/demos/myop-container-cmp-demo.component';

if (document.location.href.includes('dashboard.myop.dev')) {
// expose for standalone usage :
    exposeAngularComponent(DashboardComponent, 'myop-dashboard2', null, {
        providers: [
            provideAnimations(),
            provideHttpClient(),
            provideRouter([]),
            importProvidersFrom(
                HttpClientInMemoryWebApiModule.forRoot(
                    InMemoryDataService, {dataEncapsulation: false}
                )
            ),
        ]
    })
}