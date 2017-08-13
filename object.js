function CardObject(card_index, card_group, card_name, card_action){
	this.card_index = card_index;
	this.card_group = card_group;
	this.card_name = card_name;
	this.card_action = card_action;
	//alert(this.card_index + " " + this.card_group.group_name + " " + this.card_name + " " + this.card_action.action_name);
}

function GroupObject(group_index, group_color, group_name){
	this.group_index = group_index;
	this.group_color = group_color;
	this.group_name = group_name;
	//alert(this.group_index + " " + this.group_color.color_name + " " + this.group_name);
}

function ActionObject(action_index, action_name, action_explanation){
	this.action_index = action_index;
	this.action_name = action_name;
	this.action_explanation = action_explanation;
	//alert(this.action_index + " " + this.action_name + " " + this.action_explanation);
}

function ColorObject(color_index, color_name, color_code, color_action){
	this.color_index = color_index;
	this.color_name = color_name;
	this.color_code = color_code;
	this.color_action = color_action;
	//alert(this.color_index + " " + this.color_name + " " + this.color_code + " " + this.color_action.action_name);
}