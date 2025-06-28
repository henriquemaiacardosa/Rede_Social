document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formCadastro");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("password").value.trim();
    const repetirSenha = document.getElementById("repeat-password").value.trim();

    if (!nome || !email || !senha || !repetirSenha) {
      alert("Preencha todos os campos.");
      return;
    }

    if (senha !== repetirSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao cadastrar");
      }

      alert("Cadastro realizado com sucesso!");
      window.location.href = "login.html";

    } catch (err) {
      alert("Erro: " + err.message);
    }
  });
});
