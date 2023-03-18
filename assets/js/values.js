fetch('http://127.0.0.1:3132/api?id=w0n')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });


// Активировать документы (true - включены, false - отключены)
var isRightsEnabled = false; // Права
var isCovidCertificateEnabled = false; // COVID-сертификат

// Общее
var birthdate = "28.12.2003"; // Дата рождения
var fullname = "Демченко Олександр Сергійович" // ФИО
var name = "Олександр" // Имя

// Паспорт
var passport_id = "005085321" // Номер паспорта

// КПП
var kpp_id = "2105291065" // ИНН

// Права
var rights_valid_until = "01.01.2022" // Права "Дійсні до"
var rights_categories = "A, B" // Права "Категорії"
var rights_tsc = "ТСЦ 8631" // Права "Видав
var rights_id = "KBE968639" // Права "Серія та номер""

// COVID-сертификат
var covid_valid_until = "01.01.2022" // Сертификат "Дійсний до"
var covid_certificate_id = "URN:UVCI:01:UA:0<br>E55669376876888<br>B9E2520C4F88930" // Номер сертификата (<br> - перенос строки)
