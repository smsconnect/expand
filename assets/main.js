//object that will contract to limit size of div and then offer user button to expand
//to full size
var Expand = {

	//property to keep track of expanded/contracted status
	expanded:false,



	/**
	 * Creates DOM structure and attaches listener to Expand object
	 *
	 * @param {object} id      ID of div that will be expanding
	 * @param {object} options Options object
	 */
	setUp:function(id, options){
		//resolve any options passed in
		this.resolveOptions(options);

		//set the main container div
		this.containerDiv = this.setContainerDiv(id);

		//create and set the button that will expand div
		this.button = this.makeButton();

		//check if we want div to fade and set it up if so
		if(this.fade){
			this.fade = this.makeFade();
		}
	},



	/**
	 * Checks for a passed in options object and assigns properties or sets defaults
	 *
	 * @param {object} options Options object
	 */
	resolveOptions:function(options){
		//if the user passed an options object we use it, or make a new empty object
		options = options || {};

		//check if user passed a height value or set default to 300
		this.contractedHeight = options.hasOwnProperty('height') ? options.height : 300;

		//check if user passed a fade value or set default to false
		this.fade = options.hasOwnProperty('fade') ? options.fade : false;
	},



	/**
	 * Checks for the container div on the DOM, sets its classname and height
	 *
	 * @param {string} id ID for HTML element
	 */
	setContainerDiv:function(id){
		var containerDiv;

		//see if an element with that id exists
		try {
			containerDiv = document.getElementById(id);
		} catch (err) {
			throw "Cannot find div with that id";
		}

		//set classname for styling
		containerDiv.className = 'interaction_expand-holder';

		//set contrated height of div
		containerDiv.style.height = this.contractedHeight + 'px';

		return containerDiv;
	},



	/**
	 * Creates a div and paragraph element for the button that will expand and contract the div
	 *
	 * @return {object} Created button div element
	 */
	makeButton:function(){
		//create div and p elements for button
		var button = document.createElement('div');
		var buttonText = document.createElement('p');

		//var to hold Expand object 'this' for use in event callback function on button
		var objectThisHolder = this;

		//give button classname for styling
		button.className = 'interaction_button';

		//make p tag text content and append to button element
		buttonText.innerHTML = '+ Read&nbsp;More';
		button.appendChild(buttonText);

		//append to DOM RIGHT AFTER container div...not inside the container div
		this.containerDiv.parentNode.insertBefore(button, this.containerDiv.nextSibling);

		//listener for when user interacts with button
		button.addEventListener('click', function(){
			objectThisHolder.checkExpandState();
		});

		//store reference to text in button becuase it will be changed when user interacts with button
		this.buttonText = buttonText;

		return button;
	},



	/**
	 * Creates a div that will be the fade at the bottom of the main div when contracted
	 * @return {object} Created fade div element
	 */
	makeFade:function(){
		var fade = document.createElement('div');

		//css does most of the work here...sets size and 'png' background for fade effect
		fade.className = 'interaction_bottom-shadow';

		this.containerDiv.appendChild(fade);

		return fade;
	},



	/**
	 * Checks the current state of div and calls appropriate function
	 */
	checkExpandState: function(){
		if(this.expanded){
			this.contract();
		}
		else{
			this.expand();
		}
	},



	/**
	 * Behavior when user clicks the button to expand the div
	 */
	expand: function(){
		//set main container div to default larger height
		this.containerDiv.style.height = this.containerDiv.scrollHeight + 'px';

		//change button text to reflect expanded state
		this.buttonText.innerHTML = '- Read&nbsp;Less';

		//turn off fad
		if(this.fade){
			this.fade.style.opacity = 0;
		}

		//record the new expanded state
		this.expanded = true;
	},



	/**
	 * Behavior when user clicks the button to contract the div
	 */
	contract: function(){
		//set main container div to contracted height
		this.containerDiv.style.height = this.contractedHeight + 'px';

		//change button text to reflect contracted state
		this.buttonText.innerHTML = '+ Read&nbsp;More';

		//turn on fade
		if(this.fade){
			this.fade.style.opacity = 1;
		}

		//record the new contracted state
		this.expanded = false;
	}
};


