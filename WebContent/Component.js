sap.ui.define([ "sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel",
		"sap/ui/model/resource/ResourceModel", "sap/ui/Device", "sap/ushell/renderers/fiori2/Renderer"], function(UIComponent, JSONModel,
		ResourceModel, Device, Renderer) {
	"use strict";
	return UIComponent.extend("ZFR_BANCA_TOOL.Component", {
		metadata : {
			manifest : "json"
		},
		Renderer:Renderer,

		init : function() {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);
//			this.setHeaderVisible(false);
			this.getRouter().register("oop");
			this.getRouter().initialize();
			// this.setModel(models.createDeviceModel(), "device");

			// var abc = this.getComponentData().startupParameters.abc[0];
			//         
			// this.getRouter().register("oop");
			// this.getRouter().initialize();
			// sap.ui.getCore().byId("idInputSearchHelp").setValue(abc);

		}
	});
});