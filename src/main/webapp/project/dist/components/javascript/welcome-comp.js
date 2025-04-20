Lyte.Component.register("welcome-comp", {
_template:"<template tag-name=\"welcome-comp\"> <div class=\"home-container\"> <div class=\"welcome\"> WELCOME, {{userData.userName}}! </div> <div class=\"description\"> <p>You're at the right place to explore and own your dream car. Here's everything you can do on your dashboard:</p> <ul> <li> <strong>Browse Car Companies:</strong> Explore registered car companies and their details.</li> <li> <strong>Find Showrooms by Location:</strong> Filter showrooms near your area for easy access.</li> <li><strong>Explore Cars:</strong> View all available car models with detailed specifications and available colors.</li> <li> <strong>Book Your Dream Car:</strong> Confirm a booking for your selected model at your desired showroom.</li> <li> <strong>Track Booked Cars:</strong> Monitor your booking status until delivery is completed.</li> <li> <strong>View Owned Cars:</strong> Get details of cars you've purchased, including showroom and company info.</li> <li> <strong>Secure Session:</strong> Your session is protected with cookies for better experience and safety.</li> <li> <strong>Logout Anytime:</strong> Click the logout button when you're done exploring the automobile world.</li> </ul> <p>Happy driving!</p> </div> </div> </template>\n<style>.home-container{\n    margin-top: 8%;\n    margin-left: 20%;\n    text-align: start;\n    width :60%;\n    height:80vh;\n    border: solid 1px black;\n    border-radius: 15px;\n    box-shadow:  0px 4px 6px rgba(0, 0, 0, 0.1);\n    /* background-color: black; */\n    \n}\n.welcome{\n    margin-top: 30px;\n    margin-left: 40px;\n    font-size: 30px;\n    word-spacing:20px ;\n    font-weight: bold;\n    text-transform: capitalize;\n}\n.description{\n    margin-top: 10%;\n    margin-left: 100px;\n    width: 70%;\n    font-size:19px;\n    word-spacing: 15px;\n    height: 100%;\n    \n}</style>",
_dynamicNodes : [{"type":"text","position":[1,1,1]}],
_observedAttributes :["userData"],

	data: function () {
		return {
			userData:Lyte.attr('object')
		}
	},
	init: function () {
		data=store.peekAll('users')[0];
		this.setData('userData',data);
	},
	actions: {

	},
	methods: {
		
	}
});
