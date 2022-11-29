    //CREATE ACCOUNT
    $('#createAccountButton').on('click', function(event){
        event.preventDefault();
        var username = document.getElementById("newUsername").value
        var password = document.getElementById("newPassword").value

        
        console.log(username,password)
        $.ajax({
          url: '/userinfo',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({username: username,password: password}),
          success: function(response) {
            console.log(response);
          }
        });
    });