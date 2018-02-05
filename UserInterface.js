class UserInterface {
    constructor(rootElement) {
        this.rootElement = document.querySelector(rootElement);
        this.messageList = this.rootElement.querySelector('ul');
        this.messageForm = this.rootElement.querySelector('form');

        this.chatClient = new Client("http://185.13.90.140:8081/");
        this.handleFormSubmit();
        this.handleMessageList();
    }

    handleFormSubmit() {
        this.messageForm.addEventListener("submit", e => {
            e.preventDefault();
            this.chatClient.user = this.rootElement.querySelector("#username").value;
            this.chatClient.message = this.rootElement.querySelector("#message").value;

            this.chatClient.sendMessage();
        }, false);
    }

    handleMessageList() {
        this.messageList.scrollTop = this.messageList.scrollHeight;
    }

}