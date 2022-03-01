import React, { useEffect, useState } from 'react'
import { Link,useParams,useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'

function ProductScreen() {

    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const productDetails = useSelector( state => state.productDetails)
    const {error,loading, product} = productDetails
    const {id} = useParams();
    let navigate = useNavigate();


    useEffect(() =>{
        dispatch(listProductDetails(id))
    }, [dispatch,id])

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }

    return (

        <div>
            <Link to='/' className='btn btn-dark my-3'>
                Go Back
            </Link>
            {
            loading ? <Loader /> : error ? <Message variant='danger' children={error} /> :

                (<Row>
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
                                            <strong>${product.price} m<sup>2</sup></strong>
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

                                {product.countInStock > 0 &&
                                (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col xs='auto' className='my-1'>
                                                <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)} >
                                                    {
                                                        [...Array(product.countInStock).keys()].map((x) => (
                                                            <option key={x+1} value={x+1}>
                                                                {x + 1}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )
                                }

                                <ListGroup.Item className="d-grid gap-2"> 
                                    <Button onClick={addToCartHandler} className='btn btn-lg btn-dark' disabled={product.countInStock === 0} type='button'>Add to Cart</Button>
                                </ListGroup.Item>

                            </ListGroup>
                        </Card>
                    </Col>
                </Row>)
            }
        </div>
    )
}

export default ProductScreen