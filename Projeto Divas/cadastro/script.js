document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio imediato do formulário

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    // Verifica se todos os campos estão preenchidos
    if (nome === "" || email === "" || senha === "") {
        document.getElementById('mensagem').innerText = "Por favor, preencha todos os campos.";
        document.getElementById('mensagem').style.color = "red";
        return;
    }

    // Verifica se o email é válido
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex simples para validação de email
    if (!emailPattern.test(email)) {
        document.getElementById('mensagem').innerText = "Por favor, insira um email válido.";
        document.getElementById('mensagem').style.color = "red";
        return;
    }

    // Enviar o formulário
    this.submit();
});

