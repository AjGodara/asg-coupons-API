const mongoose = require('mongoose');
const Schema = mongoose.schema;

var couponSchema = new Schema({
    //define Schema here
    name: {type: String, required: true},
    url: {type: String, required: true},
    companyName: String,
    startDate: Date,
    endDate: Date,
    tags: [String],
    clicks: [Date],
    views: [Date],
    redeems: [Date],
    postedBy: {type: Schema.ObjectId, required: true},
    approvedDate: [Date]
},
{
    toObject: {getters: true},
    timeStamps: {
        createdAt: 'createdDate',
        updatedAt: 'updatedDate'
    }
});

couponSchema.pre('save', function(callback){
    // run hook code
    if(!this.startDate){
        this.startDate = new Date();
    }
    callback();
});

var Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;