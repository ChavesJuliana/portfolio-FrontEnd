import { Component, OnInit } from '@angular/core';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faGithub = faGithub;
  faLinkedin = faLinkedin;
  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  isHome() {
      return this.router.url;
  }

  logout() {
    localStorage.removeItem('token');
  }

  logIn(): boolean{
    return (localStorage.getItem('token') !== null);
  }


}
