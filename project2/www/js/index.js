//Created By Jaime Aughney
window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(/* function */ callback, /* DOMElement */ element){
        window.setTimeout(callback, 1000 / 60);
    };
})();

var b_canvas = document.getElementById("myCanvas");
b_canvas.width=window.innerWidth;
b_canvas.height=window.innerHeight;

//You must pass the string "2d" to the getContext() method for 2D drawing
var b_context = b_canvas.getContext("2d");
// b_context.fillRect(50, 25, 150, 100);   
var px= 250;
var py = 150;
var count =0;
var stop=true;
var dead=false;
var deathPositionX=0;
var deathPositionY=0;

var BackGround = document.createElement('img');  
BackGround.src = 'Underwater.jpg';

var eatingSound = new Audio('chomp2.wav');
var explosionSound = new Audio('bomb.wav');
var backingSound = new Audio('backing.wav');
//eatingSound.src='chomp.wav';


var draw = function(){
    b_context.clearRect(0,0, b_canvas.width,b_canvas.height);
    b_context.drawImage(BackGround,0,0,b_canvas.width,b_canvas.height);
    var text="Score "+Shark.score;
    b_context.font="italic 40px serif"; 
    b_context.fillStyle = "rgb(200, 2, 2)";
    b_context.fillText(text,b_canvas.width/2,40);   

};

var Shark = new (function(){  

    //attributes  
    this.posx=50;
    this.posy=50;
    this.score=0;
    this.boxX;
    this.boxY;
    this.shark= new Image();  
    this.shark.src = "shark.png";  
    actualFrame = 0;
    this.height=52;
    this.width=56;
    frameCount =0;

    //functions
    var frames = 14;   //sprite has 4 frames, but count starts from 0  


    this.draw = function ()
    {
        //debugger
        // if(px>this.posx&&px>this.posx+5){
        //     this.posx+=2;   
        // }
        // else if(px<this.posx&&px<this.posx-5){
        //     this.posx-=2;
        // }
        // if(py>this.posy&&py>this.posy+5){
        //     this.posy+=2;
        // }
        // else if(py<this.posy&&py<this.posy-5){
        //     this.posy-=2;
        // }
        this.posx=px;
        this.posy=py;
        b_context.drawImage(this.shark, this.width* actualFrame,0 , this.width, this.height,this.posx-this.width/2,this.posy-this.height/2, this.width, this.height); 
        this.boxX=this.posx-this.width/2;
        this.boxY=this.posy-this.height/2;
        b_context.beginPath();
        b_context.lineWidth="1";
        b_context.strokeStyle="blue";
        b_context.rect(this.boxX,this.boxY,this.width,this.height); 
        b_context.stroke();


        if (actualFrame == frames) {  
            actualFrame = 0;  
        } else {  
            if(frameCount==5){
                actualFrame++;  
                frameCount=0;
            }
        }  
        frameCount++;
    };

});
 var explosion = new (function(){

    this.explo = new Image();
    this.explo.src ='explo.png';
    this.posx=0;
    this.posy=0;
    this.score=0;
    this.boxX;
    this.boxY;
    this.actualFrameX = 0;
    this.actualFrameY=0;
    this.height=64;
    this.width=64;
    this.frameCount =0;
    this.frames = 4; 


    this.draw = function (x,y)
    {
        this.posx=x;
        this.posy=y;
        b_context.drawImage(this.explo, this.width* this.actualFrameX,this.height* this.actualFrameY , this.width, this.height,this.posx-this.width/2,this.posy-this.height/2, this.width, this.height); 
        this.boxX=this.posx-this.width/2;
        this.boxY=this.posy-this.height/2;
        

        if (this.actualFrameX > this.frames) {  
            this.actualFrameX = 0;
            this.actualFrameY+=1;  
        } 
        else {  
                if(this.frameCount==2){
                    this.actualFrameX++;  
                    this.frameCount=0;
                }
        }  

        if (this.actualFrameY>this.frames) {
            this.actualFrameY=0;
            this.actualFrameX=0;
        }
        this.frameCount++;
    };      

 });


var myFish =[];
var myMine =[];

function Fish(){   
    //attributes        
    this.x=Math.floor(Math.random()*901)+1000;
    this.y=Math.floor(Math.random()*401);
    this.boxX;
    this.boxY;
    this.height=50;
    this.width=50;
    this.fish = new Image();  
    this.fish.src = "fish.png"; 
    this.speed=Math.floor(Math.random()*10)+1;
    //functions         
    this.draw = function ()
    { 
        b_context.drawImage(this.fish, this.x,this.y);     
        if(this.x<0){
            this.x=Math.floor(Math.random()*901)+1000;
            this.y=Math.floor(Math.random()*451);
            this.boxY=this.y+this.height/2;
            this.speed=Math.floor(Math.random()*10)+1;
        }
        this.x-=this.speed;
        this.boxX=this.x+this.width/2;
        b_context.beginPath();
        b_context.lineWidth="1";
        b_context.strokeStyle="green";
        b_context.rect(this.x,this.y,this.width,this.height); 
        b_context.stroke();
        
    };     
};


function Mine(){   
    //attributes        
    this.x=Math.floor(Math.random()*901)+1000;
    this.y=Math.floor(Math.random()*401);
    this.width=50;
    this.height=48;
    this.mine = new Image();  
    this.mine.src = "mine.png";    
    this.speed=Math.floor(Math.random()*10)+1;
    //functions         
    this.draw = function ()
    { 
        b_context.drawImage(this.mine, this.x,this.y);     
        if(this.x<0){
            this.x=Math.floor(Math.random()*901)+1000;
            this.y=Math.floor(Math.random()*451);
            this.speed=Math.floor(Math.random()*10)+1;
        }
        this.x-=this.speed;
        b_context.beginPath();
        b_context.lineWidth="1";
        b_context.strokeStyle="red";
        b_context.rect(this.x,this.y,this.width,this.height); 
        b_context.stroke();
        
        
        
    };     
};
myFish.push(new Fish());
myFish.push(new Fish());
myFish.push(new Fish());
myFish.push(new Fish());
myFish.push(new Fish());
myFish.push(new Fish());
myFish.push(new Fish());
myFish.push(new Fish());
myFish.push(new Fish());
myFish.push(new Fish());

myMine.push(new Mine());
myMine.push(new Mine());
myMine.push(new Mine());
myMine.push(new Mine());
myMine.push(new Mine());
myMine.push(new Mine());
myMine.push(new Mine());
myMine.push(new Mine());

myMine.push(new Mine());



var update = function(){
    if (!stop) {
    draw();
    //backingSound.play();
    //backingSound.loop=true;
     for(this.i=0;this.i<myFish.length;this.i++){
       
        myFish[this.i].draw();
        
     }   
    for(this.i=0;this.i<myMine.length;this.i++){
        myMine[this.i].draw();
    }
    
    
    
    if (!dead) {
        Shark.draw();
        for(this.i=0;this.i<myFish.length;this.i++){
                             
            if (myFish[this.i].x< Shark.boxX + Shark.width  
                && myFish[this.i].x+ myFish[this.i].width  > Shark.boxX 
                && myFish[this.i].y < Shark.boxY + Shark.height 
                && myFish[this.i].y + myFish[this.i].height > Shark.boxY) {

                    eatingSound.currentTime=0;
                    eatingSound.play();
                    Shark.score+=1;
                    myFish[this.i].x=Math.floor(Math.random()*901)+1000;
                    myFish[this.i].y=Math.floor(Math.random()*451);       
            }
        }
    

    for(this.i=0;this.i<myMine.length;this.i++){
                         
        if (myMine[this.i].x< Shark.boxX + Shark.width  
            && myMine[this.i].x+ myMine[this.i].width  > Shark.boxX 
            && myMine[this.i].y < Shark.boxY + Shark.height 
            && myMine[this.i].y + myMine[this.i].height > Shark.boxY) {

                //explosionSound.play();
               // explosion.draw();
                //gameOver();
                deathPositionX=myMine[this.i].x+myMine[this.i].width/2;
                deathPositionY=myMine[this.i].y+myMine[this.i].height/2;
                myMine[this.i].x=Math.floor(Math.random()*901)+1000;
                myMine[this.i].y=Math.floor(Math.random()*451);       
                death();
                dead=true;
        
        }
    }
    };
    if (dead) {
         explosion.draw(deathPositionX, deathPositionY);
    };
     
    window.requestAnimFrame(update, document.body);
    }
    

};
function death(){

    var myVar=setTimeout(function () {gameOver()}, 800);
    explosionSound.play();
   
// function myTimer() {
//     var d = new Date();
//     document.getElementById("demo").innerHTML = d.toLocaleTimeString();
// }

}
function restart() {
 
    for(this.i=0;this.i<myFish.length;this.i++){
                         
       myFish[this.i].x=Math.floor(Math.random()*901)+1000;
       myFish[this.i].y=Math.floor(Math.random()*451);
 
    }
     for(this.i=0;this.i<myMine.length;this.i++){
                         
       myMine[this.i].x=Math.floor(Math.random()*901)+1000;
       myMine[this.i].y=Math.floor(Math.random()*451);
 
    }
   stop=false;
   dead = false;
     Shark.score=0;
     explosion.actualFrameX=0;
     explosion.actualFrameY=0;
    update();
  
}

b_canvas.addEventListener("mousemove", doMouseMove, false);

function doMouseMove(e) {

    px=e.pageX;
    py=e.pageY;
}

b_canvas.addEventListener( 'touchmove', doTouchMove, false );
function doTouchMove(event){

    event.preventDefault();
    px = event.targetTouches[0].pageX;
    py = event.targetTouches[0].pageY;
  
    
}

function gameOver() {
 
  $('#score').html(Shark.score);
  $('#game-over').show();
  stop=true;
  
}

$('.play').click(function() {
    $('#menu').hide();
   
   
    restart();

  
});
$('.exit').click(function() {
    $('#menu').show();
   
    $('#game-over').hide();
    stop=true;
  
  
  
});
$('.restart').click(function() {
  $('#game-over').hide();
  restart();
});
$('.credits').click(function() {
  $('#menu').hide();
  $('#credits').show();
  //$('#menu').addClass('credits');
});
$('.back').click(function() {
  $('#credits').hide();
  $('#menu').show();
  //$('#menu').removeClass('credits');
});
var app = {
    // Application Constructor
    initialize: function() {
       
        $('#main').show();
        $('#menu').addClass('main');
       
        $('#game-over').hide();
    
          
    }
    
};
app.initialize();

//  b_context.addEventListener('touchmove', function(event) {
//   event.preventDefault();
//    var touch = event.touches[0];
//    console.log("Touch x:" + touch.pageX + ", y:" + touch.pageY);
//    x=touch.pageX;
//    y=touch.pageY;

//  }, false);
// var app = {
//     // Application Constructor
//     initialize: function() {
//         this.bindEvents();
//     },
//     // Bind Event Listeners
//     //
//     // Bind any events that are required on startup. Common events are:
//     // 'load', 'deviceready', 'offline', and 'online'.
//     bindEvents: function() {
//         document.addEventListener('deviceready', this.onDeviceReady, false);
//     },
//     // deviceready Event Handler
//     //
//     // The scope of 'this' is the event. In order to call the 'receivedEvent'
//     // function, we must explicitly call 'app.receivedEvent(...);'
//     onDeviceReady: function() {
//         app.receivedEvent('deviceready');
//     },
//     // Update DOM on a Received Event
//     receivedEvent: function(id) {
//         var parentElement = document.getElementById(id);
//         var listeningElement = parentElement.querySelector('.listening');
//         var receivedElement = parentElement.querySelector('.received');

//         listeningElement.setAttribute('style', 'display:none;');
//         receivedElement.setAttribute('style', 'display:block;');

//         console.log('Received Event: ' + id);
//     }
// };

// app.initialize();