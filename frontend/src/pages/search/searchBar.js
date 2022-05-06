import { useState } from 'react';
import { useNavigate, Outlet } from "react-router-dom";

import meliLogo from '../../assets/Logo_ML.png'
import searchLogo from '../../assets/ic_Search.png'
import './searchBar.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

function SearchBar() {

    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    const handleSearchTextChange = (e) => setSearchText(e.target.value);

    const searchForProduct = async (e) => {
        if (e) {
            e.preventDefault();
        }
        navigate('/items?search=' + encodeURIComponent(searchText))
    }

    return (
        <div>
            <Container fluid className="searchBar">
                <Row>
                    <Col></Col>
                    <Col>
                        <img src={meliLogo} alt="MELI Logo" />
                    </Col>
                    <Col xs={9}>
                        <Form onSubmit={(e) => { searchForProduct(e) }}>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Nunca dejes de buscar"
                                    aria-label="Nunca dejes de buscar"
                                    aria-describedby="basic-addon2"
                                    onChange={(e) => handleSearchTextChange(e)}
                                />
                                <InputGroup.Text id="basic-addon2" className="clickable" onClick={() => { searchForProduct() }}><img src={searchLogo} alt="Search" /></InputGroup.Text>
                            </InputGroup>
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
            <Outlet />
        </div>

    )
}

export default SearchBar