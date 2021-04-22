var user;
var db = firebase.firestore();

function registerUser() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('pword').value;


    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            user = userCredential.user;
            console.log(user.uid);
            addUserDetails(user.uid);
        })
        .catch((error) => {
            var err = document.getElementById('error');
            // var errorCode = error.code;
            var errorMessage = error.message;
            err.innerHTML = errorMessage;
        });
}

function addUserDetails(userId) {
    var regNo = document.getElementById('reg').value;
    var name = document.getElementById('name').value;
    if (regNo.length == 11 && name.length > 6) {
        db.collection("Students").doc(userId).set({
            name: name,
            regNumber: regNo
        }).then(() => {
            window.location.href = "html/dashboard.html";
        }).catch((error) => {
            alert(error);
        });
    }
}

function checkAuthState() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            window.location.href = "../index.html";
        } else {
            displayUser();
        }
    });
}

function signIn() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('pword').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            user = userCredential.user;
            window.location.href = "html/dashboard.html";
        })
        .catch((error) => {
            var err = document.getElementById('error');
            // var errorCode = error.code;
            var errorMessage = error.message;
            err.innerHTML = errorMessage;
        });
}

function displayUser() {
    var use = firebase.auth().currentUser;
    var studRef = db.collection("Students").doc(use.uid);
    studRef.get().then((doc) => {
        document.getElementById("studName").innerText = doc.data()['name'];
        document.getElementById("regn").innerText = doc.data()['regNumber'];
        console.log(doc.data());
    })
}