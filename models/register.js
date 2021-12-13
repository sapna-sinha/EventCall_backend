import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let Form = new Schema({
    name:{
        type: String,
        required: [true, 'Please add name required'],
        trim:true
    },
    email: {
        type: String,
        required: [true, 'Please add email required'],
        trim:true, 
        unique:true
    },
    password: {
        type: String,
        required: [true, 'Please add password required'],
        trim:true
    }
});


export default mongoose.models.Form	|| mongoose.model('details', Form);