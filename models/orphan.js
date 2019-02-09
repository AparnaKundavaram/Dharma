const Joi = require('joi');
const mongoose = require('mongoose');

const Orphanage = mongoose.model('Orphanage', new mongoose.Schema( {
    oName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50 
    },
    oAddress: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50 
    },
    oRegNum: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50 
    },
    oStrength: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50 
    },
    oSponserNum: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50 
    }

}));

function validateOrphanHome(orphanHome) {
    const schema = {
        oName: Joi.string().min(3).required(),
        oAddress: Joi.string().min(10).required(),
        oRegNum: Joi.string().min(2).required(),
        oStrength: Joi.string().min(2).required(),
        oSponserNum: Joi.string().min(1).required()
    };

    return Joi.validate(orphanHome, schema);
}

exports.Orphanage = Orphanage;
exports.validate = validateOrphanHome;