//hold the inputs tag that exist in the html
var productNAME = document.getElementById("productNAME");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var productAddUpdateBtn = document.getElementById("mainBtn");

// declare an global variable to save the sending index to update function
var whichIndex ;


// array that i will used to push every added object in it
var productsContainer ;

if(localStorage.getItem("productsList") == null)
{
    productsContainer = [];
}
else{

    productsContainer = JSON.parse(localStorage.getItem("productsList"));

    displayData()
    
}

// function that will add proucts 
function addProducts() {

    

    // to add product
    if(productAddUpdateBtn.innerHTML == "Add Product")
    {
                
        if (checkInputs() == true) {
            
            // object that contain all details of the same product
            var product = {
            name: productNAME.value,
            price: productPrice.value,
            category: productCategory.value,
            desc: productDesc.value

        }

            productsContainer.push(product);
            localStorage.setItem("productsList" , JSON.stringify(productsContainer));
            clearForm();
            displayData();
        }
    
        else{
            window.alert("Sorry All Fields Are Required");
        }
       
    }


    // to update product
    else{

        if (checkInputs() == true){
            productsContainer[whichIndex].name = productNAME.value ;
            productsContainer[whichIndex].price = productPrice.value ;
            productsContainer[whichIndex].category = productCategory.value ;
            productsContainer[whichIndex].desc = productDesc.value ;

            displayData();
            clearForm();
            productAddUpdateBtn.innerHTML = "Add Product";
            localStorage.setItem("productsList" , JSON.stringify(productsContainer));
            


        }

        else{
            window.alert("Sorry All Fields Are Required");
        }
    }


   


}



// function that will clear inputs to be ready for next product adding
function clearForm() {
    productNAME.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDesc.value = "";
}

// function that display the data after pushing it in the array
function displayData() {

    var copya = "";
    for (var i = 0; i < productsContainer.length; i++) {
        copya +=
            `
                <tr>
                <td>${i + 1}</td>
                <td>${productsContainer[i].name}</td>
                <td>${productsContainer[i].price}</td>
                <td>${productsContainer[i].category}</td>
                <td>${productsContainer[i].desc}</td> 
                <td><button class="btn btn-warning" onclick="updateProduct(${i})">Update</button></td>
                <td><button class="btn btn-danger " onclick="deleteProduct(${i})">Delete</button></td>
                </tr>

            `
    }
    document.getElementById("demo").innerHTML = copya;
}


// function that will delete the product(object)
function deleteProduct(index) {

    var check = confirm("DO You Want To Delete This Product")
    if(check == true){
        productsContainer.splice(index, 1);
        localStorage.setItem("productsList" , JSON.stringify(productsContainer));
        
        
        // redisplay the array after deleting the product object from it
        displayData();
    }else{
        displayData();
    }
    


}


// function to check if all inputs are failled or not

function checkInputs() {

    if (productNAME.value != "" && productPrice.value != ""
        && productCategory.value != "" && productDesc.value != "") {
        return true;
    }

    else {
        return false;
    }


}


// function to search 
function searchInput() {

    var searchInputValue = document.getElementById('searchInput').value;

    var cartona = ``;

    for(var i=0 ; i < productsContainer.length  ; i++ )
    {
        if(productsContainer[i].name.toLowerCase().includes(searchInputValue.toLowerCase()) == true
            || productsContainer[i].price.toLowerCase().includes(searchInputValue.toLowerCase()) == true
            || productsContainer[i].category.toLowerCase().includes(searchInputValue.toLowerCase()) == true
            || productsContainer[i].desc.toLowerCase().includes(searchInputValue.toLowerCase()) == true 
            )
        {
            cartona+= `
                        <tr>
                        <td>${i + 1}</td>
                        <td>${productsContainer[i].name.toLowerCase().replace( searchInputValue.toLowerCase() ,`<span id="highlight"> ` + searchInputValue.toLowerCase() + `</span>` )}</td>
                        <td>${productsContainer[i].price.replace( searchInputValue ,`<span id="highlight"> ` + searchInputValue + `</span>` )}</td>
                        <td>${productsContainer[i].category.toLowerCase().replace( searchInputValue.toLowerCase() ,`<span id="highlight"> ` + searchInputValue.toLowerCase() + `</span>` )}</td>
                        <td>${productsContainer[i].desc.toLowerCase().replace( searchInputValue.toLowerCase() ,`<span id="highlight"> ` + searchInputValue.toLowerCase() + `</span>` )}</td>
                        <td><button class="btn btn-warning ">update</button></td>
                        <td><button class="btn btn-danger " onclick="deleteProduct(${i})">delete</button></td>
                        </tr>

                        `
        }

        document.getElementById("demo").innerHTML = cartona ;
    }


}


// function to update 
function updateProduct(index){
    productNAME.value = productsContainer[index].name;
    productPrice.value = productsContainer[index].price;
    productCategory.value = productsContainer[index].category;
    productDesc.value = productsContainer[index].desc;
    productAddUpdateBtn.innerHTML = "Update Product";

    whichIndex = index ;
    
    
    
    // alert(whichIndex);

    // deleteProduct(index);

    // productsContainer[index].name = productNAME.value ;
    // productsContainer[index].price = productPrice.value ;
    // productsContainer[index].category = productCategory.value ;
    // productsContainer[index].desc = productDesc.value ;

    // localStorage.setItem("productsList" , JSON.stringify(productsContainer));
    
}