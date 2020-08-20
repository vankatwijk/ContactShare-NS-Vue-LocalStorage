import Vue from 'vue';
import Vuex from 'vuex';

const appSettings = require("tns-core-modules/application-settings");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: {},
    contacts:[]
  },
  mutations: {
    init(state, data) {
      state.profile = JSON.parse(appSettings.getString("profile",{}));
      state.contacts = JSON.parse(appSettings.getString("contacts",[]));
      console.log('init------------------------------');
      console.log(state.profile);
      console.log(state.contacts);
    },
    saveProfile(state, data) {
        state.profile = data.data;
        appSettings.setString("profile",JSON.stringify(data.data));
    },
    saveContacts(state, data) {
      state.contacts.push(data.data);
      appSettings.setString("contacts",JSON.stringify(state.contacts));
    },
    updateContacts(state, data) {
      state.contacts[data.key] = data.contact;
      appSettings.setString("contacts",JSON.stringify(state.contacts));

    },
    clearAllData(state, data) {
        state.profile = {};
        state.contacts = [];
        appSettings.setString("profile","{}");
        appSettings.setString("contacts","[]");
        appSettings.setBoolean("isFirstRun",true);
    }
  },
  actions: {
    init(context) {
          context.commit("init");
    },
    insertProfile(context, data) {
        context.commit("saveProfile", { data: data });
    },
    insertContact(context, data) {
      context.commit("saveContacts", { data: data.data });
    },
    updateContact(context, [key,data]) {
      context.commit("updateContacts", { key: key,contact:data });

    },
    deleteContact({ commit, state }, {key,data}) {
      const index = state.contacts.indexOf(key);
      if (index > -1) {
        state.contacts.splice(index, 1);
      }
      appSettings.setString("contacts",JSON.stringify(state.contacts));
    },
    clearData(context) {
      context.commit("clearAllData");
    }
  },
  getters: {
      getProfileData: (state) => state.profile,
      getContacts: (state) => state.contacts,
  }
});
