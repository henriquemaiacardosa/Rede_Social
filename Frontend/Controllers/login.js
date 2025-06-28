document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("password").value.trim();

    if (!email || !senha) {
      // Exibe erro na tela se quiser, mas não usa alert
      console.error("Preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.error || "Erro ao fazer login");
        return;
      }

      localStorage.setItem("token", data.token);
      window.location.href = "index.html"; // redireciona para o painel
    } catch (err) {
      console.error("Erro de rede: ", err.message);
    }
  });
});
