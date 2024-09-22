const urlBase = 'http://contacts.lampcontactmanager.xyz/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName;
let lastName;

// view or create
let state = 0;



function showMessage(element) {

        element.classList.add("show");
	    
	setTimeout(() => {
		element.classList.add("hide");

		setTimeout(() => {
			element.classList.remove("show", "hide");
		}, 500); // Wait for the hide animation to complete
	}, 3000);
}

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	console.log("what");	
	let login = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;
//	var hash = md5( password );
	console.log(login);
	console.log(password);

	document.getElementById("loginResult").innerHTML = "";
	loginResult.classList.remove("show", "hide");
	
	if (login === "" || password === "") {
		document.getElementById("loginResult").innerHTML = "Incorrect Username or Password.";
		showMessage(loginResult);
		return; // Prevent form submission or navigation if fields are empty
 }


	let tmp = {login:login,password:password};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
				console.log(jsonObject + "wow");
		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
		
					showMessage(loginResult);
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();

				document.getElementById("loadingScreen").style.display = "flex";


				setTimeout(() => {
					window.location.href = "contacts.html";
				}, 2000);

				
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}


function showSignupNotification() {

	        const notification = document.getElementById("signupNotification");

	        notification.style.display = 'block';

	        setTimeout(() => {
			notification.style.opacity = '1'; // Fade-in
			        }, 10);
	        setTimeout(() => {
			notification.style.opacity = '0'; // Fade-out
			setTimeout(() => {

				notification.style.display = 'none';
			}, 500); // Wait for the fade-out effect

		}, 3000);

}


function doSignup() {
	
	let firstname = document.getElementById("firstName").value;
	let lastname = document.getElementById("lastName").value;
	let login = document.getElementById("signupName").value;
	let password = document.getElementById("signupPassword").value;

 // Clear previous signup result messages
	 document.getElementById("signupResult").innerHTML = "";
	signupResult.classList.remove("show", "hide");

	// fields are empty
	 if (firstname === "" || lastname === "" || login === "" || password === "") {
		 document.getElementById("signupResult").innerHTML = "Please fill out all fields!";
		showMessage(signupResult);
		 return; 
	 }

	let tmp = {firstname : firstname, lastname : lastname, login:login,password:password};

	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/Signup.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
				
				showSignupNotification();
				saveCookie();
	
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("signupResult").innerHTML = err.message;
		showMessage(signupResult);
	}
}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	console.log(data);
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
//		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}

	//document.getElementById("sidebar-user").innerHTML = "Logged in as " + firstName + " " + lastName;
	console.log(document.getElementById("navbar-title-2"));
	document.getElementById("navbar-title-2").innerHTML = firstName + " " + lastName;
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

const addContact = () => {
	let firstname = document.getElementById("firstname").value;
	let lastname = document.getElementById("lastname").value;
	let email = document.getElementById("email").value;
	let phone = document.getElementById("phone").value;

	

	let tmp = {name: firstname + " " + lastname, email : email, phoneNumber: phone, userId : userId}
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/AddContact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				console.log("User added");
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		console.log("Did not work")
	}
}

function addColor()
{
	let newColor = document.getElementById("colorText").value;
	document.getElementById("colorAddResult").innerHTML = "";

	let tmp = {color:newColor,userId,userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/AddColor.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}
	
}

function searchContacts()
{
	let srch = document.getElementById("search-contact-input").value;
	// document.getElementById("colorSearchResult").innerHTML = "";
	
	let contactList = "";

	let tmp = {search:srch,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchContacts.' + extension;

	console.log(userId);
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				// document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				let parent = document.getElementById("contact-body");
				while (parent.firstChild) {
					parent.removeChild(parent.firstChild);
				}

				console.log(jsonObject.results);

				if (jsonObject.length == 0) return err;
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					contactList += jsonObject.results[i];
					let div = document.createElement("div");
					div.setAttribute("class", "contact-item");
					div.setAttribute("id", jsonObject.results[i].ID);

					let name = document.createElement("div");
					let number = document.createElement("div");
					let email = document.createElement("div");

					name.setAttribute("class", "contact-item-field");
					number.setAttribute("class", "contact-item-field");
					email.setAttribute("class", "contact-item-field");

					name.innerHTML = jsonObject.results[i].name;
					number.innerHTML = jsonObject.results[i].phone;
					email.innerHTML = jsonObject.results[i].email;

					let editButton = document.createElement("button");
					let removeButton = document.createElement("button");

					editButton.setAttribute("class", "contact-item-button-edit")
					removeButton.setAttribute("class", "contact-item-button-remove")

					editButton.innerHTML = "Edit";
					removeButton.innerHTML = "Remove";

					div.appendChild(name);
					div.appendChild(email);
					div.appendChild(number);
					div.appendChild(editButton);
					div.appendChild(removeButton);

					// div.innerHTML = `${jsonObject.results[i].name} ${jsonObject.results[i].email} ${jsonObject.results[i].phone} `;
					document.getElementById("contact-body").appendChild(div);
					
					
					// if( i < jsonObject.results.length - 1 )
					// {
					// 	colorList += "<br />\r\n";
					// }
				}
				
				// document.getElementsById("contact-item")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
	
}

function deleteContact()
{
	let search = document.getElementById("search-contact-input").value;
	let tmp = {userId:userId, contactId:contactId};
	let jsonPayload = JSON.stringify( tmp );
	let url = urlBase + '/RemoveContacts.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try {
		xhr.onreadystatechange = function() {
			if( this.readyState == 4 && this.status == 200) {
				let jsonObject = JSON.parse(xhr.responseText);

				if(jsonObject.error) {
					console.log("Error:" + jsonObject.error)
				}
			}
		};

		xhr.send(jsonPayload);
	}
	catch(err) {
		console.error("There was an error deleting the contact" + err.message);
	}
}

const viewContacts = () => {
	document.getElementById("contact-view").style.display = "flex";
	document.getElementById("create-contact-view").style.display = "none";
}

const viewCreateContact = () => {
	console.log(document.getElementById("contact-view"))
	document.getElementById("create-contact-view").style.display = "flex";
	document.getElementById("contact-view").style.display = "none";
}
