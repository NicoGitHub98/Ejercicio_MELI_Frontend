import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Categories from './categories';
import Product from '../products/product';

import './searchResults.css'

function SearchResults() {

    const [searchResults, setSearchResults] = useState([]);
    const [categories,setCategories] = useState([]);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const loadResults = async () => {
            const response = await fetch(`http://localhost:10101/api/items?q=${searchParams.get('search')}`);
            const data = await response.json();
            console.log("data is:", data)
            setSearchResults(data.items.slice(0, 4).flatMap((value, index, array) => array.length - 1 !== index ? [value, null] : value));
            setCategories(data.categories);
        }
        loadResults();
    }, [searchParams]);

    return (
        <Container fluid className='searchResultsPage'>
            <Row>
                <Col xs='1'></Col>
                <Col>
                    <Categories categories={categories}/>
                    <Row className='products'>
                        {
                            searchResults.map((product,index) => {
                                if (product !== null) {
                                    return (
                                        <Product key={product.id} product={product}/>
                                    )
                                } else {
                                    return <hr key={index}  className='productSeparator'/>
                                }
                                
                            })
                        }
                    </Row>
                </Col>
                <Col xs='1'></Col>
            </Row>
        </Container>
    )
}

export default SearchResults