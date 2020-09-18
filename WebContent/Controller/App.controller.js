sap.ui.define([ "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel" ],
		function(Controller, JSONModel) {
			"use strict";

			return Controller.extend("ZFR_BANCA_TOOL.Controller.App", {

				/**
				 * Called when a controller is instantiated and its View
				 * controls (if available) are already created. Can be used to
				 * modify the View before it is displayed, to bind event
				 * handlers and do other one-time initialization.
				 * 
				 * @memberOf Week4.view.App
				 */
				onInit : function() {
					/*var oDataModel = this.getOwnerComponent().getModel(
							"dataModel");
					sap.ui.getCore().byId("shell").setHeaderHiding(true);
					var defaultModel = this.getOwnerComponent().getModel();
					oDataModel.read("/TOTAL_POLICYSet/$count", {
						success : function(oData, oResponse) {
							defaultModel.setProperty("/TotalPolicyCount",
									oData);
//							defaultModel.setSizeLimit(1000);
//							defaultModel.setProperty("/TotalPolicyCount",
//									oData.results.length);
//							defaultModel.setProperty("/TotalPolicyDetail",
//									oData.results);
						}
					});*/
					var defaultModel = this.getOwnerComponent().getModel();
					var sServiceUrl = "/sap/opu/odata/sap/ZGW_BANCA_TOOL_SRV";
					
					var oDataModel = new sap.ui.model.odata.ODataModel(
							sServiceUrl, true);
					
					oDataModel.read("/TOTAL_POLICYSet/$count", {
						success : function(oData, oResponse) {
							defaultModel.setProperty("/TotalPolicyCount",
									oResponse.body);
						}
					});
					
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

					
					
					oDataModel.read("/PREMIUM_COLLECTIONSet/$count", {
						filters : filters,
						success : function(oData, oResponse) {
							defaultModel.setProperty("/PremiumCollectionCount",
									oResponse.body);
						}
					});
					
					var fromDate = new Date();
					fromDate.setDate(fromDate.getDate() - 60);
					var toDate = new Date();
					toDate.setDate(toDate.getDate() - 1);
					var filters = new Array();
					filters.push(new sap.ui.model.Filter({
									path: "DUE_DATS",
								      operator: sap.ui.model.FilterOperator.BT,
								      value1: fromDate,
								      value2: toDate
								}));
					
					oDataModel.read("/PREMIUM_COLLECTIONSet/$count", {
						filters : filters,
						success : function(oData, oResponse) {
							defaultModel.setProperty("/PremiumCollectionOverCount",
									oResponse.body);
						}
					});
					sServiceUrl = "/sap/opu/odata/sap/ZPOLICYOFAM_ODATA_SRV/";
					var oDataModel = new sap.ui.model.odata.ODataModel(
							sServiceUrl, {defaultBindingMode:"OneTime"});
					
					oDataModel.read("/PolicyOfAMSet/$count", {
						success : function(oData, oResponse) {
							defaultModel.setProperty("/PolicyInprocessCount",
									oResponse.body);
						}
					});
				}

			});

		});