function toggleAccordion(event) {
    event.preventDefault();


    const header = event.target.closest('a');


    header.classList.toggle('active');

    const content = header.nextElementSibling;
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
}



$.ajax({
    url: 'https://e5c4-81-19-209-53.ngrok-free.app/api/EcommerceProduct/GetProductCategories',

    headers: {
        'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "69420",
    },
    method: 'GET',
    dataType: 'json',

    success: function (data) {
        console.log(data);
        var parentData = data.filter((value, index) => {
            return !value.ParentId;
        })


        const childData = data.filter((value, index) => {
            return value.ParentId;
        })
        console.log("ParentData", parentData);
        console.log("ChildData", childData);
        parentData.map(test => {


            let ParentNullList = document.getElementById("a")


            console.log("ParentNullList", ParentNullList);

            let cdata = childData.map((value, index) => {
                return test.Id == value.ParentId ? `<option> > ${value.Name}</option>` : false
            })
            ParentNullList.insertAdjacentHTML('beforeend',
                `<option disabled="disabled""> ${test.Name}</option> <br> ${cdata}`
            );




            $('.js-data-example-ajax').select2({
                placeholder: "Select a Parent",
                allowClear: true
            })

        })



    }


})


var showInputsButton = document.getElementById("showInputsButton");
var inputFields = [
    document.getElementById("inputField1"),
    document.getElementById("inputField2"),
    document.getElementById("inputField3"),
    document.getElementById("inputField4"),

];

showInputsButton.addEventListener("click", function () {
    inputFields.forEach(function (inputField) {
        inputField.style.display = "block";
    });
});



$.ajax({
    url: 'https://e5c4-81-19-209-53.ngrok-free.app/api/EcommerceProduct/GetProductVariations',
    headers: {
        'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "69420",
    },
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        console.log(data);
        const parentData = data.filter((value, index) => {
            return value.AttributeId
        })
        const childData = data.filter((value, index) => {
            return value.AttributeId;
        })
        console.log("ParentDataVariation", parentData);
        console.log("ChildDataVariation", childData);
        let uniqueChars = [];

        let variationDropdown = $('#variationCategory');

        variationDropdown.append('<option></option>');

        parentData.forEach(variation => {
            if (!uniqueChars.includes(variation.AttributeName)) {

                uniqueChars.push(variation.AttributeName);
                variationDropdown.append(`<option value ="${variation.AttributeId}">${variation.AttributeName}</option>`);
            }

        });


        variationDropdown.select2({
            placeholder: "Select a Variation",
            allowClear: true,
        });





        let variationChildDropdown = $('#variationCategory-child');
        variationDropdown.on('select2:select', function (e) {

            variationChildDropdown.empty();
            variationChildDropdown.append('<option></option>');
            // Add child options
            let parentId = e.params.data.id;
            childData.forEach(child => {
                if (child.AttributeId == parentId) {
                    variationChildDropdown.append(`<option >${child.Name}</option>`);
                }

            });


        });
        variationChildDropdown.select2({
            placeholder: "Select a Variation Childs",
            allowClear: true,


        });


    }

});



function addNewRow() {
    var table = document.getElementById("employee-table");
    var rowCount = table.rows.length;
    var cellCount = table.rows[0].cells.length;
    var row = table.insertRow(rowCount);
    for (var i = 0; i < cellCount; i++) {
        var cell = row.insertCell(i);
        if (i < cellCount - 1) {
            cell.innerHTML = '<input type="text"  class="inner-cell" />';
        } else {
            cell.innerHTML = '<div  id="text"   value="delete" onclick="deleteRow(this)" /><i class="fa-solid fa-trash" style="color: #ee1111;"></i></div>';
        }
    }
}

// This method will delete a row 

function deleteRow(ele) {
    var table = document.getElementById('employee-table');
    var rowCount = table.rows.length;
    if (ele) {

        ele.parentNode.parentNode.remove();
    } else {

        table.deleteRow(rowCount - 1);
    }
}
















var quantityInput = document.getElementById('quantityInput');


var showInputsButton = document.getElementById('showInputsButton');


quantityInput.addEventListener('input', function () {

    if (quantityInput.value.trim() !== '') {
        showInputsButton.disabled = false;
    } else {
        showInputsButton.disabled = true;
    }
});

showInputsButton.addEventListener('click', function () {

    quantityInput.value = '';
    showInputsButton.disabled = true;
});



var quantityInput = document.getElementById('quantityInput');


var showInputsButton = document.getElementById('showInputsButton');


var clearIcon = document.getElementById('clearIcon');
var clearIconBelow = document.getElementById('clearIconBelow');

quantityInput.addEventListener('input', function () {

    

    if (quantityInput.value.trim() !== '') {
        clearIcon.style.display = 'inline-block';
    } else {
        clearIcon.style.display = 'none';
    }
});


clearIcon.addEventListener('click', function () {
    quantityInput.value = '';
    inputFields.forEach(function (inputField) {
        inputField.style.display = "none";
    });
    clearIcon.style.display = 'none';
    quantityInput.focus();
});







document.querySelector('#addVariationButton').addEventListener('click', addVariation);
function addVariation() {
    // Get the selected attribute value 
    var attribute = document.getElementById('employee-table') ;
    var attributes = attribute.value;
    

document.getElementById('text').innerHTML = attributes
console.log("text", text)
  

    // Create a new row in the table
    var table = document.getElementById('employee-table');
    var row = table.insertRow();
  
    // Insert the attribute value into the attribute column
    var attributeCell = row.insertCell(0);
    attributeCell.innerHTML = attribute;

    console.log(attribute,"field")
  
    // ... (add code for variation, quantity, and action columns if necessary)
  }
  