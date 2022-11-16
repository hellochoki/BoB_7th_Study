/**
 * parseQueryString helper
 * Author: Nicholas Ortenzio
 * https://github.com/youbastard/jquery.getQueryParameters
 * License: MIT
 */
jQuery.extend({
  parseQueryString : function(str) {
	  return (str || document.location.search)
	  	.replace(/(^\?)/,'')
	  	.split("&")
	  	.map(function(n)
	  	{
	  		return n = n.split("="),
	  			this[n[0]] = n[1],
	  			this
	  	}.bind({}))
	  	[0];
  }
});
