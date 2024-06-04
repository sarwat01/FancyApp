const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { roles } = require("../config/roles");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username required"],
    unique: true,
  },
  image: String,
  role: {
    type: String,
    enum: ["developer", "manager", "notification","createAgent","Agent-notification"],
    
    default: "manager",
  },
  password: {
    type: String,
    required: [true, "please provice a password"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  /* passwordConferm:{
    type:String,
    required:[true,'please conferm your password'],
    validate:function(el){
        return el === this.password
    }
} */

passwordCahngedAt:Date
});

userSchema.pre("save", async function (next) {
  //only run this fuction if password was actually modified
  if (!this.isModified("password")) return next();
  //hash the password with cost 12
  this.password = await bcrypt.hash(this.password, 12);

  /*
  delete passwordConferm
   this.passwordConferm = undefined
   */
  next();
});

userSchema.methods.correctPassowrd = async function (
  candidatePassowrd,
  userPassword
) {
  return await bcrypt.compare(candidatePassowrd, userPassword);
};

/* userSchema.methods.changedPasswordAfter = function (JWTTimestamp){
if(this.passwordCahngedAt){
console.log(this.passwordCahngedAt, JWTTimestamp);
}
return false
} */
const user = mongoose.model("User", userSchema);

module.exports = user;
