window.addEventListener("load", function (event) {
    let URL = 'https://home-budget.up.railway.app/'
    // let URL ='http://localhost:8080/'
    if (window.location.href.match(URL + 'categories') == null) {
        return false;
    }
    addMainCategories()
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

    function addColWithBtns(row, arr, type) {
        let edit = document.createElement('div')
        if (type === 'categories') {
            edit.id = "CatRow#" + arr[row].id
        } else {
            edit.id = "SubCatRow#" + arr[row].id
        }
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
                let type = id.split("#")[0];
                id = id.split("#")[1];
                if (type === 'SubCatRow') {
                    getSubcategoriesById(Number(id),type);
                } else {
                    getCategoryById(Number(id),type)
                }

            });
        });
        Array.from(document.getElementsByClassName("cat-btn-delete")).forEach(function (element) {
            element.addEventListener('click', function () {
                let id = element.parentElement.id;
                let type = id.split("#")[0];
                id = id.split("#")[1];
                if (type === 'SubCatRow') {
                    const response = confirm("Are you sure you want to delete this subcategory?");
                    if (response) {
                        deleteById(Number(id), type);
                    }
                } else {
                    const response = confirm("Are you sure you want to delete this category?" +
                                                " It will delete all related subcategories");
                    if (response) {
                        deleteById(Number(id), type);
                    }
                }
            });
        });
    }

    function getSubcategoriesById(ID,type) {
        getRequest('subcategories/' + ID)
            .then((response) => response.json())
            .then((json) => {
                moveDataToEditor(json,type);
            });
    }

    function getCategoryById(ID, type) {
        getRequest('categories/' + ID)
            .then((response) => response.json())
            .then((json) => {
                moveDataToEditor(json,type);
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

    function moveDataToEditor(array,type) {
        let editor = document.querySelector('#categories-editor')
        let mainCategory = document.querySelector('#editor-category')
        let categoryName = document.getElementById('editor-subcategory');
        let color = document.querySelector('#color-picker');
        let incomeCheckBox = document.querySelector("#editor-income")
        let expenseCheckBox = document.querySelector("#editor-expense")
        let idText = document.querySelector('#editor-subcategory-id')
        let idDiv = document.querySelector('#editor-id-div')

        if (type !== 'CatRow') {
            mainCategory.value = array["categoryEntity"]["category"]
            categoryName.value = array["subCategory"]
        } else {
            categoryName.value = array["category"]
        }
        mainCategory.disabled = true;
        color.style.backgroundColor = array["color"]
        editor.classList.remove('hidden-box');
        if (array["operationType"] === "expense") {
            expenseCheckBox.checked = true;
            incomeCheckBox.checked = false;
        } else {
            incomeCheckBox.checked = true;
            expenseCheckBox.checked = false;
        }
        idText.textContent = "ID: #" + array["id"]
        idDiv.classList.remove('is-hidden')
    }

    function deleteById(Id, type) {
        if (type === 'CatRow') {
            fetch(URL + 'categories/delete/' + Id, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            });
        } else {
            fetch(URL + 'subcategories/delete/' + Id, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            });
        }

        window.location = URL + 'categories'
    }

    function addMainCategories() {
        getRequest('categories/json')
            .then((response) => response.json())
            .then((json) => {
                addMainCategoriesToBox(json);
            });
    }

    function addMainCategoriesToBox(array) {
        let selectBox = document.getElementById("card-list")
        for (let i = 0; i < array.length; i++) {
            //main row
            let row = document.createElement('div')
            row.classList.add('category')
            let categoryRow = document.createElement('div')
            categoryRow.classList.add('category-row')
            row.appendChild(categoryRow)
            let colorCol = addColWithColor(array[i].color)
            let box = addMainCategoriesCol(i, array)
            let edit = addColWithBtns(i, array,'categories')
            categoryRow.appendChild(colorCol)
            categoryRow.appendChild(box)
            categoryRow.appendChild(edit)
            let separator = document.createElement('div')
            separator.classList.add('separator')
            row.appendChild(separator)
            selectBox.appendChild(row)
        }
            // addEvents()
    }

    function addMainCategoriesCol(row, arr) {
        //box to add columns
        let box = document.createElement('div')
        box.classList.add('category-col')
        box.classList.add('category-col-2')
        let col = document.createElement('div')
        col.classList.add('category-col-values')
        //categories box
        let cat = document.createElement('p')
        cat.innerText = arr[row].category
        col.appendChild(cat)
        //subcategory box
        cat = document.createElement('p')
        cat.innerText = ""
        col.appendChild(cat)
        box.appendChild(col)
        return box
    }


});

