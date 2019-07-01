const mongoose = require('mongoose')  //引入Mongoose
const bcrypt = require('bcrypt') 
const Schema = mongoose.Schema       //声明Schema
let ObjectId = Schema.Types.ObjectId //声明Object类型
var SALT_WORK_FACTOR = 10;


//创建我们的用户Schema
const userSchema = new Schema({
  UserId :{type:ObjectId},
    userName : {unique:true,type:String},
    password : String,
    createAt:{type:Date, default:Date.now()},
    lastLoginAt:{type:Date, default:Date.now()}
},{
  collection:'user'  
})

/*踩坑：bcrypt版本的使用问题--3.0.6 和 2.0.1版本使用，高版本会出现报错，尚未查到解决办法*/

userSchema.pre('save', function(next){
  var user = this
  bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
      if(err) return next(err)
      bcrypt.hash(user.password,salt,function(err,hash){
          if(err) return next(err)
          user.password = hash
          next()
      })
  })
})

userSchema.methods = {
  //密码比对方法
  comparePassword:(_password,password)=>{
     return new Promise((resolve,reject)=>{
        bcrypt.compare(_password,password,(err,res)=>{
           if(!err) resolve(res)
           else reject(err)
        })
     })
  }
}

mongoose.model('User',userSchema)