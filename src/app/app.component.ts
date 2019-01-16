import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'lyrics-formatter';

  date: Date = null;

  ngOnInit() {
    //  this.displayCurrentTime();
  }

  displayCurrentTime() {
    this.date = new Date();

    setInterval(() => {
      this.displayCurrentTime();
    }, 1000);
  }
}
