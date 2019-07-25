class UserController {

    constructor(formId, tableId){

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();


    }// fechamento metodo construtor

    onSubmit(){

        

        this.formEl.addEventListener("submit", event=>{ /*como não tem a palavra function o 
                                                            this interno se refere a class e não a função*/

            event.preventDefault();

            let btn = this.formEl.querySelector("[type=submit]")
            
            btn.disabled=true;

            let values = this.getValues();

            if(!values) return false;

            this.getPhoto().then(
                
                (content)=>{

                    values.photo = content;

                    this.addLine(values);

                    this.formEl.reset();

                    btn.disabled=false;

               }, 
                (e)=>{

                    console.error(e);

               }
            );

            

            

            

        
        });


    }// fechamento metodo onSubmit

    getPhoto(){

        return new Promise((resolve, reject)=>{

            let fileReader = new FileReader();

            let elements = [...this.formEl.elements].filter(item=>{
    
                if (item.name == 'photo') {
    
                    return item;
    
                }
            });
    
            let file = elements[0].files[0];
    
            fileReader.onload = ()=>{
    
                
                resolve(fileReader.result);
    
            };

            fileReader.onerror = (e)=>{

                reject(e);
            };

            if (file){    

                fileReader.readAsDataURL(file);
                
            }else {

                resolve('dist/img/boxed-bg.jpg');
            }    


        });

       
    }

    getValues(){

        let user = {};
        let isValid = true;

        /*... chama-se spread. Neste caso o this.formEl.elements é um objeto html e o forEach só funciona para array.
        Colocando entre colchetes com os tres pontos antes tranforma o objeto com varios elementos em um array*/
        [...this.formEl.elements].forEach(function(field, index){

            if(["name", "email", "password"].indexOf(field.name) > -1 && !field.value ){

                field.parentElement.classList.add('has-error');
                isValid=false;

            }

            if(field.name == "gender"){
        
                if(field.checked){
        
                    user[field.name] = field.value;
                }
        
            }else if(field.name == 'admin') {

                user[field.name] = field.checked;


            }
            
            else{
        
                user[field.name] = field.value;
        
            }
           
        });
        if(!isValid){
            return false;
        }
        return new User(
            user.name, 
            user.gender, 
            user.birth, 
            user.country, 
            user.email, 
            user.password, 
            user.photo, 
            user.admin
        );

        
    }// fechamento metodo getValues

    addLine(dataUser){

        let tr = document.createElement('tr');

        tr.dataset.user = JSON.stringify(dataUser);

        tr.innerHTML = `
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
            <td>${UserFul.dateFormat(dataUser.register)}</td>
            <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>`
            ;

    
        this.tableEl.appendChild(tr); 

        this.updateCount();

    }// fechamento metodo addLine

    updateCount(){

        let numberUsers =0;
        let numberAdmin =0;

        [...this.tableEl.children].forEach(tr=>{

            numberUsers++;

            let user = JSON.parse(tr.dataset.user);

            if(user._admin) numberAdmin++;

        });

        document.querySelector("#number-users").innerHTML = numberUsers;
        document.querySelector("#number-users-admin").innerHTML = numberAdmin;
    }
}