# Project Title

Contact sharing app using Qr codes to transmite contact information around

# Project Description

Proof of concept app that scans a qr code containing contact information and generate a qr code to transfer your information to another user. the app is build with nativescript, vue ,nativescript-zxing(generating a qr code) and nativescript-barcodescanner(reading a barcode with the camera)

## Sreenshots
| home  | myinfo | qr scanner | my qr |
| -------------- | ------------- | ------------- | ------------- |
| <img src="https://github.com/vankatwijk/ContactShare-NS-LocalStorage/blob/master/readmeImage/home.png"> | <img src="https://github.com/vankatwijk/ContactShare-NS-LocalStorage/blob/master/readmeImage/my-information.png"> | <img src="https://github.com/vankatwijk/ContactShare-NS-LocalStorage/blob/master/readmeImage/qrscanner.png"> | <img src="https://github.com/vankatwijk/ContactShare-NS-LocalStorage/blob/master/readmeImage/myqr.png"> |



## Features
```
Qr scanning
Qr generation
persistent contact list using sqlite
```

## Test the project

``` bash
# Install dependencies
npm install

# Preview on device
tns preview

# Build, watch for changes and run the application
tns run <platform>

# Build, watch for changes and debug the application
tns debug <platform>

# Build for production
tns build <platform> --env.production

```
## bugs
```
if you clone the repo there should be no issues, but if you for some resone need to reset the app resources, please check the below issues

there is a 'Duplicate class com.google.zxing.qrcode.encoder.QRCode found in modules core-3.3.0.jar' bug that arises from using the above 2 plugins , 
the solution is to add to your /app/App_Resources/Android/app.gradle

  configurations {
    compile.exclude group: 'com.google.zxing'
  }
  
My full app gradle is :
android {
  defaultConfig {
    minSdkVersion 17
    generatedDensities = []
  }
  aaptOptions {
    additionalParameters "--no-version-vectors"
  }
  configurations {
    compile.exclude group: 'com.google.zxing'
  }
}

if you still get an error try this :
open up where the plugin was installed (node_modules/nativescript-zxing) and then delete the platforms/android folder inside my plugin.


  
```
## Usefull final tns build commands
```
some usefull tns commands for final build :
tns resources generate splashes '/readmeImage/logo.png' --background "#C08497"
tns resources generate icons '/readmeImage/icon.png'

changing all name :
/app/App_Resources/Android/src/main/res/values-v21/strings.xml
<resources>
    <string name="app_name">Qr-contact</string>
    <string name="title_activity_kimera">Qr-contact</string>
</resources>

  
```
## Authors

* **Hendrikus van Katwijk** - [Github](https://github.com/vankatwijk) - [Personal website](https://hpvk.com)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

