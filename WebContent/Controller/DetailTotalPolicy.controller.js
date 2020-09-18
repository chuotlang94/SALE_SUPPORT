
sap.ui.define(['sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel', 'sap/viz/ui5/data/FlattenedDataset',
	'sap/viz/ui5/controls/common/feeds/FeedItem', 'ZFR_BANCA_TOOL/utils/formatter'
],
function(Controller, JSONModel, FlattenedDataset, FeedItem,formatter) {
	"use strict";

	return Controller.extend("ZFR_BANCA_TOOL.Controller.DetailTotalPolicy", {
		formatter: formatter,
		onInit : function() {
			// var language = jQuery.sap.getUriParameters().get("sap-language");
			// if (language == 'VI'){
			//					
			// this.getView().byId("idTimeline").setNoDataText("Không có dữ
			// liệu");
			// }
			
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("DetailTotalPolicy").attachPatternMatched(this._onObjectMatched, this);
			
			
		

		},
		onAfterRendering: function() {
			
		},
		_onObjectMatched: function (oEvent) {
				this.policy_num = oEvent.getParameter("arguments").policy_num ;
				var defaultModel = this.getOwnerComponent().getModel();
				
				var filters = new Array();
				filters.push(new sap.ui.model.Filter({
								path: "POLICY_NUM",
							      operator: sap.ui.model.FilterOperator.EQ,
							      value1: this.policy_num
							}));
				this.getView().byId("table1").bindAggregation("rows",{
			        path: "/POLICYSet('" + this.policy_num + "')/TOTAL_POLICYSet",
			        model: "ZGW_BANCA_TOOL1",
			        parameters: {operationMode: 'Client'},
//			        filters:filters
			    });
//				this.getView().byId("table1").getBinding("rows").attachDataReceived(function(oEvent){    
//				     var oSource = oEvent.getSource();
//				     oSource.bClientOperation = true;               //Set Client Operation to true
//				     oSource.sOperationMode = "Client";          //Set operation mode to Client
//				});
				
				
//				var filters = new Array();
//				filters.push(new sap.ui.model.Filter({
//								path: "POLICY_NUM",
//							      operator: sap.ui.model.FilterOperator.EQ,
//							      value1: this.policy_num
//							}));
//				this.getView().byId("table1").bindAggregation("rows",{
//			        path: "/TOTAL_POLICYSet",
//			        model: "ZGW_BANCA_TOOL1"
////			        filters:filters
//			    });
//				
				
//				this.getView().byId("table1").bindAggregation("rows",{
//			        path: "/POLICYSet('" + policy_num + "')/TOTAL_POLICYSet",
//			        model: "ZGW_BANCA_TOOL1"
//			    });
			
//				var filters = new Array();
//				filters.push(new sap.ui.model.Filter({
//								path: "POLICY_NUM",
//							      operator: sap.ui.model.FilterOperator.EQ,
//							      value1: policy_num
//							}));
//				var sServiceUrl = "/sap/opu/odata/sap/ZGW_BANCA_TOOL_SRV";
//				
//				var oDataModel = new sap.ui.model.odata.ODataModel(
//						sServiceUrl, true);
//
////
////
////				
//				oDataModel.read("TOTAL_POLICYSet", {
//					filters : filters,
//					success : function(oData, oResponse) {
//						defaultModel.setSizeLimit(10000);
//						defaultModel.setProperty("/TotalPolicyDetail",
//								oData.results);
//					}
//				});
				
				
				
				
//				var defaultModel = this.getOwnerComponent().getModel("ZGW_BANCA_TOOL");
//				defaultModel.read("TOTAL_POLICYSet", {
//					filters : filters,
//					success : function(oData, oResponse) {
//						
//					}
//				});
//				this.getOwnerComponent().getModel(defaultModel,"danh");
//			
		},
		onNavBack : function () {
			var oRouter = sap.ui.core.routing.Router.getRouter("oop");
			oRouter.navTo("MainTotalPolicy");
		},
		onCell : function (oEvent) {


			var sPath = oEvent.getParameters().rowBindingContext.sPath
			var POLICY = this.getOwnerComponent().getModel().getObject(sPath);
			var filters = new Array();
			filters.push(new sap.ui.model.Filter({
							path: "POLICY_NUM",
						      operator: sap.ui.model.FilterOperator.EQ,
						      value1: POLICY.POLICY_NUM
						}));
			var sServiceUrl = "/sap/opu/odata/sap/ZGW_BANCA_TOOL_SRV";
			
			var oDataModel = new sap.ui.model.odata.ODataModel(
					sServiceUrl, true);


			
			oDataModel.read("TOTAL_POLICYSet", {
				filters : filters,
				success : function(oData, oResponse) {
					defaultModel.setSizeLimit(10000);
					
				}
			});
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