window.addEventListener("load", function (event) {
    let container = document.getElementsByClassName("categories-container")
    let category = document.getElementById("categories-editor")
    let URL = 'http://localhost:8080/categories'

    getCategories()

    category.addEventListener("change",function () {
        getSubcategories()
    });

    async function getRequest() {
        return fetch(URL + '/json-cat', {
            method: "GET",
        });
    }

    function getCategories() {
        getRequest()
            .then((response) => response.json())
            .then((json) => {
                addCategoriesToDropdown(json);
            });
    }

    function addCategoriesToDropdown(array) {
        let select = document.getElementById("categories-editor-list")
        for (let i = 0; i < array.length; i++) {
            select.innerHTML +=
                "<option>" + array[i].category + "</option>";
        }
    }

    function getSubcategories () {
        getRequest()
            .then((response) => response.json())
            .then((json) => {
                let categoryName = document.getElementById("categories-editor");
                addSubCategories(json,categoryName.value);
            });
    }

    function addSubCategories(array,categoryName) {
        let container = document.getElementById("subcategories-container");
        // removeAllChildNodes(container);
        // document.getElementById("subcategories").value = "";
        for (let i = 0; i < array.length; i++) {
            console.log(array[i].category === categoryName)
            if (array[i].category === categoryName) {
                container.innerHTML +=
                    "<p>" + array[i].subCategory + "</p>";
            }
        }
    }
    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
});