<?php
/*
 *	Plugin Name: txGarage Events UI
 *	Plugin URI: http://txGarage.com
 *	Description: Display Events
 *	Version: 1.0
 *	Author: Adam Moore
 *	Author URI: http://ampnetmedia.com
 *	License: GPL2
 *
*/

function eventUI($atts, $content = null) {
  // GLOBALS
  $PLUGIN_URL = WP_PLUGIN_URL . '/txg-events-ui';
  $build = '<div id="event-app"></div>';
  $build .= '<link rel="stylesheet" href="'.$PLUGIN_URL.'/build/css/styles.css"></script>';
  $build .= '<script src="'.$PLUGIN_URL.'/build/js/main.js"></script>';
  return $build;
}
add_shortcode('eventUI', 'eventUI');
