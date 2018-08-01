import { Component, Input } from '@angular/core';
import { Element } from './../interfaces';
import { ConfigService } from './../config.service';
import { FontAwesomeService } from './../font-awesome.service';

@Component({
    selector: 'card',
    templateUrl: './card.component.html',
})
export class CardComponent {

    @Input()
    element: Element;

    @Input()
    useBackgroundImage: boolean;

    @Input()
    showExternalLinkBtn: boolean;

    @Input()
    showDescription: boolean;

    @Input()
    showSource: boolean;

    apiUrl: string = '';
    themeMainColor: string = '';
    showSourceTextOnBtn: boolean = true;
    showSquareImage: boolean = false;

    constructor(
        private config: ConfigService,
        private fontawesome: FontAwesomeService
    ) {
        this.apiUrl = this.config.getEnvironmentApiUrl();

        this.showSourceTextOnBtn = this.config.getSettings().showSourceTextOnBtn;
        this.showSquareImage = this.config.getSettings().showSquareImage;

        this.themeMainColor = this.config.getStyling().themeMainColor;
    }

    getBackgroundImage(element: Element): Object {
        if (this.useBackgroundImage) {
            return {
                'background-image': 'url(' + element.image + ')'
            };
        }
    }

    getIcon(name: string): string {
        return this.fontawesome.getIcon(name);
    }

}
