if( window.document == document ){
	window._lyteUiUtils = window._lyteUiUtils || { version : "3.109.2" };
} else {
	var _lyteUiUtils = { version : "3.109.2" };
}

_lyteUiUtils.cboxId = 0;
_lyteUiUtils.rbuttonId = 0;
_lyteUiUtils.calId = 0;

_lyteUiUtils.isWidget = window.document != document; // widget environment

_lyteUiUtils.appendLocation = 'last'; // alternate is first


_lyteUiUtils.setAppendLocation = function( appendLocation ) {
	_lyteUiUtils.appendLocation = appendLocation;
};

_lyteUiUtils.getCurrentTarget = function( event ) {
	var currentTarget = event.currentTarget;
	return currentTarget instanceof ShadowRoot ? ( event._origDoc || window.document || currentTarget ) : currentTarget;
};

_lyteUiUtils.querySelector = function( query ) {
	var isWidget = _lyteUiUtils.isWidget,
	querySelectorName = "querySelector" + ( isWidget ? "Global" : "" );

	return document[ querySelectorName ]( query );
}

_lyteUiUtils.querySelectorAll = function( query ) {
	var isWidget = _lyteUiUtils.isWidget,
	querySelectorName = "querySelectorAll" + ( isWidget ? "Global" : "" );

	return document[ querySelectorName ]( query );
}

_lyteUiUtils.addEventListenerGlobal = _lyteUiUtils.addGlobalEventListener = function( eventType, handler, phase ) {
	var isWidget = _lyteUiUtils.isWidget,
	listenerName = "addEventListener" + ( isWidget ? "Global" : "" );

	document[ listenerName ]( eventType, handler, phase );
};

_lyteUiUtils.removeEventListenerGlobal = _lyteUiUtils.removeGlobalEventListener = function( eventType, handler, phase ) {
	var isWidget = _lyteUiUtils.isWidget,
	listenerName = "removeEventListener" + ( isWidget ? "Global" : "" );

	document[ listenerName ]( eventType, handler, phase );
};

( function() {
	var defaultValueCache = {};

	_lyteUiUtils.resolveDefaultValue = function( componentName, propertyName, componentDefaultValue ) {
		var valueMap = defaultValueCache[ componentName ] || {};

		if( propertyName in valueMap ) {
			return clone( valueMap[ propertyName ] );
		}

		return componentDefaultValue;
	}

	_lyteUiUtils.registerDefaultValues = function( obj ) {
		for( var componentName in obj ) {
			var defaultValueMap = obj[ componentName ];

			defaultValueCache[ componentName ] = defaultValueMap;
		}
	}

	_lyteUiUtils.getDefault = function( name ){
		return defaultValueCache[ name ] || {};
	}

	var clone = function( org ) {
		var type = typeof org, result = {};

		if( type !== 'object' ) {
			return org;
		}

		if( Array.isArray( org ) ) {
			return org.slice( 0 );
		}

		// TODO: This can break. Need to deep clone.
		for( var key in org ) {
			result[ key ] = org[ key ];
		}

		return result;
	}

} )();

_lyteUiUtils.getVisibleDropdowns = function() {
	var dropboxes = document.querySelectorAll( 'lyte-drop-box:not(.lyteDropdownHidden)' ), res = [], dropdown;

	for( var i = 0; i < dropboxes.length; i++ ) {
		dropdown = dropboxes[ i ].origindd;

		if( dropdown ) {
			res.push( dropdown );
		}
	}

	return res;
}

_lyteUiUtils.getRecentModal = function(){
	if(_lyteUiUtils.popupStack && _lyteUiUtils.popupStack.modalStack){
		var modalElem = {}
		modalElem.modalElem = _lyteUiUtils.popupStack.modalStack[_lyteUiUtils.popupStack.modalStack.length - 1].parentElement
		modalElem.childElem = _lyteUiUtils.popupStack.modalStack[_lyteUiUtils.popupStack.modalStack.length - 1].childElement
		return modalElem
	}
	
	return {}
}

_lyteUiUtils.getRecentPopover = function(){
	if(_lyteUiUtils.popupStack && _lyteUiUtils.popupStack.popoverStack){
		var popoverElem = {}
		popoverElem.popoverElem = _lyteUiUtils.popupStack.popoverStack[_lyteUiUtils.popupStack.popoverStack.length - 1].parentElement
		popoverElem.childElem = _lyteUiUtils.popupStack.popoverStack[_lyteUiUtils.popupStack.popoverStack.length - 1].childElement
		return popoverElem
	}
	
	return {}
}

_lyteUiUtils.getLastPopup = function(popup){


	if(_lyteUiUtils){
		if(_lyteUiUtils.popupStack && _lyteUiUtils.popupStack.globalStack && _lyteUiUtils.popupStack.globalStack.length > 0){

			switch(popup){
				case "lyte-modal":
					if(_lyteUiUtils.popupStack.modalStack && _lyteUiUtils.popupStack.modalStack.length > 0){
						return _lyteUiUtils.popupStack.modalStack[_lyteUiUtils.popupStack.modalStack.length - 1]
					}
				break;
				case "lyte-popover":
					if(_lyteUiUtils.popupStack.popoverStack && _lyteUiUtils.popupStack.popoverStack.length > 0){
						return _lyteUiUtils.popupStack.popoverStack[_lyteUiUtils.popupStack.popoverStack.length - 1]
					}
				break;
				case "lyte-alert":
					if(_lyteUiUtils.popupStack.alertStack && _lyteUiUtils.popupStack.alertStack.length > 0){
						return _lyteUiUtils.popupStack.alertStack[_lyteUiUtils.popupStack.alertStack.length - 1]
					}
				break;
				case "lyte-messagebox":
					if(_lyteUiUtils.popupStack.messageboxStack && _lyteUiUtils.popupStack.messageboxStack.length > 0){
						return _lyteUiUtils.popupStack.messageboxStack[_lyteUiUtils.popupStack.messageboxStack.length - 1]
					}
				break;
				case "lyte-beta-modal":
					if(_lyteUiUtils.popupStack.betaModalStack && _lyteUiUtils.popupStack.betaModalStack.length > 0){
						return _lyteUiUtils.popupStack.betaModalStack[_lyteUiUtils.popupStack.betaModalStack.length - 1]
					}
				break;
				case "lyte-beta-popover":
					if(_lyteUiUtils.popupStack.betaPopoverStack && _lyteUiUtils.popupStack.betaPopoverStack.length > 0){
						return _lyteUiUtils.popupStack.betaPopoverStack[_lyteUiUtils.popupStack.betaPopoverStack.length - 1]
					}
				break;
				default:
					if(_lyteUiUtils.popupStack.globalStack && _lyteUiUtils.popupStack.globalStack.length > 0){
						return _lyteUiUtils.popupStack.globalStack[_lyteUiUtils.popupStack.globalStack.length - 1]
					}
				break;
			}

		} 
		return undefined;
	}

}

_lyteUiUtils.isDocument = function( node ) {
	return ( node instanceof Document || node instanceof ShadowRoot );
}


_lyteUiUtils.closeDropdowns = function() {
	var dropdowns = _lyteUiUtils.getVisibleDropdowns() || [];

	for( var i = 0; i < dropdowns.length; i++ ) {
		dropdowns[ i ].close();
	}
}

_lyteUiUtils.closeAllPopups = function(){
	if(_lyteUiUtils.popupStack){
		var popups = _lyteUiUtils.popupStack.globalStack
		if(popups && popups.length > 0){
			for(var i=popups.length-1;i>=0;i--){
				if(popups[i].parentElement){
					$L(popups[i].parentElement)[0].setData('ltPropShow' , false)
				}
			}
		}
	}
}



_lyteUiUtils.i18n = function( key, componentName, fallback ){
	var keyName = ( componentName ? ( "lyte." + componentName + "." + key ) : key ),
	__obj = window._lyteUiComponentsLocale || {},
	ret =  __obj[ keyName || "" ];

	return ret || fallback || key;
}

_lyteUiUtils.getRTL = function(){
	if( this.Rtl != undefined && this.Rtl != null ) {
		return this.Rtl;
	}
	return this.Rtl = ( getComputedStyle( document.body ).getPropertyValue( 'direction' ) == 'rtl' );
}

_lyteUiUtils.isIos = /ip(hone|ad|od)/i.test( navigator.userAgent ) || ( /macintosh/i.test( navigator.userAgent ) && 'ontouchend' in document );

_lyteUiUtils.isAndroid = /android/i.test( navigator.userAgent );

_lyteUiUtils.isMobile =  _lyteUiUtils.isIos || _lyteUiUtils.isAndroid;

_lyteUiUtils.ignorePopupPreventKeydown = false


_lyteUiUtils.escape = function( str ){

	// convert to string and call replace

	if( typeof str === "number" ) {
		str = str + '';
	}
	return ( str || '' ).replace(/(\\|\'|\"|\?)/g, '\\$1');
}

_lyteUiUtils.appendChild = function( outlet, component, obj ) {
	if( outlet !== document.body || _lyteUiUtils.appendLocation === 'last' ) {
		if(Lyte.Component && Lyte.Component.appendChild){
			return Lyte.Component.appendChild( outlet, component, obj ) || component;
		}
		else {
			return LyteComponent.appendChild( outlet, component, obj ) || component;
		}
	}
	else {
		var firstChild = outlet.children[ 0 ],
		elementToPrepend = component,
		parentNode = outlet;

		return _lyteUiUtils.insertBefore( firstChild, elementToPrepend, parentNode, obj ) || component;
	}
}

_lyteUiUtils.insertBefore = function( outlet, component ){
	if(Lyte.Component && Lyte.Component.insertBefore){
		return Lyte.Component.insertBefore( outlet, component );
	}
	else {
		return LyteComponent.insertBefore( outlet, component );
	}
}

_lyteUiUtils.dispatchEvent = function( eventType, component , event_argument){
	var option = {};
	option.bubbles = true;
	option.detail = event_argument || {};
	var customevent =  new CustomEvent(eventType,option);
	if(component){
		return component.dispatchEvent(customevent);
	}
}
_lyteUiUtils.insertAfter = function( outlet, component ){
	if(Lyte.Component && Lyte.Component.insertAfter){
		return Lyte.Component.insertAfter( outlet, component );
	}
	else {
		return LyteComponent.insertAfter( outlet, component );
	}
}
_lyteUiUtils.getScrollBarWidth = function( ){
	if( this._scrollwidth != undefined ){
		return this._scrollwidth;
	}
	var e = document.createElement("p");
    e.style.width = "100%";
    e.style.height = "200px";
    var t = document.createElement("div");
    t.style.position = "absolute";
    t.style.top = "0px"
    t.style.left = "0px"
    t.style.visibility = "hidden"
    t.style.width = "200px"
    t.style.height = "150px"
    t.style.overflow = "hidden"
    t.appendChild(e)
    document.body.appendChild(t);
    var a = e.offsetWidth;
    t.style.overflow = "scroll";
    var i = e.offsetWidth;
    a == i && (i = t.clientWidth)
    document.body.removeChild(t)
    this._scrollwidth = a - i;
    return this._scrollwidth;
}

_lyteUiUtils.replaceWith = function( outlet, component ){
	if(Lyte.Component && Lyte.Component.replaceWith){
		return Lyte.Component.replaceWith( outlet, component );
	}
	else {
		return LyteComponent.replaceWith( outlet, component );
	}
}

_lyteUiUtils.registeredCustomElements =  _lyteUiUtils.registeredCustomElements || {};

_lyteUiUtils.mergeObjects = function( oldObj, newObj ) {
	var result = {};

	for( var key in newObj ) {
		result[ key ] = newObj[ key ];
	}

	for( var key in oldObj ) {
		if( !( key in newObj ) ) {
			result[ key ] = false;
		}
	}

	return result;
}

_lyteUiUtils.setAttribute = function( element, newAria, oldAria ){
	var attributeList = _lyteUiUtils.mergeObjects( oldAria, newAria );

	for( var attribute in attributeList ) {
		if( attributeList[ attribute ] === false ) {
			element.removeAttribute( attribute )
		}
		else {
			element.setAttribute( attribute, attributeList[ attribute ] );
		}
	}
}

_lyteUiUtils.getZIndex = function(){
	var zIndex = 1060;
	var globalStack = _lyteUiUtils.popupStack.globalStack
	if(globalStack && globalStack.length>1){
		var prevZ = $L(globalStack[globalStack.length-2].childElement).find('.lytePopupZI')
		if(prevZ[0]){
			zIndex = parseInt(getComputedStyle(prevZ[0]).zIndex) + 2
		}
	}
	return zIndex;
}

_lyteUiUtils.updateAria = function( element, key, value, prop ){
	var tagName = element.tagName.toLowerCase(),
	mapping = {
		/* Given util function should be defined in component. All the modifications should be done inside defined util*/
		// input : "updateAria"
		"radiobutton-group": "updateAriaArray"
	},
	tag = tagName.replace( /^lyte\-/, '' ),
	mapped = mapping[ tag ];

	if( mapped ){

		element[ mapped ](  key, value );

	} else if( element.ltProp ) {
		var string_property = { // string property
			breadcrumb : "ariaValue",
			step : "ariaValue"
		},
		object_property = {
			/*Name of the property to be updated if its object. Default value will be ariaAttributes*/
		},
		string_value = string_property[ tag ];

		if( string_value ){
			return element.ltProp( string_value, key );
		}

		Lyte.objectUtils( element.ltProp(  prop || object_property[ tag ] || "ariaAttributes" ) || {}, value != void 0 ? 'add' : 'delete', key, value );
	} else {
		$L( element ).attr( key, value );
	}
}


_lyteUiUtils.getFirstFocusableElem = function(wrapper){
	var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), *[contenteditable]';
	var focusableItems;
	var parent = $L(wrapper)[0]
    focusableItems = $L(parent.querySelectorAll(focusableElementsString)).filter(function(ind, item){ return $L(item).is(':visible') && (item.tabIndex != -1) && !(item.disabled) });
	if(focusableItems && focusableItems.length > 1){
		var retElem;
		for(i=0;i<focusableItems.length;i++){
			var elemTop = focusableItems[i].offsetTop
			var elemLeft = focusableItems[i].offsetTop
			var elemHeight = focusableItems[i].offsetHeight
			var elemWidth = focusableItems[i].offsetWidth

			if(
				(elemTop > 0) && (elemTop + elemHeight < window.innerHeight) &&
				(elemLeft > 0) && (elemLeft + elemWidth < window.innerWidth)
			){
				retElem = focusableItems[i];
				i=focusableItems.length
			}
		}
		return retElem
	}
}

_lyteUiUtils.trapFocus = function( evt, node ){
    var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), *[contenteditable]';
    var parent = node || LytePopup.components[LytePopup.components.length-1].actualModalDiv;

    // get list of focusable items
    var focusableItems;
    focusableItems = $L(parent.querySelectorAll(focusableElementsString)).filter(function(ind, item){ return $L(item).is(':visible') && (item.tabIndex != -1) && !(item.disabled) });

    if(focusableItems.length == 0){
        return;
    }
    if(node){
        if(focusableItems.length > 1 && (focusableItems[0].classList.contains('lyteModalClose') || focusableItems[0].classList.contains('lytePopoverClose'))){
            focusableItems[1].focus();
        }
        else{
            focusableItems[0].focus();
        }
        return;
    }

    // get currently focused item
    var focusedItem = document.activeElement;

    if(!(parent.contains(focusedItem))){
        // LytePopup.initializeFocus(parent);

        //Initialize Focus
        if(parent.classList.contains('lyteModal') || parent.classList.contains('lytePopover')){
            _lyteUiUtils.trapFocus(null, parent);
        }
        else if(parent.classList.contains('alertPopup')){
            var buttons = parent._callee.ltProp('buttons');
            for(var i = 0; i<buttons.length; i++){
                if(buttons[i].type == "accept"){
                    parent.querySelectorAll('button')[i].focus();
                    break;;
                }
            }
        }
        return;
    }

	

    // get the number of focusable items
    var numberOfFocusableItems = focusableItems.length;

    // get the index of the currently focused item
    var focusedItemIndex;
    for(var i = 0; i < focusableItems.length; i++){
        if(focusableItems[i] == focusedItem){
            focusedItemIndex = i;
            break;
        }
    }

    if (evt.shiftKey) {
        //back tab
        // if focused on first item and user preses back-tab, go to the last focusable item
        if (focusedItemIndex == 0) {
            focusableItems.get(numberOfFocusableItems - 1).focus();
            evt.preventDefault();
        }

    } else {
        //forward tab
        // if focused on the last item and user preses tab, go to the first focusable item
        if (focusedItemIndex == numberOfFocusableItems - 1) {
            focusableItems.get(0).focus();
            evt.preventDefault();
        }
    }
}

_lyteUiUtils.getBrowser = function(){
	//Check if browser is IE11
    if (navigator.userAgent.search("rv:11") >= 0) {
        return "ie";
    }
    //Check if browser is Edge
    if (navigator.userAgent.search("Edge") >= 0) {
        return "edge";
    }
    //Check if browser is Chrome || Opera
    else if (navigator.userAgent.search("Chrome") >= 0) {
        return "chrome";
    }
    //Check if browser is Firefox
    else if (navigator.userAgent.search("Firefox") >= 0) {
        return "firefox";
    }
    //Check if browser is Safari
    else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
        return "safari";
    }
};

_lyteUiUtils.isNegativeScroll = function() {

    if( this._negativeScrollChrome != undefined ){
        return this._negativeScrollChrome;
    }

    var element =
    document.body.appendChild( $L( "<div style='position: absolute; left: 0; top: 0; overflow: hidden; width: 10px;height: 1px;'><div style='width: 20px; height: 1px;'></div></div>" ).get( 0 ) ),
    newChrome;

    element.scrollLeft = -5;
    newChrome = element.scrollLeft < 0;
    document.body.removeChild( element );
    this._negativeScrollChrome = newChrome;
    return newChrome;
}

_lyteUiUtils.getCorrectNumberCode = function( code ){
    if( code >= 96 && code <= 105 ){
        return code - 48;
    }
    return code;
}

_lyteUiUtils.capitalize = function( str ){
	return ( str || '' ).replace( /^./, function( match ){
		    return match.toUpperCase();
	});
}

_lyteUiUtils.lyteUiFileSize = function( curr, def, dgt ){
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], idx = 0;
	if(curr == 0) {
		return "0 Byte";
	}
	if( def ) {
		idx = Math.max( idx, sizes.indexOf( def ) );
	} else {
		idx = Math.floor( Math.log( curr ) / Math.log( 1000 ) )
	}
	if( idx == 0 && curr == 1 ){
		return "1 Byte";
	}
	return ( parseInt( curr / Math.pow( 1000 , idx ) * Math.pow( 10, dgt ) ) / Math.pow( 10, dgt ) ) + ' ' + sizes[ idx ];

};

// Accessibility
_lyteUiUtils.reduceAnimation = function(){
    $L('body').addClass('lyteUiCompReduceAnim');
}

_lyteUiUtils.enableAnimation = function(){
    $L('body').removeClass('lyteUiCompReduceAnim')
}

_lyteUiUtils.dateFilterValue = function( startValue , endValue , selected , format ) {
	let moment = $L.moment() , 
		inf = Infinity ,
		inputKeys = [],
		input = "" ,
		isValid = !!selected ,
		start = startValue, end = endValue,
		fns = {};

	switch( selected ){
		case 'is' : 
		case 'is_not' : {
			moment = $L.moment( new Date( startValue ) )
			input = "{{start}}";
			inputKeys.push( 'start' );
		}
		case 'today' : {
			fns.end = [ { name : "endOf", args : [ 'day' ] } ];
			fns.start = [ { name : "startOf", args : [ 'day' ] } ];
		}
		break;
		case 'till_yesterday' : {
			fns.end = [ 
				{ name : "startOf", args : [ 'day' ] },
				{ name : "subtract", args : [ 1, 'milliseconds' ] } 
			];
		}
		break;
		case 'yesterday' : {
			fns.end = [ 
				{ name : "startOf", args : [ 'day' ] },
				{ name : "subtract", args : [ 1, 'milliseconds' ] } 
			];

			fns.start = [ { name : "startOf", args : [ 'day' ] } ];

		}
		break;
		case 'tomorrow' : {
			fns.start = [ 
				{ name : "endOf", args : [ 'day' ] },
				{ name : "add", args : [ 1, 'milliseconds' ] } 
			];

			fns.end = [ { name : "endOf", args : [ 'day' ] } ];
		}
		break;
		case 'next_7_days' : {
			fns.start = [ 
				{ name : "endOf", args : [ 'day' ] },
				{ name : "add", args : [ 1, 'milliseconds' ] } 
			];

			fns.end = [ { name : "add", args : [ 7, 'day' ] } ];
		}
		break;
		case 'this_week' : {
			fns.start = [ 
				{ name : "startOf", args : [ 'week' ] }
			];
			
			fns.end = [ { name : "endOf", args : [ 'week' ] } ];
		}
		break;
		case 'this_month' : {
			fns.start = [ 
				{ name : "startOf", args : [ 'month' ] }
			];
			
			fns.end = [ { name : "endOf", args : [ 'month' ] } ];
		}
		break;
		case 'last_week' : {
			fns.end = [ 
				{ name : "startOf", args : [ 'week' ] },
				{ name : "subtract", args : [ 1, 'milliseconds' ] } 
			];
			
			fns.start = [ { name : "startOf", args : [ 'week' ] } ];
		}
		break;
		case 'last_month' : {
			fns.end = [ 
				{ name : "startOf", args : [ 'month' ] },
				{ name : "subtract", args : [ 1, 'milliseconds' ] } 
			];
			
			fns.start = [ { name : "startOf", args : [ 'month' ] } ];
		}
		break;
		case 'less_than' : {
			moment = $L.moment( new Date( startValue ) )
			fns.end = [ { name : "subtract", args : [ 1, 'milliseconds' ] } ];
			startValue = -inf;

			input = "< {{start}}";
			inputKeys.push( 'start' );
		}
		break;
		case 'greater_than' : {
			moment = $L.moment( new Date( startValue ) )
			fns.start = [ { name : "add", args : [ 1, 'seconds' ] } ];
			endValue = inf;
			input = "> {{start}}";
			inputKeys.push( 'start' );
		}
		break;
		case 'less_than_or_equal_to' :
		case 'less_than_or_equal' : {
			endValue = startValue;
			startValue = -inf;
			input = "<= {{start}}";
			inputKeys.push( 'start' );
		}
		break;
		case 'greater_than_or_equal_to' :
		case 'greater_than_or_equal' : {
			endValue = inf;
			input = " >= {{start}}";
			inputKeys.push( 'start' );
		}
		break;
		case 'between' : 
		case 'not_between' : {
			if( !( isValid = ( startValue != -inf && endValue != inf ) ) ){
				moment = $L.moment( new Date( 'invalid' ) );
			}
			input = "{{start}} < && {{end}} >";
			inputKeys.push( 'start', 'end' );
		}
		break;
	}

	if( !moment.validate() ){
		startValue = startValue == -inf ? -inf : startValue;
		endValue = endValue == inf ? inf : endValue;
		isValid = false;
	} else {
		for( var key in fns ){
			var __value = fns[ key ],
			__length = __value.length,
			final;

			for( var i = 0; i < __length; i++ ){
				var __cur = __value[ i ];
				 moment[ __cur.name ].apply( moment, __cur.args );
			}

			final = moment.format();

			if( key == 'start' ){
				startValue = final;
			} else {
				endValue = final;
			}

			// input = input.replace( '{{' + key + "}}", moment.format( format ) );
		}
	}

	( inputKeys || [] ).forEach( function( key ){
		input = input.replace( '{{' + key + "}}" , moment.format( key == 'start' ? start : end ) );
	} )

	return { start: startValue, end: endValue , isValid : isValid , input : input };

};

_lyteUiUtils.updateI18n = function( key, value ){
	_lyteUiComponentsLocale[ key ] = value;
};

_lyteUiUtils.lyteUiIsEmpty = function(input){

	let type = typeof input;

	switch (type){
		case 'string':
			return input === "";
		case 'number':
		case 'Bigint':
			return input == '';
		case 'object':
			if( Array.isArray( input ) ){
				return input.length === 0;
			}else{
				return Object.keys( input ).length === 0;
			}
		case 'undefined':
			return true;
	}

};

Lyte.Component.registerHelper("lyteUiReturnOnlyKey",function(item){
	var objectkeys = Object.keys(item)
	if(objectkeys)
		{
			return objectkeys[0]
		}
	else
		{
			return false
		}
});
Lyte.Component.registerHelper("lyteUiReturnOnlyValue",function(item){
	var objectkeys = Object.keys(item)
	return item[objectkeys[0]]
});

Lyte.Component.registerHelper( "lyteUiGetLinearIndex", function( obj, rowIndex, columnIndex ) {
	return obj[ rowIndex * 4 + columnIndex ];
} );

/**
 * Helper to return url when flag is true
 * @param {string} url - The url to return
 * @param {boolean} flag - True returns the URL , false returns an empty string
 *
 */

Lyte.Component.registerHelper( 'lyteUiSetURL', function( url, flag ) {

	if( flag ) {
		return url;
	} else {
		return '';
	}

} );


/**
 * Helper to check if an entire row in the calendar is empty or not
 * @param {object} vector - an array of objects where each object contains a particular date
 *
 */

Lyte.Component.registerHelper( 'lyteUiCheckEmpty', function( vector ) {
	return vector && vector[ 0 ].emptyBlock && vector[ 6 ].emptyBlock;
} );

Lyte.Component.registerHelper( 'lyteUiDisableCalendarNav', function( viewDate, dir ) {
	var viewYear = viewDate.getFullYear(),
	viewMonth = viewDate.getMonth(),
	isYY = this.component.isYYFormat(),
	startYear = this.component.getData( 'ltPropStartYear' ),
	endYear = this.component.getData( 'ltPropEndYear' ),
	isHavingTimezone = this.component.isHavingTimezone,
	currentYear = isHavingTimezone ? Number( $L.moment().format( 'YYYY' ) ) : new Date().getFullYear(),
	max, bounds;

	if( isYY ) {
		max = isHavingTimezone ? $L.moment() : { uL: 19, lL: 80 };
		bounds = { minYear: currentYear - max.lL, maxYear: currentYear + max.uL };
	}
	else {
		bounds = { minYear: startYear || 1900, maxYear: endYear || 2100 };
	}

	if( ( dir === 'previous' && viewYear === bounds.minYear && viewMonth === 0 ) || ( dir === 'next' && viewYear === bounds.maxYear && viewMonth === 11 ) ) {
		return 'lyteCalDisableNav';
	}
} );


Lyte.Component.registerHelper("lyteUiI18n",function(key,componentName){
	return _lyteUiUtils.i18n(key,componentName);
});

Lyte.Component.registerHelper( "lyteUiI18nWithArgs", function() {
	var keyName = arguments[ 0 ] || '',
	argumentsArray = Array.from( arguments ), val, dynamicArguments;

	argumentsArray.shift();

	dynamicArguments = argumentsArray;

	val = _lyteUiComponentsLocale[ keyName ] || '';

	dynamicArguments.forEach( function( argument, index ) {
		var i18nPlaceholder = '$' + index;

		val = val.replace( i18nPlaceholder, argument );
	} );

	return val;
} );

Lyte.Component.registerHelper("lyteUiOptGroupCheck", function(content){
		if(content.constructor == Object)
            {
              if(Object.keys(content).length == 1)
	              {
	              	var value = content[Object.keys(content)[0]]
	              	if(value.constructor == Object || value.constructor == Array)
	                  {
	                      return true
	                  }
	               }
            }
        return false
});
Lyte.Component.registerHelper("lyteUiCheckForType",function(item,ltPropUserValue,ltPropSystemValue,section){
	if(section){
		var count = 0;
		var tcount = 0;
		for(var key in item){
			tcount++;
			if(key == ltPropUserValue){
				count++;
			}
			if(key == ltPropSystemValue){
				count++;
			}
		}
		if(count == 2 || tcount != 1){
			return false;
		}
		else{
			return true
		}
	}
	else{
		if(typeof item == "object"){
			return true
		}
		else{
			return false
		}
	}
});
Lyte.Component.registerHelper("lyteListBoxIndex" , function(ind,parentInd){
// Created by suren to use in lyte-listbox
	if(parentInd || parentInd === 0){
		return parentInd +" "+ ind;
	}
	return ind;

});
Lyte.Component.registerHelper("lyteListBoxParentIndex" , function(th,data,name){
// Created by suren to use in lyte-listbox
	if(data[name]){
		return data[name];
	}
	return '';

});
Lyte.Component.registerHelper('lyteListBoxChildIndexId' , function(ind){
	return ('lyteLBLeftChildWrap_' + ind);
})

Lyte.Component.registerHelper('lyteListBoxRequiredClassHelper' , function(val , reqVal , minReq , type,side , allowSort){
	if(val[reqVal] && side === "left"){
		return 'lyteLBMandateItem';
	}
	var parStr = "lyteLBMandateParent"
	var childStr = "lyteLBMandateItem"
	if(!allowSort){
		parStr += " lyteListBoxRequiredParent"
		childStr += " lyteListBoxRequiredItem"
	}
	if(val[reqVal] && !minReq){
		if(type === 'par'){
			return parStr;
		} else {
			return childStr
		}
	} else {
		return ''
	}
});

Lyte.Component.registerHelper('lyteTThasChildHelper' , function(obj){
	if((!obj.children || obj.children.length < 1) && !obj.hasChild){
		return 'lyteTreeTableLeafNode'
	}
})

Lyte.Component.registerHelper('lyteTTIconHelper' , function(obj){
	if(obj){
		if(obj.children && obj.children.length > 0 && (obj.collapsed !== true)){
			return 'lyteTreeTableOpenedRow';
		} else {
			return 'lyteTreeTableClosedRow';
		}
	}
	return "";
})

Lyte.Component.registerHelper("lyteUiChildPadding", function(treeIcon) {

	if ( treeIcon === 'Arrow' ) {
		return "padding-left:20px;";
	} else if (treeIcon === 'Plus') {
		return "padding-left:25px;";
	} else {
		return "padding-left:27px;";
	}
});
Lyte.Component.registerHelper("lyteUiHaveChildren", function(treeData,key) {

	if ( treeData[key] && treeData[key].length > 0 ) {

		return true;
	}
	return false;
});
Lyte.Component.registerHelper("lyteUiIsObject", function(obj) {

	if ( Object.prototype.toString.call(obj) === "[object Object]" ) {
		return true;
	} else {
		return false;
	}
});
Lyte.Component.registerHelper("lyteUiIsArray", function(obj) {

	if ( Object.prototype.toString.call(obj) === "[object Array]") {
		return true;
	} else {
		return false;
	}
});
Lyte.Component.registerHelper('lyteUiGiveProper',function(full,val){
	var returnval = []
	for(var i=0;i<full.length;i++){
		if(full[i].menu == val){
			returnval.push(full[i])
		}
	}
	return returnval
});
Lyte.Component.registerHelper('lyteUiAddClassModal',function(className,show,drag){
	var resp = className;
	if(drag){
		resp += " draggable";
	}
	if(show){
		resp += " "+className+"Show";
	}
	return resp;
});


Lyte.Component.registerHelper('lyteUiAddShowClass',function(a,b,c){		//Used in alert and colorbox thumbnail
	if(a === true){
		return b+" "+c;
	}
	return b;
});


Lyte.Component.registerHelper('lyteUiCatwise',function(a,b){
    if(a==b[this.get('ltPropCategory')]){
        return true
    }
      else {
        return false
    }
});

Lyte.Component.registerHelper('lyteUiCheckClassForDate',function(val){
	if(!val){
		return false;
	}
	if(val.indexOf('lyteCalGray') != -1){
		return true
	}
	return false
});


Lyte.Component.registerHelper('lyteUiConcat',function(){	//Used in ProgressBar
	var resp = '';
	var argLength = arguments.length;
	for(var i=0;i<argLength;i++){
		if(arguments[i] != undefined){
			resp += arguments[i];
		}
	}
	return resp;
});


Lyte.Component.registerHelper('lyteUiConcatTypeClass',function(a,b,c){	//Used in Alert
	if(a!==""){
		return a+b+" "+c;
	}
	return c;
});

Lyte.Component.registerHelper('lyteUiGetContainerClass',function(setselect,classval){
	var toRet=''
	if(!classval){
		classval = ''
	}
    if(setselect==true){
    	toRet = 'lyteDropdownContainer tick-selection ' + classval
    }
    else{
    	toRet = 'lyteDropdownContainer ' + classval
    }
    return toRet

});

Lyte.Component.registerHelper('lyteUiGetDropdownClass',function(arg1){
	if(arg1 && arg1.toString().toLowerCase()  == "true"){
		return 'lyteDropdownElement1 lyteDropdown-disabled'
	}
	else{
		return 'lyteDropdownElement1'
	}
});


Lyte.Component.registerHelper('lyteUiIfEquals',function(a,b){	//Used in alert,messagebox,progressbar,rating
	return a === b;
});

Lyte.Component.registerHelper('lyteUiLabelCheck',function(a,b){
	if(a==b){
		return true;
	}
	else {
		return false
	}
});

Lyte.Component.registerHelper('lyteUiObjectCheck',function(a){
    if(typeof a==='string'){
        return true;
    }
    else {
        return false
    }
});

Lyte.Component.registerHelper('lyteUiReturnValueBy',function(content,key){
	if(key || key == 0){
		return content[key]
	}
	else{
		return content
	}
});
// Lyte.Component.registerHelper('lyteUiHeaderCheck',function(value){
// 	if(value)
// 		{
// 			return true;
// 		}
// 	else
// 		{
// 		return false;
// 		}
// });

Lyte.Component.registerHelper('lyteUiSetWH',function(radius){	//Used in progressbar
	return parseInt(radius) * 2;
});
Lyte.Component.registerHelper('lyteUiSetRadius',function(radius,stroke){	//Used in progressbar
	return parseInt(radius)-parseInt(stroke)/2;
});
Lyte.Component.registerHelper('lyteUiSetDashArray',function(radius,stroke){		//Used in progressbar
	var r = parseInt(radius)-parseInt(stroke)/2;
	return  2 * 3.14159 * r;
});
Lyte.Component.registerHelper('lyteUiSetOffset',function(radius,stroke,value){	//Used in progressbar
	var r = parseInt(radius)-parseInt(stroke)/2;
	var strokeDash =  2 * 3.14159 * r;
	return strokeDash * (1 - parseInt(value)/100);
});

Lyte.Component.registerHelper('lyteUiTextTransform',function(radius){	//Used in progressbar
	return 'translate(0,-'+parseInt(radius) * 2+'px)';
});
Lyte.Component.registerHelper('lyteUiMakeSortable',function(elementId){
	console.log(elementId);
	document.getElementById(elementId).classList.add('sortable');
	return true;
});
Lyte.Component.registerHelper("lyteUiCheckTabPosition",function(position){
	if(position.pos === "bottom"){
		return false;
	}
	else{
		return true;
	}
});

Lyte.Component.registerHelper('lyteUiGetValue',function(object, key){
	return object[key]
});


Lyte.Component.registerHelper('lyteUiIsEmptyArray',function(obj){	//Used in alert
     return obj.length == 0;
});

Lyte.Component.registerHelper("lyteUiRgbToHex",function(item){	//Used in colorpicker
	var hexValue = "#";
	if(/rgba/.test(item)){
		var valArray = item.substring(5,item.length-1).split(",");
		for(var i=0;i<3;i++){
			var val = parseInt(valArray[i]).toString(16).toUpperCase();
			if(val.length < 2){
				val = "0"+val;
			}
			hexValue += val;
		}
		var alpha = Math.round(parseFloat(valArray[3]) * 255);
		hexValue += (alpha + 0x10000).toString(16).substr(-2).toUpperCase();
	}
	else if(/rgb/.test(item)){
		var valArray = item.substring(4,item.length-1).split(",");
		for(var i=0;i<3;i++){
			var val = parseInt(valArray[i]).toString(16).toUpperCase();
			if(val.length < 2){
				val = "0"+val;
			}
			hexValue += val;
		}
	}
	return hexValue;
});

Lyte.Component.registerHelper("lyteUiCPInsertBreak",function(index){	//Used in colorpicker
	if((index + 1)%10 == 0){
		return true;
	}
	return false;
});
Lyte.Component.registerHelper("lyteUiCheckInRange",function(start,end,current,form){
	var comp = this.component;

	start = start || '';
	end = end || '';

	if(start === '' && end === ''){
		return true;
	}
	else if(start !== '' && end === ''){
		var startDate = comp.stringToDate( start, form )
		var currentDate = comp.stringToDate( current, form )
		if(currentDate >= startDate){
			return true
		}
	}
	else if(start !== '' && end !== ''){
		var startDate = comp.stringToDate( start, form )
		var endDate = comp.stringToDate( end, form )
		var currentDate = comp.stringToDate( current, form )
		if(currentDate >= startDate && currentDate <= endDate){
			return true
		}
	}
	else {
		var endDate = comp.stringToDate( end, form )
		var currentDate = comp.stringToDate( current, form )
		if(currentDate <= endDate){
			return true
		}
	}
	return false
});

Lyte.Component.registerHelper( "lyteUiDisabledDates", function( calendarDateObj, disabledDates ) {
	var curDate = calendarDateObj.val || '';

	disabledDates = disabledDates || [];

	return !!~disabledDates.indexOf( curDate ) || /lyteCalendarDisabledDate/.test( calendarDateObj.clsname );
} );

Lyte.Component.registerHelper("lyteUiIsEmptyObject",function(item){		//Used in dropdown,popover
	for(var key in item) {
        if(item.hasOwnProperty(key)){
            return false;
        }
    }
    return true;
});
Lyte.Component.registerHelper("lyteUiCheckDisabled",function(list,value){
	for(var i = 0; i<list.length; i++){
		if(value === list[i]){
			return "true";
		}
	}
    return "false";
});

Lyte.Component.registerHelper("lyteUiTreeLevelHelp",function(varr,index){
	if(varr !== ""){
		var level = varr + " " + index++;
		var arr = level.split(' ')
		return arr.length-1;
	}
	return 0;
});

Lyte.Component.registerHelper("lyteUiTreeLevelVariableHelp",function(varr,index,vari){
	var str = "--"+vari+":";
	var def = 0;
	if(varr !== ""){
		var level = varr + " " + index++;
		var arr = level.split(' ')
		return str + (arr.length-1).toString()
	}
	return (str+def.toString());
});

Lyte.Component.registerHelper("lyteUiTreeMaxLevelHelp" , function(varr , index , maxLevel){
	var level = varr + " " + index++;
	var arr = level.split(' ')
	if(arr.length <= maxLevel){
		return true;
	}
	return false;
})

Lyte.Component.registerHelper("lyteUiTreeMaxLevelUpdate" , function(varr , index , maxLevel , ignore){
	var level = varr + " " + index++;
	var arr = level.split(' ')
	if(arr.length == maxLevel && ignore){
		maxLevel+=35
		return maxLevel;
	}
	return maxLevel;
})

Lyte.Component.registerHelper("lyteUiTreeClassHelp",function(state,col,open,close,wrapopen,wrapclose){
	if((state === "open")||!col){
		return open+" "+wrapopen;
	} else {
		return close+" "+wrapclose;
	}
});

Lyte.Component.registerHelper("lyteTreeMaxChild" , function(varr,index,maxLevel){
	var level = varr + " " + index++;
	var arr = level.split(' ')
	if(arr.length-1 >= maxLevel){
		return "lyteTreeMaxedChild";
	}
	return '';
});

Lyte.Component.registerHelper("lyteTreeTypeHelp" , function(ltPropSortable , ltPropAllowExternalImport){
	if(ltPropSortable && ltPropAllowExternalImport){
		return "withExternal"
	} else if(ltPropSortable){
		return "onlyInternal"
	} else {
		return "nonSortable"
	}
});
Lyte.Component.registerHelper("lyteTreeClassStateHelp",function(item){
	if((!item.defaultState)||(item.defaultState === "open")){
		return "lyteTreeOpened";
	} else if(item.defaultState === "close"){
		return "lyteTreeClosed";
	}
});

Lyte.Component.registerHelper("lyteUiTreeIndexHelp",function(varr,index){
	return (varr + " " + index++).trim() ;
});
Lyte.Component.registerHelper("lyteTreeSubGroupHelper" , function(obj){
	if(obj.treeGroupHead){
		return "lyteTreeUnnamedSubgroup";
	}
	return ""
});
Lyte.Component.registerHelper("lyteUiTreeHasChildHelp",function(val,children){
	var col = val.collapsed
	if(!val[children] || val[children].length < 1){
		col = true;
	}
	if(val.hasChild && col){
		return 'lyteTreeHasChild'
	}
	return "";
});

Lyte.Component.registerHelper("lyteTreeAriaTabIndexHelp" , function(varr , index){
	var taIn = (varr + " " + index++).trim()
	if((taIn.length === 1) && (taIn === '0')){
		return "0";
	}
	return "-1";
})

Lyte.Component.registerHelper("lyteUiTreeChildHelp",function(val,className,child){

	if(((val[child] === undefined)||(val[child].length === 0)) && !val.hasChild){
		return className + " lyteTreeLastChild";
	}

	return '';

});

Lyte.Component.registerHelper("lyteTreeAriaRole",function(val,child){

	if(((val[child] === undefined)||(val[child].length === 0)) && !val.hasChild){
		return 'treeitem';
	}

	return 'group';

});

Lyte.Component.registerHelper("lyteTreeDataType" , function(elem){
	if(elem === null || elem === undefined){
		return 'keyword'
	}
	if(typeof elem === "boolean"){
		return 'boolean'
	}
	if(typeof elem === "object" && Array.isArray(elem)){
		return 'array'
	}
	if(elem && typeof elem ==='object'){
		if(elem.toString() ===  '[object Object]'){
			return typeof(elem)
		} else {
			return 'string'
		}
	}
	return typeof(elem);
});

Lyte.Component.registerHelper('lyteDataTreeKeywordParsing' , function(elem){
	if(elem === null){
		return 'null'
	}
	if(elem === undefined){
		return 'undefined'
	}
});

Lyte.Component.registerHelper("lyteTreeGetArrayLength" , function(val){
	return val.length
});

Lyte.Component.registerHelper("lyteHTreeTopVline" , function(index , data){
	if(index === 0){
		return 'lyteHTreeVerticalConnectorHidden';
	}
	return '';
});

Lyte.Component.registerHelper("lyteHTreeBottomVline" , function(index , data){
	if(index === data.length-1){
		return 'lyteHTreeVerticalConnectorHidden';
	}
	return '';
});


Lyte.Component.registerHelper( 'stringify', function( obj ){
	return JSON.stringify( obj );
});

Lyte.Component.registerHelper("lyteUiConcatAlertClass",function(val,Aclass){		//Used in alert
	return (val == "center" ? "lyteAlertCenterContent" : "") +" "+Aclass;
});

Lyte.Component.registerHelper( 'lyteUiSetIndexString', function( index, total ) {	//Used in colorbox
	return (index+1)+" of "+total;
} );

Lyte.Component.registerHelper("lyteUiRTL",function(){
	return _lyteUiUtils.getRTL();
});
// LyteComponent.registerHelper("lyteIsIos",function(){
// 	return _lyteUiUtils.isIos();
// });


Lyte.Component.registerHelper("lyteIsIos",function(){
	return _lyteUiUtils.isIos;
});

Lyte.Component.registerHelper("lyteIsAndroid",function(){
	return _lyteUiUtils.isAndroid;
});

Lyte.Component.registerHelper("lyteUiGetMonthOrYear",function(header, cond){
	header = header || '';

	if(cond == "M"){
		return header.split(" ")[0];
	}
	else{
		return header.split(" ")[1];
	}
});
Lyte.Component.registerHelper("lyteUiDisplayOrHide",function(color){
	if(color == "rgba(0, 0, 0, 0)"){
		return "lyteColorPicker__colorpan lyteColorPicker__hide";
	}
	else{
		return "lyteColorPicker__colorpan";
	}
});

Lyte.Component.registerHelper('lyteUiMsgBoxConcatClass',function(a,b,c,d){	//Used in messagebox
	if(b!==""){
		return a+" "+b+c+" "+d;
	}
	return a+" "+d;
});

Lyte.Component.registerHelper( 'lyteUiFileSize', _lyteUiUtils.lyteUiFileSize );

Lyte.Component.registerHelper('lyteUiAddClassRating',function(node,wrapper,readOnly){		//Used in rating\
	var resp = "";
	if(node.className != "{{dummy}}"){
		resp = node.className;
	}
	if(wrapper){
		resp += " " + wrapper;
	}
	if(readOnly){
		if(resp.indexOf("lyteRatingReadOnly") == -1){
			resp += " lyteRatingReadOnly";
		}
		// return "lyteRatingReadOnly";
	}
	else{
		if(resp.indexOf("lyteRatingReadOnly") != -1){
			resp = resp.replace("lyteRatingReadOnly","");
		}
	}
	return resp;
});


Lyte.Component.registerHelper('lyteUiGetArrayValueByIndex',function(array,index){	//Used in rating
	return array[index%array.length];
});
Lyte.Component.registerHelper('lyteUiIfEqualsAny',function(){	//Used in rating
	var value = arguments[0];
	for(i = 1; i < arguments.length; i++){
		if(value == arguments[i]){
			return true;
		}
	}
	return false;
});
Lyte.Component.registerHelper('lyteUiGetNextArrayValueByIndex',function(array,index){ //used in drawer
	return array[index+1];
});
Lyte.Component.registerHelper('lyteUiArrayLastIndex',function(array){ //used in drawer
 	return array.length-1;
});
Lyte.Component.registerHelper('lyteUiGetViewBox',function(type){ //used in rating
 	if(type === "heart"){
 		return "1.5 0.5 20 20";
 	}
 	if(type === "star"){
 		return "5.5 2.5 23 23";
 	}
 	return "0 0 21 21";
});
Lyte.Component.registerHelper('lyteUiGetFillOrStroke',function(type,color,stroke){ //used in rating
 	if(type === "heart" || type === "star"){
 		return "; fill:"+color+";";
 	}
 	if(type === "lineStar" || type === "lineHeart"){
 		return "; fill:transparent"+";"+"; stroke:"+ (stroke ? stroke : color) +";";
 	}
 	return "; stroke:"+ (stroke ? stroke : color) +";";
});
Lyte.Component.registerHelper('lyteUiCheckHalfRatingSvg',function(halfRating,precision){ //used in rating
 	if(halfRating && precision > 0 && precision < 1){
 		return true;
 	}
 	return false;
});
Lyte.Component.registerHelper('lyteUiProgressbarLabel',function(label,percentage,showPercentage){ //used in progressbar
 	if(label){
 		return label;
 	}
 	return (percentage + (showPercentage ? "%" : ""));
});

Lyte.Component.registerHelper('lyteUiGetStackValue',function(stack,index,prop){
	return index < stack.length && stack[index][prop];
});

Lyte.Component.registerHelper( 'lyteUiAttribute', function( value, aria ){
	if( aria ){
		return value ? value : false;
	}
	return false
} )

Lyte.Component.registerHelper('lyteUiAddPE', function(val){	//used to add pointer events none for no colors
	if(val === 'noColor'){
		return 'lyteColorPicker__pe'
	}
	return "";
});

Lyte.Component.registerHelper('lyteUiClockPairNumber', function(val) {
    if(val.length == 1) {
        val = (0 + val);
    }
    return val;
})

Lyte.Component.registerHelper( 'lyteUiDateRPHeaderClass', function( value ){
	if( value != "dropdown" ){
		return "lyteDateRPMonthHeader lyteDateRPStringHeader" ;
	}
	return "lyteDateRPMonthHeader";
} );

Lyte.Component.registerHelper( 'lyteUiSetAlphaLabel', function( value ){
	if( value ){
		return value ;
	}
	return _lyteUiUtils.i18n("Alpha");
} );
//lyte-layout
//lyte-layout-row
Lyte.Component.registerHelper( "lyteUiRowLength" , function( col_div ){
	var sum = this.getData('sum');
	col_div = parseInt(col_div ,10);
	this.setData('sum' , sum+col_div)
	return (col_div  && col_div < 12 && col_div > 0 && sum <= 12);

});

Lyte.Component.registerHelper( 'lyteUiImageFile', function( file ){
	if(file.src && file.fileType === "image" ) {
		return true;
	}
	return false;
});

Lyte.Component.registerHelper( 'lyteUiIsInArray', function( item, selected, sysValue ) {

	selected = selected || [];

	for( var i = 0; i < selected.length; i++ ) {
		if( selected[ i ][ sysValue ] === item[ sysValue ] ) {
			return true;
		}
	}

	return false;
} );

Lyte.Component.registerHelper('lyteUiCapitalizeName', function(name){
	return _lyteUiUtils.capitalize(name);
});

//scheduler Helper
Lyte.Component.registerHelper("lyteUiSchedulerBusinessHour",function( businessHour, curr_time ){
	if(!businessHour || !businessHour[0] || !businessHour[1]){
		return '';
	}
	var timeStart = new Date("01/01/2007 " + businessHour[0]);
	var timeEnd = new Date("01/01/2007 " + businessHour[1]);
	curr_time = new Date("01/01/2007 " + curr_time.dataset.time);
	var curr = ((curr_time.getHours() * 60) + curr_time.getMinutes());
	if( ( ( curr - ((timeStart.getHours() * 60) + timeStart.getMinutes())) >= 0 )&& ( (((timeEnd.getHours() * 60) + timeEnd.getMinutes()) - curr) >= 0 ) ){
		return 'lyteSchedulerBusinessHour';
	}
})

Lyte.Component.registerHelper("lyteUiSchedulerTimeFormat",function( time, min , timeformat,i18n,isforId ){
	var hour  = parseInt(time);
	var format = time.split(hour)[1];
	
	format = format.toUpperCase();
	min = min ? min : '00';
	if(timeformat){
		if(format.toLowerCase() == 'pm'){
			if(hour !== 12){
				hour += 12;
			}
		}else{
			if(hour == 12){
				hour = 0;
			}
		}
		hour = ('0' + hour).slice(-2);
		if(isforId){
			time = hour + min ;
		}else{
			time = hour + ':' + min ;
		}
	}else{
		hour = ('0' + hour).slice(-2);
		if(i18n){
			time = hour + ':' + min + ' ' + _lyteUiUtils.i18n( format );
		}else{
			if(isforId){
				time = hour + min + format;
			}else{
				time = hour + ':' + min + ' ' + format;
			}
			
		}
		
	}
	return time;
});

Lyte.Component.registerHelper("lyteUiSchedulerChecktime",function( time, event ){
	
	var format = this.getData('ltPropFormat');
	var startDate = $L.moment(event.start, format);
	var start_hour  = startDate.get('hours');
	var time_format = start_hour > 12 ? 'pm' : 'am';
	start_hour = time_format === 'am' ? start_hour+'am' : (start_hour-12)+'pm';
	if(start_hour == time){
		return true;
	}
	return false;
});

Lyte.Component.registerHelper("lyteUiSchedulerGetDate",function( date, event ){
	if(date){
		return date.format('DD-MM-YYYY');
	}
	
});
Lyte.Component.registerHelper("lyteUiSchedulerMonthshortForm",function( monthindex ){
	var month = ['Jan','Feb','Mar','Apr','short.may','June','July','Aug','Sep','Oct','Nov','Dec'];
	return _lyteUiUtils.i18n(month[monthindex]);
});
Lyte.Component.registerHelper('lyteTourShowIconHelper' , function(type){
	if(type === 'callout'){
		return true
	}
	return false
});

Lyte.Component.registerHelper("lyteUiGetChkboxGrpId", function () {
	if (_lyteUiUtils && _lyteUiUtils.chkboxGrp && _lyteUiUtils.chkboxGrp.ind) {
		return 'lyteCheckboxGroup' + _lyteUiUtils.chkboxGrp.ind;
	}
	else {
		return 'lyteCheckboxGroup0';
	}
});

Lyte.Component.registerHelper("lyteUiGetMultiDropNMoreId", function () {
	var dropButtonId = this.getData('multiDropId');
	return ('lyteNMoreTagFor' + dropButtonId)
});

Lyte.Component.registerHelper("lyteUiGetDropdownLabelId", function () {
	if (_lyteUiUtils && _lyteUiUtils.dropdown && _lyteUiUtils.dropdown.ind) {
		return 'lyteDropdownLabel' + _lyteUiUtils.dropdown.ind;
	}
	else {
		return 'lyteDropdownLabel0';
	}
});

Lyte.Component.registerHelper("lyteUiGetComboboxLabelId", function () {
	if (_lyteUiUtils && _lyteUiUtils.combobox && _lyteUiUtils.combobox.ind) {
		return 'lyteComboboxLabel' + _lyteUiUtils.combobox.ind;
	}
	else {
		return 'lyteComboboxLabel0';
	}
});
Lyte.Component.registerHelper("lyteUiGetTextId", function () {
	if (this.id) {
		var id = this.id;
		return id;
	}
});
if(!LytePopup){
    var LytePopup = {
        components:[],
        bodywrapperCount:0,
        onEscape : function(evt){
            evt = evt || window.event;
            var isEscape = false;
            var isTabPressed = false;
            var isEnter = false;
            var activeElement = document.activeElement;
            if ("key" in evt) {
                isEscape = (evt.key == "Escape" || evt.key == "Esc");
                isTabPressed = (evt.key == "Tab");
                isEnter = (evt.key == "Enter");
            } else {
                isEscape = (evt.keyCode == 27);
                isTabPressed = (evt.keyCode == 9);
                isEnter = (evt.keyCode == 13);
            }
            if (isEscape) {
                LytePopup.closePopup(undefined,true,evt);
            }
            if(isTabPressed && LytePopup.components.length > 0) {
                LytePopup.trapFocus(evt);
            }
            if(isEnter && activeElement && ( activeElement.classList.contains('alertClose') || activeElement.classList.contains('lyteModalClose') || activeElement.classList.contains('lytePopoverClose') )){
                activeElement.click();
            }
        },
        bindDocumentKeydown : function(){
            document.addEventListener('keydown',LytePopup.onEscape,true);
        },
        checkAndRemoveWrapper : function(){
            var elements = Array.from(document.querySelectorAll('.lyteAlertOpened')).concat(Array.from(document.querySelectorAll('.lyteModalOpened')), Array.from(document.querySelectorAll('.lytePopoverOpened')));
            if(elements.length == 0){
                document.body.classList.remove('bodyWrapper');
            }
            else{
                for(var i = 0; i < elements.length; i++){
                    if(elements[i].ltProp('freeze')){
                        return;
                    }
                }
                document.body.classList.remove('bodyWrapper');
            }
        },
        hideOrShowFreeze : function(cond, currComp, removedFromDom){
            var prevEleFreeze = '',val, currEleFreeze = '', prevElem = '', currElem = '';
            if(cond == "open" && LytePopup.components.length > 1){
                for(var i = LytePopup.components.length - 2 ; i >= 0; i--){
                    if(LytePopup.components[i].$node.tagName == "LYTE-MODAL"){
                        prevEleFreeze = 'lyte-modal-freeze';
                    }
                    else if(LytePopup.components[i].$node.tagName == "LYTE-POPOVER"){
                        prevEleFreeze = 'lyte-popover-freeze';
                    }
                    else{
                        prevEleFreeze = '.alertFreezeLayer';
                    }
                    if(currComp.$node.tagName == "LYTE-MODAL"){
                        currEleFreeze = 'lyte-modal-freeze';
                    }
                    else if(currComp.$node.tagName == "LYTE-POPOVER"){
                        currEleFreeze = 'lyte-popover-freeze';
                    }
                    else{
                        currEleFreeze = '.alertFreezeLayer';
                    }
                    prevElem = LytePopup.components[i].childComp.querySelector(prevEleFreeze);
                    currElem = currComp.childComp.querySelector(currEleFreeze);
                    val = currComp.getData('ltPropDimmer') && currComp.getData('ltPropDimmer').opacity ? currComp.getData('ltPropDimmer').opacity : "";
                    if(prevElem && currElem){
                        prevElem.style.transition = "none";
                        currElem.style.transition = "none";
                        prevElem.style.zIndex = 15;
                        prevElem.style.opacity = 0;
                        currElem.style.visibility = 'visible';
                        currElem.style.opacity = val;
                        setTimeout(LytePopup.removeTransition, 100, currElem, prevElem);
                        prevElem.style.zIndex = "";
                        currComp.addedFreezeDetails = true;
                        break;
                    }
                }
            }
            else if(cond == "close" && LytePopup.components.length > 1 && LytePopup.components[LytePopup.components.length-1] === currComp){
                for(var i = LytePopup.components.length - 2 ; i >= 0; i--){
                    if(LytePopup.components[i].$node.tagName == "LYTE-MODAL"){
                        prevEleFreeze = 'lyte-modal-freeze';
                    }
                    else if(LytePopup.components[i].$node.tagName == "LYTE-POPOVER"){
                        prevEleFreeze = 'lyte-popover-freeze';
                    }
                    else{
                        prevEleFreeze = '.alertFreezeLayer';
                    }
                    if(currComp.$node.tagName == "LYTE-MODAL"){
                        currEleFreeze = 'lyte-modal-freeze';
                    }
                    else if(currComp.$node.tagName == "LYTE-POPOVER"){
                        currEleFreeze = 'lyte-popover-freeze';
                    }
                    else{
                        currEleFreeze = '.alertFreezeLayer';
                    }
                    prevElem = LytePopup.components[i].childComp.querySelector(prevEleFreeze);
                    currElem = currComp.childComp.querySelector(currEleFreeze);
                    val = LytePopup.components[i].getData('ltPropDimmer') && LytePopup.components[i].getData('ltPropDimmer').opacity ? LytePopup.components[i].getData('ltPropDimmer').opacity : "";
                    if(prevElem && currElem){
                        currElem.style.transition = "none";
                        prevElem.style.transition = "none";
                        prevElem.style.zIndex = 15;
                        currElem.style.opacity = 0;
                        prevElem.style.visibility = "visible";
                        prevElem.style.opacity = val;
                        setTimeout(LytePopup.removeTransition, 100, currElem, prevElem);
                        prevElem.style.zIndex = '';
                        currElem.style.visibility = "";
                        break;
                    }
                    else{
                        if(prevElem && removedFromDom){
                            prevElem.style.transition = "none";
                            prevElem.style.zIndex = 15;
                            prevElem.style.visibility = "visible";
                            prevElem.style.opacity = val;
                            setTimeout(LytePopup.removeTransition, 100, currElem, prevElem);
                            prevElem.style.zIndex = '';
                            break;
                        }
                    }
                }
            }
        },
        removeTransition : function(currElem, prevElem){
            if(currElem){
                currElem.style.transition = "";
            }
            if(prevElem){
                prevElem.style.transition = "";
            }
        },
        addPopup : function(component) {
            LytePopup.closePopup();
            var compLengh = LytePopup.components.length;
            if(compLengh>0){
                var prevZIndex = 0;
                var prePopup = '', thisPopup = '';
                if(LytePopup.components[compLengh-1].$node.tagName == "LYTE-MODAL"){
                    prePopup = '.modalWrapper';
                }
                else if(LytePopup.components[compLengh-1].$node.tagName == "LYTE-POPOVER"){
                    prePopup = '.popoverWrapper';
                }
                else{
                    prePopup = '.alertWrapper';
                }

                if(component.$node.tagName == "LYTE-MODAL"){
                    thisPopup = '.modalWrapper';
                }
                else if(component.$node.tagName == "LYTE-POPOVER"){
                    thisPopup = '.popoverWrapper';
                }
                else{
                    thisPopup = '.alertWrapper';
                }
                var node = component.childComp.querySelector(thisPopup);
                var openedPopups = LytePopup.components
                var lastOpenedPopup;
                for(var i=openedPopups.length-1;i >=0;i--){
                    if(openedPopups[i].getData('ltPropIgnoreZindex')){
                        continue
                    }
                    lastOpenedPopup = openedPopups[i]
                    i=0;
                } 
                if(lastOpenedPopup){
                    prevZIndex = Number(document.defaultView.getComputedStyle(lastOpenedPopup.childComp.querySelector(prePopup),null).getPropertyValue('z-index'));
                } else {
                    prevZIndex = 1040
                }
                if(prevZIndex+2 > Number(document.defaultView.getComputedStyle(node,null).getPropertyValue('z-index'))){
                    node.style.zIndex = prevZIndex+2;
                }
                // component.childComp.querySelector(thisPopup).style.zIndex = prevZIndex+2;
                // if(component.$node.ltProp('freeze') && component.childComp.querySelector(thisFreeze)){
                //     component.childComp.querySelector(thisFreeze).style.zIndex = prevZIndex+1;
                // }
            }
            LytePopup.components[compLengh] = component;
            if(component.getData('ltPropFreeze') || component.$node.tagName == "LYTE-ALERT"){
                LytePopup.hideOrShowFreeze("open", component)
            }
        },
        closePopup : function(component,fromEscape,event){
            if(fromEscape){
                if(!_lyteUiUtils.ignorePopupPreventKeydown){
                    event.preventDefault()
                }
                var lastPop = LytePopup.components[LytePopup.components.length-1];
                if(lastPop){
                    lastPop.event = event
                    var dropdowns = $L(lastPop.actualModalDiv).find('lyte-dropdown')
                    var dontClose = false;
                    if(dropdowns[0]){
                        for(var i = 0;i<dropdowns.length;i++){
                            if(dropdowns[i]){
                                if(dropdowns[i].getData('ltPropIsOpen')){
                                    dontClose = true
                                }
                            }
                        }
                    }
                    if(lastPop && lastPop.$node.ltProp("closeOnEscape") && !dontClose){
                        lastPop.$node.setData('escClicked' , event);
                        lastPop.$node.ltProp("show",false);
                    }
                }
            } else {
                if(component){
                    var index = LytePopup.components.indexOf(component);
                    if(index > -1){
                        LytePopup.components.splice(index,1);
                    }
                }
                else{
                    for(var i=LytePopup.components.length-1;i>=0;i--){
                        if(LytePopup.components[i].$node && !LytePopup.components[i].$node.ltProp("allowMultiple")){
                            var comp = LytePopup.components[i];
                            // if(comp.$node.tagName == "LYTE-MODAL"){
                            //     LytePopup.components.splice(i,1);
                            // }
                            comp.$node.ltProp("show",false);
                        }
                    }
                }
            }
        },
        getScrollParent : function(node) {
            var isElement = node instanceof HTMLElement,
                overflowY = isElement && window.getComputedStyle(node).overflowY,
                isScrollable = overflowY !== 'visible' && overflowY !== 'hidden',
                scrollHeight = node && isScrollable ? node.scrollHeight : 0,
                clientHeight = node && isScrollable ? node.clientHeight : 0;

            if (!node) {
                return null;
            } else if (isScrollable && scrollHeight > clientHeight) {
                return node;
            }

            return LytePopup.getScrollParent(node.parentNode) || document.body;
        },
        focusFunction : function(node){
            if(node){
                node.focus()
                if(node.tagName === "INPUT" || node.tagName === "TEXTAREA"){
                    if(node.type !== "checkbox" && node.type !== "radio" && node.type!=='number'){
                        node.selectionStart = node.value.length
                        node.scrollLeft = node.scrollWidth - node.getBoundingClientRect().width
                    }
                }
            }
        },
        trapFocus : function( evt, node ){
            var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), *[contenteditable]';
            var parent = node || LytePopup.components[LytePopup.components.length-1].actualModalDiv;
            // get list of focusable items
            var focusableItems;
            focusableItems = $L(parent.querySelectorAll(focusableElementsString)).filter(function(ind, item){ return $L(item).is(':visible') && (item.tabIndex != -1) && !(item.disabled)});

            if(focusableItems.length == 0){
                return;
            }
            if(node){
                if(focusableItems.length > 1 && (focusableItems[0].classList.contains('lyteModalClose') || focusableItems[0].classList.contains('lytePopoverClose'))){
                    this.focusFunction(focusableItems[1])
                    // focusableItems[1].focus();
                }
                else{
                    this.focusFunction(focusableItems[0])
                    // focusableItems[0].focus();
                }
                return;
            }

            // get currently focused item
            var focusedItem = document.activeElement;
            var focusedParent;

            if(!(parent.contains(focusedItem))){
              focusedParent = $L(focusedItem).closest('lyte-drop-box')[0]
              if(focusedParent){
                focusedParent = focusedParent.origindd
              }
              if(!(parent.contains(focusedParent))){
                LytePopup.initializeFocus(parent);
                evt && evt.preventDefault();
                return;
              }
            }

            // get the number of focusable items
            var numberOfFocusableItems = focusableItems.length;

            // get the index of the currently focused item
            var focusedItemIndex;
            for(var i = 0; i < focusableItems.length; i++){
                if(focusableItems[i] == focusedItem){
                    focusedItemIndex = i;
                    break;
                }
            }

            if (evt.shiftKey) {
                //back tab
                // if focused on first item and user preses back-tab, go to the last focusable item
                if (focusedItemIndex == 0) {
                    this.focusFunction(focusableItems.get(numberOfFocusableItems - 1))
                    // focusableItems.get(numberOfFocusableItems - 1).focus();
                    evt.preventDefault();
                }

            } else {
                //forward tab
                // if focused on the last item and user preses tab, go to the first focusable item
                if (focusedItemIndex == numberOfFocusableItems - 1) {
                    this.focusFunction(focusableItems.get(0))
                    // focusableItems.get(0).focus();
                    evt.preventDefault();
                }
            }

        },
        initializeFocus : function(node){
            if(node.classList.contains('lyteModal') || node.classList.contains('lytePopover')){
                LytePopup.trapFocus(null, node);
            }
            else if(node.classList.contains('alertPopup')){
                var buttons = node._callee.ltProp('buttons');
                for(var i = 0; i<buttons.length; i++){
                    if(buttons[i].type == "accept"){
                        this.focusFunction(node.querySelectorAll('button')[i])
                        // node.querySelectorAll('button')[i].focus();
                        break;;
                    }
                }
            }
        },
        transitionEnd : function(evt){
            if(evt.target == this && LytePopup.components.length > 0){
                var comp = LytePopup.components[LytePopup.components.length-1];
                var element = comp.actualModalDiv;
                !(comp.getData('ltPropPreventFocus')) && LytePopup.initializeFocus(element);
                this.removeEventListener( 'transitionend', LytePopup.transitionEnd );
            }
        },
        bindTransitionEnd : function(node){
            node && node.addEventListener( 'transitionend', LytePopup.transitionEnd );
        }
    };
    LytePopup.bindDocumentKeydown();
};

var ratingNum = 0;

_lyteUiUtils.convert_diacritics = function( str ){
    var diacritics = [
        { value : 'A',  regex : /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g },
        { value : 'AA', regex : /[\uA732]/g },
        { value : 'AE', regex : /[\u00C6\u01FC\u01E2]/g },
        { value : 'AO', regex : /[\uA734]/g },
        { value : 'AU', regex : /[\uA736]/g },
        { value : 'AV', regex : /[\uA738\uA73A]/g },
        { value : 'AY', regex : /[\uA73C]/g },
        { value : 'B',  regex : /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g },
        { value : 'C',  regex : /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g },
        { value : 'D',  regex : /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g },
        { value : 'DZ', regex : /[\u01F1\u01C4]/g },
        { value : 'Dz', regex : /[\u01F2\u01C5]/g },
        { value : 'E',  regex : /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g },
        { value : 'F',  regex : /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g },
        { value : 'G',  regex : /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g },
        { value : 'H',  regex : /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g },
        { value : 'I',  regex : /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g },
        { value : 'J',  regex : /[\u004A\u24BF\uFF2A\u0134\u0248]/g },
        { value : 'K',  regex : /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g },
        { value : 'L',  regex : /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g },
        { value : 'LJ', regex : /[\u01C7]/g },
        { value : 'Lj', regex : /[\u01C8]/g },
        { value : 'M',  regex : /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g },
        { value : 'N',  regex : /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g },
        { value : 'NJ', regex : /[\u01CA]/g },
        { value : 'Nj', regex : /[\u01CB]/g },
        { value : 'O',  regex : /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g },
        { value : 'OI', regex : /[\u01A2]/g },
        { value : 'OO', regex : /[\uA74E]/g },
        { value : 'OU', regex : /[\u0222]/g },
        { value : 'P',  regex : /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g },
        { value : 'Q',  regex : /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g },
        { value : 'R',  regex : /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g },
        { value : 'S',  regex : /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g },
        { value : 'T',  regex : /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g },
        { value : 'TZ', regex : /[\uA728]/g },
        { value : 'U',  regex : /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g },
        { value : 'V',  regex : /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g },
        { value : 'VY', regex : /[\uA760]/g },
        { value : 'W',  regex : /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g },
        { value : 'X',  regex : /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g },
        { value : 'Y',  regex : /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g },
        { value : 'Z',  regex : /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g },
        { value : 'a',  regex : /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g },
        { value : 'aa', regex : /[\uA733]/g },
        { value : 'ae', regex : /[\u00E6\u01FD\u01E3]/g },
        { value : 'ao', regex : /[\uA735]/g },
        { value : 'au', regex : /[\uA737]/g },
        { value : 'av', regex : /[\uA739\uA73B]/g },
        { value : 'ay', regex : /[\uA73D]/g },
        { value : 'b',  regex : /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g },
        { value : 'c',  regex : /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g },
        { value : 'd',  regex : /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g },
        { value : 'dz', regex : /[\u01F3\u01C6]/g },
        { value : 'e',  regex : /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g },
        { value : 'f',  regex : /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g },
        { value : 'g',  regex : /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g },
        { value : 'h',  regex : /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g },
        { value : 'hv', regex : /[\u0195]/g },
        { value : 'i',  regex : /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g },
        { value : 'j',  regex : /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g },
        { value : 'k',  regex : /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g },
        { value : 'l',  regex : /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g },
        { value : 'lj', regex : /[\u01C9]/g },
        { value : 'm',  regex : /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g },
        { value : 'n',  regex : /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g },
        { value : 'nj', regex : /[\u01CC]/g },
        { value : 'o',  regex : /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g },
        { value : 'oi', regex : /[\u01A3]/g },
        { value : 'ou', regex : /[\u0223]/g },
        { value : 'oo', regex : /[\uA74F]/g },
        { value : 'p', regex : /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g },
        { value : 'q', regex : /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g },
        { value : 'r', regex : /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g },
        { value : 's', regex : /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g },
        { value : 't', regex : /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g },
        { value : 'tz', regex : /[\uA729]/g },
        { value : 'u', regex : /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g },
        { value : 'v', regex : /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g },
        { value : 'vy', regex : /[\uA761]/g },
        { value : 'w', regex : /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g },
        { value : 'x', regex : /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g },
        { value : 'y', regex : /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g }
  ];

  diacritics.forEach( function( item ){
    str = str.replace( item.regex, item.value );
  });

  return str;
}

/* 
 * only for global events ( Ex. scroll, resize, orientationchange, click )
 * dont bind mousedown, mousemove, mouseup, mouseover kind of events 
 */

;( function(){

	var order_of_callback = {
		click : [ "menu", "dropdown", "input", "datetimeinput", "popover", "modal" ],
		scroll : [ "modal", "popover", "menu", "dropdown", "input", "datetimeinput" ],
		resize : [ "modal", "popover", "menu", "dropdown", "input", "datetimeinput" ]
	};

	function get_new_order( callback_order, components ){
		for( var key in components ){
			if( callback_order.indexOf( key ) + 1 ){
				continue;
			}
			callback_order.push( key );
		}

		return callback_order;
	}

	function common_callback( evt ){
		var type = evt.type,
		dom = _lyteUiUtils.getCurrentTarget( evt ),
		components = dom._lyteUi_evts[ type ] || {},
		callback_order = get_new_order( order_of_callback[ type ] || [], components );

		callback_order.every( function( name ){
			var handlers = components[ name ] || [],
			ret;
			
			handlers.every( function( item ){
				
				try{
					ret = item.call( this, evt );
				} catch( e ){
					console.error( e );
				}

				return ret != false;
			});

			return ret != false;
		});
	}

	_lyteUiUtils.addEvent = function( dom, name, callback, ns ){

		var reg_evt = dom._lyteUi_evts;
		
		if( !reg_evt ){
			reg_evt = dom._lyteUi_evts = {};
		}

		var components = reg_evt[ name ];

		if( !components ){
			components = reg_evt[ name ] = {};
			dom.addEventListener( name, common_callback, true );
		}

		ns = ns || "others";

		var handlers = components[ ns ];

		if( !handlers ){
			handlers = components[ ns ] = [];
		}

		handlers.push( callback );
	}

	_lyteUiUtils.removeEvent = function( dom, name, callback, ns ){

		var reg_evt = dom._lyteUi_evts || {},
		components = reg_evt[ name ] || {},
		handlers = components[ ns || 'others' ] || [],
		index = handlers.indexOf( callback );

		if( index + 1 ){
			handlers.splice( index, 1 );
		}
	}

})();
;( function(){

	function __index( elem ){
		return Array.from( elem.parentNode.children ).indexOf( elem );
	}

	function __previous_cell( elem, count ){
		/*
		 * returns previous row
		 */
		var parentNode = 'parentNode',
		previousElementSibling = 'previousElementSibling',
		prev = elem[ parentNode ][ previousElementSibling ];
		if( prev ){
			return $L( prev.children ).get( -count );
		}

		/*
		 * returns from children of thead
		 */

		var thead = elem[ parentNode ][ parentNode ][ previousElementSibling ];
		if( thead ){
			return $L( thead.children ).eq( -1 ).children().get( -count );
		}
	}

	function __next_cell( elem, count ){
		/*
		 * returns next row
		 */
		var parentNode = 'parentNode',
		nextElementSibling = 'nextElementSibling',
		next = elem[ parentNode ][ nextElementSibling ];
		if( next ){
			return next.children[ count ];
		}

		/*
		 * returns from children of tbody
		 */

		var tbody = elem[ parentNode ][ parentNode ][ nextElementSibling ];
		if( tbody ){
			return $L( tbody.children ).eq( 0 ).children().get( count );
		}
	}

	function moveHori( cell, count ){
		var index = __index( cell ),
		new_index = index + count,
		__children = cell.parentNode.children,
		diff = new_index - index;

		if( diff == 0 ){
			return;
		}
 
		if( diff > 0 ){
			/*
			 * right, bottom, end navigation
			 */
			var __length = __children.length;
			if( __length > new_index ){
				return __children[ new_index ];
			} else {
				return __next_cell( cell, new_index - __length );
			}
		} else {
			/*
			 * left, top, home navigation
			 */
			 if( new_index < 0 ){
			 	return __previous_cell( cell, -new_index );
			 } else {
			 	return __children[ new_index ];
			 }
		}
	}

	function ret_grp( cell, count ){
		var parentNode = 'parentNode';
		return $L( cell[ parentNode ][ parentNode ][ parentNode ].children ).eq( count ).children().eq( count ).children().get( count );
	}

	function home( cell, ctrl ){
		if( ctrl ){
			return ret_grp( cell, 0 );
		}
		return moveHori( cell, - __index( cell ) );
	}

	function end( cell, ctrl ){
		if( ctrl ){
			return ret_grp( cell, -1 );
		}
		return moveHori( cell, cell.parentNode.children.length - __index( cell ) - 1 );
	}

	function moveVert( cell, count ){
		return moveHori( cell, count * cell.parentNode.children.length );
	}

	function keyEvent( evt ){
		var target = evt.target,
		origin = _lyteUiUtils.getCurrentTarget( evt );

		if( /^lyte\-t(d|h)$/i.test( target.tagName ) ||  /^lyte-exptable\-t(d|h)$/i.test( target.tagName ) ){
			var key = evt.key,
			 fn,
			 __count,
			 options = $L( origin ).data( 'tableNavigation' ),
			 before_nav = options.beforeNavigation,
			 after_nav = options.afterNavigation,
			 ret;

			 /*
			  * If target is in fixed part you can return original table cell here. navigation will happen in original table
			  */
			  
			 before_nav && ( ret = before_nav.call( origin, target, evt ) );

			 if( ret != void 0 ){
			 	if( ret == false ){
				  return;
				} else if( ret.nodeType == 1 ){
				  target = ret;
				}
			 }

			 switch( key ){
			 	case "ArrowLeft" : {
			 		fn = moveHori;
			 		__count = -1;
			 	}	
			 	break;
			 	case "ArrowRight" : {
			 		fn = moveHori;
			 		__count = 1;
			 	}	
			 	break;
			 	case 'ArrowDown' : {
			 		fn = moveVert;
			 		__count = 1;
			 	}
			 	break;
			 	case 'ArrowUp' : {
			 		fn = moveVert;
			 		__count = -1;
			 	}
			 	break;
			 	case "Home" : {
			 		fn = home;
			 		__count = evt.metaKey || evt.ctrlKey;
			 	}
			 	break;
			 	case 'End' : {
			 		fn = end;
			 		__count = evt.metaKey || evt.ctrlKey;
			 	}
			 	break;
			 }


			if( fn && ( ret = fn( target, __count ) ) ){
				/*
				 * If particular column is fixed you can return fixed column here. fixed column will be focused
				 */
				after_nav && ( ret = after_nav.call( origin, ret, evt ) || ret );

				ret.focus();
				evt.preventDefault();
			}
		}
	}

	_lyteUiUtils.tableNavigation = function( table, option ){
		var ns = "add",
		$node = $L( table ),
		data_ns = 'tableNavigation';

		if( option == "unbind" ){
			ns = "remove";
			$node.removeData( data_ns );
		}  else {
			$node.data( data_ns, option || {} );
		}

		table[ ns + 'EventListener' ]( 'keydown', keyEvent, true );
	}

})();
;( function(){
	var __utils = _lyteUiUtils;

	if( __utils ){

		var __nav = navigator,
		user_agent = __nav.userAgent,
		is_mac = /Macintosh/i.test( user_agent ),
		ctrl_key = ( is_mac ? 'meta' : 'ctrl' ) + 'Key',
		__timeout,
		keyup_tolerance = 100,
		keydown_interval = 20;

		function is_copy( evt ){
			var key = evt.key;

			if( /^(c|x)$/i.test( key ) ){
				return evt[ ctrl_key ];
			}
			return false;
		};

		function html2str( __str ){
			var elem = document.createElement( "div" ),
			str = "",
			fn = function( arr ){
			    arr.forEach( function( item ){
			        var tag = item.tagName,
			        nodes = Array.from( item.childNodes || [] );

			        if( nodes.length ){
			            fn( nodes ); 
			        }

			        if( /^(div|dt|dd|detail|summary|length|fieldset|footer|header|main|blockquote|p|caption-div|h[1-6]|hr|td|th|hr|img|video|br)$/i.test( tag ) ){
			            str += "\n";
			        } else if( !tag ){
			            str += item.nodeValue;
			        }
			    });
			};

			elem.innerHTML = __str;

			fn( Array.from( elem.childNodes ) )

			return str;
		};

		function copy2clip( html, cb, failure ){
		    try{
		        __nav.permissions.query( { name: "clipboard-write" } ).then( function( result ){
		            if( /^(granted|prompt)$/i.test( result.state ) ){

		                var clip_item = new ClipboardItem( ( function(){
		                    var obj = {},
		                    type1 = "text/html",
		                    type2 = "text/plain";

		                    obj[ type1 ] = new Blob( [ html ], { type : type1 } );
		                    obj[ type2 ] = new Blob( [ html2str( html ) ], { type : type2 } );

		                    return obj;
		                }() ) );

		                __nav.clipboard.write( [ clip_item ] ).then( function(){
		                    cb && cb.apply( this, arguments ); 
		                }, function(){
		                    failure && failure.apply( this, arguments );
		                });
		            } else {
		                // failure && failure.call( this, result );
						__utils.copyFrmEvt( html, void 0, void 0, cb, failure, true );
					}
		        }).catch( function( err ){
		        	__timeout = void 0;
		        	__utils.copyFrmEvt( html, void 0, void 0, cb, failure, true );
		        });
		    } catch( e ){
		        failure && failure.call( this, e );
		    }
		};

		__utils.html2str = html2str;

		__utils.copy2clip = copy2clip;

	 	__utils.copyFrmEvt = function( html, evt, wrapper, cb, failure, force ){

	 		if( evt && !is_copy( evt ) ){
	 			return;
	 		}

	 		if( __timeout != void 0 ){
	 			return;
	 		}

	 		__timeout = setTimeout( function(){
	 			__timeout = void 0;
	 		}, keydown_interval );

	 		if( force || _lyteUiUtils.getBrowser() == 'firefox' ){
	 			var elem = document.createElement( 'div' ),
	 			__style = elem.style;

		 		elem.contentEditable = true;

		 		wrapper = wrapper || document.body;

		 		elem.tabindex = 0;
		 		elem.innerHTML = html;

		 		__style.position = "absolute";
		 		__style.opacity = '0';
		 		__style.top = "0";
		 		__style.left = "0";

		 		wrapper.appendChild( elem );

		 		elem.focus({
					preventScroll : true
				});

		 		var __selection = window.getSelection(),
		 		new_range = document.createRange();

		 		new_range.selectNodeContents( elem );

		 		__selection.removeAllRanges();
		 		__selection.addRange( new_range );

		 		if( !evt ){
		 			document.execCommand( 'copy' );
		 		}

		 		setTimeout( function(){
		 			elem.remove();
		 			cb && cb();
		 		}, keyup_tolerance );
	 		} else {
	 			copy2clip( html, cb, failure );
	 		}

	 		return true;
		}
	}
})();
/**
 * This component is used to append a dom anywhere in the document
 * @component lyte-wormhole
 * @version 2.2.6
 * @methods onBeforeAppend,onAppend
 */


Lyte.Component.register("lyte-wormhole",{
_template:"<template tag-name=\"lyte-wormhole\"> <lyte-yield yield-name=\"lyte-content\"></lyte-yield> </template>",
_dynamicNodes : [{"type":"insertYield","position":[1]}],
_observedAttributes :["ltPropQuery","ltPropAppendOnCreation","ltPropAppend","ltPropShow","ltPropFocusOnClose","stackMap"],


	data : function(){
		return {
			/**
			 * @componentProperty {string} ltPropQuery
			 * @version 2.2.6
			 */
			'ltPropQuery' : Lyte.attr( 'string' ),

			'ltPropAppendOnCreation': Lyte.attr( 'boolean', { 'default': true } ),

			'ltPropAppend': Lyte.attr( 'boolean', { 'default': false } ),

			'ltPropShow' : Lyte.attr('boolean' , {	'default' : false }),

			'ltPropFocusOnClose':  Lyte.attr('boolean' , {	'default' : false }),

			'stackMap': Lyte.attr('object',{ default: {
				'LYTE-MODAL': 'modalStack',
				'LYTE-BETA-MODAL': 'betaModalStack',
				'LYTE-BETA-POPOVER': 'betaPopoverStack',
				'LYTE-POPOVER': 'popoverStack',
				'LYTE-MESSAGEBOX': 'messageboxStack',
				'LYTE-ALERT': 'alertStack',
				'LYTE-COLORBOX': 'colorboxStack'
			}})
		}
	},

	didDestroy: function() {
		var utilObj = this.createUtilObj(this);
		this.handleRemovalFromStack( utilObj );

		this.parent = null;
		if( _lyteUiUtils && 
				_lyteUiUtils.popupStack && 
					_lyteUiUtils.popupStack.globalStack && 
						_lyteUiUtils.popupStack.globalStack.length <= 0 ){
						
			_lyteUiUtils.popupStack=null;
		}
	},

	initFunc: function() {

		if(!_lyteUiUtils.popupStack){
            _lyteUiUtils.popupStack = {
				globalStack:[],
				modalStack:[],
				betaModalStack:[],
				betaPopoverStack:[],
				popoverStack:[],
				alertStack:[],
				messageboxStack:[],
				colorboxStack:[]
			};
        }

		var utilObj = this.createUtilObj(this);

		if(this.$node.getData('ltPropShow')){
			this.handleInsertionIntoStack( utilObj );
		}
		else {
			this.handleRemovalFromStack( utilObj );
		}

	}.observes( 'ltPropQuery','ltPropShow' ).on('init'),

	didConnectFunc :function(){
		var appendOnCreation = this.getData( 'ltPropAppendOnCreation' );

		if( !appendOnCreation ) {
			return ;
		}

		// this.appendContent();
		this.$node.ltProp( 'append', true );
	}.observes( 'ltPropQuery' ).on( 'didConnect' ),

	appendObserver: function() {
		var append = this.getData( 'ltPropAppend' );

		if( append ) {
			this.appendContent();
		}
		else {
			this.bringContentBack();
		}
	}.observes( 'ltPropAppend' ),

	appendContent: function() {
		var ret, 
		outlet = this.data.ltPropQuery ? document[  _lyteUiUtils.isWidget ? "querySelectorGlobal" : 'querySelector' ]( this.data.ltPropQuery ) : document.body;

		if( !outlet ) {
			console.error( 'Provide valid outlet to append' );
			return;
		}

		if( this.getMethods( 'onBeforeAppend' ) && this.executeMethod( 'onBeforeAppend', this.$node, outlet ) == false ) {
			return;
		}
		this.parent = this.$node.parentElement;
		_lyteUiUtils.appendChild( outlet, this.$node );
		this.appended = true;

		if( this.getMethods( 'onAppend' ) ) {
			this.executeMethod( 'onAppend', this.$node, outlet )
		}
	},

	bringContentBack: function() {
		_lyteUiUtils.appendChild( this.parent, this.$node );
	},

	createUtilObj: function( wormhole ){
		var utilObj={};

		if(wormhole.parent){
			utilObj.parentElement=wormhole.parent;
		} else {
			utilObj.parentElement=wormhole.$node.parentElement;
		}
		utilObj.focusedElement=document.activeElement;
		utilObj.childElement = wormhole.$node;

		return utilObj;
	},

	popUtilObj: function( utilObj, stackName, wormhole ){
		if( !utilObj || !_lyteUiUtils || !_lyteUiUtils.popupStack || !_lyteUiUtils.popupStack[stackName]){
			return;
		}

		if( _lyteUiUtils.popupStack[stackName].length>=1){
			_lyteUiUtils.popupStack[stackName].forEach(function(ele,ind){
					if(ele.parentElement==utilObj.parentElement){
						Lyte.arrayUtils( _lyteUiUtils.popupStack[stackName], 'removeAt' , ind , 1 );
						return;
					}
			}.bind(wormhole));
		}
	},

	handleInsertionIntoStack: function( utilObj ){

			if( !utilObj || !utilObj.parentElement || !utilObj.parentElement.tagName ){
				return;
			}
			var tagName = utilObj.parentElement.tagName;
			var stackName = this.getData('stackMap')[tagName];

			Lyte.arrayUtils( _lyteUiUtils.popupStack.globalStack, 'push', utilObj);

			if( stackName ){
				Lyte.arrayUtils( _lyteUiUtils.popupStack[stackName], 'push', utilObj);
			}
	},

	handleRemovalFromStack: function( utilObj ){

		if( !_lyteUiUtils || !_lyteUiUtils.popupStack || !_lyteUiUtils.popupStack.globalStack ){
			return;
		}
		if( !utilObj || !utilObj.parentElement || !utilObj.parentElement.tagName ){
			return;
		}

		var tagName = utilObj.parentElement.tagName;
		var stackName = this.getData('stackMap')[tagName];
		var lastActiveElement;

		if(_lyteUiUtils.popupStack.globalStack.length >= 1){

			if( stackName ){
				this.popUtilObj( utilObj, stackName, this );
			}

			var focusElement, changeFocus=true;
			_lyteUiUtils.popupStack.globalStack.forEach(function(ele,ind){
				if(ele.parentElement==utilObj.parentElement){
					if(ind<_lyteUiUtils.popupStack.globalStack.length-1){
						changeFocus=false;
						_lyteUiUtils.popupStack.globalStack[ind+1].focusedElement =	_lyteUiUtils.popupStack.globalStack[ind].focusedElement;
					}
					focusElement=Lyte.arrayUtils( _lyteUiUtils.popupStack.globalStack , 'removeAt' , ind , 1 );
					return;
				}
			}.bind(this));

			if(focusElement && focusElement[0]){
				lastActiveElement= focusElement[0].focusedElement;
			}
			if(changeFocus && lastActiveElement && this.getData('ltPropFocusOnClose')){
					lastActiveElement.focus();	
			}
		}
	}
});

/**
 * @syntax yielded
 * <lyte-wormhole>
 * 	  <template is = "registerYield" yield-name = "lyte-content">
 * 		 Some wormhole content
 *	  </template>
 * </lyte-wormhole>
 */