      <div class="page-header">
        <h1>Exception</h1>
      </div>
    
	<hr>
	<div class="error">
		<?php foreach ($messages as $message): ?>
			<div class="<?php echo $message['style']; ?>">
				<?php echo $message['text']; ?>
			</div>
		<?php endforeach; ?>
	</div>
	<div class="row">
        <div class="col-md-12 exception">
			<p><?php echo $e->getMessage(); ?></p>
			<p><strong>File:</strong> <?php echo $e->getFile(); ?>:<strong><?php echo $e->getLine(); ?></strong></p>
			<hr>
			<p><pre><?php echo $e->getTraceAsString(); ?></pre></p>
		</div>	
    </div>
