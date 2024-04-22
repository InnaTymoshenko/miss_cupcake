const footer = document.querySelector(".container.footer"),
  footerBottom = document.querySelector(".footer_miss"),
  [...userInfo] = document.querySelector("form"),
  modalSuccess = document.querySelector(".modal-info"),
  modalError = document.querySelector(".modal-error"),
  iconCart = document.querySelector(".navbar-cart"),
  modalCart = document.querySelector(".modal-wrapper"),
  modalCartClose = document.querySelector(".modal_cart-close");

userInfo.forEach((item) => {
  let user = [],
    result = "";

  if (item.type === "email") {
    item.addEventListener("change", (e) => {
      if (
        (result = /^[A-z_0-9.]+@[A-z-]+\.[A-z]{1,4}\.?[A-z]*$/.test(
          e.target.value
        ))
      ) {
        user.push(e.target.value);
        item.classList.remove("error");
      } else {
        item.classList.add("error");
      }
    });
  } else {
    item.addEventListener("click", (e) => {
      if (
        (result = /^[A-z_0-9.]+@[A-z-]+\.[A-z]{1,4}\.?[A-z]*$/.test(
          userInfo[0].value
        ))
      ) {
        modalSuccess.style.display = "flex";
        localStorage.userInfo = JSON.stringify(userInfo[0].value);
        userInfo[0].value = "";
      } else {
        modalError.style.display = "flex";
        setTimeout(() => {
          modalError.style.display = "none";
          userInfo[0].value = "";
          userInfo[0].classList.remove("error");
        }, 3000);
      }
    });
  }
});

modalSuccess.children[1].addEventListener("click", (e) => {
  modalSuccess.style.display = "none";
});

function showModalCart() {
  const table = document.querySelector(".table tbody"),
    modalPrice = document.querySelector(".modal-price"),
    data = Object.values(JSON.parse(localStorage.customerOrder)),
    dataPriceTotal = data
      .map((item) => {
        return item.price * item.count;
      })
      .reduce((sum, current) => {
        return sum + current;
      })
      .toFixed(2);

  table.innerHTML = "";

  table.insertAdjacentHTML(
    "afterbegin",
    data
      .map((item) => {
        return `<tr>
    <td class="table-img">
      <img src=${item.image} alt=${item.name} />
    </td>
    <td class="table-name">${item.name} x ${item.count}</td>
    <td class="table-price">$${(item.price * item.count).toFixed(2)}</td>
  </tr> `;
      })
      .join("")
  );

  modalPrice.textContent = `$${dataPriceTotal}`;
}

iconCart.addEventListener("click", (e) => {
  if (document.location.pathname.search("cart") !== -1) {
    console.log("+");
    e.preventDefault();
  } else {
    dataCart = JSON.parse(localStorage.customerOrder);
    const dataCartValue = Object.values(dataCart).map((item) => {
      return item.count;
    });
    if (dataCartValue.length !== 0) {
      modalCart.style.display = "flex";
      showModalCart();
    } else {
      e.preventDefault();
    }
  }
});

modalCartClose.addEventListener("click", (e) => {
  modalCart.style.display = "none";
});

window.addEventListener("DOMContentLoaded", () => {
  footerBottom.textContent = `©MISS CUPCAKES ${new Date().getFullYear()}`;
  checkCart();
});
