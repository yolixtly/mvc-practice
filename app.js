$(document).ready(function() {
	var Model = function(){
		this.text = "";
		this.onChange = null;
	};

	Model.prototype.setText = function(value){
		this.text = value.toUpperCase();
		if(this.onChange) {
			this.onChange(this.text);
		}
	};

	var View = function(elementSelector, initialValue){
		//fetch the input on HTML
		this.element = $(elementSelector);
	// sets the value of the element to either the provided value or to empty string
		this.setValue(initialValue || '');
		this.onChange = null;

		this.element.on('input', this.onInput.bind(this));
	};

	View.prototype.onInput = function(){
		var value = this.element.val();
		if(this.onChange){
			this.onChange(value);
		}
	};

	View.prototype.setValue = function(text){
		this.element.val(text);
	};

	var Controller = function(model, view){
		view.onChange = model.setText.bind(model);
		model.onChange = view.setValue.bind(view);
	};

	document.addEventListener('DOMContentLoaded', function(){
		var model = new Model();
		var view = new View('.touppercase');
		var controller = new Controller(model, view);
	});

});