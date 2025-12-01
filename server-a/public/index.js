async function loadAnimals() {
  const res = await fetch('/animals');
  const animals = await res.json();
  const container = document.getElementById('animal-list');
  container.innerHTML = '';

animals.forEach(a => {
  const card = document.createElement('div');
  card.className = 'card';

  const img = document.createElement('img');
  img.src = a.imageUrl || 'https://via.placeholder.com/300x150?text=Ei+kuvaa';

  const title = document.createElement('h2');
  title.textContent = `${a.name} (${a.type})`;

  const age = document.createElement('p');
  age.textContent = `Ikä: ${a.age} vuotta`;

  const status = document.createElement('p');
  status.textContent = a.status === 'available' ? 'Vapaa adoptioon' : 'Varattu / adoptoitu';

  const button = document.createElement('button');
  button.textContent = 'Katso lisää';
  button.onclick = () => {
    window.location.href = `animal.html?id=${a.id}`;
  };

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(age);
  card.appendChild(status);
  card.appendChild(button);

  container.appendChild(card);
});

}

loadAnimals();
