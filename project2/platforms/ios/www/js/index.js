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
//var score=0;


var shark = document.createElement('img');  
shark.src = 'shark.png';
var fish = document.createElement('img');  
fish.src = 'fish.png';
var mine = document.createElement('img');  
mine.src = 'mine.png';
var BackGround = document.createElement('img');  
BackGround.src = 'Underwater.jpg';




var showSprite=function()
{

    //b_context.drawImage(shark, x,y);


}

var draw = function(){
    b_context.clearRect(0,0, b_canvas.width,b_canvas.height);
    b_context.drawImage(BackGround,0,0,b_canvas.width,b_canvas.height);
    //var text="Score "+Shark.score; 
    var text="Score "+myFish[0].x; 
    b_context.font="italic 40px serif"; 
    b_context.fillStyle = "rgb(200, 2, 2)";
        b_context.fillText(text,40,40);   

};
window.onload=function()
{

    //this isn't called until after all the HTML elements are loaded
    showSprite ();
};

var Shark = new (function(){  

    //attributes  
    this.posx=50;
    this.posy=50;
    this.score=0;
    shark.image = new Image();  
    shark.image.src = "shark.png";  
    actualFrame = 0;
    height=52;
    width=56;
    frameCount =0;

    //functions
    var frames = 14;   //sprite has 4 frames, but count starts from 0  


    this.draw = function ()
    {
        //debugger
        if(px>this.posx&&px>this.posx+5){
            this.posx+=2;   
        }
        else if(px<this.posx&&px<this.posx-5){
            this.posx-=2;
        }
        if(py>this.posy&&py>this.posy+5){
            this.posy+=2;
        }
        else if(py<this.posy&&py<this.posy-5){
            this.posy-=2;
        }
        b_context.drawImage(shark, width* actualFrame,0 , width, height,this.posx-width/2,this.posy-height/2, width, height); 

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

var myFish =[];
var myMine =[];

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




function Fish(){   
    //attributes        
    this.x=Math.floor(Math.random()*901)+1000;
    this.y=Math.floor(Math.random()*401);
    this.image = new Image();  
    this.image.src = "fish.png"; 
    this.speed=Math.floor(Math.random()*10)+1;
    //functions         
    this.draw = function ()
    { 
        b_context.drawImage(this.image, this.x,this.y);     
        if(this.x<0){
            this.x=Math.floor(Math.random()*901)+1000;
            this.y=Math.floor(Math.random()*451);
            this.speed=Math.floor(Math.random()*10)+1;
        }
        this.x-=this.speed;
        
    };     
};


function Mine(){   
    //attributes        
    this.x=Math.floor(Math.random()*901)+1000;
    this.y=Math.floor(Math.random()*401);
    this.image = new Image();  
    this.image.src = "mine.png";    
    this.speed=Math.floor(Math.random()*10)+1;
    //functions         
    this.draw = function ()
    { 
        b_context.drawImage(this.image, this.x,this.y);     
        if(this.x<0){
            this.x=Math.floor(Math.random()*901)+1000;
            this.y=Math.floor(Math.random()*451);
            this.speed=Math.floor(Math.random()*10)+1;
        }
        this.x-=this.speed;
        
        
    };     
};




var update = function(){
    draw();
    
    
    for(this.i=0;i<myFish.length;i++){
        myFish[i].draw();
    }   
    for(this.i=0;i<myMine.length;i++){
        myMine[i].draw();
    }
    Shark.draw();
    debugger
    for(this.i=0;i<myFish.length;i++){
        if(Shark.posx>myFish[i].x&&Shark.posx<myFish[i].x+myFish[i].width){
            if(Shark.posy>myFish[i].x&&Shark.posy<myFish[i].y+myFish[i].height){
                Shark.score+=20;
                myFish[i].x=Math.floor(Math.random()*901)+1000;
                myFish[i].y=Math.floor(Math.random()*451);
            }
            
        }
    }
    window.requestAnimFrame(update, document.body);

};


window.requestAnimFrame(update, document.body);


window.addEventListener('keydown', function(event) {
    if (event.keyCode === 37) 
    {
        px--;    

    }
    if (event.keyCode === 39) {

        px++;   
    }
    if (event.keyCode === 38) {

        py--;
    }
    if (event.keyCode === 40) {
        py++;
    }  
}, false);

//  windowg5.addEventListener( 'touchstart',function(event){
//window.addEventListener( 'touchstart', onTouchStart, false );

b_canvas.addEventListener("mousedown", halmaOnClick, false);

function halmaOnClick(e) {

    px=e.pageX;
    py=e.pageY;
}

//b_context.addEventListener( 'touchstart', onTouchStart, false );
//function onTouchStart(event) {
//do stuff


//}


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