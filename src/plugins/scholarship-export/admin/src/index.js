import pluginId from "./pluginId";
import ExportButton from "./components/ExportButton";

const name = "Scholarship Export";

const plugin = {
  register(app) {
    app.registerPlugin({
      id: pluginId,
      name,
    });
  },

  bootstrap(app) {
    const cm = app.getPlugin("content-manager");

    if (cm?.injectComponent) {
      cm.injectComponent("listView", "actions", {
        name: "scholarship-export-button",
        Component: ExportButton,
        // Only show on Scholarship Application collection.
        // Support different CM contexts by checking multiple props.
        shouldDisplay: (props = {}) => {
          const targetUid =
            "api::scholarship-application.scholarship-application";
          const uid =
            props.displayedContentType?.uid ||
            props.layout?.uid ||
            props.contentType?.uid ||
            props.displayedCollection?.uid;
          return uid === targetUid;
        },
      });
    }
  },

  async registerTrads() {
    return [];
  },
};

export default plugin;
