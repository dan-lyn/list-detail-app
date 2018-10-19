import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService, ApiService, FontAwesomeService } from '@listdetailapp/services';

@Component({
    selector: 'filter',
    templateUrl: './filter.component.html',
})
export class FilterComponent {

    filters: string[];
    currentFilter: string;

    constructor(
        private router: Router,
        private config: ConfigService,
        private apiService: ApiService,
        private fontawesome: FontAwesomeService
    ) {
        this.filters = this.config.getFilter('mainFilter');
    }

    filter(name: string): boolean {
        if (!name) {
            return false;
        }

        this.currentFilter = name;
        this.apiService.setFilter(name);
        this.router.navigate(['']);

        return true;
    }

    reset() {
        this.currentFilter = '';
        this.apiService.setFilter('');
    }

    getIcon(name: string): Object {
        return this.fontawesome.getIcon(name);
    }

}
