var express = require('express')
var db = require('./db.js');
var port = process.env.PORT || 3008;
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var passwordHash = require('password-hash');
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', function(req, res)
{
    const PERSON = {
        email: req.body.email,
        pw: req.body.pw
    }
    db.logIn(PERSON, function(err, result)
    {
        res.json({
            error: err,
            result: result
        });
    });
});

app.post('/signUp', function(req, res)
{   
    const DATA = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        pw: req.body.pw,
        device_id: req.body.device_id,
        cloudActivated: req.body.cloudActivated,
    }
    db.signUp(DATA, function(err, result)
    {
       res.json({
           error: err,
           result: result
       });
    });
});

app.post('/recording', function(req,res)
{
    const DATA = {
        link: req.body.link,
        device_id: req.body.device_id
    }
    db.putRecording(DATA, function(err, result)
    {
        res.json({
            error: err,
            result: result
        });
    })
})

app.get('/devices', function(req, res)
{
    const EMAIL = req.body.email;
    db.getDevices(EMAIL, function(err, result)
    {
        res.json({
            error: err,
            result: result
        });
    });
});

app.get('/recording/:device_id', function(req, res)
{
    const DEVICE_ID = req.params.device_id;
    db.getRecordings(DEVICE_ID, function(err, result)
    {
        res.json({
            error:err,
            result: result
        });
    }); 
});

app.listen(port, () => console.log(`App listening on port ${port}!`));