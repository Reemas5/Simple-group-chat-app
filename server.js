const {log} = require('console')
const express = require('express');
const fs  = require('fs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/login',(req,res)=>{
    fs.readFile('username.txt',(err,data)=>{
        if (err){
            console.log(err);
            data = 'No chat exists'
        }
        res.send(`${data}<form action= "/login" method ="POST" onsubmit="localStorage.setItem('username', document.getElementById('username').value)" >
            <label for="username">username</label>
            <input type="text" id="username" name="username">
            <button type="submit">login</button></form>`);
            
   })
})
    
app.post('/login',(req,res)=>{
    const {username} = req.body;
     res.send(`<form action="/" method="POST">
        <input type="hidden" name="username" value="${username}">
        <label for="message">Message</label>
        <input type="text" name="message" id="message">
        <button type="submit">Send</button>
    </form>`);
});


app.post('/', (req, res) => {
    const { username, message } = req.body;
    fs.writeFile('username.txt', `${username}:${message}\n`, {flag:"a"},(err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error saving the message');
        } else {
            res.redirect('/login');  
        }
    });
});



  

const port =2000
app.listen(port,()=>{
    console.log('server is running')
});