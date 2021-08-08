import React, { Fragment, useState, useEffect } from 'react'
import { Carousel } from 'react-bootstrap'

import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, clearErrors } from '../../actions/productActions'
import { addItemToCart } from '../../actions/cartActions'

const ProductDetails = ({ match }) => {


    const [quantity, setQuantity] = useState(1)

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, product } = useSelector(state => state.productDetails)

    useEffect(() => {
        dispatch(getProductDetails(match.params.id))

        if(error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error, match.params.id])

    const addToCart = () => {
        dispatch(addItemToCart(match.params.id, quantity));
        alert.success('Item added to the Cart')
    }

    const increaseQty = () => {
        const count = document.querySelector('.count')

        if(count.valueAsNumber >= product.stock) return;

        const qty = count.valueAsNumber + 1;
        setQuantity(qty)
    }

    const decreaseQty = () => {
        const count = document.querySelector('.count')

        if (count.valueAsNumber <= 1) return;

        const qty = count.valueAsNumber - 1;
        setQuantity(qty)
    }

    return (
        <Fragment>
        {loading ? <Loader /> : (
            <Fragment>
                <MetaData title={product.name} />
            <div className="row f-flex justify-content-around">
                <div className="col-12 col-lg-5 img-fluid" id="product_image">
                    <Carousel>
                        {product.images && product.images.map(image => (
                            <Carousel.Item key={image.public_id}>
                                <img className="d-block w-100" src={image.url} alt={product.title}/>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>

                <div className="col-12 col-lg-5 mt-5">
                    <h3>{product.name}</h3>
                    {/* <p id="product_id">Product # {product._id}</p> */}

                    <hr />

                    <p id="product_price">${product.price}</p>
                    <div className="stockCounter d-inline">
                                <span className="btn btn-outline-danger minus" onClick={decreaseQty}>-</span>

                        <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                <span className="btn btn-outline-success plus" onClick={increaseQty}>+</span>
                    </div>
                    <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={product.stock === 0} onClick={addToCart} >Add to Cart</button>

                    <hr />

                    <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redcolor'}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                    <hr />

                    <h4 className="mt-2">Description:</h4>
                    <p>{product.description}</p>
                    <hr />
                </div>
            </div>
            </Fragment>
        )}
        </Fragment>
        
    )
}

export default ProductDetails
