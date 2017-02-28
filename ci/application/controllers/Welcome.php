<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require('application/libraries/REST_Controller.php');

class Welcome extends Rest_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		$this->load->view('welcome_message');
	}
	
	public function index_get()
    {
    	/*echo "user get()";
    	//call would be = index.php/Welcome/user?id=1
        $data = array('returned: '. $this->get('id'));
        $this->response($data);
        */
        $this->load->model('UserAccountModel');
        if(!$this->get('id'))
        {
            $this->response(NULL, 400);
        }
 		echo "here i am"; 
        $user = $this->UserAccountModel->get_user_id();
         
        if($user)
        {
            $this->response($user, 200); // 200 being the HTTP response code
            echo "success";
        }
 
        else
        {
            $this->response(NULL, 404);
        }
        
    }
}

?>