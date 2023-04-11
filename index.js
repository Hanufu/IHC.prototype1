const form = document.querySelector('form');
const searchInput = document.querySelector('#search-input');
const resultTable = document.querySelector('#resultTable tbody');
const resultDiv = document.querySelector('#resultDiv');
const erroSearch = document.querySelector('#erroSearch');
const all = document.querySelector("#all");


form.addEventListener('submit', (event) => {
  event.preventDefault();
  let searchTerm = searchInput.value.toLowerCase();

  fetch('database.json')
    .then(response => response.json())
    .then(data => {
      let searchResults = Object.entries(data).filter(entry => {
        let itemName = entry[0].toLowerCase();
        return itemName.includes(searchTerm);
      });
     

      if (searchResults.length > 0) {
        resultDiv.removeAttribute("hidden");
        erroSearch.innerHTML = '';
        resultTable.innerHTML = '';
        searchResults.forEach(result => {
            let itemName = result[0];
            let itemData = result[1];
            let row = document.createElement('tr');
            row.innerHTML = `
              <td>${itemName}</td>
              <td>${itemData.quantidade}</td>
              <td>${itemData.preco_uni.toFixed(2)}</td>
              <td>${itemData.local}</td>
            `;
            resultTable.appendChild(row);
          });

      }else{
      
        erroSearch.innerHTML = '';
        resultTable.innerHTML = '';
        let h1 = document.createElement('h1');
        h1.innerText = `Item não encontrado`;
        h1.style.color = 'red'
        erroSearch.appendChild(h1);

        let h3 = document.createElement('h3');
        h3.innerText = `Não encontramos o item correspondente ao termo "${searchTerm}", ou não temos em estoque."`;
        erroSearch.appendChild(h3);
      }


 
    });
});
