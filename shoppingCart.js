const cartBody = document.querySelector(".cartBody")

let shopItemsData = [
    {
      id: "jfhgbvnscs",
      name: "Casual Shirt",
      price: 45,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
      img: "images/img-1.jpg",
    },
    {
      id: "ioytrhndcv",
      name: "Office Shirt",
      price: 100,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
      img: "images/img-2.jpg",
    },
    {
      id: "wuefbncxbsn",
      name: "T Shirt",
      price: 25,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
      img: "images/img-3.jpg",
    },
    {
      id: "thyfhcbcv",
      name: "Mens Suit",
      price: 300,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
      img: "images/img-4.jpg",
    },
    {
      id: "thiecbawdjksadjk",
      name: "Mens Tie",
      price: 25,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
      img: "images/img-5.png",
    },
    {
      id: "iuertrywebncdjksadjk",
      name: "Casual shoes",
      price: 200,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
      img: "images/img-6.png",
    },
    {
      id: "thierytbvcbvzdhadjk",
      name: "black suit",
      price: 450,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
      img: "images/img-7.png",
    },
    {
      id: "trfoiwfcnbcawdjksadjk",
      name: "polo shirt",
      price: 45,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
      img: "images/img-8.png",
    },
    {
      id: "cbvxbcvsceldk",
      name: "denim shirt",
      price: 85,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
      img: "images/img-9.png",
    },
    {
      id: "oiopijmjkhuihb",
      name: "denim pants",
      price: 120,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
      img: "images/img-10.png",
    },
    {
      id: "oiopijewyiohbjhib",
      name: "basic cap",
      price: 35,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
      img: "images/img-11.png",
    },
    {
      id: "rtytytuyuytyytbvncv",
      name: "leather boots",
      price: 350,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
      img: "images/img-12.png",
    },
  ];

let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
if (shoppingCart == null) {
    shoppingCart = shopItemsData.map(curItem => {
        return {
            id: curItem.id,
            quantity: 0,
        }
    })
}

const shoppingCartIndex = {}
for (let i = 0; i < shopItemsData.length; i++) {
    shoppingCartIndex[shopItemsData[i].id] = i
}

let totalQuantity = 0
for (let x of shoppingCart) {
    totalQuantity += x.quantity
}

const checkEmptyCart = () =>{
    if (totalQuantity === 0) {
        document.querySelector("#emptyCartNotification").classList.toggle('displayNone')
        // If below condition is true, meaning checkOutButtons is displaying and it should not displayed
        // Making sure checkout buttons doesn't display when cart is empty
        if(! document.querySelector('#checkOutButtons').classList.toggle('displayNone')){
          document.querySelector('#checkOutButtons').classList.toggle('displayNone')
        }
        return true;
    }else{
      document.querySelector('#checkOutButtons').classList.toggle('displayNone')
    }
    return false;
}

const increment = (quantityElement) => {
    update(quantityElement, 1)
}

const decrement = (quantityElement) => {
    update(quantityElement, -1)
}


const cartAmountElement = document.querySelector('#cartAmount')
cartAmountElement.innerText = `${totalQuantity}`

const update = (quantityElement, change) => {
    let newQuantity = parseInt(quantityElement.innerText) + change
    if (newQuantity >= 0) {
        totalQuantity += change
    } else {
        newQuantity = 0
        change = 0
    }
    quantityElement.innerText = `${newQuantity}`
    cartAmountElement.innerText = `${totalQuantity}`
    let indexInShoppingCartArray = shoppingCartIndex[quantityElement.id]
    shoppingCart[indexInShoppingCartArray].quantity += change

    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
}

const removeCartItem = (cartItem, id)=>{
    cartItem.remove()
    let currentQuantity = shoppingCart[shoppingCartIndex[id]].quantity
    let quantityElement = cartItem.querySelector(".quantity")
    update(quantityElement, -currentQuantity)
}

const clearCart = () =>{
  for(let item of shoppingCart){
    item.quantity = 0
    totalQuantity = 0
  }
  cartAmountElement.innerText = '0'
  localStorage.removeItem('shoppingCart')
}

const computeTotalPrice = ()=>{
  let totalPrice = 0
  for(let i = 0; i < shoppingCart.length; i++){
    console.log(i)
    if(shoppingCart[i].quantity > 0){
      totalPrice += shopItemsData[i].price * shoppingCart[i].quantity
    }
  }
  return totalPrice
}

const generateCart = () => {
    checkEmptyCart()
    let clearButton = document.querySelector('.checkOutButtons .clearButton')
    clearButton.addEventListener('click', () =>{
      clearCart()
      checkEmptyCart()
      cartBody.innerHTML = ''
    })
    let purchaseButton = document.querySelector('.checkOutButtons .purchaseButton')
    purchaseButton.addEventListener('click', ()=>{
      cartBody.innerText = `Total price is $${computeTotalPrice()}
      
      
      Thank you for shopping with us`;
      clearCart();
    })
    for (let item of shopItemsData) {
        if (shoppingCart[shoppingCartIndex[item.id]].quantity === 0)
            continue;

        // <div class="cartItem">
        //     <img src="images/img-1.jpg" alt="">

        //     <div class="cartDetails">
        //         <div class="cartItemHeader">
        //             <h3>Tee Shirt</h3>

        //             <h3 class="unitPrice">25$</h3>
        //         </div>

        //         <div class="button">
        //             <i class="bi bi-dash"></i>
        //                 <span class="quantity">0</span>
        //             <i class="bi bi-plus"></i>
        //         </div>

        //         <h3 class="totalPrice">25$</h3>
        //     </div>
        // </div>

        let cartItem = document.createElement('div')
        cartBody.insertAdjacentElement('beforeend', cartItem)
        cartItem.classList.add('cartItem')
        cartItem.innerHTML = `
        <img src="" alt="">

        <div class="cartDetails">
            <div class="cartItemHeader">
                <h3></h3>

                <div>
                    <h3 class="unitPrice"></h3>
                    <i class="bi bi-x-circle-fill x-icon"></i>
                </div>
            </div>

            <div class="button unselectable">
                <i class="bi bi-dash"></i>
                    <div class="quantity" id="${item.id}"></div>
                <i class="bi bi-plus"></i>
            </div>

            <h3 class="totalPrice"></h3>
        </div>`

        // img
        cartItem.querySelector('img').src = item.img
        // name
        cartItem.querySelector(".cartItemHeader h3").innerText = item.name
        // unit price
        cartItem.querySelector(".cartItemHeader .unitPrice").innerText = `${item.price}$`
        let xIcon = cartItem.querySelector(".cartItemHeader .x-icon")
        xIcon.addEventListener("click", e=>{
            removeCartItem(cartItem, item.id)
            checkEmptyCart()
        })
        // quantity
        let quantityElement = cartItem.querySelector('.quantity')
        let indexInShoppingCart = shoppingCartIndex[item.id]
        quantityElement.innerText = shoppingCart[indexInShoppingCart].quantity
        // total price
        let totalPriceElement = cartItem.querySelector(".totalPrice")
        totalPriceElement.innerText = `$ ${parseInt(quantityElement.innerText) * item.price}`

        // decrement button
        let decrementButton = cartItem.querySelector(".button i")
        decrementButton.addEventListener('click', e => {
            decrement(quantityElement)
            totalPriceElement.innerText = `$ ${parseInt(quantityElement.innerText) * item.price}`
        })
        // increment button
        let incrementButton = cartItem.querySelector('.button i:last-of-type')
        incrementButton.addEventListener('click', e => {
            increment(quantityElement)
            totalPriceElement.innerText = `$ ${parseInt(quantityElement.innerText) * item.price}`
        })
    }
}
generateCart()
