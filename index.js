const con = require ('./db');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

var db = require('./db');
app.use(bodyParser.json());
app.use(cors());

app.get('/api/clubs', function(request, response, query){
        const {email} = request.query
    console.log(email);
     con.query('SELECT  tbl_users.name , tbl_users.email, tbl_clubs.typeOfClub, tbl_clubs.county, tbl_clubs.town, tbl_clubs.clubName FROM tbl_clubAdmins JOIN tbl_users ON tbl_users.userId = tbl_clubAdmins.userId JOIN tbl_clubs ON tbl_clubs.clubId = tbl_clubAdmins.clubId WHERE tbl_users.email = ?', [email],
    function(error, results){
        if ( error ){
            response.status(400).send('Error in database operation');
        } else {
            response.send(results);
            console.log(results)
        }
    });
});


app.get('/api/countClubs', function(request, response){
    con.query('SELECT * FROM tbl_clubs;', function(error, results){
        if ( error ){
            response.status(400).send('Error in database operation');

        } else {
            response.send(results);
        }
    });

});

app.get('/api/orderNumber', function(request, response){
    con.query('SELECT * FROM tbl_checkout ORDER BY checkout_id DESC LIMIT 1;', function(error, results){
        if ( error ){
            response.status(400).send('Error in database operation');

        } else {
            response.send(results);
        }
    });

});

app.get('/api/membershipNumber', function(request, response){
    con.query('SELECT * FROM tbl_membership ORDER BY membershipId DESC LIMIT 1;', function(error, results){
        if ( error ){
            response.status(400).send('Error in database operation');

        } else {
            response.send(results);
        }
    });

});

app.listen(4000, () => {
    console.log('listening on port 4000')
});