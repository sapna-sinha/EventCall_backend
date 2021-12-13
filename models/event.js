import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let EventForm = new Schema({
    name:{
        type: String,
        required: [true, 'Please add name required'],
        trim:true
    },
    email: {
        type: String,
        required: [true, 'Please add email required'],
        trim:true
    },
    organisation: {
        type: String,
        required: [true, 'Please add password required'],
        trim:true
    },
    description: {
        type: String,
        required: [true, 'Please add password required'],
        trim:true
    },
    link: {
        type: String,
        required: [true, 'Please add password required'],
        trim:true
    },
    poster: {
        type: String,
        // required: [true, 'Please add password required'],
        trim:true
    },
});


export default mongoose.models.EventForm || mongoose.model('events', EventForm);