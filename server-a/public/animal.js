function getIdFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get('id'));
}

async function loadAnimal() {
  const id = getIdFromQuery();
  const res = await fetch(`/animals/${id}`);
  if (!res.ok) {
    document.getElementById('animal-details').textContent = 'Eläintä ei löydy.';
    document.getElementById('adoption-form').style.display = 'none';
    return;
  }
  const animal = await res.json();

  const container = document.getElementById('animal-details');
  container.innerHTML = '';

  const img = document.createElement('img');
  img.src = animal.imageUrl || 'https://via.placeholder.com/300x150?text=Ei+kuvaa';

  const title = document.createElement('h1');
  title.textContent = animal.name;

  const type = document.createElement('p');
  type.textContent = `Tyyppi: ${animal.type}`;

  const age = document.createElement('p');
  age.textContent = `Ikä: ${animal.age} vuotta`;

  const breed = document.createElement('p');
  breed.textContent = `Rotu: ${animal.breed}`;

  const desc = document.createElement('p');
  desc.textContent = animal.description;

  container.appendChild(img);
  container.appendChild(title);
  container.appendChild(type);
  container.appendChild(age);
  container.appendChild(breed);
  container.appendChild(desc);

  if (animal.status !== 'available') {
    document.getElementById('adoption-form').style.display = 'none';
    const msg = document.createElement('p');
    msg.textContent = 'Tämä eläin on jo varattu tai adoptoitu.';
    container.appendChild(msg);
  }
}

async function handleAdoptionSubmit(event) {
  event.preventDefault();
  const id = getIdFromQuery();
  const form = event.target;
  const errorEl = document.getElementById('error-message');
  errorEl.textContent = '';

  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  const res = await fetch(`/animals/${id}/adopt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    window.location.href = 'thankyou.html';
  } else {
    const body = await res.json().catch(() => ({}));
    errorEl.textContent = body.error || 'Adoptio epäonnistui.';
  }
}

document.getElementById('adoption-form').addEventListener('submit', handleAdoptionSubmit);
loadAnimal();
