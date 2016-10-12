import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: Http) {
    http.get('/api/values')
      .map(r => r.json())
      .subscribe(r => { this.title = r; })
  }

  title = '...';
}
