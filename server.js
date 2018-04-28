const express = require ('express');
const hbs = require ('hbs');
const fs = require ('fs');


let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

// app.use is how you declare middleware,it takes afunc
app.use((request,response,next)=>{
    let now = new Date().toString();
    let log = `${now}: ${request.method}:${request.url}:`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err){
            console.log('Unable to append to the file server.log');
        }
    });
    next();
});

app.use((req,res,next)=>{
    res.render('maintenance.hbs',{
        maintenance:'Under Construction...be back soon !',
        site:'the site is currently down'
    });
});

app.use(express.static(__dirname +'/public'));
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('Caps',(text)=>{
    return text.toUpperCase();
})
// make a handler to set up a GET request at the root (index page)
app.get('/',(request,response) => {
    // send response data back to client user
    // response.send("<h1>Responding with a Hello</h1>");
    response.render('home.hbs',{
        name: "Jozef",
        pageTitle:"Home Page",
        welcomeMessage:"You are Here! Welcome ",
        currentYear: new Date().getFullYear()
    })
});

app.get('/about',(request,response) => {
    response.render("about.hbs",{
        pageTitle: "About Page",
        currentYear: new Date().getFullYear()
    })
});

app.get('/bad',(request,response) => {
    response.send({
        error:"It all died!"
    })
})
app.listen(3000,()=>{
    console.log("Server Running and listening on Port 3000")
});