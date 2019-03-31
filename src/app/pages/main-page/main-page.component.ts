import { Component, OnInit } from '@angular/core';
import { MainPageService } from './service/main-page.service';
import { SocketService } from 'src/app/shared/service/socket.service';
import { Message, User } from '../../shared/models/user.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public newsList = [];
  public groupList = [];

  constructor(private _mainPageService: MainPageService,
              private _socket: SocketService) { }

  ngOnInit() {
    const user = new User('Fernanda');
    const msg = new Message(user, 'TESTING');
    this._socket.initSocket();
    this._socket.send(msg);

    this._mainPageService.getNews()
    .subscribe((response) => {
        this.callNews(response);
    });
    this._mainPageService.getGroups()
    .subscribe((response) => {
        this.groupList = response;
    });
  }

  callNews(response) {
    for (let index = 0; index < 3; index++) {
        this.newsList.push(response[index]);
      }
  }
}
