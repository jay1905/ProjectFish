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
b_canvas.width=window.screen.width;
b_canvas.height=window.screen.height;
var b_context = b_canvas.getContext("2d");
b_context.font="italic 40px serif"; 
b_context.fillStyle = "rgb(200, 2, 2)";
var px= 150;
var py = 150;
var count =0;
var stop=true;
var dead=false;
var deathPositionX=0;
var deathPositionY=0;
var myFish =[];
var myMine =[];
var fishDeathAnnimation=[];
var backgroundObjects=[];
var text; 
var tutorialOn=true;


var draw = function(){
    b_context.clearRect(0,0, b_canvas.width,b_canvas.height);
    b_context.fillStyle = "rgb(0, 200, 255)";
    b_context.fillRect(0,0,b_canvas.width,b_canvas.height);
    b_context.fillStyle= "rgb(244,164,96)";
    b_context.fillRect(0,b_canvas.height/1.25,b_canvas.width,b_canvas.height);
   
 
    b_context.fillStyle = "rgb(240, 240, 240)";
    text=Shark.score;
    b_context.fillText(text,b_canvas.width/2,40);   
};
var backgroundObj =  function(text){
	this.backObject = new Image();
	if(text==0){
		this.backObject.src='redPlant.png';
	}
	else if(text ==1){
		this.backObject.src='greenPlant.png';
	}
	else if(text==2){
		this.backObject.src='pinkPlant.png';
	}
	else{
		this.backObject.src='starFish.png';
	}
	this.speed=4;
	this.minY=b_canvas.height/1.4;
	this.maxY=b_canvas.height;
	this.x=Math.floor(Math.random()*901)+b_canvas.width;
	this.y=Math.floor(Math.random()*(this.maxY-this.minY))+this.minY;
  	
	this.draw = function(){

        b_context.drawImage(this.backObject, this.x,this.y);     
        
        this.x-=this.speed;
       
	};
};
var Hand = new (function(){  

    this.handImage= new Image();
    this.handImage.src= 'hand.png';
    this.x=400;
    this.y=200;
    this.draw = function(){
        b_context.drawImage(this.handImage, this.x,this.y,100,200);     
    };
    this.update= function(){
        this.x = px-this.handImage.width/3;
        this.y=py;
        this.draw();
    };
});
var Tutorial = new (function(){
    this.direction=true;
    this.update= function(){
        
        b_context.fillStyle= "rgba(0,0,0,0.5)";
        b_context.fillRect(0,0,b_canvas.width,b_canvas.height);
        Hand.update(); 
        if (this.direction==true)
        {
            if(py>100){
                py-=2;
            }
            else{
                this.direction=false;
            }
        } 
        else if(this.direction==false){
             if(py<300){
                py+=2;
            }
            else{
                this.direction=true;
            }
        }

    };
});
var Shark = new (function(){  

    //attributes  
    this.posx=50;
    this.posy=50;
    this.score=0;
    this.boxX;
    this.boxY;
    this.shark= new Image();  
    this.shark.src = "sharkSwimAnimation.png";  
    actualFrame = 0;
    this.height=40;
    this.width=60;
    frameCount =0;
    var frames = 15;   //sprite has x frames, but count starts from 0  
    //functions
    this.draw = function ()
    {
        
        this.posx=px;
        this.posy=py;
        b_context.drawImage(this.shark, this.width* actualFrame,0 , this.width, this.height,this.posx-this.width/2,this.posy-this.height/2, this.width, this.height); 
        this.boxX=this.posx-this.width/2;
        this.boxY=this.posy-this.height/2;

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
 	//attributes
    this.explo = new Image();
    this.explo.src ='explosion1.png';
    this.posx=0;
    this.posy=0;
    this.score=0;
    this.boxX;
    this.boxY;
    this.actualFrameX = 0;
    this.height=140;
    this.width=140;
    this.frameCount =0;
    this.frames = 9; 
    //functions
    this.draw = function (x,y)
    {
        this.posx=x;
        this.posy=y;
        b_context.drawImage(this.explo, this.width* this.actualFrameX,0, this.width, this.height,this.posx-this.width/2,this.posy-this.height/2, this.width, this.height); 
        this.boxX=this.posx-this.width/2;
        this.boxY=this.posy-this.height/2;
        if (this.actualFrameX ==this.frames) {  
            this.actualFrameX = 0;
        } 
        else {  
                if(this.frameCount==6){
                    this.actualFrameX++;  
                    this.frameCount=0;
                }
        }  
        this.frameCount++;
    };      
 });
 var fishDeath =  function(x,y){
 	//attributes
    this.deathAnnimationFish = new Image();
    this.deathAnnimationFish.src ='fishDeath.png';
    this.posx=x;
    this.posy=y;
    this.score=0;
    this.boxX;
    this.boxY;
    this.actualFrameX = 0;
    this.height=100;
    this.width=100;
    this.frameCount =0;
    this.frames = 5; 
    this.annimationOver=false;
    //functions
    this.draw = function ()
    {
        
        b_context.drawImage(this.deathAnnimationFish, this.width* this.actualFrameX,0, this.width, this.height,this.posx,this.posy, 32, 32); 
        this.boxX=this.posx-this.width/2;
        this.boxY=this.posy-this.height/2;
        if (this.actualFrameX ==this.frames) {  
        	this.annimationOver=true;
            this.actualFrameX = 0;
        } 
        else {  
                if(this.frameCount==4){
                    this.actualFrameX++;  
                    this.frameCount=0;
                }
        }  
        this.frameCount++;
    };      
 };


function Fish(){   
    //attributes        
    this.x=Math.floor(Math.random()*901)+b_canvas.width;
    this.y=Math.floor(Math.random()*b_canvas.height);
    this.boxX;
    this.boxY;
    this.height=32;
    this.width=32;
    this.fish = new Image();  
    this.fish.src = "fish2.png"; 
    this.speed=Math.floor(Math.random()*10)+1;
    this.actualFrame = 0;
    this.frames=3;
    this.frameCount =0;

    //functions         
    this.draw = function ()
    { 
        b_context.drawImage(this.fish, this.width* this.actualFrame,0 , this.width, this.height,this.x,this.y, this.width, this.height); 
        
        if(this.x<-50){
            this.x=Math.floor(Math.random()*901)+b_canvas.width;
            this.y=Math.floor(Math.random()*b_canvas.height);
            this.boxY=this.y+this.height/2;
            this.speed=Math.floor(Math.random()*10)+1;
        }
        this.x-=this.speed;
        this.boxX=this.x+this.width/2;
       
        if (this.actualFrame == this.frames) {  
            this.actualFrame = 0;  
        } 
        else {  
            if(this.frameCount==5){
                this.actualFrame++;  
                this.frameCount=0;
            }
        }  
        this.frameCount++;
        
    };     
};


function Mine(){   
    //attributes        
    this.x=Math.floor(Math.random()*901)+b_canvas.width;
    this.y=Math.floor(Math.random()*b_canvas.height);
    this.mine = new Image();
    this.mine.src = "Mine2.png";  
    this.speed=Math.floor(Math.random()*10)+1;
    
    var w=0;
    var h=0;
	this.mine.onload = function(){
		
  		h = this.height;
  		 w = this.width;
	}    
    this.draw = function ()
    { 
        b_context.drawImage(this.mine, this.x,this.y);     
        if(this.x<-100){
            this.x=Math.floor(Math.random()*901)+b_canvas.width;
            this.y=Math.floor(Math.random()*b_canvas.height);
            this.speed=Math.floor(Math.random()*10)+1;
        }
        this.x-=this.speed; 
    };     
};
for (var i = 0; i < 10; i++) {
	myFish.push(new Fish());
}
for (var i = 0; i < 10; i++) {
	myMine.push(new Mine());	
}

function backgroundManager(){

	if(Math.floor(Math.random()*100)==5){
		backgroundObjects.push(new backgroundObj(Math.floor(Math.random()*4)));
	}
	for (this.i=0;this.i<backgroundObjects.length;this.i++) {
	    
	    	backgroundObjects[this.i].draw();
	    
	}
	for(this.i=0; this.i<backgroundObjects.length;this.i++){
		
		if( backgroundObjects[this.i].x<-100){
	    	backgroundObjects.splice(this.i,1);

	    	//console.log(backgroundObjects.length);
	    }
	    
	}
}
var update = function(){
    if (!stop) {

        if(tutorialOn){
            draw();
            
            Shark.draw();
            Tutorial.update();

        }
        else{

    	    draw();
    	    backgroundManager();
           
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

    	                 
    	                   
    	                	window.plugins.NativeAudio.play('chomp2' );
    	                    Shark.score+=1;
    	                    fishDeathAnnimation.push(new fishDeath(myFish[this.i].x,myFish[this.i].y));
    	                    myFish[this.i].x=Math.floor(Math.random()*901)+b_canvas.width;
    	                    myFish[this.i].y=Math.floor(Math.random()*b_canvas.height);       
    	            }
    	        }
    		    for(this.i=0;this.i<myMine.length;this.i++){
    		        if (myMine[this.i].x< Shark.boxX + Shark.width  
    		            && myMine[this.i].x+ myMine[this.i].mine.width  > Shark.boxX 
    		            && myMine[this.i].y < Shark.boxY + Shark.height 
    		            && myMine[this.i].y + myMine[this.i].mine.height > Shark.boxY) {

    		                deathPositionX=myMine[this.i].x+myMine[this.i].mine.width/2;
    		                deathPositionY=myMine[this.i].y+myMine[this.i].mine.height/2;
    		                myMine[this.i].x=Math.floor(Math.random()*901)+b_canvas.width;
    		                myMine[this.i].y=Math.floor(Math.random()*b_canvas.height);       
    		                death();
    		                dead=true;
    		        
    		        }
    		    }
    	    };
    	    if(fishDeathAnnimation.length>0){
    	    	for(this.i=0;this.i<fishDeathAnnimation.length;this.i++){
    	    		if(fishDeathAnnimation[this.i].annimationOver==false){
    	    			fishDeathAnnimation[this.i].draw();
    	    		}
    	    		else{
    	    			fishDeathAnnimation.splice(this.i,1);
    	    		}
    	    	}


    	    };
    	    if (dead) {
    	        explosion.draw(deathPositionX, deathPositionY);
    	    };
	    }
	    window.requestAnimFrame(update, document.body);
    }
};
function death(){

    var myVar=setTimeout(function () {gameOver()}, 800);
     window.plugins.NativeAudio.play('bomb'); 

}
function restart() {
 
    for(this.i=0;this.i<myFish.length;this.i++){
                         
       myFish[this.i].x=Math.floor(Math.random()*901)+b_canvas.width;
       myFish[this.i].y=Math.floor(Math.random()*b_canvas.height);
 
    }
     for(this.i=0;this.i<myMine.length;this.i++){
                         
       myMine[this.i].x=Math.floor(Math.random()*901)+b_canvas.width;
       myMine[this.i].y=Math.floor(Math.random()*b_canvas.height);
 
    }
   stop=false;
   dead = false;
   px =150;
   py=150;
     Shark.score=0;
     explosion.actualFrameX=0;
     explosion.actualFrameY=0;
    update();
  
}

// b_canvas.addEventListener("mousemove", doMouseMove, false);

// function doMouseMove(e) {

//    // px=e.pageX;
//     //py=e.pageY;
// }

b_canvas.addEventListener( 'touchmove', doTouchMove, false );
function doTouchMove(event){

    event.preventDefault();
    if(event.targetTouches[0].pageX>Shark.posx- Shark.width/2 &&
        event.targetTouches[0].pageX< Shark.posx+Shark.width/2)
    {
         if(event.targetTouches[0].pageY>Shark.posy- Shark.height/2 &&
        event.targetTouches[0].pageY< Shark.posy+Shark.height/2)
         {
             px = event.targetTouches[0].pageX;
             py = event.targetTouches[0].pageY;
  
         }
    }
   
    
}

function gameOver() {
 
  $('#score').html(Shark.score);
  $('#game-over').show();
  stop=true;
  //showBannerFunc();
  
}

$('.play').click(function() {
    $('#menu').hide();
    $('#tutorial').show();
  $('#menu').addClass('tutorial');
   tutorialOn=true;
   //window.plugins.AdMob.destroyBannerView();
    restart();

  
});
$('.exit').click(function() {
    $('#menu').show();
   
    $('#game-over').hide();
    stop=true;
  
  
  
});
$('.restart').click(function() {
  $('#game-over').hide();
  //window.plugins.AdMob.destroyBannerView();
  restart();
});
$('.tutorial').click(function() {
  $('#menu').hide();
  $('#tutorial').show();
  $('#menu').addClass('tutorial');
});
$('.back').click(function() {
  $('#tutorial').hide();
  tutorialOn=false;
  //$('#menu').show();
  $('#menu').removeClass('tutorial');
});

//initialize the goodies 
// function initAd(){
//         if ( window.plugins && window.plugins.AdMob ) {
//             var ad_units = {
//                 ios : {
//                     banner: 'ca-app-pub-5362655013589543/1056359917',		//PUT ADMOB ADCODE HERE 
//                     interstitial: 'ca-app-pub-5362655013589543/2533093115'	//PUT ADMOB ADCODE HERE 
//                 },
//                 android : {
//                     banner: 'ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx',		//PUT ADMOB ADCODE HERE 
//                     interstitial: 'ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx'	//PUT ADMOB ADCODE HERE 
//                 }
//             };
//             var admobid = ( /(android)/i.test(navigator.userAgent) ) ? ad_units.android : ad_units.ios;
 
//             window.plugins.AdMob.setOptions( {
//                 publisherId: admobid.banner,
//                 interstitialAdId: admobid.interstitial,
//                 adSize: window.plugins.AdMob.AD_SIZE.SMART_BANNER,	//use SMART_BANNER, BANNER, LARGE_BANNER, IAB_MRECT, IAB_BANNER, IAB_LEADERBOARD 
//                 bannerAtTop: false, // set to true, to put banner at top 
//                 overlap: true, // banner will overlap webview 
//                 offsetTopBar: false, // set to true to avoid ios7 status bar overlap 
//                 isTesting: false, // receiving test ad 
//                 autoShow: true // auto show interstitial ad when loaded 
//             });
 
//             registerAdEvents();
//         } else {
//             //alert( 'admob plugin not ready' ); 
//         }
// }
//functions to allow you to know when ads are shown, etc. 
// function registerAdEvents() {
//         document.addEventListener('onReceiveAd', function(){});
//         document.addEventListener('onFailedToReceiveAd', function(data){});
//         document.addEventListener('onPresentAd', function(){});
//         document.addEventListener('onDismissAd', function(){ });
//         document.addEventListener('onLeaveToAd', function(){ });
//         document.addEventListener('onReceiveInterstitialAd', function(){ });
//         document.addEventListener('onPresentInterstitialAd', function(){ });
//         document.addEventListener('onDismissInterstitialAd', function(){ });
//     }
//     //display the banner 
// function showBannerFunc(){
//     window.plugins.AdMob.createBannerView();
// }
// //display the interstitial 
// function showInterstitialFunc(){
//     window.plugins.AdMob.createInterstitialView();	//get the interstitials ready to be shown and show when it's loaded. 
//     window.plugins.AdMob.requestInterstitialAd();
// }

function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, true);
    b_context.fillStyle = "rgb(0, 200, 0)";
    b_context.fillRect(0,0,b_canvas.width,b_canvas.height);
}
function onDeviceReady() {
       
    $('#game-over').hide();
	$('#main').show();
    $('#menu').addClass('main');
     $('#tutorial').show();
    $('#menu').addClass('tutorial');
   
 
 	// initAd();
 	 //showBannerFunc();
 	 //showInterstitialFunc();

	 if( window.plugins && window.plugins.NativeAudio ) {
	
            var items = ['bomb', 'chomp2'];
            for(var i=0; i<items.length; i++) {
                var asset = 'assets/' + items[i] + '.wav';
                window.plugins.NativeAudio.preloadSimple(items[i], 
                                                         asset, 
                                                         function(msg){console.info(msg)}, 
                                                         function(msg){ console.error( 'Error: ' + msg ); });
            }
            window.plugins.NativeAudio.preloadComplex('backing', 
                                                      'assets/backingTrack.wav', 
                                                      1, // volume
                                                      1, // voices
                                                      0, // delay
            function(msg) {
                console.info(msg); 
                window.plugins.NativeAudio.loop('backing', 
                                                function(msg){console.info(msg)}, 
                                                function(msg){ console.error( 'Error: ' + msg ); }, 
                                                function(msg){ console.error( 'Complete: ' + msg ); });
            }, 
                                                      function(msg){ alert( 'Error: ' + msg ); });
        }
 

}
var app = {
   
   initialize: function() {
       
    },
    
};

app.initialize();