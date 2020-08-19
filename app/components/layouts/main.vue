<template>
<StackLayout>


        <GridLayout orientation="vertical" width="100%" height="100%" columns="*" rows="*,auto">


            <StackLayout col="0" row="0">
                <slot name="mainContent"></slot>
            </StackLayout>

            <StackLayout col="0" row="1" orientation="horizontal" height="60">
                <GridLayout rows="*" columns="*,*,*,*,*">

                    <StackLayout col="0" row="0" @tap="navigateToHome()" :backgroundColor="selectedPage===1?'#C08497':''">
                        <Label height="25" width="25" margin="10" style="font-size: 25"
                        class="fa" :text="'fa-list' | fonticon" />
                    </StackLayout>
                    <StackLayout col="1" row="0" @tap="navigateToMyQrCode()" :backgroundColor="selectedPage===2?'#C08497':''">
                        <Label height="25" width="25" margin="10" style="font-size: 25" 
                        class="fa" :text="'fa-qrcode' | fonticon" />
                    </StackLayout>                    
                    <StackLayout col="2" row="0" @tap="doScanWithBackCamera" :backgroundColor="selectedPage===3?'#C08497':''">
                        <Label height="25" width="25" margin="10" style="font-size: 25" 
                        class="fa" :text="'fa-camera-retro' | fonticon" />
                    </StackLayout>                    
                    <StackLayout col="3" row="0" @tap="navigateToInformations()" :backgroundColor="selectedPage===4?'#C08497':''">
                        <Label height="25" width="25" margin="10" style="font-size: 25" 
                        class="fa" :text="'fa-contao' | fonticon" />
                    </StackLayout>                    
                    <StackLayout col="4" row="0" @tap="navigateToMyInformation()" :backgroundColor="selectedPage===5?'#C08497':''">
                        <Label height="25" width="25" margin="10" style="font-size: 25" 
                        class="fa" :text="'fa-cog' | fonticon" />
                    </StackLayout>

                </GridLayout>
            </StackLayout>

        </GridLayout>

</StackLayout>
</template>

<script>    
    import {
        isIOS
    } from "tns-core-modules/platform";
    import {
        BarcodeScanner
    } from "nativescript-barcodescanner";
    import Contacts from "../Contacts";
    import Notification from "../Notification";
    import Information from "../Information";
    import FirstStart from "../FirstStart";
    import MyQrCode from "../MyQrCode";
    import Home from "../App";

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
        name: "mainComponent",
        props:{
            selectedPage:Number
        },
        data() {
            return {}
        },
        methods: {
            navigateToHome() {
                if(this.selectedPage!==1){
                    this.$navigateTo(Home, {
                        animated: true,
                        transition: {
                            name: "fade",
                            duration: 250,
                            curve: "easeIn"
                        }
                    });
                }
            },
            navigateToNotifications() {
                this.$navigateTo(Notification, {
                    animated: true,
                    transition: {
                        name: "fade",
                        duration: 250,
                        curve: "easeIn"
                    }
                });
            },
            navigateToInformations() {
                if(this.selectedPage!==4){
                    this.$navigateTo(Information, {
                        animated: true,
                        transition: {
                            name: "fade",
                            duration: 250,
                            curve: "easeIn"
                        }
                    });
                }
            },
            navigateToMyInformation() {
                if(this.selectedPage!==5){
                    this.$navigateTo(FirstStart, {
                        animated: true,
                        transition: {
                            name: "fade",
                            duration: 250,
                            curve: "easeIn"
                        }
                    });
                }
            },
            navigateToMyQrCode() {
                if(this.selectedPage!==2){
                    this.$navigateTo(MyQrCode, {
                        animated: true,
                        transition: {
                            name: "fade",
                            duration: 250,
                            curve: "easeIn"
                        }
                    });
                }
            },
            onScanResult(evt) {
                console.log(`onScanResult: ${evt.text} (${evt.format})`);
            },
            doScanWithBackCamera() {
                this.scan(false);
            },
            doScanWithFrontCamera() {
                this.scan(true);
            },
            scan(front) {

                new BarcodeScanner().scan({
                    cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
                    cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
                    message: "Use the volume buttons for extra light", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
                    preferFrontCamera: front, // Android only, default false
                    showFlipCameraButton: true, // default false
                    showTorchButton: true, // iOS only, default false
                    torchOn: false, // launch with the flashlight on (default false)
                    resultDisplayDuration: 500, // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
                    beepOnScan: true, // Play or Suppress beep on scan (default true)
                    openSettingsIfPermissionWasPreviouslyDenied: true, // On iOS you can send the user to the settings app if access was previously denied
                    closeCallback: () => {
                        console.log("Scanner closed @ " + new Date().getTime());
                    }
                }).then(
                    (result) => {
                        console.log("--- scanned: " + result.text);
                        // Note that this Promise is never invoked when a 'continuousScanCallback' function is provided

                        let contactdata = JSON.parse(result.text);
                        this.$store.dispatch("insertContact",{
                            title: "Some Place",
                            data: result,
                            timestamp: Date.now()
                        });

                        setTimeout(function () {
                            // if this alert doesn't show up please upgrade to {N} 2.4.0+
                            alert({
                                title: "Scan result",
                                message: "Format: " + result.format + ",\nValue: " + result.text,
                                okButtonText: "OK"
                            });

                        }, 500);
                    },
                    (errorMessage) =>{
                        console.log("No scan. " + errorMessage);
                    }
                );
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