// home_page.js

// Make sure the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // =========================
  // 1. NAVIGATION BUTTONS
  // =========================

  var shopBtn = document.getElementById("button1");
  var aboutBtn = document.getElementById("button2");
  var groupsBtn = document.getElementById("button3");
  var contactBtn = document.getElementById("button4");

  function scrollToElement(element) {
    if (element && element.scrollIntoView) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  // SHOP.. → scroll to sale section
  shopBtn.addEventListener("click", function () {
    var saleSection = document.querySelector(".sale-section");
    scrollToElement(saleSection);
  });

  // ABOUT.. → scroll to about text
  aboutBtn.addEventListener("click", function () {
    var aboutHeading = document.getElementById("about");
    scrollToElement(aboutHeading);
  });

  // GROUPS.. → scroll to "NEW ARRIVALS" section (container)
  groupsBtn.addEventListener("click", function () {
    var newArrivals = document.querySelector(".container");
    scrollToElement(newArrivals);
  });

  // CONTACT.. → scroll to contact section
  contactBtn.addEventListener("click", function () {
    var contactHeading = document.getElementById("contact");
    scrollToElement(contactHeading);
  });

  // =========================
  // 2. PRODUCTS + FILTERS
  // =========================

  var bagSelect = document.getElementById("bag-type");
  var searchInput = document.getElementById("searchbar");
  var products = document.querySelectorAll(".product");

  // Give each product a bag "type" (you can change these)
  var productTypes = {
    product1: "backpack",
    product2: "backpack",
    product3: "backpack"
  };

  products.forEach(function (product) {
    var id = product.id;
    if (productTypes[id]) {
      product.setAttribute("data-type", productTypes[id]);
    } else {
      product.setAttribute("data-type", "backpack");
    }
  });

  // Function to apply both search + dropdown filters
  function applyFilters() {
    var selectedType = bagSelect.value.toLowerCase();
    var searchText = searchInput.value.toLowerCase().trim();

    products.forEach(function (product) {
      var titleElement = product.querySelector("h3");
      var titleText = "";

      if (titleElement) {
        titleText = titleElement.textContent.toLowerCase();
      }

      var productType = product.getAttribute("data-type");

      var matchesType =
        selectedType === "all" || productType === selectedType;

      var matchesSearch =
        searchText === "" || titleText.indexOf(searchText) !== -1;

      if (matchesType && matchesSearch) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  }

  // When dropdown changes → filter
  bagSelect.addEventListener("change", applyFilters);

  // When user types in search bar → filter
  searchInput.addEventListener("input", applyFilters);

  // =========================
  // 3. SIMPLE CART COUNTER
  // =========================

  var cartButton = document.getElementById("button_8");
  var cartCount = 0;
  var messagePara = document.getElementById("last");
  var messageTimeoutId = null;

  function showHeaderMessage(text) {
    if (!messagePara) return;

    messagePara.textContent = text;

    if (messageTimeoutId) {
      clearTimeout(messageTimeoutId);
    }

    messageTimeoutId = setTimeout(function () {
      messagePara.textContent = "";
    }, 2000);
  }

  products.forEach(function (product) {
    product.addEventListener("click", function () {
      var titleElement = product.querySelector("h3");
      var name = "Product";

      if (titleElement) {
        name = titleElement.textContent;
      }

      cartCount = cartCount + 1;
      cartButton.textContent = "🛒Cart (" + cartCount + ")";

      showHeaderMessage(name + " added to cart.");
    });
  });

  // =========================
  // 4. CONTACT FORM HANDLING
  // =========================

  var contactForm = document.querySelector(".contact-form");

  function createOrGetMessageElement(id) {
    var existing = document.getElementById(id);
    if (existing) {
      return existing;
    }
    var p = document.createElement("p");
    p.id = id;
    p.style.marginTop = "10px";
    return p;
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var firstName = contactForm.querySelector('input[name="first"]');
      var lastName = contactForm.querySelector('input[name="last"]');
      var email = contactForm.querySelector('input[name="email"]');

      var contactMessage = createOrGetMessageElement("contact-message");

      if (!firstName.value.trim() || !lastName.value.trim() || !email.value.trim()) {
        contactMessage.textContent = "Please fill in all required fields (*) before submitting.";
        contactMessage.style.color = "red";
      } else {
        contactMessage.textContent = "Thank you, " + firstName.value + "! We have received your message.";
        contactMessage.style.color = "green";

        firstName.value = "";
        lastName.value = "";
        email.value = "";
        var subjectInput = contactForm.querySelector('input[name="subject"]');
        var messageTextarea = contactForm.querySelector('textarea[name="message"]');
        if (subjectInput) subjectInput.value = "";
        if (messageTextarea) messageTextarea.value = "";
      }

      contactForm.appendChild(contactMessage);
    });
  }

  // =========================
  // 5. SUBSCRIBE FORM HANDLING
  // =========================

  var subscribeForm = document.querySelector(".subscribe-form");

  if (subscribeForm) {
    subscribeForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var emailInput = subscribeForm.querySelector('input[name="subscribe-email"]');
      var checkbox = subscribeForm.querySelector('input[name="subscribe-ok"]');

      var subscribeMessage = createOrGetMessageElement("subscribe-message");

      if (!emailInput.value.trim()) {
        subscribeMessage.textContent = "Please enter your email to subscribe.";
        subscribeMessage.style.color = "red";
      } else if (!checkbox.checked) {
        subscribeMessage.textContent = "Please check the box to confirm subscription.";
        subscribeMessage.style.color = "red";
      } else {
        subscribeMessage.textContent = "You are now subscribed. Welcome to our mailing list!";
        subscribeMessage.style.color = "green";

        emailInput.value = "";
        checkbox.checked = false;
      }

      subscribeForm.appendChild(subscribeMessage);
    });
  }

  // =========================
  // 6. SMALL HOVER EFFECT HELP
  // (just adds pointer style on products)
  // =========================
  products.forEach(function (product) {
    product.style.cursor = "pointer";
  });
});
