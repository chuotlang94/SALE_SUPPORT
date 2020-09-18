sap.ui.define([ 'sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel',
		'sap/viz/ui5/data/FlattenedDataset',
		'sap/viz/ui5/controls/common/feeds/FeedItem' ], function(Controller,
		JSONModel, FlattenedDataset, FeedItem) {
	"use strict";

	return Controller.extend("ZFR_BANCA_TOOL.Controller.View1", {
		/* ============================================================ */
		/* Life-cycle Handling */
		/* ============================================================ */
		/**
		 * Method called when the application is initalized.
		 * 
		 * @public
		 */

		/* ============================================================ */
		/* Helper Methods */
		/* ============================================================ */
		/**
		 * Updated the Viz Frame in the view.
		 * 
		 * @private
		 * @param {sap.viz.ui5.controls.VizFrame}
		 *            vizFrame Viz Frame that needs to be updated
		 */
		onInit : function() {
			// var language = jQuery.sap.getUriParameters().get("sap-language");
			// if (language == 'VI'){
			//					
			// this.getView().byId("idTimeline").setNoDataText("Không có dữ
			// liệu");
			// }
			
			
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
		onTotalPolicy : function() {
			var oRouter = sap.ui.core.routing.Router.getRouter("oop");
			oRouter.navTo("MainTotalPolicy");
		},
		
		onPreCol: function () {
			var oRouter = sap.ui.core.routing.Router.getRouter("oop");
			oRouter.navTo("MainPremiumCollection");
		},
		onPolicyInprocess: function () {
			var oRouter = sap.ui.core.routing.Router.getRouter("oop");
			oRouter.navTo("MainPolicyInprocess");
		},
		_updateVizFrame : function(vizFrame) {
			var oVizFrame = this._constants.vizFrame;
			var oVizFramePath = jQuery.sap.getModulePath(
					this._constants.sampleName, oVizFrame.modulePath);
			var oModel = new JSONModel(oVizFramePath);
			var oDataset = new FlattenedDataset(oVizFrame.dataset);

			vizFrame.setVizProperties(oVizFrame.properties);
			vizFrame.setDataset(oDataset);
			vizFrame.setModel(oModel);
			this._addFeedItems(vizFrame, oVizFrame.feedItems);
			vizFrame.setVizType(oVizFrame.type);
		},
		/**
		 * Adds the passed feed items to the passed Viz Frame.
		 * 
		 * @private
		 * @param {sap.viz.ui5.controls.VizFrame}
		 *            vizFrame Viz Frame to add feed items to
		 * @param {Object[]}
		 *            feedItems Feed items to add
		 */
		_addFeedItems : function(vizFrame, feedItems) {
			for (var i = 0; i < feedItems.length; i++) {
				vizFrame.addFeed(new FeedItem(feedItems[i]));
			}
		},
		onpress : function(oControlEvent) {
			console('DAnh');
		},
		selectionChanged : function(oEvent) {
			var oBar = oEvent.getParameter("bar");
			var oRouter = sap.ui.core.routing.Router.getRouter("oop");
			oRouter.navTo("Newview", {
				userpath : oBar.getLabel()
			});
			// oRouter.navTo("Newview");
		},
		selection : function(oControlEvent) {
			console.log('DAnh');
		},
		selectionPolicyIssued : function(oEvent) {
			var oPoint = oEvent.getParameter("point");
			console.log(oPoint);
			var d = new Date();
			var year = d.getFullYear();
			var month = d.getMonth() + 1;
			var day = oPoint.getLabel();
			var date = "" + year + month + day;

			var oRouter = sap.ui.core.routing.Router.getRouter("oop");
			oRouter.navTo("MasterPage", {
				date : date,
				number : "0"
			});

			// oRouter.navTo("Newview");
		},
		press : function(){
			if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement) {
				if (document.cancelFullScreen) {
					document.cancelFullScreen();
				} else {
					if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else {
						if (document.webkitCancelFullScreen) {
							document.webkitCancelFullScreen();
						}
					}
				}
			} else {
				const _element = document.documentElement;
				if (_element.requestFullscreen) {
					_element.requestFullscreen();
				} else {
					if (_element.mozRequestFullScreen) {
						_element.mozRequestFullScreen();
					} else {
						if (_element.webkitRequestFullscreen) {
							_element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
						}
					}
				}
			}
			
			const userAgent = window.navigator.userAgent;

			const iPadSafari =
				!!userAgent.match(/iPad/i) &&  		// Detect iPad first.
				!!userAgent.match(/WebKit/i) && 	// Filter browsers with webkit engine only
				!userAgent.match(/CriOS/i) &&		// Eliminate Chrome & Brave
				!userAgent.match(/OPiOS/i) &&		// Rule out Opera
				!userAgent.match(/FxiOS/i) &&		// Rule out Firefox
				!userAgent.match(/FocusiOS/i);		// Eliminate Firefox Focus as well!

			const element = document.getElementById('fullScreenButton');

			function iOS() {
				if (userAgent.match(/ipad|iphone|ipod/i)) {
					const iOS = {};
					iOS.majorReleaseNumber = +userAgent.match(/OS (\d)?\d_\d(_\d)?/i)[0].split('_')[0].replace('OS ', '');
					return iOS;
				}
			}

			if (element !== null) {
				if (userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
					element.className += ' hidden';
				} else if (userAgent.match(/iPad/i) && iOS().majorReleaseNumber < 12) {
					element.className += ' hidden';
				} else if (userAgent.match(/iPad/i) && !iPadSafari) {
					element.className += ' hidden';
				} else {
					element.addEventListener('click', _toggleFullScreen, false);
				}
			}
		}
	});
});