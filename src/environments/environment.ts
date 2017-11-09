// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBR75M5AZAzyQl-48hrJbLfskto634FU4M',
    authDomain: 'food-ordering-de7cf.firebaseapp.com',
    databaseURL: 'https://food-ordering-de7cf.firebaseio.com',
    projectId: 'food-ordering-de7cf',
    storageBucket: 'food-ordering-de7cf.appspot.com',
    messagingSenderId: '821394914695'
  }
};
