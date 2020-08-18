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
      state.profile = JSON.parse(appSettings.getString("profile"));
      state.contacts = JSON.parse(appSettings.getString("contacts"));
    },
    saveProfile(state, data) {
        state.profile = data.data;
        appSettings.setString("profile",JSON.stringify(data.data));
    },
    saveContacts(state, data) {
      state.contacts.push(data.data);
      appSettings.setString("contacts",JSON.stringify(state.contacts));
    },
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
      context.commit("saveContacts", { data: data });
    }
  },
  getters: {
      getProfileData: (state) => state.profile,
      getContacts: (state) => state.Contact,
  }
});
