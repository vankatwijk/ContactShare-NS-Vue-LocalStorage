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

        <mainComponent 
        :selectedPage="2"
        >
            <template  slot="mainContent">

                <GridLayout columns="*" rows="auto">
                    <Image row="0" :src="qrimage" />
                </GridLayout>

            </template>

        </mainComponent>

    </Page>

</template>

<script >
  import { mapGetters, mapState } from 'vuex'
  import Home from "./App";
  import ZXing from "nativescript-zxing";


  export default {
    name: "qrComponent",
    data() {
      return {
          qrimage:null
      }
    },
    mounted() {
        this.generatebarcode();
    },
    methods: {
        generatebarcode(){
            var zx = new ZXing();
            var img = zx.createBarcode({encode: JSON.stringify(this.getProfileData), height: 100, width: 100, format: ZXing.QR_CODE});
            console.log('----------------------');
            console.log(JSON.stringify(this.getProfileData));
            this.qrimage = img

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
    },
    computed:{
        ...mapGetters(["getProfileData"])
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
