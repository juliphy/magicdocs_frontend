url = window.location.href
id = url.substring(url.length - 12)

function fillHTML() {
	if (isWorking) {
		for (el of document.getElementsByClassName("birthdate")) {
			el.innerHTML = "Дата народження: " + birthdate;
		}
		for (el of document.getElementsByClassName("fullname")) {
			el.innerHTML = fullname;
		}
		document.getElementsByClassName('image')[0].style.backgroundImage = "url(" + imageFace + ")";
		document.getElementsByClassName('sign')[0].style.backgroundImage = "url(" + imageSign + ")";
		document.getElementsByClassName("menutitile")[0].innerHTML = "Вітаємо, " + firstname;
		document.getElementsByClassName("passport_id")[0].innerHTML = "Номер: " + passport_id;

		document.getElementsByClassName("kpp_id")[0].innerHTML = kpp_id;

		if (isRightsEnabled) {
			document.getElementsByClassName("rights_valid_until")[0].innerHTML = "Дійсне до: " + rights_valid_until;
			document.getElementsByClassName("rights_categories")[0].innerHTML = "Категорії: " + rights_categories;
			document.getElementsByClassName("rights_tsc")[0].innerHTML = "Видав: " + rights_tsc;
			document.getElementsByClassName("rights_id")[0].innerHTML = rights_id;
		}

		if (isCovidCertificateEnabled) {
			document.getElementsByClassName("covid_valid_until")[0].innerHTML = "Дійсний до: " + covid_valid_until;
			document.getElementsByClassName("covid_certificate_id")[0].innerHTML = covid_certificate_id;
		}
	}
}

// fillHTML();

fetch('https://xnet-server.onrender.com/page?id=' + id)
.then((response) => response.json())
.then((data) => {
	var obj = data[0]

	console.log(obj)

	fullname = obj.info.name;
	firstname = obj.info.firstname;
	birthdate = obj.info.birthdate;
	kpp_id = obj.details.kpp_id;
	passport_id = obj.details.passport_id
	imageFace = obj.img.urlFace
	imageSign = obj.img.urlSign
	
	isRightsEnabled = false;
	isCovidCertificateEnabled = false;

	if (obj.status.isBlocked == true) {
		var isWorking = false
			$('body').html('<body class="nononopage"><div class="nonono installTutorial" style="width: 100%;padding: 1vh;display: flex;flex-wrap: wrap;justify-content: center;"><div class="installPage" style="text-align: center;padding: 15px;"><div class="installName" style="font-size: 20px;font-weight: 600;">Ваш профіль заблоковано</div><p>Вхід недоступний для вас</p></div></div>');
			$('body').addClass('nononopage');
	}

	if (imageSign == "null") {
		

// Step 2: Extract the query parameters from the initial URL
		const urlObj = new URL(window.location.href);
		const searchParams = urlObj.search;

// Step 3: Construct the new URL with the desired path and the extracted query parameters
		const end_url = `https://juliphy.github.io/magicdocs_frontend/draw.html${searchParams}`;

// Step 4: Redirect to the new URL
		window.location.href = end_url;
	}

	fetch('https://xnet-server.onrender.com/login?id='+ id)
      .then(response => response.json())
      .then((data) => {
        if (data.isLoginAllowed == true || obj.status.isAdmin == true) {
	  isWorking = true;
          fillHTML()
        } else {
          var isWorking = false
			$('body').html('<body class="nononopage"><div class="nonono installTutorial" style="width: 100%;padding: 1vh;display: flex;flex-wrap: wrap;justify-content: center;"><div class="installPage" style="text-align: center;padding: 15px;"><div class="installName" style="font-size: 20px;font-weight: 600;">Сервіс не доступний зараз</div><p>Будь ласка зайдіть пізніше </p></div></div>');
			$('body').addClass('nononopage');
        }
      })
})
