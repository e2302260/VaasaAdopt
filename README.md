VaasaAdopt on yksinkertainen web-sovellus, jonka tavoitteena on helpottaa eläinten adoptio­prosessia.  
Sovelluksen avulla käyttäjä voi:

- nähdä kaikki adoptoitavat eläimet
- katsoa eläimen tarkemmat tiedot
- lähettää adoptiohakemuksen sähköisesti
- saada vahvistuksen hakemuksen lähetyksestä

## 🔧 Teknologiat

- Node.js
- Express
- Kaksi erillistä palvelinta (Server A ja Server B)
- JSON-tiedostot tietojen tallennukseen
- HTML, CSS ja JavaScript (frontend)

---

## Projektin rakenne

VaasaAdopt/
├─ server-a/ # Eläintiedot + frontend
│ ├─ data/
│ ├─ public/
│ └─ index.js
├─ server-b/ # Adoptiohakemusten käsittely
│ ├─ data/
│ └─ index.js
└─ README.md

- **Server A** näyttää eläimet ja välittää adoptiohakemuksen Server B:lle.
- **Server B** tallentaa adoptiohakemuksen ja estää tupla-adoptiot.

---

## 📦 Asennusohjeet

### 1. Lataa projekti

Kloonaa GitHubista tai lataa zip:

git clone https://github.com/e2302260/VaasaAdopt.git

Siirry projektin juureen:

cd VaasaAdopt

### 2. Asenna riippuvuudet

**Server A:**

cd server-a
npm install

**Server B:**
cd ../server-b
npm install

## ▶️ Käynnistys

Avaa **kaksi** terminaali-ikkunaa.

### Terminaali 1 – Server B

cd VaasaAdopt/server-b
npm start

Käynnistyy porttiin **4000**.

### Terminaali 2 – Server A

cd VaasaAdopt/server-a
npm start

Käynnistyy porttiin **3000**.

## 🌐 Sovelluksen käyttö

Avaa selain:

http://localhost:3000

### Käyttö:

1. Etusivulla näkyvät kaikki eläimet kortteina.
2. "Katso lisää" avaa eläimen yksityissivun.
3. Sivun alareunasta löytyy adoptiohakemus.
4. Lähetyksen jälkeen siirryt kiitos-sivulle.
5. Server B tallentaa hakemuksen, ja eläimen tila muuttuu *adopted*.

## API-yhteenveto 

### Server A

- **GET /animals** – kaikki eläimet  
- **GET /animals/:id** – yksittäisen eläimen tiedot  
- **POST /animals/:id/adopt** – lähettää adoptiohakemuksen Server B:lle  

### Server B

- **POST /adoptions** – tallentaa adoptiohakemuksen  
  - estää eläimen tupla-adoptiot  
- **GET /health** – tarkistus että palvelin on käynnissä  


## Tietojen tallennus

- Eläimet → `server-a/data/animals.json`
- Adoptiohakemukset → `server-b/data/adoptions.json`
  

## Muuta

- Projektissa ei käytetä Dockeria.


## Tekijä
Ville Niemi e2302260

Projekti tehty itsenäisesti kurssityönä.
