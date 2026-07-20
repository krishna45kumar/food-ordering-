// ================= LOGIN POPUP =================

const loginBtn = document.getElementById("loginBtn");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");


// Open Login Popup

if(loginBtn){

    loginBtn.addEventListener("click",()=>{

        modal.style.display="block";

    });

}


// Close Login Popup

if(closeBtn){

    closeBtn.addEventListener("click",()=>{

        modal.style.display="none";

    });

}


// Click outside modal close

window.addEventListener("click",(event)=>{

    if(event.target === modal){

        modal.style.display="none";

    }

});



// ================= CART FUNCTIONALITY =================


// Refresh detect
if(performance.getEntriesByType("navigation")[0].type === "reload"){
    sessionStorage.removeItem("cart");
}

// Load old cart
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cart-count");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

const cartSidebar = document.getElementById("cartSidebar");
const cartIcon = document.getElementById("cartIcon");
const closeCart = document.getElementById("closeCart");

cartIcon?.addEventListener("click", () => {
    cartSidebar.classList.add("active");
});

closeCart?.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
});

document.querySelectorAll(".cart-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        const card = btn.closest(".food-card");

        const name =
            card.querySelector("h3").innerText;

        const price =
            parseInt(
                card.querySelector(".price-cart span")
                .innerText.replace("₹","")
            );

        const image =
            card.querySelector("img").src;

        const existing =
            cart.find(item => item.name === name);

        if(existing){

            existing.quantity++;

        }else{

            cart.push({
                name,
                price,
                image,
                quantity:1
            });

        }

        updateCart();
        alert(`${name} Added To Cart 🛒`);

    });

});


function updateCart(){
 
    sessionStorage.setItem("cart", JSON.stringify(cart));

    cartItemsContainer.innerHTML = "";

    let total = 0;
    let totalItems = 0;

    cart.forEach((item,index)=>{

        total += item.price * item.quantity;
        totalItems += item.quantity;

        cartItemsContainer.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}">

            <div class="cart-info">

                <h4>${item.name}</h4>

                <p class="cart-price">
                    ₹${item.price}
                </p>

                <div class="qty-box">

                    <button
                    class="qty-btn"
                    onclick="changeQty(${index},-1)">
                    -
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                    class="qty-btn"
                    onclick="changeQty(${index},1)">
                    +
                    </button>

                </div>

                <button
                class="remove-btn"
                onclick="removeItem(${index})">
                Remove
                </button>

            </div>

        </div>

        `;
    });

    cartCount.innerText = totalItems;
    cartTotal.innerText = `₹${total}`;
}

function changeQty(index,value){

    cart[index].quantity += value;

    if(cart[index].quantity <= 0){

        cart.splice(index,1);

    }

    updateCart();
}

function removeItem(index){

    cart.splice(index,1);

    updateCart();
}



// ================= SEARCH FUNCTIONALITY =================


const searchInput = document.querySelector(".search-box input");


if(searchInput){


    searchInput.addEventListener("keyup",()=>{


        let searchValue = searchInput.value.toLowerCase();


        let foodCards = document.querySelectorAll(".food-card");


        foodCards.forEach(card=>{


            let foodName = card
            .querySelector("h3")
            .innerText
            .toLowerCase();



            if(foodName.includes(searchValue)){


                card.style.display="block";


            }

            else{


                card.style.display="none";


            }

              
           
        });


    });


}



// ================= FORM SUBMIT =================


const forms = document.querySelectorAll("form");


forms.forEach(form=>{


    form.addEventListener("submit",(e)=>{


        e.preventDefault();


        alert("Form Submitted Successfully ✅");


        form.reset();


    });


});
updateCart();