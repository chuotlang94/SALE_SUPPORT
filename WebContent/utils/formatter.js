sap.ui.define([], function() {

	return {
		iconStatus: function(sStatus) {
			return sStatus !== "X" ? "sap-icon://complete" : "sap-icon://pending";
		},
		currency: function(PREMAFTERTAX_AM,CURRENCY_ID){
			var currency = new sap.ui.model.type.Currency({showMeasure: false });
			if (CURRENCY_ID == "VND") {
				var a = PREMAFTERTAX_AM * 100;
//				return a
				return currency.formatValue([a,CURRENCY_ID], "string");
			}
			
		},
		getTime: function(sDate, sTime) {
			// console.log(new Date(sDate.toDateString() + " " + (new Date(sTime.ms)).toTimeString().substr(0,8)));
			return new Date(sDate.toDateString() + " " + (new Date(sTime.ms)).toTimeString());
		},		
		
		getBeginTime: function(BeginTime) {
			var timeFormat = sap.ui.core.format.DateFormat.getTimeInstance({
				pattern: "KK:mm a"
			});
			var TZOffsetMs = new Date(0).getTimezoneOffset() * 60 * 1000;
			var timeStr = timeFormat.format(new Date(BeginTime.ms + TZOffsetMs));
			return timeStr;
		},
		getEndTime: function(LongText, EndTime) {
			var timeFormat = sap.ui.core.format.DateFormat.getTimeInstance({
				pattern: "KK:mm a"
			});

			var TZOffsetMs = new Date(0).getTimezoneOffset() * 60 * 1000;

			var timeStr = timeFormat.format(new Date(EndTime.ms + TZOffsetMs));

			if (LongText === "Pending") {
				return " ";
			} else {
				return timeStr;
			}

		},
		getFormatDate: function(beginDate, endDate, longText, beginTime, endTime) {

			if (longText === "Completed") {
				// var m =beginDate.getMonth();
				// var d =beginDate.getDate();
				// var y =beginDate.getFullYear();
				// var h =beginDate.getHours();
				// var min =beginDate.getMinutes();
				// console.log("TIme "+h ,min);
				// var BeginDate = m +" / " + d +" / "+y+"  " +  h + " : " +  min ;
				return beginDate + " - " + endDate;
			} else {
				return "beginDate -";
			}
		},
		
		blank: function(sString){
			return sString;
		}
	};

});