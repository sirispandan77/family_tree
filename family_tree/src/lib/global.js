
let graph;



let modelText = "";
let relatives= {
    Mother:[],
    Father:[],
    GrandFather:[],
    GrandMother:[],
    Aunt:[],
    Uncle:[],
    Child:[]
};
let layerParameters = {
    
    Personals:{
        //Photo: 'F:/tensorflow-gui-master/tensorflow-gui-master/imgs/male.png',
        Place_of_birth: "None",
        Year_of_birth: "None",        
        phone_number: "None",
        Occupation: "None",
        Address: "None",
        FaceBook_handle: "None",
        Instagram_handle: "None",
        Twitter_handle: "None"
    },
    BROTHER:{
       // Photo:'https://cdn2.iconfinder.com/data/icons/personicon-1/300/personicon11-512.png ',
      // Photo: 'F:/tensorflow-gui-master/tensorflow-gui-master/imgs/male.png',
        First_name: "None",
        Last_name: "None",
        Gender: "Male",        
        Email: "None",
        Alive_or_Dead: "Alive"
        
    },
    SISTER:{
        //Photo:'https://cdn2.iconfinder.com/data/icons/personicon-1/300/personicon11-512.png ',
      //  Photo: 'F:/tensorflow-gui-master/tensorflow-gui-master/imgs/female1.png',
        First_name: "None",
        Last_name: "None",
        Gender: "Female",
        Email: "None",
        Alive_or_Dead: "Alive"
    },
    FATHER:{
       // Photo:'https://cdn2.iconfinder.com/data/icons/personicon-1/300/personicon11-512.png ',
      // Photo: 'F:/tensorflow-gui-master/tensorflow-gui-master/imgs/male.png',
        First_name: "None",
        Last_name: "None",
        Gender: "Male",
        Email: "None",
        Alive_or_Dead: "Alive"
    },
    MOTHER:{
        //Photo:'https://cdn2.iconfinder.com/data/icons/personicon-1/300/personicon11-512.png ',
      //  Photo: 'F:/tensorflow-gui-master/tensorflow-gui-master/imgs/female1.png',
        First_name: "None",
        Last_name: "None",
        Gender: "Female",
        Email: "None",
        Alive_or_Dead: "Alive"
    },
    WIFE:{
        //Photo:'https://cdn2.iconfinder.com/data/icons/personicon-1/300/personicon11-512.png ',
       // Photo: 'F:/tensorflow-gui-master/tensorflow-gui-master/imgs/female1.png',
        First_name: "None",
        Last_name: "None",
        Gender: "Female",
        Email: "None",
        Alive_or_Dead: "Alive"
    },
    HUSBAND:{
       // Photo:'https://cdn2.iconfinder.com/data/icons/personicon-1/300/personicon11-512.png ',
      // Photo: 'F:/tensorflow-gui-master/tensorflow-gui-master/imgs/male.png',
        First_name: "None",
        Last_name: "None",
        Gender: "Female",
        Email: "None",
        Alive_or_Dead: "Alive"
    },
    SON:{
        //Photo:'https://cdn2.iconfinder.com/data/icons/personicon-1/300/personicon11-512.png ',
      //  Photo: 'F:/tensorflow-gui-master/tensorflow-gui-master/imgs/male.png',
        First_name: "None",
        Last_name: "None",
        Gender: "Male",
        Email: "None",
        Alive_or_Dead: "Alive"
    },
    DAUGHTER:{
       // Photo:'https://cdn2.iconfinder.com/data/icons/personicon-1/300/personicon11-512.png ',
      // Photo: 'F:/tensorflow-gui-master/tensorflow-gui-master/imgs/female1.png',
        First_name: "None",
        Last_name: "None",
        Gender: "Female",
        Email: "None",
        Alive_or_Dead: "Alive"
    }
    
   
}

let functionsText = ""

let projectDetails = {
    name: "",
    iseditor: false,
    details: "",
    creation_time: "",
    last_edited: "",
};

let isLoaded = {
    nodeeditor: false
}

let nodes={};
let edges={};
module.exports = {
    modelText: modelText,
    graph: graph,
    layerParameters: layerParameters,
    functionsText: functionsText,
    projectDetails: projectDetails,
    isLoaded: isLoaded,
    relatives: relatives,
    nodes: nodes,
    edges: edges
}