const productBox = document.querySelector(".row");

if (sessionStorage.productBase) {
  dataProduct = JSON.parse(sessionStorage.productBase);
}

function createProductCard(obj) {
  if (!sessionStorage.productBase) {
    obj.count = 0;
  } else {
    obj.count = obj.count;
  }

  let key = obj.id;

  const card = createElement("div", "card product"),
    cardImage = createElement("img", "card-img-top", undefined, obj.image),
    cardBody = createElement("div", "card-body item"),
    cardName = createElement("div", "card-title item", obj.name),
    cardDescribe = createElement("p", "card-text item", obj.description),
    cardBottom = createElement("div", "card-bottom"),
    cardCount = createElement("div", "card-count"),
    spanMinus = createElement("span", "span-count", "-"),
    spanCount = createElement("span", undefined, obj.count),
    spanPlus = createElement("span", "span-count", "+"),
    addToCart = createElement("button", "btn item", "Add to cart");

  addToCart.type = "button";
  cardImage.alt = obj.name;

  cardCount.append(spanMinus, spanCount, spanPlus);
  cardBottom.append(cardCount, addToCart);
  cardBody.append(cardName, cardDescribe, cardBottom);
  card.append(cardImage, cardBody, cardBottom);

  spanMinus.addEventListener("click", () => {
    dataProduct.forEach((el) => {
      if (el.id === obj.id) {
        if (el.count === 0) {
          return;
        } else {
          el.count--;
          sessionStorage.productBase = JSON.stringify(dataProduct);
        }
      }
    });

    if (dataCart[key] === undefined || dataCart[key] === null) {
      return;
    } else if (dataCart[key].count < 1) {
      dataCart[key].count = 0;
      localStorage.customerOrder = JSON.stringify(dataCart);
      checkCart();
      return;
    } else {
      dataCart[key].count--;
      localStorage.customerOrder = JSON.stringify(dataCart);
      if (dataCart[key].count === 0) {
        delete dataCart[key];
        localStorage.customerOrder = JSON.stringify(dataCart);
        checkCart();
        spanCount.textContent = "0";
        return;
      }
    }
    spanCount.textContent = dataCart[key].count;
  });

  spanPlus.addEventListener("click", () => {
    obj.count++;
    dataCart[key] = obj;
    spanCount.textContent = dataCart[key].count;
  });

  addToCart.addEventListener("click", (e) => {
    if (!dataCart[key]) {
      dataCart[key] = obj;
      dataCart[key].count = 1;
    }

    spanCount.textContent = dataCart[key].count;
    localStorage.customerOrder = JSON.stringify(dataCart);
    sessionStorage.productBase = JSON.stringify(dataProduct);

    checkCart();
  });
  return card;
}

window.addEventListener("DOMContentLoaded", () => {
  checkCart();
  showProductCard(dataProduct, productBox, createProductCard);
});
