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





  

  function addRow() {
    var table = document.getElementById("myTable");
    var row = table.insertRow(-1);

    var input1 = document.getElementById("variationCategory").value;
    var input2 = document.getElementById("variationCategory-child").value;
    var input3 = document.getElementById("input3").value;

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = input1;
    cell2.innerHTML = input2;
    cell3.innerHTML = input3;
    cell4.innerHTML = '<div onclick="removeRow(this)"><i class="fa-solid fa-trash-can" style="color: #d60505;"></div>';

    console.log("rows", row )
}


  function removeRow(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
  }