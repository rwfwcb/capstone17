<?php
header("Access-Control-Allow-Origin: *");
require('application/libraries/REST_Controller.php');

	class UserAccount extends REST_Controller {

    // RESTful API to register a user
    // Author: Robert Fink
    function registration_post(){

      // Load the model
      $this->load->model('UserAccountModel');

      // Get user information for registration
      $email = $this->post('email');
      $password = $this->post('password');
      $first_name = $this->post('first_name');
      $last_name = $this->post('last_name');

      // Hash the password for security
      // Beware that DEFAULT may change over time, so you would want to prepare
      // By allowing your storage to expand past 60 characters (255 would be good)
      $hash_pass = password_hash($password, PASSWORD_DEFAULT);

      // Send the user information to the model and try to register the user account
      $registration_response = $this->UserAccountModel->post_registration($email, $hash_pass, $first_name, $last_name);

      // If registration_response has data respond with data and success, or 404
      if($registration_response){
        // Create the user's folder to store receipt images
        mkdir("/var/www/html/ci/application/receipts/$email", 0777, TRUE);
        $this->response($registration_response, 400); // 200 Success
      } else {
        $this->response(NULL, 404); // 404 Not found
      }

    }

    // RESTful API to login a user
    // Author: Robert Fink
    function login_post(){

      // Set the initial logged_in flag to FALSE
      $logged_in = "FALSE";

      // Generic error message
      $error_message = "Incorrect email or password.";

      // Load the model
      $this->load->model('UserAccountModel');

      // Get user information for login
      $email = $this->post('email');
      $password = $this->post('password');

      // Send the user information to the model to check for the email
      $login_response = $this->UserAccountModel->post_login($email);

      if (strcmp($login_response['response'], $error_message) == 0){ // The strings are a match.
        // Email not found, send back a response with $error_message, 200 Success
        $this->response($error_message, 200);
      } elseif (password_verify($password, $login_response['response'])){
          // Email and password match
          // Set the login_message flag to TRUE
          $logged_in = "TRUE";

          // Set the session variable
          $_SESSION['email'] = $email;

          // Send back a response with $logged_in = TRUE, 200 Success
          $this->response($logged_in, 200);

        } else {
          // Password does not match, send back a response with $error_message, 200 Success
          $this->response($error_message, 200);

      }
    }

    function user_get() {
		//index.php/rest/user/id/1/format/json
		//"id/1" is the parameter

    	$this->load->model('UserAccountModel');

			if(!$this->get('id'))
			{
				$this->response(NULL, 400);
			}

			$user = $this->UserAccountModel->get_user_id($this->get('id') );

			if($user)
			{
				$this->response($user, 200); // 200 being the HTTP response code
			}

			else
			{
				$this->response(NULL, 404);
			}

  	}

    	function users_get() {
        // respond with information about several users
        // index.php/rest/users

        $this->load->model('UserAccountModel');

  			if(!$this->get('id'))
  			{
  				$this->response(NULL, 400);
  			}

  			$users = $this->UserAccountModel->get_users();

  			if($users)
  			{
  				$this->response($users, 200); // 200 being the HTTP response code
  			}

  			else
  			{
  				$this->response(NULL, 404);
  			}

    	}

  }