const db = require('../../config/db');
const jwt = require('jsonwebtoken');


const get_api = {
  register : (req,res) =>{
    let serch_sql = "select user_id from user";

    db.query(serch_sql,(err,rows,fields)=>{

    console.log("register get url :",rows);

  })
  }
}

const post_api = {
   

    register: (req,res) =>{
      console.log(req.body);

        let sql = "INSERT INTO user VALUES (null,?, ?, ?, ?, ?, ?,?,?,?)";
        let one = 1;
        let name = req.body.name;
        let id = req.body.id;
        let email = req.body.email;
        let psword = req.body.psword;
        let address = req.body.address;
        let gender = req.body.gender;
        let date = req.body.date;
        
          let params = [gender,id,psword,email,date,null,address,one,name];

        db.query(sql,params, (err,rows,fileds) => {
          
        
          if(!err) {
          return res.json({ Register : true })
          }
          else if(err.code){
            return res.json({ Register : err.code })
          }
          else return res.json({ Register: false })
        })
    },

    login : (req,res) => {
      let login_sql ="select user_id, user_password  from user where user_id= ?";

      let id = req.body.id;
      let psword = req.body.password;
      let params_login = [id,psword] 
    
      
      db.query(login_sql,id,(err,data)=>{
        console.log(data[0]);
        // console.log(err);
       
        // res.json({ ok : "test"});
        
        if(data[0]){
          if(id === data[0].user_id && psword == data[0].user_password){

            const token = jwt.sign({id}, "jwtSecret", {
              expiresIn : 300,
              issuer : "admin",
            })

           
            return  res.json({auth : true, token : token , message : 'token create'})
          } 
          return res.json({ok : "password false"})
        }
        if(!data[0]){
          return res.json({ define : "no id"});
        }

        // 
        //   if(id === null) return res.json({ ok : "nope id"}) 
        //    else if(id === data[0].user_id){
            
        //    }


      })
    //   const pr = new Promise((resolve,reject)=>{
    //     db.query(login_sql,params_login ,(err,data) =>{
    //       if (data[0] !== undefined){
            
    //         resolve(data);
    //         // res.json(data);
    //         console.log("input data :",data[0].user_id);
          
    //       } else{
    //         reject(err);
    //         console.log("err massge :",err);
    //       }
    //     })
    //   })
      
    //   pr.then((resuit)=>{
    //     console.log('res data :',resuit[0].user_password);
    //     if(resuit[0].user_id !== null && resuit[0].user_password !== null){
    //       console.log('suceess')
    //       // const accessToken = sign({id: id},"important")
    //       return res.json({suceess : true});
    //     } 
    //   }, (reject)=> {
    //     console.log(reject)
    //     res.json({ suceess : false});
    //   })
    }
}

module.exports = {

    post_api,
    get_api,
}