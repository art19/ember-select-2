'use strict';

// For ember-cli < 2.7 findHost doesnt exist so we backport from that version
// for earlier version of ember-cli.
//https://github.com/ember-cli/ember-cli/blame/16e4492c9ebf3348eb0f31df17215810674dbdf6/lib/models/addon.js#L533
function findHostShim() {
  let current = this;
  let app;
  do {
    app = current.app || app;
  } while (current.parent.parent && (current = current.parent));
  return app;
}

module.exports = {
  name: 'ember-select-2',

  included: function(appOrAddon) {
    let findHost = this._findHost || findHostShim;
    let app = findHost.call(this);

    this._super.included.apply(this, arguments);

    app.import(app.bowerDirectory + '/select2/select2.js');
    app.import(app.bowerDirectory + '/select2/select2.css');
    app.import(app.bowerDirectory + '/select2/select2.png', { destDir: 'assets' });
    app.import(app.bowerDirectory + '/select2/select2x2.png', { destDir: 'assets' });
    app.import(app.bowerDirectory + '/select2/select2-spinner.gif', { destDir: 'assets' });
  }
};
