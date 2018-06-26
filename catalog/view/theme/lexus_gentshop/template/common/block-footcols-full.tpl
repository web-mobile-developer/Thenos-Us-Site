<?php
$sconfig = $this->registry->get('config'); 
$config = $sconfig->get('themecontrol');

$modules = $helper->getFooterModule( $blockid );
 
if( count($modules) ){
$cols = isset($config['block_'.$blockid])&& $config['block_'.$blockid]?(int)$config['block_'.$blockid]:count($modules);	
$class = $helper->calculateSpans( $ospans, $cols );

$fullclass = isset($config['home_container_full'])&&$config['home_container_full']?"-full":""; 
?>
<div class="<?php echo str_replace('_','-',$blockid); ?> <?php $blockcls;?>" id="pavo-<?php echo str_replace('_','-',$blockid); ?>">
	<div class="container<?php echo $fullclass; ?>">
		<?php $j=1;foreach ($modules as $i =>  $module) {  ?>
		<?php if(  $i++%$cols == 0 || count($modules)==1  ){  $j=1;?><div class="inner"><div class="row"><?php } ?>	
		<div class="<?php echo $class[$j];?> <?php echo isset($tmcols)?$tmcols:'';?> <?php echo isset($prefixclass)?$prefixclass:'';?> col-sm-12 col-xs-12"><?php echo $module; ?></div>
		<?php if( $i%$cols == 0 || $i==count($modules) ){ ?></div></div><?php } ?>	
		<?php  $j++;  } ?>	
	</div>
</div>
<?php } ?>