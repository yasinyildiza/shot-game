function Timer(selector){
	this.selector = selector;
	this.play_pause_selector = selector + "_play_pause";
	this.stop_selector = selector + "_stop";
	this.clock = null;
	this.is_running = false;
	
	this.second_counter = 0;
	this.minute_counter = 0;
	this.hour_counter = 0;
	
	this.second_str = "00";
	this.minute_str = "00";
	this.hour_str = "00";
	this.time_str = "00:00:00";
	
	this.init = function(){
		var self = this;
		$(this.play_pause_selector).click(function(){
			if(self.is_running){
				self.pause();
			}
			else{
				self.play();
			}
		});
		
		$(this.stop_selector).click(function(){
			self.stop();
		});

		this.reset();
	}
	
	
	this.regulateNumToStr = function(num){
		var str = num.toString();
		if(str.length == 1)
			return "0" + str;
		return str;
	}
	
	this.startClock = function(){
		if(this.is_running)
			return;
		this.is_running = true;
		$(this.play_pause_selector).css("background-image", "url('images/timer/pause.png')");
		var self = this;
		this.clock = window.setInterval(function(){
			self.update();
		},1000);
	}
	
	this.stopClock = function(){
		if(!(this.is_running))
			return;
		$(this.play_pause_selector).css("background-image", "url('images/timer/play.png')");
		var self = this;
		window.clearInterval(self.clock);
		this.is_running = false;
		
	}
	
	this.updateStr = function(){
		this.second_str = this.regulateNumToStr(this.second_counter);
		this.minute_str = this.regulateNumToStr(this.minute_counter);
		this.hour_str = this.regulateNumToStr(this.hour_counter);
		this.time_str = this.hour_str + ":" + this.minute_str + ":" + this.second_str;
		$(this.selector).html(this.time_str);
	}
	
	this.update = function(){
		this.second_counter += 1;
		if(this.second_counter >= 60){
			this.second_counter = 0;
			this.minute_counter += 1;
			if(this.minute_counter >= 60){
				this.minute_counter = 0;
				this.hour_counter += 1;
			}
		}
		this.updateStr();
	}
	
	this.reset = function(){
		this.second_counter = 0;
		this.minute_counter = 0;
		this.hour_counter = 0;
		
		$(this.play_pause_selector).css("background-image", "url('images/timer/play.png')");
		$(this.stop_selector).css("background-image", "url('images/timer/stop.png')");
	}
	
	this.play = function(){		
		this.startClock();
	}
	
	this.pause = function(){
		this.stopClock();
	}
	
	this.stop = function(){
		this.stopClock();
		this.reset();
		this.updateStr();
	}
	
	this.init();
}