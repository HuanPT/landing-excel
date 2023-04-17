const TIMEOUT_SEC = 10;
const API_URL = "https://techmaster.vn/submit-advisory";

export function backToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export function backGoToTop() {
  const btnBackToTop = document.querySelector(".gototop");
  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 600) {
      btnBackToTop.style.transform = "translateY(0)";
    } else {
      btnBackToTop.style.transform = "translateY(75px)";
    }
  });
  btnBackToTop.addEventListener("click", () => {
    backToTop();
  });
}

export function headerOnTop() {
  const header = document.querySelector("header");
  let height = 0,
    currentHeight;

  window.addEventListener("scroll", () => {
    currentHeight = document.documentElement.scrollTop;
    if (height < currentHeight) {
      header.style.top = "-70px";
      height = currentHeight;
    } else {
      header.style.top = "0";

      currentHeight == 100
        ? (header.style.background = "transparent")
        : (header.style.background = "var(--secondary-color)");

      height = currentHeight;
    }
    if (currentHeight == 0) {
      header.style.top = "0";
      header.style.background = "transparent";
    }
  });
}

function toast({ title = "", message = "", type = "info", duration = 3000 }) {
  const main = document.querySelector("#toast");
  if (!main) return;

  const toast = document.createElement("div");
  toast.classList.add("toast", "show", `toast--${type}`);
  toast.style.animation = `slideDropDown ease 0.3s, fadeOut linear 1s ${(
    duration / 1000
  ).toFixed(2)}s forwards`;

  const icons = {
    success: "fa-solid fa-circle-check",
    info: "fa-solid fa-circle-info",
    warning: "fa-solid fa-circle-exclamation",
    error: "fa-solid fa-triangle-exclamation",
  };

  toast.innerHTML = `
    <div class="toast__icon">
      <i class="${icons[type]}"></i>
    </div>
    <div class="toast__body">
      <h3 class="toast__title">${title}</h3>
      <p class="toast__msg">${message}</p>
    </div>
    <div class="toast__close">
      <i class="fa-solid fa-xmark"></i>
    </div>
  `;

  const autoRemoveId = setTimeout(() => {
    main.removeChild(toast);
  }, duration + 1000);

  toast.addEventListener("click", (e) => {
    if (e.target.closest(".toast__close")) {
      main.removeChild(toast);
      clearTimeout(autoRemoveId);
    }
  });

  main.appendChild(toast);
}

export function showErrorToast(title, message) {
  toast({
    title: title ? `${title}` : "Lỗi!",
    message: message ? `${message}` : "",
    type: "error",
    duration: 2000, //bao lâu thì ẩn đi 3s
  });
}

export function showSuccessToast(title, message) {
  toast({
    title: title ? `${title}` : "Thành công!",
    message: message ? `${message}` : "",
    type: "success",
    duration: 2000, //bao lâu thì ẩn đi 3s
  });
}

export function showInfoToast(title, message) {
  toast({
    title: title ? `${title}` : "Thông tin!",
    message: message ? `${message}` : "",
    type: "info",
    duration: 2000, //bao lâu thì ẩn đi 3s
  });
}

export function showWarningToast(title, message) {
  toast({
    title: title ? `${title}` : "Cảnh báo!",
    message: message ? `${message}` : "",
    type: "warning",
    duration: 2000, //bao lâu thì ẩn đi 3s
  });
}

export function isEmailValid(value) {
  const regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  return regex.test(value);
}

export function isPhoneNumber(value) {
  const regex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{3,4}$/;
  return regex.test(value);
}

export function checkInputs(username, email, phone) {
  let isValid = true;

  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const phoneValue = phone.value.trim();
  // console.log(usernameValue, emailValue, phoneValue);
  if (usernameValue === "") {
    // console.log("name error");
    // console.log(usernameValue);
    setError(username, "Tên không được để trống.");
    isValid = false;
  } else {
    // console.log("name ok");
    // console.log(usernameValue);
    setSuccess(username);
  }

  // console.log(isValid);
  if (!isEmailValid(emailValue)) {
    setError(email, "Email không được để trống");
    isValid = false;
  } else {
    setSuccess(email);
  }

  // console.log(isValid);
  if (!isPhoneNumber(phoneValue)) {
    setError(phone, "Số điện thoại không được để trống");
    isValid = false;
  } else {
    setSuccess(phone);
  }

  // console.log(isValid);
  return isValid;
}

export function clearInputs() {
  // Làm sạch giá trị của các input trong form
  document.querySelector("#note").value = "";
  document.querySelector("#phone").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#username").value = "";
}

export function updateIcon() {
  const $navbarToggler = $(".navbar-toggler");
  const $iconUse = $navbarToggler.find("use");
  const isExpanded = $navbarToggler.attr("aria-expanded") === "true";

  $("body").css("overflow", isExpanded ? "hidden" : "auto");

  $iconUse.attr(
    "href",
    isExpanded ? "/img/icon.svg#icon-xmark" : "/img/icon.svg#icon-menu"
  );
}

export function setError(input, message) {
  input.style.border = "thin solid #ff0000";
  input.nextElementSibling.innerHTML = message;
}

export function setSuccess(input) {
  input.style.border = "thin solid #47d864";
  input.nextElementSibling.innerHTML = "";
}

// tạo lỗi về thời gian yêu từ api
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Yêu cầu mất nhiều thời gian! Đã đợi hết ${s} giây`));
    }, s * 1000);
  });
};

const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    // tạo lỗi api
    if (!res.ok) throw new Error(`${res.status}`);

    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const postRegister = async function (data) {
  try {
    const id = window.location.href.split("#")[0];
    const req = {
      FullName: data.fullName,
      Email: data.email,
      Phone: data.phone,
      Note: data.note,
      Link: id,
      ItemId: "PFqWCBgY",
    };

    const res = await AJAX(API_URL, req);
    clearInputs();
    showSuccessToast(
      "Thành công",
      "Chúng tôi sẽ liên lạc với bạn trong thời gian sớm nhất!"
    );
    console.log(res);
  } catch (error) {
    showErrorToast("Lỗi, hãy thử lại!", "");
    throw error;
  }
};
