sap.ui.define([], function() {
	"use strict";
//	Dialog = {
//			setDialogPreCol: function(that){
//				this.EditPreCol = that;
//			},
//			getDialogPreCol: function(that){
//				return this.EditPreCol;
//			}
//	
//	};
//	return Dialog;
	
//	Dialog.setDialogPreCol= function(that){
//		this.EditPreCol = that;
//	};
//	Dialog.getDialogPreCol= function(that){
//		this.EditPreCol = that;
//	};
//	return Dialog;
	return {
		setDialogPreCol: function(that){
			this.EditPreCol = that;
		},
		getDialogPreCol: function(that){
			return this.EditPreCol;
		},
		setrowBinding: function(rowBinding){
			this.rowBinding = rowBinding;
		},
		getrowBinding: function(){
			return this.rowBinding;
		},
		setoldValue:function(Value){
			this.Value = Value;
		},
		getoldValue:function(){
			return this.Value;
		}
	};

});