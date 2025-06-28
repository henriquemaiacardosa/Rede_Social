document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formCadastro");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Limpa mensagens anteriores
    document.getElementById("mensagemErro").classList.add("hidden");

    const nome = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("password").value.trim();
    const repetirSenha = document.getElementById("repeat-password").value.trim();

    if (!nome || !email || !senha || !repetirSenha) {
      mostrarMensagemErro("Preencha todos os campos.");
      return;
    }

    if (senha !== repetirSenha) {
      mostrarMensagemErro("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        mostrarMensagemErro(data.error || "Erro ao cadastrar");
        return;
      }


      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);

    } catch (err) {
      mostrarToast("Erro: " + err.message);
      mostrarMensagemErro("Erro: " + err.message);
    }
  });
});

// Toast no canto da tela
function mostrarToast(mensagem, tipo = "error") {
  const toast = document.getElementById("toast");
  toast.className = `toast ${tipo}`;
  toast.textContent = mensagem;
  toast.classList.add("show");
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hidden");
  }, 3000);
}

// Mensagem abaixo do botão
function mostrarMensagemErro(mensagem) {
  const erro = document.getElementById("mensagemErro");
  erro.textContent = mensagem;
  erro.classList.remove("hidden");
}
