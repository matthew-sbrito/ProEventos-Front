import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

  @Input() user: any;

  isCollapsed = true;

  constructor(private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.user = await this.user;
  }

  showMenu(): boolean {
    return (
      this.router.url !== '/user/login' &&
      this.router.url !== '/user/registration'
    );
  }
  logout(): void {
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }
}
