/**
 * This component is used to show tooltip when its content exceeds
 * @component lyte-text
 * @version 2.2.0
 */

// ;( function(){

	function measureFont( style ){
		var str = [];
			
		[ 'fontStyle', 'fontVariant', 'fontWeight', 'fontSize', 'fontFamily' ].forEach( function( item ){
			var __style = style[ item ];
			__style && str.push( __style );
		});

		return str.join( ' ' );
	}

	function check4ellipsis( $node, to_value, force_allow, multiLine ){
		var __width = multiLine ? "Height" : "Width",
		offwidth = $node[ "offset" + __width ],
		scrollwidth = $node[ "scroll" + __width ],
		tooltip = scrollwidth > offwidth;

		if( scrollwidth == offwidth && force_allow && !multiLine ){
			var bcr_width = $node.getBoundingClientRect().width;

			if( offwidth - bcr_width <= 0.5 ){
				var compStyle = window.getComputedStyle( $node ),
				font = compStyle.font,
				ctx = document.createElement( "canvas" ).getContext( "2d" );

				ctx.font = font || measureFont( compStyle );
				var measured = ctx.measureText( to_value ).width;

				if( measured - bcr_width >= 0.015 ){
					tooltip = true;
				}
			}
		}

		return tooltip;
	}


	Lyte.Component.register("lyte-text", {
_template:"<template tag-name=\"lyte-text\" lt-prop-title=\"\" onmouseenter=\"{{action('mouse')}}\" __mouseover=\"{{action('over',event)}}\"><template is=\"if\" value=\"{{ltPropText}}\"><template case=\"true\"><template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield class=\"lyteTextYield\" yield-name=\"lyte-text\" lt-prop-value=\"{{ltPropValue}}\"></lyte-yield> </template><template case=\"false\"><template is=\"if\" value=\"{{ltPropTail}}\"><template case=\"true\"> <span class=\"lyteTextWrapper\" onmouseenter=\"{{action('tailmouse',this)}}\" lt-prop-tooltip-class=\"lyteTextTooltip\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\">{{dummyText}}</span> <span class=\"lyteTextTail\">{{tailText}}</span> </template><template case=\"false\">{{ltPropValue}}</template></template></template></template></template><template case=\"false\"> <template is=\"if\" value=\"{{ltPropTag}}\"><template case=\"true\"><div class=\"lyteTextTagWrapper\"> <template is=\"if\" value=\"{{ltPropTagYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"tag-yield\" tabindex=\"{{ltPropTabindex}}\" tag-array=\"{{renderArray}}\"> </lyte-yield> </template><template case=\"false\"> <template items=\"{{renderArray}}\" item=\"item\" index=\"index\" is=\"for\"><div data-index=\"{{index}}\" class=\"lyteTextTagElement {{item.class}} lyteTextEllipsisNode\" id=\"{{item.id}}\" style=\"{{item.style}}\" tabindex=\"{{ltPropTabindex}}\" lt-prop-tooltip-class=\"lyteTextTooltip\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\" __click=\"{{action('onClickAction',event,this)}}\">{{expHandlers(item.text,'||',item)}}</div></template> </template></template> </div></template><template case=\"false\"><span class=\"lyteTextWrapper\" onmouseenter=\"{{action('submouse',this)}}\" lt-prop-tooltip-class=\"lyteTextTooltip\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\">{{ltPropValue}}</span></template></template> <template is=\"if\" value=\"{{suffix}}\"><template case=\"true\"> <span class=\"lyteTextSuffix\" __click=\"{{action('over',event)}}\" __keydown=\"{{action('over',event)}}\" __focusout=\"{{action('focusout',event)}}\">{{unescape(suffix)}}</span> </template></template><template is=\"if\" value=\"{{renderHover}}\"><template case=\"true\"> <lyte-hovercard lt-prop=\"{{ltPropHovercard}}\" lt-prop-hide-on-click=\"{{ltPropShowHovercardOnClick}}\" lt-prop-origin-elem=\"{{originElem}}\" lt-prop-show=\"{{lbind(show)}}\" on-hovercard-before-hide=\"{{method('beforeHide')}}\" on-hovercard-show=\"{{method('addKeyBoardNavigator')}}\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content id=\"hovercard{{lyteUiGetTextId()}}\"> <div id=\"lyteDivForText{{lyteUiGetTextId()}}\" class=\"lytePopoverForText\" tabindex=\"0\"> <template lyte-if=\"{{ltPropTag}}\" items=\"{{hoverCardArray}}\" item=\"item\" index=\"index\" is=\"for\"> <div class=\"lyteTextHovercardList {{item.class}}\" tabindex=\"{{ltPropTabindex}}\" id=\"{{item.id}}\" style=\"{{item.style}}\" __click=\"{{action('onClickAction',event,this)}}\"> <template is=\"if\" value=\"{{ltPropHovercardYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"hover-item\" tabindex=\"0\" hover-item=\"{{item}}\"> </lyte-yield> </template><template case=\"false\"> {{expHandlers(item.text,'||',item)}} </template></template> </div> </template> <template lyte-else=\"\" lyte-for=\"{{hoverCardArray}} as item\"> <div class=\"lyteTextHovercardList\" tabindex=\"{{ltPropTabindex}}\" onclick=\"{{action('onClickAction', event, this)}}\"> <template lyte-if=\"{{ltPropHovercardYield}}\"> <lyte-yield yield-name=\"hover-item\" tabindex=\"0\" hover-item=\"{{item}}\"> </lyte-yield> </template> <template lyte-else=\"\"> {{item}} </template> </div> </template> </div> </lyte-hovercard-content> </template> </lyte-hovercard> </template></template></template></template><template is=\"if\" value=\"{{render}}\"><template case=\"true\"> <div class=\"lyteTextRenderDiv\"> <template is=\"for\" items=\"{{ltPropArray}}\" item=\"item\" index=\"index\"> <div class=\"lyteTextIndividual\"> <template is=\"if\" value=\"{{ltPropTag}}\"><template case=\"true\"><div class=\"lyteTextTagElement {{item.class}}\" id=\"{{item.id}}\" style=\"{{item.style}}\">{{expHandlers(item.text,'||',item)}}</div></template><template case=\"false\"> <span class=\"lyteTextWord\">{{item}}</span> <span class=\"lyteTextComma\">{{unescape(ltPropSeparator)}}</span> </template></template> </div> </template> </div> <div class=\"lyteTextSuffix\"> <span>{{unescape(ltPropSuffix)}}</span> </div> </template></template></template>",
_dynamicNodes : [{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"text","position":[3,0]}]},"false":{"dynamicNodes":[{"type":"text","position":[0]}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[0],"attr":{"style":{"name":"style","dynamicValue":"item.style"}}},{"type":"text","position":[0,0]}]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"text","position":[0,0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[4]},{"type":"if","position":[4],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"item.style"}}},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1]}]}},"default":{}}]},{"type":"attr","position":[1,1,3]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0],"attr":{"style":{"name":"style","dynamicValue":"item.style"}}},{"type":"text","position":[0,0]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"text","position":[3,0]}]}},"default":{}}]},{"type":"text","position":[3,1,0]}]}},"default":{}}],
_templateAttributes :{"type":"attr","position":[]},
_observedAttributes :["ltPropValue","ltPropShow","ltPropYield","ltPropText","ltPropArray","ltPropSuffix","ltPropHovercard","ltPropSeparator","ltPropWidth","ltPropMinCount","ltPropTooltipConfig","ltPropRerender","ltPropTail","ltPropFillAvailable","ltPropShowHovercardOnClick","ltPropHovercardKey","ltPropTag","ltPropAdditionalSpace","ltPropTabindex","ltPropMultiLine","ltPropClickable","ltPropHovercardYield","ltPropAddNavigator","ltPropTagYield","renderHover","lyteUnbound","hoverCardArray","render","show","originElem","suffix","dummyText","tailText","renderArray"],

		data : function(){
			var default_values = _lyteUiUtils.getDefault( 'lyte-text' );
	
			return {
				/**
				 * @componentProperty {string} ltPropValue=''
				 * @version 2.2.0
				 */
				ltPropValue : Lyte.attr( 'string', { default : '' } ),
				/**
				 * @componentProperty {boolean} ltPropShow=true
				 * @version 2.2.0
				 */
				ltPropShow : Lyte.attr( 'boolean', { default : default_values.show ==false ? false : true } ),
				/**
				 * @componentProperty {boolean} ltPropYield=false
				 * @version 2.2.20
				 */
				ltPropYield : Lyte.attr( 'boolean', { default : default_values.yield || false } ),
				/**
				 * @componentProperty {Boolean} ltPropText
				 * @version 3.50.0
				 */
				ltPropText : Lyte.attr( 'boolean', { default : default_values.text == false ? false : true } ),
				/**
				 * @componentProperty {array} ltPropArray
				 * @condition ltPropYield false
				 * @version 3.50.0
				 */
				ltPropArray : Lyte.attr( 'array' ),
				/**
				 * @componentProperty {string} ltPropSuffix=""
				 * @condition ltPropYield false
				 * @condition ltPropArray =!undefined
				 * @version 3.50.0
				 */
				ltPropSuffix : Lyte.attr( 'string', { default : default_values.suffix || "" } ),
				/**
				 * @componentProperty {string} ltPropHovercard='{}'
				 * @component lyte-hovercard
				 * @condition ltPropArray =!undefined
				 * @condition ltPropYield false
				 * @version 3.50.0
				 */
				ltPropHovercard : Lyte.attr( 'string', { default : default_values.hovercard || '{}' } ),
				/**
				 * @componentProperty {string} ltPropSeparator=', '
				 * @condition ltPropYield false
				 * @condition ltPropArray =!undefined
				 * @version 3.50.0
				 */
				ltPropSeparator : Lyte.attr( 'string', { default : default_values.separator || ", " } ),
				/**
				 * @componentProperty {number} ltPropWidth=0
				 * @condition ltPropYield false
				 * @condition ltPropArray =!undefined
				 * @version 3.50.0
				 */
				ltPropWidth : Lyte.attr( 'number', { default : default_values.width || 0 } ),
				/**
				 * @componentProperty {number} ltPropMinCount=0
				 * @condition ltPropYield false
				 * @condition ltPropArray =!undefined 
				 * @version 3.50.2
				 */
				ltPropMinCount : Lyte.attr( 'number', { default : default_values.minCount || 0 } ),
				/**
				 * @componentProperty {string} ltPropTooltipConfig='{}'
				 * @component lyte-tooltip ltPropTooltipConfig
				 * @condition ltPropShow true
				 * @version 3.52.0
				 */
				ltPropTooltipConfig : Lyte.attr( "string", { default : default_values.tooltipConfig || '{}' } ),
	
				ltPropRerender : Lyte.attr( 'boolean', { default : false } ),
	
				/**
				 * @componentProperty {string} ltPropTail
				 * @condition ltPropYield false
				 * @condition ltPropArray undefined
				 * @version 3.98.0
				 */
				
				ltPropTail : Lyte.attr( "string", { default : default_values.tail || "" } ),
	
				/**
				 * @componentProperty {boolean} ltPropFillAvailable=false
				 * @condition ltPropYield false
				 * @condition ltPropArray =!undefined
				 * @version 3.98.0
				 */
				ltPropFillAvailable : Lyte.attr( 'boolean', { default : default_values.fillAvailable || false } ),
	
				/**
				 * @componentPropery {boolean} ltPropShowHovercardOnClick=false
				 * @condition ltPropArray =!undefined
				 * @condition ltPropYield false
				 * @version 3.98.0
				 */
	
				ltPropShowHovercardOnClick : Lyte.attr( 'boolean', { default : default_values.showHovercardOnClick || false } ),
	
				/**
				 * @componentPropery {string} ltPropHovercardKey="Space"
				 * @condition ltPropArray =!undefined
				 * @condition ltPropYield false
				 * @version 3.98.0
				 */
	
				ltPropHovercardKey : Lyte.attr( 'string', { default : default_values.hovercardKey || " " } ),
				
				/**
				 * @componentProperty {boolean} ltPropTag=false
				 * @condition ltPropArray =!undefined
				 * @condition ltPropYield false
				 * @version 3.103.0
				 */
				ltPropTag : Lyte.attr( 'boolean', { default : default_values.hoverCardArray || false } ),
	
				/**
				 * @componentProperty {number} ltPropAdditionalSpace=0
				 * @condition ltPropArray =!undefined
				 * @condition ltPropYield false
				 * @version 3.103.0
				 */
				ltPropAdditionalSpace : Lyte.attr( 'number', { default : 0 } ),
	
				/**
				 * @componentProperty {string} ltPropTabindex="-1"
				 * @condition ltPropArray =!undefined
				 * @condition ltPropYield false
				 * @version 3.103.0
				 */
				ltPropTabindex : Lyte.attr( 'string', { default : "-1" } ),

				/**
				 * @componentProperty {boolean} ltPropMultiLine=false
				 * @condition ltPropArray undefined
				 * @condition ltPropYield false
				 * @version 3.105.0
				 */
				ltPropMultiLine: Lyte.attr('boolean', { default: default_values.multiLine || false }),

				/**
				 * @componentProperty {boolean} ltPropClickable = false
				 * @condition ltPropArray undefined
				 * @condition ltPropYield false
				 * @version 3.108.0
				 */
				ltPropClickable: Lyte.attr('boolean', { default: false }),

				/**
				 * @componentProperty {boolean} ltPropHovercardYield = false
				 * @condition ltPropArray undefined
				 * @condition ltPropYield false
				 * @version 3.108.0
				 */
				ltPropHovercardYield: Lyte.attr('boolean', { default: false }),
				/**
				 * @componentProperty {boolean} ltPropAddNavigator = true
				 * @condition ltPropArray undefined
				 * @condition ltPropYield false
				 * @version 3.108.0
				 */
				ltPropAddNavigator: Lyte.attr('boolean', { default: true }),

				ltPropTagYield: Lyte.attr('boolean', { default: false }),

				renderHover : Lyte.attr( 'boolean', { default : false } ),
				lyteUnbound : Lyte.attr( 'boolean', { default : false } ),
				hoverCardArray : Lyte.attr( 'array', { default : [] } ),
				render : Lyte.attr( 'boolean' ),
				show : Lyte.attr( 'boolean', { default : false } ),
				originElem : Lyte.attr( 'string', { default : "" } ),
				suffix : Lyte.attr( 'string', { default : "" } ),
				
				dummyText : Lyte.attr( 'string', { default : "" } ),
				tailText : Lyte.attr( 'string', { default : "" } ),
				renderArray : Lyte.attr( 'array', { default : [] } )
			}		
		},
	
		value_obs : function( arg ){
			var text = this.data.ltPropValue,
			tail = this.data.ltPropTail;
	
			if( tail ){
				var regx = new RegExp( tail ),
				match = text.match( regx )[ 0 ] || "";
	
				this.setData({
					dummyText : text.slice( 0, -match.length ),
					tailText : match
				});
	
				if( !arg ){
					this.$node.classList.add( "lyteTextNoSpace" );
				}
			}
	
		}.observes( 'ltPropValue' ).on( 'init' ),
	
		init : function(){
			var __data = this.data,
			arr = __data.ltPropArray;
	
			if( arr ){
				var $node = this.$node,
				hovercard = JSON.parse( __data.ltPropHovercard );
	
				__data.ltPropText = !arr;
	
				__data.originElem = hovercard.originElem || ( function(){
					var id = $node.id;
					if( !id ){
						id = $node.id = 'lyteText_' + parseInt( Math.random() * 10000 );
					}
					return "#" + id + ' .lyteTextSuffix>span';
				})();
			}
		},
	
		rerender_obs : function( arg ){
			if( arg.newValue && this.data.ltPropArray ){
				this.render_array();
				this.setData( arg.item, !1 );
			}
		}.observes( 'ltPropRerender' ),
	
		didCnt : function( arg ){
			if( this.data.ltPropArray ){
				this.render_array();
			} else if( !arg && this.data.ltPropMultiLine ){
				var $node = this.$node,
				__attr = 'lt-prop-tooltip-style',
				__style = $node.getAttribute( __attr );

				$node.classList.add( "lyteTextWithMultipleLineContent" );
				!__style && ( __style = "width:50%;" ) && $node.setAttribute( __attr, __style );
			}
		}.observes( 'ltPropSuffix', 'ltPropArray', 'ltPropArray.[]', 'ltPropWidth' ).on( 'didConnect' ),
	
		didDestroy : function(){
			$L.fastdom.clear( this.prev_fast );
		},
	
		render_array : function(){
			var __this = this,
			__data = __this.data,
			array = __data.ltPropArray,
			suffix = __data.ltPropSuffix,
			fastdom = $L.fastdom,
			__length = array.length,
			arr = [],
			separator = __data.ltPropSeparator,
			fns = 'prev_fast';
	
			__this.setData( 'render', true );
			
			fastdom.clear( __this[ fns ] );
	
			__this[ fns ] = fastdom.measure( function(){
	
				delete __this[ fns ];
	
				var $node = __this.$node,
				elem = $node.getElementsByClassName( 'lyteTextRenderDiv' )[ 0 ];
	
				if( !elem ){
					return;
				}
	
				var __child = elem.children,
				ns = 'getBoundingClientRect',
				__width = 'width',
				is_tag = __data.ltPropTag,
				additional_space = __data.ltPropAdditionalSpace,
				suffix_width = elem.nextElementSibling.children[ 0 ][ ns ]()[ __width ],
				act_width = __data.ltPropWidth || $node.offsetWidth,
				sum = 0,
				break_point,
				i = 0;
	
				for( ; i < __length; i++ ){
					var __div = __child[ i ],
					spans = __div.children,
					span_elem = spans[ 0 ],
					span_wid = span_elem[ ns ]()[ __width ],
					comma_wid;
	
					if( is_tag ){
						var __style = getComputedStyle( span_elem );
						span_wid += ( parseFloat( __style.marginInlineStart ) + parseFloat( __style.marginInlineEnd ) );
						comma_wid = 0;
						if( i + 1 != __length ){
							span_wid += additional_space;
						}
					} else {
						comma_wid = spans[ 1 ][ ns ]()[ __width ];
					}
	
					arr.push({
						width : span_wid,
						comma : comma_wid
					});
	
					sum += ( span_wid + comma_wid );
	
					if( sum > act_width ){
						break_point = true;
						act_width -= suffix_width;
						while( sum > act_width ){
							var __last = arr.pop();
							if( __last ){
								sum -= ( __last.width + __last.comma - additional_space );
								i--;
							} else {
								break;
							}
						}
						break;
					}
				}
	
				fastdom.mutate( function(){
					var str = '',
					h_arr = [],
					suffixText = "",
					to_render = [],
					min_count = __data.ltPropMinCount || 0;
	
					if( break_point ){
	
						var fn = "remove";
	
						if( __data.ltPropFillAvailable && !is_tag ){
							i++;
							fn = "add";
						} else if( /*i == -1*/ i < min_count ){
							i = /*Math.max(  */Math.min( __length, Math.max( i + 1, min_count ) ) - 1/*, 0 )*/;
							fn = "add";
						}
	
						$L( $node )[ fn + 'Class' ]( 'lyteTextNoSpace' );
	
						for( var k = 0; k < __length; k++ ){
							var __cur = array[ k ];
							if( k <= i ){
								if( is_tag ){
									to_render.push( __cur );
								} else {
									str += ( ( k ? separator : "" ) + __cur );
								}
							} else {
								h_arr.push( __cur );
							}
						}
	
						if( i + 1 != __length ){
							suffixText = ( suffix.replace( '{0}', ( __length - ++i ) ) );
						}
	
					} else {
						is_tag ? to_render = array : void 0;
						str = array.join( separator );
					}
	
					__this.setData({
						ltPropValue : str,
						suffix : suffixText,
						render : false,
						hoverCardArray : h_arr,
						renderHover : break_point && __data.ltPropShow,
						renderArray : to_render
					});
				});
			});
		},
	
		reset : function( __node, __value, frm_mid ){
			var $node = __node || this.$node,
			data = this.data;
	
			if( data.ltPropText || __node ){
				var value_to = "",
				tooltip = check4ellipsis( $node,  __value || data.ltPropValue, !data.ltPropYield, data.ltPropMultiLine );
	
				if( tooltip && data.ltPropShow ){
					value_to = __value || data.ltPropValue;
				}
				$node.setAttribute( 'lt-prop-title', frm_mid ? ( tooltip && data.ltPropShow ? data.ltPropValue : "" ) : value_to );
			} 
		},
	
		over : function( evt ){
			var __data = this.data,
			is_click = __data.ltPropShowHovercardOnClick;
	
			switch( evt.type ){
				case "click" : {
					if( !is_click ){
						return;
					}
				}
				break; 
				case "keydown" : {
					var allow = true;
					if( is_click ){
						var keys = ( __data.ltPropHovercardKey || "" ).split( /\,|\|/g );
						if( keys.indexOf( evt.key ) + 1 ){
							evt.preventDefault();	
							allow = false;
						}
					} 
					if( allow ) {
						return;
					}
				}
				break;
				default : {
					if( is_click ){
						return;
					}
				}
			}
	
			if( !evt.target.closest( '.lyteTextSuffix' ) ){
				return;
			}
	
			is_click ? window.requestAnimationFrame( function(){
				this.setData( 'show', __data.ltPropShow );
			}.bind( this ) ) : this.setData( 'show', __data.ltPropShow );
		},
	
		actions : {
			focusout : function(){
				var __data = this.data;
	
				if( __data.ltPropShowHovercardOnClick && __data.show ){
					this.setData( "show", false );
				}
			},
	
			mouse : function(){
				if( this.data.ltPropTail ){
					return;
				}
				this.reset();
			},
	
			over : function( evt ){
				this.data.ltPropArray && this.over( evt );
			},
	
			submouse : function( __this ){
				if( $L( this.$node ).hasClass( 'lyteTextNoSpace' ) /*&& data.ltPropMinCount*/ ){
					this.reset( __this, this.data.ltPropValue );
				}
			},
	
			tailmouse : function( __this ){
				this.reset( __this, this.data.dummyText, true );
			},
			onClickAction: function (event, divItem) {
				var clickable = this.getData('ltPropClickable');
				if (clickable) {
					if (this.getMethods('onOptionClick')) {
						this.executeMethod('onOptionClick', event, divItem, this);
					}
				}
			}
		},
	
		methods : {
			beforeHide : function( __node, evt ){
				if( this.data.ltPropShowHovercardOnClick && ( evt || {} ).type == "mouseleave" ){
					return false;
				}
				return true;
			},
			addKeyBoardNavigator: function () {
				var navigator = this.getData('ltPropAddNavigator');
				var clickable = this.getData('ltPropClickable');
				if (!navigator || !clickable) {
					return true;
				}
				var popover = this.$node.querySelector('lyte-popover');
				var hovercard = this.$node.querySelector('lyte-hovercard');
				var ele = popover.component.childComp.querySelector('.popoverWrapper');
				var hovercardContent = ele.querySelector('lyte-hovercard-content');
				var hovercardDiv = hovercardContent.querySelector('div');
				hovercardDiv.focus();
				var parentQuery = "#" + hovercardDiv.id;
				var childQ = '.lyteTextHovercardList';
				var children = hovercardDiv.querySelectorAll(childQ);
				// Adding Keyboard Navigator Plugin
				var obj = {
					scope: parentQuery,
					child: childQ,
					selectedClass: "selected",
					ifCycle: 'true',
					triggerClick: 'true',
					options: "['ArrowUp','ArrowDown','ArrowLeft','ArrowRight']"
				};
				// to add keyboard navigator here, data-tabindex property has to be set
				if (children.length) {
					$L(hovercardDiv).keyboardNavigator(obj);
				}
				return true;
			}
		}
	});
	
	window.addEventListener( "resize", function(){
		clearTimeout( window.__lyteTextTimeout );
		__lyteTextTimeout = setTimeout( function(){
			__lyteTextTimeout = void 0;
	
			var elems = document.getElementsByTagName( "lyte-text" ),
			len = elems.length;
	
			for( var i = 0; i < len; i++ ){
				var cur = elems[ i ];
	
				if( cur.ltProp( 'array' ) ){
					cur.component.render_array();
				}
			}
	
		}, 100 );
	}, true );

	/**
	 * Now ellipsis tooltip can be extended for non lyte-text elements also. Elements having the mentioned class will be considered as ellipsis element
	 */

	document[ "addEventListener" + ( _lyteUiUtils.isWidget ? "Global" : "" ) ]( "mouseover", function( evt ){
		var cls_name = 'lyteTextEllipsisNode',
		target = evt.target;
		
		if( $L( target ).hasClass( cls_name ) ){
			var __attr = "lt-prop-title",
			to_value = target.getAttribute( "data-lyte-text-tooltip" ) || target.textContent.trim();

			if( check4ellipsis( target, to_value, true, false ) ){
				target.setAttribute( __attr, to_value );
			} else {
				target.removeAttribute( __attr );
			}
		}
	}, true );
// } )();

/**
 * @syntax nonYielded
 * <lyte-text lt-prop-value = "some long text having higher width"></lyte-text>
 */

/**
 *  @syntax staticBuilder
 *  <lyte-text lt-prop-value = "Some long text to be displayed"></lyte-text>
 */

/**
 * @syntax yielded
 * @attribute ltPropYield=true
 * <lyte-text lt-prop-yield = true lt-prop-value = "some long text having higher width">
 * 	 <template is = "registerYield" yield-name = "lyte-text">
 *		some long text having higher width
 *	 </template>
 * </lyte-text>
 */

 /**
  * @syntax arrayOfText
  * @dollar 0 [ "Text1", "Text2", "Text3" ]
  * @dollar 1 "and <span class ='prefixClass'>{0} others</span>"
  *	<lyte-text lt-prop-array = '{{$0}}' lt-prop-suffix = '{{$1}}'></lyte-text>
  */