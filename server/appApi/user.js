const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()
router.get('/',async(ctx)=>{
  ctx.body="这是用户操作首页"
})

router.post('/register',async(ctx)=>{
  console.log(ctx.request.body)
  const User = mongoose.model('User')
  let newUser = new User(ctx.request.body)
  
  console.log(newUser)
  await newUser.save().then(()=>{
      ctx.body={
          code:200,
          message:'注册成功'
      }
  }).catch(error=>{
      ctx.body={
          code:500,
          message:error
      }
  })
})

/*登录的实践*/
router.post('/login',async(ctx)=>{
  //得到前端传递过来的数据
   let loginUser = ctx.request.body
   let userName = loginUser.userName
   let password = loginUser.password
   //引入User的model
   const User = mongoose.model('User')
   await User.findOne({userName:userName}).exec().then(async(result)=>{
      if(result){
         //当用户名存在时，开始比对密码
         let newUser = new User()//因为是实例方法，所以要new出对象，才能调用
         await newUser.comparePassword(password,result.password).then((isMatch)=>{
            ctx.body={code:200,message:isMatch}
         }).catch(error=>{
             console.log(error)
             ctx.body={code:500,message:error}
         })
      }else{
        ctx.body={code:200,message:'用户不存在'}
      }
   }).catch(error=>{
       console.log(error)
       ctx.body={code:500,message:error}
   })
})

module.exports=router