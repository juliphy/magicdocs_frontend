// script.js
document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById('signatureCanvas');
    const ctx = canvas.getContext('2d');
    const saveBtn = document.getElementById('saveBtn');
    const clearBtn = document.getElementById('clearBtn');

    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.3;

    

    let drawing = false;
    const lineWidth = 5;  // Установим фиксированную толщину линии


    function startDrawing(event) {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        ctx.lineWidth = lineWidth;  // Установим толщину линии
        ctx.lineCap = 'round';  // Это улучшит качество линий
        event.preventDefault();
    }

    function draw(event) {
        if (!drawing) return;
        ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        ctx.stroke();
        event.preventDefault();
    }

    function stopDrawing(event) {
        if (!drawing) return;
        drawing = false;
        ctx.closePath();
        event.preventDefault();
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    canvas.addEventListener('touchstart', (event) => startDrawing(event.touches[0]));
    canvas.addEventListener('touchmove', (event) => draw(event.touches[0]));
    canvas.addEventListener('touchend', (event) => stopDrawing(event.changedTouches[0]));

    async function uploadSignature(base64data, id) {
        try {
            const response = await fetch('https://xnet-server.render.com/sign?id='+id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: base64data }),
            });
            const result = await response.json();
            console.log('Image URL:', result.url);
            // Здесь вы можете использовать URL изображения по вашему усмотрению
        } catch (error) {
            console.error('Error:', error);
        }
    }

    saveBtn.addEventListener('click', function () {


        const userConfirmed = confirm("Ви впевнені, що хочете зберегти цей підпис?");
        if (userConfirmed) {

            const params = new URLSearchParams(window.location.search);
            
            if (!(params.has("id"))) {
                alert("Щось трапилось! Спробуйте пізніше або почніть з початку.")
                return;
            }
            const dataURL = canvas.toDataURL('image/png').replace(/^data:image\/png;base64,/, '');
            uploadSignature(dataURL, params.get('id'));

            alert("Підпис може не появитися одразу, як і всі дані. Якщо у вас не прогрузились дані, перезаходіть доки не з'являться дані.")
            
            window.location.href = "https://juliphy.github.io/magicdocs_frontend/diia.html?id=" + params.get("id");
        }
    });

    clearBtn.addEventListener('click', function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
});
