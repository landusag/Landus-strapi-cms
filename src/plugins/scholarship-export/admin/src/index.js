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
      });
    }
  },

  async registerTrads() {
    return [];
  },
};

export default plugin;
