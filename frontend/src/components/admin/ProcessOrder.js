import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, updateOrder, clearErrors } from '../../actions/orderActions'
// import { DELETE_PRODUCT_RESET } from '../../constants/orderConstants'

const ProcessOrder = () => {
    return (
        <div>
            
        </div>
    )
}

export default ProcessOrder
