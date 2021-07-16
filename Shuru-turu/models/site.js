const mongoose = require('mongoose')

var SiteSchema = new mongoose.Schema({
        tourid: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Tour",
            required: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        country: {
            type: String,
            required: true,
            trim: true
        },
    }, { timestamps: true }
);

const Site = mongoose.model('Site', SiteSchema);

module.exports = Site
