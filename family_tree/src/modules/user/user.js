function init(){
    $("#user-create-project-button").click(() => {
        swal({
            text: "tree Name",
            title: "Create New Family-Tree",
            content: "input",
            buttons: ["Cancel", "Next"],
        }).then((value) => {
            if (value == "") {
                swal("Error", "Projet Name can't be empty.", "error");
            } else if (value) {
                let dir = value.replace(/[^a-z0-9]/gi, '_').toLowerCase();
                if (!fs.existsSync(path.join(process.cwd() , "/../testing"))) {
                    fs.mkdirSync(path.join(process.cwd() , "/../testing"));
                }
                if (!fs.existsSync(projects_path)) {
                    fs.mkdirSync(projects_path);
                }
    
                if (!fs.existsSync(projects_path + dir)) {
                    swal({
                        text: "Focus Person",
                        title: "Enter Person Name",
                        content: "input",
                        buttons: ["Cancel", "Create"],
                    }).then(value => {
                        if (value == "") {
                            swal("Error", "Project Details can't be empty.");
                        } else if (value) {
                            fs.mkdirSync(projects_path + dir, err => {
                                if (err) {
                                    print("Error creating folder", err);
                                }
                            });
                            fs.mkdirSync(path.join(projects_path,dir,"logs"));
                            let data = {
                                name: dir,
                                details: value,
                                creation_time: new Date(Date.now()).toString(),
                            };
                            //let initgraph = {"nodes":[{"id":0,"x":418,"y":122,"text":"InputLayer","parameters":{"Photo" : 'https://cdn2.iconfinder.com/data/icons/personicon-1/300/personicon11-512.png ',"shape":"None","batch_size":"None","name":"None","dtype":"None","sparse":"False","tensor":"None"}},{"id":1,"x":387,"y":255,"text":"Dense","parameters":{"units":1,"activation":"None","use_bias":"True","kernel_initializer":"'glorot_uniform'","bias_initializer":"'zeros'","kernel_regularizer":"None","bias_regularizer":"None","activity_regularizer":"None","kernel_constraint":"None","bias_constraint":"None"}},{"id":2,"x":352,"y":363,"text":"Output","parameters":{"optimizer":"sgd","learning_rate":0.001,"loss":"'mean_squared_error'","loss_weights":"None","sample_weight_mode":"None","weighted_metrics":"None","target_tensors":"None"}},{"id":3,"x":333,"y":462,"text":"fit","parameters":{"x":"None","y":"None","batch_size":"None","epochs":1,"verbose":0,"callbacks":"[tensorboard]","validation_split":0,"validation_data":"None","shuffle":"True","class_weight":"None","sample_weight":"None","initial_epoch":0,"steps_per_epoch":"None","validation_steps":"None"}}],"edges":[{"from":0,"to":1},{"from":1,"to":2},{"from":2,"to":3}]};
                            
                            let initgraph = {"nodes":[{"id":0,"x":418,"y":122,"text":value,"privacy":false, "relation":"focus","parameters":{ "First_name":"None","Last_name":"None", "Gender":"None" , "Alive_or_Dead": "Alive"},"relatives":[]}],"edges":[]};
                            


  
                          fs.writeFileSync(path.join(projects_path, dir, "graph.json"), JSON.stringify(initgraph));                           
                            fs.writeFile(path.join(projects_path, dir, "info.json"), JSON.stringify(data), 'utf-8', err => {
                                if (err) {
                                    print("Error writing file", err);
                                } else {
                                    loadProjects();
                                    swal("Create New Project", "Project created successfully.", "success");
                                }
                            });
                            
                        }
                    });
                } else {
                    swal("Error", "Project with this name already exists.", "error");
                }
            }           
        });       
    });
    
}


function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
        return fs.statSync(path + '/' + file).isDirectory();
    });
}

function startTensorboard(projectname){
    let tensorbaord;
    let env = Object.create(process.env);
    let tensorbaordcmd = process.platform == "win32"? path.join(env['CONDA_PREFIX'], 'Scripts','tensorboard.exe'): 'tensorboard';
    tensorbaord = childprocess.spawn(tensorbaordcmd, ["--logdir="+path.join("../testing/Projects/", projectname, "logs"),"--host=127.0.0.1"], {
        env: env
    });

    tensorbaord.on('close', (code)=>{
        // console.log(code);
    });
}

function killTensorboard(){
    let killtensorboard;
    if(process.platform == "win32"){
        killtensorboard = childprocess.spawn('taskkill', ['/im','/f', 'tensorboard'])
    }else{
        killtensorboard = childprocess.spawn('killall', ["-9", "tensorboard"]);
    }

    killtensorboard.on('close', (code) => {
        console.log('killed tensorboard', code);
    });
}

function setProject(value) {
    let pdosi = $(value.target).parent().parent().parent()[0].children;
    globaljs.projectDetails.name = pdosi[0].innerText;
    globaljs.projectDetails.details = pdosi[1].innerText;
}

function loadProjects() {
    let dirlist = getDirectories(projects_path)
    if (dirlist.length != 0) {
        $("#no-projects").hide();
    }

    $("#user-projects-card-row").empty();
    let projectsdetails = "";
    for (let dir in dirlist) {
        let fileData = fs.readFileSync(path.join(projects_path, dirlist[dir], "info.json"));
            try {
                const object = JSON.parse(fileData);
                projectsdetails += `
                <div class="col-sm-*">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${object.name}</h5>
                            <p class="card-text">${object.details}</p>
                            <div class="btn-group" role="group">
                                <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Open Project in </button>
                                <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                    <a class="dropdown-item opennodeeditor">Node editor</a>
                                </div>
                            </div>
                            <button type="button" class="btn btn-danger ">
                                Delete
                            </button>
                            </div>
                        </div>
                    </div>
                `;
            } catch (err) {
                print("Error in reading all projects", err)
            }
    }
    $("#user-projects-card-row").append(projectsdetails);
}

module.exports = {
    loadProjects: loadProjects,
    init: init,
    killTensorboard: killTensorboard,
    startTensorboard: startTensorboard,
    setProject: setProject
}

// $(document).ready(() => {
    // globaljs.projectDetails.name = "";
    // globaljs.projectDetails.details = "";
    // globaljs.editorText = "";
    // globaljs.modelText = "";
    // globaljs.functionsText = "";
    // globaljs.isLoaded.nodeeditor = false;
    // globaljs.graph = undefined;
// });