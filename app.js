//JShint esversion6
const express=require('express');
const bodyParser=require('body-parser');
const request=require('request');

const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signUp.html");
})




app.post("/",function(req,res){
  var fn=req.body.fName;
  var ln=req.body.lName;
  var em=req.body.email;
  var data={
    members:[{
      email_address:em,
      status:"subscribed",
      merge_fields:{
        FNAME:fn,
        LNAME:ln
      }
    }]
  };
  var jd=JSON.stringify(data);
  var options={
    url:"https://${dc}.api.mailchimp.com/3.0/lists/{list}",
    method:"POST",
    headers:{
      "Authorization":"Hello ${api}"
    },
    body:jd
  }
  request(options,function(error,response,body){
  {
    if(error)
    {
      res.sendFile(__dirname+"/failure.html");
    }
    else if(response.statusCode===200)
    {
      res.sendFile(__dirname+"/success.html");
    }
  }});
});
app.post("/f",function(req,res){
  res.redirect("/");
});
app.listen(process.env.PORT||3000,function()
{
  console.log("Server running at port 3000");
});
//cc1dac69c40310c27d69faf9afbd1b70-us6
//d9fa676ba4
