/*
 * Copyright ©️ 2018 Galt•Space Society Construction and Terraforming Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka),
 * [Dima Starodubcev](https://github.com/xhipster),
 * [Valery Litvin](https://github.com/litvintech) by
 * [Basic Agreement](http://cyb.ai/QmSAWEG5u5aSsUyMNYuX2A2Eaz4kEuoYWUkVBRdmu9qmct:ipfs)).
 * ​
 * Copyright ©️ 2018 Galt•Core Blockchain Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka) and
 * Galt•Space Society Construction and Terraforming Company by
 * [Basic Agreement](http://cyb.ai/QmaCiXUmSrP16Gz8Jdzq6AJESY1EAANmmwha15uR3c1bsS:ipfs)).
 */
import Helper from '@galtproject/frontend-core/services/helper';

export {};

// require('indexeddbshim');

// global['window'] = global; // We'll allow ourselves to use `window.indexedDB` or `indexedDB` as a global
// setGlobalVars(); // See signature below

const Dexie = require('dexie');
let db;

module.exports = {
  init() {
    db = new Dexie.default('CybExtensionDatabase');

    db.version(1).stores({
      content: '++id,contentHash,manifestHash,description,keywords,size,createdAt,updatedAt',
    });
  },
  async addContent(contentObj) {
    contentObj.createdAt = Helper.now();
    contentObj.updatedAt = Helper.now();
    try {
      return await db.content.add(contentObj);
    } catch (e) {
      console.error(e);
    }
  },
  async getContent(searchString) {
    let query;
    if (searchString) {
      query = db.content.where('description').startsWithIgnoreCase(searchString);
    } else {
      query = db.content;
    }
    return query
      .limit(25)
      .distinct()
      .toArray();
  },
};
