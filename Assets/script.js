//Accordians toogle on navbar
function toggleAccordion(event) {
    event.preventDefault();

    const header = event.target.closest('a');
    header.classList.toggle('active');

    const content = header.nextElementSibling;
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
}



// where input Select2 is displayed

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



















var quantityInput = document.getElementById('quantityInput');
var showInputsButton = document.getElementById('showInputsButton');
var clearIcon = document.getElementById('clearIcons');
var clearIconBelow = document.getElementById('clearIconBelow');



// IF Quantity Input Type is null Button is disable 

quantityInput.addEventListener('input', function () {

    if (quantityInput.value.trim() !== '') {
        clearIcon.style.display = 'block';

    } else {
        clearIcon.style.display = 'block';

    }
});

//Click on Small X Cross Button To Display None Whole Section
clearIcon.addEventListener('click', function () {
    quantityInput.value = '';
 
    inputFields.forEach(function (inputField) {
        inputField.style.display = "none";
        $("#quantityInput").prop('disabled', true);

    });
    clearIcon.style.display = 'block';
    $("#quantityInput").prop('disabled', false);
    

    quantityInput.focus();
});







//   //DropZone








  $("#showInputsButton").click(function() {
    $("#quantityInput").attr('disabled', !$("#").attr('disabled'));
  });

  function disable(){
    document.getElementById("quantityInput").disabled = "true";
    }



    
    $('#file').on('change', function() {
      var file = this.files[0],
          filename = file.name,
          $label = $(this).next('.file-custom'),
          $preview = $('#preview'),
          img = document.createElement("img"),
          reader = new FileReader();
      
      img.file = file;
      img.classList.add("img-responsive");
      $preview.html(img);
      
      reader.onload = (function(aImg) {
        return function(e) {
          aImg.src = e.target.result;
        };
      })(img);
    
      reader.readAsDataURL(file);
      
      $label
        .attr('data-label', filename)
          .addClass('active');
    });
  



    // Product Catergories Select2 

$.ajax({
  url: 'https://950c-39-62-211-60.ngrok-free.app/api/EcommerceProduct/GetProductCategories',

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
     
      parentData.map(test => {


          let ParentNullList = document.getElementById("a")


         

          let cdata = childData.map((value, index) => {
              return test.Id == value.ParentId ? `<option> > ${value.Name}</option>` : false
           
            })
            
          ParentNullList.insertAdjacentHTML('beforeend',
              `<option id="Parent-option" disabled="disabled""> ${test.Name}</option> <br> ${cdata}`
              );
            
           



          $('.js-data-example-ajax').select2({
              placeholder: "Select a Parent",
              allowClear: true
          })
        
        
      })



  }


})











Dropzone.autoDiscover = false;
var base64String;


var arr = new Array();

  var zdrop = new Dropzone('#dropzone', {
    url: '#',
    maxFiles: 2,
    maxFilesize: 30,
    addRemoveLinks: true,
   
    init: function() {
   
      this.on("removedfile", function(file) {
        console.log('File is Removed');

arr = arr.filter(function(item) {
    return item !== file.name
})
console.log(arr) 
    }); 
  }    
  });
    // Override the default 'upload' function to handle the file and convert it to a Base64 string
    let dropzoneBase64String = '';

    Dropzone.prototype.uploadFiles = function (files) {
      const self = this;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = function (e) {
          const base64String = e.target.result;
          self.emit("success", file, { base64String: base64String });
          arr.push(file.name);
        
          dropzoneBase64String = base64String; // Store the base64String in a variable accessible to the Approve function
        };
        reader.readAsDataURL(file);
      }
    }




// Define a global variable to store the row data
var rowData = [];

// Select2 Variation Section
$.ajax({
  url: 'https://950c-39-62-211-60.ngrok-free.app/api/EcommerceProduct/GetProductVariations',
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
    });
    const childData = data.filter((value, index) => {
      return value.AttributeId;
    });

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

// Adding Dynamic Rows in Millat At Button OnClick Function
function addRow() {
  var table = document.getElementById("myTable");
  var row = table.insertRow(-1);

  var input1 = document.getElementById("variationCategory");
  var text = input1.options[input1.selectedIndex].text;
  var input112 = document.getElementById("variationCategory").value

  var input2 = document.getElementById("variationCategory-child").value;
  var input3 = document.getElementById("input3").value;

  var fazool = document.getElementById('Product-Code').value
  let ProductQuantity = document.getElementById("quantityInput").value;



  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);

  cell1.innerHTML = text;
  cell2.innerHTML = input2;
  cell3.innerHTML = input3;
  cell4.innerHTML = '<div onclick="removeRow(this)"><i class="fa-solid fa-trash-can" style="color: #d60505;"></div>';

  // Store the row data in an object
  var rowObj = {
    Variation: text,
    Attribute: input2,
    Quantity: input3,
    AttributeId:input112,
    Code:fazool,
    ProductQuantity: ProductQuantity
  };
  rowData.push(rowObj);
}
function removeRow(button) {
  var row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);

  var rowIndex = row.rowIndex - 1;
  rowData.splice(rowIndex, 1);
}

// Approve function
function Approve() {
  let myobj = {};
  let ProductName = document.getElementById("Product-first-name").value;
  let ProductCode = document.getElementById("Product-Code").value;
  let ShortDescription = document.getElementById("Short-description").value;
  let FullDescription = document.getElementById("Full-description").value;
  let ProductQuantity = document.getElementById("quantityInput").value;
 


  

  var ProductPrice = Number(document.getElementById("Product-Price").value);
  var ProductDiscount = Number((document.getElementById("Product-Discount").value = 30)) / 100;
  let ProductDiscountPercentage = ProductPrice - ProductPrice * ProductDiscount;
  ProductDiscountPercentage.toFixed(2);

  let bestSellingCheckbox = document.getElementById("Product-Check");
  let isBestSelling = bestSellingCheckbox.checked;

  let featuredCheckbox = document.getElementById("Featured-Check");
  let isFeatured = featuredCheckbox.checked;

  let aImg = document.querySelector('#preview img');
  if (aImg) {
    aImg.file;
  }

  let selectedCategory = $('.js-data-example-ajax').val();

  myobj["Product-first-name"] = ProductName;
  myobj["Product-Code"] = ProductCode;
  myobj["Short-description"] = ShortDescription;
  myobj["Full-Desctiption"] = FullDescription;
  myobj["Product-Price"] = ProductPrice;
  myobj["Discount-Price"] = ProductDiscountPercentage;
  myobj["Discount-Percentage"] = ProductDiscount * 100;
  myobj["Product-Quantity"] = ProductQuantity;
  myobj["Image-src"] = aImg;
  myobj["Product-Category"] = selectedCategory;
  myobj["BestSelling"] = isBestSelling;
  myobj["Featured"] = isFeatured;
  myobj["Variation"] = rowData;

  console.log(myobj);
}
