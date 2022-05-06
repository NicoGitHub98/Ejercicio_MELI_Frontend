import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './categories.css'

function Categories(props) {

    return (
        <Row className='categories'>
            <Col>
                {props.categories.map((category, index, array) => {
                    return <span key={index}>{index === array.length - 1 ? category : category + ' > '}</span>
                })}
            </Col>
        </Row>
    )
}

export default Categories