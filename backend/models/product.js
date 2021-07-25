const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [5, 'Product name cannot exceed 5 characters'],
        default: 0.0
    }, 
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: [true]
            },
            url: {
                type: String,
                required: [true]
            },
        }
    ],
    category: {
        type: String,
        required: [true, 'Please select a category for this product'],
        enum: {
            values:[
                'Small Plates',
                'Ramen',
                'Veggie Ramen',
                'Rice Dishes',
                'Additions',
                'Desserts'
            ],
            message: 'Please select the correct category for this product'
        }
    },
    seller: {
        type: String,
        required: [true, 'Pleases enter product seller']
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLenth: [5, 'Product number cannot exceeed 5']
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                requried: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);