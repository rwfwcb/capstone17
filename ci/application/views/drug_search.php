<?php

$this->load->helper('form');

echo form_open('DrugSearch/search_for_drug');
echo form_input('searchQuery', set_value('searchQuery'));
echo form_submit('drugSearchSubmit', 'Search!');
echo form_close();

?>