var schema = require('validate');

/*
TODO: DOCUMENT WHAT IS SUPPORTED AND ADD VALIDATION.

The following properties are supported:

**name**: *(required)* The name of the thing.

**id**: *(required)* Must not be shared with any components or actions in the thing.json file. Maybe this could be auto generated?

**owner**: *(currently required as a hack)* Currently the email address of the account the device will be added to when it connects.

**state**: the current state of the thing. For example, 'on' or 'off'.

**type**: The type of thing, eventually we are going to have templates for common components like temperature sensors, etc.

**description**: A description for the thing.

**actions**: A list of action objects. [See below]().

**events**: A list of event objects.

### Actions
The `actions` property of a thing or component has it's own structure.

    **name**: *(required)* the name of the action. For example, "water plant".

    **id**: *(required)* the name of the function to call. This much match what is in the implementation.

    **options**: an additional arguments or parameters for the function.

    **schedule**: a valid later.js text experession that sets up a recurring action, see the [later.js documentation](http://bunkat.github.io/later/) for more info.

    **event**: setting this emits an event when the action is called.

    **function**: the actual implmentation of the action, this code is run when the action is called, and is not exchanged in any communications.

### Events
Coming soon: *a way to subscribe to device events.*


### Things within things
The `components` property takes list of thing objects. 

    **components**: A list of thing objects.

Currently, we don't allow components to have a `components` property.

*/
 
// Validates grow file.
GROWJS.prototype.validateGrowFile = function (growFile) {

	var thing = schema({
	  thing: {
	  	name: {
		  type: 'string',
		  required: true,
          message: 'thing.name is required.'
    	},
		owner: {
		  type: 'string',
		  required: true,
		  match: /+\@.+\..+/,
		  message: 'Owner must be valid email, with an account on the host Grow-IoT server.'
		},
		components: {
			type: 'list',
			required: true
		}
	  }
	});

	var errors = thing.validate(obj);

};

// Should validate a component.
GROWJS.prototype.validateComponent = function (component) {
	var component = schema({
	  	name: {
		  type: 'string',
		  required: true,
          message: 'thing.name is required.'
    	},
    	type: {
    		type: 'string',
    		required: true,
    		message: "Component type is required."
    	}
		actions: {
			type: 'list',
			required: true
		}
	  }
	});
};

GROWJS.prototype.validateAction = function () {
	return;
};

// A valid grow file should be valid JSON.

// A valid grow file should have at least a name and a type.

