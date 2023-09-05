window.addEventListener("load", function (event) {
    let URL = 'https://home-budget.up.railway.app/'
    // let URL ='http://localhost:8080/'
    if (window.location.href.match(URL + 'categories') == null && window.location.href.indexOf('new-transaction') < 1) {
        return false;
    }

    let incomeCheckBox = document.getElementById("editor-income")
    let expenseCheckBox = document.getElementById("editor-expense")
    let newCategoryCheck = false;


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
        let id = document.querySelector('#editor-id-div')
        if (validForm()) {
            if (!id.classList.contains('is-hidden')) {
                let mainCategoryName = document.getElementById('editor-category');
                if (mainCategoryName.value === "") {
                    postRequestCategoryEdit()
                } else {
                    postRequestEdit()
                }
            } else {
                postRequestNew()
            }
        }
    });

    function validForm() {
        let categoryName = document.getElementById('editor-subcategory');
        let mainCategoryName = document.getElementById('editor-category');
        let categoryError = document.getElementById('editor-error-category');
        let id = document.querySelector('#editor-id-div')
        let valid = true;
        if (categoryName.value === '') {
            valid = false;
            setHiddenAttribute(categoryError,"Category cannot be empty", true);
        } else {
            if (id.classList.contains('is-hidden')) {
                if (!duplicatedCategory(categoryName, mainCategoryName)) {
                    setHiddenAttribute(categoryError)
                    valid = false;
                }
            }
        }
        return valid;
    }

    function setHiddenAttribute(element, errorMsg = "", blnError = false) {
        if (blnError)  {
            element.removeAttribute('hidden');
            element.innerText = errorMsg;
        } else {
            element.hidden = true;
        }
    }

    function duplicatedCategory (category,mainCategory){
        let id = document.getElementById("editor-id-div");
        let valid = true;
        let categoryCheck = false;
        if (id.classList.contains("is-hidden")) {
            if (mainCategory.value === "") {
                Array.from(document.getElementsByClassName("editor-category-list")).forEach(function(element) {
                    if (category.value === element.value) {
                        let categoryError = document.getElementById('editor-error-category');
                        setHiddenAttribute(categoryError,"Duplicated category", true);
                        valid = false;
                    }
                });
            } else {
                Array.from(document.getElementsByClassName("editor-category-list")).forEach(function(element) {
                    if (mainCategory.value === element.value) {
                        categoryCheck = true;
                    }
                });
                if (!categoryCheck) {
                    valid = false;
                    let maincategoryError = document.getElementById('editor-error-maincategory');
                    setHiddenAttribute(maincategoryError,"Pick main category from list", true);
                }
            }
        }
        return valid;
    }

    function postRequestNew() {
        let categoryName = document.getElementById('editor-subcategory');
        let categoryNameValue = categoryName.value;
        let color = document.getElementById('color-picker');
        let mainCategory = document.getElementById('editor-category');
        let queryUrl;
        let data;
        console.log(color.style.backgroundColor)
        data = {
            subCategory: categoryName.value,
            color: color.style.backgroundColor,
            operationType: getOperationType(),
        }
        if (mainCategory.value !== '') {
            let categoryId = getIdOfDatalist(mainCategory.value);
            queryUrl = 'subcategories/' + categoryId;
            sendPostQuery(URL + queryUrl, data)
        } else {
            //add main Category to dataBase
            queryUrl = 'categories';
            data = {
                category: categoryName.value,
                color: color.style.backgroundColor,
                operationType: getOperationType(),
            }
            sendPostQuery(URL + queryUrl, data)
            newCategoryCheck = true;
        }
        if (window.location.href.indexOf('new-transaction') > 1){
            if (newCategoryCheck) {
                addCategories(categoryNameValue)
            }
            let editor = document.querySelector('#categories-editor');
            categoryName.value = "";
            mainCategory.value = "";
            editor.classList.add('hidden-box')
        } else {
            window.location = URL + 'categories'
        }

    }

    function sendPostQuery(requestURL, data) {
        fetch(requestURL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }

    function getOperationType() {
        if (incomeCheckBox.checked === true) {
            return 'income'
        } else {
            return 'expense'
        }
    }

    function getIdOfDatalist(inputValue){
        let catId;
        Array.from(document.getElementsByClassName("editor-category-list")).forEach(function(element) {
            if (element.value === inputValue) {
                let id = element.id.split('#')
                catId = id[1]
            }
        });
        return Number(catId);
    }

    async function getRequest(requestUrl, filter) {
        return fetch(URL + requestUrl + filter);
    }

    function postRequestCategoryEdit() {
        let categoryName = document.getElementById('editor-subcategory');
        let color = document.getElementById('color-picker');
        const data = {
            category: categoryName.value,
            color: color.style.backgroundColor,
            operationType: getOperationType(),
        }
        let id = document.getElementById("editor-id-div").textContent;
        id = id.split('#')[1];
        console.log(id)
        fetch(URL + 'categories-edit/' + Number(id), {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        window.location = URL + 'categories'

    }

    function postRequestEdit () {
        let categoryName = document.getElementById('editor-subcategory');
        let categoryNameValue = categoryName.value;
        let color = document.getElementById('color-picker');
        let mainCategory = document.getElementById('editor-category');
        let queryUrl;
        let data;
        data = {
            subCategory: categoryName.value,
            color: color.style.backgroundColor,
            operationType: getOperationType(),
        }
        getCategoryIdAndPost()

        function getCategoryIdAndPost() {
            getRequest('categories-filter/', mainCategory.value)
                .then((response) => response.json())
                .then((json) => {
                    sendJsonToPostRequest(json);
                });
        }

        function sendJsonToPostRequest(array) {
            let subcategoryId = document.querySelector('#editor-subcategory-id').textContent;
            subcategoryId = subcategoryId.split('#')[1]
            for (let i = 0; i < array.length; i++) {
                if (array[i].category === mainCategory.value) {
                    let categoryId = array[i].id;
                    console.log(categoryId)
                    let queryUrl = 'subcategories-edit/' + Number(categoryId) + '/' + Number(subcategoryId);
                    sendPostQuery(URL + queryUrl, data)
                }
            }

        }
        window.location = URL + 'categories'
    }

    function addCategories(mainCategoryName) {
        let select = document.getElementById("categories-list")
        let option = document.createElement('option')
        option.value = mainCategoryName
        select.appendChild(option)
    }



});