const mongoose = require('mongoose')
const validator = require('validator')

const TourSchema = new mongoose.Schema({
    date:{
        type:String,
        required: true,
        trim : true,
        validate(value) {
            if (!validator.isDate(value)) {
                throw new Error('date is invalid (yyyy-mm-dd)')
            }
        }
    },
    duration:{
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error('duration must be a postive number')
            }
        }
    },
        price:{
            type: Number,
            required: true,
            validate(value) {
                if (value < 0) {
                    throw new Error('duration must be a postive number')
                }
            }
        },
    guideId:{
        type:String,
        required:true
    }
}, { timestamps: true }
);

const Tour = mongoose.model('Tour', TourSchema);

module.exports = Tour