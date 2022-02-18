import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Counter from './components/Counter';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/counter" element={<Counter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
