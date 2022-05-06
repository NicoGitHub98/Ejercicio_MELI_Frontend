import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, prettyDOM } from "@testing-library/react";
import Categories from "../pages/search/categories";

test('renders 3 texts, one for each category', () => {
    const categories = ['category 1','category 2','category 3'];

    const component = render(<Categories categories={categories}/>)

    component.getByText('category 1 >')
    component.getByText('category 2 >')
    const element = component.getByText('category 3')
    expect(element.parentElement.childElementCount).toBe(3);
})