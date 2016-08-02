/*Step 1 - define the MVC*/

/*Model*/
// Model Constructor with 2 properties 
var Model = function () {
    // is the actual user typing 
    this.text = "";
    // onChange will update its value 
    this.onChange = null;
};
// is a method of Model, changes the text to uppercase
Model.prototype.setText = function (value) {
    this.text = value.toUpperCase();
    //if onChange prop gets a thruthy value then 
    if (this.onChange) {
        //on change gets call with the uppercase text. and its value gets bind to a function ..
        this.onChange(this.text);
    }
};

/*View*/

var View = function (elementSelector, initialValue) {
    this.element = $(elementSelector);
    //if initialValue is provided it will be set, if not it will be a empty string.
    this.setValue(initialValue || '');
    // onChange will update its value
    this.onChange = null;
    // we are using .on() jquery method. As the user types into the input tag, then the callback function gets call
    // and then it is binded to the instance of the constructor. 
    this.element.on('input', this.onInput.bind(this));
};

//this is a method created for constructor View.  The value is set to the users input.  If onChange is truthy it input will be uppercase.
View.prototype.onInput = function () {
    var value = this.element.val();
    if (this.onChange) {
        this.onChange(value);
    }
};
//it sets the new uppercase Value to the element which is the input
View.prototype.setValue = function (text) {
    this.element.val(text);
};

/*Controller*/

//WHY ARE WE SETTING THE 
//constructor Controller - which connects the model and view. 
var Controller = function (model, view) {
    //We bind the model.setText to model so that 'this' points to model constructor instead of controller constructor
    view.onChange = model.setText.bind(model);
    //now we are binding the model.onChange property to view constructor.
    model.onChange = view.setValue.bind(view);
};


/*Step 2 - use the MVC*/

// WHY IS IT RUNNING IF WE HAVE NOT YET CALL IT? 

document.addEventListener('DOMContentLoaded', function () {
    var model = new Model();
    var view = new View('.uppercase');
    var controller = new Controller(model, view);
});