const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Product = require('./models/products')

// ---------------------------------- Mongoose --------------

mongoose.connect('mongodb://localhost:27017/farmStand').then((result) => {
    console.log('Connection open')
}).catch((err) => {
    console.log(err)
});

// -------------------------------- html and ejs -----------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

// ---------------------------------- set post req settings ---------------------
app.use(express.urlencoded({ extended: true }))

// ----------------------------------- setting put/patch/delete req ---------------------
app.use(methodOverride('_method'))

//  --------------------------------------- for categories ---------------------------
const categories = ['fruit', 'vegetable', 'diary']

// -------------------------------------- routes ------------------------
// -------- show all product -------------
app.get('/products', async (req, res) => {
    const { category } = req.query
    if (category) {
        const products = await Product.find({ category: category })
        res.render('products/index', { products, category})
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }

})

//  ----------- create new product --------------------
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save()
    res.redirect(`/products/${newProduct._id}`)
})

// --------------- show one particular product ----------------

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/show', { product })
})

// --------------------- Update one product ----------
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/edit', { product, categories })
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    console.log(product);
    res.redirect(`/products/${product._id}`)
})

// ----------------------- delete product -0---------------s

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id)
    res.redirect('/products')
})



app.listen('8080', () => {
    console.log('App is listening on port 8080');
})
