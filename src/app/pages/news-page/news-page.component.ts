import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/shared/service/socket.service';
import { User, Message } from 'src/app/shared/models/user.model';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {

  public message: string;
  public comments = [];
  public user;

  constructor(
    private _socket: SocketService,
    private _sessionStorage: SessionStorageService) { }

  ngOnInit() {
    this.user = this._sessionStorage.retrieve('user');
    this._socket.initSocket();
    this._socket.onMessage((resp) => {
      this.comments.push(JSON.parse( resp.data));
      console.log(this.comments);

    });
  }

  public sendMessage(value) {
    if(value.which === 13){
      // const user = new User('Fernanda');
      // const msg = new Message(user, this.message);
      console.log(this.message);
      const name = this.user ? this.user.name : 'ANONIMO';
      const obj = {
        from: {
          name: name,
        },
        content: this.message
      }
      this._socket.send(obj);
      }
    }
  }


