( function() {
	var eventManipulator = function( format ) {
		this.events = [];
		this.format = format;
	};
	var hiddenObj;
	var allDayHidden = {};
	eventManipulator.prototype.addEvents = function( events ) {
		this.events = this.events.concat( events );
		this.sortEvents();
	}
	eventManipulator.prototype.removeEvents = function( eventsToRemove ) {
		var that = this;

		this.events.filter( function( event ) {
			return that.shouldRemoveEvent( eventsToRemove, event );
		} );
	}
	eventManipulator.prototype.shouldRemoveEvent = function( eventsToRemove, event ) {
		for( var i = 0; i < eventsToRemove.length; i++ ) {
			if( event.id === eventsToRemove[ i ].id ) {
				return false;
			}
		}

		return true;
	}
	eventManipulator.prototype.sortEvents = function() {
		var that = this;
		this.events.sort( function( eventA, eventB ) {
			if(eventA.overdue){
				return -1;
			} 
			if(eventB.overdue){
				return 1;
			}
			const sortBAfterA = -1,
			sortAAfterB = 1;
			var format = that.format,
			eventAStartDate = eventA.start,
			eventBStartDate = eventB.start;
			if(format == ''){
				var eventAStart = new Date(eventAStartDate).getTime(),
				eventBStart = new Date(eventBStartDate).getTime()
				dateCompareObj = eventBStart - eventAStart,
				differenceBetweenDates = dateCompareObj;
			}else{
				dateCompareObj = $L.moment( eventAStartDate, format ).fromNow( $L.moment( eventBStartDate, format ) ),
				differenceBetweenDates = dateCompareObj.timestamp;	
			}

			if( differenceBetweenDates != 0 ) {
				return differenceBetweenDates > 0 ? sortBAfterA : sortAAfterB;
			}
			else {
				return that.compareEndDates( eventA, eventB );
			}
		} );
	}
	eventManipulator.prototype.compareEndDates = function( eventA, eventB ) {
		const sortBAfterA = -1,
		sortAAfterB = 1;
		var eventAEndDate = eventA.end || '',
		eventBEndDate = eventB.end || '',
		format = this.format;
		if(format == ''){
			var eventAEnd = new Date(eventAEndDate).getTime(),
			eventBEnd = new Date(eventBEndDate).getTime(),
			dateCompareObj = eventBEnd -  eventAEnd,
			differenceBetweenDates = dateCompareObj;
		}else{
			var dateCompareObj = $L.moment( eventAEndDate, format ).fromNow( $L.moment( eventBEndDate, format ) ),
			differenceBetweenDates = dateCompareObj.timestamp;	
		}
		return differenceBetweenDates >= 0 ? sortAAfterB : sortBAfterA;
		
	}
	eventManipulator.prototype.generateEventObjArr = function( event , format, view , weekStart , isMultiUser , maxEvent , businessDays, isWorkingOnly){
		var schedulerevent =  event;
		var eventObj = {};
		hiddenObj = {};
		schedulerevent.forEach(function(item){
			var start_date = createDateObj(item.start,format);
			var end_date =  createDateObj(item.end,format)
			var start_format = getFormatDate(start_date, 'DD-MM-YYYY');
			var end_format = getFormatDate(end_date, 'DD-MM-YYYY');
			item.allDayEvent = true;
			if( start_format === end_format && !this.isAllDay(start_date,end_date) ){
				item.allDayEvent = false;
			}
			eventObj = addEventObj(start_date,eventObj,item,start_format,view,format , weekStart, isMultiUser , maxEvent, null ,businessDays, isWorkingOnly,createDateObj(item.start,format),end_date,end_format);
		});
		if(view == 'day'){
			for (key in eventObj) {
				var depthArray = [];
				var prevElem = null;
				var allDay = [];
				eventObj[key].forEach(function(event){
					if(event.allDayEvent){
						allDay.push(event);
						return;
					}
					let placed = false;
					var intersectArray = [];
					var obj = {};
					for (let depth = 0; depth < depthArray.length; depth++) {
						const column = depthArray[depth];
						if(!obj.intersect){obj.intersect = [];}
						if (!column.some(prevEvent => {if(isBetweenEvents( prevEvent.event.start, event.start, prevEvent.event.end, format ) || isBetweenEvents( prevEvent.event.start, event.end, prevEvent.event.end, format )){  prevElem = prevEvent.event; intersectArray.push(prevEvent); return true;  }})) {
							obj.col = depth + 1;
							obj.event = event;
							if(prevElem){
								obj.prevElem = prevElem.id;
							}
							column.push(obj);
							placed = true;
							break;
						}
					}
			
					if (!placed) {
						obj.col = depthArray.length + 1;
						obj.event = event;
						if(prevElem){
							obj.prevElem = prevElem.id;
						}
						depthArray.push([obj]);
					}
					intersectArray.forEach(function(intersect){
						if(!intersect.intersect){
							intersect.intersect = [];
						}
						if(!intersect.intersect.includes(obj.col)){
							intersect.intersect.push(obj.col);
						}
					})
				});
				eventObj[key] = {'allDay' : allDay, 'timeline' : depthArray};
			}
		}
		return {'eventObj': eventObj, 'hiddenObj': hiddenObj};
	}

	eventManipulator.prototype.generateEventObjArrNmore = function( event, format, view, weekStart, isMultiUser, AllDayMaxEvent , TimelineMaxEvent, businessDays, isWorkingOnly){	
		var schedulerevent =  event;
		var eventObj = {}, eventObjInfo = {};
		var hiddenObj = {};
		var allDay = {};
		schedulerevent.forEach(function(item){
			var start_date = createDateObj(item.start,format);
			var end_date =  createDateObj(item.end,format);
			var start_format =  getFormatDate(start_date, 'DD-MM-YYYY');
			var end_format =  getFormatDate(end_date, 'DD-MM-YYYY');
			item.allDayEvent = true;
			if( view === 'month' && isMultiUser ){
				var loop_date = createDateObj(item.start,format), loop_format;
				while( isPast(loop_date,end_date) === false ) {
					loop_format = getFormatDate(loop_date, 'DD-MM-YYYY');
					pushToEventObjWithoutGrp( hiddenObj, eventObj, item, loop_format, AllDayMaxEvent );
					loop_date.setDate(loop_date.getDate()+1);
				}
			}else if( start_format === end_format && !this.isAllDay(start_date,end_date) ){
				item.allDayEvent = false;
				if(view == 'day'){
					eventObj = pushToTimeline( hiddenObj, eventObj, eventObjInfo, item, isMultiUser, view, format, start_format, TimelineMaxEvent );
				}else{
					pushToEventObj( hiddenObj, eventObj, eventObjInfo, item, isMultiUser, view, format, start_format, TimelineMaxEvent );
				}
			}else{
				allDay = addEventObj(start_date,allDay,item,start_format,view,format , weekStart, isMultiUser , AllDayMaxEvent, true ,businessDays, isWorkingOnly,$L.moment(item.start,format),end_date,end_format);
			}

		});
		if(view == 'week'){
			for (key in eventObj) {
				var prevElem = null;
				for( group in  eventObj[key] ){
					if(group == 'allday'){
						continue;
					}
					
					var depthArray = [];
					prevElem = null;
					eventObj[key][group].forEach(function(event){
						let placed = false;
						var intersectArray = [];
						var obj = {};
						for (let depth = 0; depth < depthArray.length; depth++) {
							const column = depthArray[depth];
							if(!event.intersect){event.intersect = [];}
							
							if (!column.some(prevEvent => {if(isBetweenEvents( prevEvent.event.start, event.start, prevEvent.event.end, format ) || isBetweenEvents( prevEvent.event.start, event.end, prevEvent.event.end, format )){  prevElem = prevEvent.event; intersectArray.push(prevEvent); return true;  }})) {
								obj.col = depth + 1;
								obj.event = event;
								if(prevElem){
									obj.prevElem = prevElem.id;
								} 
								column.push(obj);
								placed = true;
								break;
							}
						}
				
						if (!placed) {
							obj.col = depthArray.length + 1;
							obj.event = event;
							if(prevElem){
								obj.prevElem = prevElem.id;
							} 
							depthArray.push([obj]);
						}
						intersectArray.forEach(function(intersect){
							if(!intersect.intersect){
								intersect.intersect = [];
							}
							if(!intersect.intersect.includes(obj.col)){
								intersect.intersect.push(obj.col);
							}
						})
					});
					eventObj[key][group] = depthArray;
				}
			}
		}
		eventObj.allDay = allDay;
		hiddenObj.allDay = allDayHidden;
		allDayHidden = {};
		return {'eventObj': eventObj, 'hiddenObj': hiddenObj};
	}
	getFormatDate = function(date,format){
		var Mregex = /MM/;
		var Dregex = /DD/;
		var Yregex = /YYYY/;
		format = format.replace(Mregex, ('0' + (date.getMonth() + 1)).slice(-2) );
		format = format.replace(Dregex,('0' + date.getDate()).slice(-2) );
		format = format.replace(Yregex, date.getFullYear());
		return format;
	}
	createDateObj = function(date,format){
		if(format == ''){
			return new Date(date); 
		}
		return $L.moment(date,format).getDObj();
	}
	isPast = function(start_date,end_date){
		return end_date < start_date;
	}
	isAllDay = function(start_date,end_date){
		const diffInMilliseconds = Math.abs(end_date - start_date);
		const diffInSeconds = diffInMilliseconds / 1000;
		if( diffInSeconds >= 86399 ){
			return true;
		}
		return false;
	}
	pushToEventObjWithoutGrp = function( hiddenObj, eventObj, event, date, maxEvent , userid ,isparticipant){
		var user = userid ? userid : event.userid;
		if( !eventObj[date] || !eventObj[date][user] ){
			eventObj[date] = eventObj[date] ? eventObj[date] : {};
			
		}
		
		var objLen = Object.keys(eventObj[date]).length;
		if( objLen >= maxEvent && !eventObj[date][user] ){
			hiddenObj[date] = hiddenObj[date] ? hiddenObj[date] : {};
			hiddenObj[date][user] = hiddenObj[date][user] ? hiddenObj[date][user] : [];
			hiddenObj[date][user].push( event );
			return;
		}
		if(!eventObj[date][user]){
			eventObj[date][user] = eventObj[date][user] ? eventObj[date][user] : [];
		}
		if(event.participantId && !isparticipant){
			event.participantId.forEach(function(participantEvent){
				var clonedEvent = $u.clone(event);
				clonedEvent.participantEvent = true;
				clonedEvent.participantId = participantEvent.id;
				pushToEventObjWithoutGrp(hiddenObj,eventObj,clonedEvent,date,maxEvent,participantEvent.id,true);
			})
		}
		eventObj[date][user].push(event);
	}
	pushToTimeline = function( hiddenObj, eventObj, eventObjInfo, event, isMultiUser, view, format, date, maxEvent, userid, isparticipant){
		var user = userid ? userid : event.userid;
		var start = createDateObj(event.start,format);
		var end = createDateObj(event.end,format)
		var startDate = getFormatDate(start,'DD-MM-YYYY');
		var hour = start.getHours(); 
		var timeAmPm = (hour >= 12 ? 'pm' : 'am');
		hour %= 12;
		hour = hour ? hour : 12;
	 	var start_time = hour  + timeAmPm;
		 if(!eventObj[startDate]){
			eventObj[startDate] = {};
		}
		if(!eventObj[startDate][user]){
			eventObj[startDate][user] = {};
			eventObj[startDate][user].count = 0;
		}
		if(event.participantId && !isparticipant){
			event.participantId.forEach(function(participantEvent){
				var clonedEvent = $u.clone(event);
				clonedEvent.participantEvent = true;
				clonedEvent.participantId = participantEvent.id;
				eventObj = pushToTimeline(hiddenObj,eventObj,eventObjInfo,clonedEvent,isMultiUser,view,format,date,maxEvent,participantEvent.id,true)
			})
		}
		if(!eventObj[startDate][user][start_time] || maxEvent > eventObj[startDate][user][start_time].length){
			if(!eventObj[startDate][user][start_time]){
				eventObj[startDate][user][start_time] = [];
			}	
			var diffMs = end.getTime() - start.getTime();
			var diff =  Math.round((diffMs / 1000) / 60)
			if(diff < 15){
				end.setMinutes(end.getMintues() + (15-diff));
			}
			var timelineArray = eventObj[startDate][user][start_time];
			var index = 0;
			for(index; index < timelineArray.length ; index++){
				var flag = false;
				for(var rowIndex = 0; timelineArray[index] && rowIndex < timelineArray[index].length; rowIndex++){
					if(!isinBetween( timelineArray[index][rowIndex].start, start.toString(), timelineArray[index][rowIndex].end, format, true, 15 ) && !isinBetween( timelineArray[index][rowIndex].start, end.toString(), timelineArray[index][rowIndex].end, format, true, 15 ) ){
						flag = true;
					}else{
						flag = false;
					}
				}
				if(flag){
					break;
				}
			}
			if(!eventObj[startDate][user][start_time][index]){
				eventObj[startDate][user][start_time][index] = [];
			}
			eventObj[startDate][user][start_time][index].push(event);
			var hour = end.getHours(); 
			
			timeAmPm = (hour >= 12 ? 'pm' : 'am');
			hour %= 12;
			hour = hour ? hour : 12;
	 		end_time = hour + timeAmPm;
			start.setMinutes(0);
			start.setHours(start.getHours()+1);
			while(!isPast(start,end) && startDate == getFormatDate(start,'DD-MM-YYYY') ){
				hour = start.getHours(); 
				timeAmPm = (hour >= 12 ? 'pm' : 'am');
				hour %= 12;
				hour = hour ? hour : 12;
	 			start_time = hour + timeAmPm;
				eventObj[startDate][user][start_time] = eventObj[startDate][user][start_time] ? eventObj[startDate][user][start_time] : [];
				var clonedEvent =  $u.clone(event);
				clonedEvent.hiddenid = true;
				if(!eventObj[startDate][user][start_time][index]){
					eventObj[startDate][user][start_time][index] = []
				}
				eventObj[startDate][user][start_time][index].push(clonedEvent);
				start.setHours(start.getHours()+1);
			}
			eventObj[startDate][user].count += 1; 
			
		}else{
			hiddenObj[startDate] = hiddenObj[startDate] ? hiddenObj[startDate] : {};
			if(!hiddenObj[startDate][user]){
				hiddenObj[startDate][user] = {};
			}
			hiddenObj[startDate][user] = hiddenObj[startDate][user] ? hiddenObj[startDate][user] : [];
			if(!hiddenObj[startDate][user][start_time]){
				hiddenObj[startDate][user][start_time] = [];
			}
			eventObj[startDate][user].count += 1; 
			hiddenObj[startDate][user][start_time].push(event);
		}
		return eventObj;
	}
	pushToEventObj = function( hiddenObj, eventObj, eventObjInfo, event, isMultiUser, view, format, date, maxEvent ){
		var user = event.userid;
		if( isMultiUser && view !== 'month' ){
			if( !eventObj[date] || !eventObjInfo[date] || !eventObj[date][user] || !eventObjInfo[date][user] ){
				eventObj[date] = eventObj[date] ? eventObj[date] : {};
				eventObjInfo[date] = eventObjInfo[date] ? eventObjInfo[date] : {};
				eventObj[date][user] = eventObj[date][user] ? eventObj[date][user] : {}
				eventObjInfo[date][user] = eventObjInfo[date][user] ? eventObjInfo[date][user] : {}

				createNewGrp( event, eventObj[date][user], eventObjInfo[date][user]);
			}
			else{
				var ret = isEventIntersect( event, eventObjInfo[date][user], format );
				if( ret !== false ){
					var objLen = eventObj[date][user]['grp'+ret].length;
					
					if( objLen >= maxEvent ){
							hiddenObj[date] = hiddenObj[date] ? hiddenObj[date] : {};
							hiddenObj[date][user] = hiddenObj[date][user] ? hiddenObj[date][user] : {};
							hiddenObj[date][user]['grp'+ret] = hiddenObj[date][user]['grp'+ret] ? hiddenObj[date][user]['grp'+ret] : [];

							hiddenObj[date][user]['grp'+ret].push( event );
							return;
					}
					
					eventObj[date][user]['grp'+ret].push(event);

					var oldStart = $L.moment(eventObjInfo[date][user]['grp'+ret].start,format), oldEnd = $L.moment(eventObjInfo[date][user]['grp'+ret].end,format);
					var newStart = $L.moment(event.start,format), newEnd = $L.moment(event.end,format);

					if( oldStart.fromNow(newStart).past ){
						eventObjInfo[date][user]['grp'+ret].start = event.start;
					}
					if( !(oldEnd.fromNow(newEnd).past) ){
						eventObjInfo[date][user]['grp'+ret].end = event.end;
					}
				}
				else{
					createNewGrp( event, eventObj[date][user], eventObjInfo[date][user]);
				}
			}
		}
		else{
			if( !eventObj[date] || !eventObjInfo[date] ){
				eventObj[date] = {};
				eventObjInfo[date] = {};
				createNewGrp( event, eventObj[date], eventObjInfo[date] );
			}
			else{
				var ret = isEventIntersect( event, eventObjInfo[date], format );
				if( ret !== false ){
					var objLen = eventObj[date]['grp'+ret].length;

					if( objLen >= maxEvent ){
							hiddenObj[date] = hiddenObj[date] ? hiddenObj[date] : {};
							hiddenObj[date]['grp'+ret] = hiddenObj[date]['grp'+ret] ? hiddenObj[date]['grp'+ret] : [];

							hiddenObj[date]['grp'+ret].push( event );
							return;
					}
					eventObj[date]['grp'+ret].push(event);

					var oldStart = $L.moment(eventObjInfo[date]['grp'+ret].start,format), oldEnd = $L.moment(eventObjInfo[date]['grp'+ret].end,format);
					var newStart = $L.moment(event.start,format), newEnd = $L.moment(event.end,format);

					if( oldStart.fromNow(newStart).past ){
						eventObjInfo[date]['grp'+ret].start = event.start;
					}
					if( !(oldEnd.fromNow(newEnd).past) ){
						eventObjInfo[date]['grp'+ret].end = event.end;
					}
				}
				else{
					createNewGrp( event, eventObj[date], eventObjInfo[date]);
				}
			}
		}
	}

	isEventIntersect = function( event, eventObjInfo, format){
		var ind = 0;
		if(Object.keys(eventObjInfo).length === 0){
			return false;
		}
		for( var key in eventObjInfo ){
			var cur = eventObjInfo[key];

			if( isBetweenEvents( cur.start, event.start, cur.end, format ) || isBetweenEvents( cur.start, event.end, cur.end, format ) ){
				return ind;
			}
			ind += 1;
		}
		return false;
	}

	createNewGrp = function( event, eventObj, eventObjInfo ){
		var len = Object.keys(eventObj).length;
		eventObj['grp'+len] = [];
		eventObjInfo['grp'+len] = {
			start: event.start,
			end: event.end
		};
		eventObj['grp'+len].push(event);
	}

	isBetweenEvents = function( start, curr_date, end, format ) {
		function parseTime(timeStr) {
			if(format == ''){
				return new Date(timeStr);
			}else{
				var timeStartIndex = format.indexOf('hh:mm');
				const timeLength = 'hh:mm a'.length;
				const timeString = timeStr.substr(timeStartIndex, timeLength);
				let [time, period] = timeString.split(' ');
				let [hours, minutes] = time.split(':');
				if (hours === '12') {
					hours = '00';
				}
			
				if (period === 'PM') {
					hours = parseInt(hours, 10) + 12;
				}
				hours = hours.padStart(2, '0');
				minutes = minutes.padStart(2, '0');
				return new Date(`1970-01-01T${hours}:${minutes}:00Z`);
			}
		}
	
		const time = parseTime(curr_date);
		start = parseTime(start);
		end = parseTime(end);
		if (start < end) {
			return start <= time && time <= end;
		} else { // Over midnight scenario
			return start <= time || time <= end;
		}
	}

	eventManipulator.prototype.isinBetween = function(date,eventObj,event,indexDate,view,format , weekStart, isMultiUser , maxEvent){
		return isinBetween(date,eventObj,event,indexDate,view,format , weekStart, isMultiUser , maxEvent);
	}
	addEventObj = function(date,eventObj,event,indexDate,view,format , weekStart, isMultiUser , maxEvent,isallDay, businessDays, isWorkingOnly,start_date, end_date, end_format){
		var start_format = indexDate;
		var cloneObject =  { ...event };
		var weekstart = weekStart === undefined ? 0 : weekStart;
		if(start_format == getFormatDate(date,'DD-MM-YYYY')){
			cloneObject.StartOfEvent = true;
		}else{
			delete cloneObject.middleofevent;
			cloneObject.endOfevent  = true;
		}
		if( isexceedMaxevent(eventObj,indexDate,event,isMultiUser,view,maxEvent) && (cloneObject.allDayEvent || view == 'month' || (isMultiUser && view == 'week'))  ){
			addHiddenObj(indexDate,cloneObject,event,isMultiUser,view,isallDay,maxEvent, businessDays, isWorkingOnly,undefined,format,eventObj);
			if((view == 'month' && !isMultiUser) || (view == 'week' && isMultiUser)){
				return eventObj;
			}
		}else{
			eventObj = pushEvent(eventObj,event.userid,indexDate,cloneObject,isMultiUser,view, businessDays, isWorkingOnly,maxEvent,false,format)
		}	
		if(( view !== 'week' )  && ( isMultiUser || ( view== 'day' && !isMultiUser))){
			if(start_format !== end_format ){
				date.setDate(date.getDate()+1);
				indexDate = getFormatDate(date,'DD-MM-YYYY');
				eventObj = addEventObj(date,eventObj,event,indexDate,view,format,weekStart, isMultiUser ,maxEvent,isallDay,businessDays, isWorkingOnly, start_date, end_date, end_format);
			}
		}
		else{
			if(isWorkingOnly && view == 'week'){
				date = findStartOfWorkingDay(date,businessDays);
			}
			var EndOftheWeek = new Date(date.toString());
			var curr_date = ((6 - weekstart   ) + EndOftheWeek.getDay() + 1) % 7;
			EndOftheWeek.setDate(EndOftheWeek.getDate()+(6 - curr_date));
			var EoW_format = getFormatDate(EndOftheWeek,'DD-MM-YYYY');
			var start = start_format;
			if(isinBetween( start_format, EoW_format, end_format, 'DD-MM-YYYY' )){
				if( !cloneObject.StartOfEvent ){
					delete cloneObject.endOfevent;
					cloneObject.middleofevent = true;
				}
				if(cloneObject.allDayEvent){
					eventObj = addDummyEvent(start,EoW_format,event,eventObj,date,isMultiUser,view,maxEvent,businessDays, isWorkingOnly,format);
				}
				EndOftheWeek.setDate(EndOftheWeek.getDate()+1)
				EoW_format = getFormatDate(EndOftheWeek,'DD-MM-YYYY');
				eventObj = addEventObj(EndOftheWeek,eventObj,event,EoW_format,view,format,weekStart, isMultiUser ,maxEvent,isallDay,businessDays, isWorkingOnly,start_date,end_date,end_format);
			}else if(cloneObject.allDayEvent){
				eventObj = addDummyEvent(start,end_format,event,eventObj,date,isMultiUser,view,maxEvent, businessDays, isWorkingOnly,format);
			}

		}	
		return eventObj;
	}
	isinBetween =  function(start , curr_date, end, format, isfullformat, MinimumMin){
		if(!isfullformat){
			format = 'DD-MM-YYYY';
		}
		var start = createDateObj(start,format);
		var end =  createDateObj(end,format);
		var curr_date = createDateObj(curr_date,format);
		if(MinimumMin){
			var diffMs = end.getTime() - start.getTime();
			var diff =  Math.round((diffMs / 1000) / 60)
			if(diff < MinimumMin){
				end.setMinutes(end.getMinutes()+(MinimumMin - diff))
			}
		}
		return !isPast(start,curr_date) && isPast(end,curr_date);
	}
	pushEvent =  function(eventObj,user,date,event,isMultiUser,view, businessDays, isWorkingOnly,maxEvent,isparticipant,format,rowIndex,Og_eventObj,isHiddenObj){
		if(view == 'week' && isWorkingOnly ){
			var newStart = $L.moment( date, 'DD-MM-YYYY' );
			while( !businessDays.includes(newStart.get('day')) ){
				newStart.add(1,'date');
			}
			var endDate = $L.moment(event.end,format);
			if(!endDate.fromNow(newStart).past && endDate.format('DD-MM-YYYY') !== newStart.format('DD-MM-YYYY')){
				return eventObj;
			}
			date = newStart.format('DD-MM-YYYY');
			if( isexceedMaxevent(eventObj,date,event,isMultiUser,view,maxEvent,user) ){
				addHiddenObj(date,event,event,isMultiUser,view,false, maxEvent,businessDays, false,user,format);
				return eventObj;
			}
		}
		if(isMultiUser && !isparticipant && event.participantId){
			event.participantId.forEach(function(participantEvent){
				var clonedEvent = $u.clone(event);
				clonedEvent.participantEvent = true;
				clonedEvent.participantId = participantEvent.id;
				Og_eventObj = Og_eventObj ? Og_eventObj : eventObj;
				if(isexceedMaxevent(Og_eventObj,date,event,isMultiUser,view,maxEvent,participantEvent.id)){
					addHiddenObj(date,hiddenObj,clonedEvent,isMultiUser,view,false, maxEvent,businessDays, isWorkingOnly,user,format);
				}else{
					pushEvent(Og_eventObj,participantEvent.id,date,clonedEvent,isMultiUser,view, businessDays, isWorkingOnly,maxEvent,true,format)
				}
			});
		}
		if(isMultiUser && view !== 'month' ){
			eventObj[date] = eventObj[date] ? eventObj[date] : [];
			eventObj[date][user] = eventObj[date][user] ? eventObj[date][user] : [];
			var findEmptySpace = findEmpty(eventObj[date][user]);
			if(!eventObj[date][user].count){
				eventObj[date][user].count = 0;
			}
			if(findEmptySpace !== undefined){
				eventObj[date][user][findEmptySpace] = event;
			}else{
				eventObj[date][user].push(event);
			}
			
			if(Object.keys(event).length){
				eventObj[date][user].count += 1;		
			}
				
		}else{
			eventObj[date] = eventObj[date] ? eventObj[date] : [];
			if(rowIndex !== undefined){
				eventObj[date][rowIndex] = event;
			}else{
				var Dummy_event = eventObj[date] ;
				if(isHiddenObj){
					Dummy_event.push(event)
				}else{
					var findEmptySpace = findEmpty(Dummy_event,date);
					var pos = findOverdueActivity(eventObj,event,date,format);
					if(pos){
						pos = pos > Dummy_event.length ? pos : Dummy_event.length;
						Dummy_event[pos] = event;
					}else if(findEmptySpace !== undefined){
						Dummy_event[findEmptySpace] = event;
					}else{
						Dummy_event.push(event)
					}
				}
			}
			
		}
		return eventObj;
	}
	parseDate = function(dateString) {
		// Define regex patterns for the date formats
		const patterns = [
			{ regex: /^(\d{2})-(\d{2})-(\d{4})$/, format: 'DD-MM-YYYY' },
			{ regex: /^(\d{2})\/(\d{2})\/(\d{4})$/, format: 'MM/DD/YYYY' },
			{ regex: /^(\d{4})-(\d{2})-(\d{2})$/, format: 'YYYY-MM-DD' },
			{ regex: /^(\d{2})\/(\d{2})\/(\d{4})$/, format: 'DD/MM/YYYY' },
			{ regex: /^(\d{4})\/(\d{2})\/(\d{2})$/, format: 'YYYY/MM/DD' }
		];
	
		for (const pattern of patterns) {
			const match = dateString.match(pattern.regex);
			if (match) {
				const [_, d1, d2, d3] = match;
				let day, month, year;
	
				switch (pattern.format) {
					case 'DD-MM-YYYY':
					case 'DD/MM/YYYY':
						[day, month, year] = [d1, d2, d3];
						break;
					case 'MM/DD/YYYY':
						[month, day, year] = [d1, d2, d3];
						break;
					case 'YYYY-MM-DD':
					case 'YYYY/MM/DD':
						[year, month, day] = [d1, d2, d3];
						break;
				}
	
				return new Date(`${year}-${month}-${day}`);
			}
		}
	
		throw new Error('Invalid date format');
	}
	findOverdueActivity = function(eventObj,event,start,format){
		var startDate= parseDate(start);
		var endDate = $L.moment(event.end,format).getDObj();
		var count = 0
		for( const dateObj in eventObj){
			var currentDate = parseDate(dateObj);
			if( currentDate > endDate && !startDate > currentDate){
				for(var index = 0 ; index < eventObj[dateObj].length ; index++){
					var event = eventObj[dateObj][index];
					if(event && event.overdue){
						count = eventObj[dateObj].length;
					}
				}
			}
			
		}
		return count;

	}
	findEmpty = function(eventObj){
		for(var index = 0 ; index < eventObj.length ; index++){
			var event = eventObj[index];
			if(!event){
				return index;
			}
		}
		return undefined;
	}
	isexceedMaxevent = function(eventObj,indexDate,event,isMultiUser,view,MaxEvent,userid){
		var maxEvent = MaxEvent;
		var userid = userid ? userid : event.userid;
		if(isMultiUser  && view !== 'month' ){
			eventObj[indexDate] = eventObj[indexDate] ? eventObj[indexDate] : [];
			eventObj[indexDate][userid] = eventObj[indexDate][userid] ? eventObj[indexDate][userid] : [];
			var length;
			length = eventObj[indexDate][userid].length;
			return length >= maxEvent;
		}else{
			eventObj[indexDate] = eventObj[indexDate] ? eventObj[indexDate] : [];
			var length;
			if(view !== 'month' ){
				length = $u.groupBy(eventObj[indexDate],'allDayEvent').true;
				length = length ? length.length : 0;
			}else{
				length = eventObj[indexDate].length;
			}
			return length >= maxEvent;
		}
	}
	addHiddenObj = function(indexDate,cloneObject,event,isMultiUser,view,isallDay,maxEvent, businessDays, isWorkingOnly,user,format,eventObj){
		user = user ? user : event.userid; 
		if(isallDay){
			allDayHidden = this.pushEvent(allDayHidden,user,indexDate,cloneObject,isMultiUser,view, businessDays, isWorkingOnly,maxEvent,false,format,undefined,eventObj,true);
		}else{
			hiddenObj = this.pushEvent(hiddenObj,user,indexDate,cloneObject,isMultiUser,view, businessDays, isWorkingOnly,maxEvent,false,format,undefined,eventObj,true);
		}
		
	}
	addDummyEvent = function(start,end,event,eventObj,StartDate,isMultiUser,view,MaxEvent,businessDays, isWorkingOnly,format){
		if(start == end){
			return eventObj;
		}
		var interval = $L.moment(end,'DD-MM-YYYY').fromNow( $L.moment(start,'DD-MM-YYYY') ).days.value;
		var index =0; 
		var Sformat = getFormatDate(StartDate,'DD-MM-YYYY');
		var rowIndex =  findIndex(eventObj[Sformat],event.id);
		while(index < interval){

			StartDate.setDate(StartDate.getDate()+1);
			Sformat = getFormatDate(StartDate,'DD-MM-YYYY');
			if( !isexceedMaxevent(eventObj,Sformat,event,isMultiUser,view,MaxEvent) ){
				eventObj = pushEvent(eventObj,event.userid,getFormatDate(StartDate,'DD-MM-YYYY'),{dummy_id : event.id},isMultiUser,view,businessDays,false,MaxEvent,undefined,format,rowIndex);
			}
			index++;
		}
		return eventObj;
	}
	findStartOfWorkingDay = function(date,businessDays){
		var newStart = $L.moment( date );
		while( !businessDays.includes(newStart.get('day')) ){
			newStart.set('date',newStart.get('date')+1);
		}
		return newStart.getDObj();
	} 
	findIndex = function(eventArray,id){
		var index = 0;
		for(; index < eventArray.length ; index++){
			if(eventArray[index] && eventArray[index].id == id){
				return index;
			}
		}
		return index - 1;

	}
	_lyteUiUtils.eventManipulator = eventManipulator;
} )();
