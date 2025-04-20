/**
 * This component is used to get responses from user
 * @component lyte-input
 * @version 1.0.0
 * @dependency lyte-calendar
 *  /components/lyte-calendar.js
 *  /theme/compiledCSS/default/ltr/lyte-ui-calendar.css 
 *  /plugins/lyte-moment.js
 * @dependency lyte-dropdown
 *  /components/lyte-dropdown.js
 *  /theme/compiledCSS/default/ltr/lyte-ui-dropdown.css
 * @dependency lyte-wormhole
 *  /components/lyte-wormhole.js
 * @utility focus,blur,click,select
 * @import lyte-dropdown
 * @condition ltPropType time,datetime
 * @ignoreMethods
 * @ignoreUtils
 * @ignoreProperties ltPropRemoveMultiple,ltPropYield,ltPropOptions,ltPropUserValue,ltPropSystemValue,ltPropIconClass,ltPropPlaceholder,ltPropNoResult,ltPropMaxCount,ltPropAjaxRequest,ltPropDisplayValue,ltPropDisabledList,ltPropTooltip,ltPropBoxClass,ltPropIsOpen,ltPropFixPositionOnOpen
 * @import lyte-calendar
 * @condition ltPropType date,datetime
 * @ignoreMethods
 * @ignoreUtils
 */

Lyte.Component.register("lyte-input",{
_template:"<template tag-name=\"lyte-input\"> <template is=\"switch\" value=\"{{ltPropType}}\"> <template case=\"password\"> <template is=\"if\" value=\"{{ltPropLabel}}\"><template case=\"true\"> <label for=\"{{ltPropId}}\" class=\"lyteLabel {{ltPropLabelClass}}\">{{ltPropLabel}}</label> </template></template> <div class=\"lyteField {{if(ltPropValue,'ltIconShow','')}} {{ltPropWrapperClass}}\" style=\"{{ltPropWrapperStyle}}\"> <input pattern=\"{{ltPropPattern}}\" data-tabindex=\"{{ltPropDataTabindex}}\" tabindex=\"{{ltPropTabIndex}}\" type=\"{{ltPropType}}\" value=\"{{lbind(ltPropValue)}}\" id=\"{{ltPropId}}\" class=\"{{ltPropClass}}\" maxlength=\"{{ltPropMaxlength}}\" name=\"{{ltPropName}}\" placeholder=\"{{ltPropPlaceholder}}\" autocomplete=\"{{ltPropAutocomplete}}\" autofocus=\"{{ltPropAutofocus}}\" disabled=\"{{ltPropDisabled}}\" style=\"{{ltPropStyle}}\" readonly=\"{{ltPropReadonly}}\" title=\"{{ltPropInputTitle}}\" __focus=\"{{action('focusClass',event)}}\" __blur=\"{{action('blurThrow',event)}}\" __input=\"{{action('input',event)}}\"> <template is=\"if\" value=\"{{ltPropPasswordIcon}}\"><template case=\"true\"> <span role=\"button\" aria-label=\"{{passwordTooltip}}\" data-tabindex=\"{{if(ltPropAria,ltPropDataTabindex,false)}}\" tabindex=\"{{if(ltPropAria,ltPropTabIndex,false)}}\" class=\"lyteInputPasswordToggleIcon {{passwordClass}}\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\" lt-prop-title=\"{{passwordTooltip}}\" __click=\"{{action('togglePassword')}}\" __keydown=\"{{action('togglePassword',event)}}\"></span> </template></template><template is=\"if\" value=\"{{ltPropCloseIcon}}\"><template case=\"true\"> <span role=\"button\" aria-label=\"{{ltPropAriaLabel.closeIcon}}\" disabled=\"{{ltPropDisabled}}\" data-tabindex=\"{{if(ltPropAria,ltPropDataTabindex,expHandlers(1,'-'))}}\" tabindex=\"{{if(ltPropAria,ltPropTabIndex,expHandlers(1,'-'))}}\" class=\"inputCloseIcon\" style=\"{{if(ltPropValue,'display: block;','display: none;')}}\" __keyup=\"{{action('closeKey',event)}}\" __keydown=\"{{action('clsIcon',event)}}\" __click=\"{{action('clsIcon',event)}}\"></span> </template></template> </div> </template> <template case=\"number\"> <template is=\"if\" value=\"{{ltPropLabel}}\"><template case=\"true\"> <label for=\"{{ltPropId}}\" class=\"lyteLabel {{ltPropLabelClass}}\">{{ltPropLabel}}</label> </template></template> <div class=\"lyteField {{if(ltPropValue,'ltIconShow','')}} {{ltPropWrapperClass}}\" style=\"{{ltPropWrapperStyle}}\"> <input pattern=\"{{ltPropPattern}}\" data-tabindex=\"{{ltPropDataTabindex}}\" tabindex=\"{{ltPropTabIndex}}\" type=\"number\" value=\"{{lbind(ltPropValue)}}\" id=\"{{ltPropId}}\" class=\"{{ltPropClass}}\" maxlength=\"{{ltPropMaxlength}}\" name=\"{{ltPropName}}\" placeholder=\"{{ltPropPlaceholder}}\" autocomplete=\"{{ltPropAutocomplete}}\" autofocus=\"{{ltPropAutofocus}}\" disabled=\"{{ltPropDisabled}}\" readonly=\"{{ltPropReadonly}}\" style=\"{{ltPropStyle}}\" step=\"{{ltPropStep}}\" max=\"{{ltPropMax}}\" min=\"{{ltPropMin}}\" title=\"{{ltPropInputTitle}}\" __keydown=\"{{action('numberKeydown',event,this)}}\" __focus=\"{{action('focusClass',event)}}\" __blur=\"{{action('blurThrow',event)}}\" __paste=\"{{action('numberPaste',event,this)}}\" __input=\"{{action('input',event,this)}}\"> <template is=\"if\" value=\"{{ltPropCloseIcon}}\"><template case=\"true\"> <span role=\"button\" aria-label=\"{{ltPropAriaLabel.closeIcon}}\" disabled=\"{{ltPropDisabled}}\" data-tabindex=\"{{if(ltPropAria,ltPropDataTabindex,expHandlers(1,'-'))}}\" tabindex=\"{{if(ltPropAria,ltPropTabIndex,expHandlers(1,'-'))}}\" class=\"inputCloseIcon\" style=\"{{if(ltPropValue,'display: block;','display: none;')}}\" __keyup=\"{{action('closeKey',event)}}\" __keydown=\"{{action('clsIcon',event)}}\" __click=\"{{action('clsIcon',event)}}\"></span> </template></template> </div> </template> <template case=\"textarea\"> <template is=\"if\" value=\"{{ltPropLabel}}\"><template case=\"true\"> <label for=\"{{ltPropId}}\" class=\"lyteLabel {{ltPropLabelClass}}\">{{ltPropLabel}}</label> </template></template> <div class=\"lyteField {{ltPropWrapperClass}}\" style=\"{{ltPropWrapperStyle}}\"> <textarea autocomplete=\"{{ltPropAutocomplete}}\" pattern=\"{{ltPropPattern}}\" data-tabindex=\"{{ltPropDataTabindex}}\" tabindex=\"{{ltPropTabIndex}}\" id=\"{{ltPropId}}\" class=\"{{ltPropClass}}\" value=\"{{lbind(ltPropValue)}}\" rows=\"{{ltPropRows}}\" cols=\"{{ltPropCols}}\" maxlength=\"{{ltPropMaxlength}}\" name=\"{{ltPropName}}\" autofocus=\"{{ltPropAutofocus}}\" disabled=\"{{ltPropDisabled}}\" readonly=\"{{ltPropReadonly}}\" style=\"{{ltPropStyle}}\" title=\"{{ltPropInputTitle}}\" __focus=\"{{action('focusClass',event)}}\" __blur=\"{{action('blurThrow',event)}}\" __input=\"{{action('input',event)}}\"></textarea> <template is=\"if\" value=\"{{resize}}\"><template case=\"true\"> <span class=\"{{resizeClass}}\" ontouchstart=\"{{action('resizeSelect',event)}}\" __mousedown=\"{{action('resizeSelect',event)}}\"></span> </template></template> </div> </template> <template case=\"date\"> <template is=\"if\" value=\"{{ltPropLabel}}\"><template case=\"true\"> <label for=\"{{ltPropId}}\" class=\"lyteLabel {{ltPropLabelClass}}\">{{ltPropLabel}}</label> </template></template> <div class=\"lyteField {{ltPropWrapperClass}}\" style=\"{{ltPropWrapperStyle}}\"> <input pattern=\"{{ltPropPattern}}\" data-tabindex=\"{{ltPropDataTabindex}}\" tabindex=\"{{ltPropTabIndex}}\" type=\"text\" id=\"{{ltPropId}}\" class=\"{{ltPropClass}}\" name=\"{{ltPropName}}\" placeholder=\"{{ltPropPlaceholder}}\" autocomplete=\"{{ltPropAutocomplete}}\" value=\"{{lbind(ltPropCurrentDate)}}\" autofocus=\"{{ltPropAutofocus}}\" disabled=\"{{ltPropDisabled}}\" readonly=\"{{ltPropReadonly}}\" style=\"{{ltPropStyle}}\" title=\"{{ltPropInputTitle}}\" __keydown=\"{{action('calendarKeydown',event,this)}}\" __click=\"{{action('calendarClick',event,this)}}\" __focus=\"{{action('showcalendar',event,this)}}\" __blur=\"{{action('blurThrow',event)}}\" __input=\"{{action('input',event)}}\" __dragstart=\"{{action('preventDrag',event)}}\"> <template is=\"if\" value=\"{{ltPropAria}}\"><template case=\"true\"> <span aria-haspopup=\"true\" aria-label=\"{{ltPropAriaLabel.button}}\" disabled=\"{{ltPropDisabled}}\" aria-expanded=\"{{isExpanded}}\" aria-controls=\"#{{randomId}}\" class=\"lyteInputCalendarIcon\" tabindex=\"{{ltPropTabIndex}}\" data-tabindex=\"{{ltPropDataTabindex}}\" __click=\"{{action('calIconClick',event,this)}}\" __focus=\"{{action('calIconFocus',event,this)}}\" __blur=\"{{action('calIconBlur',event,this)}}\" __keydown=\"{{action('calIconKey',event)}}\"></span> </template></template> </div> <template is=\"if\" value=\"{{ltPropBindToBody}}\"><template case=\"true\"> <lyte-wormhole on-before-append=\"{{method('wormholeAppend')}}\" role=\"dialog\" aria-modal=\"true\" aria-label=\"{{ltPropAriaLabel.modal}}\"> <template is=\"registerYield\" yield-name=\"lyte-content\"> <div id=\"lyteCalendar\" class=\"lyteInputCalendar lyteCalendarHidden {{ltPropCalendarClass}}\" __mousedown=\"{{action('calmsdown',event,this)}}\" __keydown=\"{{action('calendarKey',event)}}\"> <lyte-calendar lt-prop-iso=\"{{lbind(ltPropIso)}}\" id=\"{{randomId}}\" lt-prop-fill-rows=\"{{ltPropFillRows}}\" lt-prop-number-of-rows=\"{{ltPropNumberOfRows}}\" lt-prop-yield=\"{{ltPropYield}}\" lt-prop-format=\"{{ltPropFormat}}\" lt-prop-end-date=\"{{lbind(ltPropEndDate)}}\" lt-prop-start-date=\"{{lbind(ltPropStartDate)}}\" lt-prop-current-date=\"{{lbind(ltPropCurrentDate)}}\" lt-prop-year=\"{{lbind(ltPropYear)}}\" lt-prop-month-header-format=\"{{ltPropMonthHeaderFormat}}\" on-date-selected=\"{{method('on-dateselected')}}\" lt-prop-min-date=\"{{ltPropMinDate}}\" lt-prop-max-date=\"{{ltPropMaxDate}}\" lt-prop-start-week-day=\"{{ltPropStartWeekDay}}\" lt-prop-header-type=\"{{ltPropHeaderType}}\" on-navigate=\"{{method('calendarNavigate')}}\" on-viewdate-change=\"{{method('viewDateChange')}}\" on-view-change=\"{{method('viewChange')}}\" lt-prop=\"{{stringify(ltPropCalendarProperties)}}\" lt-prop-activate-navigation=\"{{lbind(navigation)}}\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <template is=\"registerYield\" yield-name=\"footer\"> <lyte-yield yield-name=\"footer\"></lyte-yield> </template> </template></template> </lyte-calendar> </div> </template> </lyte-wormhole> </template></template> </template> <template case=\"datetime\"> <template is=\"if\" value=\"{{ltPropLabel}}\"><template case=\"true\"> <label for=\"{{ltPropId}}\" class=\"lyteLabel {{ltPropLabelClass}}\">{{ltPropLabel}}</label> </template></template> <div class=\"lyteField {{ltPropWrapperClass}}\" style=\"{{ltPropWrapperStyle}}\"> <template is=\"if\" value=\"{{showPlaceholder}}\"><template case=\"true\"> <span class=\"lyteInputDateTimePlaceholder\">{{ltPropCommonPlaceholder}}</span> </template></template> <input autocomplete=\"{{ltPropAutocomplete}}\" data-tabindex=\"{{ltPropDataTabindex}}\" tabindex=\"{{ltPropTabIndex}}\" type=\"text\" class=\"{{ltPropClass}}\" id=\"date\" placeholder=\"{{ltPropPlaceholder}}\" value=\"{{lbind(ltPropCurrentDate)}}\" disabled=\"{{ltPropDisabled}}\" readonly=\"{{ltPropReadonly}}\" __keydown=\"{{action('calendarKeydown',event,this)}}\" __click=\"{{action('calendarClick',event,this)}}\" __focus=\"{{action('showcalendar',event,this)}}\" __blur=\"{{action('blurThrow',event)}}\" __input=\"{{action('input',event)}}\" __dragstart=\"{{action('preventDrag',event)}}\"> <template is=\"if\" value=\"{{ltPropAria}}\"><template case=\"true\"> <span aria-haspopup=\"true\" aria-label=\"{{ltPropAriaLabel.button}}\" disabled=\"{{ltPropDisabled}}\" aria-expanded=\"{{isExpanded}}\" aria-controls=\"#{{randomId}}\" class=\"lyteInputCalendarIcon\" tabindex=\"{{ltPropTabIndex}}\" data-tabindex=\"{{ltPropDataTabindex}}\" __click=\"{{action('calIconClick',event,this)}}\" __focus=\"{{action('calIconFocus',event,this)}}\" __blur=\"{{action('calIconBlur',event,this)}}\" __keydown=\"{{action('calIconKey',event)}}\"></span> </template></template> <input autocomplete=\"{{ltPropAutocomplete}}\" tabindex=\"{{ltPropTabIndex}}\" type=\"text\" placeholder=\"{{ltPropTimePlaceholder}}\" class=\"{{ltPropTimeClass}}\" value=\"{{ltPropDefaultTime}}\" id=\"time\" style=\"{{ltPropStyle}}\" disabled=\"{{ltPropDisabled}}\" readonly=\"{{ltPropReadonly}}\" __blur=\"{{action('timeBlur',event,this)}}\" __focus=\"{{action('timeFocus',event,this)}}\" __keydown=\"{{action('timeKeydown',event,this)}}\" __click=\"{{action('timeClick',event,this)}}\" __dragstart=\"{{action('preventDrag',event)}}\" __input=\"{{action('timeInput',this)}}\"> </div> <template is=\"if\" value=\"{{ltPropBindToBody}}\"><template case=\"true\"> <lyte-wormhole on-before-append=\"{{method('wormholeAppend')}}\" role=\"dialog\" aria-modal=\"true\" aria-label=\"{{ltPropAriaLabel.modal}}\"> <template is=\"registerYield\" yield-name=\"lyte-content\"> <div id=\"lyteCalendar\" class=\"lyteInputCalendar lyteCalendarHidden {{ltPropCalendarClass}}\" __mousedown=\"{{action('calmsdown',event,this)}}\" __keydown=\"{{action('calendarKey',event)}}\"> <lyte-calendar lt-prop-iso=\"{{lbind(ltPropIso)}}\" id=\"{{randomId}}\" lt-prop-fill-rows=\"{{ltPropFillRows}}\" lt-prop-number-of-rows=\"{{ltPropNumberOfRows}}\" lt-prop-yield=\"{{ltPropYield}}\" lt-prop-format=\"{{ltPropFormat}}\" lt-prop-end-date=\"{{lbind(ltPropEndDate)}}\" lt-prop-start-date=\"{{lbind(ltPropStartDate)}}\" lt-prop-current-date=\"{{lbind(ltPropCurrentDate)}}\" lt-prop-year=\"{{lbind(ltPropYear)}}\" lt-prop-month-header-format=\"{{ltPropMonthHeaderFormat}}\" on-date-selected=\"{{method('on-dateselected')}}\" lt-prop-min-date=\"{{ltPropMinDate}}\" lt-prop-max-date=\"{{ltPropMaxDate}}\" lt-prop-start-week-day=\"{{ltPropStartWeekDay}}\" lt-prop-header-type=\"{{ltPropHeaderType}}\" on-navigate=\"{{method('calendarNavigate')}}\" on-viewdate-change=\"{{method('viewDateChange')}}\" on-view-change=\"{{method('viewChange')}}\" lt-prop=\"{{stringify(ltPropCalendarProperties)}}\" lt-prop-activate-navigation=\"{{lbind(navigation)}}\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <template is=\"registerYield\" yield-name=\"footer\"> <lyte-yield yield-name=\"footer\"></lyte-yield> </template> </template></template> </lyte-calendar> </div> </template> </lyte-wormhole> </template></template> <lyte-dropdown class=\"lyteInputDateTimeDropdown\" lt-prop-position=\"{{ltPropPosition}}\" lt-prop-yield=\"true\" lt-prop-disabled=\"{{ltPropDropdownDisabled}}\" lt-prop-show=\"{{ltPropDropdownShow}}\" lt-prop-callout=\"{{ltPropDropdownCallout}}\" lt-prop-boundary=\"{{ltPropBoundary}}\" lt-prop-freeze=\"{{ltPropDropdownFreeze}}\" on-hide=\"{{method('hide')}}\" on-show=\"{{method('show')}}\" on-before-hide=\"{{method('beforeHide')}}\" on-before-show=\"{{method('beforeShow')}}\" on-option-selected=\"{{method('optionSelected')}}\" on-position-changed=\"{{method('positionChange')}}\" on-scroll=\"{{method('scroll')}}\" lt-prop-selected=\"{{ltPropDefaultTime}}\" lt-prop-animate=\"{{ltPropAnimate}}\" lt-prop-scope=\"{{ltPropScope}}\" lt-prop=\"{{stringify(ltPropDropdownProperties)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button class=\"lyteInputDateTimeDropButton\"></lyte-drop-button> <lyte-drop-box id=\"{{ltPropDropdownId}}\" class=\"{{ltPropDropdownClass}}\"> <template is=\"if\" value=\"{{ltPropHeaderYield}}\"><template case=\"true\"> <lyte-drop-head> <lyte-yield yield-name=\"timeheader\"></lyte-yield> </lyte-drop-head> </template></template> <lyte-drop-body> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"><template is=\"for\" items=\"{{dropdownData}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item.time}}\" class=\"{{item.className}}\" lt-prop-title=\"{{item.title}}\" data-custom-tooltip=\"{{item.customTooltip}}\"> <lyte-yield yield-name=\"yield\" item-value=\"{{item}}\"></lyte-yield> </lyte-drop-item> </template></template><template case=\"false\"><template is=\"if\" value=\"{{ltPropShowInterval}}\"><template case=\"true\"><template is=\"for\" items=\"{{dropdownData}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item.time}}\" class=\"{{item.className}}\" lt-prop-title=\"{{item.title}}\" data-custom-tooltip=\"{{item.customTooltip}}\"> <span>{{item.time}}</span> <span style=\"opacity: 0.5;float: right;margin-left: 5px;\">{{item.interval}}</span> </lyte-drop-item> </template></template><template case=\"false\"><template is=\"for\" items=\"{{dropdownData}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item.time}}\" class=\"{{item.className}}\" lt-prop-title=\"{{item.title}}\" data-custom-tooltip=\"{{item.customTooltip}}\"> <span>{{item.time}}</span> </lyte-drop-item> </template></template></template></template></template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template> <template case=\"time\"> <template is=\"if\" value=\"{{ltPropLabel}}\"><template case=\"true\"> <label for=\"{{ltPropId}}\" class=\"lyteLabel {{ltPropLabelClass}}\">{{ltPropLabel}}</label> </template></template> <div class=\"lyteField {{ltPropWrapperClass}}\" style=\"{{ltPropWrapperStyle}}\"> <input data-tabindex=\"{{ltPropDataTabindex}}\" tabindex=\"{{ltPropTabIndex}}\" type=\"text\" value=\"{{ltPropDefaultTime}}\" id=\"{{ltPropId}}\" class=\"{{ltPropClass}}\" maxlength=\"{{ltPropMaxlength}}\" name=\"{{ltPropName}}\" placeholder=\"{{ltPropPlaceholder}}\" autocomplete=\"{{ltPropAutocomplete}}\" autofocus=\"{{ltPropAutofocus}}\" disabled=\"{{ltPropDisabled}}\" readonly=\"{{ltPropReadonly}}\" style=\"{{ltPropStyle}}\" title=\"{{ltPropInputTitle}}\" __blur=\"{{action('timeBlur',event,this)}}\" __focus=\"{{action('timeFocus',event,this)}}\" __keydown=\"{{action('timeKeydown',event,this)}}\" __click=\"{{action('timeClick',event,this)}}\" __dragstart=\"{{action('preventDrag',event)}}\" __input=\"{{action('timeInput',this)}}\"> </div> <template is=\"if\" value=\"{{ltPropDropdown}}\"><template case=\"true\"> <lyte-dropdown class=\"lyteInputTimeDropdown\" lt-prop-position=\"{{ltPropPosition}}\" lt-prop-yield=\"true\" lt-prop-disabled=\"{{ltPropDropdownDisabled}}\" lt-prop-show=\"{{ltPropDropdownShow}}\" lt-prop-callout=\"{{ltPropDropdownShow}}\" lt-prop-boundary=\"{{ltPropBoundary}}\" lt-prop-freeze=\"{{ltPropDropdownFreeze}}\" on-hide=\"{{method('hide')}}\" on-show=\"{{method('show')}}\" on-before-hide=\"{{method('beforeHide')}}\" on-before-show=\"{{method('beforeShow')}}\" on-option-selected=\"{{method('optionSelected')}}\" on-position-changed=\"{{method('positionChange')}}\" on-scroll=\"{{method('scroll')}}\" lt-prop-selected=\"{{ltPropDefaultTime}}\" lt-prop-animate=\"{{ltPropAnimate}}\" lt-prop-scope=\"{{ltPropScope}}\" lt-prop=\"{{stringify(ltPropDropdownProperties)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button class=\"lyteInputTimeDropButton\"></lyte-drop-button> <lyte-drop-box id=\"{{ltPropDropdownId}}\" class=\"{{ltPropDropdownClass}}\"> <template is=\"if\" value=\"{{ltPropHeaderYield}}\"><template case=\"true\"> <lyte-drop-head> <lyte-yield yield-name=\"timeheader\"></lyte-yield> </lyte-drop-head> </template></template> <lyte-drop-body> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"><template is=\"for\" items=\"{{dropdownData}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item.time}}\" class=\"{{item.className}}\" lt-prop-title=\"{{item.title}}\" data-custom-tooltip=\"{{item.customTooltip}}\"> <lyte-yield yield-name=\"yield\" item-value=\"{{item}}\"></lyte-yield> </lyte-drop-item> </template></template><template case=\"false\"><template is=\"if\" value=\"{{ltPropShowInterval}}\"><template case=\"true\"><template is=\"for\" items=\"{{dropdownData}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item.time}}\" class=\"{{item.className}}\" lt-prop-title=\"{{item.title}}\" data-custom-tooltip=\"{{item.customTooltip}}\"> <span>{{item.time}}</span> <span style=\"opacity: 0.5;float: right;margin-left: 5px;\">{{item.interval}}</span> </lyte-drop-item> </template></template><template case=\"false\"><template is=\"for\" items=\"{{dropdownData}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item.time}}\" class=\"{{item.className}}\" lt-prop-title=\"{{item.title}}\" data-custom-tooltip=\"{{item.customTooltip}}\"> <span>{{item.time}}</span> </lyte-drop-item> </template></template></template></template></template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template></template> </template> <template default=\"\"> <template is=\"if\" value=\"{{ltPropLabel}}\"><template case=\"true\"> <label for=\"{{ltPropId}}\" class=\"lyteLabel {{ltPropLabelClass}}\">{{ltPropLabel}}</label> </template></template> <div class=\"lyteField{{if(ltPropValue,' ltIconShow','')}} {{isBox}} {{ltPropWrapperClass}}\" style=\"{{ltPropWrapperStyle}}\"> <input data-tabindex=\"{{ltPropDataTabindex}}\" tabindex=\"{{ltPropTabIndex}}\" type=\"text\" value=\"{{lbind(ltPropValue)}}\" id=\"{{ltPropId}}\" class=\"{{ltPropClass}}\" maxlength=\"{{ltPropMaxlength}}\" name=\"{{ltPropName}}\" placeholder=\"{{ltPropPlaceholder}}\" autocomplete=\"{{ltPropAutocomplete}}\" autofocus=\"{{ltPropAutofocus}}\" disabled=\"{{ltPropDisabled}}\" readonly=\"{{ltPropReadonly}}\" style=\"{{ltPropStyle}}\" title=\"{{ltPropInputTitle}}\" pattern=\"{{ltPropPattern}}\" __focus=\"{{action('focusClass',event)}}\" __blur=\"{{action('blurThrow',event)}}\" __input=\"{{action('input',event)}}\"> <template is=\"if\" value=\"{{expHandlers(ltPropType,'==',&quot;search&quot;)}}\"><template case=\"true\"> <span class=\"searchIcon\"></span> </template></template> <template is=\"if\" value=\"{{ltPropCloseIcon}}\"><template case=\"true\"> <span role=\"button\" data-tabindex=\"{{if(ltPropAria,ltPropDataTabindex,false)}}\" tabindex=\"{{if(ltPropAria,ltPropTabIndex,false)}}\" class=\"inputCloseIcon\" style=\"{{if(ltPropValue,'display: block;','display: none;')}}\" __click=\"{{action('clsIcon',event)}}\" __keydown=\"{{action('keyclick',event)}}\"></span> </template></template> </div>  </template> </template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"switch","position":[1],"cases":{"password":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3],"attr":{"style":{"name":"style","dynamicValue":"ltPropWrapperStyle"}}},{"type":"attr","position":[3,1],"attr":{"style":{"name":"style","dynamicValue":"ltPropStyle"},"type":{"name":"type","dynamicValue":"ltPropType"}}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[3,4]},{"type":"if","position":[3,4],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["ltPropValue","'display: block;'","'display: none;'"]}}}}]}},"default":{}}]},"number":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3],"attr":{"style":{"name":"style","dynamicValue":"ltPropWrapperStyle"}}},{"type":"attr","position":[3,1],"attr":{"style":{"name":"style","dynamicValue":"ltPropStyle"},"value":{"name":"value","dynamicValue":"ltPropValue","isLbind":true}}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["ltPropValue","'display: block;'","'display: none;'"]}}}}]}},"default":{}}]},"textarea":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3],"attr":{"style":{"name":"style","dynamicValue":"ltPropWrapperStyle"}}},{"type":"attr","position":[3,1],"attr":{"style":{"name":"style","dynamicValue":"ltPropStyle"},"placeholder":{"name":"placeholder","dynamicValue":"ltPropPlaceholder"}}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}}]},"date":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3],"attr":{"style":{"name":"style","dynamicValue":"ltPropWrapperStyle"}}},{"type":"attr","position":[3,1],"attr":{"style":{"name":"style","dynamicValue":"ltPropStyle"}}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"insertYield","position":[1]}]}]}},"default":{}},{"type":"componentDynamic","position":[1,1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"datetime":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3],"attr":{"style":{"name":"style","dynamicValue":"ltPropWrapperStyle"}}},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3,3]},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[3,7],"attr":{"style":{"name":"style","dynamicValue":"ltPropStyle"}}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1],"dynamicNodes":[{"type":"insertYield","position":[1]}]}]}},"default":{}},{"type":"componentDynamic","position":[1,1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[7]},{"type":"registerYield","position":[7,1],"dynamicNodes":[{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,3,1]},{"type":"if","position":[3,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[3,3]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[7]}]},"time":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3],"attr":{"style":{"name":"style","dynamicValue":"ltPropWrapperStyle"}}},{"type":"attr","position":[3,1],"attr":{"style":{"name":"style","dynamicValue":"ltPropStyle"}}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[3,3,1]},{"type":"if","position":[3,3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"for","position":[0],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1]}]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[3,3]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}},"default":{}},{"type":"attr","position":[3],"attr":{"style":{"name":"style","dynamicValue":"ltPropWrapperStyle"}}},{"type":"attr","position":[3,1],"attr":{"style":{"name":"style","dynamicValue":"ltPropStyle"}}},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[3,5]},{"type":"if","position":[3,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["ltPropValue","'display: block;'","'display: none;'"]}}}}]}},"default":{}}]}}],
_observedAttributes :["ltPropDisabled","ltPropAutofocus","ltPropAutocomplete","ltPropMaxlength","ltPropName","ltPropPlaceholder","ltPropReadonly","ltPropValue","ltPropWidth","ltPropTabIndex","ltPropType","ltPropAppearance","ltPropDirection","ltPropLabel","ltPropId","ltPropClass","ltPropStyle","ltPropWrapperStyle","ltPropHeight","ltPropPattern","ltPropInputTitle","ltPropRows","ltPropCols","ltPropTextAreaResize","ltPropMax","ltPropMin","ltPropStep","ltPropTimeFormat","ltPropHourInterval","ltPropDefaultTime","ltPropMinuteInterval","ltPropDropdown","ltPropShowInterval","ltPropStartTime","ltPropEndTime","ltPropConvertToNearest","ltPropValidateOnBlur","ltPropFillRows","ltPropNumberOfRows","ltPropMinDate","ltPropMaxDate","ltPropStartWeekDay","ltPropMonthHeaderFormat","daysOfWeek","ltPropYear","ltPropFormat","viewDate","ltPropStartDate","ltPropEndDate","ltPropCurrentDate","ltPropBindToBody","ltPropCalendarClass","ltPropHeaderType","ltPropDropdownDisabled","ltPropDropdownShow","ltPropDropdownCallout","ltPropDropdownFreeze","ltPropDropdownId","ltPropDropdownClass","ltPropPosition","ltPropBoundary","ltPropWheel","ltPropYield","ltPropAnimate","ltPropPreventSelection","ltPropPreventKeys","ltPropUpdateDelay","ltPropAutoUpdate","ltPropCallbackDelay","ltPropCloseIcon","ltPropTimePlaceholder","ltPropCommonPlaceholder","ltPropTimeClass","ltPropAria","ltPropAriaAttributes","ltPropTimeAriaAttributes","ltPropFocus","ltPropCalendarProperties","ltPropDropdownProperties","ltPropScope","ltPropHeaderYield","ltPropConvertedDate","ltPropConvertedTime","ltPropPreventDropdownNavigation","ltPropInputWrapperClass","ltPropWrapperClass","ltPropTimezoneHandling","ltPropFocusAtEnd","ltPropPasswordIcon","ltPropPasswordVisibility","ltPropPasswordTooltip","ltPropTooltipConfig","ltPropAriaLabel","ltPropDataTabindex","ltPropLabelClass","ltPropDisabledTimeTooltip","ltPropIso","selectedField","endMinute","startMinute","dropdownData","originalData","dateRange","meridian","hour","min","selectedDateField","preventObs","resize","resizeClass","pos","isSearch","isBox","dateOrder","showPlaceholder","lyteUnbound","randomId","navigation","passwordClass","passwordTooltip","isExpanded"],

    init:function( frm_obs ){ 
        var data = this.data, type = data.ltPropType;
          if( type == 'time' || type == "datetime" ){
            this._prevent = true
            this.timeInValChange();
            this.startEndTimeObs();
            delete this._prevent;
            if( type.indexOf( 'time' ) != -1 && data.ltPropDropdown ){
                this.dropdownConstruct();
                if( type == "time" ) {
                    // data.ltPropDefaultTime = data.ltPropDefaultTime || data.ltPropValue;
                    this.setData( 'ltPropDefaultTime', data.ltPropDefaultTime || data.ltPropValue );
                } else if( !frm_obs ) {
                    var iso = data.ltPropIso;
                    if( iso ){
                        var __moment = $L.moment( new Date( iso ) );
                        this.setData( 'ltPropDefaultTime', __moment.format( ( data.ltPropTimeFormat == 12 ? "hh:mm A" : "HH:mm" ) ) );
                    }
                }
            }
          } 
          if( type == 'date' || type == "datetime" ){
            if( type == 'date' ) {
                // data.ltPropCurrentDate = data.ltPropCurrentDate || data.ltPropValue; 
                this.setData( 'ltPropCurrentDate', data.ltPropCurrentDate || data.ltPropValue );
            } 

            if( data.ltPropAria ){
                this.setData( 'randomId', "lyteInput_" + parseInt( Math.random() * 1e6 ) );
                Lyte.objectUtils( data.ltPropCalendarProperties, 'add', 'disableNavigation', false );
            }

            this.dateRegexFind();
          }

          if( !frm_obs ){
            this.$node.classList.add('lyteInput');
            this.$node.classList.add('horizontal');
          }

          if( this.getMethods( 'beforeRender' ) ) {
           /**
            * @method beforeRender
            * @version 1.0.1
            */
                this.executeMethod( 'beforeRender', this.$node );
            }
    },

    englishDate : function(){
        if( $L.moment && this.data ){
            var format = this.getCrctFormat(),
            date = this.data.ltPropCurrentDate,
            final = '';

            if( date ){
                final = $L.moment( date, format, { i18n : true } ).format( format );
            } 
            this.setData( 'ltPropConvertedDate', final );
        }
    },

    englishTime : function(){
        if( $L.moment && this.data ){
            var final = this.data.ltPropDefaultTime;

            if( this.data.ltPropTimeFormat == 12 ){
                var format = 'hh:mm A';
                final = $L.moment( final, format, { i18n : true } ).format( format );
            }
            this.setData( 'ltPropConvertedTime', final );
        }
    },

    didConnect:function(){
           var type = this.data.ltPropType/*, divIdInput= this.$node, lyteLabelDiv= this.$node.querySelector( '.lyteLabel' ),lyteFieldDiv= this.$node.querySelector( '.lyteField' )*/; 
           if( type == 'date' || type == "datetime" )
                { 
                    _lyteUiUtils.input = _lyteUiUtils.input || {};
                    this.$node._random = 'LyteInput' + Date.now();
                    _lyteUiUtils.input[ this.$node._random ] = this.$node;
                    this.englishDate();
                }   
            if(type == 'time' || type == "datetime" ){
                if(this.getData('ltPropDropdown')){
                    var drop = this.dropdown = this.$node.querySelector( 'lyte-dropdown' );
                    this.dropbox =  drop.component.childComp ? drop.component.childComp : drop.querySelector( 'lyte-drop-box' );
                    drop.element = this.$node.querySelectorAll( 'input' )[ type == 'datetime' ? 1 : 0 ];

                    if( this.data.ltPropDropdownShow ){
                        drop.resetPosition();
                    }

                }
                this.englishTime();
            }
            if(type == 'time' || type == 'date' || type == "datetime"){
                if(this.getData('ltPropWheel')){
                    var func = this.handleWheel.bind(this);
                    this.__eventListeners = { timeWheel : func };
                    this.$node.addEventListener('wheel', func);
                }
                this._manualset = true
                if( type == "time" ){
                    this.setData( 'ltPropValue', this.data.ltPropDefaultTime );
                } else if( type == "date" ) {
                    this.setData( 'ltPropValue', this.data.ltPropCurrentDate );
                } 
                delete this._manualset;
            }  
            type = type == "textarea" ? "textarea" : 'input';  
              [ 'focus', 'blur', 'click', 'select' ].forEach( function( item ){
                    this.$node[ item ] = function( arg ){
                      this.$node.querySelector( type )[item]( arg );
                    }.bind( this )      
              }.bind( this ) )                      
            if(this.getMethods('afterRender')){
               /**
                * @method afterRender
                * @version 1.0.1
                */                
                this.executeMethod('afterRender', this.$node);
            }
            $L.fastdom.measure( function(){
                this._dir = _lyteUiUtils.getRTL();
                if( this._dir ) {
                    $L.fastdom.mutate( function(){
                        this.$node.classList.add( 'lyteRTL' );
                        if( this.$node.calendarDiv ) {
                            this.$node.calendarDiv.classList.add( 'lyteRTL' );
                        }
                    }.bind( this ) )
                }   
            }.bind( this ) );
    },

    didDestroy : function( frm_obs ){
        if( !frm_obs && this.$node.calendarComp ){
            this.$node.calendarComp.remove();
            delete this.$node.calendarComp; 
            delete this.$node.calendarDiv;
            delete this._assCalendar;
            delete this.$node.revertToSelected;
        }
        var evt = this.__eventListeners || {}/*, type = this.getData('ltPropType')*/;
        // if(type == 'date' || type == "datetime" ){
            var __input = _lyteUiUtils.input || {};
            delete __input[ this.$node._random ];
        // }
        // if(type == 'time' || type == "datetime" ){
            delete this.dropdown; delete this.dropbox;
        // }
        if(evt.hasOwnProperty('mouseup')){
            document[ "removeEventListener" + ( _lyteUiUtils.isWidget ? "Global" : "" ) ]('mouseup', evt.mouseup);
        }   
    },

    rtlfunc : function( lft, bcr, ww ) {
        if( this._dir ) {
            if( bcr ) {
                if( lft == 'left' ) {
                    return ww - bcr.right;
                } else if( lft == 'clientX' ) {
                    return ww - bcr.clientX
                } else if( lft == 'offsetLeft' ) {
                    return ww - bcr.width - bcr.offsetLeft;
                }
                return ww - bcr.left;
            } else if( lft == 'left' ) {
                return 'right';
            } 
        }
        return bcr ? bcr[ lft ] : 'left';
    },

    calenderClickHide : function(event){
        if( !this.data.ltPropBindToBody ){
            return
        }
        var calendarComp = this.$node.calendarDiv, 
        tgt = event.target.correspondingElement || event.target;

        if( !document.contains( tgt ) ){
            tgt = window.document.documentElement;
        }

        if( calendarComp.classList.contains( 'lyteCalendarHidden' ) ){
            return;
        }
        if( tgt && [ "LYTE-DROP-BOX", "LYTE-DROP-ITEM", "LYTE-DROP-BODY" ].indexOf( tgt.tagName ) != -1 ) {
            while( tgt.tagName != "LYTE-DROP-BOX" && tgt.tagName != "BODY" ) {
                tgt = tgt.parentNode;
            }
            if( tgt.tagName == "LYTE-DROP-BOX" ) {
                tgt = tgt.origindd
            }
        }

        var is_contains_target = this.data.ltPropAria ? $L( tgt ).hasClass( 'lyteInputCalendarIcon' ) : this.$node.contains( tgt ),
        is_target_is_calendar = calendarComp.contains( tgt );

        if( !is_contains_target && !is_target_is_calendar ) {         
            this._hideCalendar();
        } else if( tgt && /*!tgt.classList.contains( 'lyteCalDateSpan' ) && !tgt.classList.contains( 'lyteCalCdate' ) &&*/ calendarComp.contains( tgt ) ) {
            !this.data.ltPropAria && window.requestAnimationFrame( function(){
                var $node = this.$node;
                this._byManual = true;
                $node && $node.focus();
                delete this._byManual;
            }.bind( this ) );
        }
    },

    scrollFunc : function(event){
        if( event && event.type == 'resize' && _lyteUiUtils.isMobile ) {
            return;
        }
        var thisCalendar = this.$node.calendarDiv;
         $L.fastdom.mutate(function(){
            event && event.type == "orientationchange" ? setTimeout( this.setCss.bind( this ), 500 ) : this.setCss();
             $L.fastdom.measure(function(){
                var boundary = this.data.ltPropBoundary, input = this.$node.getBoundingClientRect(), wwidth = window.innerWidth;
                if(thisCalendar && event && event.type == 'scroll' && !thisCalendar.classList.contains('lyteCalendarHidden')){
                    if((boundary.hasOwnProperty('left') ? ( this.rtlfunc.call( this, 'left', input, wwidth ) < boundary.left) : false) || (boundary.hasOwnProperty('right') ? ( this.rtlfunc.call( this, 'right', input, wwidth ) > boundary.right) : false)  || (boundary.hasOwnProperty('top') ? (input.top < boundary.top) : false)  || (boundary.hasOwnProperty('bottom') ? (input.bottom > boundary.bottom) : false))      
                        {  

                            this._hideCalendar( true );                        }
                 } else if( this._closedbyscrl ){
                    if( ( boundary.left != undefined ? ( this.rtlfunc.call( this, 'left', input, wwidth ) >= boundary.left ) : true ) && ( boundary.right != undefined ? ( this.rtlfunc.call( this, 'right', input, wwidth ) <= boundary.right ) : true )  && ( boundary.top != undefined ? (input.top >= boundary.top) : true )  && (boundary.bottom != undefined ? ( input.bottom <= boundary.bottom ) : true ) ){
                        this._byManual = true;
                        this.$node.focus();
                        delete this._byManual;
                        this.showCalendar( {}, this.$node.querySelector( 'input' ) );
                        delete this._closedbyscrl;
                    }    
                 }
             }.bind(this))  
         }.bind(this))
    },

    textareaFuncObs : function(){
        var __this = this,
        __data = __this.data;

        if( __data.ltPropType == "textarea" ){
            var resize = __data.ltPropTextAreaResize,
            __horizontal = resize.horizontal,
            __vertical = resize.vertical,
            to_value = ( __horizontal || __vertical ),
            __class = "lyteTextareaResize",
            vert = 'lyteTextareaResizeVertical',
            hori = 'lyteTextareaResizeHorizontal';

            this.setData( 'resize', to_value );

            if( !to_value ){
                $L( this.$node ).addClass( 'lyteTextareaNoResize' );
            }

            if( __horizontal && !__vertical ){
                __class += ( " " + hori );
            } else if( __vertical && !__horizontal ){
                __class += ( " " + vert );
            }

            this.setData( 'resizeClass', __class )
        }
    }.observes( 'ltPropTextAreaResize', 'ltPropTextAreaResize.{}' ).on( 'didConnect' ),

    btobody : function( arg ){
        if( !arg.newValue ){
            delete this.$node.revertToToday;
        }
    }.observes( 'ltPropBindToBody' ),

    disAbs : function(){
        this.$node.classList[ this.data.ltPropDisabled ? 'add' : 'remove' ]( 'lyteInputDisabled' );
    }.observes( 'ltPropDisabled' ).on( 'didConnect' ),

    readAbs : function(){
        this.$node.classList[ this.data.ltPropReadonly ? 'add' : 'remove' ]( 'lyteInputReadonly' );
    }.observes( 'ltPropReadonly' ).on( 'didConnect' ),

    rsizefun : function( evt ){
        var isTch = evt.touches,
        ev = evt,
        cb = "onResizeStart",
        __this = this,
        __data = __this.data,
        $node = __this.$node;

        if( isTch && isTch.length > 1 ){
            return;
        } else if( isTch ){
            ev = isTch[ 0 ];
        }

        if( __this.getMethods( cb ) && __this.executeMethod( cb, evt, $node ) == false ){
            return;
        }

        var tagName = 'getElementsByTagName',
        textarea = $node[ tagName ]( 'textarea' )[ 0 ],
        resize = __data.ltPropTextAreaResize || {},
        __doc = document,
        __add = 'addEventListener',
        label = $node[ tagName ]( 'label' )[ 0 ],
        gbcr = "getBoundingClientRect",
        label_bcr = label ? label[ gbcr ]() : {},
        bcr = textarea[ gbcr ](),
        this_bcr = $node[ gbcr ](),
        comp_style = getComputedStyle( textarea ),
        paddingLeft = parseFloat( comp_style.paddingLeft ),
        fn = function( __min, prop ){
            var __value = comp_style[ __min ];

            if( /%$/.test( __value ) ){
                return this_bcr[ prop ] * parseFloat( __value ) / 100;
            } else {
                return parseFloat( __value );
            }

        },
        __obj = {},
        __obj1 = {},
        __obj2 = {},
        __obj3 = {};

        if( resize.horizontal ){
            __this.__minwidth = fn( "minWidth", 'width' );
            __this.__maxwidth = fn( "maxWidth", 'width' );

            __obj.width = this_bcr.width;
            __obj1.width = bcr.width;
            __obj2.width = __obj2.minWidth = label_bcr.width;
            __obj3.width = __obj3.minWidth = "auto";
        }

        if( resize.vertical ){
            __this.__minheight = fn( "minHeight", 'height' );
            __this.__maxheight = fn( "maxHeight", 'height' );

            __obj.height = this_bcr.height;
            __obj1.height = bcr.height;
            __obj2.height = label_bcr.height;
            __obj3.height = "auto";
        }

        __this.__clientX = ev.clientX;
        __this.__clientY = ev.clientY;

        if( _lyteUiUtils.isWidget ){
            __add += "Global";
        }

        __doc[ __add ]( isTch ? 'touchmove' : "mousemove", __this.__rmove = __this.textareaResize.bind( __this ), true );
        __doc[ __add ]( isTch ? 'touchend' : 'mouseup', __this.__rend = __this.mouseup.bind( __this ), true );

        $L( $node ).addClass( 'resizeStart' ).css( __obj );
        $L( textarea ).css( __obj1 ).parent().css( __obj3 );
        $L( label ).css( __obj2 );

        evt.preventDefault();
        return false;
     }, 

     mouseup : function( evt ){
        var __doc = document,
        __remove = "removeEventListener",
        isTch = evt.type == "touchend",
        cb = "onResizeEnd",
        __this = this,
        $node = __this.$node;

         $L( $node ).removeClass( 'resizeStart' );

         if( _lyteUiUtils.isWidget ){
            __remove += "Global";
         }

        __doc[ __remove ]( isTch ? "touchmove" : "mousemove", __this.__rmove, true );
        __doc[ __remove ]( isTch ? "touchend" : "mouseup", __this.__rend, true );

        __this.getMethods( cb ) && __this.executeMethod( cb, evt, __this._resize_move, $node );

        [ '__minwidth', '__minheight', '__maxheight', '__maxwidth', '__clientY', '__clientX', '_resize_move', '__remove', '__rend' ].forEach( function( item ){
            delete __this[ item ];
        });
     },

     textareaResize : function( evt ){
        var __this = this,
        __data = __this.data,
        isTch = evt.touches,
        ev = evt;

        if( isTch && isTch.length > 1 ){
            return;
        } else if( isTch ){
            ev = isTch[ 0 ];
            evt.preventDefault();
        }

        __this._resize_move = true;

        var xInc = -( __this.__clientX - ( __this.__clientX = ev.clientX ) ) * ( this._dir ? -1 : 1 ) ,
        yInc = -( __this.__clientY - ( __this.__clientY = ev.clientY ) ),
        __obj = {},
        __obj1 = {},
        __setData = {},
        resize = __data.ltPropTextAreaResize || {},
        textarea = __this.$node.getElementsByTagName( 'textarea' )[ 0 ],
        $node = __this.$node,
        fn = function( prop, __min, __max, inc ){
            var current = parseFloat( textarea.style[ prop ] ),
            __new = current + inc;

            if( !isNaN( __min ) ){
                if( __min > __new ){
                    inc = __min - current;
                    __new = current + inc;
                }
            }

            if( !isNaN( __max ) ){
                if( __max < __new ){
                    inc = __max - current;
                }
            }

            __obj[ prop ] = current + inc;
            __obj1[ prop ] = parseFloat( $node.style[ prop ] ) + inc;
        },
        cb = "onResize";

        if( resize.horizontal ){
           fn( 'width', __this.__minwidth, __this.__maxwidth, xInc );
           __setData.ltPropWidth = __obj1.width + 'px';
        }

        if( resize.vertical ){
           fn( 'height', __this.__minheight, __this.__maxheight, yInc );
           __setData.ltPropHeight = __obj.height + 'px';
        }

        $L( $node ).css( __obj1 );
        $L( textarea ).css( __obj );

        __this._prevent = true;
        __this.setData( __setData );
        delete __this._prevent;

        /**
         * @method onResize
         * @version 3.110.0
         * @condition ltPropType textarea
         */  
        __this.getMethods( cb ) && __this.executeMethod( cb, evt, $node );
     },

    heightFuncObs : function( arg ){
        this.heightFunc();
    }.observes('ltPropHeight').on('didConnect'),

    heightFunc : function(){
        if( !this._prevent ){
            $L( 'input,textarea', this.$node ).eq( 0 ).css( 'height', this.getData( 'ltPropHeight' ) ); 
        }
     },

    widthfunObs : function(){
        this.widthfun();
    }.observes( 'ltPropWidth' ).on( 'didConnect' ),

    widthfun : function (){
        if( !this._prevent ){
            this.$node.style.width = this.getData( 'ltPropWidth' );
        }
    },

    appearanceFunObs : function(){
        this.appearanceFun();
    }.observes('ltPropAppearance').on('didConnect'),

    appearanceFun : function () {
        var type = this.data.ltPropType, 
        $node = $L( this.$node );

        if( this.getData( 'ltPropAppearance' ) == 'box' ) {
            if(type =='search') {
                $node.find( '.lyteField' ).addClass( 'lyteInputBoxSearch' );
            }

            $node.addClass( 'lyteInputBox' ).removeClass( 'lyteInput' );
        } else {
            if(type =='search') {
                $node.find( '.lyteField' ).removeClass( 'lyteInputBoxSearch' );
            }

            $node.addClass( 'lyteInput' ).removeClass( 'lyteInputBox' );
        }       
    },

    directionfunObs : function(){
        this.directionfun();
    }.observes('ltPropDirection').on('didConnect'),

    directionfun : function (){
        var $node = $L( this.$node );

        if( this.data.ltPropDirection == 'vertical' ){
            $node.addClass( 'vertical' ).removeClass( 'horizontal' );
        } else {
            $node.removeClass( 'vertical' ).addClass( 'horizontal' );
        }
    },
    data : function(){

        var default_values = _lyteUiUtils.getDefault( 'lyte-input' ),
        __boolean = "boolean",
        __string = "string",
        __number = "number",
        __object = "object",
        __array = "array",
        __value;

        return {
           /**
            * @componentProperty {boolean} ltPropDisabled=false
            * @version 1.0.0
            */            
            ltPropDisabled : Lyte.attr( __boolean, { default : false }),
           /**
            * @componentProperty {boolean} ltPropAutofocus=false
            * @version 1.0.0
            */            
            ltPropAutofocus : Lyte.attr( __boolean, { default : false }),
           /**
            * @componentProperty {on | off} ltPropAutocomplete=off
            * @version 1.0.0
            */            
            ltPropAutocomplete : Lyte.attr( __string, { default : default_values.autocomplete || 'off' }),
           /**
            * @componentProperty {number} ltPropMaxlength
            * @minValue 0
            * @version 1.0.0
            */            
            ltPropMaxlength : Lyte.attr( __number, { default : default_values.maxlength }),
           /**
            * @componentProperty {string} ltPropName=''
            * @version 1.0.0
            */            
            ltPropName : Lyte.attr( __string, { default : '' }),
           /**
            * @componentProperty {string} ltPropPlaceholder=''
            * @version 1.0.0
            */            
            ltPropPlaceholder : Lyte.attr( __string, { default : '' }),
           /**
            * @componentProperty {boolean} ltPropReadonly=false
            * @version 1.0.0
            */            
            ltPropReadonly : Lyte.attr( __boolean, { default : false }),
           /**
            * @componentProperty {string} ltPropValue=''
            * @condition ltPropType text,password,textarea,number
            * @version 1.0.0
            */            
            ltPropValue : Lyte.attr( __string, { default : '' }),
           /**
            * @componentProperty {string} ltPropWidth=''
            * @version 1.0.0
            */            
            ltPropWidth : Lyte.attr( __string, { default : default_values.width || '' }),
           /**
            * @componentProperty {string} ltPropTabIndex=0
            * @version 1.0.0
            */            
            ltPropTabIndex : Lyte.attr( __string, { default : default_values.tabIndex || '0' }),
           /**
            * @componentProperty {text | number | password | date | time | textarea | datetime} ltPropType=text
            * @version 1.0.0
            */            
            ltPropType : Lyte.attr( __string, { default : '' }),
           /**
            * @componentProperty {flat | box} ltPropAppearance=flat
            * @version 1.0.0
            */            
            ltPropAppearance : Lyte.attr( __string, { default : default_values.appearance || '' }),
           /**
            * @componentProperty {vertical | horizontal} ltPropDirection=vertical
            * @version 1.0.0
            */            
            ltPropDirection : Lyte.attr( __string, { default : default_values.direction || 'vertical' }),
           /**
            * @componentProperty {string} ltPropLabel=''
            * @version 1.0.0
            */            
            ltPropLabel : Lyte.attr( __string, { default : '' }),
           /**
            * @componentProperty {string} ltPropId=''
            * @version 1.0.0
            */            
            ltPropId : Lyte.attr( __string, { default : '' }),
           /**
            * @componentProperty {string} ltPropClass=''
            * @version 1.0.0
            */            
            ltPropClass : Lyte.attr( __string, { default : default_values.class || '' }),
           /**
            * @componentProperty {string} ltPropStyle=''
            * @version 1.0.0
            */            
            ltPropStyle : Lyte.attr( __string, { default : default_values.style || '' }),
           /**
            * @componentProperty {string} ltPropWrapperStyle=''
            * @version 1.0.0
            */            
            ltPropWrapperStyle : Lyte.attr( __string, { default : default_values.wrapperStyle || '' }),
           /**
            * @componentProperty {string} ltPropHeight=''
            * @version 1.0.0
            */            
            ltPropHeight : Lyte.attr( __string, { default : default_values.height || '' }),
           /**
            * @componentProperty {string} ltPropPattern='.+'
            * @version 1.0.2
            */            
            ltPropPattern : Lyte.attr( __string, { default : default_values.pattern || '.+' }),
           /**
            * @componentProperty {string} ltPropInputTitle=''
            * @version 1.0.2
            */            
            ltPropInputTitle : Lyte.attr( __string, { default : '' }),

            // data for textarea
           /**
            * @componentProperty {number} ltPropRows
            * @version 1.0.0
            * @condition ltPropType textarea
            */            
            ltPropRows : Lyte.attr( __number, { default : void 0 }),
           /**
            * @componentProperty {number} ltPropCols
            * @version 1.0.0
            * @condition ltPropType textarea
            */            
            ltPropCols : Lyte.attr( __number, { default : void 0 }),
            /**
             * @typedef {object} inputResize
             * @property {boolean} vertical=true
             * @property {boolean} horizontal=true
             */

            /**
             * @componentProperty {inputResize} ltPropTextAreaResize
             * @version 1.0.0
             * @condition ltPropType textarea
             */            
            ltPropTextAreaResize : Lyte.attr( __object, { default : default_values.textAreaResize || { vertical : true, horizontal : true } }),

            // data for number
           /**
            * @componentProperty {number} ltPropMax
            * @version 1.0.0
            * @condition ltPropType number
            */            
            ltPropMax : Lyte.attr( __number, { default : void 0 }),  
           /**
            * @componentProperty {number} ltPropMin
            * @version 1.0.0
            * @condition ltPropType number
            */                      
            ltPropMin : Lyte.attr( __number, { default : void 0 }),
           /**
            * @componentProperty {number} ltPropStep=1
            * @version 1.0.0
            * @condition ltPropType number
            */                        
            ltPropStep : Lyte.attr( __number ,{ default : default_values.step || 1 }),

            // data for time
           /**
            * @componentProperty {12 | 24} ltPropTimeFormat=12
            * @version 1.0.0
            * @condition ltPropType number
            */            
            ltPropTimeFormat : Lyte.attr( __number, { default : default_values.timeFormat || 12 }),
           /**
            * @componentProperty {number} ltPropHourInterval=1
            * @version 1.0.0
            * @mandatory
            * @condition ltPropType time,datetime
            */            
            ltPropHourInterval : Lyte.attr( __number, { default : default_values.hourInterval || 1 }),
           /**
            * @componentProperty {string} ltPropDefaultTime=''
            * @version 1.0.0
            * @condition ltPropType time,datetime
            * @format HH:mm
            * @format hh:mm A
            */           
            ltPropDefaultTime : Lyte.attr( __string, { default : '' }),
           /**
            * @componentProperty {number} ltPropMinuteInterval=30
            * @mandatory
            * @version 1.0.0
            * @condition ltPropType time,datetime
            */            
            ltPropMinuteInterval : Lyte.attr( __number, { default : default_values.minuteInterval || 30 }),
           /**
            * @componentProperty {boolean} ltPropDropdown=false
            * @version 1.0.0
            * @condition ltPropType time,datetime
            */            
            ltPropDropdown : Lyte.attr( __boolean, { default : default_values.dropdown || false }),
           /**
            * @componentProperty {boolean} ltPropShowInterval=false
            * @version 1.0.0
            * @condition ltPropType time,datetime
            */            
             ltPropShowInterval : Lyte.attr( __boolean, { default : default_values.showInterval || false }),
           /**
            * @componentProperty {string} ltPropStartTime=''
            * @version 1.0.0
            * @condition ltPropType time,datetime
            */
            ltPropStartTime : Lyte.attr( __string, { default : default_values.startTime || '' }),
           /**
            * @componentProperty {string} ltPropEndTime=''
            * @version 1.0.0
            * @condition ltPropType time,datetime
            */
            ltPropEndTime : Lyte.attr( __string, { default : default_values.endTime || '' }),
             /**
            * @componentProperty {boolean} ltPropConvertToNearest=false
            * @version 2.2.14
            * @condition ltPropType time,datetime
            */
            ltPropConvertToNearest : Lyte.attr( __boolean, { default : default_values.convertToNearest || false }),
             /**
            * @componentProperty {boolean} ltPropValidateOnBlur=false
            * @version 2.2.14
            * @condition ltPropType time,datetime
            */
            ltPropValidateOnBlur : Lyte.attr( __boolean, { default : default_values.validateOnBlur || false }),

            // data for calendar
            ltPropFillRows : Lyte.attr( __boolean, { default : ( __value = default_values.fillRows ) == void 0 ? true : default_values }),
            ltPropNumberOfRows : Lyte.attr( __number, { default : default_values.numberOfRows || 6 }),
            ltPropMinDate : Lyte.attr( __string, { default : "" }),
            ltPropMaxDate : Lyte.attr( __string, { default : "" }),
            ltPropStartWeekDay : Lyte.attr( __number, { default : default_values.startWeekDay || 1 } ),
            ltPropMonthHeaderFormat : Lyte.attr( __string, { default: default_values.monthHeaderFormat || 'MMMM YYYY' } ),
            daysOfWeek : Lyte.attr( __array, { default : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat' ] } ),
            ltPropYear : Lyte.attr( __boolean, { default : ( __value = default_values.year ) == void 0 ? true : __value } ),
            ltPropFormat : Lyte.attr( __string, { default : default_values.format || "MM/DD/YYYY" }),
            viewDate : Lyte.attr( __object, { default : {} }),
            ltPropStartDate : Lyte.attr( __string, { default : '' }),
            ltPropEndDate : Lyte.attr( __string, { default : ''}),
            ltPropCurrentDate : Lyte.attr( __string, { default : ''}),
            /**
            * @componentProperty {boolean} ltPropBindToBody=true
            * @version 2.1.0
            * @condition ltPropType time,date,datetime
            */
            ltPropBindToBody : Lyte.attr( __boolean, { default : ( __value = default_values.bindToBody ) == void 0 ? true : __value }),
           /**
            * @componentProperty {string} ltPropCalendarClass=''
            * @version 2.1.0
            * @condition ltPropType date,datetime
            */
            ltPropCalendarClass : Lyte.attr( __string, { default : default_values.calendarClass || "" }),
            ltPropHeaderType : Lyte.attr( __string, { default : default_values.headerType || "default" }),

            // data for dropdown
           /**
            * @componentProperty {boolean} ltPropDropdownDisabled=false
            * @version 1.0.2
            * @condition ltPropType time,datetime
            * @condition ltPropDropdown true
            */
            ltPropDropdownDisabled : Lyte.attr( __boolean, { default : false}),
           /**
            * @componentProperty {boolean} ltPropDropdownShow=false
            * @version 1.0.2
            * @condition ltPropType time,datetime
            * @condition ltPropDropdown true
            */
            ltPropDropdownShow : Lyte.attr( __boolean, { default : false}),
           /**
            * @componentProperty {boolean} ltPropDropdownCallout=false
            * @version 2.0.0
            * @condition ltPropType time,datetime
            * @condition ltPropDropdown true
            */
            ltPropDropdownCallout : Lyte.attr( __boolean, { default : false }),
           /**
            * @componentProperty {boolean} ltPropDropdownFreeze=false
            * @version 1.0.2
            * @condition ltPropType time,datetime
            * @condition ltPropDropdown true
            */
            ltPropDropdownFreeze : Lyte.attr( __boolean, { default : ( __value = default_values.dropdownFreeze ) == void 0 ? false : __value }),
           /**
            * @componentProperty {string} ltPropDropdownId=''
            * @version 2.2.2
            * @condition ltPropType time,datetime
            * @condition ltPropDropdown true
            */
            ltPropDropdownId : Lyte.attr( __string, { default : '' }),
           /**
            * @componentProperty {string} ltPropDropdownClass=''
            * @version 2.2.2
            * @condition ltPropType time,datetime
            * @condition ltPropDropdown true
            */
            ltPropDropdownClass : Lyte.attr( __string, { default : default_values.dropdownClass || '' }),

            // for dropdown and calendar
            ltPropPosition : Lyte.attr( __string, { default : default_values.position || 'down'}),
            /**
			 * @typedef {object} boundary
			 * @property {number} left
			 * @property {number} right
			 * @property {number} top
			 * @property {number} bottom
			 */
            /**
             * @componentProperty {boundary} ltPropBoundary
             * @default {}
             * @version 2.2.2
             * @condition ltPropType date,datetime
             */
            ltPropBoundary : Lyte.attr( __object, { default : default_values.boundary || {} }),

            // for date and time
            /**
            * @componentProperty {boolean} ltPropWheel=false
            * @version 2.0.0
            * @condition ltPropType time,datetime,date
            */
            ltPropWheel : Lyte.attr( __boolean, { default : default_values.wheel || false } ),
           /**
            * @componentProperty {boolean} ltPropYield=false
            * @version 1.0.2
            * @condition ltPropType time,datetime,date
            */
            ltPropYield : Lyte.attr( __boolean, { default : default_values.yield || false}),
            ltPropAnimate : Lyte.attr( __boolean, { default : default_values.animate || false }),
           /**
            * @componentProperty {boolean} ltPropPreventSelection=false
            * @version 2.2.9
            * @condition ltPropType date
            */
            ltPropPreventSelection : Lyte.attr( __boolean, { default : default_values.preventSelection || false }),
           /**
            * @componentProperty {boolean} ltPropPreventKeys=false
            * @version 2.2.11
            * @condition ltPropType date
            */
            ltPropPreventKeys : Lyte.attr( __boolean, { default : default_values.preventKeys || false }),
           /**
            * @componentProperty {number} ltPropUpdateDelay=250
            * @version 2.0.0
            */
            ltPropUpdateDelay : Lyte.attr( __number, { default : default_values.hasOwnProperty( 'updateDelay' ) ? default_values.updateDelay : 250 }),
           /**
            * @componentProperty {boolean} ltPropAutoUpdate=true
            * @version 1.0.2
            * @default true
            */
            ltPropAutoUpdate : Lyte.attr( __boolean, { default : ( __value = default_values.autoUpdate ) == void 0 ? true : __value }),
           /**
            * @componentProperty {number} ltPropCallbackDelay=0
            * @version 2.2.8
            */
            ltPropCallbackDelay : Lyte.attr( __number, { default : default_values.hasOwnProperty( 'callbackDelay' ) ? default_values.callbackDelay : 0 }),
           /**
            * @componentProperty {boolean} ltPropCloseIcon=false
            * @version 2.0.0
            * @condition ltPropType date,text,password,number
            */
            ltPropCloseIcon : Lyte.attr( __boolean, { default : default_values.closeIcon || false }),

            // datetime type
            /**
             * @experimental ltPropTimePlaceholder
             */
            ltPropTimePlaceholder : Lyte.attr( 'string', { default : "" }),

            ltPropCommonPlaceholder : Lyte.attr( 'string', { default : '' }),
            /**
             * @experimental ltPropTimeClass
             */
            ltPropTimeClass : Lyte.attr( __string, { default : default_values.timeClass || "" }),

            // aria
           /**
            * @componentProperty {boolean} ltPropAria=false
            * @version 3.1.0
            */
            ltPropAria : Lyte.attr( __boolean, { default : default_values.aria || false }),
           /**
            * @componentProperty {object} ltPropAriaAttributes
            * @version 3.1.0
            * @default {}
            */
            ltPropAriaAttributes : Lyte.attr( __object, { default : default_values.ariaAttributes || {}, watch : true }),

            ltPropTimeAriaAttributes : Lyte.attr( __object, { default : default_values.timeAriaAttributes || {}, watch : true } ),
           /**
            * @componentProperty {boolean} ltPropFocus=false
            * @version 3.2.0
            */
            ltPropFocus : Lyte.attr( __boolean, { default : false }),
           /**
            * @componentProperty {object} ltPropCalendarProperties
            * @version 2.2.20
            * @default {}
            * @component lyte-calendar
            * @condition ltPropType date,datetime
            */

            ltPropCalendarProperties : Lyte.attr( __object, { default : default_values.calendarProperties || { disableNavigation : true } }),
           /**
            * @componentProperty {object} ltPropDropdownProperties
            * @version 2.2.20
            * @default {}
            * @component lyte-dropdown
            * @condition ltPropType time,datetime
            * @condition ltPropDropdown true
            */

            ltPropDropdownProperties : Lyte.attr( __object, { default : default_values.dropdownProperties || {} }),

           /**
            * @componentProperty {string} ltPropScope=''
            * @version 2.2.20
            * @condition ltPropType date,datetime
            */

            ltPropScope : Lyte.attr( __string, { default : default_values.scope || "" }),

           /**
            * @componentProperty {boolean} ltPropHeaderYield=false
            * @version 3.20.0
            * @condition ltPropType date,datetime
            */

            ltPropHeaderYield : Lyte.attr( __boolean, { default : default_values.headerYield || false }),

           /**
            * @componentProperty {string} ltPropConvertedDate=''
            * @version 3.20.0
            * @condition ltPropType date,datetime
            */

            ltPropConvertedDate : Lyte.attr( __string, { default : '' }),

           /**
            * @componentProperty {string} ltPropConvertedTime=''
            * @version 3.20.0
            * @condition ltPropType date,datetime
            */

            ltPropConvertedTime : Lyte.attr( __string, { default : '' }),

            /**
            * @componentProperty {boolean} ltPropPreventDropdownNavigation=false
            * @version 3.28.0
            * @condition ltPropType date,datetime
            * @condition ltPropDropdown true
            */

            ltPropPreventDropdownNavigation : Lyte.attr( __boolean, { default : default_values.preventDropdownNavigation || false }),

            /**
            * @componentProperty {string} ltPropInputWrapperClass=""
            * @version 3.30.0
            */
            ltPropInputWrapperClass : Lyte.attr( __string, { default : default_values.inputWrapperClass || '' }),

            /**
            * @componentProperty {string} ltPropWrapperClass=""
            * @version 3.32.0
            */
            ltPropWrapperClass : Lyte.attr( __string, { default : default_values.wrapperClass || "" }),

            ltPropTimezoneHandling : Lyte.attr( __boolean, { default : default_values.timezoneHandling || false }),

           /**
            * @componentProperty {boolean} ltPropFocusAtEnd=false
            * @version 3.86.0
            */
            ltPropFocusAtEnd : Lyte.attr( __boolean, { default : false } ),

            /**
            * @componentProperty {boolean} ltPropPasswordIcon=false
            * @version 3.91.0
            * @condition ltPropType password
            */
            ltPropPasswordIcon : Lyte.attr( __boolean, { default : false } ),
            /**
            * @componentProperty {boolean} ltPropPasswordVisibility=false
            * @version 3.91.0
            * @condition ltPropType password
            */
            ltPropPasswordVisibility : Lyte.attr( __boolean, { default : false } ),
            /**
             * @typedef {object} passwordTooltip
             * @property {string} show="Show password"
             * @property {string} hide="Hide password"
             */

            /**
            * @componentProperty {passwordTooltip} ltPropPasswordTooltip=false
            * @version 3.91.0
            * @condition ltPropType password
            */
            ltPropPasswordTooltip : Lyte.attr( __object, { default : {
                show : "Show password",
                hide : "Hide password"
            } } ),
            /**
            * @componentProperty {string} ltPropTooltipConfig='{"position" : "bottom"}'
            * @version 3.91.0
            * @condition ltPropType password
            */
            ltPropTooltipConfig : Lyte.attr( __string, { default : '{"position" : "bottom"}' } ),
            /**
             * @typedef {object} ariaLabel
             * @property {string} modal="Choose date"
             * @property {string} button="Change date"
             */

            /**
            * @componentProperty {ariaLabel} ltPropAriaLabel
            * @version 3.91.0
            */
            ltPropAriaLabel : Lyte.attr( __object, { default : { modal : "Choose date", button : "Change date" } } ), 
           /**
            * @componentProperty {string} ltPropDataTabindex = 0
            * @version 3.91.0
            */
            ltPropDataTabindex : Lyte.attr( __string, { default : "0" } ),
            /**
             * @componentProperty {string} ltPropLabelClass=""
             * @version 3.98.0
             */
            ltPropLabelClass : Lyte.attr( __string, { default : "" } ),

            /**
             * @componentProperty {string} ltPropDisabledTimeTooltip
             * @version 3.103.0
             * @condition ltPropType time,datetime
             */
            ltPropDisabledTimeTooltip : Lyte.attr( __string, { default : "" } ),

            ltPropIso : Lyte.attr( 'string' ),

            // system data

            selectedField : Lyte.attr( __object, { default : {}}),
            endMinute : Lyte.attr( __number ),
            startMinute : Lyte.attr( __number ),
            dropdownData : Lyte.attr( __array, { default : []}),
            originalData : Lyte.attr( __array, { default : []}),
            dateRange : Lyte.attr( __object, { default : { day : [], month : [], year : []}}),
            // Dont change this property name. Already some people from crm using this for passing their custom translations
            meridian : Lyte.attr( __object, { default : {AM : (_lyteUiUtils ? _lyteUiUtils.i18n('AM') : 'AM'), PM : (_lyteUiUtils ? _lyteUiUtils.i18n('PM') : 'PM')}}),
            hour : Lyte.attr( __string, { default : _lyteUiUtils.i18n('hour')}),
            min : Lyte.attr( __string, { default : _lyteUiUtils.i18n('min')}),
            selectedDateField : Lyte.attr( __string, { default : ""}),
            preventObs : Lyte.attr( __boolean, { default : true}),
            resize : Lyte.attr( __boolean, { default : true}),
            resizeClass : Lyte.attr( __string, { default : "lyteTextareaResize" } ),
            pos : Lyte.attr( __string, { default : ""}),
            isSearch : Lyte.attr( __boolean, { default : false }),
            isBox : Lyte.attr( __string, { default : '' }),
            dateOrder : Lyte.attr( __array, { default : [] }),
            showPlaceholder : Lyte.attr( __boolean, { default : false }),

            lyteUnbound : Lyte.attr( __boolean, { default : false }),

            randomId : Lyte.attr( __string, { default : "" } ),

            navigation : Lyte.attr( __boolean, { default : false } ),
            passwordClass : Lyte.attr( __string, { default : "lyteInputShowPasswordIcon" } ),
            passwordTooltip : Lyte.attr( __string, { default: "" } ),

            isExpanded : Lyte.attr( __string, { default : "false" } )
        }
},

    input_wrap_obs : function( arg ){
        var oldValue = ( arg || { oldValue : "" } ).oldValue,
        newValue = this.data.ltPropInputWrapperClass,
        __$node = $L( this.$node );

        __$node.removeClass( oldValue ).addClass( newValue );

        if( !arg && this.data.ltPropAria && /date/i.test( this.data.ltPropType ) ){
            __$node.addClass( "lyteInputWithCalendarIcon" );
        }

    }.observes( 'ltPropInputWrapperClass' ).on( 'didConnect' ),

    focusObs : function(){
        var __data = this.data,
        $node = this.$node;

        if( __data.ltPropFocus ){
            $node.focus();
            
            if( __data.ltPropFocusAtEnd ){
                var elem = $node.getElementsByTagName( __data.ltPropType == "textarea" ? "textarea" : "input" )[ 0 ];

                if( elem ){
                    window.requestAnimationFrame( function(){
                        elem.selectionStart = elem.value.length;
                    } );
                }
            }
        }
        // this.data.ltPropFocus = false
        $node.ltProp( 'focus', false );

    }.observes( 'ltPropFocus').on( 'didConnect' ),

    boxObs : function( arg ){
        var type = this.data.ltPropType,
        appearance = this.data.ltPropAppearance;

        if( type == "search" && appearance == "box" ){
            this.setData( 'isBox', 'lyteInputBoxSearch' );
        } else {
            this.setData( 'isBox', '' );
        }

        if( arg && arg.item == "ltPropType" ){
            this.didDestroy( true );
            this.init( true );
            this.didConnect( true );
        }

    }.observes( 'ltPropType', 'ltPropAppearance' ).on( 'init' ),

    getDateFromFormat:function(tdate,format){

        var is_i18n = this.data.ltPropCalendarProperties.i18n;

        if( is_i18n ){
            return $L.moment( tdate ).i18N( format ); 
        } else {
            return this._assCalendar.component.getDateFromFormat(tdate, format);
        }

    },

    dateValidation : function(date){
        if( !this._assCalendar ){
            return false;
        }
        var timeObj = this._assCalendar.component.isoToDate( date );
         if( timeObj == 'Invalid Date'){
            return false
         }
         return timeObj;
    },

   dateRegexFind : function(arg){
        var format = this.getCrctFormat(), 
        dateRange = this.getData('dateRange'),
        dateOrder = [];
        
        var dayReg = /D+/ig.exec(format), monthReg = /M+/ig.exec(format), yearReg = /Y+/ig.exec(format);
        if( dayReg ){
            dateRange.day[0] = dayReg.index; dateRange.day[1] = dayReg.index + dayReg[0].length;
            dateOrder.push( { value : dateRange.day[ 0 ], name : "day", format : format.match( /D+/ig )[ 0 ] } );
        }
        if( monthReg ){
            dateRange.month[0] = monthReg.index; dateRange.month[1] = monthReg.index + monthReg[0].length;
            dateOrder.push( { value : dateRange.month[ 0 ], name : "month", format : format.match( /M+/ig )[ 0 ] } );
        }
        if( yearReg ){
            dateRange.year[0] = yearReg.index; dateRange.year[1] = yearReg.index + yearReg[0].length;
            dateOrder.push( { value : dateRange.year[ 0 ], name : "year", format : format.match( /Y+/ig )[ 0 ] } )
        }
        dateOrder.sort( function( a, b ){
            return a.value - b.value;
        } )
        this.setData( 'dateOrder', dateOrder );
    },

    dateRegexObs : function( arg ){
        this.dateRegexFind( arg );
    }.observes('ltPropFormat'),

    closeIconObs : function( arg ){
        
        if( this.data.ltPropCloseIcon ){
            this.$node.classList.add( 'lyteInputWithClearIcon' );
        } else {
            this.$node.classList.remove( 'lyteInputWithClearIcon' );
        }
        
    }.observes( 'ltPropCloseIcon' ).on( 'didConnect' ),

    constructingArr : function(i, startTime, format){
        if(i < startTime){
            i += 1440;
        }
        var interval = (i - startTime) / 60,
        temp = {};
        temp.time = this.convertToRailway(i, true, format).trim();
        temp.interval = interval < 1 ? ((i - startTime) + ' '+ this.getData('min')) : ((interval % 1 == 0 ? interval : interval.toFixed(1)) + ' ' + this.getData('hour'));
        return temp;
    },

    dropdownConstruct : function(){
        if( this._prevent ) {
            return
        }
        var startTime = this.getData('startMinute'), i, temp = [], endTime = this.getData('endMinute'), hrInter = this.getData('ltPropHourInterval'), minInt = this.getData('ltPropMinuteInterval'), format = this.getData('ltPropTimeFormat'),
        arr = [],
        disabled_list = ( this.data.ltPropDropdownProperties || {} ).disabledList || [],
        __title = this.data.ltPropDisabledTimeTooltip;

        if(startTime >= endTime){
            endTime += 1440;
        }
        for(i = startTime; i <= endTime; i += minInt){
             var current = this.constructingArr(i, startTime, format),
             __time = current.time;

             if( arr.indexOf( __time ) == -1 ){
                 temp.push( current );
                 arr.push( __time );
             }

             if( disabled_list.indexOf( __time ) + 1 ){
                current.title =__title;
                current.customTooltip = "true"
             } else {
                current.title = current.customTooltip = false;
             }
        }

        if( this.data.ltPropTimezoneHandling ){
            this.check_dst( temp );
        }
        this.setData('originalData', temp);

        if( this.data.ltPropDropdownShow ){
            this.setData( 'dropdownData', temp );
        }
    },

    constructNewDrop : function(input, format){
        var temp = [], startTime = this.getData('startMinute');
        if(format == 12){
            var min = this.convertToRailway(input.value.trim());
            var ret = this.maxValCheck(min);
            if(ret != false){
                temp.push(this.constructingArr(min, startTime, 12));
            }
            min += 720;
            ret = this.maxValCheck(min % 1440);
            if(ret != false){
                temp.push(this.constructingArr(min, startTime, 12));
            }
        }else{
            var min = this.convertToRailway(input.value.trim());
            var ret = this.maxValCheck(min);
            if(ret != false){
                temp.push(this.constructingArr(min, startTime, 24));
            }
        }
        this.dropdown.ltProp( 'selected', '' );
        if( temp.length == 0 && this.data.ltPropValidateOnBlur ){
            this.data.ltPropStartTime && temp.push( { time : this.data.ltPropStartTime, interval : "" } );
            this.data.ltPropEndTime && temp.push( { time : this.data.ltPropEndTime, interval : "" } );
        }
        this.setData('dropdownData', temp);
        this.dropdown.ltProp( 'selected', this.data.ltPropDefaultTime );
    },

    getCorrectTime : function(timeFormat){

        if( $L.moment ){
            var date = $L.moment();
            if( timeFormat == 12 ){
                return date.i18N( "hh:mm A" );
            } else{
                return date.format( "HH:mm" );
            }
        }

        var time = new Date(), hr = time.getHours(), min = time.getMinutes().toString(), meridian = this.getData('meridian'), mer = hr > 11 ? meridian.PM : meridian.AM;
        if(min.length == 1){
            min = '0' + min;
        }
        if(timeFormat == 12){
            if( hr != 12 ) {
                hr = (hr%12).toString();
                if(hr.length == 1){
                    hr = '0' + hr;
                }
            }
            return hr + ':' + min + " " + mer;
        }else{
            if(hr < 10){
                hr = '0' + hr;
            }
            return hr + ":" + min;
        }

    },

    timeFormatChange : function(){
        this.timeInValChange();
    }.observes('ltPropTimeFormat'),

    handleWheel : function(evt){
        var input = evt.target, type = this.getData('ltPropType');
        if( input.tagName != 'INPUT' || Math.abs( evt.deltaY ) <= Math.abs( evt.deltaX ) ) {
            return
        }
        if(type == 'time' || ( type == "datetime" && input.id == "time" ) ){
            if( this._emptytimeValue ){
                return;
            }
            $L.fastdom.mutate(function(){
               var selectedField = this.getData('selectedField');
                if(!selectedField.prop || input.selectionStart > 3){
                    // settting initial selection if input is not focused
                    input.selectionStart = 0;
                    input.selectionEnd = 2;
                    this.setData('selectedField', {prop : 'hour', val : 0});
                    selectedField = {prop : 'hour', val : 0};
                }
                if(evt.deltaY < -10){
                    this.timeDecrease.call(this, input, {}, selectedField.prop, input.selectionStart, input.selectionEnd)
                }else if(evt.deltaY > 10){
                    this.timeIncrease.call(this, input, {}, selectedField.prop, input.selectionStart, input.selectionEnd)
                }
            }.bind(this))
        }else if( type == 'date' || ( type == "datetime" && input.id == "date" ) ){
            if(evt.deltaY < -10){
                evt.keyCode = 40;
                this.calendarKeydown.call(this, evt, input);
            }else if(evt.deltaY > 10){
                evt.keyCode = 38;
                this.calendarKeydown.call(this, evt, input);
            }
        }
        evt.preventDefault();   
    },                                            

    wheelObs : function(arg){
        var __evt = this.__eventListeners || {};
        if(arg.newValue){
            this.$node.addEventListener('wheel', __evt.timeWheel );
        }else{
            this.$node.removeEventListener('wheel', __evt.timeWheel );
        }
    }.observes('ltPropWheel'),

    convertToRailway : function(val, flag, format){
        var meridian = this.getData('meridian');
        if(!flag){
            var hr = parseInt(val.slice(0, 2));
            var min = parseInt(val.slice(3, 5));
            if(val.length != 5){
                var mer = val.slice(6, val.length);
                return (mer == meridian.PM ? ((hr % 12) + 12) : hr % 12) * 60 + min;
            }else{
                return (hr * 60 + min);
            }
        }else{
            var hr = parseInt(val / 60) % 24;

            var min = val % 60;
            if(min < 10){
                min = '0' + min;
            }
            var mer = ''
            if(format == 12){
                if(parseInt(hr / 12) == 1){
                    if(hr > 12){
                        hr = hr % 12;
                    }
                    mer = meridian.PM;
                }else{
                    mer = meridian.AM;
                    hr = hr || 12;
                }
            }
            if(hr < 10){
                hr = '0' + hr;
            }
            return (hr + ":" + min + " " + mer);
        }
    },

    maxValCheck : function(val){
        var endTime = this.getData('endMinute');
        var startTime = this.getData('startMinute');
        var toChangeTime;
        if(typeof val == 'string'){
            toChangeTime =  this.convertToRailway(val);
        }else{
            toChangeTime = val
        }
        if(startTime < endTime){
            if(toChangeTime <= endTime && toChangeTime >= startTime){
                return true
            }
        }else{
            if((toChangeTime < 1440 && toChangeTime >= startTime) || (toChangeTime >= 0 && toChangeTime <= endTime)){
                return true;
            }
        }
        return false
    },

    timeInValChange : function(arg){
        var timeFormat = this.getData('ltPropTimeFormat'), value,
        val = this.data.ltPropValue,
        type = this.data.ltPropType;

        if(arg){
            value = arg.newValue;
        }else{
            value = this.getData('ltPropDefaultTime');
            if( ( val == undefined || type == 'datetime' ) && !value && $L.moment && ( type == "time" ? this.data.ltPropPlaceholder : ( this.data.ltPropTimePlaceholder || this.data.ltPropCommonPlaceholder ) ) ){
                this._emptytimeValue = true;
                if( type == 'datetime' ){
                    this.checkCommonPlaceHolder();
                }
                return;
            }
        }
        if(!value){
            var startTime =  this.getData('ltPropStartTime');
            if(startTime){
                value = startTime;
            }else{
                value = this.getCorrectTime(timeFormat);
            }
        }
        this.setData('ltPropDefaultTime', value.slice(0, timeFormat != 12 ? 5 : value.length));
    },

    checkCommonPlaceHolder : function(){
        if( ( this.data || {} ).ltPropCommonPlaceholder ){
            this.setData( 'showPlaceholder', !( this.data.ltPropCurrentDate || this.data.ltPropDefaultTime ) );
        }
    },

    startEndTimeObs : function(arg){
        if(!arg || arg.item == 'ltPropStartTime')
            {
                var defaultVal = this._emptytimeValue ? this.getCorrectTime( this.data.ltPropTimeFormat ) : this.getData('ltPropDefaultTime');
                var startTime = this.getData('ltPropStartTime')
                if(!startTime){
                    this.setData('ltPropStartTime', defaultVal)
                    startTime = defaultVal
                }
                this.setData('startMinute', this.convertToRailway(startTime));
            }
        if(!arg || arg.item == 'ltPropEndTime') 
            {
                var  endTime = this.getData('ltPropEndTime'), flag = 0
                if(!endTime){
                    var min = Math.max(0, parseInt(startTime.slice(3, 5)) - 1).toString();
                    if(min.length == 1){
                        min = '0' + min;
                    }
                    endTime = ( startTime.slice(0, 3) + min + " " + startTime.slice(6, startTime.length) ).trim();
                    this.setData('ltPropEndTime', endTime)
                }
                this.setData('endMinute',  this.convertToRailway(endTime));
            }
        this.data.ltPropDropdown && this.dropdownConstruct();    
    },

    timeBoundObs : function(arg){

        if( arg.item == "ltPropDefaultTime" && this.data.ltPropType == "datetime" ){
            this.update_iso();
        } 

        if(arg &&  arg.newValue == "" && arg.oldValue == undefined) {
            return
        }
        if(!arg || (arg && arg.item != 'ltPropDefaultTime')){
            this.startEndTimeObs(arg);
        }else{
            if( arg && !arg.newValue ){
                this.timeInValChange();
                return;
            }
            if(this.setData('preventObs')){
                this.setData('ltPropValue', arg.newValue);
            }

            this.englishTime();

            if(this.getMethods('onTimeChange')){
               /**
                * @method onTimeChange
                * @version 1.0.2
                * @condition ltPropType time,datetime
                */                
                this.executeMethod('onTimeChange', arg, this.$node);
            }
            this._manualset = true;
            if( this.data.ltPropType == 'time' ) {
                this.setData( 'ltPropValue', arg.newValue )
            } else {
                this.checkCommonPlaceHolder();
            }
            delete this._manualset;
        }
    }.observes('ltPropStartTime', 'ltPropEndTime', 'ltPropDefaultTime'),

    dateChangeCallback : function( arg ){

        var __type = this.data.ltPropType;

        if( __type == "datetime" ){
            this.update_iso();
        } 

        if( this.data.ltPropTimezoneHandling ){
            this.check_dst( this.data.originalData );

            var default_time = this.data.ltPropDefaultTime;

            if( default_time ){
                this.setData( 'ltPropDefaultTime', this.check_dst( default_time, 1, 1 ) );
            }

            if( __type == "time" ){
                return;
            }
        }

        var callDelay = this.data.ltPropCallbackDelay;

        this._manualset = true;
        if( __type ) {
            this.setData( 'ltPropValue', arg.newValue )
        } 
        delete this._manualset;
        if( callDelay == undefined ){
            this.dateCallback( arg );
        } else {
            clearTimeout( this.__datachange );
            this.__datachange = setTimeout( this.dateCallback.bind( this ), callDelay, arg );
        }
        this.checkCommonPlaceHolder();
    }.observes('ltPropCurrentDate'),

    dateCallback : function(arg){
        if( arg.newValue == "" && arg.oldValue == undefined) {
            return
        }

        this.englishDate();

        if(this.getMethods('onDateChange')){
           /**
            * @method onDateChange
            * @version 1.0.2
            * @condition ltPropType date,datetime
            */            
            this.executeMethod('onDateChange', arg, this.$node, this._selected);
        }
        this.checkCommonPlaceHolder();
        delete this._selected;
    },

    timeCallback : function(arg){
        if( arg.newValue == "" && arg.oldValue == undefined) {
            return
        }
        if(this.getMethods('onValueChange')){
           /**
            * @method onValueChange
            * @version 1.0.2
            */            
            this.executeMethod('onValueChange', arg, this.$node)
        }
    },

    valChangeObs : function(arg){
        var callDelay = this.data.ltPropCallbackDelay;
        if( !this._manualset ){
            var tp = this.data.ltPropType;
            if( tp == 'date' ) {
                this.setData( 'ltPropCurrentDate', arg.newValue );
            } else if( tp == "time" ) {
                this.setData( 'ltPropDefaultTime', arg.newValue );
            }
        }
        if( callDelay == undefined ){
            this.timeCallback( arg );
        } else {
            clearTimeout( this.__valuechange );
            this.__valuechange  = setTimeout(this.timeCallback.bind(this), callDelay , arg);
        }
    }.observes('ltPropValue'),

    firePosCallBack: function() {

        var calendar = this.$node.calendarDiv,
        pos = this.data.pos;

        $L( calendar ).removeClass( 'lyteInputCalendarUp lyteInputCalendarDown' ).addClass( 'lyteInputCalendar' + ( /up/i.test( pos ) ? 'Up' : 'Down' ) );

        if( this.getMethods( 'onPositionChanged' )) {
           /**
            * @method onDateChange
            * @version 1.0.6
            * @condition ltPropType time,datetime
            */            
            this.executeMethod( 'onPositionChanged', pos, calendar );
        }
    }.observes('pos'),

    /*
        Calculate left of dropdown container when it has to come below/above the select element when it exceeds window.innerWidth and there is space to the right
    */
    setLeftExceedForDown: function( element, container, bcr, containerbcr, xscroll, ww ) {
        var scrolledLeft = xscroll,
        elementBCR = bcr,
        elementLeft = this.rtlfunc.call( this, 'left', elementBCR, ww ),
        elementWidth = elementBCR.width,
        containerBCR = containerbcr,
        containerWidth = containerBCR.width,
        total = scrolledLeft + elementLeft + elementWidth - containerWidth;

        return total
    },
    /*
        Calculate left of dropdown container when it has to come below/above the select element when it doesn't exceed window.innerWidth
    */
    setLeftNotExceedForDown: function( element, bcr, xscroll, ww ) {
        var scrolledLeft = xscroll,
        elementBCR = bcr,
        elementLeft = this.rtlfunc.call( this, 'left', elementBCR, ww ),
        total = scrolledLeft + elementLeft;

        return total
    },
    /*
        Calculate top of dropdown container when it has to come above the select element
    */
    setTopAboveForDown: function( element, container, bcr, containerbcr, yscroll ) {
        var scrolledHeight = yscroll,
        elementBCR = bcr,
        elementTop = elementBCR.top,
        containerBCR = containerbcr,
        containerHeight = containerBCR.height,
        total = scrolledHeight + elementTop  - containerHeight;

        return total
    },
    /*
        Calculate top of dropdown container when it has to come below the select element
    */
    setTopBelowForDown: function( element, bcr, yscroll ) {
        var scrolledHeight = yscroll,
        elementBCR = bcr,
        elementTop = elementBCR.top,
        elementHeight = elementBCR.height,
        total = scrolledHeight + elementTop + elementHeight;

        return total
    },
    /*
        Calculate left of dropdown container when it has to come to right of the select element
    */
    setLeftForRight:function( element, bcr, xscroll, ww ) {
        var scrolledWidth = xscroll,
        elementBCR = bcr,
        elementLeft = this.rtlfunc.call( this, 'left', elementBCR, ww ),
        elementWidth = elementBCR.width,
        total = scrolledWidth + elementLeft + elementWidth;

        return total
    },
    /*
        Calculate right of dropdown container when it has to come to left of the select element of right dropdown
    */
    setRightForRight: function( element, container, bcr, elembcr, xscroll, ww ) {
        var scrolledWidth = xscroll,
        elementBCR = bcr,
        containerBCR = elembcr,
        elementLeft = this.rtlfunc.call( this, 'left', elementBCR, ww ),
        containerWidth = containerBCR.width,
        total = scrolledWidth + elementLeft - containerWidth;

        return total
    },
    /*
        Calculate top of dropdown container when it has to come to right of dropdown and there is space below
    */
    setTopForRight:function( element, bcr, yscroll ) {
        var scrolledHeight = yscroll,
        elementBCR = bcr,
        elementTop = elementBCR.top,
        total = scrolledHeight + elementTop;

        return total
    },
    /*
        Calculate top of dropdown container when it has to come to right of dropdown and there is no space below
    */
    setTopForRightAbove:function( element, container, bcr, elembcr, yscroll ) {
        var scrolledHeight = yscroll,
        elementBCR = bcr,
        elementTop = elementBCR.top,
        elementHeight = elementBCR.height,
        containerBCR = elembcr,
        containerHeight = containerBCR.height,
        total = scrolledHeight + elementTop + elementHeight - containerHeight;

        return total
    },
    /**
     * Set the CSS for your calendar
     * refer commit ID 583ee6ccbeaa6b3729178bf9df0139032b016d19 and previous for the previous stable setCSS function.
     * commit ID 583ee6ccbeaa6b3729178bf9df0139032b016d19 also gives a better understanding about the hard coded values in this function.
     */ 
    setCss : function() {
        var link = this.$node.calendarDiv;

        if( !link 
            || link.classList.contains( 'lyteCalendarHidden' ) 
        ) {
            return;
        }

        // Get properties

        // Get button
        var body = link,
        par = this.$node.querySelector( 'input' ).parentElement;

        // Get Geometric propotions
        var wwidth, wheight, flag, 
        bleft = 0, btop = 0,
        wwidth = window.innerWidth,
        wheight= window.innerHeight,
        iwdth = wwidth,
        drop = body.getBoundingClientRect(), 
        x = ( window.pageXOffset || document.documentElement.scrollLeft ) * ( this._dir ? - 1 : 1 ),
        y = window.pageYOffset || document.documentElement.scrollTop,
        height = body.offsetHeight,
        width = body.offsetWidth, 
        position = this.getData( 'ltPropPosition' ),
        offsets = par.getBoundingClientRect(),
        scope = this.data.ltPropScope,
        scopeElement = scope ? ( _lyteUiUtils.isWidget && Lyte.Component.closestGlobal ? Lyte.Component.closestGlobal( this.$node, scope ) : $L( this.$node ).closest( scope ).get( 0 ) ) : void 0,
        scopeBcr = scopeElement ? scopeElement.getBoundingClientRect() : void 0;

        if( scopeBcr ){
            bleft = Math.max( bleft, scopeBcr.left );
            btop = Math.max( btop, scopeBcr.top );
            wwidth = Math.min( wwidth, scopeBcr.right );
            wheight = Math.min( wheight, scopeBcr.bottom );
        }

        // Intialize flags
        var downPos, 
        rightPos, 
        topPos, 
        leftPos,
        pos;

        // temp stores
        var tempStore,
        tempTop, 
        tempLeft, 
        tempMarginLeft, 
        tempMarginTop,
        tempNum, 
        tempDenom, 
        tempPer,
        oL = this.rtlfunc.call( this, 'left', offsets, iwdth ),
        lT = this.rtlfunc.call( this, 'left' );

        if( position === 'down' ) {
            downPos = true;
            tempTop = offsets.top + offsets.height; 
            if( tempTop + height > wheight 
                /*&& offsets.top > height */
            ) {
                downPos = ( wheight - offsets.top ) > ( offsets.bottom - btop );        
            }

            rightPos = true;
            tempLeft = oL;
            if( tempLeft + width > wwidth 
                && tempLeft > tempLeft + offsets.width - body.offsetWidth 
            ) {
                rightPos = false;
                
            }
            // else if( oL + width <= wwidth ) {
            //     rightPos = true;
            // }

            if( downPos ) {
                this.setData( 'pos', 'down' );
                body.style.top = this.setTopBelowForDown( par, offsets, y ) + 'px';
                
            }
            else {
                this.setData( 'pos', 'up' );
                body.style.top = this.setTopAboveForDown( par, body, offsets, drop, y, iwdth ) + 'px';
            }

            if( rightPos ) {
                body.style.top = tempStore ? tempStore : body.style.top;
                body.style[ lT ] = this.setLeftNotExceedForDown( par, offsets, x, iwdth ) + 'px';  
            }
            else {
                body.style.top = tempStore ? tempStore : body.style.top;
                body.style[ lT ] = this.setLeftExceedForDown( par, body, offsets, drop, x, iwdth ) + 'px'
            }

            
        }
        else if( position === 'right' ) {
            rightPos = true;
            if( oL + offsets.width + width > wwidth
                && oL - drop.width > bleft 
            ) {   
                rightPos = false;
                
            }

            downPos = true;
            if( offsets.top + drop.height > wheight ) {
                downPos = ( wheight - offsets.top ) > ( offsets.bottom - btop )
            }

            if( rightPos ) {
                this.setData( 'pos', 'right' );
                body.style[ lT ]= this.setLeftForRight( par, offsets, x, iwdth ) + 'px'
            }
            else {
                this.setData( 'pos', 'left' );
                body.style[ lT ] = this.setRightForRight( par, body, offsets, drop, x, iwdth ) + 'px';
            }

            if( downPos ) {
                body.style[ lT ] = tempStore ? tempStore : body.style[ lT ];
                body.style.top = this.setTopForRight( par, offsets, y ) + 'px' 
            }
            else {
                body.style[ lT ] = tempStore ? tempStore : body.style[ lT ];
                body.style.top = this.setTopForRightAbove( par, body, offsets, drop, y ) + 'px'
            }
        }
        else if( position === 'up' ) {
            topPos = true
            if( offsets.top - drop.height < btop 
                /*&& offsets.top + offsets.height + height < wheight */
            ) {
                topPos = ( wheight - offsets.top ) < ( offsets.bottom - btop )
            }

            rightPos = true
            if( oL + width > wwidth 
                && oL > oL + offsets.width - body.offsetWidth 
            ) {
                rightPos = false
            }
            // else if( oL + width <= wwidth ) {
            //     rightPos = true
            // }

            if( topPos ) {
                this.setData( 'pos', 'up' );
                body.style.top = this.setTopAboveForDown( par, body, offsets, drop, y ) + 'px';
            }
            else {
                this.setData( 'pos', 'down' );
                body.style.top = this.setTopBelowForDown( par, offsets, y ) + 'px'
            }
            if( rightPos ) {
                body.style.top = tempStore ? tempStore : body.style.top;
                body.style[ lT ] = this.setLeftNotExceedForDown( par, offsets, x, iwdth ) + 'px';
            }
            else{
                body.style.top = tempStore ? tempStore : body.style.top;
                body.style[ lT ] = this.setLeftExceedForDown( par, body, offsets, drop, x, iwdth ) + 'px';
            }
        } else if( position === 'left' ) {
            leftPos = true;
            if( oL - drop.width < bleft 
                && oL + drop.width < wwidth 
            ) {
                leftPos = false;
            }
            // else {
            //     leftPos = true;
            // }

            downPos = true;
            if( offsets.top + drop.height > wheight ) {
                downPos = ( wheight - offsets.top ) > ( offsets.bottom - btop );
            }

            if( leftPos ) {
                this.setData( 'pos', 'left' );
                body.style[ lT ] = this.setRightForRight( par, body, offsets, drop, x, iwdth ) + 'px';
            }
            else {
                this.setData( 'pos', 'right' );
                body.style[ lT ] = this.setLeftForRight( par, offsets, x, iwdth ) + 'px';
            }
            if( downPos ){
                body.style[ lT ] = tempStore ? tempStore : body.style[ lT ];
                body.style.top = this.setTopForRight( par, offsets, y ) + 'px';
            }
            else{
                body.style[ lT ] = tempStore ? tempStore : body.style[ lT ];
                body.style.top = this.setTopForRightAbove( par, body, offsets, drop, y ) + 'px';
            }
        } else if( position === 'downLeft' ) {
            downPos = true;
            tempTop = offsets.top + offsets.height;
            if( tempTop + height > wheight /*&& offsets.top > height*/ ) {
                downPos = ( wheight - offsets.top ) > ( offsets.bottom - btop );
            } 
            // else {
            //     downPos = true;
            // }
            if( !downPos ) {
                tempTop = offsets.top - height;
            }
            rightPos = false
            tempLeft = oL + offsets.width / 2 - width;
            if( tempLeft < bleft ) {
                tempLeft = bleft
                rightPos = true
            } 
            // else { 
            //     rightPos  = false
            // }

            body.style.top = tempTop + y + 'px';

            body.style[ lT ] = tempLeft + x + 'px';
            if( downPos ){
                pos = 'downLeft';
            } else {
                pos = 'upLeft';
            }
            this.setData( 'pos', pos);

        } else if( position === 'downRight' ) {
            downPos = true;
            tempTop = offsets.top + offsets.height;
            if( tempTop + height > wheight /*&& offsets.top > height*/ ) {
                downPos = ( wheight - offsets.top ) > ( offsets.bottom - btop );
            } 
            // else {
            //     downPos = true;
            // }
            if( !downPos ) {
                tempTop = offsets.top - height
            }
            rightPos = true
            tempLeft = oL + offsets.width / 2;
            if( tempLeft + width > wwidth ) {
                tempLeft = wwidth - width;
                rightPos = false;
            } 
            // else { 
            //     rightPos  = true;
            // }

            body.style.top = tempTop + y + 'px';

            body.style[ lT ] = tempLeft + x + 'px';
            if( downPos ){
                pos = 'downRight';
            } else {
                pos = 'upRight';
            }
            this.setData( 'pos', pos);
        } else if( position === 'upLeft' ) {
            downPos = false;
            tempTop = offsets.top - height;
            if( tempTop < btop) {
                downPos = ( wheight - offsets.top ) > ( offsets.bottom - btop );
            } 
            // else {
            //     downPos = false;
            // }
            if( downPos ) {
                tempTop = offsets.top + offsets.height;
            }
            rightPos = false
            tempLeft = offsets[ lT ] + offsets.width / 2 - width;
            if( tempLeft < bleft ) {
                tempLeft = bleft
                rightPos = true
            } 
            // else { 
            //     rightPos  = false
            // }

            body.style.top = tempTop + y + 'px';

            body.style[ lT ] = tempLeft + x + 'px';
            if( downPos ){
                pos = 'downLeft';
            } else {
                pos = 'upLeft';
            }
            this.setData( 'pos', pos);

        } else if( position === 'upRight' ) {
            downPos = false;
            tempTop = offsets.top - height;
            if( tempTop < btop) {
                downPos = ( wheight - offsets.top ) > ( offsets.bottom - btop );
            } 
            // else {
            //     downPos = false;
            // }
            if( downPos ) {
                tempTop = offsets.top + offsets.height
            }
            rightPos = true
            tempLeft = oL + offsets.width / 2;
            if( tempLeft + width > wwidth ) {
                tempLeft = wwidth - width;
                rightPos = false;
            } 
            // else { 
            //     rightPos  = true;
            // }

            body.style.top = tempTop + y + 'px';

            body.style[ lT ] = tempLeft + x + 'px';
            if( downPos ){
                pos = 'downRight';
            } else {
                pos = 'upRight';
            }
            this.setData( 'pos', pos);
        }
            
    },

    preventFn : function(){
        this.preventFocus = true;
    },

    methods: {
        wormholeAppend : function( element, outlet ){

            var __node = this.$node;

            __node.calendarComp = element;
            element.nodeN = __node;
            __node.calendarDiv = element.querySelector( 'div#lyteCalendar' );
            this._assCalendar = __node.calendarDiv.querySelector( 'lyte-calendar' );
            // var func1 = this.calendarMousedown.bind(this);
            // this.$node.calendarDiv.addEventListener('mousedown', func1, true);
            // this.setData('eventListeners.mousedown', func1);
           /**
            * @utility revertToToday
            * @condition ltPropType date,datetime
            * @version 2.2.12
            */            
            __node.revertToToday = this._assCalendar.revertToToday;
           /**
            * @utility revertToSelected
            * @condition ltPropType date,datetime
            * @version 2.2.12
            */            
            __node.revertToSelected = this._assCalendar.revertToSelected;

            var dropdown = this._assCalendar.querySelectorAll('lyte-dropdown');
            for( var i = 0; i < dropdown.length; i++ ){
                var dropbody = dropdown[ i ].component.childComp || dropdown[ i ].querySelector( 'lyte-drop-box' );
                dropbody.addEventListener( 'mousedown', this.preventFn.bind( this ) );
            }

            if( this.data.ltPropAria ){
                try{
                    $L( __node.calendarDiv ).trapFocus();
                }catch( err ){};
            }
        },

        "on-dateselected":function(){
               this._selected = true;
               this._hideCalendar();
         },
         hide : function(){
            $L( this.$node ).removeClass( 'lyteInputDropdownOpen' );
            if(this.getMethods('onHide')){
               /**
                * @method onHide
                * @condition ltPropType time,datetime
                * @version 1.0.2
                */                
                this.executeMethod('onHide', arguments[0], arguments[1], this.$node);
            }
         },
         beforeHide : function(){
            if(this.getMethods('onBeforeHide')){
               /**
                * @method onBeforeHide
                * @condition ltPropType time,datetime
                * @version 1.0.2
                */                
                return this.executeMethod('onBeforeHide', arguments[0], arguments[1], this.$node);
            }
         },
         show : function(){
            $L( this.$node ).addClass( 'lyteInputDropdownOpen' );
            if(this.getMethods('onShow')){
               /**
                * @method onShow
                * @condition ltPropType date,datetime
                * @version 1.0.2
                */                
                this.executeMethod('onShow', arguments[0], arguments[1], this.$node);
            }
         },
         beforeShow : function(){
            if(this.getMethods('onBeforeShow')){
               /**
                * @method onShow
                * @condition ltPropType date,datetime
                * @version 1.0.2
                */                
                return this.executeMethod('onBeforeShow', arguments[0], arguments[1], this.$node);
            }
         },
         optionSelected : function(){
            this._calmsfg = true;
            delete this._emptytimeValue;
            this.setData('ltPropDefaultTime', arguments[1].trim());

            $L( 'input', this.$node ).get( -1 ).focus();
         },

         scroll : function(){
            if(this.getMethods('onScroll')){
               /**
                * @method onScroll
                * @condition ltPropType time,datetime
                * @version 1.0.2
                */                
                this.executeMethod('onScroll', arguments[0], arguments[1]);
            }
         },

         positionChange : function(){
            if(this.getMethods('onPositionChanged')){
               /**
                * @method onPositionChanged
                * @condition ltPropType time,datetime
                * @version 1.0.2
                */                
                this.executeMethod('onPositionChanged', arguments[0], arguments[1]);
            }
         },

         calendarNavigate : function( arg1, arg2, arg3, arg4 ){
            $L.fastdom.measure( this.setCss.bind( this ) );
            if( this.getMethods( 'onNavigate' ) ) {
               /**
                * @method onNavigate
                * @condition ltPropType date,datetime
                * @version 2.0.0
                */                
                this.executeMethod( 'onNavigate', arg1, arg2, arg3, arg4 )
            }
         },

         viewDateChange : function( arg1, arg2 ){
               /**
                * @method onViewdateChange
                * @condition ltPropType date,datetime
                * @version 2.2.11
                */            
            this.getMethods( 'onViewdateChange' ) && this.executeMethod( 'onViewdateChange', arg1, arg2, this.$node );
         },

         viewChange : function( evt, viewType, _this ){
            $L.fastdom.measure( this.setCss.bind( this ) );
               /**
                * @method onViewChange
                * @condition ltPropType date,datetime
                * @version 2.2.11
                */            
            this.getMethods( 'onViewChange' ) && this.executeMethod( 'onViewChange', evt, viewType, _this, this.$node )
         }
    },
   valUpdate : function( ){
        if( !this.$node || !this) {
            return;
        }
        delete this._timeout;
        var type = this.data.ltPropType;
        if( type == 'date' || type == "datetime" ){
            var inn = this.$node.querySelector( 'input' ).value;
            this.setData('ltPropCurrentDate', inn ? inn : "");
        }else if(type == "textarea"){
            var inn = this.$node.querySelector( 'textarea' ).value;
            this.setData('ltPropValue', inn ? inn : "");
        }else{
            var inn = this.$node.querySelector( 'input' ).value;
            // if( this.data.ltPropType == "number" && !frmblur && ( !inn || inn == this.$node.ltProp( 'value' ) ) ){
            //  return
            // }
            this.setData('ltPropValue', inn ? inn : "");
        }  
   },
   fixSelection : function(val, selectedField, input){
    if( this.data.ltPropReadonly ){
        return;
    }
    // changing selection range
            input.selectionStart = selectedField.val + val;
            input.selectionEnd = input.selectionStart + 2;
            this.timeClick.call(this, {}, input, selectedField.val + val );
   },
   replaceVal : function(input, val, start, end){
        var value;
        if(typeof input == 'string'){
            value = input
        }else{
            value = input.value
        }
        var regex = new RegExp('('+ value.slice(start, start + end) +')','i');
         return value.trim().replace(regex, val);   
   },

   retVal : function( val1, val2, limit ) {
     if( parseInt( val1 + val2 ) > limit ) {
        return '0' + val2
     }
     return val1 + val2;
   },

   convertToPm :function( limit, val, meridian ){
        if( limit == 12 ) {
            var mer = val.slice( 6, val.length ), time = val.slice( 0, 5 ), hr = val.slice( 0, 2 ), min = val.slice( 3, 5 )
            if( hr == '00' && mer == 'AM' || hr == '12' && mer == 'PM' ) {
                return val
            }
            return hr + ':' + min + " " + ( meridian.AM == mer ? meridian.PM : meridian.AM )
        }
        return val
   },

   hourTimeSet : function(input, evt, selection, start, end){
         var inputVal = input.value.trim(), limit, meridian = this.getData('meridian');
         var typedValue  = _lyteUiUtils.getCorrectNumberCode( evt.which || evt.keyCode ) - 48;
         var newVal = inputVal.slice(start + 1, end) + typedValue;
         var timeFormat = this.data.ltPropTimeFormat,
         blur = this.data.ltPropValidateOnBlur,
         final;
         
         if(selection == 'hour'){
            limit = timeFormat == 12 ? 12 : 24;
         }else{
            delete this._lasttyped;
            limit = 60
         }
        // if(parseInt(newVal) > limit){
            // newVal = '0' + typedValue;
            // if((limit == 12 && newVal == '00' && inputVal.slice(6, 8) == meridian.PM)){
            //     inputVal = this.replaceVal.call(this, input, meridian.AM, 6, meridian.AM.length);
            // }else
             if(limit == 60 && parseInt( newVal ) >= 60){
                newVal = '0' + typedValue;
            }
        // }else{
            // if((limit == 12 && newVal == '12' && inputVal.slice(6, 8) == meridian.AM)){
            //     inputVal = this.replaceVal.call(this, input, meridian.PM, 6, meridian.AM.length);
            // } else if((limit == 12 && newVal == '00' && inputVal.slice(6, 8) == meridian.PM)){
            //     inputVal = this.replaceVal.call(this, input, meridian.AM, 6, meridian.PM.length);
            // }
        // }

        // if( selection == 'hour' && timeFormat == 12 && newVal == "00" ){
        //     newVal = "12";
        // }
        if( selection == "hour" ){
            final = this.getCrctHour( inputVal, start, end, limit, typedValue, meridian );
            this._lasttyped = typedValue + '';
        } else {
            final = inputVal.slice(0, start) + newVal + inputVal.slice(end, inputVal.length);
            if( !blur || blur && evt.type != 'keydown' ){
                var returnV1 = this.maxValCheck(final);
                if(returnV1 == false ){
                    final = inputVal.slice(0, start) + this.retVal( inputVal.slice(start, start + 1), typedValue, limit ) + inputVal.slice(end, inputVal.length);
                    returnV1 = this.maxValCheck(final);
                    if(returnV1 == false){
                        final = inputVal.slice(0, start) + '0' + typedValue + inputVal.slice(end, inputVal.length);
                        returnV1 = this.maxValCheck(final);
                        if(returnV1 == false){
                            final = this.convertToPm( limit, final, meridian)
                            returnV1 = this.maxValCheck(final);
                            if(returnV1 == false){
                                return false;
                            }
                        }
                    }
                }
            }
        }

        if( this.data.ltPropTimezoneHandling ){
            final = this.check_dst( final, 1, 1 );
        }

        this.setData('ltPropDefaultTime', final);
        // restore current selection
        $L.fastdom.mutate(function(){
            input.selectionStart = start;
            input.selectionEnd = end;
        })
   }, 

   _getCrctHour : function( str, limit, meridian ){
        if( this.maxValCheck( str ) == false ){
            if( limit == 12 ){
                 str = this.convertToPm( limit, str, meridian );
                 if( this.maxValCheck( str ) == false ){
                    return false;
                 } 
                 return str;
            }
            return false;
        }
        return str;
   },

   getCrctHour : function( inputVal, start, end, limit, typedValue, meridian ){
        var str, hr, ret, allow,
        blur = this.data.ltPropValidateOnBlur;
        if( this._lasttyped != undefined ){
            hr = this._lasttyped + typedValue;
            if( hr == "00" && limit == 12 ){
                allow = true;
                hr = "12"
            }
            if( limit == 24 && parseInt( hr ) >= 24 || limit == 12 && parseInt( hr ) >= 13 ){
                ret = false;
            } else {
                str = hr + inputVal.slice( end );
                if( !blur ){
                    ret = this._getCrctHour( str, limit, meridian );
                } else {
                    return str;
                }
            }
            if( ret != false ){
                return ret;
            } else if( str ) {
                var em = this.data.endMinute,
                endTime = this.convertToRailway( str );
                if( endTime - em < 60 && endTime - em >= 0 ){
                    return this.convertToRailway( em, true, limit ).trim();
                }
            }
        }
        hr = inputVal.slice( start + 1, end ) + typedValue;
        if( hr == "00" && limit == 12  ){
            if( !allow ){
                return inputVal;
            }
            hr = "12"
        }
        if( limit == 24 && parseInt( hr ) >= 24 || limit == 12 && parseInt( hr ) >= 13 ){
            ret = false;
        } else {
            str = hr + inputVal.slice( end );
            if( !blur ){
                ret = this._getCrctHour( str, limit, meridian );
            } else {
                return str;
            }
        }
        if( ret != false ){
            return ret;
        }

        hr = inputVal.slice( 0, start + 1 ) + typedValue;
        if( hr == "00" && limit == 12  ){
            if( !allow ){
                return inputVal;
            }
            hr = "12"
        }
        if( limit == 24 && parseInt( hr ) >= 24 || limit == 12 && parseInt( hr ) >= 13 ){
            ret = false;
        } else {
            str = hr + inputVal.slice( end );
            if( !blur ){
                ret = this._getCrctHour( str, limit, meridian );
            } else {
                return str;
            }
        }
        if( ret != false ){
            return ret;
        }

        hr = '0' + typedValue;
        if( hr == "00" && limit == 12  ){
            if( !allow ){
                return inputVal;
            }
            hr = "12"
        }
        str = hr + inputVal.slice( end );
        if( !blur ){
            ret = this._getCrctHour( str, limit, meridian );
        } else {
            return str;
        }
        if( ret != false ){
            return ret;
        }
        hr = typedValue + '0';
        if( hr == "00" && limit == 12  ){
            if( !allow ){
                return inputVal;
            }
            hr = "12"
        }
        if( limit == 24 && parseInt( hr ) >= 24 || limit == 12 && parseInt( hr ) >= 13 ){
            ret = false;
        } else {
            str = hr + inputVal.slice( end );
            if( !blur ){
                ret = this._getCrctHour( str, limit, meridian );
            } else {
                return str;
            }
        }
        if( ret != false ){
            return ret;
        }

        if( this.data.ltPropConvertToNearest ){
           return this.findNearestTime( inputVal, start, end, limit, typedValue, meridian );
        }
        return inputVal;
   },

   findNearestTime : function( inputVal, start, end, limit, typedValue, meridian ){
        var hr, ret;
        if( this._lasttyped != undefined ){
            hr = this._lasttyped + typedValue;
            if( limit == 24 && parseInt( hr ) >= 24 || limit == 12 && parseInt( hr ) >= 13 ){
                ret = false;
            } else {
                return this._findNearest( hr + inputVal.slice( end ), limit );
            }
        }
        hr = inputVal.slice( start + 1, end ) + typedValue;
        if( limit == 24 && parseInt( hr ) >= 24 || limit == 12 && parseInt( hr ) >= 13 ){
            ret = false;
        } else {
            return this._findNearest( hr + inputVal.slice( end ), limit );
        }
        hr = inputVal.slice( 0, start + 1 ) + typedValue;
        if( limit == 24 && parseInt( hr ) >= 24 || limit == 12 && parseInt( hr ) >= 13 ){
            ret = false;
        } else {
            return this._findNearest( hr + inputVal.slice( end ), limit );
        }
        hr = '0' + typedValue;
        if( limit == 24 && parseInt( hr ) >= 24 || limit == 12 && parseInt( hr ) >= 13 ){
            ret = false;
        } else {
            return this._findNearest( hr + inputVal.slice( end ), limit );
        }
        return inputVal;
   },

   _findNearest : function( str, limit ){
      var value = this.convertToRailway( str ),
      end = this.data.endMinute,
      start = this.data.startMinute,
      startDiff = Math.abs( start - value ),
      endDiff = Math.abs( end - value );
      if( startDiff > endDiff ){
         return this.convertToRailway( end, true, limit ).trim();
      } else {
        return this.convertToRailway( start, true, limit ).trim();
      }
   },


  timeIncrease : function(input, evt, selection, start, end, flag){
         if( this.data.ltPropReadonly ){
            return
         }
         var inputVal = input.value.trim(), limit, currentValue = parseInt(inputVal.slice(start, end)), interval, timeFormat = this.getData('ltPropTimeFormat'), final, meridian = this.getData('meridian');
         if(selection == 'hour'){
            limit = timeFormat == 12 ? 12 : 24;
            if(flag){
                interval = 1;
            }else{
                interval =  this.data.ltPropHourInterval;
            }
         }else{
            limit = 60;
            interval =  this.data.ltPropMinuteInterval;
         }
         var newVal,
         allow;
         if( $L.moment && $L.moment.lyteMoment.prototype.add ){
            var momentFormat = timeFormat == 12 ? "hh:mm A" : "HH:mm",
            moment;
            inputVal = inputVal.replace( meridian.AM, 'AM' ).replace( meridian.PM, 'PM' );

            if( this.data.ltPropTimezoneHandling && this.data.ltPropCurrentDate ){
                moment = this.check_dst( inputVal, true );
            } else {
                moment = $L.moment( inputVal, momentFormat );
            }

            if( moment.validate() ){
                final = moment.add( interval, limit == 60 ? 'minutes' : 'hours' ).format( momentFormat ).replace( 'AM', meridian.AM ).replace( 'PM', meridian.PM );
            } else {
                allow = true;
            }
         } 
         if( allow ) {
             newVal = (currentValue + interval) % limit;
             if(limit == 12 && newVal < currentValue && inputVal.slice(6, inputVal.length) == meridian.AM){
                if(newVal == 0){
                    newVal = '12';
                }
               inputVal = this.replaceVal.call(this, input, meridian.PM, 6, inputVal.length);
             }else if(limit == 12 && newVal < currentValue && inputVal.slice(6, inputVal.length) == meridian.PM){
                if(currentValue != 12 || newVal == 0){
                    inputVal = this.replaceVal.call(this, input, meridian.AM, 6, inputVal.length);
                }
             }else if(limit == 12 && newVal == currentValue && inputVal.slice(6, inputVal.length) == meridian.AM){
                    newVal = '12';
                    inputVal = this.replaceVal.call(this, input, meridian.PM, 6, inputVal.length);
             }else if(limit == 60 && newVal <= currentValue) {
                 var ret = this.timeIncrease.call(this, input, evt, 'hour', 0, 2, true);
                 if(ret == false){
                    return false;
                 }
                 inputVal = input.value.trim();
             }
            newVal = newVal.toString();
            if(newVal.length == 1){
                newVal = '0' + newVal;
            }
            final = inputVal.slice(0, start) + newVal + inputVal.slice(end, inputVal.length);
        }
        var returnV = this.maxValCheck(final)
        if(returnV == false){
            return false
        }
        this.setData('ltPropDefaultTime', final);
        // restore current selection
        $L.fastdom.mutate(function(){
            input.selectionStart = start;
            input.selectionEnd = end;
        })
   },
    timeDecrease : function(input, evt, selection, start, end, flag){
        if( this.data.ltPropReadonly ){
            return
         }
         var inputVal = input.value.trim(), limit, currentValue = parseInt(inputVal.slice(start, end)), interval, timeFormat = this.getData('ltPropTimeFormat'), final, meridian = this.getData('meridian');
         if(selection == 'hour'){
            limit = timeFormat == 12 ? 12 : 24;
            if(flag){
                interval = 1;
            }else{
                interval =  this.getData('ltPropHourInterval');
            }
         }else{
            limit = 60;
            interval =  this.getData('ltPropMinuteInterval');
         }
         var newVal,
         allow;
         if( $L.moment && $L.moment.lyteMoment.prototype.subtract ){
            var momentFormat = timeFormat == 12 ? "hh:mm A" : "HH:mm",
            moment;
            inputVal = inputVal.replace( meridian.AM, 'AM' ).replace( meridian.PM, 'PM' );
            
            if( this.data.ltPropTimezoneHandling && this.data.ltPropCurrentDate ){
                moment = this.check_dst( inputVal, true );
            } else {
                moment = $L.moment( inputVal, momentFormat );
            }

            if( moment.validate() ){
                final = moment.subtract( interval, limit == 60 ? 'minutes' : 'hours' ).format( momentFormat ).replace( 'AM', meridian.AM ).replace( 'PM', meridian.PM );
            } else {
                allow = true;
            }
         } 
         if( allow) {
             newVal = (currentValue - interval + limit) % limit;
             if(limit == 12 && newVal > currentValue && inputVal.slice(6, inputVal.length) == meridian.AM){
                 inputVal = this.replaceVal.call(this, input, meridian.PM, 6, inputVal.length);
             } else if(limit == 12 && (newVal > currentValue || currentValue == 12) && inputVal.slice(6, inputVal.length) == meridian.PM){
                inputVal = this.replaceVal.call(this, input, meridian.AM, 6, inputVal.length);
             }else if(limit == 12 && newVal == 0){
                if(inputVal.slice(6, inputVal.length) == meridian.PM){
                    newVal = '12';
                } 
             }else if(limit == 60 && newVal >= currentValue) {
                var ret = this.timeDecrease.call(this, input, evt, 'hour', 0, 2, true);
                if(ret == false){
                    return false;
                }
                inputVal = input.value.trim()
             }
            newVal = newVal.toString();
            if(newVal.length == 1){
                newVal = '0' + newVal;
            }
            final = inputVal.slice(0, start) + newVal + inputVal.slice(end, inputVal.length);
        }
        var returnV = this.maxValCheck(final);
        if(returnV == false){
            return false
        }
        this.setData('ltPropDefaultTime', final);
        // restore current selection
        $L.fastdom.mutate(function(){
            input.selectionStart = start;
            input.selectionEnd = end;
        })
   },

   findCalendarRange : function(evt, input, allow ){
        // var flag = false;
        var iso = this.getData('ltPropIso');
        if(input.value && this.dateValidation(iso) != false){
                var start = input.selectionStart, i;
                var end = input.selectionEnd;
                var range = this.getData('dateRange');
                for(i in range){
                    if( allow && i != this.data.selectedDateField ){
                        continue;
                    }
                    // checking selected pos
                     var returnedRange = this.setRangeByMoment( input, range, i );

                     // One bug in this check. It will cause error when format is given without separators like MMDDYYYY

                    if( ( returnedRange[ 0 ] <= start && returnedRange[ 1 ] >= start ) || allow ){
                        if( !this.data.ltPropPreventSelection ){
                            input.selectionStart = returnedRange[ 0 ];
                            input.selectionEnd = returnedRange[ 1 ];
                        } else if( allow ) {
                           input.selectionStart = input.selectionEnd = returnedRange[ 1 ]; 
                        }
                        this.setData('selectedDateField', i);
                        // flag = true;
                        break;
                    }
                }
            }
         // return flag;   
   },

   setRangeByMoment : function( input, range, key ){
      var start, end;
      if( $L.moment ){
          var format = this.getCrctFormat(), 
          value = input.value,
          is_i18n = this.data.ltPropCalendarProperties.i18n,
          moment = $L.moment( value, format, {
            i18n : is_i18n
          }),
          ns = is_i18n ? 'i18N' : 'format';

          if( moment.validate() ){
            var length = 0, sliceForm = format.slice( range [ key ] [ 0 ], range  [ key ][ 1 ] );
            for( var i = 0; i < this.data.dateOrder.length; i++ ){
                var current = this.data.dateOrder[ i ], newValue = moment[ ns ]( current.format );
                if( current.format == sliceForm ){
                    break;
                }
                value = value.replace( newValue, '' );
                length += newValue.length
            }
            var formatted = moment[ ns ]( sliceForm );
            start = length + value.indexOf( formatted );
            end = start + formatted.length;
          } else {
             start = range[ key ] [ 0 ];
             end = range[ key ] [ 1 ];
          }
      } else {
        start = range[ key ][ 0 ];
        end = range[ key ][ 1 ];
      }
      return [ start, end ];
   },

   hideCalendar : function(){
        Array.from( document.getElementsByTagName( 'lyte-input' ) ).forEach( function( item ){
            var cal_div = item.calendarDiv;

            if( item != this.$node && cal_div && !$L( cal_div ).hasClass( 'lyteCalendarHidden' ) ){
                item.component._hideCalendar();
            }
        }.bind( this ) );
   },

   _hideCalendar : function( bool, __force ){

        var cal = this.$node.calendarDiv;

        if( !cal || $L( cal ).hasClass( 'lyteCalendarHidden' ) ){
            return;
        }

        if( !__force && !this._selected && !this.data.ltPropCalendarProperties.disableNavigation && cal.contains( document.activeElement ) ){
            return;
        }

        var callback,
        cb = 'onBeforeCalendarClose';

        if( this.getMethods( cb ) ) {
               /**
                * @method onBeforeCalendarClose
                * @condition ltPropType date,datetime
                * @version 2.2.8
                */            
            callback = this.executeMethod( cb, cal, this.$node, !!this._selected );
        }
        if( callback == false ){
            this.$node.focus();
            return
        } else if( callback && callback.then ){
            this._calendarCloseStart = true;
            Promise.resolve( callback ).then( this.mainHideFn.bind( this, bool ) );
        } else {
            this.mainHideFn( bool );
        }
   },

   mainHideFn : function( bool ){

        var comp = this,
        inputs = this.$node,
        __calendar = inputs.calendarDiv;

        delete comp._calendarCloseStart;
        __calendar.classList.add('lyteCalendarHidden')
        inputs.classList.remove( 'calendarOpen' );

        Array.from( comp._assCalendar.querySelectorAll( 'lyte-dropdown' ) ).forEach( function( item ){
            item.close();
        });

        if( this.data.ltPropAria ){
            $L( 'input,textarea', inputs ).attr( "aria-expanded", "false" );
         }

        if( comp.getMethods( 'onCalendarClose' ) ) {
           /**
            * @method onCalendarClose
            * @condition ltPropType date,datetime
            * @version 1.0.2
            */            
            comp.executeMethod( 'onCalendarClose', __calendar, inputs )
        }
        comp.data.ltPropHeaderType == 'drilldown' && inputs.revertToSelected();
        if( bool ){
            inputs.blur();
            comp._closedbyscrl = true;
        } 

        if( this.data.ltPropAria ){
            var exst_active = document.activeElement;

            if( exst_active == document.body || __calendar.contains( exst_active ) ){
                $L( '.lyteInputCalendarIcon', this.$node ).focus();
            }

            this.setData( "isExpanded", "false" );
        }
   },

   showCalendar : function(event, input){
    if( this._byManual ) {
        delete this._byManual;
        return;
    }
     this.hideCalendar();
     // removing hidden class
      if( this.data.ltPropReadonly && !this.data.ltPropPreventKeys || this._calendarCloseStart ){
        return;
     }
     if( this.getMethods( 'onBeforeOpen' )  ){
        var retVal = this.executeMethod( 'onBeforeOpen', event, this.$node );
        if( retVal == false ){
            this._prevclick = true;
            setTimeout( function(){
                delete this._prevclick;
            }.bind( this ), 100 );
            return;
        }
     }
     if( !this.data.ltPropBindToBody ){
         this.setData( 'ltPropBindToBody', true );   
     }
     this.$node.calendarDiv.classList.remove('lyteCalendarHidden')
     $L.fastdom.measure( this.scrollFunc.bind( this ) );
     // initial selection
     $L.fastdom.mutate(function(){
        if( !this.data.ltPropReadonly ){
             // if( !this.data.ltPropPreventSelection ){
             //    input.selectionStart = 0;
             //    input.selectionEnd = 0;
             // }
             this.findCalendarRange(event, input );
         }
         this.$node.classList.add( 'calendarOpen' );
         if( this.data.ltPropType == 'datetime' ){
            if( this.dropdown ){
                this.dropdown.close();
            }
         }

         if( this.data.ltPropAria ){
            $L( 'input,textarea', this.$node ).attr( "aria-expanded", "true" );
         }

         // if( !this.data.ltPropCalendarProperties.disableNavigation ){
         //    this.setData( "navigation", true );
         // }


         if( this.data.ltPropAria ){
            window.requestAnimationFrame( function(){
                // this._assCalendar.focusCalendar();
                this.setData( "navigation", true );
                this.setData( "isExpanded", "true" );
            }.bind( this ) );
         }

         if(this.getMethods('onCalendarOpen')){
           /**
            * @method onCalendarOpen
            * @condition ltPropType date,datetime
            * @version 1.0.2
            */            
            this.executeMethod('onCalendarOpen', this.$node.calendarDiv, this.$node);
         }   
     }.bind(this))
   },

   // calendarMousedown : function(event){
   //      if( this.$node.calendarDiv.contains( event.target.correspondingElement || event.target ) ) {
   //          this.preventFocus = true
   //      }
   // },

   timeClick : function( evt, input, startVal ){
    if( this.data.ltPropReadonly && !this.data.ltPropPreventKeys ){
        return;
    }
    if( !this.data.ltPropReadonly && !this._emptytimeValue ){
        var start, startVal, endVal;
        // measuring clicked position
            start = Math.min( 2, parseInt( ( startVal == undefined ? input.selectionStart : startVal ) / 3 ) );
        // measuring selection 
            switch(start){
                case 2 : {
                    startVal = 6;
                    endVal = input.value.length;
                    this.setData('selectedField', {prop : 'meridian', val : 6});
                }
                break;
                case 1 : {
                    startVal = 3;
                    endVal = 5;
                    this.setData('selectedField', {prop : 'minute', val : 3});
                }
                break;
                default : {
                    startVal = 0;
                    endVal = 2;
                    this.setData('selectedField', {prop : 'hour', val : 0});
                }
            }

        input.selectionStart = startVal;
        input.selectionEnd = endVal;
      }
      if(this.dropbox && this.dropbox.classList.contains('lyteDropdownHidden') && evt.type == "click"){
            this.open_dropdown();
        }
   },

   open_dropdown : function(){
        this.dropdown.ltProp( 'selected', '' );
        this.setData('dropdownData', this.getData('originalData'));
        this.dropdown.ltProp( 'selected', this.data.ltPropDefaultTime );
        this.dropdown.toggle();
   },

   calendarKeydown : function( evt, input ){
        
        if( evt.key == "Escape" ){
            return this._hideCalendar( void 0, true );
        }

        if( !input.value || this.data.ltPropReadonly ){
            return;
        }
        var keyCode = evt.keyCode,
        iso = this.data.ltPropIso,

        time = this.dateValidation(iso);
            if(time != false){
                var selected = this.getData('selectedDateField');                       
                if([37, 38, 39, 40, 9].indexOf(keyCode) != -1){
                        if(input.selectionEnd == input.selectionStart){
                            this.findCalendarRange(evt, input);
                            selected = this.data.selectedDateField;
                        }
                        var start = input.selectionStart;
                        var end = input.selectionEnd;
                        
                        if([38, 40].indexOf(keyCode) != -1){

                            var dropdowns = Array.from( this._assCalendar.getElementsByTagName( 'lyte-dropdown' ) ),
                            has_opened = false;

                            dropdowns.every( function( item ){
                                return !( has_opened = item.ltProp('isOpen') );
                            });

                           evt.preventDefault();

                            if( has_opened ){
                                return;
                            }
                        switch(selected){
                            case 'year' : {
                                if(keyCode == 40){
                                    time.setFullYear(time.getFullYear() - 1);
                                }else{
                                    time.setFullYear(time.getFullYear() + 1);
                                }   
                            }
                            break;
                            case 'month' : {
                                if(keyCode == 40){
                                    time.setMonth(time.getMonth()  - 1);
                                }else{
                                    time.setMonth(time.getMonth() + 1);
                                }
                            }
                            break;
                            default : {
                                if(keyCode == 40){
                                    time.setDate(time.getDate() - 1);
                                }else{
                                    time.setDate(time.getDate() + 1);
                                }
                            }
                        }
                        if( this._assCalendar.component.checkDate( time ) ){
                            this.setData('ltPropIso', $L.moment( time ).format() );
                            if( this.getData('ltPropType') == "datetime" ){
                                this.update_iso();
                            } 
                        }
                        $L.fastdom.measure( this.findCalendarRange.bind( this, {}, input, true ) )
                    } else {
                        if((input.selectionEnd == input.value.length && (keyCode == 39 || (!evt.shiftKey && keyCode == 9))) || (input.selectionStart == 0 && (keyCode == 37 || (evt.shiftKey && keyCode == 9)))){
                            return
                        }else{
                            var daterange = this.getData('dateRange'),
                            dateOrder = this.data.dateOrder,
                            index;

                            for( var i = 0; i < dateOrder.length; i++ ){
                                if( dateOrder[ i ].name == selected ){
                                    index = i;
                                    break;
                                }
                            }

                            if( keyCode == 39 || ( !evt.shiftKey && keyCode == 9 ) ) {
                                if( i + 1 == dateOrder.length ){
                                    start = end = daterange[ selected ][ 1 ] + 1;
                                } else {
                                    var returned = this.setRangeByMoment( input, daterange, dateOrder[ index + 1 ].name );
                                    start = end = Math.abs( ( returned[ 0 ] + returned[ 1 ] ) * 0.5 )
                                }
                            }else if( keyCode == 37 || ( evt.shiftKey && keyCode == 9 ) ){
                                if( i == 0 ){
                                    start = end = daterange[ selected ][ 0 ] + 1;
                                } else {
                                    var returned = this.setRangeByMoment( input, daterange, dateOrder[ index - 1 ].name );
                                    start = end = Math.abs( ( returned[ 0 ] + returned[ 1 ] ) * 0.5 )
                                }
                            }
                            $L.fastdom.measure( this.findCalendarRange.bind( this, {}, input ) );
                            if( this.data.ltPropPreventSelection ){
                                return;
                            }
                            // start = input.selectionStart;
                            // end = input.selectionEnd;
                            evt.preventDefault();
                        }
                    }
                    // restore current selection
                    // $L.fastdom.mutate(function(){
                        input.selectionStart = start;
                        input.selectionEnd = end;
                    // })
                 }
             }
   },

   focusCallback : function( evt ){
        if( this.getMethods( 'onFocus' ) ) {
           /**
            * @method onFocus
            * @version 1.0.6
            */            
            this.executeMethod( 'onFocus', evt, this.$node )
        }
   },

   focusout : function(){
        if(!this.preventFocus){
            var cal = this.$node.calendarDiv;
            if( !cal || cal.classList.contains('lyteCalendarHidden') ) {
                return
            }

            var data = this.data;

            if( data.navigation ){
                return;
            }

            clearTimeout( this._hidecall );
            this._hidecall = setTimeout( this._hideCalendar.bind( this ), 0 );
        }else {
            delete this.preventFocus;
        }
   },

   maxLen : function( value ) {

        var max = this.data.ltPropMaxlength;
        return max != undefined ? value.toString().match( new RegExp('.{0,' + max + '}') )[ 0 ] : value;
   },

   showCalendarAction : function( event, input ){
         var $node = this.$node;

        $node.classList.add( 'lyteInputFocus' )
        this.focusCallback.call( this, event );

        if( this.data.ltPropAria ){
            return;
        }

        if( $L( $node.calendarDiv ).hasClass( 'lyteCalendarHidden' ) || !this.data.ltPropBindToBody ){
            this.showCalendar( event, input );
        }
   },

   input_blur : function( event, flag ){

        var r_target = event.relatedTarget;

        if( this.data.ltPropAria && r_target && this.$node.contains( r_target ) ){
            return;
        }


        delete this._lasttyped;
        var ty = /date/i.test( this.data.ltPropType ), 
        mt = this.getMethods( 'onBlur' );

        if( ty ){
            if( r_target && this.data.ltPropHeaderType == "dropdown" ){
                var drop = r_target.closest( 'lyte-drop-box' );
                if( drop ){
                    var origindd = drop.origindd,
                    $node = this.$node,
                    wormhole = $node.calendarComp;

                    if( origindd && wormhole && wormhole.contains( origindd ) ){
                        return $node.focus();
                    }
                }
            }

        }


        this.$node.classList.remove( 'lyteInputFocus' )
        if( !flag ) {
            var type = this.getData( 'ltPropType' )
            if( this._calmsfg ) {
                this.valUpdate();
                clearTimeout( this._blurcall );
                this._blurcall = setTimeout( function(){
                    if( ty ){
                        this.focusout.call( this )
                    }
                    if( mt ) {
                        this.executeMethod( 'onBlur', event, this.$node )
                    }
                }.bind( this ), 0)
                delete this._calmsfg;
            } else {
                if( type == "number" ) {
                    var max = this.data.ltPropMax,
                    min = this.data.ltPropMin,
                    value = parseFloat( event.target.value ),
                    happened = false;

                    if( !isNaN( value ) ){
                        if( [ undefined, null, '' ].indexOf( min ) == -1 && min.constructor == Number ){
                            value = Math.max( min, value );
                            happened = value == min;
                        } 
                        if( [ undefined, null, '' ].indexOf( max ) == -1 && max.constructor == Number ){
                            value = Math.min( max, value );
                            happened = happened || ( value == max );
                        }
                        if( happened ){
                            event.target.value = value;
                        }
                    }
                }
                this.valUpdate.call( this );
                if( ty ){
                    this.focusout.call( this )
                }
                if( mt ) {
                   /**
                    * @method onBlur
                    * @version 1.0.6
                    */                            
                    this.executeMethod( 'onBlur', event, this.$node )
                }
            }
        }
   },

   open_cal_for_icon : function( evt ){
        if(  $L( this.$node.calendarDiv ).hasClass( 'lyteCalendarHidden' ) || !this.data.ltPropBindToBody ){
            this.showCalendar( evt, this.$node.getElementsByTagName( 'input' )[ 0 ] );
        }
   },

   password_obs : function( arg ){

        var __data = this.data,
        __visibility = __data.ltPropPasswordVisibility;

        if( __data.ltPropType == "password" && __data.ltPropPasswordIcon ){
            this.setData({
                passwordClass : 'lyteInput' + ( __visibility ? 'Hide' : "Show" ) + 'PasswordIcon',
                passwordTooltip : __data.ltPropPasswordTooltip[ __visibility ? "hide" : "show" ],
                ltPropFocus : true
            });

            var __input = this.$node.getElementsByTagName( "input" )[ 0 ];

            __input.setAttribute( "type", __visibility ? "text" : "password" );
            window.requestAnimationFrame( function(){
                __input.selectionStart = __input.selectionEnd = __input.value.length;
            });

            if( !arg ){
                $L( this.$node ).addClass( 'lyteInputWithPasswordToggleButton' );
            }
        }

   }.observes( 'ltPropPasswordVisibility' ).on( 'didConnect' ),

    actions: {

            keyclick : function( evt ){
                if( evt.key == "Enter" ){
                    evt.preventDefault();
                    evt.target.click();
                    return false;
                }
            },

            calendarKey : function( evt ){
                if( evt.key == "Escape" ){
                    this._hideCalendar( void 0, true );
                }
            },

            togglePassword : function( evt ){
                if( evt && evt.key != "Enter" ){
                    return;
                }
                this.setData( 'ltPropPasswordVisibility', !this.data.ltPropPasswordVisibility );
            },

            calIconClick : function( evt, __this ){
                this.open_cal_for_icon( evt );
            },

            calIconFocus : function( evt, __this ){
                var __rel = evt.relatedTarget;

                if( __rel && this.$node.contains( __rel ) ){
                    return;
                }

                this.showCalendarAction( evt, __rel );
            },

            calIconBlur : function( evt ){

                var __rel = evt.relatedTarget,
                calendar = this._assCalendar;

                if( document != window.document && this.data.navigation ){
                    return;
                }

                if( !( calendar && __rel && calendar.contains( __rel ) ) ){
                    this._hideCalendar();
                }

                if( __rel && this.$node.contains( __rel ) ){
                    return;
                }

                this.input_blur( evt );
            },

            calIconKey : function( evt ){
                switch( evt.key ){
                    case "Enter" :
                    case ' ' : {
                         this.open_cal_for_icon( evt );
                    }
                    break;
                }
            },

            resizeSelect : function( evt ){
                this.rsizefun( evt )
            },

            preventDrag : function( evt ){
                evt.preventDefault();
            },

            closeKey : function( evt ){
                return false;
            },

            clsIcon : function( evt ){

                var is_enter = evt.key == "Enter";
                    
                if( evt.type == "keydown" && !is_enter ){
                    return;
                }

                this.$node.ltProp( 'value', '' );
                this.$node.focus();
                if( this.data.isSearch ){
                    /**
                     * @event on-ip-clear
                     * @version 2.0.0
                     */                    
                    this.throwEvent( 'on-ip-clear', evt );
                }
                if( this.getMethods( 'onClear' ) ) {
                    /**
                     * @method onClear
                     * @version 2.0.0
                     */                    
                    this.executeMethod( 'onClear', evt, this.$node );
                }

                if( is_enter ){
                    evt.preventDefault();
                    return false;
                }
            },

            calmsdown : function( evt, _this ){
                this._calmsfg = true;

                var target = evt.target;

                if( this.$node.calendarDiv.contains( target.correspondingElement || target ) ) {
                    this.preventFocus = true
                }
            },

             numberKeydown : function( evt, _this ){
                var ff = /firefox/ig.test( navigator.userAgent );
                if( !( _lyteUiUtils.isAndroid && !( ff ) ) ) {
                    var key = evt.which || evt.keyCode, prev, value = _this.value, isIE = /rv:11/ig.test( navigator.userAgent );
                    if( /^(8|9|27|37|39|13|187|189)$/.test( key ) || ( ff && /^173$/i.test( key ) ) || ( key >= 48 && key <=57 ) || ( key >= 96 && key <= 105 ) || evt.metaKey || evt.ctrlKey || ( /^(38|40)$/.test( key ) && !isIE ) ){
                        return;
                    }
                    if( /^(69|190)$/.test( key ) ){
                        if( ( !/\./i.test( value ) && key == 190 ) || ( key == 69 && ( !/e/i.test( value ) && value != "" ) ) ) {
                            return;
                        }
                    }
                    evt.preventDefault();
                    if( key == 38 ){
                        value = Number( value || 0 ) + Number( _this.step );
                    } else if( key == 40 ) {
                        value = Number( value || 0 ) - Number( _this.step );
                    }
                    if( isIE && /^(38|40)$/.test( key ) ){
                        var newVal = parseInt( this.maxLen( value ) );
                        if( !isNaN( newVal ) ) {
                            newVal = Math.min( Math.max( newVal, _this.min ? _this.min : -Infinity ), _this.max ? _this.max : Infinity );
                            if( !isNaN( newVal ) ) {
                                _this.value = newVal;
                            }
                        }
                    }
                 }
             },

             numberPaste : function( evt, _this ) {
                var clip = evt.clipboardData || window.clipboardData,
                newVal = _this.value + clip.getData( 'text' ).replace(/\'|\"/g, '');
                if( /^([0-9]+|\.(?!e){1,}|\+|\-)([0-9\.\e]{0,}$)/i.test( newVal ) ){
                    return;
                }
                if( newVal.length == this.maxLen( newVal ) && !/rv:11/ig.test( navigator.userAgent ) ){
                    return;
                }
                evt.preventDefault();
             },

             focusClass : function(evt){
                this.$node.classList.add( 'lyteInputFocus' )
                this.focusCallback.call( this, evt )
             },

             "blurThrow":function(event, flag){
                this.input_blur( event, flag );
             },

             input : function( evt, _this ){
                if( this.data.ltPropType == 'number' ){
                    var value = _this.value, newVal1 = this.maxLen( value ), newVal;
                    newVal = Math.min( newVal1, _this.max != undefined && _this.max != '' ? _this.max : Infinity )
                    if( value !== newVal1 || newVal1 != newVal ){
                        if( newVal1 == newVal ) {
                            _this.value = newVal1;
                        } else if ( isNaN( newVal ) ){
                            _this.value = parseFloat( newVal1 );
                        } else {
                            _this.value = newVal;
                        }
                    }
                }
                if(this.getData('ltPropAutoUpdate')){
                    clearTimeout( this._iptime );
                    var updly = this.data.ltPropUpdateDelay;
                    if( updly != undefined ){
                        this._iptime = setTimeout( this.valUpdate.bind( this ), updly );
                    } else {
                        this.valUpdate.call( this );
                    }
                }
             },

             "showcalendar":function(event, input){
                this.showCalendarAction( event, input );
             },

             calendarClick : function(evt, input){
                
                var __focus = this._focus,
                __data = this.data;

                if( __focus && _lyteUiUtils.isMobile || ( __data.ltPropReadonly && !__data.ltPropPreventKeys ) ){      
                    delete this._focus;     
                    return;     
                }
                if( !__focus && /date/i.test( __data.ltPropType ) && !this._prevclick ){
                    
                    var calendar_elem = this.$node.calendarDiv;

                    if( !this.data.ltPropAria && ( !calendar_elem || $L( calendar_elem ).hasClass( 'lyteCalendarHidden' ) ) ){
                        this.showCalendar( evt, input);
                    }
                }
                this.findCalendarRange(evt, input);
             },

             calendarKeydown : function(){
                this.calendarKeydown.apply(this, arguments)
             },

             timeBlur : function(evt, input){
                if( this._emptytimeValue && input.value ){
                    this.checkTimeStr( input, true );
                } else if( this.data.ltPropValidateOnBlur && !this._emptytimeValue ){
                    var ret = this._getCrctHour( input.value, this.data.ltPropTimeFormat, this.data.meridian );
                    this.setData( 'ltPropDefaultTime', ret ? ret : this._findNearest( input.value, this.data.ltPropTimeFormat ) );
                }
                this.$node.classList.remove( 'lyteInputFocus' )
                this.setData('selectedField', {});
                if( this.getMethods( 'onBlur' ) ) {
                    if( this._calmsfg ){
                        this.executeMethod( 'onBlur', evt, this.$node )
                    } else {
                        setTimeout( function(){ 
                            this.executeMethod( 'onBlur', evt, this.$node )
                        }.bind( this ), 0 )
                    }
                }
             },

             timeInput : function( _this ){
                if( this._emptytimeValue ){
                    this.checkTimeStr( _this );
                } else {
                    var value = _this.value || "",
                    format = this.data.ltPropTimeFormat,
                    form,
                    meridian = this.data.meridian;
                    if( format == 12 ){
                        form = "hh:mm A";
                        value = value.replace( meridian.AM, 'AM' ).replace( meridian.PM, 'PM' );
                    } else {
                        form = "HH:mm";
                    }
                    if( value && $L.moment && !$L.moment( value, form ).validate() ){
                        _this.value = this.data.ltPropDefaultTime;
                    }
                }

             },

             timeFocus : function(evt, input){
                this.$node.classList.add( 'lyteInputFocus' )
                var value = input.value.trim();
                this.setData('selectedField', {prop : 'hour', val : 0});
                input.selectionStart = 0;
                this.fixSelection.call(this, 0, {prop : 'hour', val : 0}, input);
                this.focusCallback.call( this, evt )
             },

             timeKeydown : function(evt, input){
                if( this.data.ltPropReadonly || this._emptytimeValue ){
                    return;
                }


                if( /enter/i.test( evt.key ) ){
                    if( this.data.ltPropAria && $L( this.dropbox ).hasClass( 'lyteDropdownHidden' ) ){
                        this.open_dropdown();
                        // evt.preventDefault();
                        evt.stopPropagation();
                        evt.stopImmediatePropagation();
                    }
                    return;
                }


                var selectedField = this.getData('selectedField'), meridian = this.getData('meridian'), timeFormat = this.getData('ltPropTimeFormat'), flag = true, oriDrop = this.getData('originalData'), rendered = this.getData('dropdownData'),
                keyCode = _lyteUiUtils.getCorrectNumberCode( evt.which || evt.keyCode ),
                prev_nav = this.data.ltPropPreventDropdownNavigation,
                is_drop_open =  this.dropbox && !$L( this.dropbox ).hasClass( 'lyteDropdownHidden' );

                if( !prev_nav && is_drop_open && /38|40|13/.test( keyCode ) ){
                    return;
                }

                if( prev_nav && is_drop_open && /38|40/.test( keyCode ) ){
                    evt.stopPropagation();
                }

                if(selectedField.prop && !( evt.ctrlKey || evt.metaKey ))
                    {
                        var start = input.selectionStart, end = input.selectionEnd;
                        if(start == end){
                            this.timeClick( {}, input, start );
                            start = input.selectionStart, end = input.selectionEnd;
                            selectedField = this.getData('selectedField');
                        } else {
                            if( start == 0 && end == input.value.length ){
                                start = 0;
                                end = 2;
                                this.timeClick(  {}, input, start );
                                selectedField = this.getData( 'selectedField' );
                            }
                        }
                        var dontcall;
                        if(keyCode != 9){
                            evt.preventDefault();
                        }
                        if([9, 37, 39].indexOf(keyCode) != -1){
                            if((evt.shiftKey || keyCode == 37) && selectedField.prop != 'hour' && keyCode != 39){
                                this.fixSelection.call(this, -3, selectedField, input);
                                evt.preventDefault();
                                dontcall = true;
                            }
                            else if((((!evt.shiftKey || keyCode == 39) && selectedField.prop != 'minute' && timeFormat == 24) || (!evt.shiftKey && selectedField.prop != 'meridian' && timeFormat == 12)) && keyCode != 37){
                                this.fixSelection.call(this, 3, selectedField, input);
                                evt.preventDefault();
                                dontcall = true;
                            }
                            flag = false;

                        }else if(keyCode >=48 && keyCode <= 57 && selectedField.prop != 'meridian'){
                            if(selectedField.prop == 'hour'){
                                this.hourTimeSet.call(this, input, evt, "hour", start, end);
                            }else if(selectedField.prop == 'minute'){
                                this.hourTimeSet.call(this, input, evt, 'minute', start, end);
                            }
                            this.data.ltPropDropdown && this.constructNewDrop(input, timeFormat);
                        }else if((keyCode == 38 || keyCode == 40) && selectedField.prop != 'meridian'){
                            if(keyCode == 38){
                                this.timeIncrease.call(this, input, evt, selectedField.prop, start, end);
                            }
                            else{
                                this.timeDecrease.call(this, input, evt, selectedField.prop, start, end);
                            }
                            flag = false;
                            dontcall = true;
                        }else if(selectedField.prop == 'meridian'){
                            var val = input.value.trim().slice(6,input.value.length), final, key = String.fromCharCode(keyCode).toUpperCase();
                            if(meridian.PM.toUpperCase().indexOf(key) == 0){
                                val = meridian.PM;
                            }else if(meridian.AM.toUpperCase().indexOf(key) == 0){
                                val = meridian.AM;
                            }
                            else if([38, 40].indexOf(keyCode) != -1){
                                if(val == meridian.PM){
                                    val = meridian.AM
                                }else{
                                    val = meridian.PM
                                }
                            }
                            if(val != meridian.AM){
                            //  if(input.value.trim().slice(0, 2) == '12'){
                            //      final = this.replaceVal.call(this, input, '00', 0, 2);
                            //  }
                            // }else{
                                if(input.value.trim().slice(0, 2) == '00'){
                                    final = this.replaceVal.call(this, input, '12', 0, 2);
                                }
                            }
                            if(val){
                                final = this.replaceVal.call(this, final ? final : input, val, start, end);
                            }
                            if( !this.data.ltPropValidateOnBlur ){
                                var returnV = this.maxValCheck(final);
                                if(returnV == false){
                                    return false;
                                }
                            }
                            this.setData('ltPropDefaultTime', final);
                            flag = false;
                        }
                        !dontcall && this.fixSelection.call(this, 0, this.getData('selectedField'), input);
                     if(flag)
                        {
                            $L.fastdom.mutate(function(){
                                // restore current selection
                                input.selectionStart = start;
                                input.selectionEnd = end;
                            })
                        }
                     if(oriDrop.length != rendered.length && (keyCode < 48 || keyCode > 57)){
                        this.dropdown.ltProp( 'selected', '' );
                        this.setData('dropdownData', oriDrop);
                        this.dropdown.ltProp( 'selected', this.data.ltPropDefaultTime );
                     }  
                  } else if( /^8|46$/i.test( keyCode ) ) {
                    evt.preventDefault();
                  }
             },

             timeClick : function(){
                this.timeClick.apply(this, arguments)
             }
     },

     attrObs : function( arg ){

        var data = this.data;

        if( data.ltPropAria ){
            var elems = $L( "input,textarea", this.$node ),
            aria1 = "ltPropAriaAttributes",
            aria2 = "ltPropTimeAriaAttributes";

            if( !arg || arg.item == aria1 ){
                _lyteUiUtils.setAttribute( elems.get( 0 ), data[ aria1 ] || {}, arg ? arg.oldValue : {} )
            }

            if( data.ltPropType == "datetime" && ( !arg || arg.item == aria2 ) ){
                _lyteUiUtils.setAttribute( elems.get( 1 ), data[ aria2 ] || {}, arg ? arg.oldValue : {} )
            }
        }

     }.observes( 'ltPropAriaAttributes', 'ltPropAriaAttributes.{}', 'ltPropTimeAriaAttributes' ).on( 'didConnect' ),

     single_obs : function( arg ){

        if( !arg.path ){
            return;
        }

        var key = arg.path.replace( /^\./, '' ),
        newValue = arg.newValue,
        data = this.data;

        if( data.ltPropAria ){
            var obj = {};
            obj[ key ] = newValue;

            _lyteUiUtils.setAttribute( $L( 'input,textarea', this.$node ).get( /time/i.test( arg.item ) ? -1 : 0 ), obj, {} );
        }

     }.observes( 'ltPropAriaAttributes.*', 'ltPropTimeAriaAttributes.*' ),

     checkTimeStr : function( _this, frmblur ){
        if( this._emptytimeValue ){
            var value = _this.value || "",
            format = this.data.ltPropTimeFormat,
            form,
            meridian = this.data.meridian;
            if( format == 12 ){
                form = "hh:mm A";
                value = value.replace( meridian.AM, 'AM' ).replace( meridian.PM, 'PM' );
            } else {
                form = "HH:mm";
            }
            if( value && $L.moment( value, form ).validate() ){
                var ret = this._getCrctHour( _this.value, format, meridian );
                this.setData( 'ltPropDefaultTime', ret ? ret : this._findNearest( _this.value, format ) );
                delete this._emptytimeValue;
            } else if( value && frmblur ){
                if( this.data.ltPropStartTime == this.data.ltPropDefaultTime ){
                    this.setData( 'ltPropDefaultTime', "" );
                }
                this.setData( 'ltPropDefaultTime', this.data.ltPropStartTime );
                delete this._emptytimeValue;
            }
        }
     },

     check_dst : function( arr, check, return_value ){
        var Lc = Lyte.objectUtils,
        moment = $L.moment,
        _this = this,
        data = _this.data,
        date = data.ltPropCurrentDate,
        format = this.getCrctFormat(),
        timeFormat = data.ltPropTimeFormat == 12,
        __format = timeFormat ? 'hh:mm A' : 'HH:mm',
        fn = function( item ){            
            return $L.moment( date + ' ' + item.time, format + ' ' + __format ).format( __format ) != item.time;
        },
        common = function( item ){
            if( item.className ){
                Lc( item, 'delete', 'className' );
            }
        };

        if( !moment ){
            return;
        }

        if( check ){
            if( date ){
                var __moment = $L.moment( date + ' ' + arr, format + ' ' + __format  );
                if( return_value ){
                    return __moment.format( __format );
                }
                return __moment;
            }
            if( return_value ){
                return arr;
            }
            return $L.moment( arr, __format  );
        }

        if( date ){
            arr.forEach( function( item ){
                if( fn( item ) ){
                    if( !item.className ){
                        Lc( item, 'add', 'className', 'lyteDropdownActive' );
                    }
                } else {
                    common( item );
                }
            });
        } else {
            arr.forEach( common );
        }
     },

     update_iso : function(){
        if( this.__custom_iso ){
            return;
        }
        
        var __data = this.data,
        cur_date = __data.ltPropCurrentDate ? __data.ltPropCurrentDate : "invalid_date", //to make date invalid so that ltPropIso remains empty when curDate is empty
        exst_iso = __data.ltPropIso,
        exst_iso_date = exst_iso ? $L.moment( new Date( exst_iso ) ) : $L.moment( cur_date , this.getCrctFormat() ), 
        format = "DD-MM-YYYY",
        date = exst_iso_date.format( format ),
        time = __data.ltPropDefaultTime,
        moment;

        if( !date || !$L.moment ){
            return;
        }

        if( time ){
            var final_value = date + " " + time,
            final_format = format + " " + ( __data.ltPropTimeFormat == 12 ? "hh:mm A" : "HH:mm" );

            moment = $L.moment( final_value, final_format, { i18n : true } );

            if( !moment.validate() ){
                if( date ){
                    moment = $L.moment( date, format, { i18n : true } );
                    if( !moment.validate() ){
                        /**
                         * This case may cause issue. What to do when typed date is wrong? we need to set iso alone without modifying ltPropCurrentDate
                         */
                        return;
                    }
                }
            }
        } else {  
            moment = $L.moment( date, format, { i18n : true } );
        }

        this.__custom_iso = true;
        this.setData( "ltPropIso", moment.format() );
        delete this.__custom_iso;
     },

     iso_obs : function( arg ){
        if( this.__custom_iso ){
            return;
        }
        var __old = $L.moment( new Date( arg.oldValue ) ),
        __new = $L.moment( new Date( arg.newValue ) ),
        __data = this.data,
        current_date = __data.ltPropCurrentDate,
        format = this.getCrctFormat(),
        fn_name = this.data.ltPropCalendarProperties.i18n ? 'i18N' : "format",
        new_format = __new[ fn_name ]( format );

        if( __old[ fn_name ]( format ) == new_format && __old[ fn_name ]( 'YYYY' ) != __new[ fn_name ]( 'YYYY' ) && new_format == current_date ){
            /**
             * Always not correct. But assuming dates wont be continuously switched to exactly 100 years.
             */
            this._selected = true;
            this.dateCallback({
                oldValue : new_format,
                newValue : new_format,
                item : "ltPropCurrentDate"
            });

            if( this.getData('ltPropType') === 'datetime' ){
                this.update_iso();
            }

            setTimeout( function(){
                delete this._selected;
            }.bind( this ) );
        }        
     }.observes( 'ltPropIso' ),

     getCrctFormat : function(){
        var format = this.data.ltPropFormat,
        cal = this._assCalendar;

        return cal ? cal.component.getRelevantFormat( format ) : ( format || "" ).toUpperCase();
     }
});

function _lyteInput( evt ){
    // var inputs = document.body.getElementsByTagName( 'lyte-input' );
    var dateIp = _lyteUiUtils.input, inputs = Object.keys( dateIp || {} )
    for( var i = 0; i < inputs.length; i++ ){
        // if( /date/i.test( inputs[ i ].ltProp( 'type' ) ) ){
            var comp = dateIp[ inputs[ i ] ].component;
            if( evt.type == "click" ){
                comp.calenderClickHide.call( comp, evt );
            } else {
                comp.scrollFunc.call( comp, evt );
            }
        // }
    }
}

document[ "addEventListener" + ( _lyteUiUtils.isWidget ? "Global" : "" ) ]( "click", _lyteInput, true );
[ 'scroll', 'resize', 'orientationchange' ].forEach( function( item ){
    window.addEventListener( item, _lyteInput, true ); 
} );

/**
 * @syntax Text
 * @attribute ltPropType=text
 * <lyte-input  lt-prop-type="text" lt-prop-placeholder="enter text here" lt-prop-label="Name"> </lyte-input>
 */

/**
 * @syntax Number
 * @attribute ltPropType=number
 * <lyte-input lt-prop-label="Age" lt-prop-type="number"  lt-prop-placeholder="Enter number here"> </lyte-input>
 */

/**
 * @syntax Textarea
 * @attribute ltPropType=textarea
 * <lyte-input lt-prop-type="textarea" lt-prop-id="lyteinput" lt-prop-placeholder="Enter your comments" lt-prop-label="Comments" lt-prop-rows="5" lt-prop-cols="80" > </lyte-input>
 */

/**
 * @syntax Date
 * @attribute ltPropType=date
 * <lyte-input lt-prop-type="date" lt-prop-id="lyteinput" lt-prop-format="MM/DD/YYYY" lt-prop-label="Select DOB" lt-prop-placeholder="Select your DOB" > </lyte-input>
 */

/**
 * @syntax Time
 * @attribute ltPropType=time
 * <lyte-input lt-prop-type="time" lt-prop-time-format=12 lt-prop-wheel=true lt-prop-label="Select Time" > </lyte-input>
 */

/**
 * @syntax Date Time
 * @attribute ltPropType=datetime
 * <lyte-input lt-prop-type="datetime" lt-prop-placeholder="Select Date" lt-prop-format="MM/DD/YYYY" lt-prop-label="Date & Time"  > </lyte-input>
 */

 /**
  * @syntax Date Yielded
  * @attribute ltPropType=date
  * @attribute ltPropYield=true
  * <lyte-input lt-prop-type="date" lt-prop-yield = true lt-prop-format="MM/DD/YYYY" lt-prop-label="Select DOB" lt-prop-placeholder="Select your DOB" > 
  *     <template is = "registerYield" yield-name = "footer">
  *         calendar footer
  *     </template>
  * </lyte-input>
  */

 /**
  * @syntax Time Yielded
  * @attribute ltPropType=time
  * @attribute ltPropYield=true
  * <lyte-input lt-prop-type="time" lt-prop-yield = true lt-prop-time-format=12 lt-prop-wheel=true lt-prop-label="Select Time" > </lyte-input>
  *     <template is = "registerYield" yield-name = "item">
  *         {{itemValue.time}}
  *     </template>
  * </lyte-input>
  */

 /**
  * @syntax Date Time yielded
  * @attribute ltPropType=datetime
  * @attribute ltPropYield=true
  * <lyte-input lt-prop-type="datetime" lt-prop-yield = true lt-prop-placeholder="Select Date" lt-prop-format="MM/DD/YYYY" lt-prop-label="Date & Time"  > </lyte-input>
  *     <template is = "registerYield" yield-name = "item">
  *         {{itemValue.time}}
  *     </template>
  *     <template is = "registerYield" yield-name = "footer">
  *         calendar footer
  *     </template>
  * </lyte-input>
  */

  /**
  * @syntax Password
  * @attribute ltPropType=password
  * <lyte-input lt-prop-type="password" lt-prop-label="password" lt-prop-placeholder="Enter password here"> </lyte-input>
  * </lyte-input>
  */

  /**
 * @syntax staticBuilder
 * @attribute ltPropType=text
 * <lyte-input lt-prop-type="text" lt-prop-placeholder="enter text here" lt-prop-label="Name"> </lyte-input>
 */
