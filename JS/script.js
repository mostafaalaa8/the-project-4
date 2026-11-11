let userInfo = document.querySelector("#user-info");
let userData = document.querySelector("#user");
let links = document.querySelector("#links");

if (localStorage.getItem("firstName")){
    links.remove();
    userInfo.style.display = "flex";
    userData.innerHTML = localStorage.getItem("firstName");
}
// ///////////////////////////////////////////////
// جزء السيرش
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const productItems = document.querySelectorAll('.product_item');

    function performSearch() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

        productItems.forEach(item => {
            const titleElement = item.querySelector('h2') || item.querySelector('h3');
            if (titleElement) {
                const title = titleElement.textContent.toLowerCase();
                if (title.includes(query)) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            }
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    if (searchInput) {
        searchInput.addEventListener('input', performSearch);
    }
});

let logOutBtn = document.querySelector("#logout");
logOutBtn.addEventListener("click", function (){
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html";
    }, 100)
});


// //////////////////////////////////////////



// جزء اضافه المنتجات


let allProducts = document.querySelector(".products");


let products = [
    {
        id: 1,
        title: "White Knitted Sweater",
        price: "$400",
        category: "Clothes",
        imageUrl: "../images/photo1-product.jpg"
    },
    {
        id: 2,
        title: "Brown Knitted Sweater",
        price: "$400",
        category: "Clothes",
        imageUrl: "../images/photo2-product.jpg"
    },
    {
        id: 3,
        title: "Casoul Waffle Hoodie",
        price: "$350",
        category: "Winter Wear",
        imageUrl: "../images/photo3-product.jpg"
    },
    {
        id: 4,
        title: "Casoul Waffle Hoodie",
        price: "$450",
        category: "Winter Wear",
        imageUrl: "../images/photo4-product.jpg"
    },
    {
        id: 5,
        title: "Casoul Waffle Hoodie",
        price: "$600",
        category: "Winter Wear",
        imageUrl: "../images/photo5-product.jpg"
    },
    {
        id: 6,
        title: "Casoul Waffle Hoodie",
        price: "$600",
        category: "Winter Wear",
        imageUrl: "../images/photo6-product.jpg"
    },
    {
        id: 7,
        title: "Casoul Waffle Hoodie",
        price: "$350",
        category: "Winter Wear",
        imageUrl: "../images/photo7-product.jpg"
    },
    {
        id: 8,
        title: "Casoul Waffle Hoodie",
        price: "$350",
        category: "Winter Wear",
        imageUrl: "../images/photo8-product.jpg"
    },
    {
        id: 9,
        title: "Casoul Waffle Hoodie",
        price: "$350",
        category: "Winter Wear",
        imageUrl: "../images/photo9-product.jpg"
    }
];

function drawItems() {
    let y = products.map((item) => {
        return `
        <div class="product_item">
            <img class="product_item_img" src="${item.imageUrl}" alt="${item.title}">
            <div class="product_item_desc">
                <h2>${item.title}</h2>
                <p>Price: ${item.price}</p>
                <span>Category: ${item.category}</span>
            </div>
            <div class="product_item_action">
               <i onclick="addedToFavorite(${item.id})" class="fas fa-heart fav" style="cursor: pointer; color: ${item.liked ? 'red' : 'gray'};"></i>
                <button class="add_to_cart" onClick="addToCart(${item.id})">Add to Cart</button>
            </div>
        </div>
        `;
    });

    allProducts.innerHTML = y.join("");
}

drawItems();



// ////////////////////////////////


// تعريف المتغيرات الأساسية للسلة
let cartProductDiv = document.querySelector(".carts_products div");
let badge = document.querySelector(".badge");
let shoppingCartIcon = document.querySelector(".shopping_cart");
let cartsProducts = document.querySelector(".carts_products");

// مصفوفة المنتجات المضافة
let addedItem = localStorage.getItem("ProductsInCart") ? JSON.parse(localStorage.getItem("ProductsInCart")) : [];

// دالة رسم المنتجات داخل الأيقونة
function drawCartProductsUI() {
    if (addedItem.length > 0) {
        badge.style.display = "block";
        badge.innerHTML = addedItem.reduce((acc, item) => acc + item.qty, 0);
        
        let productsUI = addedItem.map((item) => {
            let itemPriceNum = parseFloat(item.price.replace('$', ''));
            let totalItemPrice = (itemPriceNum * item.qty).toFixed(2);

            return `
                <div class="cart-item-box">
                    <div class="cart-item-details">
                        <p class="cart-item-title">${item.title}</p>
                        <div class="cart-item-actions">
                            <button class="qty-btn" onclick="decreaseQty(${item.id})">-</button>
                            <span class="cart-item-qty">${item.qty}</span>
                            <button class="qty-btn" onclick="increaseQty(${item.id})">+</button>
                        </div>
                    </div>
                    <div class="cart-item-price">Price: <br><span>$${totalItemPrice}</span></div>
                </div>
            `;
        });
        
        cartProductDiv.innerHTML = productsUI.join("") + `
        
        `;
    } else {
        badge.style.display = "none";
        cartProductDiv.innerHTML = "<p style='padding: 10px; text-align: center;'>Cart is empty</p>";
    }
}

// استدعاء الدالة عند تحميل الصفحة
if (addedItem.length > 0) {
    drawCartProductsUI();
}

// دالة الإضافة للسلة عند الضغط على زر Add to Cart
function addToCart(id) {
    if (localStorage.getItem("firstName")) {
        let choosenItem = products.find((item) => item.id === id);
        let foundItem = addedItem.find((i) => i.id === choosenItem.id);
        
        if (foundItem) {
            foundItem.qty += 1;
        } else {
            choosenItem.qty = 1;
            addedItem.push(choosenItem);
        }
        
        localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
        drawCartProductsUI();
    } else {
        window.location = "login.html";
    }
}

// إظهار وإخفاء قائمة السلة عند الضغط على الأيقونة
shoppingCartIcon.addEventListener("click", opencart);

function opencart() {
    if (cartProductDiv.innerHTML != "") {
        if (cartsProducts.style.display == "block") {
            cartsProducts.style.display = "none";
        } else {
            cartsProducts.style.display = "block";
        }
    }
}


function increaseQty(id) {
    let item = addedItem.find((i) => i.id === id);
    if (item) {
        item.qty += 1;
        localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
        drawCartProductsUI();
    }
}

function decreaseQty(id) {
    let item = addedItem.find((i) => i.id === id);
    if (item) {
        if (item.qty > 1) {
            item.qty -= 1;
        } else {
            addedItem = addedItem.filter((i) => i.id !== id);
        }
        localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
        drawCartProductsUI();
    }
}
// /////////////////////////////////////////////

function increaseCartQty(id) {
    let ProductsInCart = JSON.parse(localStorage.getItem("ProductsInCart"));
    let item = ProductsInCart.find(i => i.id === id);
    if(item) {
        item.qty = item.qty ? item.qty + 1 : 2;
        localStorage.setItem("ProductsInCart", JSON.stringify(ProductsInCart));
        drawCartProducts(ProductsInCart);
    }
}

function decreaseCartQty(id) {
    let ProductsInCart = JSON.parse(localStorage.getItem("ProductsInCart"));
    let item = ProductsInCart.find(i => i.id === id);
    if(item) {
        if(item.qty > 1) {
            item.qty -= 1;
        } else {
            ProductsInCart = ProductsInCart.filter(i => i.id !== id);
        }
        localStorage.setItem("ProductsInCart", JSON.stringify(ProductsInCart));
        drawCartProducts(ProductsInCart);
    }
}


// /////////////////////////////////////////////////
  
function addedToFavorite(id) {
    // if (!localStorage.getItem("username")) {
    //     window.location = "login.html";
    //     return;
    // }

    let choosenProduct = products.find((item) => item.id === id);
    let favoriteItems = localStorage.getItem("productsFavorite") ? JSON.parse(localStorage.getItem("productsFavorite")) : [];

    let isDuplicate = favoriteItems.some((item) => item.id === id);

    if (!isDuplicate) {
        favoriteItems.push(choosenProduct);
        choosenProduct.liked = true;
    } else {
        favoriteItems = favoriteItems.filter((item) => item.id !== id);
        choosenProduct.liked = false;
    }

    localStorage.setItem("productsFavorite", JSON.stringify(favoriteItems));
    
    // دي خطوة مهمة جداً عشان تعيد رسم الصفحة والقلوب وتحدث شكلها فوراً
    drawItems(products);
}










