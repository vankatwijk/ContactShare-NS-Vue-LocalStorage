<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
                <Label class="title" text="Welcome to NativeScript-Vue!"  col="1"/>
            </GridLayout>
        </ActionBar>

        <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent backgroundColor="#ffffff">
                <Label class="drawer-header" text="Drawer"/>

                <Label class="drawer-item" text="Item 1"/>
                <Label class="drawer-item" text="Item 2"/>
                <Label class="drawer-item" text="Item 3"/>
            </StackLayout>

            <GridLayout ~mainContent columns="*" rows="auto, auto, auto, auto, auto">
                <Label row="0" class="message" text="some text" textWrap="true"></Label>
                <Button row="1" class="btn btn-primary btn-rounded-sm" text="Home" @tap="navigateToHome()"></Button>

            </GridLayout>
        </RadSideDrawer>


    </Page>
</template>

<script >
  import Home from "./App";
  export default {
    data() {
      return {
        msg: 'Hello World!'
      }
    },
    methods: {
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
