import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentPage: string = 'null';
  currentUser = '';
  isLoggedIn: boolean = false;
  showFiller = true;
  constructor(public headerService: HeaderService, private router: Router) {}

  ngOnInit() {
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      this.isLoggedIn = true;
      let temp = localStorage.getItem('currentUser');
      if (temp != null) {
        let user = JSON.parse(temp);
        this.currentUser = user.name;
      }
    } else {
      this.isLoggedIn = false;
    }

    // window.location.reload();
    this.headerService.currentPageSource$.subscribe((data) => {
      this.currentPage = data;
      // window.location.reload();
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
