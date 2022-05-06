import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from "@testing-library/react";
import SearchBar from '../pages/search/searchBar'
import { Router, Route, Routes, MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from 'history';

test('renders meli logo, input and search button', () => {
    const component = render(
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<SearchBar />}></Route>
            </Routes>
        </MemoryRouter>
        )

    const placeHolderForSeachBar = 'Nunca dejes de buscar'

    component.getByAltText('MELI Logo')
    component.getAllByPlaceholderText(placeHolderForSeachBar)
    const searchImage = component.getByAltText('Search')
    expect(searchImage.parentElement).toHaveClass('clickable')

})

test('navigates to search products page on click', () => {
    const history = createMemoryHistory();
    const component = render(
        <Router location={history.location} navigator={history}>
            <SearchBar />
        </Router>
    );
    const searchImage = component.getByAltText('Search')
    fireEvent.click(searchImage);
    expect(history.location.pathname).toBe('/items');
})

test('navigates to search products page on form submit', () => {
    const history = createMemoryHistory();
    const component = render(
        <Router location={history.location} navigator={history}>
            <SearchBar />
        </Router>
    );
    const form = component.container.querySelector('form');
    fireEvent.submit(form);
    expect(history.location.pathname).toBe('/items');
})