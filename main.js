var minimap_actors ={};

Hooks.on('getUserContextOptions', function(){

function makeMini(){


var PADDING = 0;
var rect;
var viewport = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0
}

    // function changeCallback(e) {
    //     var canvas = $("#mydivheader").get()[0];
    //     if (document.pointerLockElement === canvas ||
    //             document.mozPointerLockElement === canvas ||
    //             document.webkitPointerLockElement === canvas) {
 
    //         // we've got a pointerlock for our element, add a mouselistener
    //         // document.addEventListener("mousemove", moveCallback, false);
    //     } else {
 
    //         // pointer lock is no longer active, remove the callback
    //         // document.removeEventListener("mousemove", moveCallback, false);
 
    //         // and reset the entry coordinates
    //         entryCoordinates = {x:-1, y:-1};
    //     }
    // };

//Make the DIV element draggagle:
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {

     
    
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    // store the current viewport and element dimensions when a drag starts
    rect = elmnt.getBoundingClientRect();
    viewport.bottom = document.getElementById('mydivheader').clientHeight - PADDING;

    viewport.left = PADDING;
    viewport.right = document.getElementById('mydivheader').clientWidth - PADDING;
    viewport.top = PADDING;
    
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;


     // pointerlock
      
       var canvasa = $("#mydiv").get()[0];
            canvasa.requestPointerLock = canvasa.requestPointerLock ||
                    canvasa.mozRequestPointerLock ||
                    canvasa.webkitRequestPointerLock;
 
            // Ask the browser to lock the pointer)
            canvasa.requestPointerLock();

     

  }


  function elementDrag(e) {
     var movementX = e.movementX ||
                e.mozMovementX ||
                e.webkitMovementX ||
                0;
 
        var movementY = e.movementY ||
                e.mozMovementY ||
                e.webkitMovementY ||
                0;
    // e = e || window.event;
    // calculate the new cursor position:
    // pos1 = pos3 - movementX;//e.clientX;
    // pos2 = pos4 - movementY;//e.clientY;
    // pos3 = movementX;//e.clientX;
    // pos4 = movementY;//e.clientY;
    
    // check to make sure the element will be within our viewport boundary
var newLeft = 0;
var newTop = 0;
// if (elmnt.offsetLeft + movementX < viewport.left) {newLeft=viewport.left;}
// else if (elmnt.offsetLeft + movementX + rect.width > viewport.right ){newLeft=viewport.right - rect.width;}
// else{newLeft = elmnt.offsetLeft + movementX;}
newLeft = elmnt.offsetLeft + movementX;
newTop = elmnt.offsetTop + movementY;
// if (elmnt.offsetTop + movementY < viewport.top) {newTop=viewport.top;}
// else if (elmnt.offsetTop + movementY + rect.height > viewport.bottom ){newTop=viewport.bottom - rect.height;}
// else{newTop = elmnt.offsetTop + movementY;}




    // if (newLeft < viewport.left
    //     || newTop < viewport.top
    //     || newLeft + rect.width > viewport.right
    //     || newTop + rect.height > viewport.bottom
    // ) {
      
    //   // the element will hit the boundary, do nothing...
    // } else {
      // set the element's new position:
let imggg = document.getElementById('minimapimg');
  
var imageHeight = imggg.height;
var imageWidth = imggg.width;




let screensizex = document.getElementById('board').width;
let screensizey = document.getElementById('board').height;

let dimensionsy = canvas.dimensions.sceneHeight;
let dimensionsx = canvas.dimensions.sceneWidth;

let minimaprationx = screensizex/dimensionsx;
let minimaprationy = screensizey/dimensionsy; 

var squaresizew = (imageWidth*minimaprationx); // canvas.stage.scale.x;
var squaresizeh = (imageHeight*minimaprationy);
 // canvas.stage.scale.y;

let paddedX =canvas.dimensions.paddingX+(document.getElementById('board').width/2/canvas.stage.scale.x);
let paddedY =canvas.dimensions.paddingY+(document.getElementById('board').height/2/canvas.stage.scale.y);



      elmnt.style.top = newTop + "px";
      elmnt.style.left = newLeft + "px";

      let w=(newLeft)*(dimensionsx/imageWidth);
      let h=(newTop)*(dimensionsy/imageHeight);
       canvas.pan({x: w+paddedX, y: h+paddedY});

// var posx =(canvas.stage.pivot.x - paddedX)/squaresizew;

      // canvas.stage.position.set(w-canvas.dimensions.paddingX,h-canvas.dimensions.paddingY)

      // var posx =(canvas.stage.pivot.x + canvas.dimensions.paddingX)/squaresizew;
// posx = posx *minimaprationx;
//(canvas.dimensions.paddingX + canvas.stage.pivot.x)/(canvas.dimensions.sceneWidth/imageWidth);
// var posy =(canvas.stage.pivot.y - canvas.dimensions.paddingY)/squaresizeh;
    // }
  }

  function closeDragElement() {
            document.exitPointerLock();
            //     var canvasa = $("#mydivheader").get()[0];
            // canvasa.exitPointerLock = canvasa.exitPointerLock    ||
            //                canvasa.mozExitPointerLock;
            // canvasa.exitPointerLock();
    /* stop moving when mouse button is released:*/
    document.onmouseup=null;
    document.onmousemove = null;


  }
}
// canvas.stage.scale.set(1,1)
var wrapper =  document.createElement("div");
wrapper.id="mydivheader";

wrapper.style=`position: relative; overflow: hidden; `;

// wrapper.className="app";
// var img = canvas.app.renderer.extract.image(canvas.background.img);
var img = document.createElement("IMG");
img.src=canvas.scene.img;
// img.src="https://media2.giphy.com/media/rwNpHtaMGnStW/giphy-loop.mp4?cid=d0fab44ca13dbd595237c4d8b1a5ae0f4ed07e1af787feac&rid=giphy-loop.mp4"
if (game.user.isGM){
  
img.style=`max-width: 200px; max-height: auto; `;
}
else{
let aa = null;
img.style=`max-width: 200px; max-height: auto;  mask-image: url(${aa}); -webkit-mask-image: url(${aa});  mask-size: contain; -webkit-mask-size: contain;`;
}
console.log(img.style);
img.id='minimapimg';
wrapper.appendChild(img);
var rec =  document.createElement("div");
rec.className="box";
rec.id="mydiv";

var src = document.getElementById("players");
  // var curRow = src;
  // curRow.parentNode.insertBefore(wrapper, curRow.nextSibling);
src.appendChild(wrapper);

      // let options = Application.defaultOptions;
      // options.template = "modules/MiniMap/minimap.html";
      // options.popOut = false;
      // options.resizable = false;
      // options.width='200';
      // options.height='200';
      // options.top='200';
      // options.left='200';
      // options.title="asdfasdfasdfasd";
      // options.draggagle=true;
      // var gaga = new Application(options);
      // gaga.render(true);




function loaded() {
let imggg = document.getElementById('minimapimg');
  
var imageHeight = imggg.height;
var imageWidth = imggg.width;




let screensizex = document.getElementById('board').width;
let screensizey = document.getElementById('board').height;

let dimensionsy = canvas.dimensions.sceneHeight;
let dimensionsx = canvas.dimensions.sceneWidth;

let minimaprationx = screensizex/dimensionsx;
let minimaprationy = screensizey/dimensionsy; 

var squaresizew = (imageWidth*minimaprationx); // canvas.stage.scale.x;
var squaresizeh = (imageHeight*minimaprationy);
 // canvas.stage.scale.y;


let paddedX =canvas.dimensions.paddingX+(document.getElementById('board').width/2/canvas.stage.scale.x);
let paddedY =canvas.dimensions.paddingY+(document.getElementById('board').height/2/canvas.stage.scale.y);



var posx =(canvas.stage.pivot.x - paddedX)/(dimensionsx/imageWidth);
// posx = posx *minimaprationx;
//(canvas.dimensions.paddingX + canvas.stage.pivot.x)/(canvas.dimensions.sceneWidth/imageWidth);
var posy =(canvas.stage.pivot.y - paddedY)/(dimensionsy/imageHeight);
//Math.max(0,parseFloat(document.getElementById('hud').style.top,10));
// posy= posy*minimaprationy;
//(canvas.dimensions.paddingY + canvas.stage.pivot.y)/(canvas.dimensions.sceneHeight/imageHeight);



if (game.user.isGM){
}
else{
 canvas.sight.saveFog()
let aa= canvas.sight.fogData.explored;
      let leftshad =(canvas.dimensions.paddingX)/(dimensionsx/imageWidth);
      let topshad =(canvas.dimensions.paddingY)/(dimensionsy/imageHeight);
      let maskw = (canvas.dimensions.width)/(dimensionsx/imageWidth);
      let maskh = (canvas.dimensions.height)/(dimensionsy/imageHeight);
imggg.style=`max-width: 200px; max-height: auto;  mask-image: url(${aa}); -webkit-mask-image: url(${aa});  mask-size: contain; -webkit-mask-size: ${maskw}px ${maskh}px; -webkit-mask-position: -${leftshad}px -${topshad}px;`;
}
rec.style = `border: 2px solid red; height: ${squaresizeh/canvas.stage.scale.x}px; left: ${posx}px; position: absolute; top: ${posy}px; width: ${squaresizew/canvas.stage.scale.x}px;`
wrapper.appendChild(rec);



for (usera of game.users)
{
//  console.log(user.color);
  let char = usera.data.character;
  if (char)
  {
    let toks = game.scenes.viewed.data.tokens.filter(w=> w.actorLink == true && w.actorId==char).map(l => ({'x': l.x, 'y': l.y}))
    for (tok of toks)
    {
  
      let aposx =(tok.x - canvas.dimensions.paddingX)/(dimensionsx/imageWidth);
      let aposy =(tok.y - canvas.dimensions.paddingY)/(dimensionsy/imageHeight);
  
      console.log(`id ${char} X ${tok.x} Y ${tok.y} color ${usera.color}`);
      minimap_actors[char] = document.createElement("div");
      minimap_actors[char].id="minitock_"+char;
      minimap_actors[char].style=`border-radius: 50%; position: absolute; height: 8px; width: 8px; background: ${usera.color}; left: ${aposx}px; top: ${aposy}px`;
      // wrapper.removeChild
      document.getElementById('mydivheader').appendChild(minimap_actors[char]);
  
    }
  }
}


 


dragElement(document.getElementById(("mydiv")));

}

if (img.complete) {
  loaded()
} else {
  img.addEventListener('load', loaded)
  img.addEventListener('error', function() {
      // alert('error')
  })
}

function resSqau(){
  let imggg = document.getElementById('minimapimg');
  
var imageHeight = imggg.height;
var imageWidth = imggg.width;




let screensizex = document.getElementById('board').width;
let screensizey = document.getElementById('board').height;

let dimensionsy = canvas.dimensions.sceneHeight;
let dimensionsx = canvas.dimensions.sceneWidth;

let minimaprationx = screensizex/dimensionsx;
let minimaprationy = screensizey/dimensionsy; 

var squaresizew = (imageWidth*minimaprationx); // canvas.stage.scale.x;
var squaresizeh = (imageHeight*minimaprationy);
 // canvas.stage.scale.y;


let paddedX =canvas.dimensions.paddingX+(document.getElementById('board').width/2/canvas.stage.scale.x);
let paddedY =canvas.dimensions.paddingY+(document.getElementById('board').height/2/canvas.stage.scale.y);



var posx =(canvas.stage.pivot.x - paddedX)/(dimensionsx/imageWidth);
// posx = posx *minimaprationx;
//(canvas.dimensions.paddingX + canvas.stage.pivot.x)/(canvas.dimensions.sceneWidth/imageWidth);
var posy =(canvas.stage.pivot.y - paddedY)/(dimensionsy/imageHeight);
//Math.max(0,parseFloat(document.getElementById('hud').style.top,10));
// posy= posy*minimaprationy;
//(canvas.dimensions.paddingY + canvas.stage.pivot.y)/(canvas.dimensions.sceneHeight/imageHeight);

rec.style = `overflow: hidden; border: 2px solid red; height: ${squaresizeh/canvas.stage.scale.x}px; left: ${posx}px; position: absolute; top: ${posy}px; width: ${squaresizew/canvas.stage.scale.x}px`



for (usera of game.users)
{

  let char = usera.data.character;
  if (char)
  {
    let toks = game.scenes.viewed.data.tokens.filter(w=> w.actorLink == true && w.actorId==char).map(l => ({'x': l.x, 'y': l.y}))
    for (tok of toks)
    {
  
      let aposx =(tok.x - canvas.dimensions.paddingX)/(dimensionsx/imageWidth);
      let aposy =(tok.y - canvas.dimensions.paddingY)/(dimensionsy/imageHeight);
  
      minimap_actors[char].style=`border-radius: 50%; position: absolute; height: 8px; width: 8px; background: ${usera.color}; left: ${aposx}px; top: ${aposy}px`;
      // wrapper.removeChild
  
    }
  }


  
}


}


        Hooks.on('canvasPan', async function() {
            resSqau();
        });
        Hooks.on('createToken', async function() {
            resSqau();
        });
        Hooks.on('deleteActor', async function() {
            resSqau();
        });
        Hooks.on('deleteToken', async function() {
            resSqau();
        });
        Hooks.on('updateToken', async function() {
            resSqau();
        });
        Hooks.on('updateScene', async function() {
            resSqau();
        });

}

makeMini();
});
// }
// $('li.scene.nav-item.gm').on('mouseover', function() {
//     console.log($(this)[0].dataset.sceneId);
// });

        // document.addEventListener('pointerlockchange', changeCallback, false);
        // document.addEventListener('mozpointerlockchange', changeCallback, false);
        // document.addEventListener('webkitpointerlockchange', changeCallback, false); 


             // when element is clicked, we're going to request a