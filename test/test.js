/*
	Unit testing for localstore.js
	2011-02-15
*/



module('LocalStore');

var item,
	recoveredItem,
	name = 'test',
	lifetime = 10 * 60 * 1000;
	

// clear existing storage
if(localStore.getItem(name)) localStore.removeItem(name);



test("Module definition", function () {
	expect(4);
	
	same(typeof localStore, 'object', 'localStore module defined.');
	
	same(typeof localStore.setItem, 'function', 'localStore.setItem method defined.');
	
	same(typeof localStore.getItem, 'function', 'localStore.getItem method defined.');
	
	same(typeof localStore.removeItem, 'function', 'localStore.removeItem method defined.');
	
});


test("Primatives storage and retrival", function () {
	expect(2);
	
	item = 'testvalue';
	localStore.setItem(name, item, lifetime);
	recoveredItem = localStore.getItem(name);

	same(recoveredItem, item,
		'primitive item stored and retrieved successfully');
	
	localStore.removeItem(name);
	
	equals(localStore.getItem(name), null,
		'item removed successfully');
	
});


test("Object storage and retrival", function () {
	expect(2);
	
	item = { testprop: true };
	localStore.setItem(name, item, lifetime);
	recoveredItem = localStore.getItem(name);
	
	same(recoveredItem.testprop, item.testprop,
		'object item stored and retrieved successfully');
	
	localStore.removeItem(name);
	
	equals(localStore.getItem(name), null,
		'item removed successfully');

	
});


asyncTest("LocalStore lifetime", function () {
	expect(2);
	
	item = 'testvalue';
	lifetime = 800;
	
	// clear existing storage
	if(localStore.getItem(name)) localStore.removeItem(name);
	
	localStore.setItem(name, item, lifetime);
	
	same(localStore.getItem(name), item,
		'item stored and retrieved successfully');
		
	setTimeout(function() {
		equal(localStore.getItem(name), null,
			'item lifetime correctly expired');
			
		start();
	}, lifetime + 100);
});

