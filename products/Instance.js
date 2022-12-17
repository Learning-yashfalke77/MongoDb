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

// ----------------------------------------------------------- Instance Methods ----------------------------------------------------
// Lives on individual instances of model
// Here this refers to instance of that model

productSchema.methods.greet = function () {
    console.log(`Hello bettaaaa ${this.name}`);
    return this.save
}

productSchema.methods.sale = function () {
    this.onSale = ! this.onSale
    return this.save()
}

productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat)
    return this.save()
}

// ---------------------------------------------------------- Static methods ------------------------------------------------------
// Lives on models not on instance
// Here this refers to that model
// It does not deal with on eproduct deals with the entire product and etc

productSchema.statics.fireSale = function () {
    return this.updateMany({}, {onSale: true, price: 0})
}

const Product = mongoose.model('Product', productSchema)

// Acess That Method : Way1
// const p = new Product({ name: 'Bike', price: 1000, onSale: true, categories: ['Bike', 'Motorbike'], qty: { online: 17, inStore: 20 }, size: 'M' });
// p.save()

// Acess That Method : Way2
const findProduct = async function () {
    const product = await Product.findOne({ name: 'bike' })
    // console.log(product);
    // await product.sale()
    // console.log('Product found')
    await product.addCategory('Motor')
    console.log('Added Category')
}

Product.fireSale()

findProduct()
