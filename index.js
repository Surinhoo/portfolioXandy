function enviarWhats(event) {
  event.preventDefault();
  const nome = document.getElementById('namep').value;
  const mensagem = document.getElementById('mensagem').value;
  const telefone = '5551997853100';
  const text = `Olá me chamo ${nome}, ${mensagem}`;
  const msgformatada = encodeURIComponent(text);
  const url = `https://wa.me/${telefone}/?text=${msgformatada}`;
  window.open(url, '_blank');
}


const body = document.body;
const foto = document.querySelector('.foto-compositor');
const nav = document.querySelector('.nav-compositor');
const formButton = document.querySelector('.botao-form');
const nameClass = document.querySelector('.nome-compositor');
const titleBtn = document.querySelector('.switch-label');


// abaixo codigo para os mp3 poh



document.querySelectorAll('.player-compacto').forEach(player => {
  const audio = player.querySelector('audio');
  const playBtn = player.querySelector('.play-btn');
  const progress = player.querySelector('.progress');
  const tempoAtual = player.querySelector('.tempo-atual');
  const tempoTotal = player.querySelector('.tempo-total');

  // Play/Pause
  playBtn.addEventListener('click', () => {
    document.querySelectorAll('audio').forEach(otherAudio => {
      if (otherAudio !== audio) {
        otherAudio.pause();
        otherAudio.parentElement.querySelector('.play-btn').textContent = '▶';
      }
    });
    if (audio.paused) {
      audio.play();
      playBtn.textContent = '⏸';
    } else {
      audio.pause();
      playBtn.textContent = '▶';
    }
  });

  // Tempo total
  audio.addEventListener('loadedmetadata', () => {
    const min = Math.floor(audio.duration / 60).toString().padStart(2, '0');
    const sec = Math.floor(audio.duration % 60).toString().padStart(2, '0');
    tempoTotal.textContent = `${min}:${sec}`;
  });

  // Tempo atual
  audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.value = percent;
    const min = Math.floor(audio.currentTime / 60).toString().padStart(2, '0');
    const sec = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
    tempoAtual.textContent = `${min}:${sec}`;
  });

  // Controle da barra
  progress.addEventListener('input', () => {
    if (audio.duration) {
      audio.currentTime = (progress.value / 100) * audio.duration;
    }
  });

  // Reset ao finalizar
  audio.addEventListener('ended', () => {
    playBtn.textContent = '▶';
    progress.value = 0;
    tempoAtual.textContent = '00:00';
  });
});
