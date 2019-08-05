class User {

    constructor(name, gender, birth, country, email, password, photo, admin){

        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth; 
        this._country = country; 
        this._email = email; 
        this._password = password; 
        this._photo = photo; 
        this._admin = admin;
        this._register = new Date();

    }

    
    loadFromJSON(json){

        for (let name in json){

            switch (name){
                case '_register':
                    this[name] = new Date(json[name]);
                break;
                default:
                    this[name] =  json[name];    

            }

            
        }


    }

    get id(){
        return this._id;
    }

    get register(){
        return this._register;
    }

    get name(){
        return this._name;
    }

    get gender(){
        return this._gender;
    }

    get birth(){
        return this._birth;
    }

    get country(){
        return this._country;
    }

    get email(){
        return this._email;
    }

    get password(){
        return this._password;
    }

    get photo(){
        return this._photo;
    }

    get admin(){
        return this._admin;
    }

    set photo(value){
        this._photo = value;

    } 

    static getUsersStorage(){

        let users = [];
        
        // Para trazer os dados da sessao storage
       /* if(sessionStorage.getItem("users")){

            users = JSON.parse(sessionStorage.getItem("users"));
        }*/

        // Para trazer os dados do local Storage
        if(localStorage.getItem("users")){

            users = JSON.parse(localStorage.getItem("users"));
        }

        return users;


    }

    getNewID(){

        let usersID = parseInt(localStorage.getItem("usersID"));

        if(!usersID) usersID = 0;

        usersID++;

        localStorage.setItem("usersID", usersID);

        return usersID;

    }

    save(){

        let users = User.getUsersStorage();

        if(this.id > 0){

            users.map(u=>{

                if(u._id == this.id){

                    Object.assign(u, this);
                }

                return u;        


           });

           

        } else {
            
            this._id = this.getNewID();

            users.push(this);
        }

        //Para armazenar na sessao storage
        // sessionStorage.setItem("users",JSON.stringify(users));

        //Para armazenar no local store
        localStorage.setItem("users",JSON.stringify(users));
    }

    remove(){

        let users = User.getUsersStorage();

        users.forEach((userData, index)=>{

            if(this._id == userData._id){

                console.log(index);

                users.splice(index, 1);
            }
        });

        localStorage.setItem("users",JSON.stringify(users));
        
    }




}