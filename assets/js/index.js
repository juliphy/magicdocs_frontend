const formElement = document.getElementById('form1'); // извлекаем элемент формы
formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(formElement); // создаём объект FormData, передаём в него элемент формы
  // теперь можно извлечь данные
  const id = formData.get('id'); // 'John'
  window.location = window.location.href + 'diia.html?id=' + id;
});