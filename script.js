const form = document.querySelector("#club-form");
const result = document.querySelector("#result");
const animalImage = document.querySelector("#animal-image");
const resultTitle = document.querySelector("#result-title");
const resultCaption = document.querySelector("#result-caption");

const animals = {
  gato: {
    name: "El gerente de la casa",
    caption: "Tiene tres reuniones hoy: una con la cortina, otra con una caja y otra para ignorarte.",
    image: "imagenes/gato.jpg",
    alt: "Gato con expresión muy seria y cómica"
  },
  perro: {
    name: "El señor de los lunes",
    caption: "Está agotado de perseguir su propia cola. La junta de las 3 queda cancelada.",
    image: "imagenes/perro.jpg",
    alt: "Perro con una expresión divertida"
  },
  capibara: {
    name: "La patata zen",
    caption: "No sabe qué está pasando, pero está completamente de acuerdo con quedarse flotando.",
    image: "imagenes/capibara.jpg",
    alt: "Capibara en una pose graciosa"
  }
};

function showError(field, message) {
  const error = document.querySelector(`#${field.id}-error`);
  error.textContent = message;
  field.setAttribute("aria-invalid", String(Boolean(message)));
}

function validateForm() {
  const name = form.elements.name;
  const animal = form.elements.animal;
  const terms = form.elements.terms;
  const trimmedName = name.value.trim();
  let isValid = true;

  showError(name, "");
  showError(animal, "");
  showError(terms, "");

  if (trimmedName.length < 2) {
    showError(name, "Escribe al menos 2 caracteres para tu nombre.");
    isValid = false;
  }

  if (!animals[animal.value]) {
    showError(animal, "Elige uno de los animalitos de la lista.");
    isValid = false;
  }

  if (!terms.checked) {
    showError(terms, "Necesitamos tu permiso para compartir la fama.");
    isValid = false;
  }

  return isValid;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateForm()) {
    const firstInvalid = form.querySelector('[aria-invalid="true"]');
    firstInvalid.focus();
    result.hidden = true;
    return;
  }

  const animal = animals[form.elements.animal.value];
  resultTitle.textContent = animal.name;
  resultCaption.textContent = `${form.elements.name.value.trim()}, tu compañero ya te está juzgando con cariño. ${animal.caption}`;
  animalImage.src = animal.image;
  animalImage.alt = animal.alt;
  result.hidden = false;
  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

document.querySelector("#again").addEventListener("click", () => {
  form.elements.animal.focus();
  result.hidden = true;
});
