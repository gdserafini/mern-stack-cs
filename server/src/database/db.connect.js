import mongoose from 'mongoose';

export const connectDB = function(){
    console.log('Connecting to data base...');

    mongoose.set('strictQuery', false);
    
    mongoose.connect(
        'mongodb+srv://root:%40Password123@cluster0.49niqow.mongodb.net/?retryWrites=true&w=majority',
        {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(() => console.log('Connected.'))
    .catch(error => console.log(error));

};