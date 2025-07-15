import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/index.jsx';
import Home from './components/Home/index.jsx';
import About from './components/About/index.jsx';
import Skills from './components/Skills/index.jsx';
import Qualification from './components/Qualification/index.jsx';
import Services, { MoreServicesPage } from './components/Services/index.jsx';
import Projects, { MoreProjectsPage } from './components/Projects/index.jsx';
import Contact from './components/Contact/index.jsx';
import Footer from './components/Footer/index.jsx';
import ScrollUp from './components/ScrollUp/index.jsx';
import './App.css';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="App">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={
              <>
                <Home />
                <About />
                <Skills />
                <Qualification />
                <Services />
                <Projects />
                <Contact />
              </>
            } />
            <Route path="/more-projects" element={<MoreProjectsPage />} />
            <Route path="/more-services" element={<MoreServicesPage />} />
          </Routes>
        </main>
        <Footer />
        <ScrollUp />
      </div>
    </Router>
  );
}

export default App;