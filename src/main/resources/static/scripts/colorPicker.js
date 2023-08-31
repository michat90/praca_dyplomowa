window.addEventListener("load", function (event) {
    // let URL = 'http://localhost:8080/'
    let URL;
    if (window.location.host.indexOf('http://') < 1) {
        URL = 'http://' + window.location.host + '/';
    } else {
        URL = window.location.host + '/';
    }
    if (window.location.href.match(URL + 'categories') == null && window.location.href.indexOf('new-transaction') < 1) {
        return false;
    }
    
    let colorPicker = document.getElementById('color-picker')
    let colorPalette = document.getElementById('color-palette')
    colorPicker.addEventListener('click', function () {

        if (colorPalette.classList.contains('hide')) {
            colorPalette.classList.remove('hide')
            createPalette()
        } else {
            colorPalette.classList.add('hide')
        }
    })

    let colors = [
        "#B71C1C", "#D32F2F", "#F44336", "#E57373", "#FFCDD2",
        "#880E4F", "#C2185B", "#E91E63", "#F06292", "#F8BBD0",
        "#4A148C", "#7B1FA2", "#9C27B0", "#BA68C8", "#E1BEE7",
        "#311B92", "#512DA8", "#673AB7", "#9575CD", "#D1C4E9",
        "#1A237E", "#303F9F", "#3F51B5", "#7986CB", "#C5CAE9",
        "#0D47A1", "#1976D2", "#2196F3", "#64B5F6", "#BBDEFB",
        "#01579B", "#0288D1", "#03A9F4", "#4FC3F7", "#B3E5FC",
        "#006064", "#0097A7", "#00BCD4", "#4DD0E1", "#B2EBF2",
        "#004D40", "#00796B", "#009688", "#4DB6AC", "#B2DFDB",
        "#194D33", "#388E3C", "#4CAF50", "#81C784", "#C8E6C9",
        "#33691E", "#689F38", "#8BC34A", "#AED581", "#DCEDC8",
        "#827717", "#AFB42B", "#CDDC39", "#DCE775", "#F0F4C3",
        "#F57F17", "#FBC02D", "#FFEB3B", "#FFF176", "#FFF9C4",
        "#FF6F00", "#FFA000", "#FFC107", "#FFD54F", "#FFECB3",
        "#E65100", "#F57C00", "#FF9800", "#FFB74D", "#FFE0B2",
        "#BF360C", "#E64A19", "#FF5722", "#FF8A65", "#FFCCBC",
    ]
    let colorGrid = document.getElementById('color-grid')
    function createPalette() {
        removeAllChildNodes(colorGrid)
        for (let i = 0; i < colors.length; i++) {
            let newElement = document.createElement('p');
            newElement.classList.add('color-circle');
            newElement.style.backgroundColor = colors[i];
            colorGrid.appendChild(newElement)
        }
        addEvents()
    }

    function addEvents() {
        Array.from(document.getElementsByClassName("color-circle")).forEach(function(element) {
            element.addEventListener('click',function () {
                colorPicker.style.backgroundColor = element.style.backgroundColor
                colorPalette.classList.add('hide')
            })
        });
    }

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

});