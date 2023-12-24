import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css'],
})
export class TopnavComponent implements OnInit {
  currentUser = '';
  isLoggedIn = false;
  @Output() toggleNav: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router, public headerService: HeaderService) {}

  ngOnInit(): void {
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
  }

  toggle() {
    this.toggleNav.emit();
  }
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  login() {
    this.router.navigateByUrl('/login');
  }
}
