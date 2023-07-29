window.addEventListener("load", function (event) {
    let URL = 'http://localhost:8080/'
    if (window.location.href.match(URL + 'categories') == null) {
        return false;
    }
    let incomeCheckBox = document.getElementById("editor-income")
    let expenseCheckBox = document.getElementById("editor-expense")


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
        let mainCategoryName = document.getElementById('editor-category');
        let categoryError = document.getElementById('editor-error-category');
        let valid = true;
        if (categoryName.value === '') {
            valid = false;
            setHiddenAttribute(categoryError,"Category cannot be empty", true);
        } else {
            if (duplicatedCategory(categoryName, mainCategoryName)) {
                setHiddenAttribute(categoryError)
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

    function postRequest() {
        let categoryName = document.getElementById('editor-subcategory');
        let color = document.getElementById('color-picker');
        let mainCategory = document.getElementById('editor-category');
        let queryUrl;
        let data;
        if (mainCategory.value !== '') {
            let categoryId = getIdOfDatalist(mainCategory.value);
            data = {
                subCategory: categoryName.value,
                color: color.style.backgroundColor,
                operationType: getOperationType(),
            }
            queryUrl = 'subcategories/' + categoryId;
            sendPostQuery(URL + queryUrl, data)
            window.location = URL + 'categories'
        } else {
            //add main Category to dataBase
            data = {
                category: categoryName.value,
                color: color.style.backgroundColor,
                operationType: getOperationType(),
            }
            queryUrl = 'categories';
            sendPostQuery(URL + queryUrl, data)
            //add at the same time first subcategory to dataBase
            data = {
                subCategory: categoryName.value + ' General',
                color: color.style.backgroundColor,
                operationType: getOperationType(),
            }
            setTimeout(5000)
            addFirstSubCategory(data,categoryName.value)
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
            return 'expence'
        }
    }

    function getIdOfDatalist(inputValue){
        let catId;
        console.log(inputValue)
        Array.from(document.getElementsByClassName("editor-category-list")).forEach(function(element) {
            console.log(element.value)
            console.log(inputValue)
            if (element.value === inputValue) {
                let id = element.id.split('#')
                catId = id[1]
            }
        });
        return Number(catId);
    }

    async function getRequest(requestUrl) {
        return fetch(URL + requestUrl);
    }

    function addFirstSubCategory (data, maincategoryName) {
        getUpdatedCategories()
        function getUpdatedCategories() {
            getRequest('categories/json')
                .then((response) => response.json())
                .then((json) => {
                    Send(json);
                });
        }
        function Send (array) {
            for (let i = 0; i < array.length; i++) {
                if (array[i].category === maincategoryName) {
                    let categoryId = array[i].id;
                    let queryUrl = 'subcategories/' + categoryId;
                    sendPostQuery(URL + queryUrl, data)
                }
            }

        }
    }
});