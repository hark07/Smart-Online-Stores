import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";

const ChatBoat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const chatRef = useRef(null);
  const buttonRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        chatRef.current &&
        !chatRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Simple reply logic (customize or remove as you want)
  const getBotReply = (message) => {
    const msg = message.toLowerCase();

    if (msg.includes("order")) {
      return "You can check your order status in your account dashboard.";
    }

    if (msg.includes("delivery")) {
      return "Delivery info will be updated soon.";
    }

    if (msg.includes("payment")) {
      return "We accept multiple payment methods.";
    }

    if (msg.includes("return")) {
      return "Return policy details available on the site.";
    }

    return "Sorry, I didn't get that. Please try asking something else.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    setTimeout(() => {
      const reply = getBotReply(input);
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 500);

    setInput("");
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: 30,
          right: 30,
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: "#3bb77e",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
          zIndex: 1000,
        }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <FaTimes color="#fff" size={24} /> : <FaRobot color="#fff" size={24} />}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatRef}
          style={{
            position: "fixed",
            bottom: 100,
            right: 30,
            width: 350,
            height: 450,
            borderRadius: 10,
            backgroundColor: "#fff",
            boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 1000,
          }}
          role="region"
          aria-live="polite"
          aria-label="Chat window"
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#3bb77e",
              color: "#fff",
              padding: 15,
              fontWeight: "bold",
            }}
          >
            Chat
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: 15,
              overflowY: "auto",
              backgroundColor: "#f3f4f6",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: msg.sender === "bot" ? "#e0e7ff" : "#dcf8c6",
                  padding: 10,
                  borderRadius: 8,
                  alignSelf: msg.sender === "bot" ? "flex-start" : "flex-end",
                  maxWidth: "80%",
                  whiteSpace: "pre-wrap",
                }}
                aria-label={`${msg.sender === "bot" ? "Bot" : "You"} said: ${msg.text}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ display: "flex", borderTop: "1px solid #ddd" }}>
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              style={{
                flex: 1,
                border: "none",
                padding: 10,
                outline: "none",
                fontSize: 14,
              }}
              aria-label="Type your message"
            />
            <button
              onClick={handleSend}
              style={{
                padding: "10px 15px",
                backgroundColor: "#3bb77e",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              aria-label="Send message"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBoat;
