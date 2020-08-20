<template>
    <Page>
        <ActionBar backgroundColor="#C08497" flat="true">
            <StackLayout orientation="vertical" width="100%" height="100%">
                <StackLayout>

                    <StackLayout orientation="horizontal" marginTop="5">
                        <Label style="font-size: 30;" @tap="navigateToContact('new',{})"
                        class="fa" :text="'fa-plus' | fonticon" />
                        <TextField backgroundColor="white" paddingLeft="20" borderRadius="20"
                            width="60%" height="40" fontSize="14" hint="Search"></TextField>
                        <Label style="font-size: 30;" 
                        class="fa" :text="'fa-search' | fonticon" />
                    </StackLayout>

                </StackLayout>
            </StackLayout>
        </ActionBar>

        <mainComponent 
        :selectedPage="1"
        >
            <template  slot="mainContent">
                    <ScrollView orientation="vertical">

                        <ListView row="1" for="(item,key) in contacts" left="10" top="10" height="97%" width="100%" marginBottom="48" >
                            <v-template>
                                <StackLayout @tap="navigateToContact(key,item)">
                                    <Label :text="item.firstname+'  '+item.lastname" />
                                    <Label :text="item.phone+' : '+item.email" />
                                </StackLayout>
                            </v-template>
                        </ListView>

                    </ScrollView>

            </template>

        </mainComponent>

    </Page>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'
    import {
        isIOS
    } from "tns-core-modules/platform";
    import Contact from "./Contact";


    export default {
        name: "homeComponent",
        data() {
            return {
                isIOS,
                contacts:[]
            }
        },
        mounted() {
            this.contacts = this.getContacts;
            console.log('displaying contacts list-----------------------');
            console.log(this.getContacts);
        },
        methods:{
            navigateToContact(contactKey1,contactObject1){

                this.$navigateTo(Contact, {
                    animated: true,
                    transition: {
                        name: "fade",
                        duration: 250,
                        curve: "easeIn"
                    },
                    props: {
                        contactKey: contactKey1,
                        contactObject: contactObject1
                    }
                });

            }
        },
        computed:{
            ...mapGetters(["getContacts"])
        }
    }
</script>