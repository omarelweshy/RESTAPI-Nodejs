const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    }, 
    phone: {
        type: Number,
        required: true,
        minlength: 3,
        maxlength: 20,
    }
}));

function ValidateCustomer(customer) {
    const schema = Joi.object({
        isGold: Joi.boolean().required(),
        name: Joi.string().min(3).required(),
        phone: Joi.number().min(3).required()
    });
    return schema.validate(customer)
};

exports.Customer = Customer;
exports.validate = ValidateCustomer;