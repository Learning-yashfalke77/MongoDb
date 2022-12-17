const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/realtionshipDemo')
    .then((result) => {
        console.log('Connection Open')
    }).catch((err) => {
        console.log('Oh no some error')
        console.log(err)
    });

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    // One to few Realtionships
    address: [
        {
            _id: {id: false},    //mongo also creates a id for address to turn see up
            street: String,
            city: String,
            state: String,
            country: {
                type: String,
                required: true,
            }
        }
    ]
})

const User = mongoose.model('User', userSchema)

const makeUser = async() => {
    const u = new User({
        first: 'Harry',
        last: 'Putter'
    })
    u.address.push({
        street: '123 Sesame St.',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    })
    const res = await u.save()
    console.log(res);
}

// Add the address
const addAddress = async (id) => {
    const user = await User.findById(id)
    user.address.push({
        street: '321 sameSe St.',
        city: 'New Mumbai',
        state: 'Y',
        country: 'U'
    })
    const res = await user.save()
    console.log(res);
}

addAddress('61403e41ec26c9987ac5ba5c')

makeUser()
