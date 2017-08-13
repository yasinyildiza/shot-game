var timer;
var shot_timer;
var swf_controller;
var takeCardTimeout = 1500;
var shot_counter = 0;
var is_sound_playing = false;
var players = new Array();
var number_of_players = 0;
var max_number_of_players = 4;
var used_cards = new Array();
var counter = 0;
var curr_taker;
var next_taker;
var prev_taker;
var is_take_card_enabled = true;
var prev_card_src = "";
var king_counter = 0;
var game_counter = 0;

function startAnimation(callback, timeout){
	window.setTimeout(function(){
		callback();
	}, timeout)
}

function getWinnerIndex(){
	var min_index = -1;
	var min = 100000;
	for(var i=0; i<players.length; i++){
		if(players[i].score < min){
			min = players[i].score;
			min_index = i;
		}
	}
	return min_index;
}

function getLoserIndex(){
	var max_index = -1;
	var max = 0;
	for(var i=0; i<players.length; i++){
		if(players[i].score > max){
			max = players[i].score;
			max_index = i;
		}
	}
	return max_index;
}

function endGame(){
	timer.pause();
	$("#remaining_container").hide();
	$("#end_game").hide();
	$("#play_again").show();
	$("#current_card").attr("src", "images/the_end.gif");
	$("#current_action_part1").html("");
	$("#current_action_part2").html("");
	//$("#timer_button_container").css("visibility", "hidden");
	//$("#all_cards_container").css("visibility", "hidden");
	//$("#middle_shot_container").css("visibility", "hidden");
	//$(".player_buttons_container").css("visibility", "hidden");
	//$(".player_name").removeClass("active");
	var loser_index = getLoserIndex();
	var winner_index = getWinnerIndex();
	for(var i=0; i<players.length; i++){
		if(i == loser_index){
			var loser = players[getLoserIndex()];
			$(loser.container_selector).addClass("loser");
			$(loser.container_selector).children().addClass("loser");
		}
		else if(i == winner_index){
			var winner = players[getWinnerIndex()];
			$(winner.container_selector).addClass("winner");
			$(winner.container_selector).children().addClass("winner");
		}
		else{
			var nothing = players[i];
			$(nothing.container_selector).addClass("nothing");
			$(nothing.container_selector).children().addClass("nothing");
		}
	}
}

function playAgain()
{
	game_counter++;
	$("#play_again").hide();
	$("#take_card").show();
	used_cards = new Array();
	for(var i=0; i<players.length; i++)
	{
		players[i].resetScore();
		$(players[i].container_selector).removeClass("winner");
		$(players[i].container_selector).removeClass("loser");
		$(players[i].container_selector).removeClass("nothing");
	}
	counter = 0;
	prev_card_src = "";
	king_counter = 0;
	$("#current_card").attr("src", "");
	$("#previous_card").attr("src", "");
	$("#current_action_part1").html("");
	$("#current_action_part2").html("");
	$("#bottle_middle_shot").click();
	$("#remaining").html("52");
	timer.stop();
	shot_timer.stop();
	for(var i=0; i<52; i++)
	{
		$(".small_card").css("visibility", "hidden");
	}
	var temp = new Array();
	for(var i=0; i<players.length; i++)
	{
		players[i].deHighlightName();
	}
	players[game_counter % players.length].highlightName();
}

function Randomize(max){
	return Math.floor((Math.random()*max)+1);
}

function RandomizeCard1(){
	var index = Randomize(CARD_NAMES.length * GROUP_NAMES.length) - 1;
	while(used_cards.indexOf(index) != -1){
		index = Randomize(CARD_NAMES.length * GROUP_NAMES.length) - 1;
	}
	used_cards.push(index);
	return CARDS[index];
}

function RandomizeCard2(){
	var total_number_of_cards = 52;
	var number_of_used_cards = used_cards.length;
	var number_of_unused_cards = total_number_of_cards - number_of_used_cards;
	var random_number = Randomize(number_of_unused_cards) - 1;
	var unused_index = 0;
	for(var i=0; i<total_number_of_cards; i++){
		if(used_cards.indexOf(i) != -1)
			continue;
		if(unused_index == random_number){
			used_cards.push(random_number);
			return CARDS[i];
		}
		unused_index += 1;
	}
}

function RandomizeCard3(){
	var unused_cards = [];
	for(var i=0; i<52; i++){
		if(used_cards.indexOf(i) == -1)
			unused_cards.push(i);
	}
	var random_number = Randomize(unused_cards.length) - 1;
	var index = unused_cards[random_number];
	used_cards.push(index);
	return CARDS[index];
}

function RandomizeCard(){
	return RandomizeCard3();
}

function isAboutEndOfGame(){
	return counter == (CARD_NAMES.length * GROUP_NAMES.length - 1);
}

function isEndOfGame(){
	return counter == CARD_NAMES.length * GROUP_NAMES.length;
}

function disableAddPlayer(){
	$("#add_player_button_container").hide();
	$("#players_container").addClass("completed");
}

function processCard(current_card){
	var current_card = RandomizeCard();
	var current_card_explanation_parts = current_card.card_action.action_explanation.split("###");
	
	$("#current_card").attr("src", "images/cards/" + current_card.card_index + ".png");
	$("#previous_card").attr("src", prev_card_src);
	prev_card_src = "images/cards/" + current_card.card_index + ".png";
	$("#current_action_part1").html(current_card_explanation_parts[0]);
	$("#current_action_part2").html(current_card_explanation_parts[1]);
	
	switch(current_card.card_action.action_name){
		case "SHOT":
			curr_taker.increaseScore();
			break;
			
		case "EMPTY":
			king_counter += 1;
			if(shot_counter == 0){
				for(var i=0; i<2; i++){
					curr_taker.increaseScore();
				}
			}
			else{
				shot_timer.stop();
				shot_timer.play();
				for(var i=0; i<shot_counter; i++){
					curr_taker.increaseScore();
				}
				$("#bottle_middle_shot").click();
			}
			startAnimation(openDoNotTakeSwf, 1000);
			break;
		
		case "ADMIT":
			if(number_of_players == 3){
				prev_taker.increaseScore();
			}
			else{
				startAnimation(openFuckYourRockSwf, 1000);
			}
			break;
		
		case "FILL":
			if(king_counter >= 4){
				curr_taker.increaseScore();
				curr_taker.increaseScore();
				startAnimation(openDoNotTakeSwf, 1000);
			}
			break;
	}
	
	$("#" + current_card.card_index).css("visibility", "visible");
}

function processPlayers(){
	var index = (counter + game_counter) % number_of_players;
	for(var i=0; i<number_of_players; i++){
		var player = players[i];
		player.deHighlightName();
		if(player.index == index){
			curr_taker = player;
			prev_taker = players[((index - 1 + number_of_players) % number_of_players)];
			next_taker = players[((index + 1 + number_of_players) % number_of_players)];
		}
	}
	next_taker.highlightName();
}

function processGame(){
	if(isAboutEndOfGame()){
		$("#take_card").hide();
		$("#end_game").show();
	}
	counter++;
	$("#remaining").html(52 - counter);
}

function turn(){
	if(isEndOfGame()){
		endGame();
		return;
	}
	
	processPlayers();
	processCard();
	processGame();
}

function addPlayer(){
	var player_name = $("#add_player_input").val();
	if(player_name == "")
		return;
	$("#add_player_input").val("");
	
	var player = new Player(number_of_players, player_name);
	players.push(player);
	
	number_of_players++;
	
	if(number_of_players == max_number_of_players){
		disableAddPlayer();
	}
	else{
		$("#add_player_input").focus();
	}
}

function createAllCardsSmall(){
	var all_cards_container = document.getElementById("all_cards_container");
	for(var i=0; i<52; i++){
		var image = document.createElement("img");
		image.setAttribute("class", "small_card");
		image.setAttribute("id", i);
		image.setAttribute("src", "images/cards/" + i + ".png");
		all_cards_container.appendChild(image);
	}
}

function openDoNotTakeSwf(){
	swf_controller.update("http://inciswf.com/sadasfasds.swf", 30, true);
	swf_controller.showSwf();
}

function stopSoundPlay(){
	is_sound_playing = false;
}

function openFuckYourRockSwf(){
	if(!is_sound_playing){
		document.getElementById("fuck_your_rock_sound").play();
		is_sound_playing = true;
		startAnimation(stopSoundPlay, 3000)
	}
}

function openHakaDanceSwf(){
	swf_controller.update("http://www.youtube.com/embed/c-lrE2JcO44?rel=0", 30, false);
	swf_controller.showSwf();
}

function enableTakeCard(){
	is_take_card_enabled = true;
}

function initButtons(){
	$("#play_again").click(function(){
		playAgain();
	});
	$("#take_card").click(function(){
		if(number_of_players < 2){
			alert("Tek ba??na shot m? oynan?r la!");
			$("#add_player_input").focus();
			return;
		}
		if(!is_take_card_enabled)
			return;
		is_take_card_enabled = false;
		startAnimation(enableTakeCard, takeCardTimeout);
		timer.play();
		shot_timer.pause();
		disableAddPlayer();
		$("#remaining_container").show();
		turn();
	});
	$("#end_game").click(function(){
		endGame();
	});
	$("#do_not_take").click(function(){
		openDoNotTakeSwf();
	});
	$("#fuck_your_rock").click(function(){
		openFuckYourRockSwf();
	});
	$("#haka_dance").click(function(){
		openHakaDanceSwf();
	});
	$("#plus_middle_shot").click(function(){
		if(shot_counter == 0)
			$("#bottle_middle_shot").css("background-image", "url('images/middle_shot/full.jpg')");
		shot_counter += 1;
		$("#shot_counter").html(shot_counter.toString());
	});
	$("#minus_middle_shot").click(function(){
		if(shot_counter == 0)
			return;
		if(shot_counter == 1)
			$("#bottle_middle_shot").css("background-image", "url('images/middle_shot/empty.jpg')");
		shot_counter -= 1;
		$("#shot_counter").html(shot_counter.toString());
	});
	$("#bottle_middle_shot").click(function(){
		if(shot_counter == 0)
			return;
		$("#bottle_middle_shot").css("background-image", "url('images/middle_shot/empty.jpg')");
		shot_counter = 0;
		$("#shot_counter").html(shot_counter.toString());
	});
	$("#add_player_button").click(function(){
		addPlayer();
	});
	$("#add_player_input").keydown(function(e){
		if(e.keyCode == 13){
			$("#add_player_button").click();
		}
	});
}

function init(){
	timer = new Timer("#timer");
	shot_timer = new Timer("#shot_timer");
	swf_controller = new SwfController("http://inciswf.com/sadasfasds.swf", 5, true);
	createAllCardsSmall();
	initButtons();
	
	$("#play_again").hide();
	$("#end_game").hide();
	$("#add_player_input").focus();
}