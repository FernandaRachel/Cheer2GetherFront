import { Injectable } from '@angular/core';
import { Message } from '../../shared/models/user.model';

import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';
import { Event } from '@angular/router';

const SERVER_URL = 'wss://ws.cheeer2gether.com/ws';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
    private socket;
    private msgQueue;
    private msgListners;

    public initSocket(): void {
        this.socket = new WebSocket(SERVER_URL);
        this.msgQueue = [];
        this.msgListners = [];

        this.sendQueued = this.sendQueued.bind(this);
        this.socket.onopen = this.sendQueued;

        this.messageReceived = this.messageReceived.bind(this);
        this.socket.onmessage = this.messageReceived;
    }

    public messageReceived(message: string) {
        console.log('message');
        console.log(message);

        for (let i = 0; i < this.msgListners.length; i++) {
            this.msgListners[i](message);
        }
    }

    public sendQueued() {
        for(let i = 0; i< this.msgQueue.length; i++){
            this.send(this.msgQueue[i])
        }
    }

    public send(obj: any): void {
        if (this.socket.readyState === 1) {
            this.socket.send(JSON.stringify(obj));
        } else {
            this.msgQueue.push(obj);
        }
    }

    public onMessage(callback: Function) {
      this.msgListners.push(callback);
    }

    // public onMessage(): Observable<Message> {
    //     return new Observable<Message>(observer => {
    //         this.socket.on('message', (data: Message) => observer.next(data));
    //     });
    // }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}
