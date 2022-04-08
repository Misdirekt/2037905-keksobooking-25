import {arrayOfAdverts} from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarAds = arrayOfAdverts();

const similarListElement = document.querySelector('#map-canvas');

const typesDictionary = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};


const createAd = ({offer, author}) => {
  const adElement = cardTemplate.cloneNode(true);

  //константы для блока photos
  const adElementPhotoContainer = adElement.querySelector('.popup__photos');
  const adElementPhotoTemplate = adElement.querySelector('.popup__photo');
  adElementPhotoContainer.textContent = '';

  const createPhotos = (photosList) => {
    const photosListFragment = document.createDocumentFragment();

    photosList.forEach((photos) => {
      const photoElement = adElementPhotoTemplate.cloneNode();
      adElement.src = photos;
      adElementPhotoContainer.append(photoElement);
    });
    return photosListFragment;
  };

  const createFeatures = (featureList) => {
    const featureListFragment = document.createDocumentFragment();

    featureList.forEach((featureItem) => {
      const featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature');
      featureElement.classList.add(`popup__feature--${featureItem}`);
      featureListFragment.append(featureElement);
    });

    return featureListFragment;
  };
  if (offer.title) {
    adElement.querySelector('.popup__title').textContent = offer.title;
  }
  else {
    adElement.querySelector('.popup_tittle').classList.add('hidden');
  }

  if (offer.address) {
    adElement.querySelector('.popup__text--address').textContent = offer.address;
  }
  else {
    adElement.querySelector('.popup__text--address').classList.add('hoidden');
  }

  if (offer.price) {
    adElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  }
  else {
    adElement.querySelector('.popup__text--price').classList.add('hidden');
  }

  if (offer.capacity) {
    adElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  }
  else {
    adElement.querySelector('.popup__text--capacity').classList.add('hidden');
  }

  if (offer.time) {
    adElement.querySelector('.popup__text--time').textContent =`Заезд после ${offer.checkout}, выезд до ${offer.checkout}`;
  }
  else {
    adElement.querySelector('.popup__text--time').classList.add('hidden');
  }

  if (offer.avatar){
    adElement.querySelector('.popup__avatar').src = author.avatar;
  }
  else {
    adElement.querySelector('.popup__avatar').classList.add('hidden');
  }

  if (offer.type) {
    adElement.querySelector('.popup__type').textContent = typesDictionary[offer.type];
  }
  else {
    adElement.querySelector('.popup__type').classList.add('hidden');
  }

  const popupDescription = adElement.querySelector('.popup__description');
  popupDescription.innerHTML = '';
  if (offer.description) {
    popupDescription.textContent = offer.description;
  }

  const featureContainer = adElement.querySelector('.popup__features');
  featureContainer.innerHTML = '';
  if (offer.features) {
    featureContainer.append(createFeatures(offer.features));
  }

  const photosContainer = adElement.querySelector('.popup__photos');
  photosContainer.innerHTML = '';
  if (offer.photos) {
    photosContainer.append(createPhotos(offer.photos));
  }

  return adElement;
};

const drawAd = () => {
  const similarListFragment = document.createDocumentFragment();

  similarAds.forEach(({offer, author}) => {
    similarListFragment.append(createAd({offer, author}));
  });

  similarListElement.append(similarListFragment);
};

export {drawAd};
