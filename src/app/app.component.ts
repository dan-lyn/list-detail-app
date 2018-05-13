import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { ConfigService } from './config.service';
import { routeAnimation } from './animations';

@Component({
    selector: 'list-detail-app',
    templateUrl: './app.component.html',
    animations: [
        routeAnimation,
    ],
})
export class AppComponent {

    themeMainColor: string = '#ffffff';
    title: string = '';
    searchPlaceholder: string = '';

    searchTerm: string = '';

    constructor(
        private router: Router,
        private apiService: ApiService,
        private config: ConfigService
    ) {
        this.apiService.initSearch();

        this.themeMainColor = this.config.get('styling', 'themeMainColor');
        this.title = this.config.get('text', 'title');
        this.searchPlaceholder = this.config.get('text', 'search');
    }

    setSearchTerm(searchTerm) {
        this.searchTerm = searchTerm;
        this.apiService.setSearchTerm(searchTerm);
        this.apiService.resetPage();
        this.router.navigate(['']);
    }

    getAnimation(outlet: any) {
        return outlet.activatedRouteData['animation'] || 'list';
    }

}
