let musicas = [
	{
		titulo: 'Jazz Solo',
		artista: 'Petterson William',
		src: "musicas/Don't Fret - Quincas Moreira.mp3",
		img: 'imagens/jazz.jpg'
	},
	{
		titulo: 'Solo',
		artista: 'William',
		src: "musicas/Two Hearts - TrackTribe.mp3",
		img: 'imagens/jazz.jpg'
	}
];

let musica = document.querySelector("audio");
let indexMusica = 0;

let duracaoMusica = document.querySelector(".fim");
let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');

renderizarMusica(indexMusica);

//Eventos
document.querySelector(".botao-play").addEventListener("click", tocarMusica);
document.querySelector(".botao-pause").addEventListener("click", pausarMusica);
musica.addEventListener("timeupdate", atualizarBarra);

document.querySelector(".anterior").addEventListener("click", () => {
	indexMusica--;

	//tratando erro quando voltar as musicas. quando chegar ao fim da list. voltar ao ponto de inicio
	if (indexMusica < 0) {
		indexMusica = 1;
	}

	renderizarMusica(indexMusica);
});

document.querySelector(".proximo").addEventListener("click", () => {
	indexMusica++;

	//tratando erro quando passar as musicas. quando chegar ao fim da list. voltar ao ponto de inicio
	if (indexMusica > 0) {
		indexMusica = 1;
	}

	renderizarMusica(indexMusica);
});


// click de passar musica por cada index do array de musica
function renderizarMusica(index) {
	musica.setAttribute('src', musicas[index].src);
	musica.addEventListener('loadata', () => {
		nomeMusica.textContent = musicas[index].titulo;
		nomeArtista.textContent = musicas[index].artista;
		imagem.src = musicas[index].img;
		duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));

	});
}

//Funções
function tocarMusica() {
	musica.play();
	document.querySelector(".botao-pause").style.display = 'block';
	document.querySelector(".botao-play").style.display = 'none';
}

function pausarMusica() {
	musica.pause();
	document.querySelector(".botao-pause").style.display = 'none';
	document.querySelector(".botao-play").style.display = 'block';
}

function atualizarBarra() {
	let barra = document.querySelector('progress');

// PEGAMOS O TEMPO ATUAL DA MUSICA E DIVIDIMOS PELA DURAÇÃO, E MULTIPLICAMOS POR 100 PARA TER UM VALOR DECIMAL E COM MATH FLOOR ARREDONDAMOS PRA BAIXO PARA TER UM VALOR INTEIRO E CONCAT. COM PORCENTAGEM PARA TER UM VALOR INTEIRO E EM PORCENTAGEM
	barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';

// Formatando o tempo da musica de acordo com o andamento da mesma.
	let tempoDecorrido = document.querySelector('.inicio');

	tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function segundosParaMinutos(segundos) {
	const numeroFull = typeof segundos === 'number' && !isNaN(segundos);
	if (numeroFull) {
		let campoMinutos = Math.floor(segundos / 60);
		let campoSegundos = segundos % 60;

		if (campoSegundos < 10) {
			campoSegundos = '0' + campoSegundos;
		}

		return campoMinutos + ':' + campoSegundos;
	}
}
