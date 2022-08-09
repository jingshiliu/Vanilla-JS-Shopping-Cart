const shop = document.querySelector('#shop')

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
if(shoppingCart == null){
    shoppingCart = shopItemsData.map( curItem=>{
        return {
            id: curItem.id,
            quantity: 0
        }
    })
}

const shoppingCartHashMap = {}
for(let i = 0; i < shopItemsData.length; i++){
    shoppingCartHashMap[shopItemsData[i].id] = i
}





// Code below is for 

let totalQuantity = 0
for(let x of shoppingCart){
    totalQuantity += x.quantity
}
const increment = (quantityElement)=>{
    update(quantityElement, 1)
}

const decrement = (quantityElement) =>{
    update(quantityElement, -1)
}


const cartAmountElement = document.querySelector('#cartAmount')
cartAmountElement.innerText = `${totalQuantity}`
const update = (quantityElement, change) =>{
    let newQuantity = parseInt(quantityElement.innerText) + change
    if(newQuantity >= 0){
        totalQuantity += change
    }else{
        newQuantity = 0
        change = 0
    }
    quantityElement.innerText = `${newQuantity}`
    cartAmountElement.innerText = `${totalQuantity}`
    let indexInShoppingCartArray = shoppingCartHashMap[quantityElement.id]
    shoppingCart[indexInShoppingCartArray].quantity += change

    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
}

let generateShop = () => {
     for(let x of shopItemsData){
    // Bottom does the following
    // I did this to prevent inline event and also practice for DOM

    //     shop.insertAdjacentHTML( 'beforeend', `<div class="item">
    //     <img src="${x.img}" alt="">
    //     <div class="details">
    //         <h3>
    //             ${x.name}
    //         </h3>
    //         <p>${x.description}</p>
    //         <div class="price-quantity">
    //             <h2>$ ${x.price}</h2>
    //             <div class="button">
    //                 <i class="bi bi-dash"></i>
    //                 <span class="quantity">0</span>
    //                 <i class="bi bi-plus"></i>
    //             </div>
    //         </div>
    //     </div>
    // </div>`)

    let item = document.createElement('div')
    item.classList.add('item')
    shop.insertAdjacentElement('beforeend', item)
    let img = document.createElement('img')
    img.src = x.img
    item.insertAdjacentElement('beforeend', img)

    let details = document.createElement('div')
    details.classList.add('details')
    details.classList.add('unselectable')
    item.insertAdjacentElement('beforeend', details)

    let itemName = document.createElement('h3')
    itemName.innerText = x.name
    details.insertAdjacentElement('beforeend', itemName)

    let itemDescription = document.createElement('p')
    itemDescription.innerText = x.desc
    details.insertAdjacentElement('beforeend', itemDescription)

    let priceQuantity = document.createElement('div')
    priceQuantity.classList.add('price-quantity')
    details.insertAdjacentElement('beforeend', priceQuantity)

    let itemPrice = document.createElement('h2')
    itemPrice.innerText = `$ ${x.price}`
    priceQuantity.insertAdjacentElement('beforeend', itemPrice)

    let button = document.createElement('div')
    button.classList.add('button')
    priceQuantity.insertAdjacentElement('beforeend', button)

    let decrementButton = document.createElement('i')
    decrementButton.classList.add('bi')
    decrementButton.classList.add('bi-dash')
    button.insertAdjacentElement('beforeend', decrementButton)

    let quantity = document.createElement('div')
    quantity.innerText = `${shoppingCart[shoppingCartHashMap[x.id]].quantity}`
    quantity.classList.add('quantity')
    quantity.classList.add('unselectable')
    quantity.id = `${x.id}`
    button.insertAdjacentElement('beforeend', quantity)

    let incrementButton = document.createElement('i')
    incrementButton.classList.add('bi')
    incrementButton.classList.add('bi-plus')
    button.insertAdjacentElement('beforeend', incrementButton)


    decrementButton.addEventListener('click', e =>{
        decrement(quantity)
    })
    incrementButton.addEventListener('click', e =>{
        increment(quantity)
    })
     }
}

generateShop()



