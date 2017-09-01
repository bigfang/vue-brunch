'use strict';

const fs = require('fs');
const compiler = require('vueify').compiler;

/**
 * Vue Brunch
 * Adds support to Brunch for pre-compiling single file Vue components.
 *
 * @version 1.2.0
 * @author Nathaniel Blackburn <support@nblackburn.uk> (http://nblackburn.uk)
 * @author bigfang <bitair@gmail.com>
 */
class VueBrunch {
  constructor(config) {
    this.config = config && config.plugins && config.plugins.vue || {};
    this.styles = {};
  }

  compile(file) {
    if (this.config) {
      compiler.applyConfig(this.config);
    }

    compiler.on('style', args => {
      if (this.config.extractCSS) {
        this.styles[args.file] = args.style;
        this.extractCSS();
      }
    });

    return new Promise((resolve, reject) => {
      compiler.compile(file.data, file.path, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  }

  extractCSS() {
    const outPath = this.config.out || this.config.o || 'bundle.css';
    const css = Object.keys(this.styles || [])
      .map(file => this.styles[file])
      .join('\n');

    fs.writeFileSync(outPath, css);
  }
}

VueBrunch.prototype.extension = 'vue';
VueBrunch.prototype.type = 'template';
VueBrunch.prototype.brunchPlugin = true;

module.exports = VueBrunch;
