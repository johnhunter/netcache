/**
	localstore.js (github.com/johnhunter/netcache/)

	Module based on jquery plugin from http://www.stoimen.com/blog/2010/02/26/jquery-localstorage-plugin-alpha
	
	@author       John Hunter
	Created       2010-10-11
	Licence       CC-BSD (2011) <http://creativecommons.org/licenses/BSD/>
	
	@dependency   native localStorage api, optionally JSON for storing objects
	
**/
var localStore = (function () {
	
	var ls = null,
		hasJSON = (typeof JSON !== 'undefined');

	if (typeof localStorage !== 'undefined') {
		ls = localStorage;
	}

	function setItem (key, value, lifetime) {
		if (!ls || !canStoreItem(value)) return false;
		
		var time = new Date();
		if (typeof lifetime === 'undefined') lifetime = 60*60*1000;
		ls.setItem(key, JSON.stringify(value));
		ls.setItem('meta_ct_'+ key, time.getTime());
		ls.setItem('meta_lt_'+ key, lifetime);
		return true;
	};

	function getItem (key) {
	     if (!ls) return false;

	     var time = new Date();
	     if (time.getTime() - ls.getItem('meta_ct_'+key) > ls.getItem('meta_lt_'+key)) {
	        removeItem(key);
	        return null;
	     }
	     return JSON.parse(ls.getItem(key));
	};

	function removeItem (key) {
	     if (!ls) return false;

	     ls.removeItem(key);
	     ls.removeItem('meta_ct_'+key);
	     ls.removeItem('meta_lt_'+key);
	     return true;
	};
	
	function canStoreItem (value) {
		switch (typeof value) {
			case 'string':
			case 'number':
				return true;
		}
		if (!hasJSON) {
			console && console.warn('localStore cannot serialise object data.');
		}
		return hasJSON;
	}
	
	return {
		setItem: setItem, getItem: getItem, removeItem: removeItem
	};
	
}());

