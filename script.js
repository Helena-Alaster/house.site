document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            e.preventDefault(); // Отключаем стандартный прыжок браузера

            // Получаем высоту фиксированной шапки (если она есть), иначе 0
            const headerOffset = document.querySelector('.header')?.offsetHeight || 0; 
            
            // Координата верха элемента относительно документа
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            
            // Вычисляем точку остановки: центр экрана минус половина высоты блока и высота шапки
            const offsetPosition = elementPosition - (window.innerHeight / 2) + (targetElement.offsetHeight / 2) - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            // Добавляем временный класс для нашей звездочки-индикатора
            targetElement.classList.add('active-highlight');
            
            // Убираем класс через пару секунд
            setTimeout(() => {
                targetElement.classList.remove('active-highlight');
            }, 3000);
        }
    });
});

// Отключаем контекстное меню (правая кнопка мыши)
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

// Отключаем копирование по Ctrl+C / Cmd+C
document.addEventListener('keydown', function(event) {
    if ((event.ctrlKey || event.metaKey) && (event.key === 'c' || event.key === 'C')) {
        event.preventDefault(); // Предотвращаем стандартную реакцию
    }
});
