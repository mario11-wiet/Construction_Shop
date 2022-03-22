import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Product({ product }) {
  return (
    <Card className='my-3 p-2 rounded'>
        <Link to={`/products/${product._id}`} className='zooming'>
            <Card.Img src={product.image} style={{objectFit:'cover', height:'200px'}}></Card.Img>
        </Link>

        <Card.Body>
             <Link to={`/product/${product._id}`} className='text'>
                <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text as="div">
                <div className='my-3'>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#fcd703'} />
                </div>
            </Card.Text>

            <Card.Text>
                ${product.price} m<sup>2</sup>
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product