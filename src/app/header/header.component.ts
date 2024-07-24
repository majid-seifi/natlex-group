import {Component} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatAnchor} from "@angular/material/button";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatAnchor,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent {

}
