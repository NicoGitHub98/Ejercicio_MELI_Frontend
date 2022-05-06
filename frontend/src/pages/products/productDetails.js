import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Categories from '../search/categories';

import './productDetails.css'

function ProductDetails() {

    const params = useParams();
    const [productInfo, setProductInfo] = useState('');

    useEffect(() => {
        const loadItem = async () => {
            const response = await fetch('http://localhost:10101/api/items/' + params.id);
            const responseData = await response.json();
            console.log("responseData", responseData)
            setProductInfo(responseData);
        }

        loadItem();
    }, [params])

    return productInfo !== '' ? (
        <Container fluid className='productDetailsPage'>
            <Row>
                <Col xs='1'></Col>
                <Col>
                <Categories categories={productInfo.categories}/>
                    <Row className='productBox'>
                        <Row>
                            <Col xs='7' className='productImage'>
                                <img src={productInfo.item?.picture} alt={productInfo.item?.description} />
                            </Col>
                            <Col xs='3'>
                                <Row>
                                    <Col className='conditionAndSoldAmount'>{productInfo.item?.condition.charAt(0).toUpperCase() + productInfo.item?.condition.slice(1)} - {productInfo.item?.sold_quantity} Vendidos</Col>
                                </Row>
                                <Row>
                                    <Col className='productTitle'>{productInfo.item?.title}</Col>
                                </Row>
                                <Row>
                                    <Col className='productPrice'>$&nbsp;{productInfo.item?.price.amount}<span className='productPriceDecimals'>{productInfo.item?.price.decimals}</span></Col>
                                </Row>
                                <Row>
                                    <Col className='purchaseButton d-grid gap-2'>
                                        <Button variant="primary">Comprar</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className='productDescription'>
                            <Row>
                                <Col className='productDescriptionTitle'>Descripcion del Producto</Col>
                            </Row>
                            <Row>
                                <Col className='productDescriptionAbout'>{productInfo.item?.description}</Col>
                            </Row>
                        </Row>
                    </Row>
                </Col>
                <Col xs='1'></Col>
            </Row>
        </Container>
    ) : ''
}

export default ProductDetails