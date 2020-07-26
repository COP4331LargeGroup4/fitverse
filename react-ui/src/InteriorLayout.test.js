import React from 'react';
import ReactDom from 'react-dom';
import InteriorLayout from './InteriorLayout';

it("renders without crashing", ()=>{
    const originalError = console.error;
    console.error = jest.fn();
    const div = document.createElement("div");
    ReactDom.render(<InteriorLayout></InteriorLayout>, div);
    console.error = originalError;
});