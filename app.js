class Search {
    constructor(query){
        this.query = query;
    }

    async getRes(query){
        try{
            const res = await fetch('./models/data.json');
            const data = await res.json();

            const db = data.filter((doc => {
                
                return doc.shirt == query;
            }))
            return db;
        } catch(err){
            console.log('Error: ' + err)
        }
    }
}

const searchContainer = document.querySelector('.search-container');
let list = document.querySelector('#items');

const clearUI = () => {
    list.innerHTML = '';
}

searchContainer.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearUI();
    const query = e.target.elements.search.value.toLowerCase();
    const data = new Search(query);
    data.query.toLowerCase();
    const result = await data.getRes(query);
    result.forEach(item => {
        let div = document.createElement("div");
        div.innerHTML = `
            <p data-id="${item.id}">Price: ${item.price}, Stuff: ${item.shirt}</p>
        `
        list.insertAdjacentElement('beforeend', div);

        
    })
    searchContainer.reset();
})
