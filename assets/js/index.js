const formElement = document.getElementById('form1'); // извлекаем элемент формы
formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(formElement); // создаём объект FormData, передаём в него элемент формы
  // теперь можно извлечь данные

  const id = formData.get('id'); // 'John'
  fetch('https://xnet-server.onrender.com/exist?id='+ id)
  .then(response => {

    if (response.status == 200) { 
      console.log('200PASS')
      if (window.location.href.slice(window.location.href.length - 10) == 'index.html') { 
        console.log('if')
        locationWithoutIndex = window.location.href.slice(0,-10)
        window.location = locationWithoutIndex + 'diia.html?id=' + id;
      } else {
        console.log('else') 
        window.location = window.location.href + 'diia.html?id=' + id;
      }
    } else { 
      var div = document.createElement('div');
      div.innerHTML = "Помилка. Введено неправильний ID.";
      document.body.appendChild(div);
    }
    
  })
});