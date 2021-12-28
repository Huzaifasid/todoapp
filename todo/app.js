const firebaseConfig = {
    apiKey: "AIzaSyDXypvG5p3YfNwboNUeRR8TKMFPWFuDlDM",
    authDomain: "todo-hs.firebaseapp.com",
    projectId: "todo-hs",
    storageBucket: "todo-hs.appspot.com",
    messagingSenderId: "281747703982",
    appId: "1:281747703982:web:516c260e6be14589d2053f",
    measurementId: "G-RZ7NW296K2"
};
const app = firebase.initializeApp(firebaseConfig);

var database = app.database();

var listBox = document.getElementById("list");
function addTodo() {
    var input = document.getElementById("inp");
    if (input.value.length >= 3) {
        var key = database.ref("/").push().key
        var todoObject = {
            key: key,
            todo: input.value
        }
        database.ref("todos").child(key).set(todoObject);
        input.value = "";
    }
    else {
        alert("please Enter 3 or more than 3 value");
    }
}

database.ref("todos").on("child_added", function (data) {
    var li = document.createElement("li");
    var liText = document.createTextNode(data.val().todo);

    li.appendChild(liText);
    li.classList.add("sList");
    list.appendChild(li);

    var editBTN = document.createElement("button")
    editBTN.innerHTML = "<i class='fas fa-pen-square'></i>"
    editBTN.classList.add("myBtn1");
 
    editBTN.setAttribute("onclick", "editBtn(this)");
    editBTN.setAttribute("id", data.val().key);
   
    editBTN.classList.add("editBTn");
    li.appendChild(editBTN);

    var delBTN = document.createElement("button");
    delBTN.innerHTML = "<i class='fas fa-minus-circle'></i>"
    delBTN.setAttribute("onclick", "deleteBtn(this)");
    delBTN.setAttribute("id", data.val().key);
    delBTN.classList.add("myBtn2");
    delBTN.classList.add("delBTn");
    li.appendChild(delBTN)

})

function deleteBtn(e) {
    e.parentNode.remove()
    database.ref("todos").child(e.id).remove();
}

function editBtn(e) {
    var liText = e.parentNode.firstChild.nodeValue
    var editLiText = prompt("Edit your work", liText);
    e.parentNode.firstChild.nodeValue = editLiText
    database.ref("todos").child(e.id).update({
        todo: editLiText
    })
}

function delallTodo() {
    listBox.innerHTML = ""
    database.ref("/todos").remove()
}