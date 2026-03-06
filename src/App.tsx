import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages';
import { AboutPage } from './pages/about';
import { AskDbPage } from './pages/askdb';
import { ContextPage } from './pages/context';
import { ModelPage } from './pages/model';
import { RequestPage } from './pages/request';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/askdb" element={<AskDbPage />} />
      <Route path="/context" element={<ContextPage />} />
      <Route path="/model" element={<ModelPage />} />
      <Route path="/request" element={<RequestPage />} />
    </Routes>
  );
};

