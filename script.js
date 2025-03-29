 
document.addEventListener('DOMContentLoaded', function () {
    let cartCount = document.querySelector('.item-count');
    let products = document.querySelectorAll('.product');
    let modalUi = document.querySelector('.modal')
    let startNewBtn = document.querySelector('.btn')
    let closeBtn = document.querySelector('.close')
    let productList = document.querySelector('.product-li');
    // let removeItem = document.querySelector('#close-icon');
    let modalProductLi = document.querySelector('.product-li-modal');
    let totalPriceContainer = document.querySelector('.final-price');
    let deliveryText = document.querySelector('.delivery-text-container')
    let confirmBtn = document.querySelector('.confirm-container');
    let totalPrice = document.querySelector('.totalPrice');
    let fModalPrice = document.querySelector('.totalPrice-modal');
    let dashText = document.querySelector('.dash-text');
    let dashImage = document.querySelector('.dash-img');
   

    dashText.classList.add('active');
    dashImage.classList.add('active');
    
    function updateCartCount() {
        let totalCount = 0;
        products.forEach(product => {
            let count = parseInt(product.dataset.count) || 0;
            if (count > 0) totalCount += count;
        });
        cartCount.textContent = totalCount;
        toggleCartUI(totalCount);
    }
    // 
    //     confirmBtn.addEventListener('click',function(){
    //         modalUi.classList.add('active');
    //  
    //

    function toggleCartUI(totalCount) {
        if (totalCount > 0) {
            productList.classList.add('active');
            dashText.classList.remove('active');
            dashImage.classList.remove('active');
            totalPriceContainer.classList.add('active');
            deliveryText.classList.add('active');
            confirmBtn.classList.add('active');
        } else {
            productList.classList.remove('active');
            dashText.classList.add('active');
            dashImage.classList.add('active');
            totalPriceContainer.classList.remove('active');
            deliveryText.classList.remove('active');
            confirmBtn.classList.remove('active');
        }
    }

    function updateCartItems() {
        productList.innerHTML = '';
        modalProductLi.innerHTML = '';
        let total = 0;

        products.forEach(product => {
            let productName = product.querySelector('.product-name').textContent.trim();
            let productImg = product.querySelector('.product-img');
            let unitPrice = parseInt(product.querySelector('.unit-price').textContent.trim().replace(/[^0-9.]/g, '')) || 0;
            let productCount = parseInt(product.dataset.count) || 0;

            if (productCount > 0) {
                let finalPrice = (unitPrice * productCount).toFixed(2);
                total += parseFloat(finalPrice);

                let cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <div class="cart-item-details">
                        <ul>
                            <h3 class="item-name">${productName}</h3>
                            <li>
                                <span class="quantity">Qty: ${productCount}</span>
                                <span class="price">@ ${unitPrice.toFixed(2)}</span>
                                <span class="price-per-q">$${finalPrice}</span>
                             <span id="close-icon" class="material-symbols-outlined" data-name="${productName}">cancel </span>
                             
                            </li>
                        </ul>
                    </div>
                `;
                productList.appendChild(cartItem);

                let modalCartItem = document.createElement('div');
                modalCartItem.classList.add('cart-item');
                modalCartItem.innerHTML = `
                    <div class="product-modal">
                        <ul>
                            <li class="product-modal-li">
                                <img src="${productImg.src}" alt="product-image" class="product-Img" style="width: 50px; height: 50px; border-radius:10px;">
                                <div class="product-details">
                                    <strong class="itemName-m">${productName}</strong>
                                    <span>
                                        <span class="quantity-m">Qty: ${productCount}</span>
                                        <span class="price-m">@ ${unitPrice.toFixed(2)}</span>
                                    </span>
                                </div>
                                <span class="price-q-m">$${finalPrice}</span>
                            </li>
                        </ul>
                    </div>
                `;
                modalProductLi.appendChild(modalCartItem);
            }  
            // Event listener for modalUi popUp 
            confirmBtn.addEventListener('click',function(){
                modalUi.classList.add('active');
                // Event listener for startNew button 
            });
                startNewBtn.addEventListener('click', function () {
               setTimeout(()=>{
                modalUi.classList.remove('active');
                product.dataset.count = "0";
                productImg.style.border = "none";
                resetProductUI(product);
                updateCartCount();
                updateCartItems();
               },50)     
     
    });
    closeBtn.addEventListener('click', function () {
        modalUi.classList.remove('active');
    });

    window.addEventListener('click', function (e) {
        if (e.target === modalUi) {
            modalUi.classList.remove('active');
        }
    });

   
        });

        // Update the order total
        fModalPrice.textContent = `$${total.toFixed(2)}`;
        totalPrice.textContent = `$${total.toFixed(2)}`;  // Ensure the total price is updated on the main UI as well
    }

    // // Event to remove items from cart using Event Delegation.
    // document.addEventListener('click', function (e) {
    //     if (e.target.id ==='close-icon') {
    //         let productName = e.target.getAttribute('data-name');
    //         products.forEach(product => {
    //             if (product.querySelector('.product-name').textContent.trim() === productName) {
    //                 product.dataset.count = "0";
                    
    //                 resetProductUI(product);
    //             }
    //         });
    //          // Reset the product image border
    //          products.forEach(product => )
    //          let productImg = product.querySelector('.product-img');
    //          if (productImg) {
    //              productImg.style.border = "none";
    //          }
            
    //         updateCartCount();
    //         updateCartItems();
    //     }
    // });
    document.addEventListener('click', function (e) {
        if (e.target.id === 'close-icon') {
            let productName = e.target.getAttribute('data-name');
            products.forEach(product => {
                if (product.querySelector('.product-name').textContent.trim() === productName) {
                    product.dataset.count = "0";
    
                    // Reset the product image border
                    let productImg = product.querySelector('.product-img');
                    if (productImg) {
                        productImg.style.border = "none";
                    }
    
                    resetProductUI(product);
                }
            });
    
            updateCartCount();
            updateCartItems();
        }
    });

    // Add to cart functionality
    products.forEach(product => {
        let addToCartBtn = product.querySelector('.product-btn');
        let btnDiv = product.querySelector('.btn-div');
        let orderCountDiv = product.querySelector('.btn-order-count');
        let decrementBtn = product.querySelector('.count-btn:first-child');
        let incrementBtn = product.querySelector('.count-btn:last-child');
        let countDisplay = product.querySelector('.count-display');
        let productImg = product.querySelector('.product-img')

        product.dataset.count = "0";
        countDisplay.textContent = product.dataset.count;

        addToCartBtn.addEventListener('click', function () {
            if (parseInt(product.dataset.count) === 0) {
                product.dataset.count = "1";
                countDisplay.textContent = "1";
                btnDiv.classList.add('active');
                productImg.style.border = "2px solid var(--Red)";
                orderCountDiv.classList.add('active');
                addToCartBtn.style.backgroundColor = "#c73a0f";
                updateCartCount();
                updateCartItems();
            }
        });

        incrementBtn.addEventListener('click', function () {
            let count = parseInt(product.dataset.count);
            product.dataset.count = (count + 1).toString();
            countDisplay.textContent = product.dataset.count;
            updateCartCount();
            updateCartItems();
        });

        decrementBtn.addEventListener('click', function () {
            let count = parseInt(product.dataset.count);
            if (count > 1) {
                product.dataset.count = (count - 1).toString();
                countDisplay.textContent = product.dataset.count;
            } else if (count === 1) {
                setTimeout(() => {
                    product.dataset.count = "0";
                    productImg.style.border = "";
                    resetProductUI(product);
                    updateCartCount();
                    updateCartItems();
                }, 100); // Small delay to avoid UI flicker
            }
            updateCartCount();
            updateCartItems();
        });
    });

    function resetProductUI(product) {
        let countDisplay = product.querySelector('.count-display');
        let btnDiv = product.querySelector('.btn-div');
        let orderCountDiv = product.querySelector('.btn-order-count');
        let addToCartBtn = product.querySelector('.product-btn');

        countDisplay.textContent = "0";
        btnDiv.classList.remove("active");
        orderCountDiv.classList.remove("active");
        addToCartBtn.style.backgroundColor = "";
    }
});
