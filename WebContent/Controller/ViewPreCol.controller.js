
sap.ui.define(['sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel', 'sap/viz/ui5/data/FlattenedDataset',
	'sap/viz/ui5/controls/common/feeds/FeedItem', 'ZFR_BANCA_TOOL/utils/formatter' , 'ZFR_BANCA_TOOL/utils/Dialog'
],
function(Controller, JSONModel, FlattenedDataset, FeedItem,formatter, Dialog ) {
	"use strict";

	return Controller.extend("ZFR_BANCA_TOOL.Controller.ViewPreCol", {
		formatter: formatter,
		Dialog:Dialog,
		onInit : function() {
			// var language = jQuery.sap.getUriParameters().get("sap-language");
			// if (language == 'VI'){
			//					
			// this.getView().byId("idTimeline").setNoDataText("Không có dữ
			// liệu");
			// }
			
			
			
			var fromDate = new Date();
			fromDate.setDate(fromDate.getDate() - 0);
			var toDate = new Date();
			toDate.setDate(toDate.getDate() + 30);
			var filters = new Array();
			filters.push(new sap.ui.model.Filter({
							path: "DUE_DATS",
						      operator: sap.ui.model.FilterOperator.BT,
						      value1: fromDate,
						      value2: toDate
						}));
			
			
			var defaultModel = this.getOwnerComponent().getModel();
			var sServiceUrl = "/sap/opu/odata/sap/ZGW_BANCA_TOOL_SRV";
			
			var oDataModel = new sap.ui.model.odata.ODataModel(
					sServiceUrl, true);


			
			oDataModel.read("/PREMIUM_COLLECTIONSet", {
				filters : filters,
				success : function(oData, oResponse) {
					defaultModel.setSizeLimit(10000);
					
					defaultModel.setProperty("/PremiumCollectionDetail",
							oData.results);
				}
			});
			
			

		},
		onTab: function(oEvent) {
			
		},
		onCell : function (oEvent) {
//			if(!oEvent.getParameters().rowBindingContext && oEvent.getParameters().rowBindingContext !== "undefined"){
				if (!this.EditPreCol) {
					this.EditPreCol = Dialog.getDialogPreCol(this);
				}
				;
				var defaultModel = this.getOwnerComponent().getModel("PRE_COL");
//				alert(oEvent.getParameters().rowBindingContext);
				Dialog.setrowBinding(oEvent.getParameters().rowBindingContext);
				var Value = defaultModel.getProperty(oEvent.getParameters().rowBindingContext.sPath);
				Dialog.setoldValue(Value);
				if (Value.PAYMENT_IC == true) {
					sap.ui.core.Fragment.byId("fragmentId",
					"PAYMENT_DATE_IC").setEnabled(
							true);
				}else{
					sap.ui.core.Fragment.byId("fragmentId",
					"PAYMENT_DATE_IC").setEnabled(
							false);
				}
				sap.ui.core.Fragment.byId("fragmentId","EditPreCol").bindElement({ path: oEvent.getParameters().rowBindingContext.sPath , model: "PRE_COL"});
				this.EditPreCol.open();
//			}
			
		},
		/* ============================================================ */
		/* Life-cycle Handling                                          */
		/* ============================================================ */
		/**
		 * Method called when the application is initalized.
		 *
		 * @public
		 */
		

		/* ============================================================ */
		/* Helper Methods                                               */
		/* ============================================================ */
		/**
		 * Updated the Viz Frame in the view.
		 *
		 * @private
		 * @param {sap.viz.ui5.controls.VizFrame} vizFrame Viz Frame that needs to be updated
		 */
		
	});
});