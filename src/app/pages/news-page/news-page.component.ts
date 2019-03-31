import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/shared/service/socket.service';
import { User, Message } from 'src/app/shared/models/user.model';
import { SessionStorageService } from 'ngx-webstorage';
import { MainPageService } from '../main-page/service/main-page.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {

  public message: string;
  public comments = [];
  public user;
  public news;

  constructor(
    private _socket: SocketService,
    private _sessionStorage: SessionStorageService,
    private _mainPageService: MainPageService) { }

  ngOnInit() {
     this._mainPageService.getNewsByBanner()
    .subscribe((resp) => {
      this.news = resp[0];
    });
    this.user = this._sessionStorage.retrieve('user');
    this._socket.initSocket();
    this._socket.onMessage((resp) => {
      // const data = {
      //   type: 'comments',
      //   message:
      // };

      const msgs = resp.data.split('}\n{');
      for(let i = 0; i < msgs.length; i++) {
          let msg = msgs[i];
          if (i !== msgs.length - 1) {
              msg += '}'
          }
          if (i !== 0) {
              msg = '{' + msg
          }

          this.comments.unshift(JSON.parse(msg));

      }

      // this.comments.push(JSON.parse( resp.data));
      console.log(this.comments.sort());

    });
  }

  public sendMessage(value: KeyboardEvent) {
    console.log(value);
    if(value.which === 13){
      // const user = new User('Fernanda');
      // const msg = new Message(user, this.message);
      console.log(this.message);
      const name = this.user ? this.user.name : 'ANONIMO';
      const obj = {
        from: {
          name: name,
        },
        create_data: new Date(),
        content: this.message,
        photoUrl: this.user.photoUrl
      };
      this.message = '';
      this._socket.send(obj);
      }
    }
  }


