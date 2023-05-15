import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  rol : string | null = '';


  constructor() { }

  ngOnInit(): void {
    this.rol = localStorage.getItem('rol');
  }

}
