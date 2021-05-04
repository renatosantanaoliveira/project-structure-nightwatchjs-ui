let store = {};

const setStore = (obj) => {
  store.secrets = obj;
};

module.exports.store = store;
module.exports.setStore = setStore;