/*
 * Copyright (c) 2024. Beijing Wisdech Co., Ltd.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

module.exports = {
  rollup(config, options) {
    config.output.exports = 'auto';
    config.plugins = config.plugins.map(p =>
      p.name === 'replace'
        ? require('@rollup/plugin-replace')({
          'process.env.NODE_ENV': JSON.stringify(options.env),
          preventAssignment: true,
        })
        : p
    );

    return config;
  },
};