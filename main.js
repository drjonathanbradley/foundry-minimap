   // CONFIG.debug.hooks = true;
var minimap_data={
  'minimap_actors':{},
  'minimapapp': null
}

class MiniMapApp extends Application {
  constructor(url, options) {
    super(options);
    this.url = url;

  }

  /* -------------------------------------------- */

  /** @override */
  static get defaultOptions() {
    const options = super.defaultOptions;
    // Default positioning
    // let h = window.innerHeight * 0.9,
        // w = Math.min(window.innerWidth * 0.9, 1200);
    // options.height = 200;
    // options.width = 200;
    // options.top = (window.innerHeight - this.h) / 2;
    // options.left = (window.innerWidth - this.w) / 2;
    options.id = "minimappopup";
    options.template = "modules/MiniMap/template.html";
    options.popOut = true;
    return options;
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    return {
      src: this.url
    }
    };
  // }

//   /* -------------------------------------------- */

  /** @override */
  close() {
  // $('#minimap_loading').show();
    super.close();
  }
}


Hooks.on("getSceneControlButtons", (controls) => {

controls.push({
      name: "minimapcontrol",
      title: "MiniMap",
      // layer: "NotesLayer",
      icon: "fas fa-map-marked",
      activeTool: 'select',
      tools: [
        {
          name: "select",
          title: "MiniMapSelect",
          icon: "fas fa-expand",
        }],
    });
});

Hooks.on("renderSceneControls", () => {

$('li[data-control="minimapcontrol"]')[0].onclick=()=> {
                    
                    minimap_data.minimapapp.render(true);


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
        // Hooks.on('updateScene', async function() {

        // });
        };

        // if (minimap_data.minimapapp != null){
        //   minimap_data.minimapapp.close();
        //   delete minimap_data.minimapapp;
        // }
      if(minimap_data.minimapapp != null){
        delete minimap_data.minimapapp;
        minimap_data.minimapapp = new MiniMapApp(canvas.scene.img,  {title: "MiniMap"});
        minimap_data.minimapapp.render(true)
      }else{
        minimap_data.minimapapp = new MiniMapApp(canvas.scene.img,  {title: "MiniMap"});
      }
        

});


function resSqau(){
   let w_ratio = (minimap_data.dimensionsx/minimap_data.imageWidth);
   let h_ratio = (minimap_data.dimensionsy/minimap_data.imageHeight);
minimap_data.paddedX =canvas.dimensions.paddingX+(document.getElementById('board').width/2/canvas.stage.scale.x);
minimap_data.paddedY =canvas.dimensions.paddingY+(document.getElementById('board').height/2/canvas.stage.scale.y);

  minimap_data['posx']=(canvas.stage.pivot.x - minimap_data.paddedX)/w_ratio;
  minimap_data['posy'] =(canvas.stage.pivot.y - minimap_data.paddedY)/h_ratio;
   
   $('#mydiv')[0].style = `overflow: hidden; border: 2px solid red; height: ${minimap_data.squaresizeh/canvas.stage.scale.x}px; left: ${minimap_data.posx}px; position: absolute; top: ${minimap_data.posy}px; width: ${minimap_data.squaresizew/canvas.stage.scale.x}px;`


for (usera of game.users)
{

  let char = usera.data.character;
  if (char)
  {
    let toks = game.scenes.viewed.data.tokens.filter(w=> w.actorLink == true && w.actorId==char).map(l => ({'x': l.x, 'y': l.y}))
    for (tok of toks)
    {
  
      let aposx =(tok.x - canvas.dimensions.paddingX)/w_ratio;
      let aposy =(tok.y - canvas.dimensions.paddingY)/h_ratio;
  
      minimap_data.minimap_actors[char].style=`border-radius: 50%; position: absolute; height: 8px; width: 8px; background: ${usera.color}; left: ${aposx}px; top: ${aposy}px`;
      // wrapper.removeChild
  
    }
  }

}
}
  