const cartBox = document.querySelector(".cart-box"),
  cartPriceTotal = document.querySelector(".cart-price_total");

dataCart = JSON.parse(localStorage.customerOrder);
if (sessionStorage.productBase) {
  dataProduct = JSON.parse(sessionStorage.productBase);
}

function createCart({ name, count, image, price, id }) {
  const cart = createElement("div", "cart-item"),
    cartImage = createElement("div", "cart-img"),
    img = createElement("img", undefined, undefined, image),
    p = createElement("p", "cart-name", name),
    cartCountTotal = createElement("div", "cart-count_total mx-5"),
    spanMinus = createElement("span", "span-count", "-"),
    spanCount = createElement("span", undefined, count),
    spanPlus = createElement("span", "span-count", "+"),
    cartPrice = createElement(
      "div",
      "cart-price",
      `${(price * count).toFixed(2)}`
    );

  img.alt = name;

  cartImage.append(img);
  cartCountTotal.append(spanMinus, spanCount, spanPlus);
  cart.append(cartImage, p, cartCountTotal, cartPrice);

  spanMinus.addEventListener("click", (e) => {
    dataProduct.forEach((el) => {
      if (el.id === id) {
        el.count--;
        sessionStorage.productBase = JSON.stringify(dataProduct);
        if (el.count === 0) {
          return;
        }
      }
    });

    Object.keys(dataCart).forEach((el) => {
      if (el === id) {
        dataCart[el].count--;
        spanCount.textContent = dataCart[el].count;
        cartPrice.textContent = `${(
          dataCart[el].price * dataCart[el].count
        ).toFixed(2)}`;
        localStorage.customerOrder = JSON.stringify(dataCart);

        checkCart();
        getPriceTotal();

        if (dataCart[el].count < 1) {
          cart.parentElement.remove();
          delete dataCart[el];
          localStorage.customerOrder = JSON.stringify(dataCart);
          checkCart();
          getPriceTotal();
        }
      }
    });
  });

  spanPlus.addEventListener("click", (e) => {
    dataProduct.forEach((el) => {
      if (el.id === id) {
        el.count++;
        sessionStorage.productBase = JSON.stringify(dataProduct);
      }
    });
    Object.keys(dataCart).forEach((el) => {
      if (el === id) {
        count++;
        dataCart[el].count++;
        spanCount.textContent = dataCart[el].count;
        cartPrice.textContent = `${(
          dataCart[el].price * dataCart[el].count
        ).toFixed(2)}`;
        localStorage.customerOrder = JSON.stringify(dataCart);
        checkCart();
        getPriceTotal();
      }
    });
  });
  return cart;
}

window.addEventListener("DOMContentLoaded", () => {
  showProductCard(Object.values(dataCart), cartBox, createCart);
  getPriceTotal();
});
