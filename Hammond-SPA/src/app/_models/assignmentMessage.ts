export interface AssignmentMessage {
    id: number;
    senderId: number;
    senderUsername: string;
    recipientIds: number[];
    content: string;
    isRead: boolean;
    dateSent: Date;
    fontColor: any;
}
