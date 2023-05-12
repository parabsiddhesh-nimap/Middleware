const express = require("express");
const os = require("os");
const data = require("./MOCK_DATA.json")

const app = express();
const Port = 3001;

const osVersion = os.version();
const chkForWindows = os.type();

//Inbuilt Middleware for Parsing Body
app.use(express.urlencoded({extended : false}));

//Middleware 
app.use((req,res,next) => {
    console.log('Hello from Middleware 1');
    
    //Insert a key value pair in req in middleware
    req.body.systemVersion = chkForWindows;
    req.body.osVersion = osVersion;
    console.log('req.body: ',req.body );

    if(chkForWindows !== 'Windows_NT') res.status(400).json({"Error" : "User does not use Windows"});
    if(osVersion === "Windows 10 Pro" 
    ||  osVersion === "Windows 10" 
    || osVersion === "Windows 8" 
    || osVersion === "Windows 7") next(); 
});


//route to get all users
app.get("/api/allUsers",(req,res) => {
    res.json(data);
});


app.get("/api/users/:id",(req,res) => {
    let userid = req.params.id;
    let userData;
    if (userid > data.length) res.status(400).json({"Error" : "UserId Does not Exist"});
    for(let user in data) {
        if (userid == data[user].id) {
            userData=data[user]; 
            break; 
        }
    }
    res.json(userData);
});


app.listen(Port);