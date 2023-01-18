import mongoose from 'mongoose';

const stringConnectMongo = 'mongodb+srv://root:%40Password123@' +
    'cluster0.49niqow.mongodb.net/?retryWrites=true&w=majority';

const setUseMongo = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}

const messageConnecting = function(){
    console.log('Connecting to data base...');
};

const setStrict = function(){
    mongoose.set('strictQuery', false);
};

export const connectDB = function(){
    messageConnecting();
    setStrict();
    
    mongoose.connect(stringConnectMongo, setUseMongo)
        .then(() => console.log('Connected.'))
        .catch(error => console.log(error));

};