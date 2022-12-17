const mongoose = require('mongoose')
const { Schema } = mongoose
mongoose.connect('mongodb://localhost:27017/realtionshipDemo')
    .then((result) => {
        console.log('Connection Open')
    }).catch((err) => {
        console.log('Oh no some error')
        console.log(err)
    });

// One to manyyyyyyyyyyyyyyyyyy  relationship
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter'],
    }
})

const Product = mongoose.model('Product', productSchema);

// Product.insertMany([
//     {name: 'Goddess Melon', price: 4.99, season: 'Summer'},
//     {name: 'Sugar Baby Watermelon', price: 4.99, season: 'Summer'},
//     {name: 'Asparagus', price: 3.99, season: 'Spring'},
// ])

const farmSchema = new mongoose.Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})

const Farm = mongoose.model('Farm', farmSchema);

// const makefarm = async() => {
//     const farm = new Farm({
//         name: 'Full Belly Farms',
//         city: 'Gunida, CA',
//     });

//     const melon = await Product.findOne({name: 'Goddess Melon'})
//     farm.products.push(melon)
//     const res = await farm.save()  //will store only product id
//     console.log(res);
// }

// const addProduct = async () => {
//     const farm = await Farm.findOne({name: 'Full Belly Farms'})
//     const watermelon = await Product.findOne({name: 'Sugar Baby Watermelon'})
//     farm.products.push(watermelon);
//     const res = await farm.save()
//     console.log(res);
// }

// addProduct()

const farm = Farm.findOne({ name: 'Full Belly Farms' })
    .populate('products')     //populate the products feild of farmschema means get aal the details of product which is connected to Product
    .then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    })

