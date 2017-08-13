var LANGUAGE = {
	TR: 0,
	EN: 1
}

var MESSAGES = new Array();
MESSAGES[0] = new Array();
MESSAGES[1] = new Array();
MESSAGES[2] = new Array();

MESSAGES[0] = "Kart Çek"
MESSAGES[1] = "Kalan Kart:"
MESSAGES[2] = "Oyunu Bitir!"


MESSAGES[0][LANGUAGE.EN] = "Take a Card"
MESSAGES[1][LANGUAGE.EN] = "Remaining:"
MESSAGES[2][LANGUAGE.EN] = "End the Game!"

var ACTION_NAMES = new Array();
ACTION_NAMES[0] = "FILL";
ACTION_NAMES[1] = "";
ACTION_NAMES[2] = "";
ACTION_NAMES[3] = "";
ACTION_NAMES[4] = "";
ACTION_NAMES[5] = "";
ACTION_NAMES[6] = "";
ACTION_NAMES[7] = "";
ACTION_NAMES[8] = "";
ACTION_NAMES[9] = "ADMIT";
ACTION_NAMES[10] = "RHYME";
ACTION_NAMES[11] = "NEVER";
ACTION_NAMES[12] = "EMPTY";
ACTION_NAMES[13] = "PASS";
ACTION_NAMES[14] = "SHOT";

var ACTION_EXPLANATIONS = new Array();
for(var i=0; i<15; i++){
	ACTION_EXPLANATIONS[i] = new Array();
}
ACTION_EXPLANATIONS[0] = "Ortadaki bardağa bir shot doldur.###(En fazla 3 shot doldur.)";
ACTION_EXPLANATIONS[1] = "";
ACTION_EXPLANATIONS[2] = "";
ACTION_EXPLANATIONS[3] = "";
ACTION_EXPLANATIONS[4] = "";
ACTION_EXPLANATIONS[5] = "";
ACTION_EXPLANATIONS[6] = "";
ACTION_EXPLANATIONS[7] = "";
ACTION_EXPLANATIONS[8] = "";
ACTION_EXPLANATIONS[9] = "Doğruluk mu Cesaret mi?###Ya da bir önceki içsin.";
ACTION_EXPLANATIONS[10] = "Bir sözcükle kafiye zinciri başlat.###(Son iki harf kafiyeli olmalı.)";
ACTION_EXPLANATIONS[11] = "'Ben hiç...'le başlayan bir cümle söyle.###(Uymayanlar bir shot yapsın.)";
ACTION_EXPLANATIONS[12] = "Ortadaki bardağın hepsini iç.###(Boşsa 2 shot yap.)";
ACTION_EXPLANATIONS[13] = "Pas geç.### ";
ACTION_EXPLANATIONS[14] = "Bir shot yap.### ";

var ACTIONS = new Array();
for(var i=0; i<ACTION_NAMES.length; i++){
	ACTIONS[i] = (ACTION_NAMES[i] == "") ? null : new ActionObject(i, ACTION_NAMES[i], ACTION_EXPLANATIONS[i]);
}

var COLOR_NAMES = new Array();
COLOR_NAMES[0] = "black";
COLOR_NAMES[1] = "red";

var COLOR_CODES = new Array();
COLOR_CODES[0] = "#000000";
COLOR_CODES[1] = "#FF0000";

var COLORS = new Array();
for(var i=0; i<COLOR_NAMES.length; i++){
	COLORS[i] = new ColorObject(i, COLOR_NAMES[i], COLOR_CODES[i], ACTIONS[13+i]);
}

var GROUP_NAMES = new Array();
for(var i=0; i<4; i++){
	GROUP_NAMES[i] = new Array();
}
GROUP_NAMES[0] = "Karo";
GROUP_NAMES[1] = "Kupa";
GROUP_NAMES[2] = "Maça";
GROUP_NAMES[3] = "Sinek";

var GROUPS = new Array();
for(var i=0; i<GROUP_NAMES.length; i++){
	GROUPS[i] = new GroupObject(i, COLORS[(i<2) ? 1 : 0], GROUP_NAMES[i]);
}

var CARD_NAMES = new Array();
for(var i=0; i<13; i++){
	CARD_NAMES[i] = new Array();
}
CARD_NAMES[0] = "As";
CARD_NAMES[1] = "İki";
CARD_NAMES[2] = "Üç";
CARD_NAMES[3] = "Dört";
CARD_NAMES[4] = "Beş";
CARD_NAMES[5] = "Altı";
CARD_NAMES[6] = "Yedi";
CARD_NAMES[7] = "Sekiz";
CARD_NAMES[8] = "Dokuz";
CARD_NAMES[9] = "On";
CARD_NAMES[10] = "Vale";
CARD_NAMES[11] = "Kız";
CARD_NAMES[12] = "Papaz";

var CARDS = new Array();
for(var i=0; i<GROUP_NAMES.length; i++){
	for(var j=0; j<CARD_NAMES.length; j++){
		CARDS[i*CARD_NAMES.length + j] = new CardObject(i*CARD_NAMES.length + j, GROUPS[i], CARD_NAMES[j], (ACTIONS[j] == null) ? GROUPS[i].group_color.color_action : ACTIONS[j]);
	}
}
