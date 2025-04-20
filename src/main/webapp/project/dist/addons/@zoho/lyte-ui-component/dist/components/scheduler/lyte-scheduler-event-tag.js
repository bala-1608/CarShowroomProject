Lyte.Component.register("lyte-scheduler-event-tag", {
_template:"<template tag-name=\"lyte-scheduler-event-tag\"> <lyte-yield yield-name=\"scheduler-event-badge\"> </lyte-yield> </template>",
_dynamicNodes : [{"type":"insertYield","position":[1]}],
_observedAttributes :["ltPropEvent"],

    data : function(){
        return {
            'ltPropEvent' : Lyte.attr('object',{default: {}})
        }       
    },
    isinBetween : function( curr_date, divPostion, endDate, scheduler ){
        var eventManipulator = new _lyteUiUtils.eventManipulator( scheduler.getData('ltPropFormat') );
        return eventManipulator.isinBetween(curr_date, divPostion, endDate, scheduler.getData('ltPropFormat'));
    },
    didConnect: function () {
        var scheduler  =  $L(this.$node).closest('lyte-scheduler')[0].component;
        var view = scheduler.getData('ltPropSchedulerView');
        var isMultiView = scheduler.getData('ltPropMultiUserView');
        if(isMultiView && view =='month'){
            return;
        }
        var eventData = this.getData('ltPropEvent');
        var format = scheduler.getData('ltPropFormat');
        var startDate = $L.moment(eventData.start, format);
        var event_tag  = this.$node;
        var startDiv =  $L(event_tag).closest('.scheduler-event-div')[0];
        this.$node.dataset.date = startDate.format('DD-MM-YYYY HH:mm')
        if(eventData.allDayEvent){
            this.$node.classList.add('lyteSchedulerAllDayEventTag');
        }
        if(startDiv){
            var curr_date = $L.moment(startDiv.dataset.date,'DD-MM-YYYY');
        }
        if(eventData.participantEvent){
            this.$node.classList.add('lyteSchedulerParticipantEvent')
        }
        var _this = this;
        if( !scheduler.getData('ltPropMultiUserView')){
            _this.$node.style.position ='absolute';
            if( eventData.allDayEvent || view === 'month' ){
                _this.setSchedulerEvents(_this.$node,scheduler,eventData,format,startDiv,curr_date,isMultiView,view);
            }else{
                _this.fixTimeLineEvent(eventData,startDate,format,scheduler,view,startDiv);
            }
        }else if(view === 'day' && scheduler.getData('ltPropMultiUserView')){
            if(eventData.allDayEvent ){
                _this.setSchedulerEvents(_this.$node,scheduler,eventData,format,startDiv,curr_date,isMultiView,view);
            }else{
                var endDate = $L.moment(eventData.end,format);
                var start_time = startDate.format('hh') + ':00 ' + startDate.format('A');
                var end_time = endDate.format('hh') + ':00 ' + endDate.format('A');
                var user = scheduler.$node.querySelector('[data-userid="'+eventData.userid+'"]');
                if(eventData.participantId && eventData.participantEvent){
                    user = scheduler.$node.querySelector('[data-userid="'+eventData.participantId+'"]');

                }
                var time_division = 60 / scheduler.getData('ltPropTimeLine');
                var startTimeDiv = $L('[data-time="'+ start_time +'"]',user)[0];
                if(startTimeDiv){
                    var startTimeDiv_width = startTimeDiv.offsetWidth / time_division;                                  
                    var parent_div = user.querySelector('[data-time="'+start_time+'"]');
                    var starttimeDivision = startDate.get('minutes') / scheduler.getData('ltPropTimeLine');
                    if(!parent_div.contains(_this.$node)){
                        Lyte.Component.appendChild( parent_div, _this.$node);
                    }
                    this.getData('eventIndex')
                    _this.$node.style.top = this.getData('eventIndex') *  ( _this.$node.offsetHeight + parseInt(window.getComputedStyle(_this.$node).marginTop) )  +'px';
                    _this.$node.style.left = starttimeDivision * startTimeDiv_width + 'px';
                    var endTimeDiv = user.querySelector('[data-time="'+end_time+'"]')
                    var diffMs = startDate.fromNow(endDate).timestamp
                    var diff =  Math.round((diffMs / 1000) / 60)
                    var endMin = diff < 15  ? endDate.add(15 - diff , 'minutes').get('minutes') : endDate.get('minutes'); 
                    _this.$node.style.width =  ( endTimeDiv.getBoundingClientRect().left - _this.$node.getBoundingClientRect().left ) +  (endMin / scheduler.getData('ltPropTimeLine')  ) * startTimeDiv_width + 'px';
                    var startDiv = this.$node.closest('.lyteSchedulerMultiUserViewEventElem');
                    this.addHeightToDate(Math.ceil((starttimeDivision * startTimeDiv_width+_this.$node.offsetWidth)/startDiv.offsetWidth),event_tag.offsetHeight + parseInt(window.getComputedStyle(event_tag).marginTop),startDiv.dataset.time,user,'time',scheduler,isMultiView,view);
                }
            }
        }else if(view == 'week'){
            _this.$node.style.position ='absolute';
            _this.setSchedulerEvents(_this.$node,scheduler,eventData,format,startDiv,curr_date,isMultiView,view);
        }else{
            var date_td = scheduler.$node.querySelector('.lyteSchedulerDate').children[0];
            var cs =  window.getComputedStyle(date_td);
        }
        if(!_this.$node.dataset.id){
            _this.$node.dataset.id = _this.$node.getAttribute('id');
        }
        if(this.getMethods('eventRender')){
            this.executeMethod('eventRender',this.$node);
        }
    },
    fixTimeLineEvent : function(eventData,startDate,format,scheduler,view,startDiv){
        var endDate = $L.moment(eventData.end,format);
        var timelineInterval = scheduler.getData('ltPropTimeLine'); 
        var start_min = timelineInterval * parseInt((startDate.format('mm')/timelineInterval));
        var start_time = 'T'+startDate.format('hh') + ('0' + start_min).slice(-2)  + startDate.format('A');
        var startTimeDiv =  scheduler.$node.querySelector('#'+start_time);
        var top;
        var height;
        if(startTimeDiv){
            var startTimeDivRect = startTimeDiv.getBoundingClientRect();
            var interval = (startTimeDivRect.height / timelineInterval);
            var stratminDiff =  interval * ( startDate.format('mm') % timelineInterval );
            var header_height = 0;
            if(view == 'day'){
                header_height = scheduler.$node.querySelector('.lyteSchedulerDayViewAllDayRow').offsetHeight;
            }
            var endDate = $L.moment(eventData.end,format);
            var diffMs = startDate.fromNow(endDate).timestamp;
            var diff =  Math.round((diffMs / 1000) / 60);
            diff = diff < 15 ? 15 : diff;
            top =  startTimeDivRect.top + stratminDiff - startTimeDiv.offsetParent.getBoundingClientRect().top + parseInt(window.getComputedStyle(startTimeDiv.querySelector('td')).borderTopWidth) - header_height + 'px';
            height = diff  * interval + 'px';
        }
        this.setWidthForTimeLine(startDiv,scheduler,top,height);
    },
    setSchedulerEvents : function(event_tag,scheduler,eventData,format,startDiv,curr_date,isMultiView,view){
        var user;
        event_tag  = this.$node;
        var startDiv =  $L(event_tag).closest('.scheduler-event-div')[0];
        var startDivRect = getComputedStyle(startDiv);
        var top;
        var width;
        if(view == 'week' || (view == 'day' && isMultiView)){
            user = scheduler.$node.querySelector('[data-userid="'+eventData.userid+'"]');
            if(eventData.participantId && eventData.participantEvent){
                user = scheduler.$node.querySelector('[data-userid="'+eventData.participantId+'"]');
            }
            top = parseInt(startDivRect.height) +  parseInt(window.getComputedStyle(event_tag).marginTop) +'px';
        }
        var divPosition = $L(event_tag).closest('.scheduler-event-div')[0].dataset.date;
        if(eventData.end){
            var endDate = $L.moment(eventData.end, format);
            var isinBetween = this.isinBetween(curr_date.format('DD-MM-YYYY'),divPosition,endDate.format('DD-MM-YYYY'), scheduler);
            var number_height = 0;
            var eventTagRect = event_tag.getBoundingClientRect();
            var eventTagcs = window.getComputedStyle(event_tag);
            var paddingTop = 0;
            var cs;
            var datetd_width = 0;
            if(!scheduler._DayNumberHeight){
                var date_td =  $L(event_tag).closest('.lyteSchedulerDate')[0];
                cs = window.getComputedStyle(date_td);
                paddingTop = parseInt(cs.paddingTop);
                if(view == 'month'){
                    number_height = $L('.lyteSchedulerDayNumber',scheduler.$node)[0].offsetHeight;
                }
                number_height += paddingTop;
                scheduler._DateTdcs = cs;
                datetd_width = scheduler._DateWidth = date_td.offsetWidth;
                scheduler._DayNumberHeight = number_height;
            }else{
                cs = scheduler._DateTdcs;
                datetd_width = scheduler._DateWidth;
                paddingTop =  parseInt(cs.paddingTop);
                number_height = scheduler._DayNumberHeight;
            }
            if(isinBetween  && (view !== 'day')){
                var interval = scheduler.getEventInterval(divPosition,endDate.format('DD-MM-YYYY'),'DD-MM-YYYY') + 1 ;
                var width = (interval * datetd_width) - 2 * parseInt(cs.paddingRight);
                if( view !== 'day' ){
                    width = (interval * datetd_width) - 2 * parseInt(cs.paddingRight);
                    var schedulerRect = scheduler.$node.getBoundingClientRect();
                    var schedulerRight = schedulerRect.right;
                    var eventLeft = eventTagRect.left;
                    if( (width + eventLeft)  > (schedulerRight) ){
                        var overflow = $L('.lyteSchedulerMonthViewWrapper',scheduler.$node)[0];
                        var scrollBar = 0;
                        if(overflow){
                            if(overflow.scrollHeight > overflow.clientHeight){
                                scrollBar = _lyteUiUtils.getScrollBarWidth() ;
                            }
                        }
                        width =   ( schedulerRight -  parseInt(cs.paddingRight) - eventLeft) - scrollBar ;
                    }
                }else{
                    width = (datetd_width) - 2 * parseInt(cs.paddingRight);
                }
                top = number_height + this.getData('eventIndex') *  ( eventTagRect.height + parseInt(eventTagcs.marginTop) ) + 'px';
            }else{
                var width = eventTagRect.width;
                if((view !== 'day')){
                    top = number_height + this.getData('eventIndex') *  ( eventTagRect.height + parseInt(eventTagcs.marginTop) ) + 'px';
                }else{
                    top = parseInt(startDivRect.height)  + paddingTop + 'px';
                }
            }
        }
        this.$node.style.cssText += 'left:'+ parseInt(cs.paddingLeft) +'px; width:' + width + 'px; top:'+ top +';';
        var cs =  window.getComputedStyle(startDiv);
        this.addHeightToDate(Math.round(width/parseInt(startDivRect.width)),eventTagRect.height + parseInt(eventTagcs.marginTop),divPosition,user,undefined,scheduler,isMultiView,view);
    },
    addHeightToDate : function( interval, event_height, startDay, user ,selector, scheduler,isMultiView,view){
        var curr_date = startDay;
        var format =  scheduler.getData('ltPropFormat');
        format = (format.split(' '))[0];
        for(var index = 0; index < (interval); index++){
            user =  user ? user : $L('.lyteSchedulerViewMainTable',scheduler.$node)[0];
            selector = selector ? selector : 'date';
            var date_div = user.querySelector('[data-'+ selector +'="'+curr_date+'"]');
            if(date_div){
                var dateHeight = $L('.lyteSchedulerDayNumber',scheduler.$node)[0];
                if(dateHeight){
                    dateHeight = dateHeight.offsetHeight;
                }else{
                    dateHeight = 0;
                }
                var Newheight = dateHeight + (this.getData('eventIndex') + 1) * event_height;
                date_div.style.height = Newheight + 'px';
                if(!isMultiView && view !== "month"){
                    var shadow_div = document.querySelectorAll('.lyteSchedulerAllDayEvent .scheduler-event-div')[1];
                    if(shadow_div){
                        shadow_div.style.height = Newheight + 'px';
                    }
                }
            }
            if(selector == 'date'){
                curr_date = $L.moment(startDay,'DD-MM-YYYY').add((index+1),"date").format(format);
            }else{
                curr_date = $L.moment(startDay,'hh:mm A').add((index+1),'hours').format('hh:mm A');
            }
        }
    },
    findIntersect  : function(interset,event_div,date_div,index){
        interset = interset ? interset : [];
        var intersetindex = index;
		if(!interset.includes(event_div)){
			interset[intersetindex] = event_div;
		}
        for(var Iindex = 0 ; Iindex < date_div.length ; Iindex++){
            if(date_div[Iindex] !== event_div && this.isTimeOverlap(date_div[Iindex],event_div) && !interset.includes(date_div[Iindex])){
				if(date_div[Iindex]){
					interset = this.findIntersect(interset,date_div[Iindex],date_div,Iindex);
				}
            }
        } 
        return interset;
    },
    setWidthForTimeLine: function (parent, scheduler, top, height) {
        var view = scheduler.getData('ltPropSchedulerView');
        var gap = scheduler.getData('ltPropEventGap');
        var isRTL =_lyteUiUtils.getRTL();
        let depthArrayCount = this.getData('ltPropCount');
        const parentElement = this.$node.offsetParent;
        const parentWidth = parentElement.offsetWidth - parseInt(window.getComputedStyle(parentElement).paddingRight);
        const gapBetweenEvents = gap; 
        var event = this.getData('ltPropEvent');
        var paddingLeft = parseInt(window.getComputedStyle(parentElement).paddingRight);
        const columnWidth = (parentWidth - paddingLeft) / depthArrayCount;
        var col = this.getData('ltPropCol');
        var minWidth = (parentWidth - paddingLeft)/ depthArrayCount;
        var totalWidth = parentWidth - paddingLeft;
        var prevElem = $L('#u'+this.getData('ltPropPrevelem'),scheduler.$node)[0];
        var width = minWidth;
        var right;
        var intersect = this.getData('ltPropIntersect');
        if (prevElem) {
            var perv_intersect = $L('.lyteSchedulerTimelineEvent',prevElem)[0];
            if(scheduler.getData('ltPropWeekEventOverlap') && view == 'week'){
                if( scheduler.getData('ltPropWeekEventOverlap') && perv_intersect.getBoundingClientRect().bottom < this.$node.getBoundingClientRect().top){
                    if(isRTL){
                        right = ( prevElem.offsetParent.getBoundingClientRect().right - prevElem.getBoundingClientRect().right ) + (prevElem.offsetWidth * 0.10);
                    }else{
                        left = prevElem.offsetLeft + (prevElem.offsetWidth * 0.20);
                    }
                    totalWidth -= (prevElem.offsetLeft + (prevElem.offsetWidth * 0.20));
                }else{
                    if(isRTL){
                        right =   ( prevElem.offsetParent.getBoundingClientRect().right - prevElem.getBoundingClientRect().right ) + (prevElem.offsetWidth * 0.5);
                    }else{
                        left = prevElem.offsetLeft + (prevElem.offsetWidth * 0.5);
                    }   
                    totalWidth -= (prevElem.offsetLeft + (prevElem.offsetWidth * 0.5));
                }
                if(intersect && intersect.length > 0){
                    var ActualWidth = (totalWidth)/Math.min(intersect.length+1,depthArrayCount);
                }else{
                    var ActualWidth = totalWidth;
                }
                width = ActualWidth + gapBetweenEvents;
            }else{
                left = (col - 1) * minWidth ;
                width = columnWidth;
            }
        } else {
            if(isRTL){
               right = gapBetweenEvents;
            }else{
                left = gapBetweenEvents;
            }
            width = columnWidth;
            if(scheduler.getData('ltPropWeekEventOverlap') && view == 'week'){
                width += gapBetweenEvents;
            }
        }
        if(isRTL){
            this.$node.style.cssText += 'right:'+ right +'; width:' + width + 'px; top:'+ top +'; height:'+ height +'; position:absolute;';
        }else{
            this.$node.style.cssText += 'left:'+ left +'px; width:' + width + 'px; top:'+ top +'; height:'+ height +'; position:absolute;';
        }
        var nmore = $L('.lyteSchedulerEventMoreBtn[data-group="'+ this.$node.dataset.group +'"]',parent)[0];
        if (nmore) {
            nmore.style.height = 'fit-content';
            nmore.style.top = LastEnd.offsetTop + LastEnd.offsetHeight - nmore.offsetHeight + 'px';
        }
    },
    ResetWidth : function(prevSetted, scheduler){
        var keys = Object.keys(prevSetted);
        for(var index = 0 ; index < keys.length; index++){
            var interset = $L('#u'+ keys[index] ,scheduler.$node)[0];
            var events = prevSetted[keys[index]];
            var related =  interset;
            var precentage = ( interset.offsetWidth / interset.parentElement.offsetWidth ) * 100;
            for(var _index = 0 ; _index < events.length; _index++){
                var event = events[_index];
                event.style.left =  related.offsetLeft + related.offsetWidth + gap + 'px';
                event.style.width = 'calc(' + (100 - precentage)/ events.length + '% - '+ ( gap + gap /(events.length+1) ) + 'px)';
                related = event;
            }
        } 
    },
    isTimeOverlap : function(item,event_div){
        var item_offset = item.getBoundingClientRect();
        var event_offset = event_div.getBoundingClientRect();
        if((item_offset.top <= event_offset.top && item_offset.bottom >= event_offset.top)  || 
            (event_offset.bottom >= item_offset.top && event_offset.bottom <= item_offset.bottom) ){
            return true;
        }
    },
    actions : {
        // Functions for event handling
    },
    methods : {
        // Functions which can be used as callback in the component.
    }
});
