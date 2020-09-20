import { TestBed, waitForAsync, tick, fakeAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '@listdetailapp/app.component';
import { ListComponent } from '@listdetailapp/components/list/list.component';
import { DetailComponent } from '@listdetailapp/components/detail/detail.component';
import { PaginationComponent } from '@listdetailapp/components/pagination/pagination.component';
import { FilterComponent } from '@listdetailapp/components/filter/filter.component';
import { CardComponent } from '@listdetailapp/components/card/card.component';
import { ErrorComponent } from '@listdetailapp/components/error/error.component';
import { ConfigService, ApiService, TranslationService, FontAwesomeService } from '@listdetailapp/services';
import { TranslatePipe } from '@listdetailapp/pipes';
import { MockConfigService, MockApiService, MockTranslationService } from '@listdetailapp/mocks';
import { routes } from '@listdetailapp/app-routing.module';

describe('AppComponent', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                HttpClientModule,
                RouterTestingModule.withRoutes(routes),
            ],
            declarations: [
                AppComponent,
                ListComponent,
                DetailComponent,
                PaginationComponent,
                FilterComponent,
                CardComponent,
                ErrorComponent,
                TranslatePipe,
            ],
            providers: [
                {provide: ApiService, useClass: MockApiService},
                {provide: ConfigService, useClass: MockConfigService},
                {provide: TranslationService, useClass: MockTranslationService},
                FontAwesomeService,
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    it('should create the app', waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should include a router outlet', waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const dom = fixture.debugElement.nativeElement;

        expect(dom.querySelectorAll('router-outlet').length).toBe(1);
    }));

    it('should scroll to top on route change', fakeAsync(() => {
        const windowSpy = spyOn(window, 'scrollTo');

        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();

        const debugElement = fixture.debugElement;
        const router = debugElement.injector.get(Router);

        router.navigate(['detail/1']);
        tick();

        expect(windowSpy).toHaveBeenCalled();
    }));
});
