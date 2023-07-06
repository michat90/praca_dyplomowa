window.onload = function () {
    const obj = {
        Cars: {
            SwedishCars: [
                "Volvo",
                "Saab"
            ],
            GermanCars: [
                "Mercedes",
                {
                    Audi: [
                        "Audi A3",
                        "Audi A4",
                        "Audi A5"
                    ]
                }
            ]
        },
        Food: {
            Fruits: [
                "Orange",
                "Apple",
                "Banana"
            ],
            SaltyFoods: [
                "Pretzels",
                "Burger",
                "Noodles"
            ],
            Drinks: "Water"
        }
    };

    initAccordeon(obj);   // <--------------------------- Call initialization

    function accordeonAddEvents() {
        Array.from(document.getElementsByClassName("accordeon-header")).forEach(function (header) {
            if (header.getAttribute("listener") !== "true") {
                header.addEventListener("click", function () {
                    this.parentNode.getElementsByClassName("accordeon-body")[0].classList.toggle("hide");
                });
                header.setAttribute("listener", "true");
            }
        });

        Array.from(document.getElementsByClassName("button-group")).forEach(function (but) {
            if (but.getAttribute("listener") !== "true") {
                but.addEventListener("click", function () {
                    if (this.getAttribute("depth") === "-1") {
                        let header = this;
                        while ((header = header.parentElement) && header.className !== "accordeon") ;
                        header.getElementsByClassName("accordeon-header")[0].innerHTML = this.innerHTML;
                        return;
                    }
                    const groups = Array.from(this.parentNode.getElementsByClassName("accordeon-group"));
                    groups.forEach(g => {
                        if (g.getAttribute("uuid") === this.getAttribute("uuid") &&
                            g.getAttribute("depth") === this.getAttribute("depth")) {
                            g.classList.toggle("hide");
                        }
                    });
                });
                but.setAttribute("listener", "true");
            }
        });
    }

    function initAccordeon(data) {

        accordeons = Array.from(document.getElementsByClassName("accordeon-body"));
        accordeons.forEach(acc => {
            acc.innerHTML = "";
            const route = (subObj, keyIndex = 0, parent = acc, depth = 0) => {
                const keys = Object.keys(subObj);
                if (typeof subObj === 'object' && !Array.isArray(subObj) && keys.length > 0) {
                    while (keyIndex < keys.length) {
                        var but = document.createElement("button");
                        but.className = "button-group";
                        but.setAttribute("uuid", keyIndex);
                        but.setAttribute("depth", depth);
                        but.innerHTML = keys[keyIndex];
                        var group = document.createElement("div");
                        group.className = "accordeon-group hide";
                        group.setAttribute("uuid", keyIndex);
                        group.setAttribute("depth", depth);
                        route(subObj[keys[keyIndex]], 0, group, depth + 1);
                        keyIndex++;
                        parent.append(but);
                        parent.append(group);
                    }
                } else {
                    if (!Array.isArray(subObj)) subObj = [subObj];
                    subObj.forEach((e, i) => {
                        if (typeof e === 'object') {
                            route(e, 0, parent, depth);
                        } else {
                            var but = document.createElement("button");
                            but.className = "button-group";
                            but.setAttribute("uuid", i);
                            but.setAttribute("depth", "-1");
                            but.innerHTML = e;
                            parent.append(but);
                        }
                    });
                }
            };
            route(data);
        });
        accordeonAddEvents();
    }
}