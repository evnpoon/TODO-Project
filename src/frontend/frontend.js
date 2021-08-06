// Create table
function makeTable(data) {
    const toremove = document.getElementsByClassName("newrow");
    for(let i = 0; i < toremove.length; i++) {
        toremove[i].innerHTML = "";
    }
    const todotable = document.getElementById("table");
    for (let i = 0; i < data.length; i++) {
        const entrybody = document.createElement('tr');
        entrybody.className = "newrow";
        entrybody.id = data[i].id;
        entrybody.appendChild(newTD(data[i].description));
        entrybody.appendChild(newTD(data[i].dateTime));
        entrybody.appendChild(deleteButton(data[i].id));
        todotable.appendChild(entrybody);
    }
}

// Create new table entry with specific data
function newTD(data) {
    const td_element = document.createElement('td');
    td_element.innerText = data;
    return td_element;
}

// Create delete button for a table entry
function deleteButton(id) {
    const del = document.createElement('button');
    del.id = "confirmdel";
    del.innerText = "Delete TODO";
    del.onclick = function() {
        // DELETE Handler
        console.log(`Deleted ID#${id}...`);
        fetch(`/todo/${id}`, {
            method: 'DELETE',
            body: id
        }).catch(err => console.log(err))
        document.getElementById(id).remove();
        GETrequest();
    };
    return del;
}

// POST Handler
const form = document.getElementById("form");
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const FD = new FormData(this);
    const sparams = new URLSearchParams();
    for(const pair of FD) {
        sparams.append(pair[0], pair[1]);
    }
    fetch('/todo', {
        method: 'POST',
        body: sparams
    }).catch(err => console.log(err));

    GETrequest();
});

// GET Handler
function GETrequest() {
    fetch('/todo')
        .then(res => res.json())
        .then(data => makeTable(data))
        .catch(err => console.log(err));
}
GETrequest();