const formElement = document.getElementById('form1'); // извлекаем элемент формы
formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(formElement); // создаём объект FormData, передаём в него элемент формы
  // теперь можно извлечь данные

  const id = formData.get('id'); // 'John'
  fetch('https://xnet-server.onrender.com/exist?id='+ id)
  .then(response => {

    if (response.status == 200) {
      fetch('https://xnet-server.onrender.com/login?id='+ id)
      .then(response => response.json())
      .then((data) => {
        if (data.isLoginAllowed == true || data.isAdmin == true) {
          if (window.location.href.slice(window.location.href.length - 10) == 'index.html') { 
            locationWithoutIndex = window.location.href.slice(0,-10)
            window.location = locationWithoutIndex + 'diia.html?id=' + id;
          } else {
            window.location = window.location.href + 'diia.html?id=' + id;
          }
        } else {
          var div = document.createElement('div');
          div.innerHTML = "На данний момент не можна ввійти до сервіса.";
          document.body.appendChild(div);
        }
      })
    } else { 
      var div = document.createElement('div');
      div.innerHTML = "Помилка. Введено неправильний ID.";
      document.body.appendChild(div);
    }
  })
});