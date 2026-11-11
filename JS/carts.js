let ProductsInCart = localStorage.getItem("ProductsInCart");
let allProducts = document.querySelector(".products");

if(ProductsInCart){
    let item = JSON.parse(ProductsInCart);
    drawCartProducts(item);
}

function drawCartProducts(productsChoosen) {
    if (productsChoosen.length === 0) {
        allProducts.innerHTML = "<p style='text-align: center; margin-top: 50px;'>Your cart is empty</p>";
        document.querySelector("#total-price-val").innerHTML = "$0";
        return;
    }

    let y = productsChoosen.map((item) => {
        let itemQty = item.qty ? item.qty : 1;
        return `
            <div class="cart_item">
                <img class="cart_item_img" src="${item.imageUrl}" alt="">
                <div class="cart_item_desc">
                    <h2>${item.title}</h2>
                    <p>Category: ${item.category}</p>
                    <p>Price: ${item.price}</p>
                    
                    <div class="cart-item-actions" style="margin-bottom: 10px;">
                        <button class="qty-btn" onclick="increaseCartQty(${item.id})">+</button>
                        <span class="cart-item-qty" style="padding: 2px 10px; border: 1px solid #ccc;">${itemQty}</span>
                        <button class="qty-btn" onclick="decreaseCartQty(${item.id})">-</button>
                    </div>

                    <button class="remove_from_cart" onclick="removeFromCart(${item.id})">Remove From Cart</button>
                </div>
            </div>
        `;
    });
    
    allProducts.innerHTML = y.join("");

    // حساب الـ Total Price تلقائياً
    let totalPrice = productsChoosen.reduce((acc, item) => {
        let priceNum = parseFloat(item.price.replace('$', ''));
        let qty = item.qty ? item.qty : 1;
        return acc + (priceNum * qty);
    }, 0);

    document.querySelector("#total-price-val").innerHTML = `$${totalPrice.toFixed(2)}`;
}
// ///////////////////////////////

function removeFromCart(id) {
    let ProductsInCart = localStorage.getItem("ProductsInCart");
    if (ProductsInCart) {
        let items = JSON.parse(ProductsInCart);
        // تصفية المنتجات وإزالة المنتج المراد حذفه
        let filteredItems = items.filter((item) => item.id !== id);
        
        // تحديث الـ localStorage
        localStorage.setItem("ProductsInCart", JSON.stringify(filteredItems));
        
        // إعادة رسم المنتجات لتختفي من الصفحة فوراً
        drawCartProducts(filteredItems);
    }
}

// ///////////////////////////


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
// /////////////////////////////////////

function drawFavoriteProducts() {
    let favoriteContainer = document.querySelector(".favorite-products");
    if (!favoriteContainer) return;

    let favoriteItems = localStorage.getItem("productsFavorite") ? JSON.parse(localStorage.getItem("productsFavorite")) : [];

    if (favoriteItems.length === 0) {
        favoriteContainer.innerHTML = "<p>You have no favorite items.</p>";
        return;
    }


let y = favoriteItems.map((item) => {
    return `
        <div class="product_item" style="border: 1px solid #ddd; border-radius: 6px; width: 220px; background: #fff; margin: 10px; display: flex; flex-direction: column; overflow: hidden; text-align: center;">
            <img class="product_item_img" src="${item.imageUrl}" alt="" style="width: 100%; height: 160px; object-fit: cover;">
            <div class="product_item_desc" style="padding: 15px 10px 5px 10px; flex-grow: 1;">
                <h2 style="font-size: 16px; font-weight: bold; margin: 0 0 5px 0; color: #333;">${item.title}</h2>
                <p style="color: gray; font-size: 13px; margin: 0;">Category: ${item.category}</p>
            </div>
            <div class="product_item_action" style="padding: 10px 15px 15px 0; text-align: right;">
                <i class="fas fa-heart" style="color: red; cursor: pointer; font-size: 20px;" onclick="removeFromFavorite(${item.id})"></i>
            </div> 
        </div>
    `;
});
    favoriteContainer.innerHTML = y.join("");
}

drawFavoriteProducts();

function removeFromFavorite(id) {
    let favoriteItems = JSON.parse(localStorage.getItem("productsFavorite"));
    let filtered = favoriteItems.filter((item) => item.id !== id);
    localStorage.setItem("productsFavorite", JSON.stringify(filtered));
    drawFavoriteProducts();
}