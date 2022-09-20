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

    console.log(user_data)





    fetch('http://localhost:5000/register',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(user_data)
    })
})
