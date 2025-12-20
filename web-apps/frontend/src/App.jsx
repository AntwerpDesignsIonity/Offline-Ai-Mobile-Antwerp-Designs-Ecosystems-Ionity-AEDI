import React from 'react';
import './App.css';

function App() {
  const [message, setMessage] = React.useState('');
  const [aiResponse, setAiResponse] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleAIAnalysis = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/v2/ai/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: message }),
      });
      const data = await response.json();
      setAiResponse(data.result);
    } catch (error) {
      console.error('AI analysis failed:', error);
      setAiResponse('Error performing AI analysis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AEDI Platform</h1>
        <p className="subtitle">AI-Enhanced Full-Stack Development Platform</p>
      </header>
      
      <main className="container">
        <section className="features">
          <h2>Platform Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>🚀 Multi-Platform</h3>
              <p>Web, Mobile, Desktop, IoT, Cloud</p>
            </div>
            <div className="feature-card">
              <h3>🤖 AI-Powered</h3>
              <p>NLP, Computer Vision, Predictive Analytics</p>
            </div>
            <div className="feature-card">
              <h3>📱 Offline-First</h3>
              <p>Full offline capabilities with sync</p>
            </div>
            <div className="feature-card">
              <h3>⚡ Real-time</h3>
              <p>WebSocket support for live updates</p>
            </div>
          </div>
        </section>

        <section className="ai-demo">
          <h2>AI Analysis Demo</h2>
          <div className="demo-container">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter text for AI analysis..."
              rows={4}
              className="demo-input"
            />
            <button 
              onClick={handleAIAnalysis} 
              disabled={loading || !message}
              className="demo-button"
            >
              {loading ? 'Analyzing...' : 'Analyze with AI'}
            </button>
            {aiResponse && (
              <div className="demo-result">
                <h3>AI Response:</h3>
                <p>{aiResponse}</p>
              </div>
            )}
          </div>
        </section>

        <section className="tech-stack">
          <h2>Technology Stack</h2>
          <div className="tech-list">
            <div className="tech-category">
              <h4>Frontend</h4>
              <ul>
                <li>React 18+</li>
                <li>TypeScript</li>
                <li>TailwindCSS</li>
                <li>Redux Toolkit</li>
              </ul>
            </div>
            <div className="tech-category">
              <h4>Backend</h4>
              <ul>
                <li>Node.js 18+</li>
                <li>Express.js</li>
                <li>GraphQL</li>
                <li>WebSocket</li>
              </ul>
            </div>
            <div className="tech-category">
              <h4>AI/ML</h4>
              <ul>
                <li>TensorFlow</li>
                <li>PyTorch</li>
                <li>Hugging Face</li>
                <li>ONNX Runtime</li>
              </ul>
            </div>
            <div className="tech-category">
              <h4>Database</h4>
              <ul>
                <li>PostgreSQL</li>
                <li>MongoDB</li>
                <li>Redis</li>
                <li>Vector DB</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="App-footer">
        <p>&copy; 2025 Antwerp Designs Ionity - AEDI Platform</p>
      </footer>
    </div>
  );
}

export default App;
