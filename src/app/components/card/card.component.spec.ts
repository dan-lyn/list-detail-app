import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConfigService, TranslationService, FontAwesomeService } from '@listdetailapp/services';
import { TranslatePipe } from '@listdetailapp/pipes';
import { MockConfigService, MockTranslationService } from '@listdetailapp/mocks';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                CardComponent,
                TranslatePipe,
            ],
            providers: [
                {provide: ConfigService, useClass: MockConfigService},
                {provide: TranslationService, useClass: MockTranslationService},
                FontAwesomeService,
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardComponent);
        component = fixture.componentInstance;
        component.element = {
            id: 123,
            title: 'Test',
            description: 'Lorem ipsum',
            internal_link: 'test',
            external_link: 'http://asdf',
            external_link_icon: '',
            image: 'test.jpg',
            source: 'Test',
            icons: [],
            labels: [],
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return background image css', () => {
        component.useBackgroundImage = true;
        const bgImage = component.getBackgroundImage();

        expect(typeof(bgImage)).toBe('object');
        expect(bgImage.hasOwnProperty('background-image')).toBeTruthy();
        expect(bgImage['background-image']).toEqual('url(test.jpg)');
    });

    it('should not return background image css', () => {
        component.useBackgroundImage = false;
        const bgImage = component.getBackgroundImage();

        expect(typeof(bgImage)).toBe('object');
        expect(bgImage.hasOwnProperty('background-image')).toBeFalsy();
    });

    it('should return an icon', () => {
        const icon = component.getIcon('link');

        expect(typeof(icon)).toBe('object');
        expect(icon['iconName']).toEqual('external-link-alt');
    });
});
