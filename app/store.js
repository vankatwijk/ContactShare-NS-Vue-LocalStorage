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
      console.log('saving contact------------------------');
      state.contacts.push(data.data);

      console.log(state.contacts);
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
        let tempProfile = {
            "firstname":data.firstname,
            "lastname":data.lastname,
            "street":data.street,
            "zip":data.zip,
            "country":data.country,
            "phone":data.phone,
            "email":data.email
        }
        context.commit("saveProfile", { data: tempProfile });
    },
    insertContact(context, data) {
      context.commit("saveContacts", { data: data.data.text });
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
