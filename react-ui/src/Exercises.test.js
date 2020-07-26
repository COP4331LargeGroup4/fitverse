import React from 'react';
import {render, cleanup, fireEvent, queryByTestId, getByTestId} from '@testing-library/react'
import Exercises from './Exercises';

describe('Exercise Check', ()=> {
  it('Check if elements are in the document', () => {
    const originalError = console.error;
    console.error = jest.fn();
    const { getByTestId } = render(<Exercises />);
    const addexerciseButton = getByTestId('addexerciseButton');
    const exerciseTable = getByTestId('exerciseTable');
    const content = getByTestId('content');
    const barspacer = getByTestId('barspacer');
    const container = getByTestId('container');
    const paper = getByTestId('paper');
    const toolbar = getByTestId('toolbar');
    const tableTitle = getByTestId('tableTitle');

    expect(addexerciseButton).toBeInTheDocument();
    expect(exerciseTable).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(barspacer).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(paper).toBeInTheDocument();
    expect(toolbar).toBeInTheDocument();
    expect(tableTitle).toBeInTheDocument();
    console.error = originalError;
  })

  it ('Check if label is named correctly', () => {
    const originalError = console.error;
    console.error = jest.fn();
    const { getByTestId } = render(<Exercises />);
    const label1 = getByTestId('searchexerciseLabel');

    expect(label1).toHaveTextContent('Search exercise');
    console.error = originalError;
  })
});