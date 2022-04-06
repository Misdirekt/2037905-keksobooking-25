import {arrayOfAdverts, ADVERTS_NUMBER} from './data.js';
import {drawAd} from './markup-generation.js';
import {getActiveState, getDisactiveState} from './map-form.js';
arrayOfAdverts(ADVERTS_NUMBER);
drawAd();

getDisactiveState();
setTimeout(getActiveState, 2000);
