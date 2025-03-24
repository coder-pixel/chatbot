class ChatbotWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = `
        <style>
          .chatbot-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: url('/chat-icon.png') no-repeat center;
            background-size: contain;
            cursor: pointer;
            z-index: 9999;
          }
          .chatbot-frame {
            display: none;
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 400px;
            height: 500px;
            border: none;
            z-index: 10000;
          }
        </style>
        <div class="chatbot-container"></div>
        <iframe class="chatbot-frame" src="https://chatbot-loader-file.vercel.app"></iframe>
      `;

    const button = this.shadowRoot?.querySelector(".chatbot-container");
    const iframe = this.shadowRoot?.querySelector(".chatbot-frame");

    button?.addEventListener("click", () => {
      if (iframe) {
        (iframe as HTMLIFrameElement).style.display =
          (iframe as HTMLIFrameElement)?.style?.display === "none"
            ? "block"
            : "none";
      }
    });
  }
}

customElements.define("chat-bot", ChatbotWidget);
