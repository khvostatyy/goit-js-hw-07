import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainerRef = document.querySelector('.gallery');

//1.Створення і рендер розмітки на підставі масиву даних galleryItems
// і наданого шаблону елемента галереї.

const markupGallery = galleryItems
  .map(
    ({ original, preview, description }) => `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`
  )
  .join('');

galleryContainerRef.insertAdjacentHTML('afterbegin', markupGallery);

//2.Реалізація делегування на div.gallery і отримання url великого зображення.

galleryContainerRef.addEventListener('click', modal);

function modal(e) {
  e.preventDefault();

  if (e.target.tagName !== 'IMG') {
    return;
  }

  const dataSrc = e.target.dataset.source;
  const instance = basicLightbox.create(`<img src="${dataSrc}">`);

  instance.show();

  //3. Закриття Esc

  galleryContainerRef.addEventListener('keydown', onCloseEsc);

  function onCloseEsc(e) {
    if (e.code === 'Escape') {
      galleryContainerRef.removeEventListener('keydown', onCloseEsc);
      instance.close();
    }
  }
}
