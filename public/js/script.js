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
const iconTheme = document.getElementById("img-theme");
const btnTheme = document.getElementById("btn-theme");
const iconBack = document.getElementById("icon-back");
const btnBack = document.getElementById("btn-back");

function darkMode() {
    
    let cardFilme;
    let cardTitle;
    let cardText;
    let cardClass;
    const lightActive = body.style.backgroundColor == "white";
    
    if(lightActive) {
        body.style.backgroundColor = "rgb(23, 28, 37)";
        body.style.color = "white";
        main.style.color = "white";
        homeTituloFilme.style.color = "white";
        homeTituloFranquia.style.color = "white";
        setaFilme.style.fill = "white";
        setaFranquia.style.fill = "white";
        carousel.className = "carousel carousel-filmes slide";
        iconTheme.src = "img/light-mode-white.png";
        btnTheme.style.backgroundColor = "#0d1117";
        btnTheme.style.borderColor = "white";
        iconBack.src = "img/seta-white.png";
        btnBack.style.backgroundColor = "#0d1117";
        btnBack.style.borderColor = "white";
        
        for(let i = 0; i < 10; i++) {
            cardFilme = document.getElementById(`card-filme${i}`);
            cardTitle = document.getElementById(`card-title${i}`);
            cardText = document.getElementById(`card-text${i}`);
            cardClass = document.getElementById(`card-class${i}`);
            cardFilme.style.backgroundColor = "#282d33";
            cardFilme.style.borderColor = "white";
            cardFilme.style.color = "white";
            cardTitle.style.color = "white";
            cardText.style.color = "white";
            cardClass.style.color = "white";
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
        iconTheme.src = "img/dark-mode-black.png";
        btnTheme.style.backgroundColor = "white";
        btnTheme.style.borderColor = "black";
        iconBack.src = "img/seta-black.png";
        btnBack.style.backgroundColor = "white";
        btnBack.style.borderColor = "black";
        
        for(let i = 0; i < 10; i++) {
            cardFilme = document.getElementById(`card-filme${i}`);
            cardTitle = document.getElementById(`card-title${i}`);
            cardText = document.getElementById(`card-text${i}`);
            cardClass = document.getElementById(`card-class${i}`);
            cardFilme.style.backgroundColor = "white";
            cardFilme.style.borderColor = "black";
            cardTitle.style.color = "black";
            cardText.style.color = "black";
            cardClass.style.color = "black";
        }
        
        lightActive = true;
    }
}

//modal perfil
const perfil = document.getElementById("perfil");
const modalPerfil = document.getElementById("modal-perfil");
const bgModal = document.getElementById("background-modal");
const tituloModal = document.getElementById("titulo-modal");
const userModal = document.getElementById("user-modal");

function atualizarCadastro() {
    perfil.style.display = "none";
    modalPerfil.style.display = "block";
    modalPerfil.style.marginLeft = "5%";
    modalPerfil.style.marginTop = "9%";
    modalPerfil.style.width = "100%";
    userModal.style.boxShadow = "black 0px 10px 10px";
    tituloModal.style.boxShadow = "black 0px 5px 5px";
    // bgModal.style.opacity = "0.5";
    // bgModal.style.zIndex = "0";
    // modalPerfil.style.zIndex = "10";
    // modalPerfil.style.opacity = "1";
}

function cancelar() {
    perfil.style.display = "flex";
    modalPerfil.style.display = "none";
}

