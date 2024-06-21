document.getElementById('home').addEventListener('click', loadHome);
document.getElementById('catalog').addEventListener('click', loadCatalog);

function loadHome() {
    document.getElementById('content').innerHTML = '<h1>Ласкаво просимо до нашого каталогу!</h1>';
}

function loadCatalog() {
    fetch('categories.json')
        .then(response => response.json())
        .then(categories => {
            const content = document.getElementById('content');
            content.innerHTML = '<h1>Каталог</h1>';
            categories.forEach(category => {
                const catDiv = document.createElement('div');
                catDiv.className = 'category';
                catDiv.innerHTML = `<a href="#" data-category="${category.shortname}">${category.name}</a>`;
                content.appendChild(catDiv);
                catDiv.querySelector('a').addEventListener('click', (e) => {
                    e.preventDefault();
                    loadCategory(category.shortname);
                });
            });
            const specialsDiv = document.createElement('div');
            specialsDiv.className = 'category';
            specialsDiv.innerHTML = '<a href="#" id="specials">Specials</a>';
            content.appendChild(specialsDiv);
            document.getElementById('specials').addEventListener('click', (e) => {
                e.preventDefault();
                const randomCategory = categories[Math.floor(Math.random() * categories.length)].shortname;
                loadCategory(randomCategory);
            });
        });
}

function loadCategory(shortname) {
    fetch(`data/${shortname}.json`)
        .then(response => response.json())
        .then(items => {
            const content = document.getElementById('content');
            content.innerHTML = `<h1>${items[0].category}</h1>`;
            items.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'item';
                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <h2>${item.name}</h2>
                    <p>${item.description}</p>
                    <p>${item.price}</p>
                `;
                content.appendChild(itemDiv);
            });
        });
}

// Load home content initially
loadHome();

