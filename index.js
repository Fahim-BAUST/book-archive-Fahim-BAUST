const searchBook = () => {
    const bookName = document.getElementById('book-name');

    if (bookName.value == '') {
        alert("enter any book name first please"); //cheking empty string 
    }
    else {
        const url = `https://openlibrary.org/search.json?q=${bookName.value}`;

        fetch(url)
            .then(res => res.json())
            .then(data => loadBook(data))
            ;
    }

    bookName.value = '';
    toggleTpinner('block');
    toggleStyle('add-book', 'none');
    toggleStyle('search', 'none');


};

// spinner toggle 
const toggleTpinner = (data) => {
    document.getElementById('spin').style.display = data;

};


const toggleStyle = (id, contentStyle) => {
    document.getElementById(id).style.display = contentStyle;

}

//showing all books through cards
const loadBook = names => {

    const div1 = document.getElementById('add-book');
    div1.textContent = '';

    // search counter 
    document.getElementById('search-counter').innerText = `
    Search results found : ${names.numFound}`;
    document.getElementById('show-results').innerText = `
    Showing results : ${names.docs.length ? names.docs.length : 0}`;

    const data = names.docs;

    if (names.numFound === 0) {
        div1.innerHTML = `
        <h1 class="text-white bg-danger"
        >No results found</h1>
        `;
    }
    else {
        data.forEach(name => {

            const div = document.createElement('div');
            div.classList.add("col");
            const loadImageServer = `https://covers.openlibrary.org/b/id/${name.cover_i}-M.jpg`;
            const loadImageLocal = '5.jpg';


            const image = `${name.cover_i ? loadImageServer : loadImageLocal}`;

            div.innerHTML = `
            <div class="card h-100 " data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <img src="${image}" onerror="this.src='5.jpg'" height="400px"  class="card-img-top w-100 mx-auto" alt="...">
                <div class="card-body">
                    <h5 class="card-title mb-4" >Name: ${name.title}</h5>
                    <p class="card-text " ><span class="fw-bold">Author:</span> ${name.author_name ? name.author_name : 'not found'}</p>
                    <p class="card-text" ><span class="fw-bold">First Publication date:</span> ${name.first_publish_year ? name.first_publish_year : 'not found'}</p>
    
                </div>
            </div>`;
            div1.appendChild(div);


        });
    }
    toggleTpinner('none');
    toggleStyle('add-book', 'flex');
    toggleStyle('search', 'block');

};