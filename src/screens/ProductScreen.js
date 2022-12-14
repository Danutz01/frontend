import React, { useEffect } from 'react';
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProductDetails } from '../actions/productActions';


const ProductScreen = ({match}) => {
    const dispatch = useDispatch()

    const productDetils = useSelector(state => state.productDetils)
    const { loading, error, product } = productDetils

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])

    return <>
        <Link className='btn btn-light my-3' to ='/' >Go Back</Link>
        { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Row>
            <Col>
                <Image src={product.image} alt={product.name} fluid/>
            </Col>
            <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                </ListGroup>
                <ListGroup.Item>
                    <Rating 
                        value={product.rating} 
                        text={`${product.numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>
                    Price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                    Description: {product.description}
                </ListGroup.Item>
            </Col>
            <Col>
                <Card>
                    <ListGroup variant='flush'>
                        
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
                                    {product.countInStock > 0 ?  'In Stock' : 'Out of Stock'} 
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button className='btn-block' type='Button' disabled={product.countInStock === 0}>
                                Add to cart
                            </Button>
                        </ListGroup.Item>

                    </ListGroup>
                </Card>
            </Col>
        </Row>
        )}
        
    </>
}

export default ProductScreen