Lyte.Component.register("error-comp", {
_template:"<template tag-name=\"error-comp\"> <div class=\"error-body\"> <div class=\"error-container\"> <div class=\"error-code\">404</div> <div class=\"error-message\">Oops! Page not found.</div> <link-to lt-prop-route=\"tab.home\" class=\"home-link\">Go to Home</link-to> </div> </div> </template>\n<style>body {\n    margin: 0;\n    padding: 0;\n    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n  }\n.error-body{\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100vh;\n    background-color: #f2f2f2;\n    color: #333;\n}\n  .error-container {\n    text-align: center;\n    padding: 40px;\n    background-color: #fff;\n    box-shadow: 0 4px 10px rgba(0,0,0,0.1);\n    border-radius: 8px;\n  }\n\n  .error-code {\n    font-size: 96px;\n    font-weight: bold;\n    color: #e74c3c;\n  }\n\n  .error-message {\n    font-size: 24px;\n    margin-top: 10px;\n  }\n\n  .home-link,.home-link a{\n    margin-top: 20px;\n    display: inline-block;\n    padding: 10px 20px;\n    background-color: #3498db;\n    color: #fff;\n    text-decoration: none;\n    border-radius: 5px;\n    transition: background-color 0.3s ease;\n  }\n  .home-link a{\n    padding: 0px;\n    margin-top: 0px;\n  }\n  .home-link:hover {\n    background-color: #2980b9;\n  }</style>",
_dynamicNodes : [{"type":"componentDynamic","position":[1,1,5]}],

	data : function(){
		return {

		}		
	},
	actions : {
		// Functions for event handling
	},
	methods : {
		// Functions which can be used as callback in the component.
	}
});
