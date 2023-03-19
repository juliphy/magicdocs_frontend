url = window.location.href
id = url.substring(url.length - 12)
console.log(id)

function fillHTML() {
	if (isWorking) {
		for (el of document.getElementsByClassName("birthdate")) {
			el.innerHTML = "Дата народження: " + birthdate;
		}
		for (el of document.getElementsByClassName("fullname")) {
			el.innerHTML = fullname;
		}
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
	kpp_id = '31313131';
	passport_id = obj.passport_id
	isRightsEnabled = false;
	isCovidCertificateEnabled = false;
	
	fillHTML()
})
