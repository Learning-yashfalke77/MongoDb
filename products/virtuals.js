// We can aad extra properties to schema , which will not be present in schemmaaa
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/shopApp').then((result) => {
    console.log('Connection open')
}).catch((err) => {
    console.log(err)
});

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

// --------------------------------------------------------- virtuals -------------------------------
// personSchema.virtual('fullName').get(function () {
//     return `${this.first} ${this.last}`
// })

// ------------------------------------------------- Middleware --------------------------------------------------
// remove a user then also delete all its associated comments phots etc
personSchema.pre('save', async function () {
    console.log('pre saved');
    this.first = 'YOOO'
    this.last = 'Mama'
})

personSchema.post('save', async function () {
    console.log('post saved');
})

const Person = mongoose.model('Person', personSchema);

const p = new Person({first: 'Medha', last:'Falke'})
p.save()
// console.log(p.fullName);
