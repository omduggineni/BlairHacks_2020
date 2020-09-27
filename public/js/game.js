var canvas = document.getElementById("the_canvas");
var ctx = canvas.getContext("2d");
var arrTotal = [[24, 120, 120], [29, 100, 100], [32, 80, 80]];
var arr = arrTotal[getParameterByName("level")];
var start = startTime();
class Spaceship{
    constructor(){
        this.width = 50;
        this.height = 76;
        
        this.srb = -1;
        
        this.x = canvas.width/2-this.width/2;
        this.y = 0;
        this.hp = arr[1];
        this.dx = 0;
        this.dy = 0;
        this.gravity = 1;
    }
    draw(ctx) {
        ctx.fillStyle = "#FF0000";
        var img = document.getElementById("ship");
        ctx.drawImage(img, this.x, this.y);
    }
    tick(canvas){
        if(keys[87] && this.srb == -1){
            this.srb = 400;
            this.dy += this.gravity;
            this.dy -= 1.5;
            this.srb--;
            this.x += this.dx;
            this.y += this.dy;
            if(this.y <= 0 && this.dy < 0){
                altitude++;
                //asters.push(new Asteroid());
                this.y = canvas.height-this.height;
                this.dy *= 0.75;
                check = true;
                checkY = true;
            }
        }else if(this.srb > 0){
            this.dy += this.gravity;
            this.dy -= 1.5;
            this.srb--;
            this.x += this.dx;
            this.y += this.dy;
            if(this.y <= 0 && this.dy < 0){
                altitude++;
                //asters.push(new Asteroid());
                this.y = canvas.height;
                this.dy *= 0.75;
                check = true;
                checkY = true;
            }
        }else{
            var check = false;
            var checkX = false;
            var checkY = false;
            if (keys[87] && this.srb != -1) {
                this.dy -= 1.1;
            }
            if (keys[65]) {
                this.dx -= 0.1;
            }
            if (keys[83] && this.srb != -1) {
                this.dy += 0.1;
            }
            if (keys[68]) {
                this.dx += 0.1;
            }
            if(this.x <= 0 && this.dx < 0) {
                this.dx = (-this.dx)*0.5;
                check = true;
                checkX = true;
            }
            if(this.x+this.width >= canvas.width && this.dx > 0) {
                this.dx = (-this.dx)*0.5;
                check = true;
                checkX = true;
            }
            if(this.y <= 0 && this.dy < 0){
                altitude++;
                asters.push(new Asteroid());
                this.y = canvas.height;
                this.dy *= 0.75;
                check = true;
                checkY = true;
            }
            if(this.y+this.height >= canvas.height-15 && this.dy > 0) {
                if(altitude == 0){
                    this.dy = (-this.dy)*0.5 - this.gravity*1.4;
                    check = true;
                    checkY = true;
                }else{
                    this.y = 0;
                    altitude--;
                    this.dy *= 0;
                    //asters.push(new Asteroid());
                }
            }
            if (!check) {
                this.dy += this.gravity;
            }
            if (!checkX) {
                this.x += this.dx;
            }
            if (!checkY) {
                this.y += this.dy;
            }
        }
    }
    hurt(harm){
        this.hp-=harm;
    }
}
class Asteroid {
    constructor() {
        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        this.group = false;
        this.angle = 0;
        if (Math.random() < 0.5) {
            this.group = true;
        }
        this.width = 23;
        this.height = 32;
    }
    draw(ctx) {
        ctx.fillStyle = "#FF0000";
        var img = document.getElementById("rock");
        ctx.drawImage(img, this.x, this.y);
    }
    tick(s) {
        if (!this.group) {
            this.angle = Math.random()*360;
            this.y+=2*Math.sin(this.angle);
            this.x+=2*Math.cos(this.angle);
            
        }else{
            this.angle = Math.random()*360;
            this.y+=2*Math.sin(this.angle);
            this.x+=2*Math.cos(this.angle);
            this.x+=(s.x-this.x)/100;
            this.y+=(s.y-this.y)/100;
        }
        var d_x = this.speed*Math.cos(this.angle+90);
        var d_y = this.speed*Math.sin(this.angle+90);
        if(this.x <= 0 && d_x < 0) {
            this.dx = (-this.dx)*0.8;
            check = true;
        }
        if(this.x+this.width >= canvas.width && this.dx > 0) {
            d_x = (-d_x)*0.8;
        }
        if(this.y <= 0 && d_y < 0){
            d_y = (-d_y)*0.8;
        }
        if(this.y+this.height >= canvas.height-15 && this.dy > 0) {
            d_y = (-d_y)*0.8 - this.gravity*1.4;
        }
        this.angle = Math.PI/180 * Math.atan2(d_y, d_x);
        this.speed = Math.sqrt(d_y*d_y+d_x*d_x);
    }


}
class TiltShip{
    constructor(){
        this.x = 5;
        this.y = 5;
        this.hp = arr[1];
        this.dx = 0;
        this.dy = 0;
        this.width = 76;
        this.height = 50;
        this.fuel = arr[2];
    }
    draw(ctx) {
        ctx.fillStyle = "#FF0000";
        var img = document.getElementById("tilt");
        ctx.drawImage(img, this.x, this.y);
    }
    tick(canvas) {
        if(keys[87] && this.fuel > 0) {
            this.dy--;
            this.fuel--;
        }
        if(keys[68] && this.fuel > 0) {
            this.dx++;
            this.fuel--;
        }
        if(keys[65] && this.fuel > 0) {
            this.dx--;
            this.fuel--;
        }
        if(keys[83] && this.fuel > 0) {
            this.dy++;
            this.fuel--;
        }
        if (this.x<0) {
            this.hp -= 5;
            this.x = 5;
            this.dx = -this.dx;
            return;
        }
        if (this.x+this.width>canvas.width) {
            this.hp -= 5;
            this.x = canvas.width-30-this.height;
            this.dx = -this.dx;
            return;
        }
        if (this.y<0) {
            this.hp -= 5;
            this.y = 5;
            this.dy = -this.dy;
            return;
        }
        if (this.y+this.width>canvas.height) {
            this.hp -= 5;
            this.y = canvas.height-30-this.height;
            this.dy = -this.dy;
            return;
        }
        this.x += this.dx;
        this.y += this.dy;
    }
}
class MotherShip{
    constructor(x, y){
        this.x = x;
        this.y = y;
        
        this.bounding_box_x = this.x-100;
        this.bounding_box_y = this.y-20;
        
        this.bounding_box_width = 351;
        this.bounding_box_height = 271;
        
        this.width = player.width+30;
        this.height = player.height+30;
    }
    draw(ctx){
        ctx.fillStyle = "#00FF00";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.globalAlpha = 1;
        var img = document.getElementById("mship");
        ctx.drawImage(img, this.bounding_box_x, this.bounding_box_y);
    }
}
class GhostShip{
    tick(){
        let ship = this;
        
        var req_1 = () => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "/api/postLocation/" + multi_player.player_id + "/" + player.x + "/" + player.y);
            xhr.onload = ()=>{
                //do nothing
            };
            xhr.onError = ()=>{}; //do nothing
            xhr.send();
        };
        req_1();
        
        var req_2 = () => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "/api/getLocation/" + multi_player.player_id + "/");
            xhr.onload = ()=>{
                let tmp = JSON.parse(xhr.responseText);
                ship.draw(ctx, tmp.x, tmp.y);
            };
            xhr.onError = ()=>{}; //do nothing
            xhr.send();
        };
        req_2();
    }
    draw(ctx, x, y){
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "#FF0000";
        var img = document.getElementById("ship");
        ctx.drawImage(img, x, y);
        ctx.globalAlpha = 1;
    }
}



var timeout = 0;
function resizeCanvas() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
        canvas.width = document.body.clientWidth;
        setTimeout(function() {
            canvas.height = document.body.clientHeight;
        }, 0);
    }, 200);
}
var multiplayer;
function getParameterByName(name) {
    let url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
multiplayer = getParameterByName("multiplayer") == "true";
window.onresize = resizeCanvas;
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

var checkOverlap = (l1x, l1y, r1x, r1y, l2x, l2y, r2x, r2y, s, a) => {
    if (l1x > r2x || l2x > r1x) { 
        return false; 
    } 
    if (s.height-l1y < a.height - r2y || a.height - l2y < s.height - r1y) { 
        return false; 
    } 
  
    return true;
};

//GAME LOOP
//
//
var player = new Spaceship();
var ghost_player = new GhostShip();
var altitude = 0;
var asters = [];
var old = -1;
var multi_player = {player_id: Math.random()};

//asters[asters.length] = (new Asteroid());
if(multiplayer){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/addMatch/"+multi_player.player_id);
    xhr.send();
    xhr.onload = function() {
        sendConfirmationRequest();
    };
    xhr.onerror = function() { // only triggers if the request couldn't be made at all
        alert(`Network Error`);
        window.location.reload();
    };
}else{
    gameLoop();
}

var game_loop;

function sendConfirmationRequest(){
    conjureScreen();
    var xhr2 = new XMLHttpRequest();
    xhr2.open("GET", "/api/match/" + multi_player.player_id);
    xhr2.onload = ()=>{
        if(!!JSON.parse(xhr2.responseText).id){
            gameLoop();
        }else{
            sendConfirmationRequest();
        }
    };
    xhr2.onError = sendConfirmationRequest;
    xhr2.send();
}

function gameLoop(){
    game_loop = setInterval(() => {
        if(Math.round(183/(0.25*(altitude+4))) == Infinity) ctx.fillStyle = "#000000";
        ctx.fillStyle = "#00" + Math.round(183/(0.25*(altitude+4))).toString(16) + Math.round(255/(0.25*(altitude+4))).toString(16);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(0,canvas.height-15,canvas.width*player.hp/100, 15);
        old = altitude;
        ctx.font = "70px Arial";
        ctx.fillText("Altitude: "+altitude, 10, 60, 200);
        
        player.tick(canvas);
        player.draw(ctx);
        
        /*
        if(multiplayer){
            ghost_player.tick();
        }
        //*/
        
        if (old<altitude) {
            for (let co = 0; co < asters.length; co++) {
                asters[co] = new Asteroid();
            }
        }
        for (let i = 0; i < asters.length; i++) {
            asters[i].tick(player);
            asters[i].draw(ctx);
        
            var over = checkOverlap(player.x, player.y, player.x+player.width, player.y+player.height,
            asters[i].x, asters[i].y, asters[i].x+asters[i].width, asters[i].y+asters[i].height, player, asters[i]);
            if (over) {
                player.hp-=19;
                asters.splice(i, 1);
                asters[asters.length] = (new Asteroid());
            }
        }
        player.tick(canvas);
        player.draw(ctx);
        //console.log(altitude);
        //console.log(player.hp);
        if (player.hp<=0) {
            clearInterval(game_loop);
            postResultsAndAwait(100000000);
            setTimeout(()=>{
                window.location.replace("goodbye.html");
            },500);
        }
    
        if(altitude > arr[0]-1){
            clearInterval(game_loop);
            round_3();
        }
    }, 34);
}



//KEYS
var keys = {};
window.onkeyup = function(e) { keys[e.keyCode] = false; };
window.onkeydown = function(e) { keys[e.keyCode] = true; };

var mothership;
var round_3 = () => {
    player = new TiltShip();
    mothership = new MotherShip(canvas.width-200, canvas.height-300);
    
    
    game_loop = setInterval(()=>{
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.globalAlpha = 0.2;
        mothership.draw(ctx);
        
        ctx.globalAlpha = 1;
        player.draw(ctx);
        player.tick(canvas);
        
        if(player.hp <= 0 || player.fuel<=0){
            postResultsAndAwait(100000000);
            setTimeout(()=>{
                window.location.replace("goodbye.html");
            },500);
        }
        
        if(player.x > mothership.x
                && player.y > mothership.y
                && player.x+player.width < mothership.x+mothership.width
                && player.y+player.height < mothership.y+mothership.height){
            clearInterval(game_loop);
            if(multiplayer){
                var elapsed = stopTime(start);
                postResultsAndAwait(elapsed);
            }else{
                window.location.replace("you-won.html?level=" + getParameterByName("level"));
            }
        }
    
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(0,canvas.height-15,canvas.width*player.hp/100, 15);
    
        ctx.fillStyle = "#00F0FF";
        ctx.fillRect(0,canvas.height-30,canvas.width*player.fuel/100, 15);
        
        collision_resolve(player, mothership);
    },33);
};

function collision_resolve(player, mothership){
    if(player.x + player.width > mothership.x
            && player.y > mothership.y
            && player.x+player.width < mothership.x+mothership.width
            && player.y+player.height < mothership.y+mothership.height){
        return;
    }else if(player.x+player.width > canvas.width-50 && player.y > mothership.bounding_box_y){
        player.x = canvas.width-50-player.width;
        player.dx *= -1;
    }else if(player.x+player.width < canvas.width-265 && player.y > mothership.bounding_box_y){
        player.x = canvas.width-265;
        player.dx *= -1;
    }else if(player.x+player.width < canvas.width-75 && player.x > canvas.width-265) {
        if(player.y > canvas.height - 200){
            player.hp -= 10;
            player.dy = -player.dy*0.8;
            player.y = canvas.height-200 - player.height - 5;
        }
        return;
    }else if(player.x+player.width > mothership.bounding_box_x
            && player.y > mothership.bounding_box_y 
            && player.y < mothership.bounding_box_y+mothership.bounding_box_height){
        player.hp -= 10;
        player.dx = -player.dx*0.8;
        player.x = mothership.bounding_box_x - player.width - 5;
    }else if(player.y+player.height > mothership.bounding_box_y 
            && player.x > mothership.bounding_box_x 
            && player.x < mothership.bounding_box_x+mothership.bounding_box_width){
        player.hp -= 10;
        player.dy = -player.dy*0.8;
        player.y = mothership.bounding_box_y - player.height - 5;
    }
}

function startTime(){
    return new Date();
}
function stopTime(date){
    return new Date()-date;
}

function conjureScreen() {
    ctx.fillText("LOADING . . .", canvas.width/2, canvas.length/2, 600);
}

function removeScreen() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}



function postResultsAndAwait(result){
    let xhr = new XMLHttpRequest();
    
    xhr.open("GET", "/api/submitResults/" + multi_player.player_id + "/" + result);
    xhr.onload = ()=>{
        if(xhr.responseText == "WIN"){
            window.location.replace("you-won.html?level=" + getParameterByName("level"));
        }else if(xhr.responseText == "LOSS"){
            window.location.replace("goodbye.html");
        }else if(xhr.responseText == "TIE"){
            window.location.replace("tie.html");
        }else if(xhr.responseText == "AWAIT"){
            awaitResults();
        }
    };
    xhr.onError = () => postResultsAndAwait(result);
    xhr.send();
}

function awaitResults(){
    let xhr = new XMLHttpRequest();
    
    xhr.open("GET", "/api/submitResults/" + multi_player.player_id);
    xhr.onload = ()=>{
        if(xhr.responseText == "WIN"){
            window.location.replace("you-won.html?level=" + getParameterByName("level"));
        }else if(xhr.responseText == "LOSS"){
            window.location.replace("goodbye.html");
        }else if(xhr.responseText == "TIE"){
            window.location.replace("tie.html");
        }else if(xhr.responseText == "AWAIT"){
            awaitResults();
        }
    };
    xhr.onError = () => awaitResults();
    xhr.send();
}