import { waitForAsync, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common';
import { MetafrenzyModule, MetafrenzyService } from 'ngx-metafrenzy';
import { ApiService, ConfigService, TranslationService } from '@listdetailapp/services';
import { MockConfigService, MockApiService, MockTranslationService } from '@listdetailapp/mocks';
import { TranslatePipe } from '@listdetailapp/pipes';
import { DetailComponent } from './detail.component';
import { ListComponent } from '@listdetailapp/components/list/list.component';
import { ErrorComponent } from '@listdetailapp/components/error/error.component';
import { routes } from '../../app-routing.module';

describe('DetailComponent', () => {
    let component: DetailComponent;
    let fixture: ComponentFixture<DetailComponent>;
    let configService: MockConfigService;
    let location: Location;
    let router: Router;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                RouterTestingModule.withRoutes(routes),
                MetafrenzyModule.forRoot(),
            ],
            declarations: [
                DetailComponent,
                ListComponent,
                ErrorComponent,
                TranslatePipe,
            ],
            providers: [
                {provide: ApiService, useClass: MockApiService},
                {provide: ConfigService, useClass: MockConfigService},
                {provide: TranslationService, useClass: MockTranslationService},
                MetafrenzyService,
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();

        router = TestBed.inject(Router);
        location = TestBed.inject(Location);

        router.initialNavigation();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        const debugElement = fixture.debugElement;
        configService = debugElement.injector.get(ConfigService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not add meta tags', () => {
        spyOn(configService, 'getMetaTags').and.returnValue({
            disableMetaTags: true,
        });

        expect(component.initMetaTags({
            id: 1,
        })).toBeFalsy();
    });

    it('should add meta tags', () => {
        spyOn(configService, 'getMetaTags').and.returnValue({
            disableMetaTags: false,
            url: 'http://test.test',
        });

        expect(component.initMetaTags({
            id: 1,
            title: 'test',
            image: 'test.jpg',
        })).toBeTruthy();
    });

    it('should not add title but all other meta tags', () => {
        spyOn(configService, 'getMetaTags').and.returnValue({
            disableMetaTags: false,
            url: 'http://test.test',
        });

        expect(component.initMetaTags({
            id: 1,
            image: 'test.jpg',
        })).toBeTruthy();
    });

    it('should not add image but all other meta tags', () => {
        spyOn(configService, 'getMetaTags').and.returnValue({
            disableMetaTags: false,
            url: 'http://test.test',
        });

        expect(component.initMetaTags({
            id: 1,
            title: 'test',
        })).toBeTruthy();
    });

    it('should not add url but all other meta tags', () => {
        spyOn(configService, 'getMetaTags').and.returnValue({
            disableMetaTags: false,
        });

        expect(component.initMetaTags({
            id: 1,
            title: 'test',
            image: 'test.jpg',
        })).toBeTruthy();
    });

    it('should redirect to frontpage when calling back()', fakeAsync(() => {
        router.navigate(['detail/1']);
        tick();
        component.back();
        tick();
        expect(location.path()).toBe('/');
    }));

    it('should destroy', () => {
        expect(component.ngOnDestroy()).toBeUndefined();
    });
});
