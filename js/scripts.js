document.addEventListener("DOMContentLoaded", function () {
  const navInit = () => {
    // изменение цвета фона меню
    const navbarCollapsible = document.body.querySelector("#mainNav");
    // if (navbarCollapsible) console.log("cool");
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }

    // ищем все навигационные ссылки
    const links = document.querySelectorAll(".nav-link");
    // ищем все секции
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      // для каждой секции
      // проверяем, если страница прокручена больше, чем расстояние секции от начала страницы
      if (window.scrollY >= section.offsetTop - 100) {
        console.log(window.scrollY + " >=" + section.offsetTop + " " + section.id); // отладка. можно удалить
        // для каждой ссылки
        links.forEach((link) => {
          // удаляем активный класс
          link.classList.remove("active");
          if (link.href.split("#").pop() === section.id) {
            // проверяем, если href-ссылки без # === id секции
            link.classList.add("acive");
          }
        });
      }
    });
  };

  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.scrollX || document.documentElement.scrollLeft,
      scrollTop = window.scrollY || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }

  // анимация контента

  const animItems = document.querySelectorAll(".animate");
  if (animItems.length > 0) {
    function onEntry(params) {
      animItems.forEach((item) => {
        const itemHeight = item.offsetHeight; // высота анимируемого объекта
        const itemOffset = offset(item).top; // позиция объекта от вернхнего края. Пользовательская функция, разобраться как работает
        const startPos = 2; // параметр регулирования старта анимации
        // не window.innerWidth/innerHeight
        const animPoint = document.documentElement.clientHeight - itemHeight / startPos;

        if (itemHeight > document.documentElement.clientHeight) {
          const animPoint = document.documentElement.clientHeight - document.documentElement.clientHeight / startPos;
        }
        if (scrollY > itemOffset - animPoint && scrollY < itemOffset + itemHeight) {
          item.classList.add("show");
        } else {
          if(!item.classList.contains('no-hide')) {
            item.classList.remove('show');
          }

          // item.classList.remove("show");
        }
      });
    }
  }

  
// еще один вариант решения кода с анимацией. Для следующего урока этот код закомитим
/*
function onEntry(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) {
      change.target.classList.add('show');
    } else change.target.classList.remove('show')
});

}
let options = {threshold: [0.5]};
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.animate');

for (let elm of elements) {
  observer.observe(elm);
}
*/
  onEntry();
  navInit();
  window.addEventListener("scroll", () => {
    navInit();
    onEntry();
  });
  window.addEventListener("resize", () => {
    navInit();
  });
});
