import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Questionare from './pages/Questionaire';

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/questions' element={<Questionare />} />
            </Routes>
        </>
    );
}

export default App;
