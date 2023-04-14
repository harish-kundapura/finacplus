import React from 'react';
import { Route, Routes } from "react-router-dom";
import HomePage from '../screens/HomePage';
import CommentPage from '../screens/CommentPage';

const Component = () => {
  return (
    <div>
    <Routes>
    <Route path="/" exact element={<HomePage/>} />
    <Route path="/comment" exact element={<CommentPage/>} />
    </Routes>
    </div>
  )
}

export default Component