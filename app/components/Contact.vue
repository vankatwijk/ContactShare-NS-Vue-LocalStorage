<template>
    <Page>
        <ActionBar backgroundColor="#C08497" flat="true">
            <GridLayout width="100%" columns="auto, *">
                <Label class="title" text="Edit contact"  col="1"/>
            </GridLayout>
        </ActionBar>

        <GridLayout columns="*" rows="auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto, auto">

            <TextField row="1" v-model="personaldata.firstname" hint="First name" />
            <TextField row="2" v-model="personaldata.lastname" hint="Last name" />
            <TextField row="3" v-model="personaldata.street" hint="Street" />
            <TextField row="4" v-model="personaldata.zip" hint="zip" />
            <TextField row="5" v-model="personaldata.country" hint="country" />
            <TextField row="6" v-model="personaldata.phone" hint="phone" />
            <TextField row="7" v-model="personaldata.email" hint="email" />

            <Button row="8" class="btn btn-primary btn-rounded-sm" text="Back" @tap="navigateToHome()"></Button>
            <Button row="9" class="btn btn-primary btn-rounded-sm" text="Save" @tap="Save()"></Button>
            <Button row="10" class="btn btn-danger btn-rounded-sm" text="Delete data" @tap="clearUserData()"></Button>

        </GridLayout>


    </Page>
</template>

<script >
  import { mapGetters, mapState } from 'vuex'
  import Home from "./App";
  export default {
    props:['contactObject','contactKey'],
    data() {
      return {
        personaldata:{}
      }
    },
    mounted() {
        this.personaldata = this.contactObject;
        console.log('displaying contacts list-----------------------');
        console.log(this.contactObject);
        console.log(this.contactKey);
    },
    methods: {
        Save(){
            this.$store.dispatch("updateContact", [this.contactKey,this.contactObject]);
            
        },
        clearUserData(){
            
            this.$store.dispatch("deleteContact", [this.contactKey,this.contactObject]);
        },
        navigateToHome(){
            this.$navigateTo(Home, {
                animated: true,
                transition: {
                    name: "slideRight",
                    duration: 250,
                    curve: "easeIn"
                }
            });
        }
    }

  }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .title {
        text-align: left;
        padding-left: 16;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }

    .drawer-header {
        padding: 50 16 16 16;
        margin-bottom: 16;
        background-color: #53ba82;
        color: #ffffff;
        font-size: 24;
    }

    .drawer-item {
        padding: 8 16;
        color: #333333;
        font-size: 16;
    }
</style>
