/**
 * Renders a button
 * @component lyte-button
 * @version 1.0.0
 * @utility click, focus, blur
 * @dependencies lyte-shortcut
 * 		/plugins/lyte-shortcut.js
 */

Lyte.Component.register( 'lyte-button', {
_template:"<template tag-name=\"lyte-button\" __click=\"{{action('check',event)}}\" __mousedown=\"{{action('check',event)}}\"> <button part=\"{{ltPropPart}}\" type=\"{{ltPropType}}\" class=\"{{finalClass}}\" value=\"{{ltPropValue}}\" tabindex=\"{{ltPropTabindex}}\" data-tabindex=\"{{ltPropDataTabindex}}\" id=\"{{ltPropId}}\" name=\"{{ltPropName}}\" autofocus=\"{{ltPropAutofocus}}\" disabled=\"{{ltPropDisabled}}\" style=\"{{finalStyle}}\"> <template is=\"if\" value=\"{{ltPropText}}\"><template case=\"true\"> {{ltPropText}} </template><template case=\"false\"> <lyte-yield yield-name=\"text\"></lyte-yield> </template></template> </button> </template>",
_dynamicNodes : [{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"finalStyle"},"type":{"name":"type","dynamicValue":"ltPropType"}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1]}]},"false":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}}],
_templateAttributes :{"type":"attr","position":[]},
_observedAttributes :["ltPropName","ltPropDisabled","ltPropAutofocus","ltPropAppearance","ltPropId","ltPropType","ltPropValue","ltPropTabindex","ltPropStyle","ltPropSize","ltPropBackgroundColor","ltPropColor","lyteShortcut","ltPropClass","lyteUnbound","ltPropAriaButton","ltPropText","ltPropDataTabindex","randomId","ltPropPart"],

	data: function() {
		return {

			/**
			 * @componentProperty {string} ltPropName
			 */

			'ltPropName': Lyte.attr( 'string', {
				'default': undefined
			} ),


			/**
			 * @componentProperty {boolean} ltPropDisabled=false
			 */

			'ltPropDisabled': Lyte.attr( 'boolean', {
				'default': false
			} ),

			/**
			 * @componentProperty {boolean} ltPropAutoFocus=false
			 */

			'ltPropAutofocus': Lyte.attr( 'boolean', {
				'default': false
			} ),

			/**
			 * @componentProperty {default | primary | secondary | success | failure | warning} ltPropAppearance=default
			 */

			'ltPropAppearance': Lyte.attr( 'string', {
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-button', 'appearance', 'default' )
			} ),

			/**
			 * @componentProperty {string} ltPropId
			 */

			'ltPropId': Lyte.attr( 'string', {
				'default': undefined
			} ),

			/**
			 * @componentProperty {button | submit | reset} ltPropType=button
			 */

			'ltPropType': Lyte.attr( 'string', {
				'default': 'button'
			} ),

			/**
			 * @componentProperty {string} ltPropValue
			 */

			'ltPropValue': Lyte.attr( 'string', {
				'default': undefined
			} ),

			/**
			 * @componentProperty {string} ltPropTabindex
			 */

			'ltPropTabindex': Lyte.attr( 'string', {
				'default': undefined
			} ),

			/**
			 * @componentProperty {string} ltPropStyle
			 */

			'ltPropStyle': Lyte.attr( 'string', {
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-button', 'style', undefined )
			} ),

			/**
			 * @componentProperty {extra-small | small | default | medium | large } ltPropSize=default
			 */

			'ltPropSize': Lyte.attr( 'string', {
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-button', 'size', 'default' )
			} ),
			/**
			 * @componentProperty {colorString} ltPropBackgroundColor
			 */

			'ltPropBackgroundColor': Lyte.attr( 'string', {
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-button', 'backgroundColor', undefined )
			} ),
			/**
			 * @componentProperty {colorString} ltPropColor
			 */

			'ltPropColor': Lyte.attr( 'string', {
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-button', 'color', undefined )
			} ),

			/**
			 * @componentProperty {string} lyteShortcut
			 */

			'lyteShortcut': Lyte.attr('string', {
				'default': ''
			}),

			/**
			 * @componentProperty {string} ltPropClass
			 */

			'ltPropClass':Lyte.attr( 'string', {
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-button', 'class', '' )
			} ),
			/**
			 * @componentProperty {string} ltPropClass
			 */

			'lyteUnbound': Lyte.attr( 'boolean', {
				'default': false
			} ),

			/**
			 * @componentProperty {object} ltPropAriaButton={}
			 * @version 3.1.0
			 */

			'ltPropAriaButton': Lyte.attr('object', {
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-button', 'ariaButton', {} )
			} ),

			/**
			 * @componentProperty {string} ltPropText
			*/

			'ltPropText': Lyte.attr( 'string', {
				'default': ''
			}),
			/**
			 * @componentProperty {string} ltPropDataTabindex
			 */
			'ltPropDataTabindex': Lyte.attr('string', { 'default': null }),
			'randomId': Lyte.attr('string'),

			'ltPropPart': Lyte.attr( 'string', { 'default': _lyteUiUtils.resolveDefaultValue( 'lyte-button', 'part', '' ) } )
		}
	},

	ariaObserver: function( change ) {
		var oldAria = change.oldValue,
			newAria = change.newValue;

		this.addAriaValues( oldAria, newAria );
	}.observes( 'ltPropAriaButton' ),

	init: function() {
		this.pushValue();
	},

	registerFunction: function (fn) {
		var that = this;
		this.$node[fn] = function () {
			var node = that.$node,
				button = node.querySelector('button'),
				disabled = node.ltProp('disabled');

			if (disabled) {
				return;
			}

			button[fn]();
		}
	},

	didConnect: function () {
		var fns = ['click', 'focus', 'blur'], i = 0,
			oldAria = {}, newAria = this.getData('ltPropAriaButton');

		for (; i < fns.length; i++) {
			this.registerFunction(fns[i]);
		}

		this.addAriaValues(oldAria, newAria);
	},

	addAriaValues: function (oldAria, newAria) {
		var button = this.getButtonWidget();

		_lyteUiUtils.setAttribute(button, newAria, oldAria);
	},

	getButtonWidget: function () {
		return this.$node.querySelector('button');
	},

	didDestroy: function () {
		var val;

		delete this.$node.focus;
		delete this.$node.blur;
		delete this.$node.click;

		try {
			val = JSON.parse(this.getData('lyteShortcut'));
		}
		catch (err) {
			return;
		}

		if (Array.isArray(val)) {
			val.forEach(function (shortcutConfig) {
				if (shortcutConfig.key) {
					shortcut.push({
						newKey: undefined,
						type: undefined,
						wait: undefined,
						oldKey: shortcutConfig.key
					});
				}
			});
		}
		else {
			shortcut.push({
				newKey: undefined,
				type: undefined,
				wait: undefined,
				oldKey: val.key
			});
		}
	},

	shortcutChanged: function (changeObj) {
		this.pushValue(changeObj.oldValue);
	}.observes('lyteShortcut'),

	pushValue: function (oldValue) {
		var key = this.getData('lyteShortcut'),
			node = this.$node,
			// oldValue can be an array as well. Need to handle that
			oldObj = JSON.parse(oldValue || '{}'),
			oldKey = oldObj.key;

		if (!key) {
			return
		}
		// String is converted to object
		var newObj = JSON.parse(key);
		// If array
		if (Array.isArray(newObj)) {
			newObj.forEach(function (item) {
				if (item.validate) {
					item.validate = new Function('return ' + item.validate)();
				}
				var options = {
					wait: item.wait,
					preventDefault: item.preventDefault,
					useCode: item.useCode,
					excludeElements: item.excludeElements,
					validate: item.validate
				};
				if (item.key) {
					shortcut.push({
						newKey: item.key,
						type: item.type,
						// Need to unregister shortcut for array case
						oldKey: undefined,
						value: node,
						options: options
					});
				}
			})
		}
		else {
			if (newObj.key) {
				if (newObj.validate) {
					newObj.validate = new Function('return ' + newObj.validate)();
				}
				var options = {
					wait: newObj.wait,
					preventDefault: newObj.preventDefault,
					useCode: newObj.useCode,
					excludeElements: newObj.excludeElements,
					validate: newObj.validate
				}
				shortcut.push({
					newKey: newObj.key,
					type: newObj.type,
					oldKey: oldKey,
					value: node,
					options: options
				});
			}
			else {
				shortcut.push({
					newKey: undefined,
					type: undefined,
					wait: undefined,
					oldKey: oldKey
				});
			}
		}
	},

	changeClass: function() {
		var cls = this.getData('ltPropClass'), tempStyle = '',
		tempClass = 'lyte-button' + ( cls ? ' ' + cls : '' ),
		app = this.getData( 'ltPropAppearance' ), size = this.getData( 'ltPropSize' ),
		color = this.getData( 'ltPropColor' ), bg = this.getData( 'ltPropBackgroundColor' );
		size = size ? size.toLowerCase() : '';
		app = app ? app : 'default';

		if( bg ) {
			tempClass = tempClass + ' lyteBackgroundColorBtn';
		}
		else if( color ) {
			tempClass = tempClass + ' lyteColorBtn';
		}
		else if( app.indexOf( 'default' ) !== -1 ) {
			tempClass = tempClass + ' lyteDefaultBtn';
		}
		else if( app.indexOf( 'primary' ) !== -1 ) {
			tempClass = tempClass + ' lytePrimaryBtn';
		}
		else if( app.indexOf( 'secondary' ) !== -1 ) {
			tempClass = tempClass + ' lyteSecondary';
		}

		if( app.indexOf( 'success' ) !== -1 ) {
			tempClass = tempClass + ' lyteSuccess';
		}
		else if( app.indexOf( 'failure' ) !== -1 ) {
			tempClass = tempClass + ' lyteFailure';
		}
		else if( app.indexOf( 'warning' ) !== -1 ) {
			tempClass = tempClass + ' lyteWarningBtn';
		}

		if( size === 'extra-small' ) {
			tempClass = tempClass + ' lyteExsm';
		}
		else if( size === 'small' ) {
			tempClass = tempClass + ' lyteSm';
		}
		else if( size === 'large' ) {
			tempClass = tempClass + ' lyteLg';
		}

		if( color ) {
			if( !bg ) {
				// Adding bg-color #fff because androids render a grayish button.
				tempStyle = tempStyle + 'background-color: #fff; color:' + color + ';border-color:' + color + ';';
			}
			else {
				tempStyle = tempStyle + 'background-color:' + bg + ';border-color:' + bg + ';color:' + color + ';';
			}
		}
		else if( bg ) {
			tempStyle = tempStyle + 'background-color:' + bg + ";border-color:" + bg + ";color:white;";
		}

		if( this.getData( 'ltPropStyle' ) ) {
			tempStyle = tempStyle + this.getData( 'ltPropStyle' );
		}

		this.setData( 'finalStyle', tempStyle );
		this.setData( 'finalClass', tempClass );
	}.observes(
		'ltPropClass',
		'ltPropBackgroundColor',
		'ltPropColor',
		'ltPropStyle',
		'ltPropSize',
		'ltPropAppearance'
	).on( 'init' ),
	actions: {
		check: function( event ) {
			var button = this.$node.querySelector( 'button' )
			if( button.disabled ) {
				event.stopPropagation();
				event.preventDefault();
			}
		}
	}
} );

/**
 * @syntax yielded
 * <lyte-button>
 *     <template is="registerYield" yield-name="text">
 *         click me
 *     </template>
 * </lyte-button>
 */

/**
 * @syntax staticBuilder
 * <lyte-button lt-prop-text="click me"></lyte-button>
 */
