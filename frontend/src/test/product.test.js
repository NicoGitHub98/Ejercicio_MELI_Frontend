import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from "@testing-library/react";
import { Router, MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from 'history';
import Product from '../pages/products/product'

const mockProduct = { "id": "MLA1127156356", "title": "Samsung Galaxy S22 Ultra 12gb 256gb Green", "price": { "currency": "ARS", "amount": 219999, "decimals": "00" }, "picture": "http://http2.mlstatic.com/D_668050-MLA49303776893_032022-I.jpg", "condition": "new", "free_shipping": true, "location": "Buenos Aires" }

test('renders 4 items', () => {
    
    const component = render(
        <MemoryRouter>
            <Product product={mockProduct} />
        </MemoryRouter>
    );

    component.getByAltText(mockProduct.title + ' thumbnail')
    component.getByText('$'+mockProduct.price.amount.toLocaleString())
    component.getByAltText('Free Shipping')
    component.getByText(mockProduct.title)
    component.getByText(mockProduct.location)
    
})

test('navigates to item details page', async () => {
    const history = createMemoryHistory();
    const component = render(
        <Router location={history.location} navigator={history}>
            <Product product={mockProduct} />
        </Router>
    );
    fireEvent.click(component.container.firstChild);
    expect(history.location.pathname).toBe('/items/'+mockProduct.id);
})