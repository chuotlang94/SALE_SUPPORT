
sap.ui.define(['sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel', 'sap/viz/ui5/data/FlattenedDataset',
	'sap/viz/ui5/controls/common/feeds/FeedItem', 'ZFR_BANCA_TOOL/utils/formatter'
],
function(Controller, JSONModel, FlattenedDataset, FeedItem,formatter) {
	"use strict";

	return Controller.extend("ZFR_BANCA_TOOL.Controller.MainTotalPolicy", {
		formatter: formatter,
		onInit : function() {
			// var language = jQuery.sap.getUriParameters().get("sap-language");
			// if (language == 'VI'){
			//					
			// this.getView().byId("idTimeline").setNoDataText("Không có dữ
			// liệu");
			// }
			
			var defaultModel = this.getOwnerComponent().getModel();
			var sServiceUrl = "/sap/opu/odata/sap/ZGW_BANCA_TOOL_SRV";
			
			var oDataModel = new sap.ui.model.odata.v2.ODataModel(
					sServiceUrl, true);

			oDataModel.read("/TOTAL_POLICYSet", {
				success : function(oData, oResponse) {
					defaultModel.setSizeLimit(10000);
					
					defaultModel.setProperty("/MainTotalPolicy",
							oData.results);
				}
			});
			
			/*var oDataModel = this.getOwnerComponent().getModel(
			"dataModel");
		sap.ui.getCore().byId("shell").setHeaderHiding(true);
		var defaultModel = this.getOwnerComponent().getModel();
		oDataModel.read("/TOTAL_POLICYSet", {
			success : function(oData, oResponse) {
				defaultModel.setSizeLimit(1000);
				
				defaultModel.setProperty("/TotalPolicyDetail",
						oData.results);
		}
	});*/

		},
		onNavBack : function () {
			var oRouter = sap.ui.core.routing.Router.getRouter("oop");
			oRouter.navTo("overview");
		},
		onCell : function (oEvent) {


			var sPath = oEvent.getParameters().rowBindingContext.sPath
			var POLICY = this.getOwnerComponent().getModel("ZGW_BANCA_TOOL").getObject(sPath);
			var oRouter = sap.ui.core.routing.Router.getRouter("oop");
			oRouter.navTo("DetailTotalPolicy",{policy_num: POLICY.POLICY_NUM});
//			var filters = new Array();
//			filters.push(new sap.ui.model.Filter({
//							path: "POLICY_NUM",
//						      operator: sap.ui.model.FilterOperator.EQ,
//						      value1: POLICY.POLICY_NUM
//						}));
//			var sServiceUrl = "/sap/opu/odata/sap/ZGW_BANCA_TOOL_SRV";
//			
//			var oDataModel = new sap.ui.model.odata.ODataModel(
//					sServiceUrl, true);
//
//
//			
//			oDataModel.read("TOTAL_POLICYSet", {
//				filters : filters,
//				success : function(oData, oResponse) {
//					defaultModel.setSizeLimit(10000);
//					
//				}
//			});
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