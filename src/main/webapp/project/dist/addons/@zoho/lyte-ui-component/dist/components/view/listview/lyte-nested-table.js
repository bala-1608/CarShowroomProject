Lyte.Component.register("lyte-nested-table", {
_template:"<template tag-name=\"lyte-nested-table\"> <template is=\"if\" value=\"{{ltPropTitle}}\"><template case=\"true\" depth=\"1\"><table><thead> <tr><th colspan=\"{{ltPropHeader.length}}\"> <span class=\"lyteListviewNestedTableHanlder\"></span> <span class=\"lyteListviewNestedTableHeading\">{{ltPropTitle}}</span> </th> </tr></thead></table></template></template> <template is=\"if\" value=\"{{isGroup}}\"><template case=\"true\" depth=\"1\"><table><tbody> <tr is=\"for\" lyte-for=\"true\" items=\"{{renderContent}}\" item=\"item\" index=\"index\" depth=\"2\"></tr> </tbody></table></template><template case=\"false\" depth=\"1\"><table><tbody> <tr is=\"for\" lyte-for=\"true\" items=\"{{renderContent}}\" item=\"item\" index=\"index\" depth=\"2\"></tr> </tbody></table></template></template> <span class=\"lyteListviewIntersectionspan\"></span> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1,0]},{"type":"text","position":[0,1,0,3,0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"for","position":[0,1],"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"attr","position":[0,1,1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'--listlevel:'","item.level"]}}}},{"type":"registerYield","position":[0,1,1,1,1],"dynamicNodes":[]},{"type":"attr","position":[0,1,1,1,3]},{"type":"for","position":[0,1,1,1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0],"dynamicNodes":[]}]}},"default":{}}]},{"type":"componentDynamic","position":[0,1,1,1]}],"actualTemplate":"<template items=\"{{renderContent}}\" item=\"item\" index=\"index\" is=\"for\" depth=\"2\"><table><tbody><tr> <td colspan=\"{{ltPropHeader.length}}\" class=\"lyteListviewNestedGroupHolder\"> <div class=\"lyteListviewTableHolder\"> <lyte-nested-table intersection=\"{{intersection}}\" lt-prop-title=\"{{item.name}}\" lt-prop-header=\"{{ltPropHeader}}\" lt-prop-content=\"{{item.rows}}\" is-group=\"{{item.isGroup}}\" style=\"--listlevel:{{item.level}}\"> <template is=\"registerYield\" yield-name=\"yield\" from-parent=\"true\"></template> <template is=\"for\" items=\"{{headerData}}\" item=\"item\" index=\"index\"> <template is=\"if\" value=\"{{item.data.yield}}\"><template case=\"true\"><template is=\"registerYield\" yield-name=\"{{item.data.yield}}\" from-parent=\"true\"></template></template></template> </template> </lyte-nested-table> </div> </td> </tr></tbody></table></template>","tagName":"TBODY"}]},"false":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"for","position":[0,1],"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"for","position":[0,1],"dynamicNodes":[{"type":"attr","position":[0],"attr":{"style":{"name":"style","helperInfo":{"name":"listStyle","args":["cell.data","cell.data.width"]}}}},{"type":"attr","position":[0,1]},{"type":"insertYield","position":[0,1]}],"actualTemplate":"<template items=\"{{ltPropHeader}}\" item=\"cell\" index=\"cellIndex\" is=\"for\" depth=\"3\"><table><tbody><tr><td style=\"{{listStyle(cell.data,cell.data.width)}}\"> <lyte-yield yield-name=\"{{expHandlers(cell.data.yield,'||',&quot;yield&quot;)}}\" row-data=\"{{item.data}}\" cell-data=\"{{cell.data}}\" actual-index=\"{{index}}\" cell-index=\"{{cellIndex}}\" row-index=\"{{index}}\"></lyte-yield> </td></tr></tbody></table></template>","tagName":"TR"}],"actualTemplate":"<template items=\"{{renderContent}}\" item=\"item\" index=\"index\" is=\"for\" depth=\"2\"><table><tbody><tr> <td is=\"for\" lyte-for=\"true\" items=\"{{ltPropHeader}}\" item=\"cell\" index=\"cellIndex\" depth=\"3\"></td> </tr></tbody></table></template>","tagName":"TBODY"}]}},"default":{}}],
_observedAttributes :["ltPropHeader","ltPropContent","ltPropGroupTitle","isGroup","renderContent","topLevel","intersection"],

	data : function(){
		return {
			ltPropHeader : Lyte.attr( 'array', { default : [] } ),
			ltPropContent : Lyte.attr( 'array', { default : [] } ),
			ltPropGroupTitle : Lyte.attr( 'string', { default : "" } ),
			isGroup : Lyte.attr( 'boolean', { default : true } ),

			renderContent : Lyte.attr( 'array', { default : [] } ),
			topLevel : Lyte.attr( 'boolean', { default : false } ),
			intersection : Lyte.attr( "object" )
		}		
	},

	didConnect : function(){
		if( this.data.topLevel ){
			var scroll_elem = this.$node.querySelector( '.lyteListviewTableHolder' );
			this.setData( 'intersection', { obs : new IntersectionObserver( this.intersection.bind( this ), { threshold : [ 0.01 ], root : document } ) } );
		} else if( this.data.intersection ){
			this.add_to_inter();
		}
	},

	didDestroy : function(){
		var obs = this.data.intersection,
		span = $L( this.$node.children ).get( -1 );
		obs.obs.unobserve( span );

		this.data.intersection = void 0;
	},

	intersection : function( intersections ){
		intersections.forEach( function( item ){
			if( item.intersectionRatio ){
				var target = item.target,
				table = target.parentNode,
				root_bound = item.rootBounds,
				__this = table.component;

				if( !__this.add_more_data() ){
					__this.check_nested_end( root_bound, target );
				}
			}
		} ); 
	},

	check_nested_end : function( root_bound, target ){
		var __this = this;
		$L.fastdom.measure( function(){
			var bcr = target.getBoundingClientRect(),
			is_vert_outside = root_bound.top > bcr.bottom || root_bound.bottom < bcr.top,
			is_hori_outside = root_bound.left > bcr.right || root_bound.right < bcr.left;

			if( !( is_vert_outside || is_hori_outside ) ){
				$L.fastdom.mutate( function(){
					if( !__this.add_more_data() ){
						__this.check_nested_end( root_bound, target );
					}
				} )
			}
		} )
	},

	obs : function(){
		this.add_to_inter();
	}.observes( 'intersection' ),

	content_obs : function( arg ){
		this.setData( 'renderContent', [] );
		this.add_more_data();
	}.observes( 'ltPropContent' ),

	add_to_inter : function(){ 
		var  obs = this.data.intersection,
		span = $L( this.$node.children ).get( -1 );
		obs.obs.observe( span );
	},

	init : function(){
		// var td = this.$node.closest( '.lyteGroupHeadingData  ' )
		// this.add_more_data();
	},

	add_more_data : function(){
		var __data = this.data,
		renderContent = __data.renderContent,
		content = __data.ltPropContent || [],
		__len = renderContent.length;

		if( __len == content.length ){
			return true;
		}

		Lyte.arrayUtils( renderContent, 'push', content.slice( __len, __len + 10 ) );
	}
});