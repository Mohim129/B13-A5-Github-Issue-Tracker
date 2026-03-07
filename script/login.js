document.getElementById('login-form').addEventListener('submit',function(event){
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if(username == 'admin' && password == 'admin123'){
        window.location.replace('main.html');
    }else{
        alert("Incorrect username or password")
        return;
    }

})