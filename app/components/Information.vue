<template>
    <Page>
        <ActionBar backgroundColor="#C08497" flat="true">
            <StackLayout orientation="vertical" width="100%" height="100%" backgroundColor="#44557f">
                <StackLayout backgroundColor="#44557f">
                    <StackLayout #searchRow orientation="horizontal" marginTop="5">
                        <TextField backgroundColor="white" paddingLeft="20" borderRadius="20" v-model="textFieldValue"
                            width="80%" height="40" fontSize="14" hint="Search"></TextField>
                        <Image src="~/assets/images/shape4@3x.png" height="30" width="30" marginLeft="10"></Image>
                    </StackLayout>
                </StackLayout>
            </StackLayout>
        </ActionBar>

        <mainComponent 
        :selectedPage="4"
        >
            <template  slot="mainContent">

                <GridLayout columns="*" rows="auto, auto, auto, auto, auto, auto, auto, auto, auto, auto">
                    <Label row="0" class="message" text="some text" textWrap="true"></Label>

                    <TextField row="1" v-model="personaldata.firstname" hint="First name" />
                    <TextField row="2" v-model="personaldata.lastname" hint="Last name" />
                    <TextField row="3" v-model="personaldata.street" hint="Street" />
                    <TextField row="4" v-model="personaldata.zip" hint="zip" />
                    <TextField row="5" v-model="personaldata.country" hint="country" />
                    <TextField row="6" v-model="personaldata.phone" hint="phone" />
                    <TextField row="7" v-model="personaldata.email" hint="email" />

                    <Button row="8" class="btn btn-primary btn-rounded-sm" text="Save" @tap="Save()"></Button>
                    <Button row="9" class="btn btn-danger btn-rounded-sm" text="Clear all data" @tap="clearAllUserData()"></Button>

                </GridLayout>

            </template>

        </mainComponent>


    </Page>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'
    import Home from "./App";
    import {
        getBoolean,
        setBoolean,
        getNumber,
        setNumber,
        getString,
        setString,
        hasKey,
        remove,
        clear} from "tns-core-modules/application-settings";

    export default {
        name: "informationComponent",
        data() {
            return {
                personaldata:{
                    firstname:'',
                    lastname:'',
                    street:'',
                    zip:'',
                    country:'',
                    phone:'',
                    email:''
                }
            }
        },
        mounted() {
            this.personaldata = this.getProfileData;
            console.log('getting data----------------------------');
            console.log(this.getProfileData);
        },
        methods: {
            Save() {

                setBoolean("isFirstRun",false);
                this.$store.dispatch("insertProfile", this.personaldata);
                

                this.$navigateTo(Home, {
                    animated: true,
                    transition: {
                        name: "slideRight",
                        duration: 250,
                        curve: "easeIn"
                    }
                });
            },
            clearAllUserData(){
                this.$store.dispatch("clearData");
            }
        },
        computed:{
            ...mapGetters(["getProfileData"]),
            ...mapState({
                data:state => state.data
            })
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
