const express =  require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https =require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const data ={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname,
                }
            }
        ] 
    }
    const jsonData = JSON.stringify(data);

    const url ="https://us14.api.mailchimp.com/3.0/lists/e977f5b5da";
    const option ={
        method:"POST",
        auth:"kanha:afc07dfb6104fa2f722d47b50e3f4c59-us14"
    }

   const request= https.request(url,option,function(response){
    if (response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }





        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    // request.write(jsonData);
    request.end();
})


app.post("/failure",function(req,res){
    res.redirect("/");

})
app.listen(process.env.PORT||3000,function(){
    console.log("live on server 3000");
});






// api key : afc07dfb6104fa2f722d47b50e3f4c59-us14
// audience key :e977f5b5da