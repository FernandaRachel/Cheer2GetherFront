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

    public initSocket(): void {
        this.socket = new WebSocket(SERVER_URL);
        this.msgQueue = [];

        this.sendQueued = this.sendQueued.bind(this);
        this.socket.onopen = this.sendQueued;

        this.messageReceived = this.messageReceived.bind(this);
        this.socket.onmessage = this.messageReceived;
    }

    public messageReceived(message: string) {
        console.log(message);
    }

    public sendQueued() {
        for(let i = 0; i< this.msgQueue.length; i++){
            this.send(this.msgQueue[i])
        }
    }

    public send(message: Message): void {
        if (this.socket.readyState === 1) {
            this.socket.send(JSON.stringify(message));
        } else {
            this.msgQueue.push(message);
        }
    }

    public onMessage(): Observable<Message> {
        return new Observable<Message>(observer => {
            this.socket.on('message', (data: Message) => observer.next(data));
        });
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}
