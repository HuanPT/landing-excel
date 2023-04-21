import { Fancybox } from "@fancyapps/ui";
import $ from "jquery";

import "@fortawesome/fontawesome-free/js/all.min.js";

// import css
import "@css/style.css";
import "@css/responsive.css";

// import lazysizes
import "lazysizes";
// import "lazysizes/plugins/parent-fit/ls.parent-fit";

import "bootstrap/dist/js/bootstrap.bundle";
import "owl.carousel";

import {
  backGoToTop,
  checkInputs,
  headerOnTop,
  isEmailValid,
  isPhoneNumber,
  setError,
  setSuccess,
  showErrorToast,
  showSuccessToast,
  updateIcon,
  postRegister,
  clearInputs,
} from "./common";

const trackID = "";
const form = document.querySelector("form");
const note = document.querySelector("#note");
const phone = document.querySelector("#phone");
const email = document.querySelector("#email");
const username = document.querySelector("#username");

const checkErr = (input, message) => {
  const validationFunc = () => {
    let isValid = false;
    let value = input.value.trim();
    if (input.id === "email") {
      isValid = isEmailValid(value);
    } else if (input.id === "phone") {
      isValid = isPhoneNumber(value);
    } else if (input.id === "username") {
      isValid = value !== "";
    }
    if (isValid) {
      setSuccess(input);
    } else {
      setError(input, message);
    }
  };
  input.addEventListener("blur", validationFunc);
};

function addHandlerSubmit(form, handler) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const isFormValid = checkInputs(username, email, phone);
    if (isFormValid) {
      const dataArr = new FormData(form);
      const data = Object.fromEntries(dataArr);
      handler(data);
    } else {
      showErrorToast("Đăng ký không thành công", "");
    }
  });
}

$(function () {
  $("#banner-slide").owlCarousel({
    loop: true, // lặp lại các item
    margin: 10, // Khoảng cách giữa các item
    nav: true, // thanh điều hướng
    dots: true, // dấu chấm
    autoplay: true,
    autoplayHoverPause: true, //hover sẽ tạm dừng play
    autoplayTimeout: 7000,
    smartSpeed: 700,
    navText: [
      `<span aria-label= "Previous">
        <i class="fa-solid fa-angle-left"></i>
      </span>`,

      `<span aria-label= "Next">
        <i class="fa-solid fa-angle-right"></i>
      </span>`,
    ],
    items: 1,
  });

  $("#target__slide").owlCarousel({
    loop: true, // lặp lại các item
    margin: 10, // Khoảng cách giữa các item
    dots: true, // dấu chấm
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 500,
    items: 1,
  });

  // Cache DOM selections
  const $navbarLinks = $(".navbar-nav>li>a");
  const $navbarToggler = $(".navbar-toggler");

  // Click hidden navbar mobile
  $navbarLinks.on("click", function () {
    if (window.innerWidth < 992) {
      $navbarToggler.click();
      updateIcon();
    }
  });

  // // Toggle icon
  $navbarToggler.on("click", function () {
    updateIcon();
  });

  // Scroll active navbar
  $(window).on("scroll", function () {
    const scrollPosition = $(this).scrollTop();

    $navbarLinks.each(function () {
      const target = $($(this).attr("href"));
      const targetPosition = target.offset().top - 1;
      const targetHeight = target.outerHeight();

      if (
        targetPosition <= scrollPosition &&
        targetPosition + targetHeight > scrollPosition
      ) {
        $navbarLinks.removeClass("active");
        $(this).addClass("active");
      }
    });
  });

  addHandlerSubmit(form, postRegister);

  checkErr(email, "Email không đúng");
  checkErr(phone, "Số điện thoại không đúng");
  checkErr(username, "Tên không được để trống");

  // form.addEventListener("submit", formSubmit);
  Fancybox.bind();
  headerOnTop();
  backGoToTop();
});
