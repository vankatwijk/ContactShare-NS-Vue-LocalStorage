<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="$refs.drawer.nativeView.showDrawer()" col="0" />
                <Label class="title" text="Welcome to NativeScript-Vue!" col="1" />
            </GridLayout>
        </ActionBar>

        <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent backgroundColor="#ffffff">
                <Label class="drawer-header" text="Drawer" />

                <Label class="drawer-item" text="Item 1" />
                <Label class="drawer-item" text="Item 2" />
                <Label class="drawer-item" text="Item 3" />
            </StackLayout>

            <GridLayout ~mainContent columns="*" rows="auto, auto, auto, auto, auto, auto">
                <Label row="0" class="message" text="Check the console log for scanned barcodes"
                    textWrap="true"></Label>

                <!-- <BarcodeScanner
                    row="1"
                    height="300"
                    formats="QR_CODE, EAN_13, UPC_A"
                    beepOnScan="true"
                    reportDuplicates="true"
                    preferFrontCamera="false"
                    @scanResult="onScanResult"
                    v-if="isIOS">
                </BarcodeScanner> -->

                <Button row="1" class="btn btn-primary btn-rounded-sm" text="Scan contact"
                    @tap="doScanWithBackCamera"></Button>
                <Button row="2" class="btn btn-primary btn-rounded-sm" text="Contacts" @tap="navigateToContacts()"></Button>
                <Button row="4" class="btn btn-primary btn-rounded-sm" text="Information"
                    @tap="navigateToInformations()"></Button>
                <Button row="4" class="btn btn-primary btn-rounded-sm" text="My Information"
                    @tap="navigateToMyInformation()"></Button>
                <Button row="5" class="btn btn-primary btn-rounded-sm" text="My Qr Code"
                    @tap="navigateToMyQrCode()"></Button>
                <!-- <Button row="3" class="btn btn-primary btn-rounded-sm" text="front camera, no flip" @tap="doScanWithFrontCamera"></Button> -->

            </GridLayout>
        </RadSideDrawer>


    </Page>
</template>

<script>
    import {
        isIOS
    } from "tns-core-modules/platform";
    import {
        BarcodeScanner
    } from "nativescript-barcodescanner";
    import Contacts from "./Contacts";
    import Notification from "./Notification";
    import Information from "./Information";
    import FirstStart from "./FirstStart";
    import MyQrCode from "./MyQrCode";
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
        data() {
            return {
                isIOS
            }
        },
        mounted() {
            if (getBoolean("isFirstRun") !== false) {
                this.$navigateTo(FirstStart, {
                    animated: true,
                    transition: {
                        name: "slideLeft",
                        duration: 250,
                        curve: "easeIn"
                    }
                });
            }
        },
        methods: {
            navigateToContacts() {
                this.$navigateTo(Contacts, {
                    animated: true,
                    transition: {
                        name: "slideLeft",
                        duration: 250,
                        curve: "easeIn"
                    }
                });
            },
            navigateToNotifications() {
                this.$navigateTo(Notification, {
                    animated: true,
                    transition: {
                        name: "slideLeft",
                        duration: 250,
                        curve: "easeIn"
                    }
                });
            },
            navigateToInformations() {
                this.$navigateTo(Information, {
                    animated: true,
                    transition: {
                        name: "slideLeft",
                        duration: 250,
                        curve: "easeIn"
                    }
                });
            },
            navigateToMyInformation() {
                this.$navigateTo(FirstStart, {
                    animated: true,
                    transition: {
                        name: "slideLeft",
                        duration: 250,
                        curve: "easeIn"
                    }
                });
            },
            navigateToMyQrCode() {
                this.$navigateTo(MyQrCode, {
                    animated: true,
                    transition: {
                        name: "slideLeft",
                        duration: 250,
                        curve: "easeIn"
                    }
                });
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
                        this.$store.dispatch("insertScan",{
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


        },
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