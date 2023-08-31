window.addEventListener("load", function (event) {
    // let URL = 'http://localhost:8080/'
    let URL;
    if (window.location.host.indexOf('http://') < 1) {
        URL = 'http://' + window.location.host + '/';
    } else {
        URL = window.location.host + '/';
    }
    if (window.location.href.match(URL + 'categories') == null) {
        return false;
    }
    getSubcategories()
    let btn = document.getElementById('categories-edit-btn')
    let incomeCheckBox = document.getElementById("editor-income")
    let expenseCheckBox = document.getElementById("editor-expense")
    let mainCategory = document.querySelector('#editor-category')
    let idDiv = document.querySelector('#editor-id-div')

    btn.addEventListener('click', function () {
        let editor = document.getElementById('categories-editor')
        if (editor.classList.contains('hidden-box')) {
            editor.classList.remove('hidden-box');
            expenseCheckBox.checked = true;
            mainCategory.disabled = false;
            idDiv.classList.add('is-hidden')
            getCategories()
            document.getElementById('color-picker').style.backgroundColor = '#1E87F0';
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
            let categoryRow = document.createElement('div')
            categoryRow.classList.add('category-row')
            row.appendChild(categoryRow)
            let colorCol = addColWithColor(array[i].color)
            let box = addCategoriesCol(i, array)
            let edit = addColWithBtns(i, array)
            categoryRow.appendChild(colorCol)
            categoryRow.appendChild(box)
            categoryRow.appendChild(edit)
            let separator = document.createElement('div')
            separator.classList.add('separator')
            row.appendChild(separator)
            select.appendChild(row)
        }
        addEvents()
    }

    function addColWithColor(colorRgb) {
        let color = document.createElement('div')
        color.classList.add('color-category')
        color.classList.add('category-col-1')
        // color.classList.add('category-col')
        let colorElement = document.createElement('div')
        colorElement.classList.add('color-category-element')
        colorElement.style.backgroundColor = colorRgb
        color.appendChild(colorElement)
        return color
    }

    function addCategoriesCol(row, arr) {
        //box to add columns
        let box = document.createElement('div')
        box.classList.add('category-col')
        box.classList.add('category-col-2')
        let col = document.createElement('div')
        col.classList.add('category-col-values')
        //categories box
        let cat = document.createElement('p')
        cat.innerText = arr[row].categoryEntity["category"]
        col.appendChild(cat)
        //subcategory box
        cat = document.createElement('p')
        cat.innerText = arr[row].subCategory
        col.appendChild(cat)
        box.appendChild(col)
        return box
    }

    function addColWithBtns(row, arr) {
        let edit = document.createElement('div')
        edit.id = "CatRow#" + arr[row].id
        edit.classList.add('category-col-edit')
        edit.classList.add('category-col-3')
        let editElement = document.createElement('img')
        editElement.src = '/icons/delete.svg'
        editElement.classList.add('nav-png')
        editElement.classList.add('cat-btn-delete')
        edit.appendChild(editElement)
        editElement = document.createElement('img')
        editElement.src = '/icons/edit.svg'
        editElement.classList.add('nav-png')
        editElement.classList.add('cat-btn-edit')
        edit.appendChild(editElement)
        return edit
    }

    function addEvents() {
        Array.from(document.getElementsByClassName("cat-btn-edit")).forEach(function (element) {
            element.addEventListener('click', function () {
                let id = element.parentElement.id;
                id = id.split("#")[1];
                getSubcategoriesById(Number(id));
            });
        });
        Array.from(document.getElementsByClassName("cat-btn-delete")).forEach(function (element) {
            element.addEventListener('click', function () {
                let id = element.parentElement.id;
                id = id.split("#")[1];
                const response = confirm("Are you sure you want to delete this subcategory?");
                if (response) {
                    deleteById(Number(id));
                }
            });
        });
    }

    function getSubcategoriesById(ID) {
        getRequest('subcategories/' + ID)
            .then((response) => response.json())
            .then((json) => {
                moveDataToEditor(json);
            });
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
            newRow.setAttribute('id', 'editor-cat#' + array[i].id)
            newRow.classList.add('editor-category-list')
            select.appendChild(newRow)
        }
    }


    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    function moveDataToEditor(array) {
        let editor = document.querySelector('#categories-editor')
        let mainCategory = document.querySelector('#editor-category')
        let categoryName = document.getElementById('editor-subcategory');
        let color = document.querySelector('#color-picker');
        let incomeCheckBox = document.querySelector("#editor-income")
        let expenseCheckBox = document.querySelector("#editor-expense")
        let idText = document.querySelector('#editor-subcategory-id')
        let idDiv = document.querySelector('#editor-id-div')

        mainCategory.value = array["categoryEntity"]["category"]
        mainCategory.disabled = true;
        categoryName.value = array["subCategory"]
        color.style.backgroundColor = array["color"]
        editor.classList.remove('hidden-box');
        if (array["operationType"] === "expence") {
            expenseCheckBox.checked = true;
        } else {
            incomeCheckBox.checked = true;
        }
        idText.textContent = "ID: #" + array["id"]
        idDiv.classList.remove('is-hidden')
    }

    function deleteById(subcategoryId) {
        fetch(URL + 'subcategories/delete/' + subcategoryId, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });
        window.location = URL + 'categories'
    }

});

