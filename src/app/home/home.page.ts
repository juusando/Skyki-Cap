import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { IconComponent } from '../shared/components/icon/icon.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonContent, IconComponent],
})
export class HomePage {
  constructor() {}
}
