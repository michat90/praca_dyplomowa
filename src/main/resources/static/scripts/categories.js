window.addEventListener("load", function (event) {
    let URL = 'http://localhost:8080/'
    if (window.location.href.match(URL + 'categories') == null) {
        return false;
    }
    getSubcategories()
    let btn = document.getElementById('categories-edit-btn')
    let incomeCheckBox = document.getElementById("editor-income")
    let expenseCheckBox = document.getElementById("editor-expense")
    let id;
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
        return fetch(URL + requestUrl, {
            method: "GET",
        });
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

    incomeCheckBox.addEventListener('change', function () {
        if (incomeCheckBox.checked === true) {
            expenseCheckBox.checked = false
        }
    });
    expenseCheckBox.addEventListener('change', function () {
        if (expenseCheckBox.checked === true) {
            incomeCheckBox.checked = false
        }
    });

    let submit = document.getElementById('editor-btn-submit')
    submit.addEventListener('click',function () {
        if (validForm()) {
            postRequest()
        }
    });

    function validForm() {
        let categoryName = document.getElementById('editor-subcategory');
        let categoryError = document.getElementById('editor-error-category');
        let valid = true;
        if (categoryName.value=== '') {
            valid = false;
            setHiddenAttribute(categoryError, true);
        } else {
            setHiddenAttribute(categoryError)
        }
        return valid;
    }

    function setHiddenAttribute(element, blnError = false) {
        if (blnError)  {
            element.removeAttribute('hidden');
        } else {
            element.hidden = true;
        }
    }

    function postRequest() {
        let categoryName = document.getElementById('editor-subcategory')
        let color = document.getElementById('color-picker')
        let categoryId = getIdOfDatalist();
        const data = {
            subCategory: categoryName.value,
            color: color.style.backgroundColor,
            operationType: getOperationType(),
        }
        fetch(URL + 'subcategories/' + categoryId, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        window.location = URL + 'categories'
    }

    function getOperationType() {
        if (incomeCheckBox.checked === true) {
            return 'income'
        } else {
            return 'expence'
        }
    }

    function getIdOfDatalist(datalist_id,input_id){
        let input = document.getElementById('editor-category')
        let catId;
        Array.from(document.getElementsByClassName("editor-category-list")).forEach(function(element) {
            if (element.value === input.value) {
                let id = element.id.split('#')
                catId = id[1]
            }
        });
        return Number(catId);
    }

    // async function getCategoryId() {
    //     try {
    //         const response = await fetch(URL + 'categories/json');
    //         const data = await response.json();
    //         let mainCategoryName = document.getElementById('editor-category')
    //         for (let i = 0; i < data.length; i++) {
    //             if (data[i].category === mainCategoryName.value) {
    //                  return data[i].id;
    //             }
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
});

