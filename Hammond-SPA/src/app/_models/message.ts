export interface Message {
    id: number;
    senderId: number;
    senderUsername: string;
    recipientId: number;
    recipientUsername: string;
    content: string;
    isRead: boolean;
    dateRead: Date;
    dateSent: Date;
    fontColor: any;
}
