/*
	Compressed from: localstore.js (github.com/johnhunter/netcache/)
	On: 15/02/2011 14:20
	Licence: CC-BSD (2011) <http://creativecommons.org/licenses/BSD/>
*/

var localStore=(function(){var b=null,d=(typeof JSON!=="undefined");if(typeof localStorage!=="undefined"){b=localStorage}function a(h,i,g){if(!b||!c(i)){return false}var j=new Date();if(typeof g==="undefined"){g=60*60*1000}b.setItem(h,JSON.stringify(i));b.setItem("meta_ct_"+h,j.getTime());b.setItem("meta_lt_"+h,g);return true}function f(g){if(!b){return false}var h=new Date();if(h.getTime()-b.getItem("meta_ct_"+g)>b.getItem("meta_lt_"+g)){e(g);return null}return JSON.parse(b.getItem(g))}function e(g){if(!b){return false}b.removeItem(g);b.removeItem("meta_ct_"+g);b.removeItem("meta_lt_"+g);return true}function c(g){switch(typeof g){case"string":case"number":return true}if(!d){console&&console.warn("localStore cannot serialise object data.")}return d}return{setItem:a,getItem:f,removeItem:e}}());

