document.getElementById('log_in').addEventListener('click',function(){
    
    
    const email = document.getElementById('email').value
    
    const password = document.getElementById('password').value

    fetch('http://localhost:5000/register_data')
            .then(res => res.json())
            .then(data =>{
                console.log(data);
                data.map(user=>{
                    if (email== user.email && password== user.password) {
                        window.location.href = 'home.html';
                    }
                })


                
            })
       
})
