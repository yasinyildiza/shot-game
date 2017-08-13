function Player(index, name){
	this.index = index;
	this.name = name;
	this.score = 0;
	this.total_score = 0;
	this.is_animation_active = false;
	this.animation_timer = null;
	
	this.container_id = "player_container_" + this.index.toString();
	this.name_id = "player_name_" + this.index.toString();
	this.buttons_container_id = "player_buttons_container_" + this.index.toString();
	this.inc_button_id = "player_button_inc_" + this.index.toString();
	this.res_button_id = "player_button_res_" + this.index.toString();
	this.dec_button_id = "player_button_dec_" + this.index.toString();
	this.score_id = "player_score_" + this.index.toString();
	this.container_selector = "#" + this.container_id;
	this.name_selector = "#" + this.name_id;
	this.buttons_container_selector = "#" + this.buttons_container_id;
	this.inc_button_selector = "#" + this.inc_button_id;
	this.res_button_selector = "#" + this.res_button_id;
	this.dec_button_selector = "#" + this.dec_button_id;
	this.score_selector = "#" + this.score_id;
	
	this.init = function(){
		var players_container = document.getElementById("players_container");
		
		var player_container = document.createElement("div");
		player_container.setAttribute("class", "generic container player_container");
		player_container.setAttribute("id", this.container_id);
		player_container.setAttribute("index", this.index);
		
		var player_name_div = document.createElement("div");
		player_name_div.setAttribute("class", "generic label player_name");
		player_name_div.setAttribute("id", this.name_id);
		player_name_div.setAttribute("index", this.index);
		player_name_div.innerHTML = this.name;
		
		var player_buttons_container = document.createElement("div");
		player_buttons_container.setAttribute("class", "generic container player_buttons_container");
		player_buttons_container.setAttribute("id", this.buttons_container_id);
		player_buttons_container.setAttribute("index", this.index);
		
		var increase_button = document.createElement("a");
		increase_button.setAttribute("class", "generic button player_button inc_dec inc");
		increase_button.setAttribute("id", this.inc_button_id);
		increase_button.setAttribute("href", "#");
		increase_button.setAttribute("index", this.index);
		
		var reset_button = document.createElement("a");
		reset_button.setAttribute("class", "generic button player_button res");
		reset_button.setAttribute("id", this.res_button_id);
		reset_button.setAttribute("href", "#");
		reset_button.setAttribute("index", this.index);
		
		var decrease_button = document.createElement("a");
		decrease_button.setAttribute("class", "generic button player_button inc_dec dec");
		decrease_button.setAttribute("id", this.dec_button_id);
		decrease_button.setAttribute("href", "#");
		decrease_button.setAttribute("index", this.index);
		
		var player_score = document.createElement("div");
		player_score.setAttribute("class", "generic label player_score");
		player_score.setAttribute("id", this.score_id);
		player_score.setAttribute("index", this.index);
		//player_score.innerHTML = this.score;
		
		player_buttons_container.appendChild(increase_button);
		player_buttons_container.appendChild(reset_button);
		player_buttons_container.appendChild(decrease_button);
		
		player_container.appendChild(player_name_div);
		player_container.appendChild(player_buttons_container);
		player_container.appendChild(player_score);
		
		players_container.appendChild(player_container);
		
		if(this.index == 0){
			this.highlightName();
		}
		
		var self = this;
		$(this.inc_button_selector).click(function(){
			self.increaseScore();
		});
		$(this.res_button_selector).click(function(){
			//self.resetScore();
			self.increaseScore();
		});
		$(this.dec_button_selector).click(function(){
			self.decreaseScore();
		});
		
		this.updateScore();
	}
	
	this.updateScore = function(){
		var score_string = this.score.toString();
		if(game_counter > 0)
		{
			score_string += " (" + this.total_score.toString() + ")";
		}
		$(this.score_selector).html(score_string);
		if(this.score == 0){
			$(this.res_button_selector).removeClass("full");
			$(this.res_button_selector).addClass("empty");
		}
		else{
			$(this.res_button_selector).removeClass("empty");
			$(this.res_button_selector).addClass("full");
			if(!(this.is_animation_active)){
				this.is_animation_active = true;
				var self = this;
				this.animation_timer = window.setInterval(function(){
					if($(self.container_selector).hasClass("animate")){
						$(self.container_selector).removeClass("animate");
						$(self.name_selector).removeClass("animate");
						$(self.res_button_selector).removeClass("animate");
						$(self.score_selector).removeClass("animate");
					}
					else{
						$(self.container_selector).addClass("animate");
						$(self.name_selector).addClass("animate");
						$(self.res_button_selector).addClass("animate");
						$(self.score_selector).addClass("animate");
					}
				}, 100);
				window.setTimeout(function(){
					window.clearInterval(self.animation_timer);
					self.is_animation_active = false;
				}, 1000);
			}
		}
	}
	
	this.increaseScore = function(){
		this.score += 1;
		this.total_score += 1;
		this.updateScore();
	}
	
	this.resetScore = function(){
		this.score = 0;
		this.updateScore();
	}
	
	this.decreaseScore = function(){
		if(this.score == 0)
			return;
		this.score -= 1;
		this.total_score -= 1;
		this.updateScore();
	}
	
	this.highlightName = function(){
		$(this.name_selector).addClass("active");
	}
	
	this.deHighlightName = function(){
		$(this.name_selector).removeClass("active");
	}
	
	this.init();
}