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

	fullname = obj.name;
	firstname = obj.firstname;
	birthdate = obj.birthdate;
	kpp_id = obj.kpp_id;
	passport_id = obj.passport_id
	imageFace = obj.urlFace
	imageSign = obj.urlSign
	
	isRightsEnabled = false;
	isCovidCertificateEnabled = false;
	
	fetch('https://xnet-server.onrender.com/login?id='+ id)
      .then(response => response.json())
      .then((data) => {
        if (data.isLoginAllowed == true || data.isAdmin == true) {
          fillHTML()
        } else {
          var isWorking = false
			$('body').html('<body class="nononopage"><div class="nonono installTutorial" style="width: 100%;padding: 1vh;display: flex;flex-wrap: wrap;justify-content: center;"><div class="installPage" style="text-align: center;padding: 15px;"><div class="installName" style="font-size: 20px;font-weight: 600;">Сервіс не доступний зараз</div><p>Будь ласка зайдіть пізніше </p></div></div>');
			$('body').addClass('nononopage');
        }
      })

	fillHTML()
})
