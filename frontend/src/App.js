import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Join from './component/join/Join';
import Chat from './component/chat/Chat';
import { Helmet } from "react-helmet";

function App() {

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Hi Chat</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content="It is chap application" />

      </Helmet>
      <Router>
        <Routes>
          <Route exact path="/" element={<Join />} />

          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
