function SwfController(src, duration, close_full_screen){
	this.src = src;
	this.duration = duration * 1000;
	this.close_full_screen = close_full_screen;
	
	this.is_showing_swf = false;
	this.swf_clock = null;
	
	this.showSwf = function(src, duration){
		if(this.is_showing_swf)
			return;
		this.is_showing_swf = true;
		$("#swf_container").show();
		var iframe_str = "<iframe id='swf' src='" + this.src + "'></iframe>";
		var close_button_str;
		if(this.close_full_screen){
			close_button_str = "<a href='#' class='generic button swf' id='close_swf'></a>"
		}
		else{
			close_button_str = "<a href='#' class='generic button swf' id='close_swf_small'>KAPAT</a>"
		}
		
		$("#swf_container").html(iframe_str + close_button_str);
		var self = this;
		$(".button.swf").click(function(){
			self.closeSwf();
		});
		swf_clock = window.setTimeout(function(){
			self.closeSwf();
		}, this.duration);
	}
	
	this.closeSwf = function(){
		if(!(this.is_showing_swf))
			return;
		window.clearTimeout(this.swf_clock);
		$("#swf").remove();
		$("#close_swf").remove();
		$("#close_swf_small").remove();
		$("#swf_container").hide();
		this.is_showing_swf = false;
	}
	
	this.update = function(src, duration, close_full_screen){
		this.src = src;
		this.duration = duration * 1000;
		this.close_full_screen = close_full_screen;
	}
}