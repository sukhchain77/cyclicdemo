const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
async function ConnectDatabase(){
    const result = mongoose.connect(`mongodb+srv://sukhchain:sukh123@cluster0.migeq07.mongodb.net/?retryWrites=true&w=majority`);
    return result;
}
module.exports = ConnectDatabase ;