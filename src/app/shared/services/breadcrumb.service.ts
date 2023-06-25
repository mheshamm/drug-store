import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, filter, takeUntil } from 'rxjs';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterStateSnapshot } from '@angular/router';
import { destroyStream } from '../helpers';
import { BreadCrumb } from '../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService implements OnDestroy {
  // private properties
  private readonly _breadcrumbList$: BehaviorSubject<BreadCrumb[]> = new BehaviorSubject<BreadCrumb[]>([]);
  private destroy$: Subject<boolean> = new Subject<boolean>();
  // public props
  readonly breadcrumb$: Observable<BreadCrumb[]> = this._breadcrumbList$.asObservable();

  // constructor
  constructor(private router: Router) {
    this.listenToRouterEvents();
  }

  // hooks
  ngOnDestroy(): void {
    destroyStream(this.destroy$);
  }

  // privates

  private listenToRouterEvents(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event) => {
        const root: ActivatedRouteSnapshot = this.router.routerState.snapshot.root;
        this.getRoutes(root['_routerState']);
      });
  }

  private getRoutes(routerState: RouterStateSnapshot, labelKey: string = 'label'): void {
    const stateRoot = routerState['_root']['children'][0];
    const breadCrumbPaths: BreadCrumb[] = [];
    const breadcrumbArray: BreadCrumb[] = this.checkRoutesChildren(stateRoot['children'][0], breadCrumbPaths, labelKey);
    this._breadcrumbList$.next(breadcrumbArray);
  }

  private checkRoutesChildren(routeStateConfig: object, breadCrumbPaths: BreadCrumb[], labelKey: string): BreadCrumb[] {
    if (routeStateConfig['value']['data']?.['breadcrumb']) {
      // url
      const url =
        breadCrumbPaths.length > 0
          ? `${breadCrumbPaths[breadCrumbPaths.length - 1].url}/${routeStateConfig['value']['url'][0]['path']}`
          : `/${routeStateConfig['value']['url'][0]['path']}`;

      // build breadcrumb array
      breadCrumbPaths = this.buildBreadcrumbArray(
        routeStateConfig['value']['data']?.['breadcrumb'][labelKey],
        url,
        routeStateConfig['value']['data']?.['breadcrumb']?.['icon'],
        breadCrumbPaths
      );
    } else {
      // url
      const url =
        breadCrumbPaths.length > 0
          ? `${breadCrumbPaths[breadCrumbPaths.length - 1].url}/${routeStateConfig['value']['url'][0]['path']}`
          : `/${routeStateConfig['value']['url'][0]['path']}`;
      // build breadcrumb array
      breadCrumbPaths = this.buildBreadcrumbArray('', url, null, breadCrumbPaths);
    }
    // check if children has length and start recursion
    if (routeStateConfig['children'].length > 0) {
      const children = routeStateConfig['children'][0];
      this.checkRoutesChildren(children, breadCrumbPaths, labelKey);
    }

    return breadCrumbPaths;
  }

  private buildBreadcrumbArray(
    label: string,
    url: string,
    icon: string = null,
    breadCrumbPaths: BreadCrumb[]
  ): BreadCrumb[] {
    const breadcrumbItem: BreadCrumb = {
      label: label,
      url: url,
      icon: icon,
    };
    breadCrumbPaths.push(breadcrumbItem);
    return breadCrumbPaths;
  }
}
