// Menu burger
const menu = document.querySelector('.navigation');
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', openMenu);

function openMenu() {
  hamburger.classList.toggle('active');
  menu.classList.toggle('active');
}

// Error message
const input = document.querySelector('.input');
const errorMessage = document.querySelector('.error-message');
const button = document.querySelector('.send');
const linksList = document.querySelector('.links-list');

// Récupération des liens raccourcis depuis le stockage local
let links = JSON.parse(localStorage.getItem('links')) || [];

// Affichage des liens raccourcis dans la liste
for (let i = 0; i < links.length; i++) {
  const listItem = document.createElement('li');
  const linkItem = document.createElement('span');
  const rightContainer = document.createElement('div');
  const shortLinkItem = document.createElement('a');
  const copyButton = document.createElement('button');

  linkItem.textContent = links[i].originalLink;
  shortLinkItem.textContent = links[i].shortLink;
  shortLinkItem.href = links[i].shortLink;
  copyButton.textContent = 'Copy';

  listItem.appendChild(linkItem);
  listItem.appendChild(rightContainer);
  rightContainer.appendChild(shortLinkItem);
  rightContainer.appendChild(copyButton);

  linksList.appendChild(listItem);
}

button.addEventListener('click', () => {
  if (input.value.trim() === '') {
    input.style.border = 'hsl(0, 87%, 67%) solid 2px';
    input.classList.add('error');
    errorMessage.style.display = 'block';
    console.log('error');
  } else {
    input.style.border = '';
    errorMessage.style.display = '';
    input.classList.remove('error');
    const LINK = input.value;
    console.log(LINK);
    fetch(`https://api.shrtco.de/v2/shorten?url=${LINK}`)
    .then(response => response.json())
    .then(data => {
      // Traitement des données récupérées
      console.log(data);
      const shortLink = data.result.full_short_link;
      const originalLink = data.result.original_link;
      console.log(shortLink, originalLink);

      // Stockage du lien raccourci dans le stockage local
      links.push({ shortLink, originalLink });
      localStorage.setItem('links', JSON.stringify(links));

      // Création d'un élément de liste pour le lien raccourci
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      const shortLinkElement = document.createElement('span');
      const copyButton = document.createElement('button');

      link.href = originalLink;
      link.textContent = originalLink;
      shortLinkElement.textContent = shortLink;
      copyButton.textContent = 'Copy';

      listItem.appendChild(link);
      listItem.appendChild(shortLinkElement);
      listItem.appendChild(copyButton);

      linksList.appendChild(listItem);
    })
    .catch(error => {
      console.error('Erreur lors de la requête', error);
    });
  }
});
