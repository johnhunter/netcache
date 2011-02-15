# NetCache #

In progress. May eventually become a storage abstraction layer.

## LocalStore ##

A JavaScript module that wrappers the HTML5 localStorage object. It can optionally store objects serialised in a JSON string. This code is based on a early [jQuery.localStorage plugin by Stoimen](http://www.stoimen.com/blog/2010/02/26/jquery-localstorage-plugin-alpha/). Main differences are separating out the JSON dependency, decoupling from jQuery, and some optimisation.

Dependencies: localStorage and JSON if you are storing objects. If you really need non-native JSON and its not native then use [Doug Crockford's JSON.js](https://github.com/douglascrockford/JSON-js).

Will fire a console.warn (if console enabled) if you attempt to store an object when JSON is not supported.

### Usage ###

	localStore.setItem(name, itemData, lifetimeMsec);
	// itemData can be Sting, Number, Object or Array
	// lifetimeMsec is an optional value in msec (default 1 hour)
	// returns true if successful
	
	localStore.getItem(name);
	// returns the itemData or null if expired, false on failure
	
	localStore.removeItem(name);
	// returns true if successful

## Licence ##

Licenced under CC-BSD 2011, John Hunter 
<http://creativecommons.org/licenses/BSD/>

LocalStore is derived from [jQuery.localStorage](http://www.stoimen.com/blog/2010/02/26/jquery-localstorage-plugin-alpha/) by Stoimen 2010