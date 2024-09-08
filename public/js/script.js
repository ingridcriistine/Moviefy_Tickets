//mostrar senha
function mostrarSenha(num) {
    senha = document.getElementById(`senha${num}`);
    imgSenha = document.getElementById(`img-senha${num}`);

    if(senha.type === "password") {
        senha.type = "text";
        imgSenha.src = '/img/hide.png';
    }
    else {
        senha.type = "password";
        imgSenha.src = '/img/show.png';
    }
}

//alterar imagem do input de cadastro de filme
function UpdateImgFilme(){

    const labelFilme = document.getElementById('labelFilme');
    const imgFilme= document.getElementById('files-imagem');   

    if (imgFilme.files.length == 0) {
        return;
    }

    let reader = new FileReader();

    reader.readAsDataURL(imgFilme.files[0]);
    

    reader.onload = () => {
        labelFilme.src = reader.result;
        console.log(reader.result);
    }
};

//alterar imagem do input de cadastro do cinema
function UpdateImgCinema(){

    const labelCinema = document.getElementById('labelCinema');
    const imgCinema = document.getElementById('files-imagem');  

    if (imgCinema.files.length == 0) {
        return;
    }

    let reader = new FileReader();

    reader.readAsDataURL(imgCinema.files[0]);
    

    reader.onload = () => {
        labelCinema.src = reader.result;
        console.log(reader.result);
    }
};

//botão de quantidade
//barra de pesquisa

//atualizar cadastro

function atualizarCadastro() {
    const modalPerfil = getElementById("modal-atualizar-perfil");
    const cancelar = getElementById("cancelar-atualizacao");
    const backgroundModal = getElementById("background-modal");
    
    modalPerfil.style.display = 'block';
    modalPerfil.style.z = 3;
    backgroundModal.style.opacity = 0.9;
}

//nome usuario 

//dark mode
const body = document.getElementById("body");
const main = document.getElementById("main");
const homeTituloFilme = document.getElementById("home-titulo-filme");
const homeTituloFranquia = document.getElementById("home-titulo-franquia");
const carousel = document.getElementById("carouselExampleCards");
const setaFilme = document.getElementById("seta-titulo-filme");
const setaFranquia = document.getElementById("seta-titulo-franquia");

function darkMode() {
    
    let cardFilme;
    const lightActive = body.style.backgroundColor == "white";
    
    if(lightActive) {
        body.style.backgroundColor = "#0d1117";
        body.style.color = "white";
        main.style.color = "white";
        homeTituloFilme.style.color = "white";
        homeTituloFranquia.style.color = "white";
        setaFilme.style.fill = "white";
        setaFranquia.style.fill = "white";
        carousel.className = "carousel carousel-filmes slide";
        
        for(let i = 1; i < 10; i++) {
            cardFilme = document.getElementById(`card-filme${i}`);
            cardFilme.style.background = "#953C4C";
        }
    }
    
    else {
        carousel.className = "carousel carousel-filmes carousel-dark slide";
        body.style.backgroundColor = "white";
        body.style.color = "black";
        main.style.color = "black";
        homeTituloFilme.style.color = "black";
        homeTituloFranquia.style.color = "black";
        setaFilme.style.fill = "black";
        setaFranquia.style.fill = "black";
        lightActive = true;
        
        for(let i = 1; i < 10; i++) {
            cardFilme = document.getElementById(`card-filme${i}`);
            cardFilme.style.background = "white";
        }
    }
    
}