import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card} from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'
import { useParams } from 'react-router-dom'


function ProductScreen() {
    const params = useParams();
    const product = products.find((p) => p._id === params.id)

    return (
        <div>
            <Link to='/' className='btn btn-dark my-3'>
                Go Back
            </Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid style={{width:'100%' ,maxHeight:'50vh'}}></Image>
                </Col>

                <Col md={3}>
                    <ListGroup variant="cards">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#fcd703'} />
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>       

                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>                                               
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup variant="cards">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stack' : 'Out of Stack'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item className="d-grid gap-2"> 
                                <Button className='btn btn-lg btn-dark' disabled={product.countInStock === 0} type='button'>Add to Cart</Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ProductScreen