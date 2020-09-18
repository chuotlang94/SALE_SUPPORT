
sap.ui.define(['sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel', 'sap/viz/ui5/data/FlattenedDataset',
	'sap/viz/ui5/controls/common/feeds/FeedItem', 'ZFR_BANCA_TOOL/utils/formatter' , 'ZFR_BANCA_TOOL/utils/Dialog'
],
function(Controller, JSONModel, FlattenedDataset, FeedItem,formatter,Dialog) {
	"use strict";

	return Controller.extend("ZFR_BANCA_TOOL.Controller.MainPremiumCollection", {
		formatter: formatter,
		Dialog:Dialog,
		onInit : function() {
			// var language = jQuery.sap.getUriParameters().get("sap-language");
			// if (language == 'VI'){
			//					
			// this.getView().byId("idTimeline").setNoDataText("Không có dữ
			// liệu");
			// }
			var idtable = this.getView().createId("precol1--precol");
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
			
			sap.ui.getCore().byId(idtable).bindAggregation("rows",{
		        path: "/PREMIUM_COLLECTIONSet",
		        model: "PRE_COL",
		        filters:filters,
		        parameters: {operationMode: 'Client'}
		    });
			
//			sap.ui.getCore().byId(idtable).getBinding("rows").attachDataReceived(function(oEvent){    
//			     var oSource = oEvent.getSource();
//			     oSource.bClientOperation = true;               //Set Client Operation to true
//			     oSource.sOperationMode = "Client";          //Set operation mode to Client
//			});
			
			if (!this.EditPreCol) {
				this.EditPreCol = sap.ui.xmlfragment("fragmentId",
						"ZFR_BANCA_TOOL.View.EditPreCol", this);
				this.getView().addDependent(this.EditPreCol);
			}
			Dialog.setDialogPreCol(this.EditPreCol);
//			;
		
			
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
		onTab: function(oEvent) {
			var idtable = this.getView().createId("precol1--precol");
			if(oEvent.mParameters.key == "DuePreinMonth"){
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
				
				sap.ui.getCore().byId(idtable).bindAggregation("rows",{
			        path: "/PREMIUM_COLLECTIONSet",
			        model: "PRE_COL",
			        filters:filters,
			        parameters: {operationMode: 'Client'}
			    });
//				sap.ui.getCore().byId(idtable).getBinding("rows").attachDataReceived(function(oEvent){    
//				     var oSource = oEvent.getSource();
//				     oSource.bClientOperation = true;               //Set Client Operation to true
//				     oSource.sOperationMode = "Client";          //Set operation mode to Client
//				});
//				this.getView().byId(this.creadId("precol")).bindAggregation("rows",{
//			        path: "/PREMIUM_COLLECTIONSet",
//			        model: "PRE_COL",
//			        parameter: {operationMode: 'Client'},
//			        filters:filters
//			    });
				
//				
//				var defaultModel = this.getOwnerComponent().getModel();
//				var sServiceUrl = "/sap/opu/odata/sap/ZGW_BANCA_TOOL_SRV";
//				
//				var oDataModel = new sap.ui.model.odata.ODataModel(
//						sServiceUrl, true);
//
//
//				
//				oDataModel.read("/PREMIUM_COLLECTIONSet", {
//					filters : filters,
//					success : function(oData, oResponse) {
//						defaultModel.setSizeLimit(10000);
//						
//						defaultModel.setProperty("/PremiumCollectionDetail",
//								oData.results);
//					}
//				});
			}else if(oEvent.mParameters.key == "OverDuePre"){
				var idtable = this.getView().createId("precol2--precol");
				var fromDate = new Date();
				fromDate.setDate(fromDate.getDate() - 60);
				var toDate = new Date();
				toDate.setDate(toDate.getDate() -1);
				var filters = new Array();
				filters.push(new sap.ui.model.Filter({
								path: "DUE_DATS",
							      operator: sap.ui.model.FilterOperator.BT,
							      value1: fromDate,
							      value2: toDate
							}));
				
				sap.ui.getCore().byId(idtable).bindAggregation("rows",{
			        path: "/PREMIUM_COLLECTIONSet",
			        model: "PRE_COL",
			        filters:filters,
			        parameters: {operationMode: 'Client'}
			    });
				
//				sap.ui.getCore().byId(idtable).getBinding("rows").attachDataReceived(function(oEvent){    
//				     var oSource = oEvent.getSource();
//				     oSource.bClientOperation = true;               //Set Client Operation to true
//				     oSource.sOperationMode = "Client";          //Set operation mode to Client
//				});
				
//				this.getView().byId("precol").bindAggregation("rows",{
//			        path: "/TOTAL_POLICYSet",
//			        model: "PRE_COL",
//			        parameter: {operationMode: 'Client'},
//			        filters:filters
//			    });
				
//				var defaultModel = this.getOwnerComponent().getModel();
//				var sServiceUrl = "/sap/opu/odata/sap/ZGW_BANCA_TOOL_SRV";
//				
//				var oDataModel = new sap.ui.model.odata.ODataModel(
//						sServiceUrl, true);
//
//
//				
//				oDataModel.read("/PREMIUM_COLLECTIONSet", {
//					filters : filters,
//					success : function(oData, oResponse) {
//						defaultModel.setSizeLimit(10000);
//						
//						defaultModel.setProperty("/PremiumCollectionDetail",
//								oData.results);
//					}
//				});
			}
		},
		checkDone: function(oEvent){
			var PAYMENT_IC = sap.ui.core.Fragment.byId("fragmentId",
			"PAYMENT_IC").getSelected();
			if (oEvent.getParameters().selected == false) {
				sap.ui.core.Fragment.byId("fragmentId",
				"PAYMENT_DATE_IC").setValue("");
				sap.ui.core.Fragment.byId("fragmentId",
				"PAYMENT_DATE_IC").setEnabled(
						false);
			}
			else{
				sap.ui.core.Fragment.byId("fragmentId",
				"PAYMENT_DATE_IC").setEnabled(
						true);
			}
		},
		onUpdate : function() {
			var that = this;
			var sServiceUrl = "/sap/opu/odata/sap/ZGW_BANCA_TOOL_SRV";
			
			var oDataModel = new sap.ui.model.odata.ODataModel(
					sServiceUrl, {
						json : true,
						useBatch : true,
					});
//			var oEntry = {POLICY_NUM : "17900007765",
//							PAYMENT : "A"
//					};
			var defaultModel = this.getOwnerComponent().getModel("PRE_COL");
			var rowBinding =  Dialog.getrowBinding();
			var Value = defaultModel.getProperty(rowBinding.sPath);
//			Value.PRE_TYPE = "Danh NC";
//			defaultModel.setProperty(rowBinding.sPath, Value);
//			Value.PAYMENT_DATE_IC = sap.ui.core.Fragment.byId("fragmentId",
//			"PAYMENT_DATE_IC").getDateValue();
//			Value.PAYMENT_IC = sap.ui.core.Fragment.byId("fragmentId",
//			"PAYMENT_IC").getSelected();
			if (Value.PAYMENT_IC == true) {
//				Value.PAYMENT_DATE_IC.setHours(Value.PAYMENT_DATE_IC.getHours() + 7);
				if(!Value.PAYMENT_DATE_IC ){
					sap.ui.core.Fragment.byId("fragmentId",
					"PAYMENT_DATE_IC").setValueState(
							sap.ui.core.ValueState.Error)
				}else{
					sap.ui.core.Fragment.byId("fragmentId",
					"PAYMENT_DATE_IC").setValueState(
							sap.ui.core.ValueState.None)
					var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-ddT00%3A00%3A00" });
					var duedate = dateFormat.format(Value.DUE_DATS);
					
					oDataModel.update("/PREMIUM_COLLECTIONSet(POLICY_NUM='" + Value.POLICY_NUM + "',DUE_DATS=datetime'" + duedate + "')",	Value,
									null,
									function() {
										
										alert("Success!");
										that.EditPreCol.close();
									},
									function(error) {
//										var oldValue = Dialog.getoldValue();
//										defaultModel.setProperty(rowBinding.sPath, oldValue);
										alert(JSON
												.parse(error.response.body).error.message.value);

									});
				}
			}else{
				sap.ui.core.Fragment.byId("fragmentId",
				"PAYMENT_DATE_IC").setValueState(
						sap.ui.core.ValueState.None)
				var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-ddT00%3A00%3A00" });
				var duedate = dateFormat.format(Value.DUE_DATS);
				
				oDataModel.update("/PREMIUM_COLLECTIONSet(POLICY_NUM='" + Value.POLICY_NUM + "',DUE_DATS=datetime'" + duedate + "')",	Value,
								null,
								function() {
									
									alert("Success!");
									that.EditPreCol.close();
								},
								function(error) {
//									var oldValue = Dialog.getoldValue();
//									defaultModel.setProperty(rowBinding.sPath, oldValue);
									alert(JSON
											.parse(error.response.body).error.message.value);

								});
				
			}
			
			
			


		},
		onClose : function(){
			
			this.EditPreCol.close();
			var defaultModel = this.getOwnerComponent().getModel("PRE_COL");
			var rowBinding =  Dialog.getrowBinding();
			var oldValue = Dialog.getoldValue();
			defaultModel.setProperty(rowBinding.sPath, oldValue);
			sap.ui.core.Fragment.byId("fragmentId",
			"PAYMENT_DATE_IC").setDateValue(oldValue.PAYMENT_DATE_IC);
			sap.ui.core.Fragment.byId("fragmentId",
			"PAYMENT_IC").setSelected(oldValue.PAYMENT_IC);
			
//			this.getOwnerComponent().getModel("PRE_COL").setRefreshAfterChange();
		},

		
	});
});