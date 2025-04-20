Lyte.Component.register("nav-bar", {
_template:"<template tag-name=\"nav-bar\"> <div class=\"navbar\"> <div class=\"profile-div\"> <button class=\"btn-profile\">B </button> </div> <div class=\"logo\"> CAR SHOWROOM </div> <div class=\"actions\"> <button class=\"logout-btn\" __click=\"{{action('logout')}}\">logout</button> </div> </div> </template>\n<style>\n.navbar {\n    position: fixed;\n    top:0px;\n    display: flex;\n    width: 100%;\n    justify-content: space-between;\n    align-items: center;\n    background-color: #f4f4f4; /* Dark blue-gray */\n    color: #1d2939;\n    padding: 10px 20px;\n    font-size: 18px;\n    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);\n    z-index: 1000;\n   \n  }\n  .btn-profile {\n    background: whitesmoke;\n    border: none;\n    color: #1d2939;\n    width: 50px;  \n    height: 50px;\n    border-radius: 50%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 18px; \n    font-weight: bold;\n    cursor: pointer;\n    border: solid 1px black !important;\n}\n\n\n.logout-btn {\n    background: white;\n    color: black;\n    margin-right: 30px;\n    cursor: pointer;\n    border: solid 1px black !important;\n    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);\n    transition: all 0.3s;\n    \n  } \n  .logout-btn:hover{\n    background: black;\n    color: white;\n  }\n  \n  .btn-profile:hover {\n    background-color: #2980b9;\n  }</style>",
_dynamicNodes : [{"type":"attr","position":[1,5,1]}],

	data : function(){
		return {

		}		
	},
	actions : {
		logout: function () {
			var record = store.peekAll("users")[0];
			record.$.destroyRecord().then(function () {
				Lyte.Router.transitionTo('login');
			}, function () {
				alert("logout failed");
			});
		}
	},
	methods : {
		// Functions which can be used as callback in the component.
	}
});
