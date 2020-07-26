import React from 'react';
import ReactDom from 'react-dom';
import ButtonComponent from './ButtonComponent';

it("renders without crashing", ()=>{
    const originalError = console.error;
    console.error = jest.fn();
    const div = document.createElement("div");
    ReactDom.render(<ButtonComponent></ButtonComponent>, div);    
    console.error = originalError;
})