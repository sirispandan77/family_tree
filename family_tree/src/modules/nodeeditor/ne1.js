var Konva = require('../../lib/konva');
const {
    tfNode,
    tfEdge
} = require('../../lib/graph');
const pythonFunction = require("../../lib/datafunctions");

let temparrow;
let firstblock;
let isSelected;
let dir;

function init(){
    isSelected = false;
    temparrow = undefined;
    firstblock = undefined;
    dir = globaljs.projectDetails.name;

    let graph = globaljs.graph;
    $("#draw-sidebar-right").hide();
    $("#codenode-desc").hide();
    $("#project-name").text(globaljs.projectDetails.name);
    $("#project-details").text(globaljs.projectDetails.details.substr(0, 20) + "...");
    graph.modelStage = new Konva.Stage({
        container: 'draw-canvas',
        width: 2 * window.innerWidth,
        height: 2 * window.innerHeight,
    });
    let stage = graph.modelStage;
    let layer = graph.modelLayer;
    stage.add(layer);
    let graphdata = fs.readFileSync(path.join(projects_path, dir, "graph.json"));
    let savedGraph = JSON.parse(graphdata);
    let temphash = {};

    savedGraph.nodes.forEach(element => {
        if(element.parameters.First_name=="None" && element.parameters.Last_name=="None")
            var name=element.text;
        if(element.parameters.First_name!="None" && element.parameters.Last_name=="None")
            var name=element.parameters.First_name;
        if(element.parameters.First_name=="None" && element.parameters.Last_name!="None")
            var name=element.parameters.Last_name;
        if(element.parameters.First_name!="None" && element.parameters.Last_name!="None")
            var name=element.parameters.First_name+" "+element.parameters.Last_name;
        let node = createLabel(element.x, element.y, name,element.relation, layer,  element.id);
        node.relation=element.relation;
        node.parameters = element.parameters;
        node.details= element.details;
        node.relatives = element.relatives;
        globaljs.graph.addNode(node);
        temphash[element.id] = graph.nodes[graph.nodes.length - 1];
    });

    savedGraph.edges.forEach(element => {
        let edge = SavedAddArrow(temphash[element.from], temphash[element.to], layer);
        globaljs.graph.addEdge(edge);
    });
    layer.draw();
    // }
    // globaljs.isLoaded.nodeeditor = true;
    // layer.draw();

    $('#draw-sidebar-left div .accordion ul li').draggable({
        cursor: 'move',
        helper: function () {
            $('#main-content').append('<div id="clone" style="text-decoration:none;" class="bg-dark text-white p-2">' + $(this).html() + '</div>');
            return $("#clone");

        },
        appendTo: 'body',
        textDecoration: "none",
        start: function (e, ui) {
            ui.helper.addClass({
                textDecoration: "none"
            });
        }
    });

    $("#draw-canvas").droppable({
        drop: function (event, ui) {
            var relativeXPosition = (event.pageX - this.offsetLeft);
            var relativeYPosition = (event.pageY - this.offsetTop);
            console.log(layer)
            //console.log(tr)
            console.log("its a label")
           /* var tr = new Konva.Transformer({
                boundBoxFunc: function (oldBoundBox, newBoundBox) {
                  // "boundBox" is an object with
                  // x, y, width, height and rotation properties
                  // transformer tool will try to fit nodes into that box
        
                  // the logic is simple, if new width is too big
                  // we will return previous state
                  if (Math.abs(newBoundBox.width) > MAX_WIDTH) {
                    return oldBoundBox;
                  }
        
                  return newBoundBox;
                },
              });*/
            output = createLabel(relativeXPosition, relativeYPosition, ui.helper.text().trim(), ui.helper.text().trim(),layer)
            graph.addNode(output);
        }
    });
        
    $(document).keyup(function (e) {
        if (e.key === "Escape") {
            if (isSelected) {
                firstblock.label.getTag().stroke("#111");
                if (temparrow)
                    temparrow.arrow.remove()
                temparrow = undefined;
                firstblock = undefined;
                isSelected = false;
                layer.draw();
                $("#draw-sidebar-right").hide();
            }
        } else if (e.key === "Delete") {
            if (isSelected && !temparrow) {
                if (firstblock) {
                    if (firstblock.type == "input") {
                        graph.inputs = graph.inputs.filter(a => a != firstblock);
                        print(graph.inputs);
                    } 
                    globaljs.graph.nodes.forEach(element => {
                        element.removeRelation(firstblock.id);
                    });           
                    graph.removeNode(firstblock);

                    firstblock.label.remove()
                    for (let i in firstblock.outEdges) {
                        graph.removeEdge(firstblock.outEdges[i]);
                        firstblock.outEdges[i].arrow.remove()
                    }
                    for (let i in firstblock.inEdges) {
                        graph.removeEdge(firstblock.inEdges[i]);
                        firstblock.inEdges[i].arrow.remove()
                    }
                    firstblock = undefined;
                    $("#draw-sidebar-right").hide();
                }
                isSelected = false;
                layer.draw();
            }
        }
    });
    
    //dropdown 1
    var $dropdown = $("#p1-dropdown");   
    //var $defaultvalue=-1;         
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Choose a person';
    $dropdown.append(defaultOption);
    $dropdown.selectedIndex = 0;
    globaljs.graph.nodes.forEach(i => {        
    option = document.createElement('option');
    if(i.parameters.First_name=="None" && i.parameters.Last_name=="None")
            return;
        if(i.parameters.First_name!="None" && i.parameters.Last_name=="None")
            var name=i.parameters.First_name;
        if(i.parameters.First_name=="None" && i.parameters.Last_name!="None")
            var name=i.parameters.Last_name;
        if(i.parameters.First_name!="None" && i.parameters.Last_name!="None")
            var name=i.parameters.First_name+" "+i.parameters.Last_name;
    option.text = name;
    option.value = i.id;
    $dropdown.append(option);                   
            });
    
    //dropdown 2
    var $dropdown1 = $("#p2-dropdown");      
    //var $defaultvalue=-1;      
    let defaultOption1 = document.createElement('option');
    defaultOption1.text = 'Choose a person';
    $dropdown1.append(defaultOption1);
    $dropdown1.selectedIndex = 0;

    globaljs.graph.nodes.forEach(i => {
    option = document.createElement('option');
    if(i.parameters.First_name=="None" && i.parameters.Last_name=="None")
        return;
    if(i.parameters.First_name!="None" && i.parameters.Last_name=="None")
        var name=i.parameters.First_name;
    if(i.parameters.First_name=="None" && i.parameters.Last_name!="None")
        var name=i.parameters.Last_name;
    if(i.parameters.First_name!="None" && i.parameters.Last_name!="None")
        var name=i.parameters.First_name+" "+i.parameters.Last_name;
    option.text = name;
    option.value = i.id;
    $dropdown1.append(option);   
                   
            });                                               
    
    //searchbutton
    $("#searchbutton").click(function () {
        var v1 = $("#p1-dropdown").find("option:selected").val();
        var v2= $("#p2-dropdown").find("option:selected").val();
        var n1=$("#p1-dropdown").find("option:selected").text();
        var n2 =$("#p2-dropdown").find("option:selected").text();
        console.log(v1);
        console.log(v2)
        if(v1==v2)
            document.getElementById("space").innerHTML= " Please select two different people";
        else{
        var dict={}
        globaljs.graph.nodes.forEach(element => {
            dict[element.id]=element;
            console.log("inside loop")
            console.log(dict)
         });
         console.log(dict[v1].relatives)
        var rel=dict[v1].relatives
        for(i in dict[v1].relatives){
            var whoid= Object.keys(rel[i])[0]
            var who= Object.values(rel[i])[0]
            console.log(whoid)
            console.log(who);
            if(whoid==v2)
                break;
                        
        }
        //console.log(rel[0])
        if(whoid==v2 )
        document.getElementById("space").innerHTML= n2+" is " +who+" of "+n1 ;
        else
        document.getElementById("space").innerHTML= n2+" is a distant relative of "+n1 ;
        /*$("#relation").append(`
            <center><p > ${who} </p></center>
                    `);*/
        }
    });
    
    
    $("#saveProject").click(function () {
        saveProject();
    });


    $('#right-sidebar-form').on('keyup change paste', 'input, select, textarea', function () {
        if (isSelected && firstblock) {
            let fields = {}
            $("#right-sidebar-form").find(":input").each(function () {
                fields[this.id] = $(this).val();
            });
            firstblock.parameters = fields;            
        }
    });
    
    $('#right-sidebar-form2').on('keyup change paste', 'input, select, textarea', function () {
        if (isSelected && firstblock) {
            let fields = {}
            $("#right-sidebar-form2").find(":input").each(function () {
                fields[this.id] = $(this).val();
            });
            
            firstblock.details = fields;
        }
    });
    
}    

function generateCode(){
    let tuple = globaljs.graph.traverse();

    if (tuple == null) {
        swal("Oops!", "Error in generating the code!", "error");
        return;
    }

    let modelgencode = tuple[0];
    let calledList = tuple[1];
    let usedFunctions = tuple[2];

    globaljs.modelText = "\n# Called Functions\n"
    globaljs.modelText += calledList + "\n"

    globaljs.modelText += "\n# Generated Model\n";
    globaljs.modelText += modelgencode;
    globaljs.modelText += `\n`

    if (firstblock)
        firstblock.label.getTag().stroke("#111");
    if (temparrow)
        temparrow.arrow.remove();
    isSelected = false;
    firstblock = undefined;
    temparrow = undefined;

    for (var q = 0; q < usedFunctions.length; q++) {
        globaljs.functionsText += pythonFunction[usedFunctions[q]];
    }

    globaljs.extraText += `
tensorboard = TensorBoard(log_dir="../testing/Projects/${globaljs.projectDetails.name}/logs/{}".format(asctime().replace(":","-")), histogram_freq=0,write_graph=True,write_grads=True,write_images=True)

`
    fs.writeFileSync(path.join(projects_path, dir, "editor.py"), globaljs.extraText + globaljs.functionsText + globaljs.modelText, 'utf-8');
}

function createLabel(x, y, text,rel , layertoadd, id = null) {
    let graph = globaljs.graph;
    let label = new Konva.Label({
        x: x,
        y: y,
        draggable: true,
        cornerRadius: 6,
        transformsEnabled: 'position'
    });
    
   
   
    label.add(new Konva.Tag({
        cornerRadius: 6,
        lineJoin: 'round',
        fill: '#eee',
        stroke: '#333',
        // shadowColor: '#111',
    }));

    label.add(new Konva.Text({
        text: text,
        fontFamily: 'Calibri',
        fontSize: 18,
        padding: 12,
        fill: 'black',
        width: 180,
        align: 'center'
    }));
    //tr.add([])

    let node;
    if (!id) {
        id = graph.numberOfNodes;
    }
    /*if (text == "InputLayer") {
        node = new tfNode(label, id, text,rel, "input")
        graph.addInput(node);
    } else if (text == "Output") {
        node = new tfNode(label, id, text,rel, "output")
        graph.addOutput(node);
    } else */{
        node = new tfNode(label, id, text,rel, "middle")
    }

    label.on("click", (event) => {

        switch (event.evt.which) {
            case 1:
                if (temparrow == undefined) {
                    if (isSelected && firstblock == node) {
                        firstblock.label.getTag().stroke("#111");
                        isSelected = false;
                        firstblock = undefined;
                    } else {
                        if (firstblock) {
                            firstblock.label.getTag().stroke("#111");
                            firstblock = undefined;
                        }
                        node.label.getTag().stroke("#4f4");
                        firstblock = node;
                        isSelected = true;
                    }
                } else {
                    print("already selected")
                }
                break;
            case 2:
                alert('Middle Mouse button pressed.');
                break;
            case 3:
                if (isSelected && node == firstblock && temparrow) {
                    firstblock.label.getTag().stroke("#111");
                    temparrow.arrow.remove();
                    isSelected = false;
                    firstblock = undefined;
                    temparrow = undefined;
                } else if ((!isSelected && !temparrow) || (isSelected && !temparrow)) {
                    node.label.getTag().stroke("#4f4");
                    temparrow = addArrow(node, null, layertoadd);
                    firstblock = node;
                    temparrow.arrow.moveToBottom()
                    isSelected = true;
                } else if (temparrow && isSelected) {
                    temparrow.arrow.remove();
                    firstblock.label.getTag().stroke("#111");
                    if (firstblock != node) {
                        let outputedge = addArrow(firstblock, node, layertoadd);
                        outputedge.arrow.moveToBottom();
                        graph.addEdge(outputedge);
                    }
                    firstblock = undefined;
                    temparrow = undefined;
                    isSelected = false;
                }
                break;
            default:
                alert('You have a strange Mouse!');
        }

        if (isSelected) {
            $("#right-sidebar-form").text('');
            $("#right-sidebar-form2").text('');
            let layerParameters = firstblock.parameters;
            let pdetails= firstblock.details;
            console.log(pdetails);
            if (layerParameters) {
                for (const [key, value] of Object.entries(layerParameters)) {
                    if(key=="value")
                        continue;
                    if(key=="Photo"){
                        $("#right-sidebar-form").append(`
                        <div class="form-group">
                           <center> <img src = "${value}" alt = "profile photo" min-width: "170px"; max-width: "150px"; height = "100 px"  width: "100 px" /> </center>
                        </div>
                    `);
                    }
                    else{
                    $("#right-sidebar-form").append(`
                    <div class="form-group">
                        <label for="${key}">${key}:</label>
                        <input class="form-control" id="${key}" value="${value}" required>
                    </div>
                    `);
                    }
                }
            }
            if(!firstblock.privacy){ 
                    console.log(pdetails)
            if (pdetails) {
                $("#right-sidebar-form2").append(`
                <div class="form-group">
                <a href="#pdetails" data-toggle="collapse" aria-expanded="false" class=" dropdown-toggle  text-success text-center"
                        style="color:#555555; text-decoration: none;">
                        PRIVATE DETAILS </a>
                        <ul  id="pdetails">
                    </ul>                     
                </div>
                `);
                for (const [key, value] of Object.entries(pdetails)) { 

                    $("#pdetails").append(`  

                            <li><label for="${key}">${key}:</label></li>
                            <li><p  id="${key}"  > ${value} </p></li>        
                            <li> </li>                
                    `);                    
                }               
            }            
            }
            else    {
                $("#right-sidebar-form2").append(`
                    <div class="form-group">
                        <center><p style="color:#c0c6c9"> Details are Private </p></center>
                    </div>
                    `);
            }                         
            $("#draw-sidebar-right").show();
            $("#selectedlayer").attr('placeholder',label.getText().text());
            console.log(label.getText().text()+ " labellllll");
            //$("#selectedlayer").placeholder(label.getText().text());
        } else {
            $("#draw-sidebar-right").hide();
        }

        layertoadd.draw();
    });

    label.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
    });
    label.on('mouseout', function () {
        document.body.style.cursor = 'default';
    });
    /*label.on('dragmove', () => {
        // mutate the state
        target.x = node.x();
        target.y = node.y();
        updateObjects();
      });*/
    layertoadd.add(label);
    layertoadd.draw();
    return node;
}


function addArrow(node1, node2, layertoadd) {
    var arrow;
    let shape1 = node1.label;
    let shape2;
    let edge;
    function updateObjects() {
        console.log(" update object")
        globaljs.graph.nodes.forEach((target) => {
          var node = layer.findOne('#' + target.id);
          node.getX(target.x);
          node.getY(target.y);
        });
        globaljs.graph.edges.forEach((connect) => {
          var line = layer.findOne('#' + connect.id);
          var fromNode = layer.findOne('#' + connect.fromNode);
          var toNode = layer.findOne('#' + connect.toNode);

          const points = getConnectorPoints(
            fromNode.position(),
            toNode.position()
          );
          line.points(points);
        });
      }

    if (node2 == null) {
        const dx = shape1.getX() - shape2.getX();
        const dy = shape1.getY() - shape2.getY();
        let angle = Math.atan2(-dy, dx);

        const radius = 50;
        arrow = new Konva.Line({
            points: [559, 560, 561, 562],
            points: [shape1.getX() + -radius * Math.cos(angle + Math.PI),
            shape1.getY() + radius * Math.sin(angle + Math.PI),
            shape2.getX() + -radius * Math.cos(angle),
            shape2.getY() + radius * Math.sin(angle)],
            pointerLength: 6,
            pointerWidth: 4,
            fill: 'black',
            stroke: 'black',
            strokeWidth: 2
        });

        $("#draw-canvas").mousemove(function (event) {
            var relativeXPosition = (event.pageX - this.offsetLeft); //offset -> method allows you to retrieve the current position of an element 'relative' to the document
            var relativeYPosition = (event.pageY - this.offsetTop);
            let p = [shape1.getX() + (shape1.width() / 2), shape1.getY() + shape1.height(), relativeXPosition, relativeYPosition];
            arrow.setPoints(p);
            layertoadd.draw();
        });

    } else {
        shape2 = node2.label;
        arrow = new Konva.Line({
            //points: [shape1.getX() , shape1.getY() , shape2.getX(), shape2.getY()],
            points: [shape1.getX() + -radius * Math.cos(angle + Math.PI),
                shape1.getY() + radius * Math.sin(angle + Math.PI),
                shape2.getX() + -radius * Math.cos(angle),
                shape2.getY() + radius * Math.sin(angle)],
            pointerLength: 6,
            pointerWidth: 4,
            fill: 'black',
            stroke: 'black',
            strokeWidth: 2
        });
        shape1.on("dragmove", () => {
            let p = [shape1.getX(), shape1.getY() , shape2.getX() , shape2.getY()];
            arrow.setPoints(p);
            layertoadd.draw();
           // shape2.getX() = shape2.x();
            //shape2.y = shape2.y();
            console.log(" update object 1")
            updateObjects();
        });
        shape2.on("dragmove", () => {
            let p = [shape1.getX(), shape1.getY(), shape2.getX() , shape2.getY()];
            arrow.setPoints(p);
            layertoadd.draw();
         //   shape2.x = shape2.x();
           // shape2.y = shape2.y();
  
            // update nodes from the new state
            console.log(" update object 2")
            updateObjects();
        });
        /*node.on('dragmove', () => {
            // mutate the state
            target.x = node.x();
            target.y = node.y();
  
            // update nodes from the new state
            updateObjects();
          });*/
    }
    console.log("outside loop")
    console.log(node1)
    console.log(node2)
    console.log(node1.relatives.length)
    console.log(node1.relatives.length===0)
    if(node2!=null && node2.relatives.length===0 && (node2.relation!="focus")){
            console.log("inside loop")
            let temp=node1;
            node1=node2;
            node2=temp;
            console.log(node1)
    console.log(node2)

    }
    if(node1.relation=="FATHER" && node2!=null){
        node1.linking(node2.relatives, node1.id, node1.relation)
        var gen= node2.parameters.Gender.toLowerCase();
        if(gen=="none" || gen=="male" || gen=="m")
            node1.addRelative({[node2.id]:"Son"})
        else    node1.addRelative({[node2.id]:"Daughter"})
        console.log(node1.relatives)

        node2.addRelative({[node1.id]:"Father"})
    }
    else if(node1.relation=="MOTHER" && node2!=null){
        node1.linking(node2.relatives, node1.id, node1.relation )
        var gen= node2.parameters.Gender.toLowerCase();
        if(gen=="none" || gen=="male" || gen=="m")
            node1.addRelative({[node2.id]:"Son"})
        else    node1.addRelative({[node2.id]:"Daughter"})
        //node1.addRelative({"Child":node2.id})
        console.log(node1.relatives)

        node2.addRelative({[node1.id]:"Mother"})
    }
    else if(node1.relation=="SISTER" && node2!=null){
        node1.linking(node2.relatives, node1.id, node1.relation )
        //node1.addRelative({"Child":node2.id})
        console.log(node1.relatives)
        var gen= node2.parameters.Gender.toLowerCase();
        if(gen=="none" || gen=="male" || gen=="m")
            node1.addRelative({[node2.id]:"Brother"})
        else    node1.addRelative({[node2.id]:"Sister"})
        node2.addRelative({[node1.id]:"Sister"})
    }
    else if(node1.relation=="BROTHER" && node2!=null){
        node1.linking(node2.relatives, node1.id, node1.relation )
        //node1.addRelative({"Child":node2.id})
        console.log(node1.relatives)
        var gen= node2.parameters.Gender.toLowerCase();
        if(gen=="none" || gen=="male" || gen=="m")
            node1.addRelative({[node2.id]:"Brother"})
        else    node1.addRelative({[node2.id]:"Sister"})
        node2.addRelative({[node1.id]:"Brother"})
    }
    else if(node1.relation=="HUSBAND" && node2!=null){
        node1.linking(node2.relatives, node1.id, node1.relation )
        node1.addRelative({[node2.id]:"Wife"})
        console.log(node1.relatives)
        node2.addRelative({[node1.id]:"Husband"})
    }
    else if(node1.relation=="WIFE" && node2!=null){
        node1.linking(node2.relatives, node1.id, node1.relation )
        node1.addRelative({[node2.id]:"Husband"})
        console.log(node1.relatives)
        node2.addRelative({[node1.id]:"Wife"})
    }  
    else if(node1.relation=="DAUGHTER" && node2!=null){
        node1.linking(node2.relatives, node1.id, node1.relation )
        var gen= node2.parameters.Gender.toLowerCase();
        if(gen=="none" || gen=="male" || gen=="m")
            node1.addRelative({[node2.id]:"Father"})
        else    node1.addRelative({[node2.id]:"Mother"})
        console.log(node1.relatives)
        node2.addRelative({[node1.id]:"Daughter"})
    }  
    else if(node1.relation=="SON" && node2!=null){
        node1.linking(node2.relatives, node1.id, node1.relation )
        var gen= node2.parameters.Gender.toLowerCase();
        if(gen=="none" || gen=="male" || gen=="m")
            node1.addRelative({[node2.id]:"Father"})
        else    node1.addRelative({[node2.id]:"Mother"})
        console.log(node1.relatives)
        node2.addRelative({[node1.id]:"Son"})
    }
    edge = new tfEdge(node1, node2, arrow, globaljs.graph.numberOfEdges)
    //console.log(graph)
    console.log("prinintg")
    default_relations = {}
    layertoadd.add(arrow)
    layertoadd.draw();
    return edge;
}


function SavedAddArrow(node1, node2, layertoadd) {
    var arrow;
    let shape1 = node1.label;
    let shape2;
    let edge;
    if (node2 == null) {
        arrow = new Konva.Line({
            points: [shape1.getX() + (shape1.width() / 2), shape1.getY() + shape1.height(), shape1.getX() + shape1.width(), shape1.getY() + shape1.height()],
            pointerLength: 6,
            pointerWidth: 4,
            fill: 'black',
            stroke: 'black',
            strokeWidth: 2
        });

        $("#draw-canvas").mousemove(function (event) {
            var relativeXPosition = (event.pageX - this.offsetLeft); //offset -> method allows you to retrieve the current position of an element 'relative' to the document
            var relativeYPosition = (event.pageY - this.offsetTop);
            let p = [shape1.getX() + (shape1.width() / 2), shape1.getY() + shape1.height(), relativeXPosition, relativeYPosition];
            arrow.setPoints(p);
            layertoadd.draw();
        });

    } else {
        shape2 = node2.label;
        arrow = new Konva.Line({
            points: [shape1.getX() + (shape1.width() / 2), shape1.getY() + shape1.height(), shape2.getX() + (shape2.width() / 2), shape2.getY()],
            pointerLength: 6,
            pointerWidth: 4,
            fill: 'black',
            stroke: 'black',
            strokeWidth: 2
        });
        shape1.on("dragmove", () => {
            let p = [shape1.getX() + (shape1.width() / 2), shape1.getY() + shape1.height(), shape2.getX() + (shape2.width() / 2), shape2.getY()];
            arrow.setPoints(p);
            layertoadd.draw();
        });
        shape2.on("dragmove", () => {
            let p = [shape1.getX() + (shape1.width() / 2), shape1.getY() + shape1.height(), shape2.getX() + (shape2.width() / 2), shape2.getY()];
            arrow.setPoints(p);
            layertoadd.draw();
        });

    }
    edge = new tfEdge(node1, node2, arrow, globaljs.graph.numberOfEdges)
    //console.log(graph)
    console.log("prinintg")
    default_relations = {}
    layertoadd.add(arrow)
    layertoadd.draw();
    return edge;
}


function saveProject() {
    let data = {
        nodes: [],
        edges: []
    };

    globaljs.graph.nodes.forEach(element => {
        //console.log(element.private_details)
        data.nodes.push({
            id: element.id,
            x: element.label.attrs.x,
            y: element.label.attrs.y,
            relation:element.relation,
            text: element.label.children[1].attrs.text,
            privacy: element.privacy,
            details: element.private_details,
            parameters: element.parameters,
            relatives: element.relatives
        });
    });
    globaljs.graph.edges.forEach(element => {
        data.edges.push({
            id: element.id,
            from: element.fromNode.id,
            to: element.toNode.id
        });
    });

    fs.writeFile(path.join(projects_path, dir, "graph.json"), JSON.stringify(data), 'utf-8', err => {
        if (err) {
            swal("Saving Project", "Failed to save project.", "error");
            print("Error writing file", err);
        } else {
            swal("Saving Project", "Project saved successfully.", "success");
        }
    });
}

module.exports = {
    saveProject: saveProject,
    init: init,
    generateCode: generateCode
}