const express = require('express');
const app = express();
const port = 3000;

const mongoose = require("mongoose")
const nameModel = require("./models/schema")



//fetch("./budget.json")

app.use('/', express.static('public'));

let url = 'mongodb://localhost:27017/budget'

app.get('/hello', (req, res) =>  {
    res.send('Hello World!');
});

app.get('/about',(req, res)=>{
    res.sendFile(__dirname+'/about.html');
});

//app.get('/budget',(req, res)=>{
//    res.sendFile(__dirname+'/budget.json');
//});


app.get('/budget',(req, res)=>{
    mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology:true})
    .then(()=>{
        console.log("Connect successful");
        nameModel.find({})
                   .then((data)=>{
                           console.log(data)
                           res.json(data)
                           res.send(data)
                            mongoose.connection.close();
        })
        .catch((connectionError)=>{
          console.log(connectionError)
    })
    })
    .catch((connectionError)=>{
        console.log(connectionError)
    })
});

app.post('/insert', (req,res)=>{
    console.log(req.body);
    let insertBudget={};
    insertBudget.title = req.body.title;
    insertBudget.budget = req.body.budget;
    insertBudget.color = req.body.color;
    mongoose.connect(url)
         .then(()=>{
             console.log("Connect successful")
             nameModel.insertOne(insertBudget)
                 .then((data)=>{
                     console.log("Insert successful")
                     mongoose.connection.close()
                     res.statusCode=202;
                 })
                 .catch(err =>{
                     console.log("Insert failed", err);

                 });
         });
})

app.listen(port, () => {
    console.log(`Serving at http://localhost:${port}`)
  });



  