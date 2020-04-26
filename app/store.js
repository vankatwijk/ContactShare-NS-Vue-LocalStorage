import Vue from 'vue';
import Vuex from 'vuex';

const Sqlite = require("nativescript-sqlite");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    database: null,
    data: {},
    scans:[]
  },
  mutations: {
    init(state, data) {
      state.database = data.database;
    },
    load(state, data) {
        state.data = {};
        for(var i = 0; i < data.data.length; i++) {
            state.data = {
                firstname: data.data[i][0],
                lastname: data.data[i][1],
                street: data.data[i][2],
                zip: data.data[i][3],
                country: data.data[i][4],
                phone: data.data[i][5],
                email: data.data[i][6]
            };
        }
    },
    save(state, data) {
        state.data = {
            firstname: data.data.firstname,
            lastname: data.data.lastname,
            street: data.data.street,
            zip: data.data.zip,
            country: data.data.country,
            phone: data.data.phone,
            email: data.data.email
        };
    },
    loadScans(state, data) {
        state.scans = [];
        for(var i = 0; i < data.data.length; i++) {
            state.scans.push({
                firstname: data.data[i][0],
                lastname: data.data[i][1],
                street: data.data[i][2],
                zip: data.data[i][3],
                country: data.data[i][4],
                phone: data.data[i][5],
                email: data.data[i][6]
            });
        }
    },
    saveScans(state, data) {
      state.scans.push({
        firstname: data.data.firstname,
        lastname: data.data.lastname,
        street: data.data.street,
        zip: data.data.zip,
        country: data.data.country,
        phone: data.data.phone,
        email: data.data.email
      });
    },
  },
  actions: {
    init(context) {
      (new Sqlite("coronaapp.db")).then(async db =>  {
          await db.execSQL("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, street TEXT, zip TEXT, country TEXT, phone TEXT, email TEXT)").then(id => {
              //context.commit("init", { database: db });
              console.log("USERS LIST");
          }, error => {
              console.log("CREATE USER TABLE ERROR", error);
          });


          await db.execSQL("CREATE TABLE IF NOT EXISTS scans (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, street TEXT, zip TEXT, country TEXT, phone TEXT, email TEXT)").then(id => {
            console.log("SCAN HISTORY");
          }, error => {
              console.log("CREATE SCAN HISTORY TABLE ERROR", error);
          });


          context.commit("init", { database: db });

      }, error => {
          console.log("OPEN DB ERROR", error);
      });
    },
    insert(context, data) {
        context.state.database.execSQL("INSERT INTO users (firstname, lastname, street, zip, country, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?)", 
        [data.firstname, data.lastname, data.street, data.zip, data.country, data.phone, data.email]).then(id => {
            context.commit("save", { data: data });
            console.log("INSERT user", data);
        }, error => {
            console.log("INSERT ERROR", error);
        });
    },
    query(context) {
        context.state.database.all("SELECT firstname, lastname FROM users", []).then(result => {
            context.commit("load", { data: result });
        }, error => {
            console.log("SELECT ERROR", error);
        });
    },
    insertScan(context, data) {
      context.state.database.execSQL("INSERT INTO scans (title, data, timestamp) VALUES (?, ?, ?)", 
      [data.title, data.data, data.timestamp]).then(id => {
          context.commit("saveScans", { data: data });
          console.log("INSERT scan", data);
      }, error => {
          console.log("INSERT ERROR", error);
      });
    },
    queryScan(context) {
        context.state.database.all("SELECT * FROM scans", []).then(result => {
            context.commit("loadScans", { data: result });
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }
  },
  getters: {
      getUserData: (state) => state.data,
      getScans: (state) => state.scans,
  }
});
