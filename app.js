const express = require('express');

const app = express();

const fs = require('fs');

const bodyParser = require('body-parser');
const { log } = require('console');

app.use(bodyParser.urlencoded({extended:false}));

let username ;

app.get('/login',(req,res,next)=>{
    
    res.send('<form id="loginForm" action="/login" method="POST"><label for="username">USERNAME</label><br><input type="text" id="username" name="username"><br><br><button type="submit">login</button></form>');
    
    
    
});

app.post('/login',(req,res,next) => {
    username = req.body.username;
    res.send(`<script>
                localStorage.setItem("username", "${username}");
                location.href = "/";
              </script>`);
    
})

app.get('/',(req,res,next) => {
    // fs.readFile('message.txt', 'utf8', (err, data) => {
    //     if (err) {
    //         console.error('Error reading file:', err);
    //     } else {
    //         const messages = data.split('\n').filter(Boolean);
    //         const messageHTML = messages.map(message => `<p>${message}</p>`).join('');
    //         const formHTML = '<form method="POST"><p>Send Message</p><input type="text" id="message" name="message"><br><button type="submit">Send</button></form>';
    //         res.send(messageHTML + formHTML);
    //     }
    // });
    fs.readFile('message.txt','utf-8',(err,data) => {
        if(err){
            console.log(err);
        }
        else{
            const messages = data;
            console.log(messages);
            res.send(`<form method="POST"><p>Send Message</p><p>${data}</p><input type="text" id="message" name="message"><br><button type="submit">Send</button></form>`);
        }
    })
    // res.send(`<form method="POST"><p>Send Message</p><p>${data}</p><input type="text" id="message" name="message"><br><button type="submit">Send</button></form>`);      
                 
});

app.post('/',(req,res,next) => {
    const message = req.body.message;
    console.log(message,username);

    fs.appendFile('message.txt',`"${username}" : "${message}"  `,(err) => {
        if(err){
            console.log(err);
        }
        else{
            console.log('message saved to file');
        }
    });

    fs.readFile('message.txt','utf-8',(err,data) => {
        if(err){
            console.log(err);
        }
        else{
            const messages = data;
            console.log(messages);
            res.send(`<form method="POST"><p>Send Message</p><p>${data}</p><input type="text" id="message" name="message"><br><button type="submit">Send</button></form>`);
        }
    })

})



app.listen(3000);