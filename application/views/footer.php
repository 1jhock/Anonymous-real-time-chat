
<input type="hidden" id="base" value="<?=base_url()?>">
<input type="hidden" id="usern" value="<?=$this->session->userdata('username')?>">
<script src="<?=base_url()?>assets/js/jquery.js"></script>
<script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
<!-- <script src="<?=base_url()?>node_modules/socket.io/socket.io.js"></script>	 -->
<script src="<?=base_url()?>assets/js/socket-client.js"></script>
<script src="<?=base_url()?>assets/js/app.js"></script>
</body>
</html>