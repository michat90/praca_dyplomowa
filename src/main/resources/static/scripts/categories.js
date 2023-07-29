window.addEventListener("load", function (event) {
    let URL = 'http://localhost:8080/'
    if (window.location.href.match(URL + 'categories') == null) {
        return false;
    }
    getSubcategories()
    let btn = document.getElementById('categories-edit-btn')
    let incomeCheckBox = document.getElementById("editor-income")
    let expenseCheckBox = document.getElementById("editor-expense")

    btn.addEventListener('click', function () {
        let editor = document.getElementById('categories-editor')
        if (editor.classList.contains('hidden-box')) {
            editor.classList.remove('hidden-box');
            expenseCheckBox.checked = true;
            getCategories()
            document.getElementById('color-picker').style.backgroundColor = '#1E87F0'
        } else {
            editor.classList.add('hidden-box');
            let input = document.getElementById('editor-category')
            input.value = ""
            input = document.getElementById('editor-subcategory')
            input.value = ""
        }
    });

    async function getRequest(requestUrl) {
        return fetch(URL + requestUrl);
    }

    function getSubcategories() {
        getRequest('subcategories/json')
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
            row.id = "#" + array[i].id
            //add color
            let color = document.createElement('div')
            color.classList.add('color-category')
            color.classList.add('category-col')
            color.style.backgroundColor = array[i].color
            //box to add columns
            let box = document.createElement('div')
            box.classList.add('category-col')
            //column with categories names
            let col = document.createElement('div')
            col.classList.add('category-col-values')
            //categories box
            let cat = document.createElement('p')
            cat.innerText = array[i].categoryEntity["category"]
            col.appendChild(cat)
            //subcategory box
            cat = document.createElement('p')
            cat.innerText = array[i].subCategory
            col.appendChild(cat)
            box.appendChild(col)
            row.appendChild(color)
            row.appendChild(box)
            let separator = document.createElement('div')
            separator.classList.add('separator')
            row.appendChild(separator)
            select.appendChild(row)
        }
    }

    function getCategories() {
        getRequest('categories/json')
            .then((response) => response.json())
            .then((json) => {
                addCategories(json);
            });
    }

    function addCategories(array) {
        let select = document.getElementById("editor-categories-list")
        removeAllChildNodes(select)
        for (let i = 0; i < array.length; i++) {
                let newRow = document.createElement('option')
                newRow.value = array[i].category
                newRow.setAttribute('id','editor-cat#' + array[i].id)
                newRow.classList.add('editor-category-list')
                select.appendChild(newRow)
        }
    }


    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

});

