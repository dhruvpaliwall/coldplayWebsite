if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaed',ready)
}else{
    ready()
}    

function ready(){
 var removeCartItemButton = document.getElementsByClassName('btn-danger')
for(var i = 0; i<removeCartItemButton.length;i++)
{
    var button = removeCartItemButton[i]
    button.addEventListener('click', removeCartItem)


}

var quantityInputs = document.getElementsByClassName('cart-quantity-input')
for(var i=0 ;i<quantityInputs.length;i++)
{
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChange)
}
  
var addToCartButtons = document.getElementsByClassName('shop-item-btn')
for(var i = 0;i<addToCartButtons.length;i++)
{
    var button = addToCartButtons[i]
    button.addEventListener('click',addToCartClicked)
}

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked)
}
    function purchaseClicked(){
        alert('Thank You For Your Purchase!!')
        
    
    }


    function quantityChange(event){
        var inputs =event.target
        if(isNaN(inputs.value) || inputs.value<=0){
        inputs.value = 1  
        }
        updateCartTotal()
    }

    function removeCartItem(event){
        event.target.parentElement.parentElement.remove();
        updateCartTotal();
    }

    function addToCartClicked(event){
        var buttons = event.target
        var shopItem = buttons.parentElement.parentElement
        var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
        var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
        var imagesrc = shopItem.getElementsByClassName('shop-item-image')[0].src
        addItemToCart(title,price,imagesrc)
        updateCartTotal()

    }


    function addItemToCart(title,price,imagesrc){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemsNames = cartItems.getElementsByClassName('cart-item-title')
    for(var i = 0 ;i<cartItemsNames.length;i++){
        if(cartItemsNames[i].innerText === title){
            alert('This Item is already added to the cart')
            return
        }
    }
    var cartRowcontents = `
        <div class="cart-item cart-column">
                <img class="cart-item-image" src="${imagesrc} "width = 100 height=100>
                <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input class ="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger cart-quantity-button" role="button">REMOVE</button>
            </div>
        </div>`
    cartRow.innerHTML = cartRowcontents
    cartItems.append(cartRow) 
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)  
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChange)

    }




    function updateCartTotal(){
        var cartItemContainer = document.getElementsByClassName('cart-items')[0]
        var cartRows= cartItemContainer.getElementsByClassName('cart-row')
        var total = 0;
    for(var i = 0; i < cartRows.length ;i++)
    {
        var cartRow =cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$',''))
        var quantity = quantityElement.value
        total = total+(price*quantity)

    }
   total = Math.round(total*100)/100
   document.getElementsByClassName('cart-total-price')[0].innerText='$'+total

}
