sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"ZFR_BANCA_TOOL/utils/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ushell/services/CrossApplicationNavigation"
], function(Controller, JSONModel, History, formatter, Filter, FilterOperator, CrossApplicationNavigation) {
	"use strict";

	return Controller.extend("ZFR_BANCA_TOOL.Controller.MainPolicyInprocess", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit: function() {
//			var defaultModel = this.getOwnerComponent().getModel();
//		
//			var sServiceUrl = "/sap/opu/odata/sap/ZPOLICYOFAM_ODATA_SRV/";
//			
//			var oDataModel = new sap.ui.model.odata.ODataModel(
//					sServiceUrl, {defaultBindingMode: "TwoWay"});
//
//
//			oDataModel.read("/PolicyOfAMSet", {
//				success : function(oData, oResponse) {
////					defaultModel.setSizeLimit(10000);
//					defaultModel.setProperty("/TotalPolicyInprocess",
//							oData.results);
//				}
//			});
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/**
		 * Triggered by the table's 'updateFinished' event: after new table
		 * data is available, this handler method updates the table counter.
		 * This should only happen if the update was successful, which is
		 * why this handler is attached to 'updateFinished' and not to the
		 * table's list binding's 'dataReceived' method.
		 * @param {sap.ui.base.Event} oEvent the update finished event
		 * @public
		 */
		
		onNavBack: function() {
			var sPreviousHash = History.getInstance().getPreviousHash();
			// oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");

			// if (sPreviousHash !== undefined || !oCrossAppNavigator.isInitialNavigation()) {
			// 	history.go(-1);
			// } else {
			// 	this.getRouter().getTargets().display("mainview", {
			// 		fromTarget: "worklist"
			// 	});
			// }	

			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().getTargets().display("mainview", {
					fromTarget: "worklist"
				});
			}
		},

		/**
		 * Event handler when the share in JAM button has been clicked
		 * @public
		 */
		onShareInJamPress: function() {
			var oViewModel = this.getModel("worklistView"),
				oShareDialog = sap.ui.getCore().createComponent({
					name: "sap.collaboration.components.fiori.sharing.dialog",
					settings: {
						object: {
							id: location.href,
							share: oViewModel.getProperty("/shareOnJamTitle")
						}
					}
				});
			oShareDialog.open();
		},

		onSearch: function(oEvent) {
			if (oEvent.getParameters().refreshButtonPressed) {
				// Search field's 'refresh' button has been pressed.
				// This is visible if you select any master list item.
				// In this case no new search is triggered, we only
				// refresh the list binding.
				this.onRefresh();
			} else {
				var oTableSearchState = [];
				var sQuery = oEvent.getParameter("query");

				if (sQuery && sQuery.length > 0) {
					oTableSearchState = [new Filter("Address", FilterOperator.Contains, sQuery)];
				}
				this._applySearch(oTableSearchState);
			}

		},

		/**
		 * Event handler for refresh event. Keeps filter, sort
		 * and group settings and refreshes the list binding.
		 * @public
		 */
		onRefresh: function() {
			var oTable = this.byId("table");
			oTable.getBinding("items").refresh();
		},

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Shows the selected item on the object page
		 * On phones a additional history entry is created
		 * @param {sap.m.ObjectListItem} oItem selected Item
		 * @private
		 */
		// _showObject : function (oItem) {
		// 	this.getRouter().navTo("object", {
		// 		objectId: oItem.getBindingContext().getProperty("SecpolId")
		// 	});
		// },

		/**
		 * Internal helper method to apply both filter and search state together on the list binding
		 * @param {object} oTableSearchState an array of filters for the search
		 * @private
		 */
		_applySearch: function(oTableSearchState) {
			var oTable = this.byId("table"),
				oViewModel = this.getModel("worklistView");
			oTable.getBinding("items").filter(oTableSearchState, "Application");
			// changes the noDataText of the list in case there are no filter results
			if (oTableSearchState.length !== 0) {
				oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
			}
		},
		onPress: function(oEvent) {
			// The source is the list item that got pressed
			// this._showObject(oEvent.getSource());
			var sPath = oEvent.getSource().getBindingContextPath();
			var SecpolId =  this.getOwnerComponent().getModel("PolicyAm").getObject(sPath).PagnoId;
			if(SecpolId){
				var endcodeSecpolId = encodeURIComponent(SecpolId);
				this.oCrossAppNav = sap.ushell.Container.getService("CrossApplicationNavigation"); 
				var url = "Zcustom-trackApplication&/TrackApp('"+endcodeSecpolId+"')";
				var hrefForProductDisplay = this.oCrossAppNav.hrefForExternal({
//					  target : { semanticObject : "Quote2", action : "create" },
//					  params : { "FullName" :  ["Nguyễn Công DAnh"], "Gender": ["TEst"], "Birth": ["TEst"],}
					 target : { shellHash: url  }
					});
				this.oCrossAppNav.toExternal({
					  target : { shellHash : hrefForProductDisplay }
				});
				
			}
			 

		},

	});
});