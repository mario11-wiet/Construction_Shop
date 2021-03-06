import React, { useEffect } from 'react'
import { Link,useParams,useNavigate,useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'


function CartScreen() {

    const params = useParams();
    let navigate = useNavigate();

    const userlogin = useSelector(state => state.userLogin)
    const {userInfo} = userlogin
    
    const productId = params.id
    const location = useLocation()
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    console.log('cartItems:',cartItems)

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId,qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        userInfo ? navigate(`/shipping`) : navigate(`/register`)
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.lenght === 0 ? (
                    <Message variant='info'>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                ):
                (            
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product} >
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded className='zooming'></Image>
                                    </Col>
                                    <Col md={3} >
                                        <Link to={`/product/${item.product}`} className='text'>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>

                                    <Col md={3}>
                                        <Form.Control as="select" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))} >
                                                    {
                                                        [...Array(item.countInStock).keys()].map((x) => (
                                                            <option key={x+1} value={x+1}>
                                                                {x + 1}
                                                            </option>
                                                        ))
                                                    }
                                        </Form.Control>
                                    </Col>

                                    <Col md={1}>
                                        <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}><i className='fas fa-trash'></i></Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>SUBTOTAL ({cartItems.reduce((acc,item) => acc+item.qty,0 )}) ITEMS</h2>
                            ${cartItems.reduce((acc,item) => acc+item.qty*item.price,0 ).toFixed(2)}
                        </ListGroup.Item>

                        <ListGroup.Item className="d-grid gap-2">
                            <Button type='button' className='btn btn-lg btn-dark' disabled={cartItems.lenght === 0} onClick={checkoutHandler}>
                                Proceed to checkout
                            </Button>
                        </ListGroup.Item>         
                    </ListGroup>
                </Card>
            </Col>
        </Row>
  )
}

export default CartScreen