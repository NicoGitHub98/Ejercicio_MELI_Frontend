import { useSearchParams, useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import freeShippingIcon from '../../assets/ic_shipping.png'
import './product.css'

function Product(props) {

    const navigate = useNavigate();

    return (
        <Row key={props.product.id} className='product' onClick={() => { navigate('/items/' + props.product.id) }}>
            <Col xs='1' className='productPicture'>
                <img src={props.product.picture} alt={props.product.title + ' thumbnail'} width='180' />
            </Col>
            <Col xs='6' className='productDetails'>
                <Row>
                    <Col xs='auto' className='productPrice'>
                        {'$' + props.product.price.amount.toLocaleString()}<span className="decimals">{props.product.price.decimals}</span>
                    </Col>
                    <Col className='freeShipping'>
                        {props.product.free_shipping ? <img src={freeShippingIcon} width='18' alt="Free Shipping" /> : ''}
                    </Col>
                </Row>
                <Row className='productTitle'>
                    <Col>{props.product.title}</Col>
                </Row>
            </Col>
            <Col></Col>
            <Col>
                <Row className='location'>{props.product.location}</Row>
            </Col>
        </Row>
    )
}

export default Product