var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productDescriptionInput = document.getElementById("productDescription");
var productCategoryInput = document.getElementById("productCategory");
var productImageInput = document.getElementById("productImage");
var productSaleInput = document.getElementById("productSale");
var search = document.getElementById('searchInput');
var add = document.getElementById('addbutton')
var update = document.getElementById('updatebutton')
var productContainer = [];

if(localStorage.getItem("products")==null){
    productContainer=[];

}else{
    productContainer=JSON.parse (localStorage.getItem("products"));
    display()
}

function addProduct(){
    // console.log(image.value.substring(image.value.lastIndexOf('\\')+1));
    // console.log(image.files[0].name);
    if(
        validateInput(productNameInput) &&
        validateInput(productPriceInput) &&
        validateInput(productDescriptionInput) &&
        validateInput(productCategoryInput) &&
        validateInput(productImageInput) 
        
    ){
        var product = {
            name: productNameInput.value,
            price: Number(productPriceInput.value),
            desc: productDescriptionInput.value,
            category: productCategoryInput.value,
            image: productImageInput.files[0] ? `image/${productImageInput.files[0].name}` : "image/placeholder.png",
            sale: productSaleInput.Checked
        }
        productContainer.push(product);
        localStorage.setItem("products", JSON.stringify(productContainer));

        console.log(productContainer);

        clearForm();

        display();
   

}
}

function clearForm(){
    productNameInput.value = null;
    productPriceInput.value = null;
    productDescriptionInput.value=null;
    productCategoryInput.value=null
    productSaleInput.Checked = false;

}

function display(){
    var cartona='';
    for(i=0; i<productContainer.length;i++){
        cartona+=`
        <div class="col-md-2 col-sm-6">
                <div>
                    <img src="${productContainer[i].image}" class="w-100" alt="">
                    <h2 class="h4">${productContainer[i].name} </h2>
                    <p class="text-secondary">${productContainer[i].desc}</p>
                    <h3 class="h5"><span class="fw-bolder">Category </span>${productContainer[i].category}</h3>
                    <h3 class="h5"><span class="fw-bolder">Price </span>${productContainer[i].price}</h3>
                    <h3 class="h5"><span class="fw-bolder">Sale </span>${productContainer[i].sale}</h3>
                    <button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm w-100 my-2" >Delete <i class="fas fa-trash-alt"></i></button>
                    <button onclick="setFormUpdate(${i})" class="btn btn-outline-warning btn-sm w-100 my-2" >Update <i class="fas fa-pen-alt"></i></button>

                </div>
            </div>`
    }
    document.getElementById("rowData").innerHTML=cartona;
}


function deleteProduct(deletedIndex){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            productContainer.splice(deletedIndex, 1);
            display()
            localStorage.setItem("products", JSON.stringify(productContainer));
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });
    
}

function searchProduct(){
    var term = search.value;
    var cartona='';
    for(var i=0;i<productContainer.length;i++){
        if(productContainer[i].name.toLowerCase().includes(term.toLowerCase())){
            cartona += ` <div class="col-md-2 col-sm-6">
                <div>
                    <img src="${productContainer[i].image}" class="w-100" alt="">
                    <h2 class="h4">${productContainer[i].name} </h2>
                    <p class="text-secondary">${productContainer[i].desc}</p>
                    <h3 class="h5"><span class="fw-bolder">Category </span>${productContainer[i].category}</h3>
                    <h3 class="h5"><span class="fw-bolder">Price </span>${productContainer[i].price}</h3>
                    <h3 class="h5"><span class="fw-bolder">Sale </span>${productContainer[i].sale}</h3>
                    <button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm w-100 my-2" >Delete <i class="fas fa-trash-alt"></i></button>
                    <button onclick="setFormUpdate(${i})" class="btn btn-outline-warning btn-sm w-100 my-2" >Update <i class="fas fa-pen-alt"></i></button>

                </div>
            </div>`
            
        }
    }
    document.getElementById('rowData').innerHTML=cartona;
}
var updateIndex ;
function setFormUpdate(index) {
    
        updateIndex = index;
        productNameInput.value = productContainer[index].name;
        productPriceInput.value = productContainer[index].price;
        productDescriptionInput.value = productContainer[index].desc;
        productCategoryInput.value = productContainer[index].category;
        productSaleInput.Checked = productContainer[index].sale;

        update.classList.remove('d-none');
        add.classList.add('d-none');
    
        productNameInput.classList.add('is-valid') ;
        productPriceInput.classList.add('is-valid') ;
        productDescriptionInput.classList.add('is-valid');
        productCategoryInput.classList.add('is-valid') ;

    
    
}

function updateProduct(){
    if (
        productNameInput.classList.contains('is-valid') &&
        productPriceInput.classList.contains('is-valid') &&
        productDescriptionInput.classList.contains('is-valid') &&
        productCategoryInput.classList.contains('is-valid') &&
        productImageInput.files[0]

    ){
        productContainer[updateIndex].name = productNameInput.value;
        productContainer[updateIndex].price = productPriceInput.value.value;
        productContainer[updateIndex].desc = productDescriptionInput.value;
        productContainer[updateIndex].category = productCategoryInput.value;
        productContainer[updateIndex].sale = productSaleInput.Checked;


        display();
        localStorage.setItem("products", JSON.stringify(productContainer));

        clearForm();
        update.classList.add('d-none');
        add.classList.remove('d-none');

    }else{
        alert("error");
    }
    

}

function validateInput(element){
    
    var regex={
        productName: /^[A-Z][a-z]{3,10}$/,
        productPrice: /^[1-9][0-9][0-9]$/,
        productDescription: /.{6,10}/,
        productCategory: /^(Tv|Mobile|Screen|Laptop)$/,
        productImage:/^.{1,}\.(jpg|png|svg)$/
    }
    if(regex[element.id].test(element.value)){
        element.nextElementSibling.classList.add("d-none")
        element.classList.remove('is-invalid')
        element.classList.add('is-valid')
        return true
    }else{
        element.nextElementSibling.classList.remove("d-none")
        element.classList.add('is-invalid')
        element.classList.remove('is-valid')
        
        return false

    }
}