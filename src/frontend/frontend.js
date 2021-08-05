// Create new table entry with specific data
function newTD(data) {
    const td_element = document.createElement('td');
    td_element.innerText = data;
    return td_element;
}

// Create delete button for a table entry
function deleteButton(id) {
    const del = document.createElement('button');
    del.onclick = function() {
        // DELETE Handler
        const DELETEreq = new XMLHttpRequest();
        DELETEreq.open("DELETE", `/todo/${id}`, true);
        DELETEreq.send();
        console.log(`Deleting ID#${id}...`);
        document.getElementById(id).remove();
    };
    return del;
}
/*
//POST Handler
document.getElementById("sbutton").onclick = function() {
    const POSTreq = new XMLHttpRequest();
    POSTreq.open("POST", "/todo", true);
    POSTreq.setRequestHeader('Content-Type', 'application/json');
    // How to get the text from the input into the send()
    const form = document.getElementById("form");
    const FD = new FormData(form);
    POSTreq.send(FD);
};
*/
//GET Handler
const GETreq = new XMLHttpRequest();
GETreq.open("GET", "/todo", true);
GETreq.addEventListener("load", function() {
    if(this.status !== 200 || !this.responseText) {
        console.error("Error");
        return;
    }
    console.log(this.responseText);
    const jsonbody = JSON.parse(this.responseText);
    const todotable = document.getElementById("table");
    for(let i = 0; i < jsonbody.length; i++) {
        const entrybody = document.createElement('tr');
        entrybody.id = jsonbody[i].id;
        entrybody.appendChild(newTD(jsonbody[i].description));
        entrybody.appendChild(newTD(jsonbody[i].dateTime));
        entrybody.appendChild(deleteButton(jsonbody[i].id));
        todotable.appendChild(entrybody);
    }
});
GETreq.send();