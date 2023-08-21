const chatBody = document.querySelector(".chat-body");
const txtInput = document.querySelector("#txtinput");
const send = document.querySelector(".send");
const chatHeader = document.querySelector(".chat-header");
const container = document.querySelector(".container");

send.addEventListener("click", ()=> renderUserMessage());

txtInput.addEventListener("keyup", (event)=> {
    if(event.keyCode === 13){
        renderUserMessage();
    }
});

chatHeader.addEventListener("click", ()=> {
    container.classList.toggle("collapse");
});

const renderUserMessage = () => {
    const userInput = txtInput.value;
    renderMessageEle(userInput, "user");
    txtInput.value="";
    setTimeout(() => {
        renderChatbotResponse(userInput);
        setScrollPosition();
    }, 600);
};

const renderChatbotResponse = (userInput) => {
    const res = getChatbotResponse(userInput);
    renderMessageEle(res);
};

const renderMessageEle = (txt, type) => {
    let classname = "user-message";
    if(type !== "user") {
        classname = "chatbot-message";
    }
    const messageEle = document.createElement("div");
    const textNode = document.createTextNode(txt);
    messageEle.classList.add(classname);
    messageEle.append(textNode);
    chatBody.append(messageEle);
};

const getChatbotResponse = (userInput) => {
    return responseObj[userInput] == undefined ? "please try asking something else" : responseObj[userInput];
};

const setScrollPosition = () => {
    if(chatBody.scrollHeight>0)
    {
        chatBody.scrollTop = chatBody.scrollHeight;
    }
};