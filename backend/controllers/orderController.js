const Order = require('../models/order');
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsynceErrors = require('../middlewares/catchAsyncErrors');

// Create a new order -> /api/v1/order/new
exports.newOrder = catchAsynceErrors( async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        order
    })
})

// Get single order -> /api/v1/order/:id
exports.getSingleOrder = catchAsynceErrors( async(req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(!order) {
        return next(new ErrorHandler('No order found with this id', 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

// Get logged in user orders -> /api/v1/orders/me
exports.myOrders = catchAsynceErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })

    res.status(200).json({
        success: true,
        orders
    })
})

// Get all orders -> /api/v1/admin/orders
exports.allOrders = catchAsynceErrors(async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

// Update/Process orders -> /api/v1/admin/order/:id
exports.updateOrder = catchAsynceErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if(order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400))
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status,
    order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true
    })
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock = product.stock - quanitty;

    await product.save({ validateBeforeSave: false })
}

// Delete order -> /api/v1/admin/order/:id
exports.deleteOrder = catchAsynceErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler('No order found with this id', 404))
    }

    await order.remove()

    res.status(200).json({
        success: true
    })
})