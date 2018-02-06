class Client {
    constructor(serverLocation) {
        this.socket = null;

        this.host = serverLocation;
        this.connectToServer();
        this.messageReceived();
    }

    connectToServer() {
        this.socket = io.connect(this.host);
        this.socket.on("connect", function() {
            console.log("Connection has been established...");
        });
    }

    messageReceived() {
        this.socket.on("message", message => {
            this.handleIncomingMessage(message);
        });
    }

    handleIncomingMessage(messageData) {
        console.log(messageData);
    }

    sendMessage(user, message) {
        this.socket.emit("message", {user:user, message:message});
    }
}