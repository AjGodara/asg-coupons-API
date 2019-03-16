const mongoose = require('mongoose');
const Schema = mongoose.schema;

var userSchema = new Schema({
    // define schema here
    firstName: String,
    lastName: String,
    address: String,
    classYear: Number,
    email: String,
    phone: String,
    phoneProvider: String,
    userName: String,
    isAdmin: boolean,
    isSuperAdmin: boolean,
    hash: String,
    companyName: String,
    interests: [String],
    timeSpent: Number
},
{
    toObject: {getters: true},
    timeStamps: {
        createdAt: 'createdDate',
        updatedAt: 'updatedDate'
    }
});

//run this code before putting the object into the database
userSchema.pre('save', function(callback){
    //hook code
    if(this.isAdmin){
        if(!this.hash && !this.password){
            throw new Error('No Password/hash');
        }
        this.hash = this.hash||this.password;
        //TODO: hash the pw

    }else{
        if(!this.phone){
            throw new Error('Missing phone number!');
        }

        //TODO: Check that it actually is a phone number

        if(!this.phoneProvider){
            throw new Error('Missing phone provider!');
        }

    }

    callback();
});

userSchema.methods.greet = function(){
    console.log('hi' + this.firstName);
};

//TODO: Check the hashed password
userSchema.methods.checkPassword = function(pw){
    return (pw === this.hash);
}

var user = mongoose.model('User', userSchema);

module.exports = user;
