const path = require("path");
const express = require('express');
const app = express();

app.use(express.json());

var options = {
    root: path.join(__dirname, '/public'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
};

app.get('/',(req,res)=>{
    res.sendFile("/index.html", options);
});
app.get('/index.html',(req,res)=>{
    res.sendFile("/index.html", options);
});
app.get('/images/mship.png',(req,res)=>{
    res.sendFile("/images/mship.png", options);
});
app.get('/images/ship.png',(req,res)=>{
    res.sendFile("/images/ship.png", options);
});
app.get('/images/rock.png',(req,res)=>{
    res.sendFile("/images/rock.png", options);
});
app.get('/images/tilt.png',(req,res)=>{
    res.sendFile("/images/tilt.png", options);
});
app.get('/css/w3.css',(req,res)=>{
    res.sendFile("/css/w3.css", options);
});
app.get('/js/game.js',(req,res)=>{
    res.sendFile("/js/game.js", options);
});
app.get('/game.html',(req,res)=>{
    res.sendFile("/game.html", options);
});
app.get('/goodbye.html',(req,res)=>{
    res.sendFile("/goodbye.html", options);
});
app.get('/you-won.html',(req,res)=>{
    res.sendFile("/you-won.html", options);
});
app.get('/tie.html',(req,res)=>{
    res.sendFile("/tie.html", options);
});

var matches = [];
var awaiting_match = null;
app.get('/api/addMatch/:player',(req,res)=>{
    //console.log(matches);
    if(awaiting_match === null) awaiting_match = parseFloat(req.params.player);
    else makeMatch(parseFloat(req.params.player));
    res.status(200);
    res.send("Success");
});

app.get("/api/match/:player_id", (req, res)=>{
    //console.log(matches);
    var playerid = req.params.player_id; //players have an arttribute called id, for example awaiting_match.id
    //console.log(playerid);
    let l;
    if ((l=contains(matches, playerid))!=-1) {
        res.status(200);
        res.send(JSON.stringify(matches[l]));
    }else{
        res.status(200);
        res.send("{}");
    }
});


function makeMatch(player_2){
    matches.push({
            player_one: awaiting_match,
            player_two: player_2,
            id: Math.random()
    });
    awaiting_match = null;
}
app.get('/api/submitResults/:player/:result',(req,res)=>{
    var match = matches[contains(matches, parseFloat(req.params.player))];
    if(match.player_one == parseFloat(req.params.player)){
        match.result_1 = parseInt(req.params.result);
        if(!!match.result_2){
            if(match.result_1 < match.result_2){
                res.send("WIN");
                return;
            }else if(match.result_2 < match.result_1){
                res.send("LOSS");
                return;
            }else{
                res.send("TIE");
                return;
            }
        }else{
            res.send("AWAIT");
            return;
        }
    }else{
        match.result_2 = parseInt(req.params.result);
        if(!!match.result_1){
            if(match.result_2 < match.result_1){
                res.send("WIN");
                return;
            }else if(match.result_1 < match.result_2){
                res.send("LOSS");
                return;
            }else{
                res.send("TIE");
                return;
            }
        }else{
            res.send("AWAIT");
            return;
        }
    }
});
app.get('/api/submitResults/:player',(req,res)=>{
    var match = matches[contains(matches, parseFloat(req.params.player))];
    if(match.player_one == parseFloat(req.params.player)){
        if(!!match.result_2){
            if(match.result_1 < match.result_2){
                res.send("WIN");
                return;
            }else if(match.result_2 < match.result_1){
                res.send("LOSS");
                return;
            }else{
                res.send("TIE");
                return;
            }
        }else{
            res.send("AWAIT");
            return;
        }
    }else{
        if(!!match.result_1){
            if(match.result_2 < match.result_1){
                res.send("WIN");
                return;
            }else if(match.result_1 < match.result_2){
                res.send("LOSS");
                return;
            }else{
                res.send("TIE");
                return;
            }
        }else{
            res.send("AWAIT");
            return;
        }
    }
});
function contains(arr, ele) {
    for (let i = 0; i < arr.length; i++) {
        if (ele==arr[i].player_one || ele==arr[i].player_two) {
            return i;
        }
    }
    return -1;
}

var player_locations = {};
app.get('/api/postLocation/:player/:x/:y',(req,res)=>{
    player_locations[req.params.player+""] = {x: req.params.x, y: req.params.y};
    res.send("");
});
app.get('/api/getLocation/:player/',(req,res)=>{
    //console.log(player_locations);
    res.send(JSON.stringify(player_locations[translate(parseFloat(req.params.player))+""]));
});
function translate(player){
    for (let i = 0; i < matches.length; i++) {
        if (player==matches[i].player_one) {
            return matches[i].player_two;
        }
        if (player==matches[i].player_two) {
            return matches[i].player_one;
        }
    }
    return -1;
}

console.log(process.env.PORT || 8080, process.env.HOST || "0.0.0.0");
app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", () => console.log(`App listening!`));