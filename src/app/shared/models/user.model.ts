
export class User {
    constructor(private name: string) {}
}

export class Message {
    constructor(private from: User, private content: string) {}
}

export class ChatMessage extends Message{
    constructor(from: User, content: string) {
        super(from, content);
    }
}
