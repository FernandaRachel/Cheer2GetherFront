import { Component, OnInit } from '@angular/core';
import { MainPageService } from 'src/app/pages/main-page/service/main-page.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  news = [];
  constructor(private _mainPageService: MainPageService) { }

  ngOnInit() {
    this._mainPageService.getNews()
    .subscribe((resp: Array<any>) => {
      this.news = resp.slice(13, 15);
      console.log(this.news);
    });
  }

}
