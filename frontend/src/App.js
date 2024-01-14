import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [chat]);

  const handleChat = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/chat', { input });
      setChat([...chat, { user: input, bot: response.data.message }]);
      setInput('');
    } catch (error) {
      console.error('Error while fetching data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div id="chat-container" className="chat-container">
        {chat.map((message, index) => (
          <div key={index} className={`message ${message.user ? 'user' : 'bot'}`}>
            {message.user && <span className="user-message">{message.user}</span>}
            {message.bot && <span className="bot-message">{message.bot}</span>}
          </div>
        ))}
      </div>
      <div className="input-container">
        <textarea
          rows="1"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button onClick={handleChat} disabled={loading}>
          Send
        </button>
      </div>
      {loading && <div className="loading-icon">Loading...</div>}
    </div>
  );
};

export default App;