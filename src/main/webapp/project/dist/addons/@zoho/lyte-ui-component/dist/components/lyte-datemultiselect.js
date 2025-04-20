/**
 * Renders an DatemultiSelect
 * @component lyte-datemultiselect
 * @methods  onDateBeforeSelect,onDateAfterSelect,onDateBeforeRemove,onDateAfterRemove,onClearAll,onBeforeShow,onShow,onBeforeClose,onClose;
 */
Lyte.Component.register("lyte-datemultiselect", {
_template:"<template tag-name=\"lyte-datemultiselect\"> <div class=\"lyteDMSButton\" tabindex=\"0\" __click=\"{{action('openCalendar',event)}}\"> <template is=\"if\" value=\"{{isDateSelected}}\"><template case=\"true\"><span>{{countDays}} {{selectDays}}</span></template><template case=\"false\"><span class=\"lyteDMSButtonPlaceholder\">{{ltPropPlaceholder}}</span></template></template> </div> <div class=\"lyteDmsRowSection\"> <template is=\"if\" value=\"{{expHandlers(ltPropType,'==',&quot;inline&quot;)}}\"><template case=\"true\"> <div class=\"lyteDmsWrap\"> <lyte-calendar lt-prop-header-type=\"dropdown\" class=\"lyteDmsCalander\" lt-prop=\"{{stringify(ltPropCalendar)}}\" lt-prop-current-dates=\"{{lbind(ltPropSelectedDates)}}\" lt-prop-multiple=\"true\" on-before-add=\"{{method('beforeAdd')}}\" on-before-remove=\"{{method('beforeRemove')}}\" on-date-selected=\"{{method('handleAddition')}}\" on-date-removed=\"{{method('handleRemoval')}}\"> </lyte-calendar> <template is=\"if\" value=\"{{lyteSelectionContainer}}\"><template case=\"true\"><div class=\"lyteDmsSelectionContainer\"> <div class=\"lyteDmsCalcWrap\"> <p class=\"lyteDmsDayCalc\">Selected Days</p> <p class=\"lyteDmsDateCalc\">{{countDays}}</p> </div> <div class=\"lyteDmsRightPanelContentWrap\"> <template is=\"for\" items=\"{{itemsArray}}\" item=\"item\" index=\"index\"> <lyte-dms-item class=\"lyteDmsSelectedDays\"> {{item}} <lyte-dms-remove></lyte-dms-remove> <div class=\"lyteDMSRemoveIcon\" __click=\"{{action('removeSelectedDays',event,item)}}\">X</div> </lyte-dms-item> </template> </div> <p class=\"lyteDMSRemoveAll\" __click=\"{{action('clearSelectedDays',event,item)}}\">Clear All</p> </div></template></template> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(ltPropType,'==',&quot;popup&quot;)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{ltPropBindToBody}}\"><template case=\"true\"> <lyte-wormhole class=\"lyteDMSContainer lyteDMSWormhole\" on-before-append=\"{{method('setFlags')}}\" style=\"display: none;\"> <template is=\"registerYield\" yield-name=\"lyte-content\"> <div class=\"lyteDmsWrap\"> <lyte-calendar lt-prop-header-type=\"dropdown\" class=\"lyteDmsCalander\" lt-prop=\"{{stringify(ltPropCalendar)}}\" lt-prop-current-dates=\"{{lbind(ltPropSelectedDates)}}\" lt-prop-multiple=\"true\" on-before-add=\"{{method('beforeAdd')}}\" on-before-remove=\"{{method('beforeRemove')}}\" on-date-selected=\"{{method('handleAddition')}}\" on-date-removed=\"{{method('handleRemoval')}}\"> </lyte-calendar> <template is=\"if\" value=\"{{lyteSelectionContainer}}\"><template case=\"true\"><div class=\"lyteDmsSelectionContainer\"> <div class=\"lyteDmsCalcWrap\"> <p class=\"lyteDmsDayCalc\">Selected Days</p> <p class=\"lyteDmsDateCalc\">{{countDays}}</p> </div> <div class=\"lyteDmsRightPanelContentWrap\"> <template is=\"for\" items=\"{{itemsArray}}\" item=\"item\" index=\"index\"> <lyte-dms-item class=\"lyteDmsSelectedDays\"> {{item}} <lyte-dms-remove></lyte-dms-remove> <div class=\"lyteDMSRemoveIcon\" __click=\"{{action('removeSelectedDays',event,item)}}\">X</div> </lyte-dms-item> </template> </div> <p class=\"lyteDMSRemoveAll\" __click=\"{{action('clearSelectedDays',event,item)}}\">Clear All</p> </div></template></template> </div> <lyte-datemultiselect-freeze></lyte-datemultiselect-freeze> </template> </lyte-wormhole> </template></template> </template></template></template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]},{"type":"text","position":[0,2]}]},"false":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,3,0]},{"type":"attr","position":[0,3,1]},{"type":"for","position":[0,3,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[0,5]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,3,0]},{"type":"attr","position":[0,3,1]},{"type":"for","position":[0,3,1],"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[0,5]}]}},"default":{}},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["ltPropBindToBody","ltPropType","ltPropSelectedDates","ltPropCurrentMonth","ltPropCurrentDates","ltPropBoundary","ltPropCalendar","ltPropIsOpen","ltPropFormat","countDays","month","date","year","itemsArray","defaultFormatDates","formattedDates","selectDays","ltPropPlaceholder","isDateSelected","lyteSelectionContainer","ltPropAllowMultiple"],

	data: function () {

		return {

			'ltPropBindToBody': Lyte.attr('boolean', { 'default': false }),

			'ltPropType': Lyte.attr('string', { 'default': 'popup' }),

			'ltPropSelectedDates': Lyte.attr('array', { 'default': [] }),

			'ltPropCurrentMonth': Lyte.attr('array', { 'default': [] }),

			'ltPropCurrentDates': Lyte.attr('array', { 'default': [] }),

			'ltPropBoundary': Lyte.attr('object', { 'default': {} }),

			'ltPropCalendar': Lyte.attr('object', { 'default': {} }),

			'ltPropIsOpen': Lyte.attr('boolean', { 'default': false }),

			'ltPropFormat': Lyte.attr('string', { 'default': 'MM/DD/YYYY' }),

			'countDays': Lyte.attr('string', { 'default': "" }),

			'month': Lyte.attr('string', { 'default': "" }),

			'date': Lyte.attr('string', { 'default': "" }),

			'year': Lyte.attr('string', { 'default': "" }),

			'itemsArray': Lyte.attr('array', { 'default': [] }),

			'defaultFormatDates': Lyte.attr('array', { 'default': "[]" }),

			'formattedDates': Lyte.attr('string', { 'default': "" }),

			'selectDays': Lyte.attr('string', { 'default': "Selected Days" }),

			'ltPropPlaceholder': Lyte.attr('string', { 'default': 'Select Days' }),

			'isDateSelected': Lyte.attr('boolean', { 'default': false }),

			'lyteSelectionContainer': Lyte.attr('boolean', { 'default': false }),

			'ltPropAllowMultiple': Lyte.attr('boolean', { 'default': false })

		}
	},
	didConnect: function (event) {
		var that = this;
		var lyteDMSType = this.getData('ltPropType');
		this.$node.close = function (event) {
			that.close(event);
		}
		this.$node.open = function (event) {
			that.open(event);
		}
		let getSelectedDays = this.getData('ltPropSelectedDates');
		if (getSelectedDays.length > 0) {
			getSelectedDays.forEach((element) => {
				const ltPropFormat = this.getData('ltPropFormat');
				const sliceMonth = element.slice(0, 2);
				const convertMonth = Number(sliceMonth);
				const sliceDate = element.slice(3, 5);
				const sliceYear = element.slice(6, 10);
				const convertDate = Number(sliceDate);
				const convertYear = Number(sliceYear);

				let formattedDate;

				var format_1 = "DD/Month/YYYY",
				format_2 = "Month/DD/YYYY";

				switch (ltPropFormat) {
					case format_1:
						var dates = new Date(convertYear, convertMonth - 1, convertDate);
						var options = {
							day: '2-digit',
							month: 'short',
							year: 'numeric'
						};
						formattedDate = dates.toLocaleDateString('en-US', options);
						var spliceDate = formattedDate.slice(4, 6);
						var spliceMonth = formattedDate.slice(0, 3);
						var spliceYear = formattedDate.slice(8, 12);
						formattedDate = spliceDate + " " + spliceMonth + "," + spliceYear;
						break;

					case "DD/MM/YYYY":
					case "MM/DD/YYYY":
					case "DD/YYYY/MM":
					case "YYYY/MM/DD":
					case "YYYY/DD/MM":
						formattedDate = $L.moment(element, 'MM/DD/YYYY').format(ltPropFormat);
						break;

					case format_2:
						var dates2 = new Date(convertYear, convertMonth - 1, convertDate);
						var options2 = {
							day: '2-digit',
							month: 'short',
							year: 'numeric'
						};
						formattedDate = dates2.toLocaleDateString('en-US', options2);
						break;
				}

				if (formattedDate) {
					Lyte.arrayUtils(this.getData('itemsArray'), 'push', formattedDate);

				}
			});
			if (lyteDMSType == "inline") {
				this.bindWormhole(event);
				this.openDMSWrap(event);

			}

			this.setData('countDays', this.getData('ltPropSelectedDates').length);
			this.setData('isDateSelected', true);
		}
	},

	openDMSWrap: function (event) {
		let placePosition = $L(this.$node).find('.lyteDmsWrap')[0];
		var getSelectedDays = this.getData('ltPropSelectedDates');
		var selectedDays = this.getData('itemsArray');
		var button = $L(this.$node).find('.lyteDMSButton')[0];
		var calendar = $L(this.$node).find('.lyteDmsCalander')[0];
		var lyteSelectionContainer = $L(this.$node).find('.lyteDmsSelectionContainer')
		if (getSelectedDays.length > 0) {
			this.setData("lyteSelectionContainer", true);
			if (selectedDays.length == 1 || selectedDays.length == 0) {
				$L(placePosition).find('.lyteDMSRemoveAll')[0].style.display = "none";
			}
			else if (selectedDays.length > 1) {
				$L(placePosition).find('.lyteDMSRemoveAll')[0].style.display = "block";
			}
		}
		else if (getSelectedDays == "") {
			this.setData("lyteSelectionContainer", false);
		}
	},
	openWormhole: function (event) {
		_lyteDMS.activeDMS = this.$node;
		let wormhole = this.childComp;
		let addClass = $L(this.$node)
		let ltPropType = this.getData('ltPropType')
		wormhole.style.display = "block";
		addClass.addClass("lyteDMSWormholeOpen");
		$L('.lyteDMSWormholeOpen')[0].style.display = "block";

		this.wormholePosition(event);
		if (ltPropType == "popup") {
			var getSelectedDays = this.getData('ltPropSelectedDates');
			let placePosition = $L(wormhole).find('.lyteDmsWrap')[0];
			var selectedDays = this.getData('itemsArray');
		if (getSelectedDays.length > 0) {
			this.setData("lyteSelectionContainer", true);
			if (selectedDays.length == 1 || selectedDays.length == 0) {
				$L(placePosition).find('.lyteDMSRemoveAll')[0].style.display = "none";
			}
			else if (selectedDays.length > 1) {
				$L(placePosition).find('.lyteDMSRemoveAll')[0].style.display = "block";
			}
		}
		else if (getSelectedDays == "") {
			this.setData("lyteSelectionContainer", false);
			}
		}
		else if (ltPropType == "inline") {
			let lyteDmsCalender = $L(this.$node).find('.lyteDMSRemoveAll')[0];
			var selectedDays = this.getData('itemsArray');
			var getSelectedDays = this.getData('ltPropSelectedDates');
			this.setData("lyteSelectionContainer", true);
			if (selectedDays.length == 1 || selectedDays.length == 0) {
				lyteDmsCalender.style.display = "none";
			}
			else if (selectedDays.length > 1) {
				lyteDmsCalender.style.display = "block";
			}

			else if (getSelectedDays == "") {
				this.setData("lyteSelectionContainer", false);
			}

		}
	},
	wormholePosition: function () {
		let wormhole = this.childComp;
		let placePosition = $L(wormhole).find('.lyteDmsWrap')[0];
		var button = $L(this.$node).find('.lyteDMSButton')[0];
		var buttonBoundingClients = button.getBoundingClientRect();
		$L('body').addClass('lyteBodyWrapper');
		placePosition.style.position = "absolute";
		placePosition.style.top = document.documentElement.scrollTop + button.getBoundingClientRect().bottom + "px";
		placePosition.style.left = buttonBoundingClients.left + "px";
	},
	open: function (event) {
		var ret = this.fireBeforeCallback('onBeforeOpen', event);
		var _this = this;
		if (ret) {
			return;
		}
		this.setData('ltPropIsOpen', true);
		var lyteDMSType = this.getData('ltPropType');
		var removeClass = $L(this.$node);
		let allowMultiple = this.getData('ltPropAllowMultiple');
		let button = Array.from($L('lyte-datemultiselect'));
		button.forEach(function (button) {
			if (button.classList.contains('lyteDMSWormholeOpen') && button != _this.$node && allowMultiple == false) {
			button.component.childComp.style.display = "none";
		}
			});
		if (lyteDMSType == "popup") {
			this.bindWormhole(event);
			let appendWormhole = this.childComp;
			if (appendWormhole.style.display == "none") {
				this.openWormhole(event);
				
			}
		
			else if (appendWormhole.style.display == "block") {
				this.close(event);
				appendWormhole.style.display = "none";
				removeClass[0].classList.remove("lyteDMSWormholeOpen");
				if (this.getMethods('onClose')) {
					this.executeMethod('onClose', event);
				}
			}

		}

		if (this.getMethods('onShow')) {
			this.executeMethod('onShow', event);
		}
		if (this.getMethods('onBeforeOpen')) {
			this.executeMethod('onBeforeOpen', event);
		}
		if (this.getMethods('onBeforeShow')) {
			this.executeMethod('onBeforeShow', event);
		}

	},

	getCalendar: function () {
		var child = this.childComp,
			calendar = child.querySelector('lyte-calendar');

		return calendar;

	},
	close: function (event) {
		var ret = this.fireBeforeCallback('onBeforeHide', event);
		let wormhole = this.childComp;
		if (ret) {
			return;
		}
		this.setData('ltPropIsOpen', false);
		this.bindWormhole(event);
		wormhole.style.display = "none";
		if (this.getMethods('onHide')) {
			this.executeMethod('onHide', event, wormhole);
		}
		if (this.getMethods('onBeforeClose')) {
			this.executeMethod('onBeforeClose', event, wormhole);
		}
		_lyteDMS.activeDMS = null;
	},

	fireBeforeCallback: function () {
		var callbackName = arguments[0], ret;
		if (this.getMethods(callbackName)) {
			ret = this.executeMethod.apply(this, arguments) === false;
		}
		return ret;

	},
	getIndex: function () {
		let calender = this.getData('ltPropSelectedDates');
		let index = calender.findIndex((element) => element == this.getData('formattedDates'));
		Lyte.arrayUtils(calender, 'removeAt', index, 1);
		Lyte.arrayUtils(this.getData('itemsArray'), 'removeAt', index, 1);
	},
	removeAtEnd: function (date) {
		let calender = this.getData('ltPropSelectedDates');
		let index = calender.findIndex((element) => element == date);
		Lyte.arrayUtils(calender, 'removeAt', index, 1);
		Lyte.arrayUtils(this.getData('itemsArray'), 'removeAt', index, 1);
	},

	showCalendar: function () {
		this.childComp.classList.remove('lyteDMSHide');
		_lyteDMS.activeDMS = this.$node;
		this.getCalendar().revertToToday();
	},

	position: function () {
		$L(this.childComp).placement({
			append: false,
			originElement: this.$node
		});
	},

	remove: function (item, event) {

		var dataValue = item.getAttribute('data-value'),
			selectedDates = this.getData('itemsArray') || [],
			indexToRemove = selectedDates.indexOf(dataValue),
			ret = this.fireBeforeCallback('onBeforeRemove', event, dataValue);

		if (ret || indexToRemove === -1) {
			return;
		}

		Lyte.arrayUtils(selectedDates, 'removeAt', indexToRemove);
		if (this.getMethods('onRemove', event)) {
			this.executeMethod('onRemove', event, dataValue);
		}
		if (this.getMethods('onDateBeforeRemove', event)) {
			this.executeMethod('onDateBeforeRemove', event, dataValue);
		}
		if (this.getMethods('onDateAfterRemove', event)) {
			this.executeMethod('onDateAfterRemove', event, dataValue);
		}
		if (this.getMethods('onClearAll')) {
			this.executeMethod('onClearAll', event, dataValue);
		}
	},

	exceedsBoundary: function () {
		var boundary = this.getBoundary(),
			button = this.$node,
			buttonBoundingClients = button.getBoundingClientRect();

		if (buttonBoundingClients.left < boundary.left
			|| buttonBoundingClients.right > boundary.right
			|| buttonBoundingClients.top < boundary.top
			|| buttonBoundingClients.bottom > boundary.bottom) {
			return true;
		}
	},

	getBoundary: function () {
		var bounds = this.getData('ltPropBoundary');
		return {
			left: bounds.left || 0,
			right: bounds.right || window.innerWidth,
			top: bounds.top || 0,
			bottom: bounds.bottom || window.innerHeight
		};
	},
	bindWormhole: function () {
		if (!this.getData('ltPropBindToBody')) {
			this.setData('ltPropBindToBody', true);
		}
	},
	actions: {
		openCalendar: function (event) {
			this.open(event);
		},
		removeSelectedDays: function (event, item) {
			if (this.getData().ltPropType == "popup") {
			let lyteDmsCalender = $L(this.childComp);
			let calender = this.getData('ltPropSelectedDates');
			let shortHands = lyteDmsCalender.find('lyte-calendar')[0].component.data.shortHands;
			const ltPropFormat = this.getData('ltPropFormat');
			let selectedDays = this.getData('itemsArray');
			let defaultFormatDate = item;
				let sliceMonth, sliceDate, sliceYear, findMonth, monthIndex, month, day, year, sliceDateMonth, sliceMonthMonth, sliceYearMonth, findMonthMonth, monthIndexMonth, monthMonth, dayMonth, yearMonth;
			switch (ltPropFormat) {
				case "DD/Month/YYYY":
					 sliceMonth = item.slice(3, 6);
					 sliceDate = item.slice(0, 2);
					 sliceYear = item.slice(7, 12);
					 findMonth = shortHands.findIndex((element) => element == sliceMonth);
					 monthIndex = findMonth + 1;
					 month = monthIndex.toString().padStart(2, '0');
					 day = sliceDate.toString().padStart(2, '0');
					 year = sliceYear.toString();
					defaultFormatDate = `${month}/${day}/${year}`;
					break;

				case "DD/YYYY/MM":
				case "MM/YYYY/DD":
				case "YYYY/DD/MM":
				case "DD/MM/YYYY":
					defaultFormatDate = $L.moment(item, ltPropFormat).format("MM/DD/YYYY");
						break;

				case "Month/DD/YYYY":
					 sliceDateMonth = item.slice(4, 6);
					 sliceMonthMonth = item.slice(0, 3);
					 sliceYearMonth = item.slice(8, 12);
					 findMonthMonth = shortHands.findIndex((element) => element == sliceMonthMonth);
					 monthIndexMonth = findMonthMonth + 1;
					 monthMonth = monthIndexMonth.toString().padStart(2, '0');
					 dayMonth = sliceDateMonth.toString().padStart(2, '0');
					 yearMonth = sliceYearMonth.toString();
					defaultFormatDate = `${monthMonth}/${dayMonth}/${yearMonth}`;
					break;
			}

			if (calender.find((element) => element == defaultFormatDate)) {
				this.setData('formattedDates', defaultFormatDate);
				this.getIndex();
			}
			var ret = this.fireBeforeCallback('onBeforeRemove', event, item);
			let countDays = this.getData('ltPropSelectedDates').length;
			this.setData('countDays', countDays);
			this.setData('countDays', this.getData('ltPropSelectedDates').length);
			if (selectedDays.length == 1 || selectedDays.length == 0) {
				lyteDmsCalender.find('.lyteDMSRemoveAll')[0].style.display = "none";
			}
			else if (selectedDays.length > 1) {
				lyteDmsCalender.find('.lyteDMSRemoveAll')[0].style.display = "block";
			}
			}
			if (this.getData().ltPropType == "inline") {
				let lyteDmsCalender = $L(this.$node);
				let calender = this.getData('ltPropSelectedDates');
				let shortHands = lyteDmsCalender.find('lyte-calendar')[0].component.data.shortHands;
				const ltPropFormat = this.getData('ltPropFormat');
				let selectedDays = this.getData('itemsArray');
				let defaultFormatDate = item;
				let sliceMonth, sliceDate, sliceYear, findMonth, monthIndex, month, day, year, sliceDateMonth, sliceMonthMonth, sliceYearMonth, findMonthMonth, monthIndexMonth, monthMonth, dayMonth, yearMonth;
				switch (ltPropFormat) {
					case "DD/Month/YYYY":
						sliceMonth = item.slice(3, 6);
						sliceDate = item.slice(0, 2);
						sliceYear = item.slice(7, 12);
						findMonth = shortHands.findIndex((element) => element == sliceMonth);
						monthIndex = findMonth + 1;
						month = monthIndex.toString().padStart(2, '0');
						day = sliceDate.toString().padStart(2, '0');
						year = sliceYear.toString();
						defaultFormatDate = `${month}/${day}/${year}`;
						break;

					case "DD/YYYY/MM":
					case "MM/YYYY/DD":
					case "YYYY/DD/MM":
					case "DD/MM/YYYY":
						defaultFormatDate = $L.moment(item, ltPropFormat).format("MM/DD/YYYY");
						break;

					case "Month/DD/YYYY":
						sliceDateMonth = item.slice(4, 6);
						sliceMonthMonth = item.slice(0, 3);
						sliceYearMonth = item.slice(8, 12);
						findMonthMonth = shortHands.findIndex((element) => element == sliceMonthMonth);
						monthIndexMonth = findMonthMonth + 1;
						monthMonth = monthIndexMonth.toString().padStart(2, '0');
						dayMonth = sliceDateMonth.toString().padStart(2, '0');
						yearMonth = sliceYearMonth.toString();
						defaultFormatDate = `${monthMonth}/${dayMonth}/${yearMonth}`;
						break;
				}

				if (calender.find((element) => element == defaultFormatDate)) {
					this.setData('formattedDates', defaultFormatDate);
					this.getIndex();
				}
				var ret = this.fireBeforeCallback('onBeforeRemove', event, item);
				let countDays = this.getData('ltPropSelectedDates').length;
				this.setData('countDays', countDays);
				this.setData('countDays', this.getData('ltPropSelectedDates').length);
				if (selectedDays.length == 1 || selectedDays.length == 0) {
					lyteDmsCalender.find('.lyteDMSRemoveAll')[0].style.display = "none";
				}
				else if (selectedDays.length > 1) {
					lyteDmsCalender.find('.lyteDMSRemoveAll')[0].style.display = "block";
				}
			}


			if (this.getMethods('onRemove')) {
				this.executeMethod('onRemove', event, item);
			}
			if (this.getMethods('onDateBeforeRemove')) {
				this.executeMethod('onDateBeforeRemove', event, item);
			}
			if (this.getMethods('onDateAfterRemove')) {
				this.executeMethod('onDateAfterRemove', event, item);
			}
		},
		clearSelectedDays: function (event, item) {
			let ltPropType = this.getData('ltPropType');
			if (ltPropType == "popup") {
			let lyteDmsCalender = $L(this.childComp);
			this.setData('ltPropSelectedDates', []);
			this.setData('itemsArray', []);
			lyteDmsCalender.find('.lyteDMSRemoveAll')[0].style.display = "none";
			var ret = this.fireBeforeCallback('onBeforeRemove', event, item);
			let countDays = this.getData('itemsArray').length;
			this.setData('countDays', countDays);
			}
			else if (ltPropType == "inline") {
				let lyteDmsCalender = $L(this.$node).find('.lyteDMSRemoveAll')[0];
				let ltPropType = this.getData('ltPropType');
				this.setData('ltPropSelectedDates', []);
				this.setData('itemsArray', []);
				lyteDmsCalender.style.display = "none";
				var ret = this.fireBeforeCallback('onBeforeRemove', event, item);
				let countDays = this.getData('itemsArray').length;
				this.setData('countDays', countDays);
			}

			if (this.getMethods('onRemove')) {
				this.executeMethod('onRemove', event, item);
			}

			if (this.getMethods('onClearAll')) {
				this.executeMethod('onClearAll', event, item);
			}
		}
	},

	methods: {
		beforeRemove: function (event, date) {
			var ret = this.fireBeforeCallback('onBeforeRemove', event, date);

			if (ret) {
				return false;
			}
			let calender = this.getData('ltPropSelectedDates');
			if (calender.find((element) => element == date)) {
				this.removeAtEnd(date);

			}
			if (this.getMethods('onDateBeforeRemove')) {
				this.executeMethod('onDateBeforeRemove', event, date);
			}
		},
		beforeAdd: function (event, date,) {
			var ret = this.fireBeforeCallback('onBeforeAdd', event, date);

			if (ret) {
				return false;
			}
			if (this.getMethods('onDateBeforeSelect')) {
				this.executeMethod('onDateBeforeSelect', event, date);
			}
		},
		setFlags: function (wormhole) {
			this.childComp = wormhole;
		},
		handleAddition: function (event, date) {
			this.getData('ltPropFormat');
			const sliceMonth = date.slice(0, 2);
			const convertMonth = Number(sliceMonth);
			const sliceDate = date.slice(3, 5);
			const sliceYear = date.slice(6, 10);
			const convertDate = Number(sliceDate);
			const convertYear = Number(sliceYear);
			const ltPropFormat = this.getData('ltPropFormat');
			let selectedDays = this.getData('itemsArray');
			let formattedDate;
			let dates, options, spliceDate, spliceMonth, spliceYear, dates2, options2;
			let ltPropType = this.getData('ltPropType')

			if (ltPropType == 'popup') {
				this.openWormhole();
				this.wormholePosition();
			}
			switch (ltPropFormat) {
				case "DD/Month/YYYY":
					 dates = new Date(convertYear, convertMonth - 1, convertDate);
					 options = {
						day: '2-digit',
						month: 'short',
						year: 'numeric'
					};
					formattedDate = dates.toLocaleDateString('en-US', options);
					 spliceDate = formattedDate.slice(4, 6);
					 spliceMonth = formattedDate.slice(0, 3);
					 spliceYear = formattedDate.slice(8, 12);
					formattedDate = spliceDate + " " + spliceMonth + "," + spliceYear;
					break;

				case "DD/MM/YYYY":
				case "MM/DD/YYYY":
				case "DD/YYYY/MM":
				case "YYYY/MM/DD":
				case "YYYY/DD/MM":
					formattedDate = $L.moment(date, 'MM/DD/YYYY').format(ltPropFormat);
					break;

				case "Month/DD/YYYY":
					 dates2 = new Date(convertYear, convertMonth - 1, convertDate);
					 options2 = {
						day: '2-digit',
						month: 'short',
						year: 'numeric'
					};
					formattedDate = dates2.toLocaleDateString('en-US', options2);
					break;
			}

			if (formattedDate) {
				Lyte.arrayUtils(this.getData('itemsArray'), 'push', formattedDate);
			}
			this.setData('isDateSelected', true);
			this.setData("lyteSelectionContainer", true);
			let countDays = this.getData('itemsArray').length;
			this.setData('countDays', countDays);
			if (ltPropType == "popup") {
				let lyteDmsCalender = $L(this.childComp).find('.lyteDMSRemoveAll')[0];
			if (selectedDays.length == 1 || selectedDays.length == 0) {
					lyteDmsCalender.style.display = "none";
			}
			else if (selectedDays.length > 1) {
					lyteDmsCalender.style.display = "block";
			}
			}
			else if (ltPropType == "inline") {
				let lyteDmsCalender = $L(this.$node).find('.lyteDMSRemoveAll')[0];
				if (selectedDays.length == 1 || selectedDays.length == 0) {
					lyteDmsCalender.style.display = "none";
				}
				else if (selectedDays.length > 1) {
					lyteDmsCalender.style.display = "block";
				}
			}

			if (this.getMethods('onDateAfterSelect')) {
				this.executeMethod('onDateAfterSelect', event, date);
			}
			if (this.getMethods('onAdd')) {
				this.executeMethod('onAdd', event, date);
			}
		},
		handleRemoval: function (event, date) {
			let calender = this.getData('ltPropSelectedDates');
			let selectedDays = this.getData('itemsArray');
			let ltPropType = this.getData('ltPropType');
			if (calender.find((element) => element == date)) {
				this.removeAtEnd(date);
			}
			var ret = this.fireBeforeCallback('onBeforeRemove', event, date);
			let countDays = this.getData('ltPropSelectedDates').length;
			this.setData('countDays', countDays);
			if (ltPropType == "popup") {
				let lyteDmsCalender = $L(this.childComp);
				if (selectedDays.length == 1 || selectedDays.length == 0) {
					lyteDmsCalender.find('.lyteDMSRemoveAll')[0].style.display = "none";
				}
				else if (selectedDays.length > 1) {
					lyteDmsCalender.find('.lyteDMSRemoveAll')[0].style.display = "block";
				}

			}
			else if (ltPropType == "inline") {
				let lyteDmsCalender = $L(this.$node).find('.lyteDMSRemoveAll')[0];
			if (selectedDays.length == 1 || selectedDays.length == 0) {
				lyteDmsCalender.find('.lyteDMSRemoveAll')[0].style.display = "none";
			}
			else if (selectedDays.length > 1) {
				lyteDmsCalender.find('.lyteDMSRemoveAll')[0].style.display = "block";
			}
			}
			if (this.getMethods('onRemove')) {
				this.executeMethod('onRemove', event, date);
			}
			if (this.getMethods('onDateAfterRemove')) {
				this.executeMethod('onDateAfterRemove', event, date);
			}
		}


	},
	didDestroy: function () {
		let wormhole = this.childComp;
		if (wormhole) {
			wormhole.remove();
		}
		if (this.$node === _lyteDMS.activeDMS) {
			_lyteDMS.activeDMS = null;
		}

		if (this.$node === _lyteDMS.closedDMS) {
			_lyteDMS.closedDMS = null;
		}
	}

});

var _lyteDMS = {
	closeDMS: function () {
		if (!_lyteDMS.activeDMS) {
			return;
		}

		_lyteDMS.activeDMS.close();
	},

	isFocusedOpen: function () {
		var focusedDMS = _lyteDMS.getFocusedDMS();

		if (focusedDMS) {
			return focusedDMS.ltProp('isOpen');
		}
	},

	getFocusedDMS: function () {
		var activeElement = document.activeElement;

		if (activeElement.classList.contains('lyteDMSButton')) {
			activeElement = $L(activeElement).closest('datemultiselect-comp').get(0);

			return activeElement;
		}
	},

	openFocused: function (event) {
		var focusedDMS = _lyteDMS.getFocusedDMS();

		if (focusedDMS) {
			focusedDMS.open(event);
		}
	}
};

if (!_lyteUiUtils.registeredCustomElements['lyte-dms-remove']) {
	_lyteUiUtils.registeredCustomElements['lyte-dms-remove'] = true;

	/**
	   * @customElement lyte-dms-remove
	   */

	Lyte.createCustomElement("lyte-dms-remove", {
		static: {
			"observedAttributes": {
				/* disable async function */
				get: function () {
					return [];
				}
			}
		},
		"connectedCallback": function () {
			this.addEventListener('click', function (event) {
				var dms = $L(this).closest('ldatemultiselect').get(0);

				dms.component.remove(this.closest('lyte-dms-item'), event);
			});
		}
	});
}


_lyteUiUtils.addGlobalEventListener('click', function (event) {
	var target = event.target,
		parent = $L(target).closest('.lyteDMSContainer, .lyteDMSButton, .lyteDmsCalander, .lyteDmsSelectionContainer ');
	if (!parent.get(0)) {
		_lyteDMS.closeDMS();
		
	}
}, true);

window.addEventListener('scroll', function (event) {
	let button = Array.from($L(".lyteDMSButton"));
	
	button.forEach(function (button) {
		let dms = button.parentElement;
	var type = dms.component.data.ltPropType;
		var allowMultiple = dms.component.data.ltPropAllowMultiple;
		let comp = Array.from($L('lyte-datemultiselect'));
		comp.forEach(function (button) {
			if (button.classList.length > 1 && allowMultiple == false) {
				button.component.childComp.style.display = "none";
			}
		});
		if (type == 'popup') {
		dms.component.bindWormhole(event);
		let wormhole = dms.component.childComp;
		let button = $L('.lyteDMSButton')[0];
		let buttonBoundingClients = button.getBoundingClientRect();
		let calendar = $L('.lyteDmsCalander')[0];
		let calendarBoundingClients = calendar.getBoundingClientRect();
		for (const object in calendarBoundingClients) {
			if (buttonBoundingClients.top < 0 && wormhole !== undefined) {
				dms.component.wormholePosition(event);
				dms.component.close(event);
				wormhole.style.display = "none";
			}
				else if (buttonBoundingClients.top > 0 ) {
				dms.component.wormholePosition(event);
			}
		}
		}
		else {
				dms.component.openDMSWrap(event);
			
	}
	});

	
	var activeDMS = _lyteDMS.activeDMS, comp,
		closedDMS = _lyteDMS.closedDMS;

	if (activeDMS) {
		comp = activeDMS.component;

		// comp.position();

		if (comp.exceedsBoundary()) {
			activeDMS.close(event);
			_lyteDMS.closedDMS = activeDMS;
		}

		return;
	}

	if (closedDMS) {
		comp = closedDMS.component;

		if (!comp.exceedsBoundary()) {
			closedDMS.open(event);
			_lyteDMS.closedDMS = null;
		}
	}
}, true);

_lyteUiUtils.addGlobalEventListener('keydown', function (event) {
	var key = event.code,
		spaceKey = 'Space',
		escapeKey = 'Escape',
		tabKey = 'Tab';

	if (key === spaceKey && _lyteDMS.getFocusedDMS() && !_lyteDMS.isFocusedOpen()) {
		_lyteDMS.openFocused(event);
		event.preventDefault();
	}
	else if ((key === escapeKey || key === tabKey) && _lyteDMS.activeDMS) {
		_lyteDMS.activeDMS.close();
	}
});

window.addEventListener('resize', function () {
	window.clearTimeout(_lyteDMS.debounceId);

	_lyteDMS.debounceId = setTimeout(function () {
		var activeDMS = _lyteDMS.activeDMS, comp;

		if (activeDMS) {
			comp = activeDMS.component;
			comp.position();
		}
	}, 100);
});


