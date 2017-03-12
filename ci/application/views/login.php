<html>
<head>

  <title>Login to UMB Health Spending App</title>

  <!-- Load jQuery -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

  <script>
  $(document).ready(function(){
      $("#submit_login").click(function(){

        // $("#submit_login").text = "Loading";
        $("#response").html("The submit login button has been clicked");

        var email= $('#email').val();
        var password = $('#password').val();

        var url = "https://capstone.td9175.com/ci/index.php/Rest/login";

          $.post(url,
          {
            email: $('#email').val(),
            password: $('#password').val()
          },
          function(data, status){
              $("#response").html("Data: " + data + "\nStatus: " + status);
          });

      });
  });
  </script>

</head>

<body>

  <h1>Login to UMB Health Spending App</h1>

  <input type='text' id='email' placeholder='Email address'><br><br>
  <input type='password' id='password' placeholder='Password'><br><br>
  <button id='submit_login'>Login</button><br><br>


  <div id='response'></div>



</body>

</html>
