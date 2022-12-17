const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/shopApp').then((result) => {
    console.log('Connection open')
}).catch((err) => {
    console.log(err)
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        maxlength: 20
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be minimum 0 ya dodo'],  //Creating our own error message
        default: 0,
    },
    onSale: {
        type: Boolean,
        default: false,
    },
    categories: [String],  //It should be array of Strings
    qty: {                 //Nested objects
        online: {
            type: Number,
            default: 0,
        },
        inStore: {
            type: Number,
            default: 0,
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']   // String should have S or M or L
    }

});

const Product = mongoose.model('Product', productSchema)

const bike = new Product({ name: 'Tire Pump', price: 19.50, onSale: true, categories: ['Cycling'], size: 'SM' })
bike.save()
    .then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });

// Since red is not defined in schema here it will show worked but in database the color would not be stored

// --------------------- Validations do not work on updation -----------------------------------------------------------------------
// We have to add a third argument of runValidators: true
Product.findOneAndUpdate({ name: 'tire pump' }, { price: 1 }, { new: true, runValidators: true })
    .then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });


