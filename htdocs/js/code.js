const urlBase = 'http://contacts.lampcontactmanager.xyz/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName;
let lastName;

let editID = 0;

// view or create
let state = 0;


function showMessage(element) {

        element.classList.add("show");
	    
	setTimeout(() => {
		element.classList.add("hide");

		setTimeout(() => {
			element.classList.remove("show", "hide");
		}, 500); 
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
			notification.style.opacity = '1'; 
			        }, 10);
	        setTimeout(() => {
			notification.style.opacity = '0'; 
			setTimeout(() => {

				notification.style.display = 'none';
			}, 500); 

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

	const loadingScreen = document.getElementById("loadingScreen");
	loadingScreen.style.display = "flex";
	// delay for the loading screen
	setTimeout(() => {

		userId = 0;
		firstName = "";
		lastName = "";
		document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";

		window.location.href = "index.html";
	}, 2000); 

}

function AddContactNotification() {

	const notification = document.getElementById("addContactNotification");

	notification.style.display = 'block';

	setTimeout(() => {

		notification.style.opacity = '1';

	}, 10);

	setTimeout(() => {



		notification.style.opacity = '0';

		setTimeout(() => {

			notification.style.display = 'none';

		}, 500);

	}, 3000);



}

const addContact = () => {
	let firstname = document.getElementById("firstname").value;
	let lastname = document.getElementById("lastname").value;
	let email = document.getElementById("email").value;
	let phone = document.getElementById("phone").value;

	// Input validation
	if (firstname == null || lastname == null || email == null || phone == null) {
		
	}

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
				console.log("Contact added");

				AddContactNotification();
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

const removeContact = (e) => {
<<<<<<< Updated upstream
	let item = e.target.parentNode;
=======
<<<<<<< HEAD
	let item = e.target.parentNode.parentNode;
=======
	let item = e.target.parentNode;
>>>>>>> bf04c4bbe183a8f45d5b099536b53b5f1b3d744e
>>>>>>> Stashed changes
	console.log(item.id);

	let url = urlBase + '/RemoveContacts.' + extension;
	let tmp = {contactId : item.id, userId : userId}

	let jsonPayload = JSON.stringify( tmp );

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
				console.log(jsonObject);
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		console.log(err);
	}

<<<<<<< Updated upstream

=======
<<<<<<< HEAD
	focus = null;
=======

>>>>>>> bf04c4bbe183a8f45d5b099536b53b5f1b3d744e
>>>>>>> Stashed changes
	item.remove();
}


let focus = null;
const activateInput = (e) => {

	//console.log(focus.dataset.mode);
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
	console.log("FOCUS");
	console.log(focus);
	
	// let contactItem = e.target.parentNode.parentNode.id;
	let contactItem = document.getElementById("body" + e.target.parentNode.parentNode.id);
	//console.log(contactItem);



	if (focus != null && focus != contactItem) {
		const inputs = [];

		//console.log(document.querySelector('[data-id="name-input-'+ focus.dataset.contactId+'"]'))
		//console.log('[data-id="name-input-'+ contactItem.dataset.contactId+']"');

		inputs.push(document.querySelector('[data-id="name-input-'+ focus.dataset.contactId+'"]'));
		inputs.push(document.querySelector('[data-id="number-input-'+ focus.dataset.contactId+'"]'));
		inputs.push(document.querySelector('[data-id="email-input-'+ focus.dataset.contactId+'"]'));

		console.log(inputs);

		inputs.forEach((input) => {
			input.disabled = true;
		});

		let edit = document.getElementById("edit" + focus.dataset.contactId);
		//console.log(edit);
=======
>>>>>>> Stashed changes

	//console.log(focus);
	

	if (focus != null && focus != e.target.parentNode) {
		const inputs = Array.from(focus.children).slice(0, 3);
		let edit = Array.from(focus.children).slice(3, 4)[0];
		inputs.forEach((input) => {
			input.disabled = true;
		})
<<<<<<< Updated upstream
=======
>>>>>>> bf04c4bbe183a8f45d5b099536b53b5f1b3d744e
>>>>>>> Stashed changes
		edit.dataset.mode = "edit"
		edit.innerHTML = "Edit";
	}

	console.log(e.target.dataset.mode);

	// Save the data
	if (e.target.dataset.mode == "save") {
		e.target.dataset.mode = "edit";
		e.target.innerHTML = "Edit";
<<<<<<< Updated upstream
		const inputs = Array.from(e.target.parentNode.children).slice(0, 3);
=======
<<<<<<< HEAD

		let inputs = [];

		inputs.push(document.querySelector('[data-id="name-input-'+ focus.dataset.contactId+'"]'));
		inputs.push(document.querySelector('[data-id="number-input-'+ focus.dataset.contactId+'"]'));
		inputs.push(document.querySelector('[data-id="email-input-'+ focus.dataset.contactId+'"]'));
		
=======
		const inputs = Array.from(e.target.parentNode.children).slice(0, 3);
>>>>>>> bf04c4bbe183a8f45d5b099536b53b5f1b3d744e
>>>>>>> Stashed changes
		inputs.forEach((input) => {
			input.disabled = true;
		});

		// PHP request
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
		let id = contactItem.dataset.contactId;
		console.log(id);
		let url = urlBase + '/UpdateContacts.' + extension;
		let tmp = {name : inputs[0].value, phone : inputs[1].value, email : inputs[2].value, contactId : id, userId : userId}
=======
>>>>>>> Stashed changes
		let id = e.target.parentNode.id;
		console.log(id);
		let url = urlBase + '/UpdateContacts.' + extension;
		let tmp = {name : inputs[0].value, email : inputs[1].value, phone : inputs[2].value, contactId : id, userId : userId}
<<<<<<< Updated upstream
=======
>>>>>>> bf04c4bbe183a8f45d5b099536b53b5f1b3d744e
>>>>>>> Stashed changes
		console.log(tmp);
		let jsonPayload = JSON.stringify( tmp );

		let xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

		try
		{
			xhr.onreadystatechange = function() 
			{
				if (this.readyState == 4 && this.status == 200) 
				{

					console.log("Contact updated");
					let jsonObject = JSON.parse( xhr.responseText );
					console.log(jsonObject);
				}
			};
			xhr.send(jsonPayload);
		}
		catch(err)
		{
			console.log(err);
		}

	} else {

		// Open new input
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
		console.log(contactItem);

		focus = contactItem;

		let inputs = [];

		inputs.push(document.querySelector('[data-id="name-input-'+ contactItem.dataset.contactId+'"]'));
		inputs.push(document.querySelector('[data-id="number-input-'+ contactItem.dataset.contactId+'"]'));
		inputs.push(document.querySelector('[data-id="email-input-'+ contactItem.dataset.contactId+'"]'));
=======
>>>>>>> Stashed changes
		console.log(e.target.parentNode);

		focus = e.target.parentNode;

		const inputs = Array.from(e.target.parentNode.children).slice(0, 3);
<<<<<<< Updated upstream
=======
>>>>>>> bf04c4bbe183a8f45d5b099536b53b5f1b3d744e
>>>>>>> Stashed changes

		inputs.forEach((input) => {
			input.disabled = false;
		});

		e.target.dataset.mode = "save";

		e.target.innerHTML = "Save";

<<<<<<< Updated upstream
		console.log(inputs);
=======
<<<<<<< HEAD
		//console.log(inputs);
=======
		console.log(inputs);
>>>>>>> bf04c4bbe183a8f45d5b099536b53b5f1b3d744e
>>>>>>> Stashed changes
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
					let buttonDiv = document.createElement("div");

					let body = document.createElement("div");
					body.setAttribute("class", "contact-item-body");
					body.setAttribute("id", "body" + jsonObject.results[i].ID);
					body.dataset.contactId = jsonObject.results[i].ID;

					div.setAttribute("class", "contact-item");
					div.setAttribute("id", jsonObject.results[i].ID);

<<<<<<< Updated upstream
=======
<<<<<<< HEAD
					buttonDiv.setAttribute("class", "button-div");
					buttonDiv.setAttribute("id", jsonObject.results[i].ID);
=======
>>>>>>> Stashed changes
					let name = document.createElement("input");
					let number = document.createElement("input");
					let email = document.createElement("input");
					console.log("why");
<<<<<<< Updated upstream
=======
>>>>>>> bf04c4bbe183a8f45d5b099536b53b5f1b3d744e
>>>>>>> Stashed changes

					let name = document.createElement("input");
					let number = document.createElement("input");
					let email = document.createElement("input");
					console.log("why");

<<<<<<< Updated upstream
=======
<<<<<<< HEAD
					let infoContainer = document.createElement("div");
					infoContainer.setAttribute("class", "contact-item-infoContainer");

					let numberContainer = document.createElement("div");
					let emailContainer = document.createElement("div");
					numberContainer.setAttribute("class", "number-container");
					emailContainer.setAttribute("class" , "email-container");

					let numberLabel = document.createElement("div");
					let emailLabel = document.createElement("div");
					numberLabel.setAttribute("class", "number-label");
					emailLabel.setAttribute("class", "number-label");
					numberLabel.innerHTML = "Number:";
					emailLabel.innerHTML = "Email:"

					name.setAttribute("class", "contact-item-name");
					number.setAttribute("class", "contact-item-number");
					email.setAttribute("class", "contact-item-email");

					name.setAttribute("id", "contact-item-name" + jsonObject.results[i].ID);
					number.setAttribute("id", "contact-item-number" + jsonObject.results[i].ID);
					email.setAttribute("id", "contact-item-email" + jsonObject.results[i].ID);

					name.dataset.id = "name-input-" + jsonObject.results[i].ID;
					number.dataset.id = "number-input-" + jsonObject.results[i].ID;
					email.dataset.id = "email-input-" + jsonObject.results[i].ID;

=======
>>>>>>> bf04c4bbe183a8f45d5b099536b53b5f1b3d744e
>>>>>>> Stashed changes
					name.value = jsonObject.results[i].name;
					number.value = jsonObject.results[i].phone;
					email.value = jsonObject.results[i].email;

					name.disabled = true;
					number.disabled = true;
					email.disabled = true;

					let editButton = document.createElement("button");
					let removeButton = document.createElement("button");

					editButton.setAttribute("class", "contact-item-button-edit")
					editButton.setAttribute("data-mode", "edit");
					removeButton.setAttribute("class", "contact-item-button-remove")

					editButton.setAttribute("id", "edit" + jsonObject.results[i].ID)
					removeButton.setAttribute("id", "remove" + jsonObject.results[i].ID)

					editButton.innerHTML = "Edit";
					removeButton.innerHTML = "Remove";

					editButton.addEventListener("click", function(event) {activateInput(event)});
					removeButton.addEventListener("click", function(event) {removeContact(event)});

<<<<<<< Updated upstream
=======
<<<<<<< HEAD
					// document.getElementById("contact-body-main").appendChild(name);
					body.appendChild(name);
					// body.appendChild(email);
					// body.appendChild(number);
					emailContainer.appendChild(emailLabel);
					numberContainer.appendChild(numberLabel);
					emailContainer.appendChild(email);
					numberContainer.appendChild(number);

					infoContainer.appendChild(emailContainer);
					infoContainer.appendChild(numberContainer);
					body.appendChild(infoContainer);

					buttonDiv.appendChild(editButton);
					buttonDiv.appendChild(removeButton);

					div.appendChild(body);
					div.appendChild(buttonDiv);

					// div.appendChild(editButton);
					// div.appendChild(removeButton);

					
=======
>>>>>>> Stashed changes
					div.appendChild(name);
					div.appendChild(email);
					div.appendChild(number);
					div.appendChild(editButton);
					div.appendChild(removeButton);
>>>>>>> bf04c4bbe183a8f45d5b099536b53b5f1b3d744e

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
	searchContacts();
}

const viewCreateContact = () => {
	console.log(document.getElementById("contact-view"))
	document.getElementById("create-contact-view").style.display = "flex";
	document.getElementById("contact-view").style.display = "none";
}
