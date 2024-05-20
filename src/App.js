import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Search from './components/Search';
import User from './components/User';

function App() {
  return (
    <div>
      <Router basename="matineno-github-finder">
        <AnimatePresence mode='wait'>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/user/:username" element={<User />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </div>
  );
}

export default App;
