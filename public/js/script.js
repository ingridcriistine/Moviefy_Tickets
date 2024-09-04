//mostrar senha
function mostrarSenha(num) {
    senha = document.getElementById(`senha${num}`);
    imgSenha = document.getElementById(`img-senha${num}`);

    if(senha.type === "password") {
        senha.type = "text";
        imgSenha.src = '/public/img/hide.png';
    }
    else {
        senha.type = "password";
        imgSenha.src = '/public/img/show.png';
    }
}


// const modal = false;

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

