/**
 * Renders a grouper
 * @component lyte-grouper
 * @version 3.1.0
 */
Lyte.Component.register("lyte-grouper", {
_template:"<template tag-name=\"lyte-grouper\" style=\"width:{{ltPropWidth}}\"> <lyte-yield yield-name=\"yield\" class=\"lyteGroupWrap lyteGroup{{ltPropAlignment}} {{ltPropAppearance}}Type {{if(isFocused,'lyteGrouperFocused')}}\" role=\"group\" __focusin=\"{{action('grouperFocusIn')}}\" __focusout=\"{{action('grouperFocusOut')}}\"> </lyte-yield> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}],
_templateAttributes :{"type":"attr","position":[],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width:'","ltPropWidth"]}}}},
_observedAttributes :["ltPropAlignment","ltPropAppearance","ltPropWidth","ltPropSelectedClass","currentClass","isFocused"],

	data : function(){
		return {
			/** 
			 * @componentProperty {Horizontal | Vertical} ltPropAlignment=Horizontal
			 * @default Horizontal
			 */
			ltPropAlignment : Lyte.attr("string", {"default" : "Horizontal"}),
			/** 
			 * @componentProperty {line | fill} ltPropAppearance=line
			 */
			ltPropAppearance : Lyte.attr("string",{"default" : "line"}),
			/** 
			 * @componentProperty {string} ltPropWidth=auto
			 */
			ltPropWidth : Lyte.attr("string",{"default" : "auto"}),
			// /** 
			//  * @componentProperty {array} ltPropSelectedClass
			//  */
			ltPropSelectedClass : Lyte.attr("array",{"default" : []}),

			currentClass : Lyte.attr("string",{"default" : ""}),
			isFocused: Lyte.attr("boolean", {"default": false})
		}		
	},
	didConnect : function(){
		this._container = this.$node.querySelector("lyte-yield");
		this.addClassForElementInsideYield();
	},
	didDestroy : function(){
		delete this._container;
	},
	getContainer : function(){
		return this._container;
	},
	addClassToElement : function(element, className) {
		element.classList.add(className);
	},
	getChildrenInsideYield : function() {
		var container =  this.getContainer();
		return container.children;
	},
	addClassForElementInsideYield : function() {
		var children = this.getChildrenInsideYield();
		var className = "lyteGrouperItem";
		for(var index=0; index<children.length; index++) {
			this.addClassToElement(children[index], className);
		}
	},
	actions : {
		grouperFocusIn : function() {
			this.setData("isFocused", true);
		},
		grouperFocusOut : function() {
			this.setData("isFocused", false);
		}
	}
});
/* unwanted code 
document.addEventListener("click",function(event){
	var groupers = document.querySelectorAll("lyte-grouper"),target = event.target;
	groupers.forEach(function(node){
		var comp = node.component,
		container = comp.getContainer();
		if(container){
			if(!container.contains(target) && comp.data.currentClass){
				comp.removeOldClass(container);
			}
		}
	});
},true);

actions:{
		onclick : function(event){
			var container = this.getContainer();
			// this.removeOldClass(container);
			// this.addNewClass(event.target);
		}
	},
	classChange : function(changes){
		var oldClasses = changes.oldValue, indexOfOldClass, currentClassClass = this.data.currentClass,newClass,
		container = this.getContainer(); 
		indexOfOldClass = oldClasses.indexOf(currentClassClass);
		if(indexOfOldClass > -1){
			newClass =  this.getClass(indexOfOldClass);
			this.removeOldClass(container);
			if(newClass){
				container.classList.add(newClass);
				this.storeCurrentClassAsOld(newClass);
			}
		}
	}.observes("ltPropSelectedClass")
getClass : function(index){
		var selectedClass = this.data.ltPropSelectedClass;
		return selectedClass[index]? selectedClass[index] : selectedClass[0];
	},
		removeOldClass : function(container){
		var currentClass = this.data.currentClass;
		if(currentClass){
			container.classList.remove(currentClass);
			this.storeCurrentClassAsOld("");
		}
	},
	addNewClass : function(target){
		var container = this.getContainer(),
		children = container.children;
		for(var index=0;index<children.length;index++){
			var child  =  children[index],newClass;
			if(child.contains(target)){
				newClass = this.getClass( index );
				if(newClass){
					container.classList.add(newClass);
					this.storeCurrentClassAsOld(newClass);
				}
				break;
			} 
		}
	},
	storeCurrentClassAsOld : function(className){
		this.setData("currentClass",className);
	},
*/