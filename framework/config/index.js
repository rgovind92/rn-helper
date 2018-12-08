import colors from './colors';
import strings from './strings';
import menuConfig from './menuConfig';
import sampleresponses from './sampleresponses';

//const pushURL = 'http://192.168.17.114:8080/SnowfinchMEAP_3.2/';
//const crashLogURL = 'http://192.168.45.141:10920/crashreports/';

export default {
  navigation: {
    drawer: true,
    login: true,
    // setting menu: false does not work (We need move navigation out of redux for this)
    menu: true,
    /* Name of a screen defined in the routes object that will be the landing page of the app,
    after login (if there is login). */
    landingPage: 'Main',
    /* Default screens available in routes: Login, Header, Footer and Home */
    routes: null
  },
  /* Unique name for the app. This is used to name the app's log file, or as an index in 
  an remote app monitoring DB. */
  appName: 'iCargo',
  appVersion: '0.0.1',
  iCargoURL: 'http://192.168.17.114:7001/',
  anonymousToken: 'aWNTZXNzaW9uSWQ6SFhQZnVnJTJCUU1INGxIVENMRkFVWWNWRjVYanVvcGxBYWhEbWt1SFBDSlRuU2s4SThIQ1lwWGUzZjN1NCUyRloxaFFzMVYlMkJaJTJGRnlQJTJGeFclMEQlMEFaeVZXTFhUViUyRkElM0QlM0Q=', //eslint-disable-line
  identityTokenKey: 'icargo-identitytoken',
  companyCode: 'AV',

  fonts: null,
  colors,

  sampleresponses,
  /* Mock latency when working in standalone mode */
  mockLatency: 2000,

  /* Map of String to translated String; Localizable from the app only, not from the OS settings */
  strings,

  /* TODO: Remove this */
  menuConfig,

  // Set this to true to fetch menu items from the database.
  menuWithPrivilege: false,

  // env: 'PROD',
  /* Add modules to exclude to this array. For example,
  exclude: ['loggerMiddleware', 'sampleresponses'].
  Map of excludable modules to its description (for reference): {
    loggerMiddleware: 'logs each redux action to the FS or to an ElasticSearch DB',
    sampleresponses: 'fetches all data from a local map of js functions',
    timer: 'adds a component to the view hierarchy that dispatches a redux event every minute',
    reduxIgnore: 'makes all reducers except "auth", "common" and "shared" ignore actions' +
      'that are dispatched when its current screen is not active'
  } */
  exclude: ['reduxIgnore']
};
