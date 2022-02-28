const db = require ("../startup/db");
  function GetUser(){db.query(getUser, [email], (err, result)=>{
    console.log(err);
    if (!result) return res.status(400).send("Invalid User Name and password.");
    res.send(result)
    // console.log("result",result[0].password)
    // user ={password: result[0].password,
    //   email:result[0].email,
    // name:result[0].name}
    // console.log("user",user)
    // return user
  }); }

  exports.GetUser = GetUser