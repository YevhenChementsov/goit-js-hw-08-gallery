const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

//===================================================

const imagesListRef = document.querySelector('.js-gallery');
const modal = {
  ref: document.querySelector('.js-lightbox'),
  overlay: document.querySelector('.lightbox__overlay'),
  imgRef: document.querySelector('.lightbox__image'),
  closeBtn: document.querySelector('[data-action="close-lightbox"]')
};
let currentIndex = 0;

//===================================================

const galleryMarkup = createImageGallery (galleryItems);
imagesListRef.insertAdjacentHTML('beforeend', galleryMarkup);

function createImageGallery (galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
    return `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;
  })
  .join('');
};

//===================================================

imagesListRef.addEventListener('click', onImageListClick);

function onImageListClick (event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  window.addEventListener('keydown', onKeyboardButtonPress);
  modal.closeBtn.addEventListener('click', onCloseModalBtnClick);
  modal.overlay.addEventListener('click', onCloseModalBtnClick);
  modal.ref.classList.add('is-open');
  modal.imgRef.src = event.target.dataset.source;
  modal.imgRef.alt = event.target.alt;

  galleryItems.forEach(item => {
    if (item.original === modal.imgRef.src) {
      currentIndex = galleryItems.indexOf(item);
    }
  });
  
};

//===================================================

function onCloseModalBtnClick () {
  window.removeEventListener('keydown', onKeyboardButtonPress);
  modal.closeBtn.removeEventListener('click', onCloseModalBtnClick);
  modal.overlay.removeEventListener('click', onCloseModalBtnClick);
  modal.ref.classList.remove('is-open');
  modal.imgRef.src = '';
  modal.imgRef.alt = '';
};

//===================================================

function onKeyboardButtonPress(event) {
  if (event.code === 'Escape') {
    onCloseModalBtnClick();
  }
  if (event.code === 'ArrowRight') {
    currentIndex === galleryItems.length - 1 ? (currentIndex = 0) : currentIndex += 1;
  }
  if (event.code === 'ArrowLeft') {
    currentIndex === 0 ? (currentIndex = galleryItems.length - 1) : currentIndex -= 1;
  }
  modal.imgRef.src = galleryItems[currentIndex].original;
  modal.imgRef.alt = galleryItems[currentIndex].description;
  console.log(event)
};