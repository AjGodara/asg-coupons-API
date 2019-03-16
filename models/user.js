const mongoose = require('mongoose');
const Schema = mongoose.schema;

var userSchema = new Schema({
    // define schema here
},
{
    toObject: {getters: true},
    timeStamps: {
        createdAt: 'createdDate',
        updatedAt: 'updatedDate'
    }
});

userSchema.pre('save', function(callback){
    //hook code

    callback();
});

userSchema.methods.greet = function(){
    console.log('hi');
};

var user = mongoose.model('User', userSchema);

module.exports = Coupon;
