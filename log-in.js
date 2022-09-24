
document.getElementById('log_in').addEventListener('click',function(){
    
    
    const email = document.getElementById('email').value
    
    const password = document.getElementById('password').value

    var verify_email = email.replace(/[^a-zA-Z0-9@.]/g, "%");
    const result = verify_email.search("%");
            console.log(result)
    if(result==-1){

        fetch('http://localhost:5000/second_register')
            .then(res => res.json())
            .then(data =>{
                console.log(data);
                data.map(user=>{
                    if (email== user.email && password== user.password) {
                        window.location.href = 'home.html';
                    }
                })
                
            })
    }

    else{

        fetch(`http://localhost:5000/second_register`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then()





        
    }

    
       
})
