class App extends Client {
    constructor(rootElement, serverLocation) {
        super(serverLocation);

        this.rootElement = document.querySelector(rootElement);
        this.messageList = this.rootElement.querySelector("ul");
        this.messageForm = this.rootElement.querySelector("form");

        this.handleFormSubmit();
        this.handleMessageList();
    }

    handleFormSubmit() {
        this.messageForm.addEventListener("submit", e => {
            e.preventDefault();

            let user = this.rootElement.querySelector("#username").value;
            let message = this.rootElement.querySelector("#message").value;

            this.sendMessage(user, message);
            this.renderMessage(message);
        }, false);
    }

    handleMessageList() {
        this.messageList.scrollTop = this.messageList.scrollHeight;
    }

    renderMessage(message) {
        let reply = typeof message === "object";
        let textContent = reply ? message.user + ": " + message.message : message;
        let list = document.querySelector(".chat__messages");
        let entry = document.createElement("li");

        if (!reply) {
            entry.classList.add('sent');
        }

        entry.appendChild(document.createTextNode(textContent));
        list.appendChild(entry);
        this.handleMessageList();
    }

    handleIncomingMessage(messageData) {
        if (messageData.user === "echoBot2000") return;

        this.renderMessage(messageData);
    }
}

var ui = new App(".chat", "http://185.13.90.140:8081/");