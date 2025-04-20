Lyte.Component.register( 'lyte-timeline', {
_template:"<template tag-name=\"lyte-timeline\"> </template>",
_dynamicNodes : [],
_observedAttributes :["ltPropAlignment"],

	data: function() {
		return {

			// left, right, alternate
			'ltPropAlignment': Lyte.attr( 'string', { 'default': 'left' } )
		}		
	}
} );

if( !_lyteUiUtils.registeredCustomElements[ 'lyte-timeline-item' ] ) {
	_lyteUiUtils.registeredCustomElements[ 'lyte-timeline-item' ] = true;

	/**
 	 * @customElement lyte-timeline-item
 	 */

 	Lyte.createCustomElement( "lyte-timeline-item", {
		static : {
			"observedAttributes": {
				/* disable async function */
				get : function() {
					return [];
				}
			}
		},
		"connectedCallback": function() {
			var separator = document.createElement( 'lyte-timeline-separator' ),
			label = this.querySelector( 'lyte-timeline-item-label' );

			this.insertBefore( separator, label.nextElementSibling );
		}
	} ); 



}
