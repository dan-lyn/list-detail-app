import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { MetafrenzyService } from 'ngx-metafrenzy';
import { ConfigService, ApiService } from '@listdetailapp/services';
import { Element } from '@listdetailapp/interfaces';

@Component({
    selector: 'detail',
    templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription = new Subscription();

    themeMainColor: string = '#000000';

    activeElement$: Observable<Element>;
    elements$: Observable<Element[]>;
    isLoading$: Observable<boolean>;
    hasError$: Observable<boolean>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private apiService: ApiService,
        private config: ConfigService,
        private metafrenzyService: MetafrenzyService
    ) {
        this.themeMainColor = this.config.getStyling().themeMainColor;

        this.elements$ = this.apiService.getElementsSubject();
        this.isLoading$ = this.apiService.getIsLoadingSubject();
        this.hasError$ = this.apiService.getHasErrorSubject();
    }

    ngOnInit() {
        this.subscriptions.add(
            this.route.paramMap.pipe(
                switchMap(params => {
                    return this.apiService.getElements(+params.get('id'));
                })
            ).subscribe()
        );

        this.subscriptions.add(
            this.elements$.subscribe(elements => {
                if (Array.isArray(elements) && elements.length > 0) {
                    this.initMetaTags(elements[0]);
                }
            })
        );

        this.activeElement$ = this.elements$.pipe(
            map(elements => {
                return Array.isArray(elements) ? elements[0] : null;
            })
        );
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    initMetaTags(element): void {
        if (this.config.getMetaTags().disableMetaTags === true) {
            return;
        }

        let tags = {};

        if ('title' in element && element['title']) {
            const title = element['title'] + this.config.getMetaTags().titleSuffix;
            tags = Object.assign({}, tags, {title});
        }

        if ('image' in element && element['image']) {
            tags = Object.assign({}, tags, {image: element['image']});
        }

        let url = this.config.getMetaTags().url;
        if (url && 'id' in element) {
            url += element['id'];

            tags = Object.assign({}, tags, {url});
        }

        this.metafrenzyService.setTags(tags);
    }

    back(): void {
        this.router.navigate(['']);
    }

}
