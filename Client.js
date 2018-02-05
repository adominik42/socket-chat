class Client {
    constructor(serverLocation) {
        if (!this.checkSocketIoExistence()) return false;

        this.socket = null;
        this.message = null;
        this.user = null;

        this.host = serverLocation;
        this.connectToServer();
        this.handleIncomingMessage();
    }

    checkSocketIoExistence() {
        return typeof io != "undefined";
    }

    connectToServer() {
        this.socket = io.connect(this.host);
        this.socket.on("connect", function() {
            console.log("Connection has been established...");
        });
    }

    handleIncomingMessage() {
        this.socket.on('message', messageBody => {
            let list = document.querySelector(".chat__messages");
            let entry = document.createElement("li");
            entry.appendChild(document.createTextNode(messageBody.user + ": " + messageBody.message));
            list.appendChild(entry);
        });
    }

    sendMessage() {
        this.socket.emit("message", {user:this.user, message:this.message});
    }
}