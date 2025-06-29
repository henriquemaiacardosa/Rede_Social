document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("password").value.trim();

    if (!email || !senha) {
      const alerta = document.getElementById("alertaErro");
      alerta.textContent = "Preencha todos os campos.";
      alerta.style.display = "block";

      setTimeout(() => {
        alerta.style.display = "none";
      }, 4000);
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
        const alerta = document.getElementById("alertaErro");
        alerta.textContent = data.error || "Usuário não encontrado!";
        alerta.style.display = "block";

        setTimeout(() => {
          alerta.style.display = "none";
        }, 4000);
        
        return;
      }

      localStorage.setItem("token", data.token);
      window.location.href = "index.html"; 
    } catch (err) {
      console.error("Erro de rede: ", err.message);
    }
  });
});
