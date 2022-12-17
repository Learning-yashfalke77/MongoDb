const mongoose = require('mongoose')
const { Schema } = mongoose
mongoose.connect('mongodb://localhost:27017/realtionshipDemo')
    .then((result) => {
        console.log('Connection Open')
    }).catch((err) => {
        console.log('Oh no some error')
        console.log(err)
    });

// One to bajilllion  relationship
const userSchema = new Schema({
    username: String,
    age: Number,
})

const TweetUser = mongoose.model('TweetUser', userSchema);


const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: {type: Schema.Types.ObjectId, ref: 'TweetUser'}
})

const Tweet = mongoose.model('Tweet', tweetSchema);

const makeTweets = async() => {
    // const u = new TweetUser({
    //     username: 'yashfalke77ms',
    //     age: 20
    // });

    // For updation
    const u  = await TweetUser.findOne({name: 'yashfalke77ms'})
    // console.log(u);

    const t2 = new Tweet({text: 'nice exe video bro', likes:1})
    t2.user = u

    // const res = await u.save()
    // console.log(res);
    const res1 = await t2.save()
    console.log(res1);

}

const findTweets = async() => {
    const t = await Tweet.findOne({}).populate('user')
    console.log(t);

    // Populate one feild of user
    const t1 = await Tweet.find({}).populate('user', 'username')
    console.log(t1);
}


findTweets()