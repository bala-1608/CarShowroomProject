/**
 * Renders a rating component
 * @component lyte-rating
 * @version 3.1.0
 * @methods onRender,onClick,onHover,onOut
 */

Lyte.Component.register("lyte-rating", {
_template:"<template tag-name=\"lyte-rating\" class=\"{{lyteUiAddClassRating(this,ltPropWrapperClass,ltPropReadOnly)}}\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"rateIcon\"></lyte-yield> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(ifNotEquals(ltPropAppearance,'smiley'),'&amp;&amp;',lyteUiIfEqualsAny(ltPropType,'switch','multiple'))}}\"><template case=\"true\"> <template is=\"for\" items=\"{{countArray}}\" item=\"item\" index=\"index\"> <lyte-rate-icon class=\"{{lyteUiGetArrayValueByIndex(emptyIconArray,index)}}\" data-lrc=\"{{item.ind}}\" style=\"{{lyteUiConcat('width:',ltPropWidth,'; height:',ltPropHeight,';')}}\"></lyte-rate-icon> </template> </template><template case=\"false\"><template is=\"if\" value=\"{{ifEquals(ltPropType,'svg')}}\"><template case=\"true\"> <template is=\"for\" items=\"{{countArray}}\" item=\"item\" index=\"index\"> <lyte-rate-icon class=\"{{lyteUiGetArrayValueByIndex(emptyIconArray,index)}}\" data-lrc=\"{{item.ind}}\"> <template is=\"if\" value=\"{{lyteUiCheckHalfRatingSvg(ltPropHalfIncrement,ltPropPrecision)}}\"><template case=\"true\"> <svg viewBox=\"{{item.viewbox}}\" style=\"{{lyteUiConcat('width:',ltPropWidth,'; height:',ltPropHeight,lyteUiGetFillOrStroke(ltPropAppearance,'var(--lyte-rating-empty-color)',ltPropStroke))}}\"> <linearGradient id=\"{{lyteUiConcat('filledGradient',ratingNum,'__',item.ind)}}\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\"> <stop offset=\"0%\" style=\"stop-color: var(--lyte-rating-empty-color);\"></stop> <stop offset=\"0%\" style=\"stop-color: var(--lyte-rating-empty-color);\"></stop> <stop offset=\"0%\" style=\"stop-color: var(--lyte-rating-empty-color);\"></stop> </linearGradient> <use href=\"{{item.appearance}}\" fill=\"{{lyteUiConcat('url(#','filledGradient',ratingNum,'__',item.ind,')')}}\"></use> </svg> </template><template case=\"false\"> <svg viewBox=\"{{item.viewbox}}\" style=\"{{lyteUiConcat('width:',ltPropWidth,'; height:',ltPropHeight,lyteUiGetFillOrStroke(ltPropAppearance,'var(--lyte-rating-empty-color)',ltPropStroke))}}\"> <use href=\"{{item.appearance}}\"></use> </svg> </template></template> </lyte-rate-icon> </template> </template><template case=\"false\"> <template is=\"for\" items=\"{{countArray}}\" item=\"item\" index=\"index\"> <lyte-rate-icon class=\"{{ltPropEmptyIcon}}\" data-lrc=\"{{item.ind}}\" style=\"{{lyteUiConcat('width:',ltPropWidth,'; height:',ltPropHeight,';')}}\"></lyte-rate-icon> </template> </template></template></template></template></template></template> <svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 18 18\" style=\"display: none;\" xml:space=\"preserve\"> <g> <path id=\"heart\" d=\"M7.2,1C4.5,1,2.3,3.4,2.1,6.7c0,0.1-0.1,0.9,0.2,2.2c0.4,1.8,1.3,3.4,2.6,4.7l6.6,6.5l6.7-6.5 c1.3-1.3,2.2-2.9,2.6-4.7c0.3-1.2,0.2-2,0.2-2.2C20.7,3.4,18.6,1,15.9,1c-1.8,0-3.4,1-4.4,2.7C10.5,2,8.9,1,7.2,1L7.2,1z\"></path> </g> </svg> <svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 18 18\" style=\"display: none;\" xml:space=\"preserve\"> <style type=\"text/css\"> .st0{fill:none;stroke-miterlimit:10;} </style> <g> <path id=\"lineHeart\" class=\"st0\" d=\"M6.1,1C3.4,1,1.2,3.4,1,6.7c0,0.1-0.1,0.9,0.2,2.2c0.4,1.8,1.3,3.4,2.6,4.7l6.6,6.5l6.7-6.5 c1.3-1.3,2.2-2.9,2.6-4.7c0.3-1.2,0.2-2,0.2-2.2C19.7,3.4,17.6,1,14.9,1c-1.8,0-3.4,1-4.4,2.7C9.4,2,7.8,1,6.1,1L6.1,1z\"></path> </g> </svg> <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"5 5 89.6 80\" style=\"display: none;\" xml:space=\"preserve\"> <polygon id=\"star\" points=\"17,4.7 19.5,12 27,12 21,16.6 23.2,23.8 17,19.5 10.8,23.8 13,16.6 7,12 14.5,12 \"></polygon> </svg> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'width:'","ltPropWidth","'; height:'","ltPropHeight","';'"]}}}},{"type":"componentDynamic","position":[1]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'width:'","ltPropWidth","'; height:'","ltPropHeight",{"type":"helper","value":{"name":"lyteUiGetFillOrStroke","args":["ltPropAppearance","'var(--lyte-rating-empty-color)'","ltPropStroke"]}}]}}}},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'width:'","ltPropWidth","'; height:'","ltPropHeight",{"type":"helper","value":{"name":"lyteUiGetFillOrStroke","args":["ltPropAppearance","'var(--lyte-rating-empty-color)'","ltPropStroke"]}}]}}}},{"type":"attr","position":[1,1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"lyteUiConcat","args":["'width:'","ltPropWidth","'; height:'","ltPropHeight","';'"]}}}},{"type":"componentDynamic","position":[1]}]}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_templateAttributes :{"type":"attr","position":[]},
_observedAttributes :["ltPropValue","ltPropCount","ltPropWrapperClass","ltPropType","ltPropAppearance","ltPropReadOnly","ltPropClearable","ltPropHalfIncrement","ltPropEmptyIcon","ltPropFullIcon","ltPropHalfIcon","ltPropHoverFullIcon","ltPropHoverHalfIcon","ltPropYield","ltPropEmptyColor","ltPropFillColor","ltPropHoverColor","ltPropWidth","ltPropHeight","ltPropHref","ltPropPrecision","ltPropStroke","countArray","currentHover","emptyIconArray","fullIconArray","halfIconArray","hoverFullIconArray","hoverHalfIconArray","starVB","lineStarVB","heartVB","lineHeartVB","ratingNum"],

	data : function(){
		return {

			/**
             * @componentProperty {number} ltPropValue
             * @version 3.1.0
             * @default 0
			 * @minValue 0
             */
			"ltPropValue" : Lyte.attr("number",{"default":0}),

			/**
             * @componentProperty {number} ltPropCount
             * @version 3.1.0
             * @default 5
			 * @condition ltPropType svg,class
             */
			"ltPropCount" : Lyte.attr("number",{"default":5}),

			/**
             * @componentProperty {string} ltPropWrapperClass
             * @version 3.1.0
             */
			"ltPropWrapperClass" : Lyte.attr("string"),

			/**
             * @componentProperty {svg|multiple|switch|toggle|class} ltPropType
             * @version 3.1.0
             * @default svg
             */
			"ltPropType" : Lyte.attr("string",{"default":"svg"}),	//svg,multiple,switch,toggle,class

			/**
             * @componentProperty {star|heart|lineStar|lineHeart|smiley|likeDislike|custom} ltPropAppearance
             * @version 3.1.0
             */
			"ltPropAppearance" : Lyte.attr("string"),				//star,heart,lineStar,lineHeart,smiley,likeDislike,custom

			/**
             * @componentProperty {boolean} ltPropReadOnly
             * @version 3.1.0
             * @default false
             * 
             */
			"ltPropReadOnly" : Lyte.attr("boolean",{"default":false}),

			/**
             * @componentProperty {boolean} ltPropClearable
             * @version 3.1.0
             * @default false
             * 
             */
			"ltPropClearable" : Lyte.attr("boolean",{"default":false}),

			/**
             * @componentProperty {boolean} ltPropHalfIncrement
             * @version 3.1.0
             * @default false
             * 
             */
			"ltPropHalfIncrement" : Lyte.attr("boolean",{"default":false}),

			/**
             * @componentProperty {string} ltPropEmptyIcon
             * @version 3.1.0
             * @default lyteRatingEmpty
             */
			"ltPropEmptyIcon" : Lyte.attr("string",{"default":"lyteRatingHeartEmptyIcon"}),

			/**
             * @componentProperty {string} ltPropFullIcon
             * @version 3.1.0
             * @default lyteRatingFilled
             */
			"ltPropFullIcon" : Lyte.attr("string",{"default":"lyteRatingHeartRatedIcon"}),

			/**
             * @componentProperty {string} ltPropHalfIcon
             * @version 3.1.0
             * @default lyteRatingHalf
             */
			"ltPropHalfIcon" : Lyte.attr("string",{"default":"lyteRatingHeartRatedHalfIcon"}),

			/**
             * @componentProperty {string} ltPropHoverFullIcon
             * @version 3.1.0
             * @default lyteRatingHoverFilled
             */
			"ltPropHoverFullIcon" : Lyte.attr("string",{"default":"lyteRatingHeartHoverRatedIcon"}),

			/**
             * @componentProperty {string} ltPropHoverHalfIcon
             * @version 3.1.0
             * @default lyteRatingHoverHalf
             */
			"ltPropHoverHalfIcon" : Lyte.attr("string",{"default":"lyteRatingHeartHoverHalfIcon"}),

			/**
             * @componentProperty {boolean} ltPropYield
             * @version 3.1.0
             * @default false
             */
			"ltPropYield" : Lyte.attr("boolean",{"default":false}),

			/**
             * @componentProperty {colorString} ltPropEmptyColor
             * @version 3.1.0
             */
			"ltPropEmptyColor" : Lyte.attr("string"),

			/**
             * @componentProperty {colorString} ltPropFillColor
             * @version 3.1.0
             */
			"ltPropFillColor" : Lyte.attr("string"),

			/**
             * @componentProperty {colorString} ltPropHoverColor
             * @version 3.1.0
             */
			"ltPropHoverColor" : Lyte.attr("string"),

			/**
             * @componentProperty {string} ltPropWidth
             * @version 3.1.0
             * @default 22px
             * @suffix px,pt,cm,mm,vh,vm,em
             */
			"ltPropWidth" : Lyte.attr("string",{"default":"22px"}),

			/**
             * @componentProperty {string} ltPropHeight
             * @version 3.1.0
             * @default 22px
             * @suffix px,pt,cm,mm,vh,vm,em
             */
			"ltPropHeight" : Lyte.attr("string",{"default":"22px"}),

			/**
             * @componentProperty {string} ltPropHref
             * @version 3.1.0
             */
			"ltPropHref" : Lyte.attr("string"),

			/**
             * @componentProperty {number} ltPropPrecision
             * @version 3.1.0
             * @default 0.5
             */
			"ltPropPrecision" : Lyte.attr("number",{"default":0.5}),
			/**
             * @componentProperty {string} ltPropStroke
             * @version 3.1.0
             */
			"ltPropStroke" : Lyte.attr("string"),
			"countArray" : Lyte.attr("array",{"default":[]}),
			"currentHover" : Lyte.attr("number",{"default":0}),
			"emptyIconArray" : Lyte.attr("array",{"default":[]}),
			"fullIconArray" : Lyte.attr("array",{"default":[]}),
			"halfIconArray" : Lyte.attr("array",{"default":[]}),
			"hoverFullIconArray" : Lyte.attr("array",{"default":[]}),
			"hoverHalfIconArray" : Lyte.attr("array",{"default":[]}),
			"starVB" : Lyte.attr("string",{"default":"6.5 4.5 21 21"}),
			"lineStarVB" : Lyte.attr("string",{"default":"5.5 2.5 23 23"}),
			"heartVB" : Lyte.attr("string",{"default":"1.5 0.5 20 20"}),
			"lineHeartVB" : Lyte.attr("string",{"default":"1 0 21 21"}),
			"ratingNum" : Lyte.attr("number",{"default":0})
		}		
	},
	onColorchange : function(){
		if(this.getData('ltPropEmptyColor')){
			this.$node.style.setProperty('--lyte-rating-empty-color',this.getData('ltPropEmptyColor'));
		}
		if(this.getData('ltPropFillColor')){
			this.$node.style.setProperty('--lyte-rating-fill-color',this.getData('ltPropFillColor'));
		}
		if(this.getData('ltPropHoverColor')){
			this.$node.style.setProperty('--lyte-rating-hover-color',this.getData('ltPropHoverColor'));
		}
	}.observes('ltPropFillColor','ltPropEmptyColor','ltPropHoverColor').on('didConnect'),

	initFn : function(){
		this.$node.classList.remove('heart','lineHeart','star','lineStar','custom','lyteRatingSmiley','three','five');
		if(this.getData('ltPropType') == "multiple"){
			if(this.getData('ltPropAppearance') == "custom"){
				var emptyIconArray = this.getData('ltPropEmptyIcon').split(",");
				var fullIconArray = this.getData('ltPropFullIcon').split(",");
				var hoverFullIconArray = this.getData('ltPropHoverFullIcon').split(",");
				if(this.getData('ltPropHalfIncrement')){
					var halfIconArray = this.getData('ltPropHalfIcon').split(",");
					var hoverHalfIconArray = this.getData('ltPropHoverHalfIcon').split(",");
					this.setData('halfIconArray',halfIconArray);
					this.setData('hoverHalfIconArray',hoverHalfIconArray);
				}
				this.setData('emptyIconArray',emptyIconArray);
				this.setData('fullIconArray',fullIconArray);
				this.setData('hoverFullIconArray',hoverFullIconArray);
			}
			else{	//If not custom then by default it will be smiley
				this.setData('ltPropAppearance','smiley');
				this.$node.classList.add('lyteRatingSmiley');
				if(this.getData('ltPropCount') == 3){
					this.$node.classList.add('three');
				}
				else{
					this.setData('ltPropCount',5);
					this.$node.classList.add('five');
				}
				this.setData('ltPropEmptyIcon','lyteRatingEmpty');
				this.setData('ltPropFullIcon','lyteRatingFilled');
				this.setData('ltPropHoverFullIcon','lyteRatingHover');
				this.setData('ltPropHalfIncrement', false);
			}
		}
		else if(this.getData('ltPropType') == "switch"){
			if(this.getData('ltPropAppearance') == "custom"){
				var emptyIconArray = this.getData('ltPropEmptyIcon').split(",");
				var fullIconArray = this.getData('ltPropFullIcon').split(",");
				var hoverFullIconArray = this.getData('ltPropHoverFullIcon').split(",");
				this.setData('emptyIconArray',emptyIconArray);
				this.setData('fullIconArray',fullIconArray);
				this.setData('hoverFullIconArray',hoverFullIconArray);
				
			}
			else{	//If not custom then by default it will be likeDislike
				this.setData('ltPropAppearance','likeDislike');
				this.setData('ltPropEmptyIcon','lrcSwitchLikeEmpty,lrcSwitchDislikeEmpty');
				this.setData('ltPropFullIcon','lrcSwitchLike,lrcSwitchDislike');
				this.setData('ltPropHoverFullIcon','lrcSwitchHoverLike,lrcSwitchHoverDislike');
				var emptyIconArray = this.getData('ltPropEmptyIcon').split(",");
				var fullIconArray = this.getData('ltPropFullIcon').split(",");
				var hoverFullIconArray = this.getData('ltPropHoverFullIcon').split(",");
				this.setData('emptyIconArray',emptyIconArray);
				this.setData('fullIconArray',fullIconArray);
				this.setData('hoverFullIconArray',hoverFullIconArray);
			}
			this.setData('ltPropCount',2);
			this.setData('ltPropHalfIncrement',false);
			this.setData('ltPropClearable',true);
		}
		else if(this.getData('ltPropType') == "toggle"){
			if(this.getData('ltPropAppearance') != "custom"){
				this.setData('ltPropAppearance','heart');
				this.setData('ltPropEmptyIcon','lrcToggleEmpty');
				this.setData('ltPropFullIcon','lrcToggleFill');
				this.setData('ltPropHoverFullIcon','lrcToggleHover2');
			}
			this.setData('ltPropCount',1);
			this.setData('ltPropHalfIncrement',false);
			this.setData('ltPropClearable',true);
		}
		else if(this.getData('ltPropType') == "svg"){
			if(this.getData('ltPropAppearance') == "heart"){
				this.$node.classList.add('heart');
				this.setData('ltPropEmptyIcon','lyteRatingEmpty');
				this.setData('ltPropFullIcon','lyteRatingFilled');
				this.setData('ltPropHoverFullIcon','lyteRatingHoverFilled');
				if(this.getData('ltPropHalfIncrement')){
					this.setData('ltPropHalfIcon','lyteRatingHalf');
					this.setData('ltPropHoverHalfIcon','lyteRatingHoverHalf');
				}
			}
			else if(this.getData('ltPropAppearance') == "lineHeart"){
				this.$node.classList.add('lineHeart');
				this.setData('ltPropEmptyIcon','lyteRatingEmpty');
				this.setData('ltPropFullIcon','lyteRatingFilled');
				this.setData('ltPropHoverFullIcon','lyteRatingHoverFilled');
				if(this.getData('ltPropHalfIncrement')){
					this.setData('ltPropHalfIcon','lyteRatingHalf');
					this.setData('ltPropHoverHalfIcon','lyteRatingHoverHalf');
				}
			}
			else if(this.getData('ltPropAppearance') == "lineStar"){
				this.$node.classList.add('lineStar');
				this.setData('ltPropEmptyIcon','lyteRatingEmpty');
				this.setData('ltPropFullIcon','lyteRatingFilled');
				this.setData('ltPropHoverFullIcon','lyteRatingHoverFilled');
				if(this.getData('ltPropHalfIncrement')){
					this.setData('ltPropHalfIcon','lyteRatingHalf');
					this.setData('ltPropHoverHalfIcon','lyteRatingHoverHalf');
				}
			}
			else{
				this.setData('ltPropAppearance','star');
				this.$node.classList.add('star');
				this.setData('ltPropEmptyIcon','lyteRatingEmpty');
				this.setData('ltPropFullIcon','lyteRatingFilled');
				this.setData('ltPropHoverFullIcon','lyteRatingHoverFilled');
				if(this.getData('ltPropHalfIncrement')){
					this.setData('ltPropHalfIcon','lyteRatingHalf');
					this.setData('ltPropHoverHalfIcon','lyteRatingHoverHalf');
				}
			}
			if(this.getData('ltPropType') == "svg" && this.getData('ltPropHalfIncrement')){
				ratingNum += 1;
				this.setData('ratingNum',ratingNum);
			}
		}
		else if(this.getData('ltPropType') == "class"){
			this.setData('ltPropAppearance','class');
			if(this.getData('ltPropEmptyIcon') == "lyteDummyRC" || this.getData('ltPropFullIcon') == "lyteDummyRC" || this.getData('ltPropHoverFullIcon') == "lyteDummyRC"){
				this.$node.classList.add('star');
				this.setData('ltPropEmptyIcon','lyteRatingEmpty');
				this.setData('ltPropFullIcon','lyteRatingFilled');
				this.setData('ltPropHoverFullIcon','lyteRatingHoverFilled');
				if(this.getData('ltPropHalfIncrement')){
					this.setData('ltPropHalfIcon','lyteRatingHalf');
					this.setData('ltPropHoverHalfIcon','lyteRatingHoverHalf');
				}
			}
		}
		if(this.getData('ltPropCount') != this.getData('countArray').length){
			this.setCountArray();
		}
		this.setRating(true);
		//this.setAriaAttributes();
	}.observes("ltPropType","ltPropCount"/*,"ltPropHalfIncrement"*/).on("init"),
	appearanceChanged : function(){
		var value = this.getData('ltPropType');
		this.setData('ltPropType','');
		this.setData('ltPropType',value);
		this.setCountArray();
		this.setRating();
	}.observes("ltPropAppearance","ltPropHalfIncrement"),
	// setAria : function(){
	// 	this.setAriaAttributes();
	// }.on("didConnect"),
	didConnectFn : function(){
		var flag = false;
		if(!this.$node.rendered){
			flag = true;
			this.$node.rendered = true;
		}
		this.setRating(flag);
		
		if(!this.rendered){
			this.setAriaAttributes();
			if(this.getMethods("onRender")){
				this.executeMethod("onRender",this);
			}  
            if(this.getData('ltPropValue') > 0){
            	this.rated = true;
            }
            this.rendered = true;
        }

	}.observes("ltPropValue").on("didConnect"),
	keydown : function(event){
		var focusedItem = document.activeElement;
		var isHalfIncr = this.getData('ltPropHalfIncrement');	
		var count = this.getData('ltPropCount');	
		if(event.keyCode === 39){
			var lrc = parseInt(focusedItem.dataset.lrc) + 1;
			if(isHalfIncr){
				
				var value = this.getData('ltPropValue');
				this.setData('ltPropValue',(value + 0.5) > count ? count : (value + 0.5));
				this.$node.setAttribute('aria-valuenow',this.getData('ltPropValue') );
				if(lrc !== (value + 1)){
					return;
				}
			}else{
				this.setData('ltPropValue',lrc > count ? count : lrc);
				this.$node.setAttribute('aria-valuenow',this.getData('ltPropValue'));
			}
			var nxt_elem = focusedItem.parentNode.querySelector("[data-lrc = '"+ lrc  +"']");
			if(nxt_elem){
				nxt_elem.focus();
			}
			
		}else if(event.keyCode === 37){
			var lrc = parseInt(focusedItem.dataset.lrc) - 1;
			if(isHalfIncr){
				var value = this.getData('ltPropValue');
				this.setData('ltPropValue',(value - 0.5) > count ? count : (value - 0.5) );
				this.$node.setAttribute('aria-valuenow',this.getData('ltPropValue') );
				if(lrc !== (value - 0.5)){
					return;
				}
			}else{
				this.setData('ltPropValue',lrc > count ? count : lrc );
				this.$node.setAttribute('aria-valuenow',this.getData('ltPropValue'));
			}
			var prev_elem = focusedItem.parentNode.querySelector("[data-lrc = '"+ lrc +"']");
			if(prev_elem ){
				prev_elem.focus();
			}
			
		}
	},
	setAriaAttributes : function(){
		this.$node.setAttribute('role','slider');
		this.$node.setAttribute('aria-valuenow',this.getData('ltPropValue'));
		this.$node.setAttribute('aria-valuemin',0);
		this.$node.setAttribute('aria-valuemax',this.getData('ltPropCount'));
		var rating = this.$node.querySelectorAll('lyte-rate-icon');
		rating[0].setAttribute('tabindex',0);
		var keydownFn = function (event) { this.keydown(event); }.bind(this);
		var focusin = function(event){
			_lyteUiUtils.addGlobalEventListener('keydown',keydownFn, true);
			var value = self.getData('ltPropValue');
			if(event.target.dataset.lrc == 1 && value == 0){
				value = value + 1;
				if(isHalfIncr){
					value -= 0.5;
				}
				self.setData('ltPropValue',value );
				self.$node.setAttribute('aria-valuenow',self.getData('ltPropValue'));
			}
		};
		var focusout = function(event){
			_lyteUiUtils.removeEventListenerGlobal('keydown',keydownFn, true);
		};
		var self = this;
		var isHalfIncr = this.getData('ltPropHalfIncrement');

		for(var index = 0 ; index < rating.length ; index++ ){
			if(index === 0){
				rating[index].setAttribute('tabindex', 0);
			}else{
				rating[index].setAttribute('tabindex', -1);
			}
			
			rating[index].addEventListener('focusin',focusin);
			rating[index].addEventListener('focusout',focusout)
		}
	},
	setCountArray : function(){
		var countArray = [];
		for(var i = 1; i <= this.getData('ltPropCount'); i++){
			var obj = {};
			obj.ind = i;
			if(this.getData('ltPropType') == "svg"){
				if(this.getData('ltPropAppearance') === "star"){
					obj.appearance = "#star";
					obj.viewbox = this.getData('starVB');
				}
				if(this.getData('ltPropAppearance') === "lineStar"){
					obj.appearance = "#star";
					obj.viewbox = this.getData('lineStarVB');
				}
				if(this.getData('ltPropAppearance') === "heart"){
					obj.appearance = "#heart";
					obj.viewbox = this.getData('heartVB');
				}
				if(this.getData('ltPropAppearance') === "lineHeart"){
					obj.appearance = "#heart";
					obj.viewbox = this.getData('lineHeartVB');
				}
			}
			countArray.push(obj);
		}
		this.setData('countArray',countArray);
	},

	svgIconObserver : function(){
		this.setRating(true);
	}.observes('ltPropFillColor'),

	getFillColor : function(){
		return "var(--lyte-rating-fill-color)";
	},
	
	getEmptyColor : function(){
		return "var(--lyte-rating-empty-color)";
	},
	getHoverColor : function(){
		return "var(--lyte-rating-hover-color)";
	},

	setRating : function(stopMethod){

		this.clearHoverClasses();
		var currentRating = this.getData('ltPropValue'),
			ratedNodes = this.$node.querySelectorAll('.lyteRated'),
			nodes = this.$node.querySelectorAll('lyte-rate-icon');
		if(currentRating > nodes.length){
			currentRating = nodes.length;
		}
		if(this.getData('ltPropType') == "svg"){
			if(this.getData('ltPropHalfIncrement')){
				var stops;
				for(var i = 0; i < Math.floor(currentRating); i++){
					stops = nodes[i].querySelectorAll('linearGradient stop');
					stops[1].setAttribute('offset','100%');
					stops[2].setAttribute('offset','0%');
					stops[0].style.stopColor = this.getFillColor();
					stops[1].style.stopColor = this.getFillColor();
					nodes[i].classList.add(this.getData('ltPropFullIcon'),"lyteRated");
				}
				for(var i = Math.floor(currentRating); i < nodes.length; i++){
					stops = nodes[i].querySelectorAll('linearGradient stop');
					stops[1].setAttribute('offset','0%');
					stops[2].setAttribute('offset','0%');
					stops[0].style.stopColor = this.getEmptyColor();
					stops[1].style.stopColor = this.getEmptyColor();
					stops[2].style.stopColor = this.getEmptyColor();
					nodes[i].classList.remove(this.getData('ltPropFullIcon'),this.getData('ltPropHalfIcon'),"lyteRated");
				}
				if(currentRating > 0){
					stops = nodes[Math.ceil(currentRating)-1].querySelectorAll('linearGradient stop');
					stops[1].setAttribute('offset',(currentRating % 1 != 0 ? parseInt((currentRating - Math.floor(currentRating))*100) : 100 )+'%');
					stops[2].setAttribute('offset',parseInt((currentRating - Math.floor(currentRating) + 0.01)*100)+'%');
					stops[0].style.stopColor = this.getFillColor();
					stops[1].style.stopColor = this.getFillColor();
					stops[2].style.stopColor = this.getEmptyColor();
					nodes[Math.ceil(currentRating)-1].classList.add(this.getData('ltPropHalfIcon'),"lyteRated");
				}
			}
			else{
				if(ratedNodes.length > 0 && this.getData('ltPropHalfIcon') && ratedNodes[ratedNodes.length-1].classList.contains(this.getData('ltPropHalfIcon'))){
					ratedNodes[ratedNodes.length-1].classList.remove(this.getData('ltPropHalfIcon'));
					ratedNodes[ratedNodes.length-1].classList.add(this.getData('ltPropFullIcon'))
				}
				if(currentRating < ratedNodes.length){
					var obj;
					for(var i = currentRating; i < ratedNodes.length; i++){
						if(this.getData("ltPropAppearance") == "lineHeart"){
							// $L('use',ratedNodes[i]).attr("href","#lineHeart");
							obj = this.getData('countArray')[i];
							Lyte.objectUtils(obj,"add","appearance","#lineHeart");
							Lyte.objectUtils(obj,"add","viewbox",this.getData('lineHeartVB'));
						}
						if(this.getData("ltPropAppearance") == "lineStar"){
							// $L('use',ratedNodes[i]).attr("href","#lineStar");
							obj = this.getData('countArray')[i];
							Lyte.objectUtils(obj,"add","viewbox",this.getData('lineStarVB'));
						}
						if(this.getData("ltPropAppearance") == "lineHeart" || this.getData("ltPropAppearance") == "lineStar"){
							$L('svg',ratedNodes[i]).css('stroke',this.getEmptyColor());
							$L('svg',ratedNodes[i]).css('fill',"transparent");
						}
						else{
							$L('svg',ratedNodes[i]).css('fill',this.getEmptyColor());
						}
						ratedNodes[i].classList.remove(this.getData('ltPropFullIcon'),"lyteRated");
						if(this.getData('ltPropHalfIcon')){
							ratedNodes[i].classList.remove(this.getData('ltPropHalfIcon'));
						}
					}
				}
				else if(currentRating > ratedNodes.length){
					var obj;
					for(var i = 0; i < currentRating && i < nodes.length; i++){
						if(this.getData("ltPropAppearance") == "lineHeart"){
							// $L('use',nodes[i]).attr("href","#heart");
							obj = this.getData('countArray')[i];
							Lyte.objectUtils(obj,"add","appearance","#heart");
							Lyte.objectUtils(obj,"add","viewbox",this.getData('heartVB'));
						}
						if(this.getData("ltPropAppearance") == "lineStar"){
							// $L('use',nodes[i]).attr("href","#star");
							obj = this.getData('countArray')[i];
							Lyte.objectUtils(obj,"add","viewbox",this.getData('starVB'));
						}
						$L('svg',nodes[i]).css('fill',this.getFillColor());
						$L('svg',nodes[i]).css('stroke',"");
						nodes[i].classList.add(this.getData('ltPropFullIcon'),"lyteRated");
					}
				}
			}
		}
		else if(this.getData('ltPropType') == "switch"){
			if(ratedNodes.length){
				var prevValue = parseInt(ratedNodes[0].getAttribute('data-lrc'));
				ratedNodes[0].classList.remove(this.getClass(prevValue-1,'fi'),"lyteRated");
			}
			if(currentRating > 0){
				nodes[currentRating - 1].classList.add(this.getClass(currentRating-1,'fi'),"lyteRated");
			}
		}
		else if(this.getData('ltPropType') === "multiple" && this.getData('ltPropAppearance') != 'smiley'){
			if(currentRating % 1 !== 0){
				for(var i = 0; i < Math.floor(currentRating); i++){
					nodes[i].classList.add(this.getClass(i,'fi'),"lyteRated");
				}
				for(var i = Math.floor(currentRating); i < nodes.length; i++){
					nodes[i].classList.remove(this.getClass(i,'fi'),this.getClass(i,'hi'),"lyteRated");
				}
				nodes[Math.ceil(currentRating)-1].classList.add(this.getClass(Math.ceil(currentRating)-1,'hi'),"lyteRated");
			}
			else{
				if(ratedNodes.length > 0 && this.getData('halfIconArray').length && ratedNodes[ratedNodes.length-1].classList.contains(this.getClass(ratedNodes.length-1,'hi'))){
					ratedNodes[ratedNodes.length-1].classList.remove(this.getClass(ratedNodes.length-1,'hi'));
					ratedNodes[ratedNodes.length-1].classList.add(this.getClass(ratedNodes.length-1,'fi'))
				}
				if(currentRating < ratedNodes.length){
					for(var i = currentRating; i < ratedNodes.length; i++){
						ratedNodes[i].classList.remove(this.getClass(i,'fi'),"lyteRated");
						if(this.getData('halfIconArray').length){
							ratedNodes[i].classList.remove(this.getClass(i,'hi'));
						}
					}
				}
				else if(currentRating > ratedNodes.length){
					for(var i = ratedNodes.length; i < currentRating && i < nodes.length; i++){
						nodes[i].classList.add(this.getClass(i,'fi'),"lyteRated");
					}
				}
			}
		}
		else{
			if(currentRating % 1 !== 0){
				for(var i = 0; i < Math.floor(currentRating); i++){
					nodes[i].classList.add(this.getData('ltPropFullIcon'),"lyteRated");
				}
				for(var i = Math.floor(currentRating); i < nodes.length; i++){
					nodes[i].classList.remove(this.getData('ltPropFullIcon'),this.getData('ltPropHalfIcon'),"lyteRated");
				}
				nodes[Math.ceil(currentRating)-1].classList.add(this.getData('ltPropHalfIcon'),"lyteRated");
			}
			else{
				if(ratedNodes.length > 0 && this.getData('ltPropHalfIcon') && ratedNodes[ratedNodes.length-1].classList.contains(this.getData('ltPropHalfIcon'))){
					ratedNodes[ratedNodes.length-1].classList.remove(this.getData('ltPropHalfIcon'));
					ratedNodes[ratedNodes.length-1].classList.add(this.getData('ltPropFullIcon'))
				}
				if(currentRating < ratedNodes.length){
					for(var i = currentRating; i < ratedNodes.length; i++){
						ratedNodes[i].classList.remove(this.getData('ltPropFullIcon'),"lyteRated");
						if(this.getData('ltPropHalfIcon')){
							ratedNodes[i].classList.remove(this.getData('ltPropHalfIcon'));
						}
					}
				}
				else if(currentRating > ratedNodes.length){
					for(var i = ratedNodes.length; i < currentRating && i < nodes.length; i++){
						nodes[i].classList.add(this.getData('ltPropFullIcon'),"lyteRated");
					}
				}
			}
		}
		if(!stopMethod && this.getMethods("onClick")){
            this.executeMethod("onClick",this.getData('ltPropValue'),this);
        }
	},

	getClass : function(index, iconType){
		if(iconType == "fi"){
			return Lyte.Component.registeredHelpers.lyteUiGetArrayValueByIndex(this.getData('fullIconArray'),index);
		}
		if(iconType == "hi"){
			return Lyte.Component.registeredHelpers.lyteUiGetArrayValueByIndex(this.getData('halfIconArray'),index);
		}
		if(iconType == "hfi"){
			return Lyte.Component.registeredHelpers.lyteUiGetArrayValueByIndex(this.getData('hoverFullIconArray'),index);
		}
		if(iconType == "hhi"){
			return Lyte.Component.registeredHelpers.lyteUiGetArrayValueByIndex(this.getData('hoverHalfIconArray'),index);
		}
	},

	clearHoverClasses : function(){
		var hoveredNodes = this.$node.querySelectorAll('.lyteRatingHover');
		for(var i = 0; i<hoveredNodes.length; i++){
			if(this.getData('ltPropType') == "switch"){
				hoveredNodes[i].classList.remove(this.getClass(parseInt(hoveredNodes[i].getAttribute('data-lrc'))-1, 'hfi'),'lyteRatingHover');
			}
			else if(this.getData('ltPropType') == "multiple" && this.getData('ltPropAppearance') != 'smiley'){
				hoveredNodes[i].classList.remove(this.getClass(parseInt(hoveredNodes[i].getAttribute('data-lrc'))-1, 'hfi'),'lyteRatingHover');
				if(this.getData('hoverHalfIconArray').length){
					hoveredNodes[i].classList.remove(this.getClass(parseInt(hoveredNodes[i].getAttribute('data-lrc'))-1, 'hhi'),'lyteRatingHover');
				}
			}
			else{
				hoveredNodes[i].classList.remove(this.getData('ltPropHoverFullIcon'),this.getData('ltPropHoverHalfIcon'),'lyteRatingHover');
			}
		}
	},

	getCurrentValue : function(event,ele){
		var value = parseInt(ele.getAttribute('data-lrc'));
		if(this.getData('ltPropHalfIncrement')){
			var elemOffset = ele.getBoundingClientRect();
			if(event.clientX <= elemOffset.left + (elemOffset.width/2)){
				value = (value-1)+0.5;
			}
		}
		return value;
	},

	onClick : function(event){
		
		if(this.getData('ltPropClearable')){
			if(this.rated && this.getData('currentHover') == this.getData('ltPropValue')){
				this.setData('ltPropValue',0);
				this.rated = false;
				this.setData('currentHover',0)
			}
			else{

				var value = this.getCurrentValue(event,event.target.closest('lyte-rate-icon'));
				if(value != this.getData('currentHover')){
					this.setData('currentHover',value);
				}
				this.setData('ltPropValue',this.getData('currentHover'));
				this.rated = true;
			}
		}
		else{
			this.setData('ltPropValue',this.getData('currentHover'));
		}
	},

	onOver : function(event){
		var target = event.target.closest('lyte-rate-icon'),
			value = parseInt(target.getAttribute('data-lrc')),
			hoveredNodes = this.getData('currentHover'),
			nodes = this.$node.querySelectorAll('lyte-rate-icon'),
			prevValue = hoveredNodes;
		if(this.getData('ltPropType') == "svg"){
			if(Lyte.Component.registeredHelpers.lyteUiCheckHalfRatingSvg(this.getData('ltPropHalfIncrement'), this.getData('ltPropPrecision'))){
				// console.log(this.getData('currentHover'));
				var precision = this.getData('ltPropPrecision') * 100, stops,
				elemOffset = target.querySelector('use').getBoundingClientRect();
				hoveredNodes = Math.ceil(hoveredNodes);
				if((value - 1) < hoveredNodes){
					for(var i = value-1; i < hoveredNodes; i++){
						stops = nodes[i].querySelectorAll('linearGradient stop');
						stops[1].setAttribute('offset','0%');
						stops[2].setAttribute('offset','0%');
						stops[0].style.stopColor = this.getEmptyColor();
						stops[1].style.stopColor = this.getEmptyColor();
						stops[2].style.stopColor = this.getEmptyColor();
						nodes[i].classList.remove(this.getData('ltPropHoverFullIcon'),this.getData('ltPropHoverHalfIcon'),"lyteRatingHover");
					}
				}
				else if((value - 1) > hoveredNodes){
					for(var i = hoveredNodes; i < value-1; i++){
						stops = nodes[i].querySelectorAll('linearGradient stop');
						stops[1].setAttribute('offset','100%');
						stops[2].setAttribute('offset','0%');
						stops[0].style.stopColor = this.getHoverColor();
						stops[1].style.stopColor = this.getHoverColor();
						stops[2].style.stopColor = this.getHoverColor();
						nodes[i].classList.add(this.getData('ltPropHoverFullIcon'),"lyteRatingHover");
					}
					for(var i = value-1; i < nodes.length; i++){
						stops = nodes[i].querySelectorAll('linearGradient stop');
						stops[1].setAttribute('offset','0%');
						stops[2].setAttribute('offset','0%');
						stops[0].style.stopColor = this.getEmptyColor();
						stops[1].style.stopColor = this.getEmptyColor();
						stops[2].style.stopColor = this.getEmptyColor();
						nodes[i].classList.remove(this.getData('ltPropHoverFullIcon'),this.getData('ltPropHoverHalfIcon'),"lyteRatingHover");
					}
				}
				else{
					for(var i = value-1; i < nodes.length; i++){
						stops = nodes[i].querySelectorAll('linearGradient stop');
						stops[1].setAttribute('offset','0%');
						stops[2].setAttribute('offset','0%');
						stops[0].style.stopColor = this.getEmptyColor();
						stops[1].style.stopColor = this.getEmptyColor();
						stops[2].style.stopColor = this.getEmptyColor();
						nodes[i].classList.remove(this.getData('ltPropHoverFullIcon'),this.getData('ltPropHoverHalfIcon'),"lyteRatingHover");
					}
				}
				target.classList.remove(this.getData('ltPropHoverFullIcon'),this.getData('ltPropHoverHalfIcon'),"lyteRatingHover");
				// if(event.clientX >= elemOffset.left && event.clientX <= elemOffset.right){
					var currWidth = Math.abs(event.clientX - Math.round(elemOffset.left)),
					totalWidth = Math.round(elemOffset.width),
					percentage = parseInt(Math.min(((currWidth/totalWidth)*100), 100));
					// console.log(currWidth,totalWidth,percentage)
					if(percentage != 0 && percentage % precision == 0){
						stops = target.querySelectorAll('linearGradient stop');
						stops[1].setAttribute('offset', percentage + '%');
						stops[2].setAttribute('offset', (percentage + 1) + '%');
						stops[0].style.stopColor = this.getHoverColor();
						stops[1].style.stopColor = this.getHoverColor();
						stops[2].style.stopColor = this.getEmptyColor();
						target.classList.add(this.getData('ltPropHoverFullIcon'),"lyteRatingHover");
						this.setData('currentHover',(value - 1)+(percentage/100));
					}
					else{
						var quo = parseInt(percentage / precision),
						nearest = Math.min((quo+1)*precision,100);
						stops = target.querySelectorAll('linearGradient stop');
						stops[1].setAttribute('offset', nearest + '%');
						stops[2].setAttribute('offset', (nearest + 1) + '%');
						stops[0].style.stopColor = this.getHoverColor();
						stops[1].style.stopColor = this.getHoverColor();
						stops[2].style.stopColor = this.getEmptyColor();
						target.classList.add(this.getData('ltPropHoverHalfIcon'),"lyteRatingHover");
						this.setData('currentHover',(value-1)+(nearest/100));
					}
				// }
			}
			else{
				var obj;
				if(value > hoveredNodes){
					for(var i = hoveredNodes; i < value; i++){
						nodes[i].classList.add(this.getData('ltPropHoverFullIcon'),"lyteRatingHover");
						if(this.getData("ltPropAppearance") == "lineHeart"){
							// $L('use',nodes[i]).attr("href","#heart");
							obj = this.getData('countArray')[i];
							Lyte.objectUtils(obj,"add","appearance","#heart");
							Lyte.objectUtils(obj,"add","viewbox",this.getData('heartVB'));
						}
						if(this.getData("ltPropAppearance") == "lineStar"){
							// $L('use',nodes[i]).attr("href","#star");
							obj = this.getData('countArray')[i];
							Lyte.objectUtils(obj,"add","viewbox",this.getData('starVB'));
						}
						$L('svg',nodes[i]).css('fill',this.getHoverColor());
						$L('svg',nodes[i]).css('stroke',"");
					}
				}
				else if(value < hoveredNodes){
					for(var i = value; i < hoveredNodes; i++){
						nodes[i].classList.remove(this.getData('ltPropHoverFullIcon'),"lyteRatingHover");
						if(value < this.getData('ltPropValue')){
							if(this.getData("ltPropAppearance") == "lineHeart"){
								// $L('use',nodes[i]).attr("href","#heart");
								obj = this.getData('countArray')[i];
								Lyte.objectUtils(obj,"add","appearance","#heart");
								Lyte.objectUtils(obj,"add","viewbox",this.getData('heartVB'));
							}
							if(this.getData("ltPropAppearance") == "lineStar"){
								// $L('use',nodes[i]).attr("href","#star");
								obj = this.getData('countArray')[i];
								Lyte.objectUtils(obj,"add","viewbox",this.getData('starVB'));
							}
							$L('svg',nodes[i]).css('fill',this.getFillColor());
							$L('svg',nodes[i]).css('stroke',"");
						}
						else{
							if(this.getData("ltPropAppearance") == "lineHeart"){
								// $L('use',nodes[i]).attr("href","#lineHeart");
								obj = this.getData('countArray')[i];
								Lyte.objectUtils(obj,"add","appearance","#lineHeart");
								Lyte.objectUtils(obj,"add","viewbox",this.getData('lineHeartVB'));
							}
							if(this.getData("ltPropAppearance") == "lineStar"){
								// $L('use',nodes[i]).attr("href","#lineStar");
								obj = this.getData('countArray')[i];
								Lyte.objectUtils(obj,"add","viewbox",this.getData('lineStarVB'));
							}
							if(this.getData("ltPropAppearance") == "lineHeart" || this.getData("ltPropAppearance") == "lineStar"){
								$L('svg',nodes[i]).css('stroke',this.getEmptyColor());
								$L('svg',nodes[i]).css('fill',"transparent");
							}
							else{
								$L('svg',nodes[i]).css('fill',this.getEmptyColor());
							}
						}
					}
				}
				else{
					for(var i = 0; i < hoveredNodes; i++){
						if(!(nodes[i].classList.contains("lyteRatingHover"))){
							nodes[i].classList.add(this.getData('ltPropHoverFullIcon'),"lyteRatingHover");
							if(this.getData("ltPropAppearance") == "lineHeart"){
								// $L('use',nodes[i]).attr("href","#heart");
								obj = this.getData('countArray')[i];
								Lyte.objectUtils(obj,"add","appearance","#heart");
								Lyte.objectUtils(obj,"add","viewbox",this.getData('heartVB'));
							}
							if(this.getData("ltPropAppearance") == "lineStar"){
								// $L('use',nodes[i]).attr("href","#star");
								obj = this.getData('countArray')[i];
								Lyte.objectUtils(obj,"add","viewbox",this.getData('starVB'));
							}
							$L('svg',nodes[i]).css('fill',this.getHoverColor());
							$L('svg',nodes[i]).css('stroke',"");
						}
					}
				}
				this.setData('currentHover',value);
			}
		}
		else if(this.getData('ltPropType') == "switch"){
			nodes[value-1].classList.add(Lyte.Component.registeredHelpers.lyteUiGetArrayValueByIndex(this.getData('hoverFullIconArray'),value-1),'lyteRatingHover');
			this.setData('currentHover',value);
		}
		else if(this.getData('ltPropType') == "multiple" && this.getData('ltPropAppearance') != 'smiley'){
			if(this.getData('ltPropHalfIncrement')){
				hoveredNodes = Math.round(hoveredNodes);
				var elemOffset = target.getBoundingClientRect();
				if((value - 1) < hoveredNodes){
					for(var i = value-1; i < hoveredNodes; i++){
						nodes[i].classList.remove(this.getClass(i,'hfi'), this.getClass(i,'hhi'),"lyteRatingHover");
					}
				}
				else if((value - 1) > hoveredNodes){
					for(var i = hoveredNodes; i < value-1; i++){
						nodes[i].classList.add(this.getClass(i,'hfi'),"lyteRatingHover");
					}
				}
				target.classList.remove(this.getClass(value,'hfi'), this.getClass(value,'hhi'),"lyteRatingHover");
				if(event.clientX > elemOffset.left + (elemOffset.width/2)){
					target.classList.add(this.getClass(value,'hfi'),"lyteRatingHover");
					this.setData('currentHover',value);
				}
				else{
					target.classList.add(this.getClass(value,'hhi'),"lyteRatingHover");
					this.setData('currentHover',(value-1)+0.5);
				}
			}
			else{
				if(value > hoveredNodes){
					for(var i = hoveredNodes; i < value; i++){
						nodes[i].classList.add(this.getClass(i,'hfi'),"lyteRatingHover");
					}
				}
				else if(value < hoveredNodes){
					for(var i = value; i < hoveredNodes; i++){
						nodes[i].classList.remove(this.getClass(i,'hfi'),"lyteRatingHover");
					}
				}
				this.setData('currentHover',value);
			}
		}
		else{
			if(this.getData('ltPropHalfIncrement')){
				hoveredNodes = Math.round(hoveredNodes);
				var elemOffset = target.getBoundingClientRect();
				if((value - 1) < hoveredNodes){
					for(var i = value-1; i < hoveredNodes; i++){
						nodes[i].classList.remove(this.getData('ltPropHoverFullIcon'),this.getData('ltPropHoverHalfIcon'),"lyteRatingHover");
					}
				}
				else if((value - 1) > hoveredNodes){
					for(var i = hoveredNodes; i < value-1; i++){
						nodes[i].classList.add(this.getData('ltPropHoverFullIcon'),"lyteRatingHover");
					}
				}
				target.classList.remove(this.getData('ltPropHoverFullIcon'),this.getData('ltPropHoverHalfIcon'),"lyteRatingHover");
				if(event.clientX > elemOffset.left + (elemOffset.width/2)){
					target.classList.add(this.getData('ltPropHoverFullIcon'),"lyteRatingHover");
					this.setData('currentHover',value);
				}
				else{
					target.classList.add(this.getData('ltPropHoverHalfIcon'),"lyteRatingHover");
					this.setData('currentHover',(value-1)+0.5);
				}
			}
			else{
				if(value > hoveredNodes){
					for(var i = hoveredNodes; i < value; i++){
						nodes[i].classList.add(this.getData('ltPropHoverFullIcon'),"lyteRatingHover");
					}
				}
				else if(value < hoveredNodes){
					for(var i = value; i < hoveredNodes; i++){
						nodes[i].classList.remove(this.getData('ltPropHoverFullIcon'),"lyteRatingHover");
					}
				}
				this.setData('currentHover',value);
			}
		}
		if(prevValue != this.getData('currentHover') && this.getMethods("onHover")){
            this.executeMethod("onHover",this.getData('currentHover'),this);  
        }
	},

	onOut : function(event){
		var target = event.target.closest('lyte-rate-icon');
		if(this.getData('ltPropType') == "switch"){
			target.classList.remove(Lyte.Component.registeredHelpers.lyteUiGetArrayValueByIndex(this.getData('hoverFullIconArray'), parseInt(target.getAttribute('data-lrc')) - 1),'lyteRatingHover');
			this.setData('currentHover',0);
		}
		else{
			var children = this.$node.querySelectorAll('lyte-rate-icon');
			var left = children[0].getBoundingClientRect().left;
			var right = children[children.length-1].getBoundingClientRect().right;
			var offset = target.getBoundingClientRect();
			if(event.clientX <= left || event.clientX >= right || event.clientY <= offset.top || event.clientY >= offset.bottom){
				// console.log("mouseout",target);
				var nodes = this.$node.querySelectorAll('.lyteRatingHover');
				var obj;
				for(var i = 0; i < nodes.length; i++ ){
					if(this.getData('ltPropType') == "svg"){
						nodes[i].classList.remove(this.getData('ltPropHoverFullIcon'),'lyteRatingHover');
						if(this.getData('ltPropHalfIncrement')){
							// console.log("WIP");
							this.setRating(true);
						}
						else{
							if(i < this.getData('ltPropValue')){
								$L('svg',nodes[i]).css('fill',this.getFillColor());
							}
							else{
								if(this.getData("ltPropAppearance") == "lineHeart"){
									// $L('use',nodes[i]).attr("href","#lineHeart");
									obj = this.getData('countArray')[i];
									Lyte.objectUtils(obj,"add","appearance","#lineHeart");
									Lyte.objectUtils(obj,"add","viewbox",this.getData('lineHeartVB'));
								}
								if(this.getData("ltPropAppearance") == "lineStar"){
									// $L('use',nodes[i]).attr("href","#lineStar");
									obj = this.getData('countArray')[i];
									Lyte.objectUtils(obj,"add","viewbox",this.getData('lineStarVB'));
								}
								if(this.getData("ltPropAppearance") == "lineHeart" || this.getData("ltPropAppearance") == "lineStar"){
									$L('svg',nodes[i]).css('stroke',this.getEmptyColor());
									$L('svg',nodes[i]).css('fill',"transparent");
								}
								else{
									$L('svg',nodes[i]).css('fill',this.getEmptyColor());
									$L('svg',nodes[i]).css('stroke',"");
								}
							}
						}
					}
					else if(this.getData('ltPropType') == "multiple" && this.getData('ltPropAppearance') != 'smiley'){
						nodes[i].classList.remove(this.getClass(i,'hfi'),'lyteRatingHover');
						if(this.getData('halfIconArray').length){
							nodes[i].classList.remove(this.getClass(i,'hhi'));
						}
					}
					else{
						nodes[i].classList.remove(this.getData('ltPropHoverFullIcon'),'lyteRatingHover');
						if(this.getData('ltPropHoverHalfIcon')){
							nodes[i].classList.remove(this.getData('ltPropHoverHalfIcon'));
						}
					}
				}
				this.setData('currentHover',0);
			}
		}
		if(this.getMethods("onOut")){
            this.executeMethod("onOut",parseInt(target.getAttribute('data-lrc')),this);  
        }
	}
});

if( !_lyteUiUtils.registeredCustomElements[ 'lyte-rate-icon' ] ){
    
    _lyteUiUtils.registeredCustomElements[ 'lyte-rate-icon' ] = true;

    Lyte.createCustomElement("lyte-rate-icon", {
	    static : {

	    },
	    connectedCallback : function(){
	    	if(!this.prevent){
		        var comp = this.closest('lyte-rating').component;
		        this.addEventListener('click',comp.onClick.bind(comp));
		        this.addEventListener('mousemove',comp.onOver.bind(comp));
		        this.addEventListener('mouseout',comp.onOut.bind(comp));
		        if(comp.getData('ltPropYield')){
		        	if(comp.timeoutId){
		        		clearTimeout(comp.timeoutId);
		        		comp.timeoutId = false;
		        	}
		        	comp.timeoutId = setTimeout(function(){
		        		var nodes = this.closest('lyte-rating').querySelectorAll('lyte-rate-icon');
		        		for(var i = 0; i<nodes.length; i++){
		        			nodes[i].setAttribute('data-lrc',i+1);
		        		}
		        	}.bind(this),100);
		        }
		        this.prevent = true;
	        }
	    },
	    disconnectedCallback : function(){
	        
	    }
	});
}

/**
 * @syntax nonYielded
 * <lyte-rating lt-prop-type = "svg" lt-prop-appearance = "star"> </lyte-rating>
 * </lyte-rating> 
 */
