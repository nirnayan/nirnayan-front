// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  apiEndpointBase: 'https://api.nirnayanhealthcare.com/',
  BaseApiUrl: 'https://limsapi.nirnayanhealthcare.com/b2c/',
  BaseLimsApiUrl: 'https://limsapi.nirnayanhealthcare.com/',

  // LimsEndpointBase: 'https://192.168.0.105:3000/',
  // BaseApiUrl: 'https://192.168.0.105:3000/b2c',
  production: false,
   firebase : {
    apiKey: "AIzaSyD_5WxJm0SWFsz0YeWZLiGaetmqjHfPpw4",
    authDomain: "b2c-front.firebaseapp.com",
    projectId: "b2c-front",
    storageBucket: "b2c-front.appspot.com",
    messagingSenderId: "955156638217",
    appId: "1:955156638217:web:10610b3e3daa6f0b2426d8",
    measurementId: "G-5M2XQYLVD8",
    vpaidKey: "BJTcAmKhsFMpAsWfkasnEw78l_FUyEtk8N5hHIJAB-XkphDu592Tmj0kjaVqhpxaoCxmxlW6Efg2_UrDMHZniRA"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
