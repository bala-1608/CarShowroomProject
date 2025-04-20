/**
 * Renders a colorpicker
 * @component lyte-colorpicker
 * @version 1.0.0
 * @dependencies lyte-wormhole,lyte-button,lyte-popover,lyte-dropdown,lyte-input,lyte-table,lyte-draggable
 * @methods onBeforeOpen,onOpen,onSelect,onClose,onChange,onInputError
 */

Lyte.Component.register("lyte-colorpicker", {
_template:"<template tag-name=\"lyte-colorpicker\"> <template is=\"if\" value=\"{{ltPropInline}}\"><template case=\"true\"> <div class=\"lyteColorPicker\"> <div class=\"lyteColorPicker__showhidecontainer\"> <colorpicker-ui cp-accent=\"{{ltPropAccent}}\" cp-advanced-no-fill-button=\"{{ltPropAdvancedNoFillButton}}\" cp-accent-color=\"{{ltPropAccentColor}}\" cp-advanced-color-button=\"{{ltPropAdvancedColorButton}}\" on-basic-color-change=\"{{method(&quot;executeOnBasicColorChange&quot;)}}\" on-cancel-button=\"{{method(&quot;cancelPopColorPicker&quot;)}}\" cp-standard-colors=\"{{ltPropStandardColors}}\" cp-used-colors=\"{{ltPropUsedColors}}\" cp-basic-color-picker=\"{{lbind(ltPropBasicColorPicker)}}\" cp-wrapper-class=\"{{ltPropWrapperClass}}\" cp-current-rgb-code=\"{{ltPropCurrentRgbCode}}\" cp-no-fill-button=\"{{ltPropNoFillButton}}\" cp-no-fill-label=\"{{ltPropNoFillLabel}}\" cp-palette-label=\"{{ltPropPaletteLabel}}\" cp-inline=\"{{ltPropInline}}\" cp-color-formats=\"{{lbind(ltPropColorFormats)}}\" cp-done-btn-text=\"{{lbind(ltPropDoneBtnText)}}\" cp-cancel-btn-text=\"{{lbind(ltPropCancelBtnText)}}\" cp-back-btn-text=\"{{lbind(ltPropBackBtnText)}}\" cp-apply-btn-text=\"{{lbind(ltPropApplyBtnText)}}\" cp-standard-color-array=\"{{ltPropStandardColorArray}}\" cp-board-color=\"{{lbind(ltPropBoardColor)}}\" cp-selected-color=\"{{lbind(ltPropSelectedColor)}}\" cp-available-colors=\"{{availableColors}}\" used-colors=\"{{lbind(ltPropUsedColorsList)}}\" cp-more-color-option-selected=\"{{lbind(moreColorOptionSelected)}}\" cp-opacity-label=\"{{ltPropOpacityLabel}}\" cp-used-colors-number=\"{{ltPropUsedColorsNumber}}\" opacity=\"{{ltPropOpacity}}\" cp-close-on-selection=\"{{ltPropCloseOnSelection}}\" cp-close-on-body-click=\"{{ltPropCloseOnBodyClick}}\" on-select=\"{{method(&quot;executeOnSelect&quot;)}}\" on-change=\"{{method(&quot;executeOnChange&quot;)}}\" on-close=\"{{method(&quot;executeOnClose&quot;)}}\" on-input-error=\"{{method(&quot;executeOnInputError&quot;)}}\" cp-yield=\"{{ltPropYield}}\" on-color-hover=\"{{method('colorHover')}}\" cp-show-hidden-color=\"{{ltPropShowHiddenColor}}\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <template is=\"registerYield\" yield-name=\"colorpickerYield\"> <lyte-yield yield-name=\"cpyield\"></lyte-yield> </template> </template></template> </colorpicker-ui> </div> </div> </template><template case=\"false\"> <lyte-popover class=\"lyteColorPicker popColorPicker\" on-close=\"{{method(&quot;closePopColorPicker&quot;)}}\" on-show=\"{{method(&quot;showColorPickerPopover&quot;,event)}}\" lt-prop-focus-on-close=\"{{ltPropFocusOnClose}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-popover-content class=\"lyteColorPicker__showhidecontainer\"> <colorpicker-ui cp-accent=\"{{ltPropAccent}}\" cp-advanced-no-fill-button=\"{{ltPropAdvancedNoFillButton}}\" cp-accent-color=\"{{ltPropAccentColor}}\" cp-drop-box-class=\"{{ltPropDropBoxClass}}\" cp-advanced-color-button=\"{{ltPropAdvancedColorButton}}\" on-basic-color-change=\"{{method(&quot;executeOnBasicColorChange&quot;)}}\" on-cancel-button=\"{{method(&quot;cancelPopColorPicker&quot;)}}\" cp-standard-colors=\"{{ltPropStandardColors}}\" cp-used-colors=\"{{ltPropUsedColors}}\" cp-basic-color-picker=\"{{lbind(ltPropBasicColorPicker)}}\" cp-wrapper-class=\"{{ltPropWrapperClass}}\" cp-current-rgb-code=\"{{ltPropCurrentRgbCode}}\" cp-no-fill-button=\"{{ltPropNoFillButton}}\" cp-no-fill-label=\"{{ltPropNoFillLabel}}\" cp-palette-label=\"{{ltPropPaletteLabel}}\" cp-inline=\"{{ltPropInline}}\" cp-color-formats=\"{{lbind(ltPropColorFormats)}}\" cp-done-btn-text=\"{{lbind(ltPropDoneBtnText)}}\" cp-cancel-btn-text=\"{{lbind(ltPropCancelBtnText)}}\" cp-back-btn-text=\"{{lbind(ltPropBackBtnText)}}\" cp-apply-btn-text=\"{{ltPropApplyBtnText}}\" cp-standard-color-array=\"{{ltPropStandardColorArray}}\" cp-board-color=\"{{lbind(ltPropBoardColor)}}\" cp-selected-color=\"{{lbind(ltPropSelectedColor)}}\" cp-available-colors=\"{{availableColors}}\" used-colors=\"{{lbind(ltPropUsedColorsList)}}\" cp-more-color-option-selected=\"{{lbind(moreColorOptionSelected)}}\" cp-opacity-label=\"{{ltPropOpacityLabel}}\" cp-used-colors-number=\"{{ltPropUsedColorsNumber}}\" opacity=\"{{ltPropOpacity}}\" cp-close-on-selection=\"{{ltPropCloseOnSelection}}\" cp-close-on-body-click=\"{{ltPropCloseOnBodyClick}}\" on-select=\"{{method(&quot;executeOnSelect&quot;)}}\" on-change=\"{{method(&quot;executeOnChange&quot;)}}\" on-close=\"{{method(&quot;executeOnClose&quot;)}}\" on-input-error=\"{{method(&quot;executeOnInputError&quot;)}}\" cp-yield=\"{{ltPropYield}}\" on-color-hover=\"{{method('colorHover')}}\" cp-show-hidden-color=\"{{ltPropShowHiddenColor}}\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <template is=\"registerYield\" yield-name=\"colorpickeryield\"> <lyte-yield yield-name=\"cpyield\"></lyte-yield> </template> </template></template> </colorpicker-ui> </lyte-popover-content> </template> </lyte-popover> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"attr","position":[1,1,1,1]},{"type":"if","position":[1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"insertYield","position":[1]}]}]}},"default":{}},{"type":"componentDynamic","position":[1,1,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"insertYield","position":[1]}]}]}},"default":{}},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropShow","ltPropDraggable","ltPropCloseOnBodyClick","ltPropCloseOnSelection","ltPropAdvancedColorButton","ltPropAppearance","ltPropStandardColors","ltPropUsedColors","ltPropBasicColorPicker","ltPropSelectedColor","ltPropOriginElement","ltPropWrapperClass","ltPropCurrentRgbCode","ltPropBoundary","ltPropScrollable","ltPropNoFillButton","ltPropNoFillLabel","ltPropPaletteLabel","ltPropInline","ltPropColorFormats","ltPropDoneBtnText","ltPropCancelBtnText","ltPropBackBtnText","ltPropApplyBtnText","ltPropStandardColorArray","ltPropDuration","ltPropBoardColor","ltPropOpacityLabel","ltPropPopover","ltPropUsedColorsNumber","ltPropUsedColorsList","ltPropOpacity","ltPropFreeze","ltPropAccent","ltPropAccentColor","ltPropDropBoxClass","ltPropFocusOnClose","ltPropShowHiddenColor","ltPropAdvancedNoFillButton","moreColorOptionSelected","availableColors","usedColors","colorpicker","dropButtonValue","ltPropYield"],

	data: function () {
		return {
			//Component Variables

			/**
						 * @componentProperty {boolean} ltPropShow
						 * @version 1.0.0
						 * @default false
						 * 
						 */
			"ltPropShow": Lyte.attr("boolean", { "default": false }),

			/**
						 * @componentProperty {boolean} ltPropDraggable
						 * @version 1.0.0
						 * @default false
						 * 
						 */
			"ltPropDraggable": Lyte.attr("boolean", { "default": false }),

			/**
						 * @componentProperty {boolean} ltPropCloseOnBodyClick
						 * @version 1.0.0
						 * @default true
						 * 
						 */
			"ltPropCloseOnBodyClick": Lyte.attr("boolean", { "default": true }),

			/**
						 * @componentProperty {boolean} ltPropCloseOnSelection
						 * @version 1.0.0
						 * @default false
						 * 
						 */
			"ltPropCloseOnSelection": Lyte.attr("boolean", { "default": false }),

			/**
						 * @componentProperty {boolean} ltPropAdvancedColorButton
						 * @version 1.0.0
						 * @default true
						 * 
						 */
			"ltPropAdvancedColorButton": Lyte.attr("boolean", { "default": true }),

			/**
						 * @componentProperty {string} ltPropAppearance
						 * @version 1.0.0
						 * @default callout
						 * @options callout,box
						 */
			"ltPropAppearance": Lyte.attr("string", { "default": "callout" }),

			/**
						 * @componentProperty {boolean} ltPropStandardColors
						 * @version 1.0.0
						 * @default true
						 * 
						 */
			"ltPropStandardColors": Lyte.attr("boolean", { "default": true }),

			/**
						 * @componentProperty {boolean} ltPropUsedColors
						 * @version 1.0.0
						 * @default true
						 * 
						 */
			"ltPropUsedColors": Lyte.attr("boolean", { "default": true }),

			/**
						 * @componentProperty {boolean} ltPropBasicColorPicker
						 * @version 1.0.0
						 * @default true
						 * 
						 */
			"ltPropBasicColorPicker": Lyte.attr("boolean", { "default": true }),

			/**
						 * @experimental ltPropSelectedColor
						 */
			"ltPropSelectedColor": Lyte.attr("object", { "default": null }),

			/**
						 * @componentProperty {string} ltPropOriginElement
						 * @version 1.0.0
						 */
			"ltPropOriginElement": Lyte.attr("string", { "default": "" }),

			/**
						 * @componentProperty {string} ltPropWrapperClass
						 * @version 1.0.0
						 * @default lyteColorPickerPopover
						 */
			"ltPropWrapperClass": Lyte.attr("string", { "default": "lyteColorPickerPopover" }),

			/**
						 * @experimental ltPropCurrentRgbCode
						 */
			"ltPropCurrentRgbCode": Lyte.attr("string", { "default": "90c3d4" }),

			/**
			 * @typedef {object} boundary
			 * @property {string} left
			 * @property {string} right
			 * @property {string} top
			 * @property {string} bottom
			 */
			/**
						 * @componentProperty {boundary} ltPropBoundary
						 * @version 1.0.0
						 * @default {}
						 */
			"ltPropBoundary": Lyte.attr("object", { "default": null }),

			/**
						 * @componentProperty {boolean} ltPropScrollable
						 * @version 1.0.0
						 * @default true
						 * 
						 */
			"ltPropScrollable": Lyte.attr("boolean", { "default": true }),

			/**
						 * @componentProperty {boolean} ltPropNoFillButton
						 * @version 1.0.0
						 * @default false
						 * 
						 */
			"ltPropNoFillButton": Lyte.attr("boolean", { "default": false }),

			/**
						 * @componentProperty {string} ltPropNoFillLabel
						 * @version 1.0.0
						 * @default No Fill
						 */
			"ltPropNoFillLabel": Lyte.attr("string", { "default": "" }),

			/**
						 * @componentProperty {string} ltPropPaletteLabel
						 * @version 1.0.0
						 * @default Theme Colors
						 */
			"ltPropPaletteLabel": Lyte.attr("string", { "default": "" }),

			/**
						 * @componentProperty {boolean} ltPropInline
						 * @version 1.0.0
						 * @default false
						 * 
						 */
			"ltPropInline": Lyte.attr("boolean", { "default": false }),

			/**
						 * @componentProperty {array} ltPropColorFormats
						 * @version 2.0.0
						 * @default ["HEX","RGB","HSV","CMYK"]
						 */
			"ltPropColorFormats": Lyte.attr("array", { "default": ["HEX", "RGB", "HSV", "CMYK"] }),

			/**
						 * @componentProperty {string} ltPropDoneBtnText
						 * @version 2.0.0
						 * @default Done
						 */
			"ltPropDoneBtnText": Lyte.attr("string", { "default": "lyte.colorpicker.done" }),

			/**
						 * @componentProperty {string} ltPropCancelBtnText
						 * @version 2.0.0
						 * @default Cancel
						 */
			"ltPropCancelBtnText": Lyte.attr("string", { "default": "lyte.colorpicker.cancel" }),

			/**
						 * @componentProperty {string} ltPropBackBtnText
						 * @version 2.0.0
						 * @default Back
						 */
			"ltPropBackBtnText": Lyte.attr("string", { "default": "lyte.colorpicker.back" }),

			/**
						 * @componentProperty {string} ltPropApplyBtnText
						 * @version 2.0.0
						 * @default Apply
						 */
			"ltPropApplyBtnText": Lyte.attr("string", { "default": "lyte.colorpicker.apply" }),

			/**
						 * @componentProperty {array} ltPropStandardColorArray
						 * @version 2.0.0
						 */
			"ltPropStandardColorArray": Lyte.attr("array", { "default": [] }),

			/**
						 * @componentProperty {number} ltPropDuration
						 * @version 2.0.0
						 * @default 600
						 */
			"ltPropDuration": Lyte.attr("number", { "default": 600 }),

			/**
						 * @componentProperty {string} ltPropBoardColor
						 * @version 2.2.4
						 * @default #90c3d4
						 */
			"ltPropBoardColor": Lyte.attr("string", { "default": "#90c3d4" }),

			/**
						 * @componentProperty {string} ltPropOpacityLabel
						 * @version 2.2.22
						 * @default Alpha
						 */
			"ltPropOpacityLabel": Lyte.attr("string"),

			/**
						 * @componentProperty {object} ltPropPopover
						 * @version 2.2.23
						 */
			"ltPropPopover": Lyte.attr("object", { "default": {} }),

			/**
						 * @componentProperty {number} ltPropUsedColorsNumber
						 * @version 3.8.0
						 * @default 10
						 */
			"ltPropUsedColorsNumber": Lyte.attr("number", { "default": 10 }),

			/**
						 * @componentProperty {array} ltPropUsedColorsList
						 * @version 3.8.0
						 * @default 10
						 */
			"ltPropUsedColorsList": Lyte.attr("array", { "default": [] }),

			/**
						 * @componentProperty {number} ltPropOpacity
						 * @version 3.20.0
						 * @default 100
						 */
			"ltPropOpacity": Lyte.attr("number", { "default": 100 }),
			/**
						 * @componentProperty {boolean} ltPropFreeze
						 * @version 3.86.0
						 * @default false
						 */
			"ltPropFreeze": Lyte.attr("boolean", { "default": false }),
			/**
						 * @componentProperty {boolean} ltPropAccent
						 * @version 3.102.0
						 * @default false
						 */
			'ltPropAccent': Lyte.attr('boolean',{"default": false}),
			/**
						 * @componentProperty {array} ltPropAccentColor
						 * @version 3.102.0
						 * @default []
						 */
			'ltPropAccentColor': Lyte.attr('array',{"default": []}),
			"ltPropDropBoxClass" : Lyte.attr('string',{"default": ''}),
			"ltPropFocusOnClose" : Lyte.attr('boolean',{"default": false}),
			"ltPropShowHiddenColor" : Lyte.attr('boolean',{"default": false}),
			"ltPropAdvancedNoFillButton" : Lyte.attr('boolean',{"default": false}),
			//Local variables
			"moreColorOptionSelected": Lyte.attr("boolean", { "default": false }),
			"availableColors": Lyte.attr("array", { "default": [] }),
			"usedColors": Lyte.attr("array"),
			"colorpicker": Lyte.attr("object", { "default": null }),
			"dropButtonValue": Lyte.attr("string", { "default": "HEX" }),
			"ltPropYield" : Lyte.attr("boolean", { "default" : false })
		}
	},
	init: function () {

		if(this.getData('ltPropAccent')){
			var colorcode = this.generateAccentColor();
			this.setData('availableColors', colorcode);
		}else{
			var availableColors = [['rgb(255, 255, 255)', 'rgb(239, 22, 22)', 'rgb(239, 130, 22)', 'rgb(239, 177, 22)', 'rgb(93, 195, 90)', 'rgb(56, 215, 187)', 'rgb(22, 208, 239)', 'rgb(57, 142, 243)', 'rgb(197, 22, 239)', 'rgb(239, 22, 111)'],
			['rgb(153, 153, 153)', 'rgb(249, 162, 162)', 'rgb(249, 205, 162)', 'rgb(249, 224, 162)', 'rgb(190, 231, 189)', 'rgb(175, 239, 228)', 'rgb(162, 236, 249)', 'rgb(176, 210, 250)', 'rgb(232, 162, 249)', 'rgb(249, 162, 197)'],
			['rgb(102, 102, 102)', 'rgb(245, 115, 115)', 'rgb(245, 180, 115)', 'rgb(245, 208, 115)', 'rgb(158, 219, 156)', 'rgb(136, 231, 214)', 'rgb(115, 227, 245)', 'rgb(136, 187, 248)', 'rgb(220, 115, 245)', 'rgb(245, 115, 169)'],
			['rgb(51, 51, 51)', 'rgb(242, 69, 69)', 'rgb(242, 155, 69)', 'rgb(242, 193, 69)', 'rgb(125, 207, 123)', 'rgb(96, 223, 201)', 'rgb(69, 217, 242)', 'rgb(97, 165, 245)', 'rgb(209, 69, 242)', 'rgb(242, 69, 140)'],
			['rgb(25, 25, 25)', 'rgb(171, 12, 12)', 'rgb(171, 91, 12)', 'rgb(171, 125, 12)', 'rgb(56, 146, 53)', 'rgb(32, 158, 136)', 'rgb(12, 148, 171)', 'rgb(12, 97, 198)', 'rgb(140, 12, 171)', 'rgb(171, 12, 77)'],
			['rgb(0, 0, 0)', 'rgb(73, 5, 5)', 'rgb(73, 39, 5)', 'rgb(73, 54, 5)', 'rgb(24, 63, 23)', 'rgb(14, 68, 58)', 'rgb(5, 64, 73)', 'rgb(5, 42, 85)', 'rgb(60, 5, 73)', 'rgb(73, 5, 33)']];
			this.setData('availableColors', availableColors);
		}
		if(this.getData('ltPropStandardColorArray').length == 0){
			var standardColorArray = ['rgb(192, 0, 0)', 'rgb(255, 0, 0)', 'rgb(255, 192, 0)', 'rgb(255, 255, 0)', 'rgb(146, 208, 80)', 'rgb(0, 176, 80)', 'rgb(0, 176, 240)', 'rgb(0, 112, 192)', 'rgb(0, 32, 96)', 'rgb(112, 48, 160)'];
			this.setData('ltPropStandardColorArray', standardColorArray);
		}
		var formatArray = this.getData('ltPropColorFormats');
		for (var i = 0; i < formatArray.length; i++) {
			formatArray[i] = _lyteUiUtils.i18n(formatArray[i]) || formatArray[i];
		}
		this.setData('ltPropColorFormats', formatArray);
		var usedColorsList = [], len = this.getData('ltPropUsedColorsNumber');
		if (this.getData('ltPropUsedColorsList').length > 0) {
			usedColorsList = this.getData('ltPropUsedColorsList').slice();
		}
		for (var i = usedColorsList.length; i < len; i++) {
			usedColorsList.push('noColor');
		}
		this.setData('ltPropUsedColorsList', usedColorsList.slice(0, len));
	},

	didConnect : function(){
		
		var cp_com = $L('colorpicker-ui',this.$node)[0];
		cp_com = cp_com ? cp_com : this.childComp;
		if(cp_com){
			this.$node.selectColor =  cp_com.selectColor;
		}
		
	
	},
	updateAccentColor : function(){
		var colorcode = this.generateAccentColor();
		this.setData('availableColors', colorcode);
	}.observes('ltPropAccentColor'),
	generateAccentColor : function(){
		var accentColor = this.getData('ltPropAccentColor');
		if(!accentColor){
			return;
		}
		if(accentColor && !accentColor.length){
			return;
		}
		var colorcode = [];
		var lastcolor;
		colorcode.push([])
		accentColor.forEach(function(color){
			colorcode[0].push(color.accentColor);
			lastcolor = color;
		})
		var colLength = accentColor.length;
		var rowLength = lastcolor.colorTone.length+1;
		
		for(var Rindex = 1; Rindex < rowLength ; Rindex++){
			colorcode.push([])
			for(var Cindex = 0; Cindex < colLength ; Cindex++){
				colorcode[Rindex].push($L.colorManipulator(accentColor[Cindex].accentColor).findAccentColor(accentColor[Cindex].colorTone[Rindex-1]))
			}
		}
		return colorcode;
	},	
	showbasicColorpicker : function(){

	},
	showColorPicker: function () {
		if (!this.getData('ltPropNoFillLabel')) {
			this.setData('ltPropNoFillLabel', _lyteUiUtils.i18n("No.Fill"));
		}
		if (!this.getData('ltPropPaletteLabel')) {
			this.setData('ltPropPaletteLabel', _lyteUiUtils.i18n("Theme.Colors"));
		}
		if (this.getData('ltPropInline')) {
			this.executeOnBeforeOpen();
			this.$node.style.display = "inline-block";
			this.setData('colorpicker', this.$node.querySelector('colorpicker-ui').component);
			if (this.getData('ltPropColorFormats').length > 0) {
				this.setData('dropButtonValue', this.getData('ltPropColorFormats')[0]);
			}
			if (this.getData('ltPropBasicColorPicker')) {
				this.getData('colorpicker').initializeBasicColorPicker(event || window.event, this.$node);
			}
			else {
				this.getData('colorpicker').inputEle = this.getData('colorpicker').$node.querySelector('#lyteCPHiddenInput');
				this.getData('colorpicker').initializeAdvColorPicker(event || window.event, this.$node);
			}
			this.executeOnOpen();
		}
		else {
			var popOver = this.$node.querySelector('.popColorPicker');
			if (this.getData('ltPropShow')) {
				if (this.getData('ltPropColorFormats').length > 0) {
					this.setData('dropButtonValue', this.getData('ltPropColorFormats')[0]);
				}
				popOver.ltProp("showCloseButton", false);
				if (this.getData('ltPropBoundary')) {
					popOver.ltProp("boundary", this.getData('ltPropBoundary'));
				}
				var keys = Object.keys(this.getData('ltPropPopover'));
				for (var j = 0; j < keys.length; j++) {
					popOver.ltProp(keys[j], this.getData('ltPropPopover')[keys[j]]);
				};
				popOver.ltProp({
					"windowSpacing": { left: 1, right: 1, top: 1, bottom: 1 },
					"contentPadding": "0px",
					"originElem": this.getData("ltPropOriginElement"),
					"wrapperClass": this.getData("ltPropWrapperClass"),
					"type": this.getData("ltPropAppearance"),
					"duration": this.getData("ltPropDuration"),
					"closeOnBodyClick": this.getData('ltPropCloseOnBodyClick'),
					"freeze": this.getData("ltPropFreeze"),
					"scrollable": this.getData("ltPropScrollable"),
					"draggable": false,
					"show": true
				});
				this.executeOnBeforeOpen();
			}
			else {
				
				if (popOver.ltProp) {
					popOver.ltProp('show', false);
				}

			}
		}
	}.observes('ltPropShow', 'ltPropInline', 'ltPropBasicColorPicker').on('didConnect'),

	observeOpacityChanges : function(){
		var colorpicker = this.getData('colorpicker'), opacity = this.getData('ltPropOpacity');
		if(colorpicker && opacity >= 0 && opacity <= 100){
			colorpicker.setData('opacity', opacity);
			colorpicker.__updateOpacityInForm();
		}
	}.observes('ltPropOpacity'),

	executeOnBeforeOpen: function () {
		if (this.getMethods('onBeforeOpen')) {
			this.executeMethod('onBeforeOpen', this);
		}
	},
	executeOnOpen: function () {
		if (this.getMethods('onOpen')) {
			this.executeMethod('onOpen', this);
		}
	},
	executeOnCloseFn: function (event) {
		if (this.getMethods('onClose')) {
			this.executeMethod('onClose', event, this);
		}
	},
	executeOnCancel: function (event) {
		if (this.getMethods('onCancelButton')) {
			this.executeMethod('onCancelButton', event, this);
		}
	},

	didDestroy: function () {
		this.setData('colorpicker', null);
	},
	wrapperClass : function(){

	},
	methods: {
		colorHover : function(color,elem,colorPallete){
			var col = elem.dataset.col;
			if(this.getMethods('onColorHover')){
				if(colorPallete == "themeColor"){
					var accentColor = this.getData('availableColors')[0][col];
				}
				this.executeMethod('onColorHover',color,elem,colorPallete,accentColor);
			}
		},
		cancelPopColorPicker : function(event){
			this.executeOnCancel(event);
		},
		closePopColorPicker: function (event) {
			this.executeOnCloseFn(event);
			if (this.getData('moreColorOptionSelected')) {
				var self = this;
				self.tId = setTimeout(function () {
					self.getData('colorpicker').setData('cpBasicColorPicker', true);
					self.getData('colorpicker').setData('cpMoreColorOptionSelected', false);
					self.tId = false;
				}, 400);
			}
			var ele = this.childComp.querySelector('.popoverWrapper');
			if (ele && ele.classList.contains('lyteColorpickerVisible')) {
				ele.classList.remove('lyteColorpickerVisible');
			}

			this.setData('ltPropShow', false);
		},
		showColorPickerPopover: function () {
			this.childComp = this.$node.querySelector('lyte-popover').component.childComp;
			var ele = this.childComp.querySelector('.popoverWrapper');
			ele.classList.add('lyteColorpickerVisible');
			this.setData('colorpicker', ele.querySelector('colorpicker-ui').component);

			if(!this.$node.selectColor){
				this.$node.selectColor = ele.querySelector('colorpicker-ui').selectColor;
			}
			//Sometimes the content is not properly rendered when the 
			ele.querySelector('lyte-popover-content').style.height = "auto";
			var colorpicker = this.getData('colorpicker');
			if (this.getData('ltPropBasicColorPicker')) {
				colorpicker.initializeBasicColorPicker(event, ele);
			}
			else {
				colorpicker.inputEle = colorpicker.$node.querySelector('#lyteCPHiddenInput');
				colorpicker.initializeAdvColorPicker(event, ele);
			}
			if (this.getData('ltPropDraggable')) {
				var drag = ele.querySelector('.lytePopover');
				var handle = ele.querySelector('lyte-popover-header') || ele.querySelector('lyte-popover-content');
				drag.id = "draggableColor";
				handle.id = "draghandle";
				$L('#draggableColor').draggable({
					handle: ['#draghandle']
				})
			}
			this.$node.querySelector('lyte-popover').component.computeOffsetImpl();
			this.executeOnOpen();
			ele = null;
		},
		executeOnClose: function (event) {
			this.executeOnCloseFn(event);
		},
		executeOnSelect: function (event, close, calledForHueMove) {
			if (this.getMethods("onSelect")) {
				this.executeMethod("onSelect", event, this.getData('ltPropSelectedColor'), this);
			}
			if (((this.getData('ltPropCloseOnSelection') && this.getData('ltPropBasicColorPicker')) || close === true) && !calledForHueMove) {
				this.setData('ltPropShow', false);
			}
		},
		executeOnChange: function (event) {
			if (this.getMethods('onChange')) {
				this.executeMethod('onChange', event, this.getData('ltPropSelectedColor'), this);
			}
		},
		executeOnBasicColorChange: function (event) {
			if (this.getMethods('onBasicColorChange')) {
				this.executeMethod('onBasicColorChange', event, this.getData('ltPropSelectedColor'), this);
			}
		},
		executeOnInputError: function (type) {
			if (this.getMethods('onInputError')) {
				this.executeMethod('onInputError', type);
			}
		}
	}
});

_lyteUiUtils.addEventListenerGlobal('click', function (event) {
	if (ColorPicker_EventUtil.__stopPropagation) {
		ColorPicker_EventUtil.__stopPropagation = false;
		return;
	}
	var ele = event.target;
	while (!ele.classList.contains('lyteColorpickerVisible') && ele.tagName != 'LYTE-DROP-BOX' && ele.tagName != 'HTML') {
		ele = ele.parentElement;
		if (!ele) {
			return
		}
	}

	if (ele.tagName == 'HTML') {
		var colorpicker = document[  _lyteUiUtils.isWidget ? "querySelectorGlobal" : 'querySelector' ]('.lyteColorpickerVisible');
		if (colorpicker && colorpicker.parentElement.parentElement._callee.parentElement.component.getData('ltPropCloseOnBodyClick')) {
			colorpicker.parentElement.parentElement._callee.parentElement.ltProp('show', false);
		}
	}

}, true);

Lyte.Component.registerHelper("lyteUiColorpickerAccentTooltip",function(colortone,rowindex){
	if(!colortone){
		return;
	}
	if(rowindex == 0){
		return colortone.colorType;
	}else{
		if(colortone.colorTone[rowindex - 1]){
			return colortone.colorType + ' - ' + colortone.colorTone[rowindex - 1].toneType + ' ' + colortone.colorTone[rowindex - 1].tonePercent+'%';
		}
	}
});
/**
 * @syntax nonYielded
 * <lyte-colorpicker lt-prop-basic-color-picker = "true">
 * </lyte-colorpicker>
 */
