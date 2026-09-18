(function () {
  "use strict";

  const grid = document.getElementById("courseGrid");
  const template = document.getElementById("courseCardTemplate");
  const resultsCount = document.getElementById("resultsCount");
  const noResults = document.getElementById("noResults");

  const techSelect = document.getElementById("techSelect");
  const levelSelect = document.getElementById("levelSelect");
  const searchInput = document.getElementById("searchInput");
  const clearAllBtn = document.getElementById("clearAll");

  const priceMin = document.getElementById("priceMin");
  const priceMax = document.getElementById("priceMax");
  const priceLabel = document.getElementById("priceLabel");
  const rangeFill = document.getElementById("rangeFill");

  const langButtons = Array.from(document.querySelectorAll(".flag-btn"));

  const LANG_NAMES = { en: "EN", fr: "FR", mg: "MG" };

  // current filter state
  const state = {
    languages: new Set(), // empty = all languages
    technology: "all",
    level: "all",
    priceMin: Number(priceMin.value),
    priceMax: Number(priceMax.value),
    keyword: ""
  };

  function formatAr(n) {
    return n.toLocaleString("fr-FR").replace(/,/g, " ") + " Ar";
  }

  function populateTechnologies() {
    const techs = Array.from(new Set(COURSES.map((c) => c.technology))).sort();
    techs.forEach((tech) => {
      const opt = document.createElement("option");
      opt.value = tech;
      opt.textContent = tech.charAt(0).toUpperCase() + tech.slice(1);
      techSelect.appendChild(opt);
    });
  }

  function matchesFilters(course) {
    if (state.languages.size > 0 && !state.languages.has(course.language)) {
      return false;
    }
    if (state.technology !== "all" && course.technology !== state.technology) {
      return false;
    }
    if (state.level !== "all" && course.level !== state.level) {
      return false;
    }
    if (course.price < state.priceMin || course.price > state.priceMax) {
      return false;
    }
    if (state.keyword) {
      const haystack = (course.title + " " + course.description).toLowerCase();
      if (!haystack.includes(state.keyword)) return false;
    }
    return true;
  }

  function renderCourses() {
    const filtered = COURSES.filter(matchesFilters);

    grid.innerHTML = "";
    filtered.forEach((course) => {
      const node = template.content.cloneNode(true);
      const card = node.querySelector(".course-card");

      card.querySelector(".course-thumb").style.setProperty(
        "--thumb",
        `url("${course.image}")`
      );
      card.querySelector(".badge-lang").textContent = LANG_NAMES[course.language] || course.language;
      card.querySelector(".badge-tech").textContent = course.technology;
      card.querySelector(".badge-level").textContent = course.level;
      card.querySelector(".course-title").textContent = course.title;
      card.querySelector(".course-price").textContent = "MGA " + course.price.toLocaleString("en-US");
      card.querySelector(".course-desc").textContent = course.description;

      grid.appendChild(node);
    });

    resultsCount.textContent = filtered.length;
    noResults.hidden = filtered.length !== 0;
  }

  function updatePriceUI() {
    let min = Number(priceMin.value);
    let max = Number(priceMax.value);

    // keep handles from crossing
    if (min > max) {
      [min, max] = [max, min];
    }

    state.priceMin = min;
    state.priceMax = max;

    priceLabel.textContent = `${formatAr(min)} - ${formatAr(max)}`;

    const range = Number(priceMin.max) - Number(priceMin.min);
    const left = ((min - Number(priceMin.min)) / range) * 100;
    const right = ((max - Number(priceMin.min)) / range) * 100;
    rangeFill.style.left = left + "%";
    rangeFill.style.right = 100 - right + "%";
  }

  function handleLangClick(btn) {
    const lang = btn.dataset.lang;
    const pressed = btn.getAttribute("aria-pressed") === "true";
    btn.setAttribute("aria-pressed", String(!pressed));

    if (!pressed) {
      state.languages.add(lang);
    } else {
      state.languages.delete(lang);
    }
    renderCourses();
  }

  function clearAll() {
    state.languages.clear();
    state.technology = "all";
    state.level = "all";
    state.keyword = "";
    state.priceMin = Number(priceMin.min);
    state.priceMax = Number(priceMin.max);

    langButtons.forEach((b) => b.setAttribute("aria-pressed", "false"));
    techSelect.value = "all";
    levelSelect.value = "all";
    searchInput.value = "";
    priceMin.value = priceMin.min;
    priceMax.value = priceMax.max;

    updatePriceUI();
    renderCourses();
  }

  // ---------- events ----------
  langButtons.forEach((btn) => btn.addEventListener("click", () => handleLangClick(btn)));

  techSelect.addEventListener("change", () => {
    state.technology = techSelect.value;
    renderCourses();
  });

  levelSelect.addEventListener("change", () => {
    state.level = levelSelect.value;
    renderCourses();
  });

  searchInput.addEventListener("input", () => {
    state.keyword = searchInput.value.trim().toLowerCase();
    renderCourses();
  });

  [priceMin, priceMax].forEach((el) =>
    el.addEventListener("input", () => {
      updatePriceUI();
      renderCourses();
    })
  );

  clearAllBtn.addEventListener("click", clearAll);

  // ---------- init ----------
  populateTechnologies();
  updatePriceUI();
  renderCourses();
})();
