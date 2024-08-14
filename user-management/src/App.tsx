import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Suspense, lazy } from 'react';

const List = lazy(() => import('@/pages/list'));

const Detail = lazy(() => import('@/pages/detail'));

const App = () => {
  return (
    <div className="content">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/list" replace />} />
            <Route path="/list" element={<List />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
};

export default App;
