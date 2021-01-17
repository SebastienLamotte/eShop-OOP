const mongoose = require("mongoose");
try {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true, 
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
} catch (e) {
    console.log("connection to the database failed, check your internet connection")
}
