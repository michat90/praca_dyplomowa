window.addEventListener("load", function (event) {
    event.preventDefault();
    let categoriesBtn = document.getElementById("categories-btn")
    let subcategoriesBtns = document.getElementById("subcategories-btns")
    categoriesBtn.addEventListener('click', function () {
        if (subcategoriesBtns.getAttribute('hidden') !== null) {
            subcategoriesBtns.removeAttribute('hidden')
        } else {
            subcategoriesBtns.hidden = true
        }
    })

});

