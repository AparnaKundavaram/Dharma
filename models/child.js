const Joi = require('joi');
const mongoose = require('mongoose');

const Children = mongoose.model('Children', new mongoose.Schema({
    cName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50    
    },
    cGender: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50
    },
    cAge: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50
    },
    cCity: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50
    },
    cBloodGroup: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50
    }
}));

function validateChild(child) {
    const schema = {
        cName: Joi.string().min(3).required(),
        cGender: Joi.string().min(2).required(),
        cAge: Joi.string().min(2).required(),
        cCity: Joi.string().min(3).required(),
        cBloodGroup: Joi.string().min(1).required()
    };

    return Joi.validate(child, schema);
}


exports.Children = Children;
exports.validate = validateChild;