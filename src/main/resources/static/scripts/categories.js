window.addEventListener("load", function (event) {
    let URL = 'http://localhost:8080/'
    if (window.location.href.match(URL + 'categories') == null) {
        return false;
    }
    getCategories()
    let btn = document.getElementById('categories-edit-btn')
    btn.addEventListener('click',function () {
        let editor = document.getElementById('categories-editor')
        if (editor.classList.contains('hidden-box')) {
            editor.classList.remove('hidden-box');
        } else {
            editor.classList.add('hidden-box');
        }
    });

    async function getRequest() {
        return fetch(URL + 'categories/json-cat', {
            method: "GET",
        });
    }

    function getCategories() {
        getRequest()
            .then((response) => response.json())
            .then((json) => {
                addCategoriesToBox(json);
            });
    }

    function addCategoriesToBox(array) {
        let select = document.getElementById("card-list")
        for (let i = 0; i < array.length; i++) {
            //main row
            let row = document.createElement('div')
            row.classList.add('category')
            //box to add columns
            let box = document.createElement('div')
            box.classList.add('category-col')
            //column with categories names
            let col = document.createElement('div')
            col.classList.add('category-col-values')
            //categories box
            let cat = document.createElement('p')
            cat.innerText = array[i].category
            col.appendChild(cat)
            //subcategory box
            cat = document.createElement('p')
            cat.innerText = array[i].subCategory
            col.appendChild(cat)
            box.appendChild(col)
            row.appendChild(box)
            let separator = document.createElement('div')
            separator.classList.add('separator')
            row.appendChild(separator)
            select.appendChild(row)
        }
    }
});

