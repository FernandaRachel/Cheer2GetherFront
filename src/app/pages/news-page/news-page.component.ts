import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/shared/service/socket.service';
import { User, Message } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {

  public message: string;
  public comments = [];

  constructor(private _socket: SocketService) { }

  ngOnInit() {
    this._socket.initSocket();
    // this._socket.onMessage()
    // .subscribe((resp) =>{
    //   this.comments.push(resp);
    // });
    this._socket.onMessage((resp) => {
      // const data = {
      //   type: 'comments',
      //   message:
      // };

      let msgs = resp.data.split('}\n{');
      for(let i = 0; i < msgs.length; i++) {
          let msg = msgs[i];
          if (i !== msgs.length - 1) {
              msg += '}'
          }
          if (i !== 0) {
              msg = '{' + msg
          }

          this.comments.push(JSON.parse(msg));

      }

      this.comments.push(JSON.parse( resp.data));
      console.log(this.comments);

    });
  }

  public sendMessage(value) {
    if(value.which === 13){
      // const user = new User('Fernanda');
      // const msg = new Message(user, this.message);
      console.log(this.message);
      const obj = {
        from: {
          name:"Waltton",
        },
        content: this.message
      }
      this._socket.send(obj);
      }
    }
  }


