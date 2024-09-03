//mostrar senha
function mostrarSenha(num) {
    senha = document.getElementById(`senha${num}`);
    imgSenha = document.getElementById(`img-senha${num}`);

    if(senha.type === "password") {
        senha.type = "text";
        imgSenha.src = '/public/img/show.png';
    }
    else {
        senha.type = "password";
        imgSenha.src = '/public/img/hide.png';
    }
}


let photo = document.getElementById('labelFilme');
let file = document.getElementById('files-imagem');     
let modal = false;

// file.addEventListener('change', () => {

//     if (file.files.length == 0) {
//         return;
//     }

//     let reader = new FileReader();

//     reader.readAsDataURL(file.files[0]);
    

//     reader.onload = () => {
//         photo.src = reader.result;
//         console.log(reader.result);
//     }
// });

