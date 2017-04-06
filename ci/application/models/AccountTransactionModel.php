<?php
	class AccountTransactionModel extends CI_Model {


    function get_trans_info($acct_num) {
    	//http://capstone.td9175.com/ci/index.php/rest/user/id/1
    	//request for a specfic id

    	$this->load->database();

    	$query = "SELECT * FROM AccountTransaction WHERE account_number = ?";

		 $result = $this->db->query($query, $acct_num);
		foreach ($result->result_array() as $row) {
			$data[] = array(
				'transaction_id' => $row['transaction_id'],
				'account_number' => $row['account_number'],
				'amount' => $row['amount']
			);
		}

		return $data;

    }

		// Gets data (amount to reimburse) from receipt OCR and handles the transaction for reimbusement
		function reimburse_account($acct_num, $amount) {
			// Load the database
			$this->load->database();
			// Build the query
    	$query = "INSERT INTO AccountTransaction (account_number, amount) VALUES (?,?)";
			// Build the parameter array
			$params = array($acct_num, $amount);
			// Execute the query
			$result = $this->db->query($query, $params);
			// Check if the insert was successful
			echo "$result";
			if ($result != 1) {
				$result = "Error: Failed to reimburse transaction.";
			}
			// Return the result
			return $result;
		}



}


?>
