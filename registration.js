document.getElementById('register').addEventListener('click',function(){
    const fname = document.getElementById('first_name').value
    const lname = document.getElementById('last_name').value
    const email = document.getElementById('email').value
    const rwemail = document.getElementById('re_write_email').value
    const password = document.getElementById('password').value
    const rpassword = document.getElementById('re_password').value
    const mnumber = document.getElementById('mobile_number').value

    const user_data = {
        fname: fname,
        lname: lname,
        email: email,
        rwemail: rwemail,
        password: password,
        rpassword: rpassword,
        mnumber: mnumber          
    };

    const second_user_data = {
        email: email,
        password: password,
              
    };

    console.log(user_data)


    
    axios.post('http://localhost:5000/register', user_data)
            .then(res => {
                // //console.log(res);
                if (res.data.insertedId) {
                    
                    // window.location.href = 'log-in-page.html';

                }
            })

           if(second_user_data){

           
                axios.post('http://localhost:5000/register2', second_user_data)
                .then(res => {
                // //console.log(res);
                
            })
    
             }


            setTimeout(waiting_time,5000);
            function waiting_time(){
                axios.post('http://localhost:5000/second_register', second_user_data)
                .then(res => {
                // //console.log(res);
                if (res.data.insertedId) {
                    alert('registration successful')
                    window.location.href = 'log-in-page.html';

                }
            })
    
             }

             
})

