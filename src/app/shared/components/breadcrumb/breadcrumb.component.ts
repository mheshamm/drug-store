import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbService } from '../../services';
import { BreadCrumb } from '../../common/interfaces';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule , RouterModule , MatIconModule ],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbItems$: Observable<BreadCrumb[]> = this.breadcrumbService.breadcrumb$;
  // constructor
  constructor(private breadcrumbService: BreadcrumbService) {}
  //hooks
  ngOnInit(): void {}

}
