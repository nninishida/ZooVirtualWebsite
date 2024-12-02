// Carregar os comentários salvos no localStorage ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    loadComments();
});

document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir o envio do formulário

    const name = document.getElementById('name').value;
    const commentText = document.getElementById('commentText').value;
    const commentImage = document.getElementById('commentImage').files[0];

    if (commentText.trim() !== '' || commentImage) {
        if (commentImage) {
            const reader = new FileReader();
            reader.onload = function(e) {
                addComment(name, commentText, e.target.result); // Adiciona o comentário com a imagem base64
            };
            reader.readAsDataURL(commentImage);
        } else {
            addComment(name, commentText, null); // Adiciona o comentário sem imagem
        }
        document.getElementById('name').value = '';
        document.getElementById('commentText').value = ''; // Limpar o campo de texto
        document.getElementById('commentImage').value = ''; // Limpar o campo de imagem
    }
});

function addComment(name, commentText, image, index = null) {
    const commentList = document.getElementById('commentList');

    // Criar o item de comentário
    const newComment = document.createElement('li');

    // Adicionar o nome do usuário
    const nameContent = document.createElement('span');
    nameContent.textContent = 'Nome: ' + name; // Exibe o nome do usuário
    nameContent.classList.add('comment-name');
    newComment.appendChild(nameContent);

    // Adicionar o conteúdo do comentário
    const commentContent = document.createElement('p');
    commentContent.textContent = commentText; // Exibe o texto do comentário
    newComment.appendChild(commentContent);

    // Adicionar imagem, se existir
    if (image) {
        const commentImage = document.createElement('img');
        commentImage.src = image;
        commentImage.classList.add('comment-image');
        newComment.appendChild(commentImage);
    }

    // Criar o botão de excluir
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('comment-buttons');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Excluir';
    deleteButton.addEventListener('click', function() {
        deleteComment(index);
    });

    buttonsDiv.appendChild(deleteButton);

    // Adicionar os botões ao item da lista
    newComment.appendChild(buttonsDiv);
    commentList.appendChild(newComment);

    if (index === null) {
        saveCommentToLocalStorage(name, commentText, image);
    }
}

function saveCommentToLocalStorage(name, commentText, image) {
    let comments = localStorage.getItem('comments');
    if (!comments) {
        comments = [];
    } else {
        comments = JSON.parse(comments);
    }

    comments.push({ name, text: commentText, image });
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments() {
    let comments = localStorage.getItem('comments');
    if (comments) {
        comments = JSON.parse(comments);
        comments.forEach(function(comment, index) {
            addComment(comment.name, comment.text, comment.image, index);
        });
    }
}

function deleteComment(index) {
    let comments = localStorage.getItem('comments');
    if (comments) {
        comments = JSON.parse(comments);
        comments.splice(index, 1);
        localStorage.setItem('comments', JSON.stringify(comments));
        reloadComments();
    }
}

function reloadComments() {
    document.getElementById('commentList').innerHTML = '';
    loadComments();
}

// Função para rolar para o topo da página
const backToTopBtn = document.getElementById('backToTopBtn');

// Mostrar o botão quando o usuário rolar para baixo
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
};

// Voltar ao topo quando o botão for clicado
backToTopBtn.addEventListener('click', function() {
    // Scroll suave até o topo, usando behavior: 'smooth'
    window.scrollTo({
        top: 0,
        left: 0,  // Também pode ser importante garantir o eixo horizontal
        behavior: 'smooth' // Rolar suavemente
    });
});
