import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  activeRoute!: any;

  constructor(private router: Router, private activateRouter: ActivatedRoute) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.getActiveRouteName(this.activateRouter);
      });
  }

  private getActiveRouteName(route: ActivatedRoute) {
    while (route.firstChild) {
      route = route.firstChild;
    }
    console.log( route.snapshot.routeConfig );
    this.activeRoute = route.snapshot.routeConfig?.title;
  }
}
