// Convert most functions to this.

/**
 * Renders a tour component
 * @component lyte-tour
 * @version 3.1.0
 * @utility startTour, closeStep, nextStep, prevStep, goToStep, changeHint, skipTour
 * @methods onStart, onEnd, onBeforeNext, onNext, onBeforePrev, onPrev, onHintChange, onStepClose
 * @dependencies lyte-shortcut
 */


 Lyte.Component.register("lyte-tour", {
_template:"<template tag-name=\"lyte-tour\"> <template is=\"if\" value=\"{{ltPropBindToBody}}\"><template case=\"true\"> <lyte-wormhole case=\"true\" on-before-append=\"{{method(&quot;beforeWormholeAppend&quot;)}}\"> <template is=\"registerYield\" yield-name=\"lyte-content\"> <div class=\"lyteTourWrap {{ltPropParentWrapperClass}}\"> <template is=\"if\" value=\"{{ltPropFreezeLayer}}\"><template case=\"true\"> <div class=\"lyteTourFreezeLayer\"></div> </template></template> <template is=\"if\" value=\"{{expHandlers(closeStepFlag,'!')}}\"><template case=\"true\"><div class=\"lyteTourContainer {{ltPropWrapperClass}}\"> <template is=\"if\" value=\"{{lyteTourShowIconHelper(ltPropType)}}\"><template case=\"true\"><div class=\"lyteTourLeftArrow lyteTourArrow lyteTourDefaultArrow\"></div></template></template> <template is=\"if\" value=\"{{lyteTourShowIconHelper(ltPropType)}}\"><template case=\"true\"><div class=\"lyteTourTopArrow lyteTourArrow\"></div></template></template> <template is=\"if\" value=\"{{lyteTourShowIconHelper(ltPropType)}}\"><template case=\"true\"><div class=\"lyteTourRightArrow lyteTourArrow\"></div></template></template> <template is=\"if\" value=\"{{lyteTourShowIconHelper(ltPropType)}}\"><template case=\"true\"><div class=\"lyteTourBottomArrow lyteTourArrow\"></div></template></template> </div></template></template> </div> </template> </lyte-wormhole> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[0,5]},{"type":"if","position":[0,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[0,7]},{"type":"if","position":[0,7],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropTakeTour","ltPropBindToBody","ltPropWrapperClass","ltPropParentWrapperClass","ltPropCreateDummy","ltPropHeight","ltPropWidth","ltPropArrowWidth","ltPropArrowHeight","ltPropArrowPosition","ltPropFixedArrow","ltPropType","ltPropMarginFromTarget","ltPropFreezeLayer","ltPropSmartPlacement","ltPropResumeHint","ltPropResumeStep","ltPropIgnoreTabKey","ltPropPreventOutsideFocus","isStepClosed","isResizeEventOn","windowDimension","tourHintIndex","hintElements","tourStepIndex","totalHints","totalSteps","localSteps","scrollTop","closeStepFlag","arrowDiagonalLength","tourRunning"],

	data : function(){
		return {
			'ltPropTakeTour' 			: Lyte.attr('boolean' , { default : false }),
			'ltPropBindToBody' 			: Lyte.attr("boolean" , { default : false }),

			'ltPropWrapperClass'        : Lyte.attr("string", { default: 'lyteTourWrapper' }),
			'ltPropParentWrapperClass'  : Lyte.attr("string", { default: 'lyteTourParentWrapper' }),
			'ltPropCreateDummy'			: Lyte.attr("boolean" , {default : false}),

			/**
			 * @componentProperty {number} ltPropHeight
			 * @default 500
			 */

			'ltPropHeight'				: Lyte.attr('number' , { default : 'auto' }),

			/**
 			 * @componentProperty {number} ltPropWidth
 			 * @default 500
 			 */

			'ltPropWidth'				: Lyte.attr('number' , { default : 'auto' }),
			'ltPropArrowWidth'			: Lyte.attr('number' , { default : 10 }),
			'ltPropArrowHeight'			: Lyte.attr('number' , { default : 10 }),
			'ltPropArrowPosition'		: Lyte.attr('string' , { default : 'start' }),
			'ltPropFixedArrow'			: Lyte.attr('boolean' , { default : false }),
			'ltPropType'				: Lyte.attr('string' , {default : 'callout'}),
			'ltPropMarginFromTarget'	: Lyte.attr('string' , {default : '10px'}),

				/**
			 * @componentProperty {boolean} ltPropFreezeLayer
			 * @default true
			 *
			 */

			'ltPropFreezeLayer'			: Lyte.attr('boolean' , { default : true }),
			'ltPropSmartPlacement'		: Lyte.attr('boolean' , { default : true }),
			'ltPropResumeHint'			: Lyte.attr('number' , {default : 0}),
			'ltPropResumeStep'			: Lyte.attr('number' , {default : 0}),
			'ltPropIgnoreTabKey'		: Lyte.attr('boolean' , {default : false}),
			'ltPropPreventOutsideFocus'	: Lyte.attr('boolean' , {default : false}),

			'isStepClosed'				: Lyte.attr('boolean' , {default : false}),
			'isResizeEventOn'			: Lyte.attr('boolean' , {default : false}),

			'windowDimension'			: Lyte.attr('object' , {default : {height : window.innerHeight,width : window.innerWidth}}),

			'tourHintIndex' 			: Lyte.attr('number' , { default : 0 }),
			'hintElements'				: Lyte.attr('array' , { default : [ ] }),
			'tourStepIndex'				: Lyte.attr('number' , { default : 0 }),
			'totalHints'				: Lyte.attr('number' , { default : 0 }),
			'totalSteps'				: Lyte.attr('number' , { default : 0 }),
			'localSteps'				: Lyte.attr('number' , { default : 0 }),
			'scrollTop'					: Lyte.attr('number' , { default : 0 }),
			'closeStepFlag'				: Lyte.attr('boolean' , { default : false }),
			'arrowDiagonalLength' 		: Lyte.attr('number' , {default : 0}),


			'tourRunning' : Lyte.attr('boolean' ,{
				default : false
			})
		}
	},

	setTourDimensions : function(){
	 $L(this.$node).find('.lyteTourContainer').css({
			'width' : this.getData('ltPropWidth'),
			'height' : this.getData('ltPropHeight')
	 });
	 if($L(this.$node).find('.lyteTourArrow')[0]){
		$L(this.$node).find('.lyteTourArrow').css({
			'width' : this.getData('ltPropArrowWidth'),
			'height' : this.getData('ltPropArrowHeight')
	 	});
	 }
	},

	startLyteTour : function(){

		this.setData('ltPropBindToBody' , true)

		this.setData('closeStepFlag' , false);

		// this.setData('isStepClosed' , false);

		this.setTourDimensions();
		var totalSteps = $L(this.$node).find('lyte-tour-step');
		var tourHints = $L(this.$node).find('lyte-tour-hint');
		var currentHint = tourHints[this.getData('tourHintIndex')];
		var tourSteps = $L(currentHint).find('lyte-tour-step');

		this.setTotals()		

		if(this.getData('ltPropResumeStep') && (this.getData('ltPropResumeStep') !== 0)){
			if(!(this.getData('ltPropResumeStep') > tourSteps.length)){
				this.setData('tourStepIndex' , this.getData('ltPropResumeStep'))
			}
		}
		var currentStep = tourSteps[this.getData('tourStepIndex')]
		if(currentHint.component.getData('ltPropBackgroundAnimation')){
			currentHint.component.setData('ltPropBindToBody' , true);
			currentHint.classList.add('activeAnimation');
		}

		var arrow = $L('.lyteTourArrow')[0];

		if(arrow){
			arrow.style.transform = "rotate(0deg)";
			this.setData('arrowDiagonalLength' , arrow.getBoundingClientRect().width);
			arrow.style.transform = "rotate(45deg)";
		}

		$L(currentStep).addClass('lyteTourCStep')

		if(!this.getData('ltPropIgnoreTabKey')){
			_lyteUiUtils.addEventListenerGlobal('keydown' , this.tabKeydownFun)
		}

		if(!this.getData('isResizeEventOn')){

			this.setData('isResizeEventOn' , true)

			window.addEventListener('resize' , this.$node.moveContainer)

		}

		currentStep.component.startLyteStep( currentStep );
		this.setData('tourRunning' , true)

	},
	setTotals : function(){
		var totalSteps = $L(this.$node).find('lyte-tour-step');
		var tourHints = $L(this.$node).find('lyte-tour-hint');

		var tourArr = [];

		// FIX: Make this forloop another function -  calculate variables inside that function and store hintElements in that function
		// Also there is probably an easier way to push values into a dummy array - .concat() for eg.
		for(var i=0;i < tourHints.length;i++){
			tourArr.push( tourHints[i].getData('ltPropLabel') )
		}
		this.setData('hintElements' , tourArr);
		// FIX: this can be a function - this.getCurrentHint()
		var currentHint = tourHints[this.getData('tourHintIndex')];
		var tourSteps = $L(currentHint).find('lyte-tour-step');

		// FIX: this can be a function - this.getCurrentStep()
		var currentStep = tourSteps[this.getData('tourStepIndex')]

		// FIX: these can be moved to a function - this.setTourParameters()
		this.setData('totalHints' , tourHints.length);


		if(this.getData('ltPropResumeHint') && (this.getData('ltPropResumeHint') !== 0)){
			if(!(this.getData('ltPropResumeHint') > tourHints.length)){
					this.setData('tourHintIndex' , this.getData('ltPropResumeHint'))
			}
		}
		var currentHint = tourHints[this.getData('tourHintIndex')];

		var tourSteps = $L(currentHint).find('lyte-tour-step');
		this.setData('localSteps' , tourSteps.length);
		this.setData('totalSteps' , totalSteps.length);
	},
	methods : {
		beforeWormholeAppend : function(arg){
            if(this.childComp){
                delete this.childComp;
            }
            if(this.actualTourDiv){
                delete this.actualTourDiv;
            }
            this.childComp = arg;
			this.actualTourDiv = this.childComp.querySelector(".lyteTourWrap");
        },
		onStart : function(){},
		onEnd : function(){},
		onStepClose : function(){},
		onBeforeNext : function(){},
		onNext : function(){},
		onBeforePrev : function(){},
		onPrev : function(){},
		onHintChange : function(){},
		onPause : function(){},
		onResume : function(){}
	},
	init : function(){

		// FIX: All of these can have single var definitions var _this = this, lyteTourComp = _this.$node....
		var _this = this , lyteTourComp = _this.$node , currentHint , currentStep , pastHint , nextStepEle , prevStepEle;

		shortcut.register('left' , this.leftKeyFunction.bind(this))
	  	shortcut.register('right' , this.rightKeyFunction.bind(this))
	  	shortcut.register('esc' , this.escKeyFunction.bind(this))

		 this.$node.startTour = function(){
			 _this.startLyteTour();
		 }

		this.$node.closeStep = function(){

			_this.executeMethod('onStepClose')

			// DOUBT: Why are we setting ltPropBindToBody false for the first step of the document?
			$L('lyte-tour-step')[0].component.setData('ltPropBindToBody' , false);

			setCurrentHint();
			setCurrentStep();
			closeStep();


			if(_this.getData('closeStepFlag')){
				_this.$node.skipTour();
			}

			_this.setData('closeStepFlag' , true);


		}

		this.$node.nextStep = function(){


			_this.setData('scrollTop' , document.documentElement.scrollTop);

			setCurrentHint();
			setCurrentStep();
			setNextStep();
			closeStep();
			_this.upDateIndex( '+' , 'tourStepIndex');

			// FIX: may need to be in if
			var returnedValue = currentStep.component.executeMethod('onBeforeChange');

			if($L('.lyteTourContainerNoTransition')){
				$L('.lyteTourContainerNoTransition').removeClass('lyteTourContainerNoTransition')
			}

			if( returnedValue ) {

				// Make this a function
				returnedValue.then(function(){

					// FIX: Add a check here to see if the component exists

					var beforeNext = _this.executeMethod('onBeforeNext' , currentStep , nextStepEle);

					if(beforeNext !== false){

						// FIX: this.isLastStep()
						if(_this.getData('localSteps')-1 < _this.getData('tourStepIndex')){

							// FIX: this.updateHintIndex( 1 );
							_this.updateHintIndex( '+' );
							_this.updateLocalSteps();
							pastHint = currentHint;
							// FIX: setCurrentHint
							setCurrentHint();
							_this.setData('tourStepIndex' , 0);

							// FIX: this.areHintsDone()
							if(_this.getData('totalHints')-1 < _this.getData('tourHintIndex')){

								_this.resetTourData();
								// FIX: May need an if
								_this.executeMethod('onEnd')
								return;

							}
						}

						// setCurrentStep
						setCurrentStep();

						// FIX: Should be pass currentStep?
						currentStep.component.startLyteStep( currentStep );

						// FIX: setPreviousStep
						setPrevStep();
						_this.executeMethod('onNext' , prevStepEle ,currentStep)
					}

				})

			}
			else {


				var beforeNext = _this.executeMethod('onBeforeNext' , currentStep , nextStepEle);

				if(beforeNext !== false){
					if(_this.getData('localSteps')-1 < _this.getData('tourStepIndex')){

						_this.updateHintIndex( '+' );
						_this.updateLocalSteps();
						pastHint = currentHint;
						setCurrentHint();
						_this.setData('tourStepIndex' , 0);
	
						if(_this.getData('totalHints')-1 < _this.getData('tourHintIndex')){
	
	
							if($L('.lyteTourDummyWrap').length){
								$L('.lyteTourDummyWrap')[0].remove();
							}
	
							if(this.getData('isResizeEventOn')){
	
								this.setData('isResizeEventOn' , false)
	
								window.removeEventListener('resize' , _this.$node.moveContainer)
	
							}
	
							_this.resetTourData();
							_this.executeMethod('onEnd')
							return;
	
						}
					}
					setCurrentStep();
					currentStep.component.startLyteStep( currentStep );
					setPrevStep();
					_this.executeMethod('onNext' , prevStepEle ,currentStep)
				}

			}

		}


		// FIX: This needs the same fixes as previous function
		this.$node.prevStep = function(){

			_this.setData('scrollTop' , document.documentElement.scrollTop);

			setCurrentHint();
			setCurrentStep();
			setPrevStep();
			closeStep();
			_this.updateStepIndex( '-' );

			var returnedValue = currentStep.component.executeMethod('onBeforeChange');

			if($L('.lyteTourContainerNoTransition')){
				$L('.lyteTourContainerNoTransition').removeClass('lyteTourContainerNoTransition')
			}

			if( returnedValue ) {



				_this.executeMethod('onBeforePrev' , currentStep , prevStepEle);

				if(_this.getData('tourStepIndex') < 0 ){

					_this.updateHintIndex( '-' );
					pastHint = currentHint;

					if(_this.getData('tourHintIndex') < 0 ){

						_this.setData('tourHintIndex' , 0 );
						_this.setData('tourStepIndex' , 0 );
						pastHint = "";

					} else {

						_this.updateLocalSteps();
						_this.setData('tourStepIndex' , _this.getData('localSteps') - 1 );

					}

				}
				setCurrentHint();
				setCurrentStep();
				currentStep.component.startLyteStep( currentStep );

				_this.executeMethod('onPrev' , nextStepEle , currentStep)

			} else {



				_this.executeMethod('onBeforePrev' , currentStep , prevStepEle);

				if(_this.getData('tourStepIndex') < 0 ){

					_this.updateHintIndex( '-' );
					pastHint = currentHint;

					if(_this.getData('tourHintIndex') < 0 ){

						_this.setData('tourHintIndex' , 0 );
						_this.setData('tourStepIndex' , 0 );
						pastHint = "";

					} else {

						_this.updateLocalSteps();
						_this.setData('tourStepIndex' , _this.getData('localSteps') - 1 );

					}

				}
				setCurrentHint();
				setCurrentStep();
				currentStep.component.startLyteStep( currentStep );

				_this.executeMethod('onPrev' , nextStepEle , currentStep)

			}

		}

		// FIX: Change function names of the functions below
		this.$node.goToStep = function(ind){

			if($L('.lyteTourContainerNoTransition')){
				$L('.lyteTourContainerNoTransition').removeClass('lyteTourContainerNoTransition')
			}

			setCurrentHint();
			setCurrentStep();
			closeStep();

			_this.setData('tourStepIndex' , ind );

			setCurrentHint();
			setCurrentStep();

			currentStep.component.startLyteStep( currentStep );

		}



		// FIX: Change function names of the functions below
		this.$node.changeHint = function(str){

			if($L('.lyteTourContainerNoTransition')){
				$L('.lyteTourContainerNoTransition').removeClass('lyteTourContainerNoTransition')
			}

			_this.setData('closeStepFlag' , false);

			var tourArr = _this.getData('hintElements');

			// setCurrentHint
			setCurrentHint();

			// setCurrentStep
			setCurrentStep();

			// removeCurrentStep
			closeStep();

			_this.setData('tourHintIndex' , tourArr.indexOf(str) );
			_this.setData('tourStepIndex' , 0 );
			pastHint = currentHint;

			// setCurrentHint
			setCurrentHint();

			// setCurrentStep
			setCurrentStep();
			currentStep.component.startLyteStep( currentStep );

			_this.executeMethod('onHintChange' , pastHint , currentHint)

			/* This code can be simplied i guess
				removeCurrentStep();
				pastHint = currentHint;
				this.setData()
				this.setData();
				setCurrentHint();
				setCurrentStep();
			*/

		}

		this.$node.skipTour = function(){

			// FIX: this.closeCurrentStep();


			if($L('.lyteTourActiveStep')[0]){
				$L('.lyteTourActiveStep')[0].classList.remove('lyteTourActiveStep')
			}
			if($L('.lyteTourActiveTarget')[0]){
				$L('.lyteTourActiveTarget')[0].classList.remove('lyteTourActiveTarget')
			}

			if($L('.lyteTourDummyWrap').length){
				$L('.lyteTourDummyWrap')[0].remove();
			}

			this.setData('tourRunning' , false)

			if(!currentStep || !currentStep.component){
				setCurrentHint();
				setCurrentStep();
			}
			currentStep.component.setData('ltPropBindToBody' , false)
			_this.resetTourData();

			_lyteUiUtils.removeEventListenerGlobal('keydown' , this.tabKeydownFun)

			// FIX: Should this be a global selector?
			if($L('.activeAnimation')[0]){
				$L('.activeAnimation')[0].component.setData('ltPropBindToBody' , false);
			}

			if(this.getData('isResizeEventOn')){

				this.setData('isResizeEventOn' , false)

				window.removeEventListener('resize' , _this.$node.moveContainer)

			}

			// This might need to be inside an if block
			_this.executeMethod('onEnd')

		}
		this.$node.pauseTour = function(){
			this.setData('tourRunning' , false)
			$L('.lyteTourWrap').addClass('lyteTourStepHidden')
			_lyteUiUtils.removeEventListenerGlobal('keydown' , this.tabKeydownFun)
			// This might need to be inside an if block
			if($L('.lyteTourContainer').find('lyte-wormhole')[0]){
				$L('.lyteTourContainer').find('lyte-wormhole')[0].remove()
			}
			_this.executeMethod('onPause')
		}
		this.$node.resumeTour = function(){
			this.component.setTotals();
			this.setData('tourRunning' , true)
			$L('.lyteTourStepHidden').removeClass('lyteTourStepHidden')
			setCurrentHint()
			setCurrentStep()
			closeStep();
			_this.executeMethod('onResume')
			_this.setData('tourHintIndex' , _this.getData('ltPropResumeHint'))
			_this.setData('tourStepIndex' , _this.getData('ltPropResumeStep'))
			setCurrentHint()
			setCurrentStep()
			this.setData('ltPropBindToBody' , true)
			currentStep.component.startLyteStep( currentStep );
		}

		this.$node.getTourStatus = function(){
			var obj = {}

			obj.activeTour = this.getData('tourRunning')
			obj.hintIndex = this.getData('tourHintIndex')
			obj.stepIndex = this.getData('tourStepIndex')
			return obj
		}

		function setCurrentHint(){
			currentHint = $L(lyteTourComp).find('lyte-tour-hint')[_this.getCurrentHintIndex()];

			// FIX: Change this to a function - this.animateCurrentHint()
			if(currentHint){
				if(currentHint.component.getData('ltPropBackgroundAnimation')){
					// DOUBT: Should this bindToBody be inside the if block
					currentHint.component.setData('ltPropBindToBody' , true);
					currentHint.classList.add('activeAnimation');
				}
			}

			// FIX: Change this to a function = this.animatePreviousHint()
			if(pastHint){
				if(pastHint.component.getData('ltPropBackgroundAnimation')){
					// DOUBT: should this ltPropBindToBody be inside the if block
					pastHint.component.setData('ltPropBindToBody' , false);
					pastHint.classList.remove('activeAnimation');
				}
			}
		}

		function setCurrentStep(){
			if($L('.lyteTourCStep')){
				$L('.lyteTourCStep').removeClass('lyteTourCStep')
			}
			currentStep = $L(currentHint).find('lyte-tour-step')[_this.getCurrentStepIndex()];

			$L(currentStep).addClass('lyteTourCStep')

		}

		function setNextStep(){


			// FIX: change this if condition to -> !this.isCurrentHintDone()
			// nextStepEle = this.getNextStep();
			if(_this.getCurrentStepIndex()+1 < $L(currentHint).find('lyte-tour-step').length){

				nextStepEle = $L(currentHint).find('lyte-tour-step')[_this.getCurrentStepIndex() + 1]

			} else {

				// FIX: This should be an else if( !this.areHintsDone() )
				// var hint = this.getNextHint();
				// nextStepEle = ..
				if(_this.getCurrentHintIndex()+1 < $L(lyteTourComp).find('lyte-tour-hint').length){

					var nextHint = $L(lyteTourComp).find('lyte-tour-hint')[_this.getCurrentHintIndex()+1]

					nextStepEle = $L(nextHint).find('lyte-tour-step')[0]

				}

			}

		}

		function setPrevStep(){

			// FIX: if( !this.atStartOfHint() )
			// prevStepEle = this.getPreviousStep()
			if(_this.getCurrentStepIndex()-1>=0){

				prevStepEle = $L(currentHint).find('lyte-tour-step')[_this.getCurrentStepIndex() - 1]

			} else {

				// FIX: if( !this.isFirstHint() )
				// prevHint = this.getPreviousHint();
				// prevStepEle = ...
				if(_this.getCurrentHintIndex() - 1 >= 0){

					var prevHint = $L(lyteTourComp).find('lyte-tour-hint')[_this.getCurrentHintIndex()-1]

					prevStepEle = $L(prevHint).find('lyte-tour-step')[$L(prevHint).find('lyte-tour-step').length-1]

				}

			}

		}

		function closeStep(){
			currentStep.component.setData('ltPropBindToBody' , false);
		}

		this.$node.moveContainer = function(){

			setCurrentHint();
			setCurrentStep();

			$L('.lyteTourContainer').addClass('lyteTourContainerNoTransition')

			currentStep.component.startLyteStep( currentStep );

		}

	},

	leftKeyFunction : function(){
		if((!(this.getData('closeStepFlag')))&&(this.getData('ltPropBindToBody'))){
			this.$node.prevStep();
	  	}
	},
	rightKeyFunction : function(){
		if((!(this.getData('closeStepFlag')))&&(this.getData('ltPropBindToBody'))){
			this.$node.nextStep();
	  	}
	},
	escKeyFunction : function(){
		if((this.getData('closeStepFlag'))&&(this.getData('ltPropBindToBody'))){
			this.$node.skipTour();
		}
	},

	// Tab keydown event function

	tabKeydownFun : function(event){
		if((event.keyCode === 9) && (event.keyCode === 16)){
			document.activeElement.blur()
			event.preventDefault();
		} else {
			$L(this).trigger('keydown')
		}
	},

	// FIX: v is number which is either 1 or -1 so add number to tourStepIndex
	updateStepIndex : function(v){
		if( v === '+' ){
			this.setData('tourStepIndex' , this.getData('tourStepIndex') + 1 );
		} else if( v === '-' ){
			this.setData('tourStepIndex' , this.getData('tourStepIndex') - 1 );
		}
	},

	// FIX: Same as previous function
	updateHintIndex : function(v){
		if( v === '+' ){
			this.setData('tourHintIndex' , this.getData('tourHintIndex') + 1 );
		} else if( v === '-' ){
			this.setData('tourHintIndex' , this.getData('tourHintIndex') - 1 );
		}
	},

	upDateIndex : function(v , str){
		if( v === '+' ){
			this.setData(str , this.getData(str) + 1 );
		} else if( v === '-' ){
			this.setData(str , this.getData(str) - 1 );
		}
	},

	updateLocalSteps : function(){

		var lyteTour = this.$node;
		var currentHint = $L(lyteTour).find('lyte-tour-hint')[this.getCurrentHintIndex()];
		var currentHintSteps = $L(currentHint).find('lyte-tour-step');

		this.setData('localSteps' , currentHintSteps.length);

	},

	getCurrentStepIndex : function(){
		return this.getData('tourStepIndex');
	},



	getCurrentHintIndex : function(){
		return this.getData('tourHintIndex');
	},

	resetTourData : function(){
		this.setData('totalHints' , 0);
		this.setData('totalSteps' , 0);
		this.setData('localSteps' , 0);
		this.setData('tourStepIndex' , 0);
		this.setData('tourHintIndex' , 0);
		this.setData('ltPropBindToBody' , false)
	},

	actions : {
		nextStep : function(){
			this.setData('tourStepIndex' , this.getData('tourStepIndex')+1);
			var currentHint = $L(this.$node).find('lyte-tour-hint')[this.getData('tourHintIndex')];
			var currentStep = $L(currentHint).find('lyte-tour-step')[this.getData('tourStepIndex')];


			currentStep.component.setData('ltPropBindToBody' , true);
			$L('.lyteTourStep')[0].style.display = "block";
		}
	},

	didDestroy : function(){
		if(this.childComp){
			this.childComp.remove();
			delete this.childComp;
		}
		if(this.actualTourDiv){
			delete this.actualTourDiv;
		}
		shortcut.unregister('left' , this.leftKeyFunction)
		shortcut.unregister('right' , this.rightKeyFunction)
		shortcut.unregister('esc' , this.escKeyFunction)
		_lyteUiUtils.removeEventListenerGlobal('keydown' , this.tabKeydownFun)
	}
});


if(!_lyteUiUtils.registeredCustomElements['lyte-tour-next-button']){

	_lyteUiUtils.registeredCustomElements['lyte-tour-next-button'] = true;

	Lyte.createCustomElement('lyte-tour-next-button' , {

		connectedCallback : function(){

			if(!this.lyteTourComponent){
				this.lyteTourComponent = $L(this).closest('lyte-tour')[0];
			}

		},

		constructor : function(){

			var _this = this
			$L(this).addClass('lyteTourButtons')

			this.addEventListener('click' , function(){


				if(_this.hasAttribute('lyte-tour-finish-button')){
					if($L('.lyteTourDummyWrap').length){
						$L('.lyteTourDummyWrap')[0].remove();
					}
				}
				_this.lyteTourComponent.nextStep();

			} . bind(this))

		},
		static : {"observedAttributes" : {}}

	})

}

if(!_lyteUiUtils.registeredCustomElements['lyte-tour-prev-button']){

	_lyteUiUtils.registeredCustomElements['lyte-tour-prev-button'] = true;

	Lyte.createCustomElement('lyte-tour-prev-button' , {

		connectedCallback : function(){

			if(!this.lyteTourComponent){
				this.lyteTourComponent = $L(this).closest('lyte-tour')[0];
			}

		},

		constructor : function(){

			var _this = this
			$L(this).addClass('lyteTourButtons')

			this.addEventListener('click' , function(){

				_this.lyteTourComponent.prevStep();

			} . bind(this))

		},
		static : {"observedAttributes" : {}}

	})

}

/**
 * Renders a tour hint component
 * @component lyte-tour-hint
 * @version 3.1.0
 */


 Lyte.Component.register("lyte-tour-hint", {
_template:"<template tag-name=\"lyte-tour-hint\"> <template is=\"if\" value=\"{{ltPropBindToBody}}\"><template case=\"true\"> <lyte-wormhole case=\"true\" on-before-append=\"{{method(&quot;beforeWormholeAppend&quot;)}}\"> <template is=\"registerYield\" yield-name=\"lyte-content\"> <div class=\"lyteTourTargetBackground {{ltPropTargetClass}}\"></div> </template> </lyte-wormhole> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropBackgroundAnimation","ltPropTargetClass","ltPropBindToBody","tourStepIndex","ltPropArrowPosition","ltPropAppendBackground","ltPropLabel"],

	data : function(){
		return {

			/**
			 * @componentProperty {boolean} ltPropBackgroundAnimation
			 * @default false
			 * 
			 */

			'ltPropBackgroundAnimation' : Lyte.attr('boolean' , { default : false }),
			'ltPropTargetClass': Lyte.attr("string", { default: 'lyteTourTarget' }),
			'ltPropBindToBody' : Lyte.attr('boolean' , { default : false }),
			'tourStepIndex'			: Lyte.attr('number' , { default : 0 }),
			'ltPropArrowPosition'	: Lyte.attr('string' , { default : 'start' }),
			'ltPropAppendBackground' : Lyte.attr('boolean' , { default : false }),
			'ltPropLabel'	: Lyte.attr('string' , { default : '' })
		}
	},
	init : function(){

	},
	methods:{
		beforeWormholeAppend : function(arg){
			if(this.childComp){
				delete this.childComp;
			}
			if(this.actualTourDiv){
				delete this.actualTourDiv;
			}
			this.childComp = arg;
			this.actualTourDiv = this.childComp.querySelector(".lyteTourWrap");
		}
	},
	didDestroy : function(){
		if(this.childComp){
			this.childComp.remove();
			delete this.childComp;
		}
		if(this.actualTourDiv){
			delete this.actualTourDiv;
		}
	}
});

/**
 * Renders a tour step component
 * @component lyte-tour-step
 * @version 3.1.0
 * @methods onChange, onBeforeChange
 */

 Lyte.Component.register("lyte-tour-step", {
_template:"<template tag-name=\"lyte-tour-step\"> <template is=\"if\" value=\"{{ltPropBindToBody}}\"><template case=\"true\"> <lyte-wormhole case=\"true\" lt-prop-query=\".lyteTourContainer\"> <template is=\"registerYield\" yield-name=\"lyte-content\"> <div class=\"lyteTourStep {{ltPropClass}}\"> <lyte-yield yield-name=\"lyteTourStep\"></lyte-yield> </div> </template> </lyte-wormhole> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1,1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropBindToBody","ltPropSelector","ltPropClickable","ltPropArrowPosition","ltPropPosition","ltPropScrollToView","ltPropClass","arrowPositionOnBox","initialArrowFlag"],

	data : function(){
		return {
			'ltPropBindToBody' 	: Lyte.attr('boolean' , { default : false }),

			/**
			 * @componentProperty {string} ltPropSelector
			 */

			'ltPropSelector'	 	: Lyte.attr('string'),
			'ltPropClickable'		: Lyte.attr('boolean' , { default : false }),

			/**
			 * @componentProperty {start | end |center} ltPropArrowPosition
			 * @default start
			 */

			'ltPropArrowPosition'	: Lyte.attr('string' , { default : 'start' }), //start , end , center

				/**
			 * @componentProperty {right|left|top|bottom} ltPropPosition
			 * @default right
			 * @options right , left , top , bottom
			 */

			'ltPropPosition'		: Lyte.attr('string' , { default : 'right' }), // right , left , top , bottom
			'ltPropScrollToView': Lyte.attr('boolean' , { default : false }),
			'ltPropClass' : Lyte.attr('string'),

			'arrowPositionOnBox': Lyte.attr('string' , {default : 'left'}),
			'initialArrowFlag'	: Lyte.attr('boolean' , {default : false})
		}
	},

	startLyteStep : function( th ){

		var _this = th.component;

		var parentTour = $L(this.$node).closest('lyte-tour')[0]

		// FIX: Maybe this is a different function
		if(this.getData('ltPropPosition') === 'right'){
			this.setData('arrowPositionOnBox' , 'left');
		} else if(this.getData('ltPropPosition') === 'left'){
			this.setData('arrowPositionOnBox' , 'right');
		} else if(this.getData('ltPropPosition') === 'top'){
			this.setData('arrowPositionOnBox' , 'bottom');
		} else if(this.getData('ltPropPosition') === 'bottom'){
			this.setData('arrowPositionOnBox' , 'top');
		}

		if($L('.lyteTourClipMask').length>0){
			$L('.lyteTourClipMask')[0].remove()
		}

		// FIX: Not sure if the th. should be there. Maybe it needs to be just this.
		if(th && th.getData('ltPropBindToBody')){
			th.setData('ltPropBindToBody' , false)
		}
		th.setData('ltPropBindToBody' , true);

		// FIX: Global selector - This and the next statement must be a single function -> this.changeActiveStep()
		if($L('.lyteTourActiveTarget').length){
			$L('.lyteTourActiveTarget').removeClass('lyteTourActiveTarget');
		}

		var currentStepTarget = $L(this.getData('ltPropSelector'))[0];

		var tar = $L(this.getData('ltPropSelector'))[0]
		var tarDim = tar.getBoundingClientRect();
		if(parentTour.getData('ltPropCreateDummy')){

			var body = $L('body')[0]
			var selectorString = this.getData('ltPropSelector').split(".")[1]

			var dummy;
			var dummyWrap;

			if($L(this.getData('ltPropSelector')+"Dummy").length){
				dummy = $L(this.getData('ltPropSelector')+"Dummy")[0]
				dummy.classList.add("lyteTourResetSpacing")
				dummy.classList.add("lyteTourActiveTarget")
				dummy.classList.add("lyteTourDummyTarget")
			} else {
				dummy = tar.cloneNode(true)
				dummy.classList.add("lyteTourResetSpacing")
				dummy.classList.add("lyteTourActiveTarget")
				dummy.classList.add("lyteTourDummyTarget")
				dummy.classList.add(selectorString+"Dummy")
			}

			var tourWrap = $L('.lyteTourWrap')[0]



			if($L('.lyteTourDummyWrap').length){
				dummyWrap = $L('.lyteTourDummyWrap')[0]
			} else {
				 dummyWrap = document.createElement('DIV')
				 dummyWrap.setAttribute("class" , "lyteTourDummyWrap");
			}



			var border = getComputedStyle(tar).borderRadius;

			dummy.style.position = "absolute";
			dummy.style.top = tarDim.top + "px";
			dummy.style.left = tarDim.left + "px";
			dummy.style.width = tarDim.width + "px";
			dummy.style.height = tarDim.height + "px";

			body.appendChild(dummyWrap)
			dummyWrap.appendChild(dummy)
			currentStepTarget = dummy;
		} else if(!parentTour.getData('ltPropCreateDummy')){
			var tourFreeze = $L('.lyteTourFreezeLayer')[0];
			if(tourFreeze){
				var clipDiv = document.createElement("DIV");
				$L(clipDiv).addClass('lyteTourClipMask')
				// $L(clipDiv).addClass($L(tar).attr('class'))
				clipDiv.style.position = "absolute";
				clipDiv.style.top = tarDim.top +"px"
				clipDiv.style.left = tarDim.left +"px"
				clipDiv.style.width = getComputedStyle(tar).width
				clipDiv.style.height = getComputedStyle(tar).height
				clipDiv.style.borderRadius = getComputedStyle(tar).borderRadius
				tourFreeze.appendChild(clipDiv)
			}	
		}



		// FIX: global selector
		$L('.lyteTourStep')[0].classList.add('lyteTourActiveStep');

		// FIX: Global selector can cause problem
		var lyteTourContainer = $L('.lyteTourContainer')[0];
		var stepData = lyteTourContainer.getBoundingClientRect();

		// FIX: Reuse get bounding client rects - no need to invoke them again
		var cs_top = stepData.top,
				cs_bottom = stepData.bottom,
				cs_right = stepData.right,
				cs_left = stepData.left,
				cs_height = stepData.height,
				cs_width = stepData.width;

		var currentStepTargetDim = currentStepTarget.getBoundingClientRect();

		var cst_top = currentStepTargetDim.top,
				cst_bottom = currentStepTargetDim.bottom,
				cst_right = currentStepTargetDim.right,
				cst_left = currentStepTargetDim.left,
				cst_height = currentStepTargetDim.height,
				cst_width = currentStepTargetDim.width;

		var deviation = 12;

		var backDiv = $L('.lyteTourTargetBackground');

		currentStepTarget.classList.add('lyteTourActiveTarget')

		backDiv.css({
			'width' : currentStepTargetDim.width,
			'height' : currentStepTargetDim.height,
			'top' :  currentStepTargetDim.top,
			'left' :  currentStepTargetDim.left
		})

		var tourNewTop;
		var arrowNewTop;

		var initialArrowFlag = false;

		var tourMidHeight = lyteTourContainer.getBoundingClientRect().height / 2;
		var targetMidHeight = currentStepTarget.getBoundingClientRect().top + (currentStepTarget.getBoundingClientRect().height / 2);
		var tourMidWidth = lyteTourContainer.getBoundingClientRect().width / 2;
		var targetMidWidth = currentStepTarget.getBoundingClientRect().left + (currentStepTarget.getBoundingClientRect().width / 2);

		var lyteTourArrow = $L('.lyteTourArrow')[0];
		if(lyteTourArrow){

			lyteTourArrow.style.transform = "rotate(45deg)"
			var arrowData = lyteTourArrow.getBoundingClientRect();

		}



		function arrowTranslate( placement , side){
			var returnVal = {};
			var arrowRotateVal = 45;
			var arrowUserPref = _this.getData('ltPropArrowPosition');

			if(!placement){
				placement = _this.getData('ltPropArrowPosition');
			}
			if(!side){
				side = _this.getData('arrowPositionOnBox');
			}

			switch ( side ){

				case 'left':

				$L('.lyteTourDefaultArrow').removeClass('lyteTourDefaultArrow');
				$L('.lyteTourLeftArrow').addClass('lyteTourDefaultArrow');

				break;

				case 'top':

				$L('.lyteTourDefaultArrow').removeClass('lyteTourDefaultArrow');
				$L('.lyteTourTopArrow').addClass('lyteTourDefaultArrow');

				break;

				case 'right':

				$L('.lyteTourDefaultArrow').removeClass('lyteTourDefaultArrow');
				$L('.lyteTourRightArrow').addClass('lyteTourDefaultArrow');

				break;

				case 'bottom':

				$L('.lyteTourDefaultArrow').removeClass('lyteTourDefaultArrow');
				$L('.lyteTourBottomArrow').addClass('lyteTourDefaultArrow');

				break;

			}

			lyteTourArrow = $L('.lyteTourDefaultArrow')[0];
			arrowData = lyteTourArrow.getBoundingClientRect();



			var arrowPlacement = side + (placement.charAt(0).toUpperCase() + placement.slice(1));

			var arrowNewX = -(arrowData.width/2),
					arrowNewY = ((Math.sqrt(2)*arrowData.width - arrowData.width)/2) + 20 ;

			var arrowTranslateVals = setArrowPosition(arrowPlacement);

			arrowNewX = arrowTranslateVals.xValue;
			arrowNewY = arrowTranslateVals.yValue;


			returnVal.arrowVal = "translate(" + arrowNewX + " ," + arrowNewY + ") rotate("+ 45 +"deg)";

			return returnVal;

		}

		function setArrowPosition( placement ){

			var arrowXVal , arrowYVal;
			var retVal = {};

			$L('.lyteTourArrow').css({
				'transform' : 'rotate(45deg)'
			})

			var arrowDia = _this.$node.closest('lyte-tour').getData('arrowDiagonalLength');

			var arrowDis = ((cst_height - arrowDia)/2) + deviation

			if(cst_height > cs_height){
					arrowDis = ((cs_height - arrowDia)/2)
			}

				switch ( placement ){

					case 'leftStart':
					arrowXVal = '-50%';
					arrowYVal = arrowDis + "px";
					break;

					case 'leftCenter':
					arrowXVal = '-50%';
					arrowYVal = ((cs_height - arrowDia)/2)+"px";
					break;

					case 'leftEnd':
					arrowXVal = '-50%';
					arrowYVal = (cs_height - arrowDis - arrowDia) + "px";
					break;

					case 'topStart':
					arrowXVal = arrowDis + "px";
					arrowYVal = '-50%';
					break;

					case 'topCenter':
					arrowXVal = ((cs_width - arrowDia)/2)+"px";
					arrowYVal = '-50%';
					break;

					case 'topEnd':
					arrowXVal = (cs_width - arrowDis - arrowDia)+"px";
					arrowYVal = '-50%';
					break;

					case 'rightStart':
					arrowXVal = '50%';
					arrowYVal = arrowDis + "px";
					break;

					case 'rightCenter':
					arrowXVal = '50%';
					arrowYVal = ((cs_height - arrowDia)/2)+"px";
					break;

					case 'rightEnd':
					arrowXVal = '50%';
					arrowYVal = (cs_height - arrowDis - arrowDia)+"px";
					break;

					case 'bottomStart':
					arrowXVal = arrowDis + "px";
					arrowYVal =  '50%';
					break;

					case 'bottomCenter':
					arrowXVal = ((cs_width - arrowDia)/2)+"px";
					arrowYVal = '50%';
					break;

					case 'bottomEnd':
					arrowXVal = (cs_width - arrowDis - arrowDia)+"px";
					arrowYVal = '50%';
					break;


				}

				retVal.xValue = arrowXVal;
				retVal.yValue = arrowYVal;

				return retVal;

		}

		function setArrowStyle(placement , side){
			var arrowTransVal = arrowTranslate( placement , side );

			if(!($L('lyte-tour')[0].component.getData('ltPropFixedArrow'))){
				$L('.lyteTourArrow').css({
					'transform' : arrowTransVal.arrowVal
				})
				initialArrowFlag = true;
			}
		}

		function stepTranslate(){

			var userPref = _this.getData('ltPropPosition');
			var stepNewX = 10 , stepNewY = 10;
			var returnVal = {};
			var arrowPlace = _this.getData('ltPropArrowPosition');
			var arrow = $L('.lyteTourArrow')[0];
			var arrowDia = _this.$node.closest('lyte-tour').getData('arrowDiagonalLength');

			var setArrowPos = _this.getData('ltPropArrowPosition');
			var setArrowSide = _this.getData('ltPropPosition');

			var windowWidth = window.innerWidth;
			var windowHeight = window.innerHeight;

			if(arrowDia < 1){
				arrowDia = parseFloat(parentTour.getData('ltPropMarginFromTarget'))
			}

			switch(userPref){

				case 'right':

				stepNewX = cst_right + arrowDia;
				stepNewY = cst_top - deviation;

				if(setArrowPos === "center"){
					stepNewY = cst_top + (cst_height - cs_height)/2
					deviation = 0;
				}
				if(setArrowPos === "end"){
					stepNewY = cst_top  - cs_height + cst_height + deviation
				}

				setArrowSide = "left"

				if((cst_right + cs_width) > windowWidth){
					stepNewX = cst_left  - (cs_width + arrowDia)
					setArrowSide = "right"
				}
				if((cst_top + cs_height) > windowHeight){
					stepNewY = cst_top  - cs_height + cst_height
					deviation = 0;
					setArrowPos = "end";
				}
				if(stepNewY <= 0){
					stepNewY = cst_top;
					deviation = 0;
					setArrowPos = "start";
				}

				if(parentTour.getData('ltPropType') === 'callout'){
					setArrowStyle(setArrowPos , setArrowSide);
				}

				break;

				case 'left' :

				stepNewX = cst_left - (cs_width + arrowDia)
				stepNewY = cst_top - deviation;

				setArrowSide = "right"

				if(setArrowPos === "center"){
					stepNewY = cst_top + (cst_height - cs_height)/2
					deviation = 0;
				}
				if(setArrowPos === "end"){
					stepNewY = cst_top  - cs_height + cst_height + deviation
				}

				if(cst_left < cs_width){
					stepNewX = cst_right + arrowDia;
					setArrowSide = "left"
				}
				if((cst_top + cs_height) > windowHeight){
					stepNewY = cst_top  - cs_height + cst_height
					deviation = 0;
					setArrowPos = "end";
				}
				if(stepNewY <= 0){
					stepNewY = cst_top;
					deviation = 0;
					setArrowPos = "start";
				}

				if(parentTour.getData('ltPropType') === 'callout'){
					setArrowStyle(setArrowPos , setArrowSide);
				}

				break;


				// The same applies for these to case blocks
				case 'top':

				stepNewY = cst_top - (cs_height + arrowDia);
				stepNewX = cst_left - deviation

				setArrowSide = "bottom"

				if(setArrowPos === "center"){
					stepNewX = cst_left + (cst_width - cs_width)/2
					deviation = 0
				}
				if(setArrowPos === "end"){
					stepNewX = cst_left  - cs_width + cst_width + deviation
				}

				if(cst_top < cs_height){
					stepNewY = cst_bottom + arrowDia;
					setArrowSide = "top"
				}
				if((cst_left + cs_width) > windowWidth){
					stepNewX = cst_left  - cs_width + cst_width
					deviation = 0
					setArrowPos = "end";
				}
				if(stepNewX <= 0){
					stepNewX = cst_left;
					deviation = 0
					setArrowPos = "start";
				}

				if(parentTour.getData('ltPropType') === 'callout'){
					setArrowStyle(setArrowPos , setArrowSide);
				}

				break;

				case 'bottom':

				stepNewX = cst_left - deviation;
				stepNewY = cst_bottom + arrowDia;

				setArrowSide = "top"

				if(setArrowPos === "center"){
					stepNewX = cst_left + (cst_width - cs_width)/2
					deviation = 0
				}
				if(setArrowPos === "end"){
					stepNewX = cst_left - cs_width + cst_width + deviation
				}

				if((cst_bottom + cs_height) > windowHeight){
					stepNewY = cst_top - (cs_height + arrowDia)
					setArrowSide = "bottom"
				}
				if((cst_left + cs_width) > windowWidth){
					stepNewX = cst_left - cs_width + cst_width
					deviation = 0
					setArrowPos = "end";
				}
				if(stepNewX <= 0){
					stepNewX = cst_left;
					deviation = 0
					setArrowPos = "start";
				}

				if(parentTour.getData('ltPropType') === 'callout'){
					setArrowStyle(setArrowPos , setArrowSide);
				}

				break;

			}

			returnVal.stepNewX = stepNewX
			returnVal.stepNewY = stepNewY

			returnVal.stepVal = "translate(" + stepNewX + "px ," + stepNewY + "px)";

			return returnVal;

		}

		var stepTranslateVal = stepTranslate();

		$L('.lyteTourContainer').css({
			'transform' : stepTranslateVal.stepVal
		})

		this.executeMethod('onChange' , currentStepTarget)

		if(parentTour.getData('ltPropPreventOutsideFocus') && $L('.lyteTourActiveStep')[0]){
			$L('.lyteTourActiveStep').trapFocus()
		}

	},

	methods : {
		onChange : function(){},
		onBeforeChange : function(){}
	}
});
//

;(function(){
  if($L){
    $L.prototype.trapFocus = function(arg){
      var preventdefault = false
      if(arg && arg.preventDefault){
        preventdefault = arg.preventDefault
      }

      if((_lyteUiUtils.trappingFocus)&&($L("#"+_lyteUiUtils.focusParent)[0])){
        $L(this[0]).data('trapFocusActiveIndex' , 0)
        _lyteUiUtils.removeEventListenerGlobal('keydown' , _lyteUiUtils.trapFocusFun)
        $L("#"+_lyteUiUtils.focusParent)[0].removeEventListener('keydown' , _lyteUiUtils.trapFocusFun)
        _lyteUiUtils.trappingFocus = false
        _lyteUiUtils.focusParent = "";
      }
      var parent = this[0];
      if(arg === 'destroy' || arg === "Destroy"){
        $L(this[0]).data('trapFocusActiveIndex' , 0)
        _lyteUiUtils.removeEventListenerGlobal('keydown' , _lyteUiUtils.trapFocusFun)
        $L(parent)[0].removeEventListener('keydown' , _lyteUiUtils.trapFocusFun)
        _lyteUiUtils.trappingFocus = false
        _lyteUiUtils.focusParent = "";
        _lyteUiUtils.addEventListenerGlobal('keydown',LytePopup.onEscape,true);
        return;
      }
      _lyteUiUtils.removeEventListenerGlobal('keydown',LytePopup.onEscape,true);

      var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), *[contenteditable]';
      

      var iniFocusableItems = [];
      iniFocusableItems = $L(parent).find(focusableElementsString).filter(function(ind, item){
        return $L(item).is(':visible') && (item.tabIndex != -1) && !(item.disabled)
      })
      if(iniFocusableItems.length < 1){
        if(!$L(this).attr('tabindex')){
          $L(this).attr('tabindex' , 0)
        }
        iniFocusableItems.push($L(this)[0])
      }
      if(iniFocusableItems.indexOf(document.activeElement) < 0){
        if($L(iniFocusableItems[0]).hasClass('lyteModalClose')){
          if(iniFocusableItems[1]){
            iniFocusableItems[1].focus()
          }
        } else {
          if(arg && arg.focusTarget && $L(arg.focusTarget)[0]){
            iniFocusableItems[iniFocusableItems.indexOf($L(arg.focusTarget)[0])].focus()
          } else {
            iniFocusableItems[0].focus()
          }
        }
      }

      if(!preventdefault){

        _lyteUiUtils.trapFocusFun = function(evt){

          _lyteUiUtils.trappingFocus = true
          _lyteUiUtils.focusParent = $L(parent).attr('id');

          var focusableItems;
          focusableItems = $L(parent).find(focusableElementsString).filter(function(ind, item){
            return $L(item).is(':visible') && (item.tabIndex != -1) && !(item.disabled)
          })

          if(focusableItems.length < 1){
            focusableItems.push($L(parent)[0])
          }

          if(evt.keyCode === 9 || evt.keyCode === 16){
            if(focusableItems.indexOf(document.activeElement) < 0){
              focusableItems[0].focus()
            }
            if(focusableItems.length == 0){
                return;
            }

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

            var numberOfFocusableItems = focusableItems.length;

            var focusedItemIndex;
            for(var i = 0; i < focusableItems.length; i++){
                if(focusableItems[i] == focusedItem){
                    focusedItemIndex = i;
                    break;
                }
            }

            if (evt.shiftKey && evt.keyCode == 9) {
                if (focusedItemIndex == 0) {
                    focusableItems.get(numberOfFocusableItems - 1).focus();
                    evt.preventDefault();
                }

            } else if(evt.keyCode == 9){
                if (focusedItemIndex == numberOfFocusableItems-1) {
                    focusableItems.get(0).focus();
                    evt.preventDefault();
                }
            }
          }
        }

        parent.addEventListener('keydown' , _lyteUiUtils.trapFocusFun)


      } else {

        $L(parent).data('trapFocusActiveIndex' , 0)

        _lyteUiUtils.trapFocusFun = function(evt){

          var index = $L(parent).data('trapFocusActiveIndex')
          var focusableItems;
          focusableItems = $L(parent).find(focusableElementsString).filter(function(ind, item){
            return $L(item).is(':visible') && (item.tabIndex != -1) && !(item.disabled)
          }).toArray()

          if(arg && arg.attachItems){
            var attachItemsString = arg.attachItems.join(',')
            var attachItemArr = $L(attachItemsString).toArray()
            for(var i=0;i<attachItemArr.length;i++){
              focusableItems.push(attachItemArr[i])
            }
          }

          if(focusableItems.indexOf(document.activeElement) !== index){
            index = focusableItems.indexOf(document.activeElement)
            $L(parent).data('trapFocusActiveIndex' , index)
          }

          if (evt.shiftKey && evt.keyCode == 9) {
            index -=1
            if(index < 0){
              index = focusableItems.length - 1
            }
            focusableItems[index].focus()
            evt.preventDefault()
            $L(parent).data('trapFocusActiveIndex' , index)
          } else if(evt.keyCode == 9){
            index +=1
            if(index > focusableItems.length-1){
              index = 0
            }
            focusableItems[index].focus()
            evt.preventDefault()
            $L(parent).data('trapFocusActiveIndex' , index)
          }

        }

        _lyteUiUtils.addEventListenerGlobal('keydown' , _lyteUiUtils.trapFocusFun)

      }

    }
  }
}());
