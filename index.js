console.log("This is project 6")

// Utility Function
// 1]utiltiy function to get dom Element from string
function getElementsFromString(string) {
    let div = document.createElement("div")
    div.innerHTML = string;
    return div.firstElementChild
}
// Initialize no of parameters
let addedParamCount = 0;

// Hide the parameters box essentially
let parametersBox = document.getElementById("parametersBox")
parametersBox.style.display = "none";

// If the use clicks on params, hide the json box
let customParameters = document.getElementById("customParameters")
customParameters.addEventListener("click", () => {
    let requestJsonBox = document.getElementById("requestJsonBox")
    requestJsonBox.style.display = "none";
    parametersBox.style.display = "block";
})

// If the use clicks on json box, hide the params box
let json = document.getElementById("json")
json.addEventListener("click", () => {
    let parametersBox = document.getElementById("parametersBox")
    let requestJsonBox = document.getElementById("requestJsonBox")
    parametersBox.style.display = "none";
    requestJsonBox.style.display = "flex";
})

// If the user clicks on plus button the add more parameters
let plusBtn = document.getElementById("plusBtn");
plusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let parameters = document.getElementById("multipleParams")
    let string = ` <div id="form-row">
                    <label for="" class="uniqueLabel">Parameter ${addedParamCount + 2}</label>
                    <div class="group">
                    <input type="text" name="" id="parameterKey${addedParamCount + 2}" "class="unique"
                    placeholder="Enter parameter ${addedParamCount + 2} Key">
                    </div>
                    <div class="group">
                    <input type="text" name="" id="parameterValue${addedParamCount + 2}" class="unique"
                    placeholder="Enter parameter ${addedParamCount + 2} Value">
                    </div>
                    <button class="minusBtn">-</button>
                </div>`
    // Convert the element string to DOM node
    let paramElement = getElementsFromString(string)
    // console.log(paramElement)
    multipleParams.append(paramElement)


    // if the user clicks on minus button then remove the parameter
    let minusBtn = document.getElementsByClassName("minusBtn")
    for (keys of minusBtn) {
        keys.addEventListener("click", (e) => {
            e.target.parentElement.remove();
        })
    }
    addedParamCount++;

})

//If the user clicks on sumbit button
let submit = document.getElementById("submitBtn")
submit.addEventListener("click", (e) => {
    // show please wait in the response box
    e.preventDefault();
    let responseJsonText = document.getElementById("responseJsonText")
    responseJsonText.innerText = "Please wait... Fetching response.."

    // Fetch all the values user has entered
    let url = document.getElementById("formUrl").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    // Log all the values in the console for debugging
    console.log(url, requestType, contentType);

    // If user has used customParameters option instaed of json,collect all parameters in an Object
    if (contentType == 'customParameters') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById("requestJsonText").value
    }
    // Log all the values in the console for debugging
    console.log("url is", url);
    console.log("contentType is", contentType);
    console.log("requestType is", requestType);
    console.log("data is", data);


    // if the request type is get ,invoke fetch api to create a get request

    if (requestType == "GET") {
        fetch(url, {
            method: "GET",
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById("responseJsonText").value = text;
            });
    }

    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responseJsonText').value = text;
            });

    }


})