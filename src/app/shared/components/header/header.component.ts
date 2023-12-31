import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule , MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMenuOpen : boolean = false ;
  constructor() { }

  ngOnInit(): void {
  }

  // publics
  onOpenMenu() : void {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
