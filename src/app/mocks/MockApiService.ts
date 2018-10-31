import { BehaviorSubject, Subject } from 'rxjs';
import { Element } from '@listdetailapp/interfaces';

export class MockApiService {
    initSearch(): void {
    }

    getHasErrorSubject(): BehaviorSubject<boolean> {
        return new BehaviorSubject(false);
    }

    getIsLoadingSubject(): BehaviorSubject<boolean> {
        return new BehaviorSubject(false);
    }

    getElementsSubject(): Subject<Element[]> {
        return new BehaviorSubject([]);
    }

    getElementSubject(): Subject<Element> {
        const element: Element = {
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

        return new BehaviorSubject(element);
    }

    setSearchTerm(term: string): void {
    }

    setFilter(name: string): void {
    }

    decrementPage(): void {
    }

    incrementPage(): void {
    }

    hasPrevPage(): boolean {
        return true;
    }

    hasNextPage(): boolean {
        return true;
    }

    resetPage(): void {
    }

    getToken(): BehaviorSubject<string|null> {
        return new BehaviorSubject(null);
    }

    getElements(): Subject<Element[]> {
        const element: Element = {
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

        return new BehaviorSubject([element]);
    }
}