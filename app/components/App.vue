<template>
    <Page>
        <ActionBar backgroundColor="#44557f" flat="true">
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

        <main-component 
        :selectedPage="1"
        >
            <template  slot="mainContent">
                    <ScrollView orientation="vertical">

                        <ListView row="1" for="item in contacts" left="10" top="10" height="97%" width="100%" marginBottom="48" >
                            <v-template>
                                <Label :text="item" />
                            </v-template>
                        </ListView>

                    </ScrollView>

            </template>

        </main-component>

    </Page>
</template>

<script>
    import {
        isIOS
    } from "tns-core-modules/platform";

    import mainComponent from "./layouts/main";


    export default {
        components: {
            mainComponent
        },
        data() {
            return {
                isIOS,
                contacts:[
                    {
                        "firstname":"1",
                        "lastname":"1"
                    },
                    {
                        "firstname":"2",
                        "lastname":"2"
                    },
                    {
                        "firstname":"3",
                        "lastname":"3"
                    },
                    {
                        "firstname":"4",
                        "lastname":"4"
                    }
                ]
            }
        },
        mounted() {

        }
    }
</script>