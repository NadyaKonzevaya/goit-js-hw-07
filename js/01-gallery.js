import { galleryItems } from './gallery-items.js';
// Задание 1. Создай галерею с возможностью клика по её элементам и просмотра полноразмерного изображения в модальном окне. 
// Посмотри демо видео работы галереи.


// +1. Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
// +2. Реализация делегирования на div.gallery и получение url большого изображения.
// +3. Подключение скрипта и стилей библиотеки модального окна basicLightbox.
//  +Используй CDN сервис jsdelivr и добавь в проект ссылки на минифицированные (.min) файлы библиотеки.
// +4. Открытие модального окна по клику на элементе галереи. Для этого ознакомься с документацией и примерами.
// +5. Замена значения атрибута src элемента <img> в модальном окне перед открытием. 

// Используй готовую разметку модального окна с изображением из примеров библиотеки basicLightbox.
// Разметка элемента галереи
// Ссылка на оригинальное изображение должна храниться в data-атрибуте source на элементе <img>, и указываться в href ссылки. 
// Не добавляй другие HTML теги или CSS классы кроме тех, что есть в этом шаблоне.

// <div class="gallery__item">
//   <a class="gallery__link" href="large-image.jpg">
//     <img
//       class="gallery__image"
//       src="small-image.jpg"
//       data-source="large-image.jpg"
//       alt="Image description"
//     />
//   </a>
// </div>
// +Обрати внимание на то, что изображение обернуто в ссылку, 
// +а значит при клике по умолчанию пользователь будет перенаправлен на другую страницу. 
// +Запрети это поведение по умолчанию.

// Закрытие с клавиатуры
// ⚠️ Следующий функционал не обязателен при сдаче задания, но будет хорошей дополнительной практикой.

// Добавь закрытие модального окна по нажатию клавиши Escape. 
// Сделай так, чтобы прослушивание клавиатуры было только пока открыто модальное окно. 
// У библиотеки basicLightbox есть метод для программного закрытия модального окна.


// Создаем рефы
const refs = {
    gallery : document.querySelector(".gallery"),
}

// создаем разметку по массиву данных

function createItemsMarkup (items) {
    return items.map(item => 
        `
        <div class="gallery__item">
            <a class="gallery__link" href=${item.original}>
                <img
                    class="gallery__image"
                    src=${item.preview}
                    data-source=${item.original}
                    alt=${item.description}
                />
            </a>
        </div>
        `).join("");
};

const markup = createItemsMarkup(galleryItems);


// рендерим разметку

refs.gallery.innerHTML = markup;

// Реализация делегирования на div.gallery и получение url большого изображения

refs.gallery.addEventListener("click", onImageClick);

function onImageClick (event) {
    event.preventDefault();
    
    if (event.target.nodeName !== "IMG") {
        return;
    }
    
    const instance = basicLightbox.create(`
    <img width="1400" height="900" src=${event.target.dataset.source}>
    `,
   //  добавляем закрытие модального окна по нажатию клавиши Escape и прослушивание клавиатуры было только пока открыто модальное окно
    {onShow: (instance) => {window.addEventListener("keydown", onEscapeKeyPress)},
	onClose: (instance) => {window.removeEventListener("keydown", onEscapeKeyPress)}});
    instance.show();

    function onEscapeKeyPress (event) {
        if (event.code === "Escape" ) {
            instance.close();
        }
    }   
}

















