import pluginId from "./pluginId";
import ExportButton from "./components/ExportButton";

const name = "Donations Export";

const plugin = {
  register(app) {
    app.registerPlugin({
      id: pluginId,
      name,
    });
  },

  bootstrap(app) {
    const cm = app.getPlugin("content-manager");
    console.log("Donation Export Plugin bootstrap", cm);
    if (cm?.injectComponent) {
      cm.injectComponent("listView", "actions", {
        name: "donations-export-button",
        Component: ExportButton,
        // Only show on Donation Application collection.
        // Support different CM contexts by checking multiple props.
        shouldDisplay: (props = {}) => {
          const targetUid =
            "api::donation-application.donation-application";
          const uid =
            props.displayedContentType?.uid ||
            props.layout?.uid ||
            props.contentType?.uid ||
            props.displayedCollection?.uid;

          console.log("Donation Export Plugin should Display", props, targetUid, uid);
          return uid === targetUid;
        },
      });
    }
    else {
      console.log("Donation Export Plugin: No content-manager or injectComponent found");
    }
  },

  async registerTrads() {
    return [];
  },
};

export default plugin;
