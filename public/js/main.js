'use strict';

// TODO: Write your code here.

interactiveCanvas.ready({
  onUpdate(data) {
    // Countdown
    if (data.scene === 'countdown') {
      document.querySelector('#welcome').style.display = 'none';
      document.querySelector('#countdown').style.display = 'block';
      document.querySelector('#alert').style.display = 'none';
      
      const sec = parseInt(data.userChoiceValue) * 60;
      const timer = new Date(new Date().getTime() + sec * 1000);
      let count = sec;

      const box = document.querySelector('#countdown .box.count');
      box.innerText = count;

      let position = 200;
      const step = (400 / sec) * 1.15;

      const id = setInterval(() => {
        box.innerText = --count;
        position -= step;
        document.querySelector('#countdown img.right').style.left = `${position}px`;
        if (new Date().getTime() >= timer.getTime()) {
          clearInterval(id);
          interactiveCanvas.sendTextQuery('alert');
        }
      }, 1000);
    }
    // Alert
    if (data.scene === 'alert') {
      document.querySelector('#welcome').style.display = 'none';
      document.querySelector('#countdown').style.display = 'none';
      document.querySelector('#alert').style.display = 'block';
      document.querySelector('#alert div').innerText = 'お疲れ様でした！';
    }
    // Initialize the screen.
    if (data.scene === 'reset') {
      document.querySelector('#welcome').style.display = 'block';
      document.querySelector('#countdown').style.display = 'none';
      document.querySelector('#alert').style.display = 'none';
      document.querySelector('#countdown img.right').style.left = '200px';
      document.querySelector('#countdown .box.count').innerText = '';
    }
  }
});

document.querySelectorAll('#welcome .box').forEach(box => {
  box.addEventListener('click', elem => {
    interactiveCanvas.sendTextQuery(elem.target.dataset.choice);
  });
});