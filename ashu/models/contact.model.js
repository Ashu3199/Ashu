const { mongoose } = require("mongoose");

const contactSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: false },
    email: { type: String, required: false },
    linkedId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', default: null },
    linkPrecedence: { type: String, enum: ['primary', 'secondary'], required: true },
    deletedAt: { type: Date, default: null },
} , 
{ timestamps: true }
);

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
