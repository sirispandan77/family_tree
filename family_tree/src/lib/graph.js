const print = console.log;
let global = require("./global.js");

class tfNode {
    constructor(label, id=-1, name,relation, type = "middle", privacy=false) {
        this.type = type;
        this.id = id;
        this.label = label;
        this.outEdges = [];
        this.inEdges = [];
        this.parameters = global.layerParameters[name];
        this.private_details=global.layerParameters["Personals"];
        console.log(this.private_details);
        console.log("private detials");
        this.name = name;
        this.relatives=[];
        this.relation=relation;
        this.privacy= privacy;
    }

    addOutEdge(edge) {
        this.outEdges.push(edge);
    }

    addInEdge(edge) {
        this.inEdges.push(edge);
    }
    
    addRelative(data){
        console.log("graphssssssss")
        this.relatives.push(data);
    }

    removeRelation(edge){
        this.relatives = this.relatives.filter(function(el) {   console.log(Object.keys(el)[0]);console.log("el"); console.log(edge) ;return Object.keys(el)[0] != edge; }); 
        console.log("removing")
        //this.relatives.filter(id);

    }

    linking(data, cid, rel, node1 , node2){
        var dict={}
        globaljs.graph.nodes.forEach(element => {
            dict[element.id]=element;
            console.log("inside loop")
            console.log(dict)
         });
         console.log(dict[0])
        console.log("acalled")
        console.log(data)
        console.log(rel)
        console.log(data.length)
        /*for(let j in data){
            console.log(data[j])
            console.log(Object.keys(data[j])[0])
            console.log(Object.values(data[j])[0])
            var x1=Object.keys(data[j])[0]
            var x2=Object.values(data[j])[0]
            console.log(x1+" "+x2)
            console.log(x1)
            console.log(x2)
            console.log("sampling jjjjjjjj ")
        }*/
        //var da=JSON.parse(data)
        if(rel=="FATHER")        
        for(let i in data){
            var whoid= Object.keys(data[i])[0]
            var who= Object.values(data[i])[0]
            console.log(who+ " "+ whoid)
            console.log(" printing data father")
            if(who=="Son" || who=="Daughter"){
                if(who=="Daughter")
                this.relatives.push({[whoid]:"G_Daughter"});
                else    this.relatives.push({[whoid]:"G_Son"});
                dict[whoid].relatives.push({[cid]:"G_Father"})
                }
            else if(who=="Mother" ){

                this.relatives.push({[whoid]:"Wife"});
                dict[whoid].relatives.push({[cid]:"Husband"})
                }
            else if(who=="Husband" || who=="Brother_In_Law"){

                    this.relatives.push({[whoid]:"Son_In_Law"});
                    dict[whoid].relatives.push({[cid]:"Father_In_Law"})
                    } 
            else if(who=="Wife" || who=="Sister_In_Law"){

                    this.relatives.push({[whoid]:"Daughter_In_Law"});
                    dict[whoid].relatives.push({[cid]:"Father_In_Law"})
                    } 
            else if(who=="Sister"  || who=="Brother"){
                        if(who=="Sister")
                        this.relatives.push({[whoid]:"Daughter"});
                        else    this.relatives.push({[whoid]:"Son"});
                        dict[whoid].relatives.push({[cid]:"Father"})
                        }
            else if(who=="Aunt"  || who=="Uncle"){
                            if(who=="Aunt")
                                this.relatives.push({[whoid]:"Sister"});
                            else
                                this.relatives.push({[whoid]:"Brother"}); 
                            dict[whoid].relatives.push({[cid]:"Brother"}) 
                            }
            else if(who=="Daughter_In_Law" || who=="Son_In_Law"){
                                if(who=="Daughter_In_Law")
                                this.relatives.push({[whoid]:"G_Daughter"});
                                else    this.relatives.push({[whoid]:"G_Son"});
                                dict[whoid].relatives.push({[cid]:"G_Father"})
                                } 
            else if(who=="Mother_In_Law"  || who=="Father_In_Law"){
                                
                                this.relatives.push({[whoid]:"In_Law"});
                                dict[whoid].relatives.push({[cid]:"In_Law"})
                            }            
            else if(who=="Niece"  || who=="Nephew"){
                                if(who=="Niece")
                                this.relatives.push({[whoid]:"G_Daughter"});
                                else    this.relatives.push({[whoid]:"G_Son"});
                                dict[whoid].relatives.push({[cid]:"G_Father"})
                                }   
            else if(who=="Cousin" ){      
                                var gen=dict[whoid].parameters.Gender;
                                if(gen=="none" || gen=="male" || gen=="m")
                                this.relatives.push({[whoid]:"Nephew"})
                                else    this.relatives.push({[whoid]:"Neice"})  
                                dict[whoid].relatives.push({[cid]:"Uncle"})
                                    }
            }
        else if(rel=="MOTHER")
        for(let i of data){
            var whoid= Object.keys(i)[0]
            var who= Object.values(i)[0]
            console.log(who+ " "+ whoid)
            console.log(" printing data mother")
            if(who=="Son" || who=="Daughter"){
                if(who=="Daughter")
                this.relatives.push({[whoid]:"G_Daughter"});
                else    this.relatives.push({[whoid]:"G_Son"});
                dict[whoid].relatives.push({[cid]:"G_Mother"})
                
                } 
            else if(who=="Father" ){
                    this.relatives.push({[whoid]:"Husband"});
                    dict[whoid].relatives.push({[cid]:"Wife"})
                   
                    }    
            else if(who=="Husband" || who=="Brother_In_Law"){

                        this.relatives.push({[whoid]:"Son_In_Law"});
                        dict[whoid].relatives.push({[cid]:"Mother_In_Law"})
                                                } 
            else if(who=="Wife" || who=="Sister_In_Law"){
                            this.relatives.push({[whoid]:"Daughter_In_Law"});
                            dict[whoid].relatives.push({[cid]:"Mother_In_Law"})
                                                        }
            else if(who=="Sister"  || who=="Brother"){  
                            if(who=="Brother")  
                            this.relatives.push({[whoid]:"Son"});
                            else    this.relatives.push({[whoid]:"Daughter"});
                            dict[whoid].relatives.push({[cid]:"Mother"})
                            } 
            else if(who=="Mother_In_Law"  || who=="Father_In_Law"){
                                
                                this.relatives.push({[whoid]:"In_Law"});
                                dict[whoid].relatives.push({[cid]:"In_Law"})
                                                                }
            else if(who=="Daughter_In_Law" || who=="Son_In_Law"){
                                    if(who=="Daughter_In_Law")                                        
                                        this.relatives.push({[whoid]:"G_Daughter"});
                                    else
                                    this.relatives.push({[whoid]:"G_Son"});
                                    dict[whoid].relatives.push({[cid]:"G_Mother"})
                                                                        }    
            else if(who=="Aunt"  || who=="Uncle"){
                                    if(who=="Aunt")
                                        this.relatives.push({[whoid]:"Sister"});
                                    else
                                        this.relatives.push({[whoid]:"Brother"});  
                                        dict[whoid].relatives.push({[cid]:"Sister"})
                                                                        } 
            else if(who=="Niece"  || who=="Nephew"){
                                        if(who=="Niece")
                                        this.relatives.push({[whoid]:"G_Daughter"});
                                        else    this.relatives.push({[whoid]:"G_Son"});
                                        dict[whoid].relatives.push({[cid]:"G_Mother"})                                        
                                        } 
            else if(who=="Cousin" ){      
                                            var gen=dict[whoid].parameters.Gender;
                                            if(gen=="none" || gen=="male" || gen=="m")
                                            this.relatives.push({[whoid]:"Nephew"})
                                            else    this.relatives.push({[whoid]:"Neice"})  
                                            dict[whoid].relatives.push({[cid]:"Aunt"})
                                                }  
            }
            else if(rel=="SISTER"){
                for(let i of data){
                    var whoid= Object.keys(i)[0]
                    var who= Object.values(i)[0]                       
            console.log("in sis zone")
                console.log(who+ " "+ whoid)
                console.log(" printing data sis")
                
                if(who=="Son" || who=="Daughter"){
                    if(who=="Daughter")
                    this.relatives.push({[whoid]:"Niece"});
                    else
                    this.relatives.push({[whoid]:"Nephew"});
                    dict[whoid].relatives.push({[cid]:"Aunt"})                    
                    } 
                else if(who=="G_Mother" || who=="G_Father" ){
                        if(who=="G_Mother")
                        this.relatives.push({[whoid]:"G_Mother"});
                        else    this.relatives.push({[whoid]:"G_Father"});
                        dict[whoid].relatives.push({[cid]:"G_Daughter"})                        
                        }
                else if(who=="Mother" ){
                        this.relatives.push({[whoid]:"Mother"});
                        dict[whoid].relatives.push({[cid]:"Daughter"})                        
                        }
                else if(who=="Father" ){
                        this.relatives.push({[whoid]:"Father"});
                        dict[whoid].relatives.push({[cid]:"Daughter"})                        
                        }    
                else if(who=="Husband" ){    
                            this.relatives.push({[whoid]:"Brother_In_Law"});
                            dict[whoid].relatives.push({[cid]:"Sister_In_Law"})                            
                            }
                else if(who=="Wife" ){        
                                this.relatives.push({[whoid]:"Sister_In_Law"});
                                dict[whoid].relatives.push({[cid]:"Sister_In_Law"})                                
                                } 
                else if(who=="Sister"  || who=="Brother"){    
                                if(who=="Sister")                            
                                    this.relatives.push({[whoid]:"Sister"});
                                else    this.relatives.push({[whoid]:"Brother"});
                                dict[whoid].relatives.push({[cid]:"Sister"})                                
                                }  
                else if(who=="Mother_In_Law"  || who=="Father_In_Law"){                                
                                if(who=="Mother_In_Law")                            
                                this.relatives.push({[whoid]:"Mother_In_Law"});
                                else    this.relatives.push({[whoid]:"Father_In_Law"}); 
                                dict[whoid].relatives.push({[cid]:"Daughter_In_Law"})                                
                                }
                else if(who=="Daughter_In_Law" || who=="Son_In_Law"){
                                    if(who=="Daughter_In_Law")                                        
                                        this.relatives.push({[whoid]:"Daughter_In_Law"});
                                    else
                                    this.relatives.push({[whoid]:"Son_In_Law"});
                                    dict[whoid].relatives.push({[cid]:"Mother_In_Law"})
                                                                        }     
                else if(who=="Sister_In_Law"  || who=="Brother_In_Law"){                                
                                if(who=="Sister_In_Law")                            
                                this.relatives.push({[whoid]:"Sister_In_Law"});
                                else    this.relatives.push({[whoid]:"Brother_In_Law"});
                                dict[whoid].relatives.push({[cid]:"Sister_In_Law"})                                 
                                }    
                else if(who=="Aunt"  || who=="Uncle"){
                                    if(who=="Aunt")                            
                                    this.relatives.push({[whoid]:"Aunt"});
                                    else    this.relatives.push({[whoid]:"Uncle"});
                                    dict[whoid].relatives.push({[cid]:"Niece"})                                    
                                    }
                else if(who=="Niece"  || who=="Nephew"){
                                        if(who=="Niece")
                                        this.relatives.push({[whoid]:"Niece"});
                                        else    this.relatives.push({[whoid]:"Nephew"});
                                        dict[whoid].relatives.push({[cid]:"Aunt"})                                        
                                        } 
                else if(who=="Cousin" ){      
                                             this.relatives.push({[whoid]:"Cousin"})  
                                            dict[whoid].relatives.push({[cid]:"Cousin"})
                        }
                    }
                                    
                }        
               
                else if(rel=="BROTHER"){
                    console.log("in sis zone")
                for(let i of data){
                    var whoid= Object.keys(i)[0]
                    var who= Object.values(i)[0]
                    console.log(who+ " "+ whoid)
                    console.log(" printing data sis")

                    if(who=="Son" || who=="Daughter"){
                        if(who=="Daughter")
                        this.relatives.push({[whoid]:"Niece"});
                        else
                        this.relatives.push({[whoid]:"Nephew"}); 
                        dict[whoid].relatives.push({[cid]:"Uncle"})                        
                        
                        } 
                    else if(who=="G_Mother" || who=="G_Father" ){
                            if(who=="G_Mother")
                            this.relatives.push({[whoid]:"G_Mother"});
                            else    this.relatives.push({[whoid]:"G_Father"});
                            dict[whoid].relatives.push({[cid]:"G_Son"}) 
                            
                            }
                    else if(who=="Father" ){
                            this.relatives.push({[whoid]:"Father"});
                            dict[whoid].relatives.push({[cid]:"Son"}) 
                            
                            }
                    else if(who=="Mother" ){
                                this.relatives.push({[whoid]:"Mother"});
                                dict[whoid].relatives.push({[cid]:"Son"}) 
                                
                                }    
                    else if(who=="Husband" ){
        
                                this.relatives.push({whoid:"Brother_In_Law"});
                                dict[whoid].relatives.push({cid:"Brother_In_Law"}) 
                                
                                } 
                    else if(who=="Wife" ){
        
                                    this.relatives.push({[whoid]:"Sister_In_Law"});
                                    dict[whoid].relatives.push({[cid]:"Brother_In_Law"}) 
                                    
                                    }
                    else if(who=="Sister"  || who=="Brother"){
                                    if(who=="Sister")
                                        this.relatives.push({[whoid]:"Sister"});
                                    else
                                        this.relatives.push({[whoid]:"Brother"}); 
                                        dict[whoid].relatives.push({[cid]:"Brother"})  
                                    
                                    }
                    else if(who=="Mother_In_Law"  || who=="Father_In_Law"){                                
                        if(who=="Mother_In_Law")                            
                        this.relatives.push({[whoid]:"Mother_In_Law"});
                        else    this.relatives.push({[whoid]:"Father_In_Law"});
                        dict[whoid].relatives.push({[cid]:"Son_In_Law"})                                      
                                    }    
                    else if(who=="Aunt"  || who=="Uncle"){
                        if(who=="Aunt")                            
                        this.relatives.push({[whoid]:"Aunt"});
                        else    this.relatives.push({[whoid]:"Uncle"});
                        dict[whoid].relatives.push({[cid]:"Niece"});                                        
                            }  
                    else if(who=="Daughter_In_Law" || who=="Son_In_Law"){
                                            if(who=="Daughter_In_Law")                                        
                                                this.relatives.push({[whoid]:"Daughter_In_Law"});
                                            else
                                            this.relatives.push({[whoid]:"Son_In_Law"});
                                            dict[whoid].relatives.push({[cid]:"Father_In_Law"})
                                                                                }     
                    else if(who=="Sister_In_Law"  || who=="Brother_In_Law"){                                
                                        if(who=="Sister_In_Law")                            
                                        this.relatives.push({[whoid]:"Sister_In_Law"});
                                        else    this.relatives.push({[whoid]:"Brother_In_Law"}); 
                                        dict[whoid].relatives.push({[cid]:"Brother_In_Law"})                                         
                                        }
                    else if(who=="Niece"  || who=="Nephew"){
                                            if(who=="Niece")
                                            this.relatives.push({[whoid]:"Niece"});
                                            else    this.relatives.push({[whoid]:"Nephew"});
                                            dict[whoid].relatives.push({[cid]:"Uncle"})                                        
                        } 
                    else if(who=="Cousin" ){      
                            this.relatives.push({[whoid]:"Cousin"})  
                           dict[whoid].relatives.push({[cid]:"Cousin"})
       }      
                    }
                }        
            else if(rel=="HUSBAND")        
                for(let i in data){
                    var whoid= Object.keys(data[i])[0]
                    var who= Object.values(data[i])[0]
                    console.log(who+ " "+ whoid)
                    console.log(" printing data father")
                    if(who=="Son" || who=="Daughter"){
                        if(who=="Daughter")
                        this.relatives.push({[whoid]:"Daughter"});
                        else    this.relatives.push({[whoid]:"Son"});
                        dict[whoid].relatives.push({[cid]:"Father"})
                        }
                    else if(who=="G_Mother" || who=="G_Father" ){
                            if(who=="G_Mother")
                            this.relatives.push({[whoid]:"G_Mother"});
                            else    this.relatives.push({[whoid]:"G_Father"});
                            dict[whoid].relatives.push({[cid]:"G_Son"})
                            
                            }
                    else if(who=="Mother" ){
        
                        this.relatives.push({[whoid]:"Mother_In_Law"});
                        dict[whoid].relatives.push({[cid]:"Son_In_Law"})
                        }
                    else if(who=="Father" ){
        
                            this.relatives.push({[whoid]:"Father_In_Law"});
                            dict[whoid].relatives.push({[cid]:"Son_In_Law"})
                    }
                    else if(who=="Brother_In_Law"){
        
                            this.relatives.push({[whoid]:"Brother_In_Law"});
                            dict[whoid].relatives.push({[cid]:"Brother_In_Law"})
                            } 
                    else if(who=="Sister_In_Law"){
        
                            this.relatives.push({[whoid]:"Sister_In_Law"});
                            dict[whoid].relatives.push({[cid]:"Brother_In_Law"})
                            } 
                    else if(who=="Sister"  || who=="Brother"){
                                if(who=="Sister")
                                this.relatives.push({[whoid]:"Sister_In_Law"});
                                else    this.relatives.push({[whoid]:"Brother_In_Law"});
                                dict[whoid].relatives.push({[cid]:"Brother_In_Law"})
                                }
                    else if(who=="Aunt"  || who=="Uncle"){
                                    if(who=="Aunt")
                                        this.relatives.push({[whoid]:"Aunt"});
                                    else
                                        this.relatives.push({[whoid]:"Uncle"}); 
                                    dict[whoid].relatives.push({[cid]:"Nephew_In_Law"}) 
                        }
                    else if(who=="Mother_In_Law"  || who=="Father_In_Law"){                                
                            if(who=="Mother_In_Law")                            
                            this.relatives.push({[whoid]:"Mother_In_Law"});
                            else    this.relatives.push({[whoid]:"Father_In_Law"});
                            dict[whoid].relatives.push({[cid]:"Son_In_Law"})                                      
                                        } 
                    else if(who=="Daughter_In_Law" || who=="Son_In_Law"){
                                        if(who=="Daughter_In_Law")
                                        this.relatives.push({[whoid]:"Daughter_In_Law"});
                                        else    this.relatives.push({[whoid]:"Son_In_Law"});
                                        dict[whoid].relatives.push({[cid]:"Father_In_Law"})
                                        } 
                               
                    else if(who=="Niece"  || who=="Nephew"){
                                        if(who=="Niece")
                                        this.relatives.push({"Niece":whoid});
                                        else    this.relatives.push({[whoid]:"Nephew"});
                                        dict[whoid].relatives.push({[cid]:"Uncle"})
                    }   
                    else if(who=="Cousin" ){      
                        var gen=dict[whoid].parameters.Gender;
                        if(gen=="none" || gen=="male" || gen=="m")
                        this.relatives.push({[whoid]:"Sister_In_Law"})
                        else    this.relatives.push({[whoid]:"Brother_In_Law"})  
                        dict[whoid].relatives.push({[cid]:"Brother_In_Law"})
                            }
                    }                            
            else if(rel=="WIFE")        
                for(let i in data){
                    var whoid= Object.keys(data[i])[0]
                    var who= Object.values(data[i])[0]
                    console.log(who+ " "+ whoid)
                    console.log(" printing data father")
                    if(who=="Son" || who=="Daughter"){
                        if(who=="Daughter")
                        this.relatives.push({[whoid]:"Daughter"});
                        else    this.relatives.push({[whoid]:"Son"});
                        dict[whoid].relatives.push({[cid]:"Mother"})
                        }
                    else if(who=="G_Mother" || who=="G_Father" ){
                            if(who=="G_Mother")
                            this.relatives.push({[whoid]:"G_Mother"});
                            else    this.relatives.push({[whoid]:"G_Father"});
                            dict[whoid].relatives.push({[cid]:"G_Daughter"})
                            
                            }
                    else if(who=="Mother" ){
        
                        this.relatives.push({[whoid]:"Mother_In_Law"});
                        dict[whoid].relatives.push({[cid]:"Daughter_In_Law"})
                        }
                    else if(who=="Father" ){
            
                            this.relatives.push({[whoid]:"Father_In_Law"});
                            dict[whoid].relatives.push({[cid]:"Daughter_In_Law"})
                    }
                    
                    else if(who=="Brother_In_Law"){
        
                            this.relatives.push({[whoid]:"Brother_In_Law"});
                            dict[whoid].relatives.push({[cid]:"Sister_In_Law"})
                            } 
                    else if(who=="Sister_In_Law"){
        
                            this.relatives.push({[whoid]:"Sister_In_Law"});
                            dict[whoid].relatives.push({[cid]:"Sister_In_Law"})
                            } 
                    else if(who=="Sister"  || who=="Brother"){
                                if(who=="Sister")
                                this.relatives.push({[whoid]:"Sister_In_Law"});
                                else    this.relatives.push({[whoid]:"Brother_In_Law"});
                                dict[whoid].relatives.push({[cid]:"Sister_In_Law"})
                                }
                    else if(who=="Aunt"  || who=="Uncle"){
                                    if(who=="Aunt")
                                        this.relatives.push({[whoid]:"Aunt"});
                                    else
                                        this.relatives.push({[whoid]:"Uncle"}); 
                                    dict[whoid].relatives.push({[cid]:"Neice_In_Law"}) 
                                    }
                    else if(who=="Daughter_In_Law" || who=="Son_In_Law"){
                                        if(who=="Daughter_In_Law")
                                        this.relatives.push({[whoid]:"Daughter_In_Law"});
                                        else    this.relatives.push({[whoid]:"Son_In_Law"});
                                        dict[whoid].relatives.push({[cid]:"Mother_In_Law"})
                                        }            
                    else if(who=="Niece"  || who=="Nephew"){
                                        if(who=="Niece")
                                        this.relatives.push({[whoid]:"Niece"});
                                        else    this.relatives.push({[whoid]:"Nephew"});
                                        dict[whoid].relatives.push({[cid]:"Aunt"})
                }   
                    else if(who=="Mother_In_Law"  || who=="Father_In_Law"){                                
                        if(who=="Mother_In_Law")                            
                        this.relatives.push({[whoid]:"Mother_In_Law"});
                        else    this.relatives.push({[whoid]:"Father_In_Law"});
                        dict[whoid].relatives.push({[cid]:"Daughter_In_Law"})                                      
                                    } 
                    else if(who=="Cousin" ){      
                            var gen=dict[whoid].parameters.Gender;
                            if(gen=="none" || gen=="male" || gen=="m")
                            this.relatives.push({[whoid]:"Sister_In_Law"})
                            else    this.relatives.push({[whoid]:"Brother_In_Law"})  
                            dict[whoid].relatives.push({[cid]:"Sister_In_Law"})
                                }
                    }                                        
                else if(rel=="DAUGHTER")        
                for(let i in data){
                    var whoid= Object.keys(data[i])[0]
                    var who= Object.values(data[i])[0]
                    if(who=="Son" || who=="Daughter"){
                        if(who=="Daughter")
                        this.relatives.push({[whoid]:"Sister"});
                        else    this.relatives.push({[whoid]:"Brother"});
                        dict[whoid].relatives.push({[cid]:"Sister"})
                        }
                    else if(who=="Mother" ){
        
                        this.relatives.push({[whoid]:"G_Mother"});
                        dict[whoid].relatives.push({[cid]:"G_Daughter"})
                        }
                    else if(who=="Father" ){
        
                            this.relatives.push({[whoid]:"G_Father"});
                            dict[whoid].relatives.push({[cid]:"G_Daughter"})
                    }
                    else if(who=="Husband" || who=="Wife"){
                            if(who=="Husband")
                                this.relatives.push({[whoid]:"Father"});
                            else    this.relatives.push({[whoid]:"Mother"});
                        dict[whoid].relatives.push({[cid]:"Daughter"})
                        } 
                    else if(who=="Brother_In_Law"){
        
                            this.relatives.push({[whoid]:"Uncle"});
                            dict[whoid].relatives.push({[cid]:"Neice"})
                            } 
                    else if(who=="Sister_In_Law"){
        
                            this.relatives.push({[whoid]:"Aunt"});
                            dict[whoid].relatives.push({[cid]:"Neice"})
                    } 
                    
                    else if(who=="Sister"  || who=="Brother"){
                                if(who=="Sister")
                                this.relatives.push({[whoid]:"Aunt"});
                                else    this.relatives.push({[whoid]:"Uncle"});
                                dict[whoid].relatives.push({[cid]:"Neice"})
                                }
                    else if(who=="Aunt"  || who=="Uncle"){
                                    if(who=="Aunt")
                                        this.relatives.push({[whoid]:"G_Mother"});
                                    else
                                        this.relatives.push({[whoid]:"G_Father"}); 
                                    dict[whoid].relatives.push({[cid]:"G_Daughter"}) 
                                    }
                    else if(who=="Mother_In_Law" || who=="Father_In_Law"){
                                        if(who=="Mother_In_Law")
                                        this.relatives.push({[whoid]:"G_Mother"});
                                        else    this.relatives.push({[whoid]:"G_Father"});
                                        dict[whoid].relatives.push({[cid]:"G_Daughter"})
                                        }  
                    else if(who=="Daughter_In_Law" || who=="Son_In_Law"){
                                        if(who=="Daughter_In_Law")
                                        this.relatives.push({[whoid]:"Sister_In_Law"});
                                        else    this.relatives.push({[whoid]:"Brother_In_Law"});
                                        dict[whoid].relatives.push({[cid]:"Sister_In_Law"})
                                        }            
                    else if(who=="Niece"  || who=="Nephew"){
                                        if(who=="Niece")
                                        this.relatives.push({[whoid]:"Cousin"});
                                        else    this.relatives.push({[whoid]:"Cousin"});
                                        dict[whoid].relatives.push({[cid]:"Cousin"})
                    }   
                    else if(who=="Cousin" ){      
                        var gen=dict[whoid].parameters.Gender;
                        if(gen=="none" || gen=="male" || gen=="m")
                        this.relatives.push({[whoid]:"Aunt"})
                        else    this.relatives.push({[whoid]:"Uncle"})  
                        dict[whoid].relatives.push({[cid]:"Neice"})
                            }
                    }                   
                    else if(rel=="SON")        
                    for(let i in data){
                        var whoid= Object.keys(data[i])[0]
                        var who= Object.values(data[i])[0]
                        if(who=="Son" || who=="Daughter"){
                            if(who=="Daughter")
                            this.relatives.push({[whoid]:"Sister"});
                            else    this.relatives.push({[whoid]:"Brother"});
                            dict[whoid].relatives.push({[cid]:"Brother"})
                            }
                        else if(who=="Mother" ){
            
                            this.relatives.push({[whoid]:"G_Mother"});
                            dict[whoid].relatives.push({[cid]:"G_Son"})
                            }
                        else if(who=="Father" ){
        
                                this.relatives.push({[whoid]:"G_Father"});
                                dict[whoid].relatives.push({[cid]:"G_Son"})
                        }
                        else if(who=="Husband" || who=="Wife"){
                            if(who=="Husband")
                                this.relatives.push({[whoid]:"Father"});
                            else    this.relatives.push({[whoid]:"Mother"});
                            dict[whoid].relatives.push({[cid]:"Son"})
                        } 
                        else if(who=="Brother_In_Law"){
            
                                this.relatives.push({[whoid]:"Uncle"});
                                dict[whoid].relatives.push({[cid]:"Nephew"})
                                } 
                        else if(who=="Sister_In_Law"){
            
                                this.relatives.push({[whoid]:"Aunt"});
                                dict[whoid].relatives.push({[cid]:"Nephew"})
                                } 
                        else if(who=="Sister"  || who=="Brother"){
                                    if(who=="Sister")
                                    this.relatives.push({[whoid]:"Aunt"});
                                    else    this.relatives.push({[whoid]:"Uncle"});
                                    dict[whoid].relatives.push({[cid]:"Nephew"})
                                    }
                        else if(who=="Aunt"  || who=="Uncle"){
                                        if(who=="Aunt")
                                            this.relatives.push({[whoid]:"G_Mother"});
                                        else
                                            this.relatives.push({[whoid]:"G_Father"}); 
                                        dict[whoid].relatives.push({[cid]:"G_Son"}) 
                                        }
                        else if(who=="Daughter_In_Law" || who=="Son_In_Law"){
                                            if(who=="Daughter_In_Law")
                                            this.relatives.push({[whoid]:"Sister_In_Law"});
                                            else    this.relatives.push({[whoid]:"Brother_In_Law"});
                                            dict[whoid].relatives.push({[cid]:"Brother_In_Law"})
                                            }
                        else if(who=="Mother_In_Law" || who=="Father_In_Law"){
                                                if(who=="Mother_In_Law")
                                                this.relatives.push({[whoid]:"G_Mother"});
                                                else    this.relatives.push({[whoid]:"G_Father"});
                                                dict[whoid].relatives.push({[cid]:"G_Son"})
                                                }            
                        else if(who=="Niece"  || who=="Nephew"){
                                            if(who=="Niece")
                                            this.relatives.push({[whoid]:"Cousin"});
                                            else    this.relatives.push({[whoid]:"Cousin"});
                                            dict[whoid].relatives.push({[cid]:"Cousin"})
                        }   
                        else if(who=="Cousin" ){      
                            var gen=dict[whoid].parameters.Gender;
                            if(gen=="none" || gen=="male" || gen=="m")
                            this.relatives.push({[whoid]:"Aunt"})
                            else    this.relatives.push({[whoid]:"Uncle"})  
                            dict[whoid].relatives.push({[cid]:"Nephew"})
                                }
                        }

    }
}

class tfEdge {
    constructor(node1, node2, arrow, id) {
        this.id = id;
        console.log(this.id);
        
        this.fromNode = node1;
        this.toNode = node2;
        this.arrow = arrow;
        if (node2) {
            this.fromNode.addOutEdge(this)
            this.toNode.addInEdge(this)
        }
    }
}

class tfGraph {
    constructor() {
        this.numberOfEdges = 0;
        this.numberOfNodes = 0;
        this.inputs = [];
        this.outputs = [];
        this.modelStage;
        this.modelLayer;
        this.nodes = [];
        this.edges = [];
    }

    addNode(node){
        this.nodes.push(node);
        this.numberOfNodes=Math.max(this.numberOfNodes,node.id)+1;
    }

    addEdge(edge){
        this.edges.push(edge);

        this.numberOfEdges++;
    }

    removeNode(node){
        this.nodes = this.nodes.filter(function(el) { return el != node; }); 
        this.numberOfNodes--;
    }

    removeEdge(edge){
        this.edges = this.edges.filter(function(el) { return el != edge; }); 
        this.numberOfEdges--;
    }

    addInput(input) {
        this.inputs.push(input);
    }

    addOutput(output) {
        this.outputs.push(output);
    }


    bfs(temp2) {
        if (temp2.inEdges.length == 0){
            this.calledList = this.calledList.reverse().join('\n'); 
        }else{
            let queue = [];
            for(var i=0;i<temp2.inEdges.length;i++){
                queue.push(temp2.inEdges[i].fromNode);
            }
            while(queue.length > 0){
                temp2 = queue.shift();
                
                let tstr = "";
                let tempparameters = "";
                let layerName = temp2.name;
                this.usedFunctions.push(layerName);
    
                for (const [key, value] of Object.entries(temp2.parameters)) {
                    tempparameters += `${key} = ${value},`;
                }
            }
            this.calledList = this.calledList.reverse().join('\n'); 
        }
    }

    traverse() {
        let temp = this.inputs[0];
        let modelCode = "\n";
        let layer = {};
        let lasttemp, layerName, lastLayerName;
        let isCorrectModel = {
            InputLayer: false,
            Output: false,
            middle: false
        };
        this.calledList = []
        this.usedFunctions = []
        try {
            this.bfs(temp)
            
            temp = this.inputs[0];
            while (temp) {
                layerName = temp.name;
                let tempparameters = "";

                if( layerName == "fit" || layerName == "fit_generator"){
                    for (const [key, value] of Object.entries(temp.parameters)) {
                        tempparameters += `${key} = ${value},`
                    }

                    modelCode += `\n# function for training model
model = Network()
model.${layerName}(${tempparameters})\n
`;

                }else if (layerName == "Output") {
                    isCorrectModel.Output = true;
                    lastLayerName = lasttemp.name;

                    modelCode += `    model = Model(inputs=InputLayer_${layer["InputLayer"]}, outputs=${lastLayerName+"_"+layer[lastLayerName]})\n`;
                    
                    switch(temp.parameters["optimizer"]) {
                        case "sgd":
                            modelCode += `    optimizer = tf.keras.optimizers.SGD(lr=${temp.parameters["learning_rate"]}, momentum=0.0, decay=0.0,)\n`;
                            break;
                        case "adam":
                            modelCode += `    optimizer = tf.keras.optimizers.Adam(lr=${temp.parameters["learning_rate"]}, beta_1=0.9,beta_2=0.999, epsilon=None, decay = 0.0, amsgrad=False)\n`;
                            break;
                        default:
                            break;
                    }

                    for (const [key, value] of Object.entries(temp.parameters)) {
                        if(key != "optimizer" && key != "learning_rate")
                            tempparameters += `${key} = ${value},`
                    }

                    modelCode += `    model = Model(inputs=InputLayer_${layer["InputLayer"]}, outputs=${lastLayerName+"_"+layer[lastLayerName]})\n`;
                    modelCode += `    model.compile(metrics=['mae','accuracy', 'mse', 'mape', 'cosine', 'categorical_crossentropy'], optimizer=optimizer , ${tempparameters})\n`
                    modelCode += `    return model\n`
                } else if (layerName == "InputLayer") {
                    isCorrectModel.InputLayer = true;
                    if (layerName in layer)
                        layer[layerName]++;
                    else
                        layer[layerName] = 1;

                    for (const [key, value] of Object.entries(temp.parameters)) {
                        tempparameters += `${key} = ${value},`
                    }
                    
                    modelCode += "def Network():\n";
                    modelCode += `    ${layerName+"_"+layer[layerName]} = Input(${tempparameters})`
                } else {
                    isCorrectModel.middle = true;
                    lastLayerName = lasttemp.name;
                    if (layerName in layer) {
                        layer[layerName]++;
                    } else {
                        layer[layerName] = 1;
                    }

                    for (const [key, value] of Object.entries(temp.parameters)) {
                        tempparameters += `${key} = ${value},`
                    }

                    if (layerName == lastLayerName)
                        modelCode += `    ${layerName+"_"+layer[layerName]} = ${layerName}(${tempparameters})(${lastLayerName+"_"+(layer[lastLayerName] - 1)})`
                    else
                        modelCode += `    ${layerName+"_"+layer[layerName]} = ${layerName}(${tempparameters})(${lastLayerName+"_"+layer[lastLayerName]})`
                }

                lasttemp = temp;
                if (temp.outEdges.length) {
                    temp = temp.outEdges[0].toNode;
                } else {
                    break;
                }
                modelCode += "\n";
            }
        } catch (err) {
            console.log(err)
            return null;
        }

        if (isCorrectModel.Output && isCorrectModel.InputLayer && isCorrectModel.middle) {
            return [modelCode, this.calledList, this.usedFunctions];
        } else {
            return null;
        }
    }
}


global.graph = new tfGraph();
global.graph.modelLayer = new Konva.Layer();



module.exports = {
    tfGraph,
    tfNode,
    tfEdge
};