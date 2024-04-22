const cartCount = document.querySelector(".cart-count");

if (!localStorage.customerOrder) {
  localStorage.customerOrder = JSON.stringify({});
}

function createElement(elementName, className, context, src) {
  const element = document.createElement(elementName);
  if (className !== "" || className !== null) {
    element.className = className;
  }
  if (context !== "" || context !== null) {
    element.textContent = context;
  }
  if (src !== "" || src !== null) {
    element.src = src;
  }

  return element;
}

function checkCart() {
  dataCart = JSON.parse(localStorage.customerOrder);
  const dataCartValue = Object.values(dataCart).map((item) => {
    return item.count;
  });
  if (!dataCartValue.length || dataCartValue.length === 0) {
    document.querySelector(".cart-count").style.display = "none";
  } else {
    document.querySelector(".cart-count").style.display = "block";

    let dataCartCount = dataCartValue.reduce((sum, current) => {
      return sum + current;
    });
    return (cartCount.textContent = dataCartCount);
  }
}

function showProductCard(array, element, fun) {
  array.forEach((item) => {
    const col = createElement("div", "col");
    col.append(fun(item));
    element.append(col);
  });
}

function getPriceTotal() {
  let dataCartPriceTotal = "";
  dataCart = JSON.parse(localStorage.customerOrder);
  const dataCartValue = Object.values(dataCart).map((item) => {
    dataCartPriceTotal = item.price * item.count;
    return dataCartPriceTotal;
  });
  if (dataCartValue.length !== 0) {
    dataCart = JSON.parse(localStorage.customerOrder);
    document.querySelector(".cart-empty").style.display = "none";

    let dataCartCount = dataCartValue.reduce((sum, current) => {
      return sum + current;
    });

    return (cartPriceTotal.textContent = `$${parseFloat(dataCartCount).toFixed(
      2
    )}`);
  } else {
    document.querySelector(".cart-total").style.display = "none";
    document.querySelector(".cart-empty").style.display = "flex";
  }
}
