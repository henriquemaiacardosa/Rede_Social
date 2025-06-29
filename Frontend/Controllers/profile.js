document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (err) {
      return null;
    }
  }

  const payload = parseJwt(token);
  const usuarioId = payload?.id;

  if (!token || !usuarioId) {
    alert("Token inválido");
    localStorage.removeItem("token");
    window.location.href = "login.html";
    return;
  }

  // Buscar nome do usuário
  fetch(`http://localhost:3000/api/users/${usuarioId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((user) => {
      const nome = user.nome || "Usuário";
      document.querySelector(".profile-header").innerHTML = `<h2>${nome}</h2>`;
    });

  // Carregar metas do usuário
  const carregarMetas = () => {
    fetch("http://localhost:3000/api/goals/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((metas) => {
        const lista = document.getElementById("userGoals");
        lista.innerHTML = "";

        metas.forEach((meta) => {
          const li = document.createElement("li");
          li.classList.add("goal-item");

          const p = document.createElement("p");
          p.innerHTML = `<strong>${meta.titulo}</strong>: ${meta.descricao}`;

          const div = document.createElement("div");
          div.className = "goal-actions";

          const btnEdit = document.createElement("button");
          btnEdit.className = "btn-edit";
          btnEdit.textContent = "Editar";
          btnEdit.addEventListener("click", () => {
            document.getElementById("editId").value = meta.id;
            document.getElementById("editTitulo").value = meta.titulo;
            document.getElementById("editDescricao").value = meta.descricao;
            const modal = new bootstrap.Modal(document.getElementById("editModal"));
            modal.show();
          });

          const btnDelete = document.createElement("button");
          btnDelete.className = "btn-delete";
          btnDelete.textContent = "Excluir";
          btnDelete.addEventListener("click", () => excluirMeta(meta.id));

          div.appendChild(btnEdit);
          div.appendChild(btnDelete);

          li.appendChild(p);
          li.appendChild(div);

          lista.appendChild(li);
        });
      });
  };

  carregarMetas();

  // Editar meta
  document.getElementById("salvarEdicao").addEventListener("click", async () => {
    const id = document.getElementById("editId").value;
    const titulo = document.getElementById("editTitulo").value.trim();
    const descricao = document.getElementById("editDescricao").value.trim();

    if (!titulo || !descricao) return;

    try {
      await fetch(`http://localhost:3000/api/goals/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ titulo, descricao }),
      });

      bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
      carregarMetas();
    } catch (err) {
      console.error("Erro ao salvar edição:", err.message);
    }
  });

  // Excluir meta
  let metaIdParaExcluir = null;

  window.excluirMeta = (id) => {
    metaIdParaExcluir = id;
    document.getElementById("modalExcluir").classList.remove("hidden");
  };

  const modalExcluir = document.getElementById("modalExcluir");
  const btnCancelar = document.getElementById("cancelarExclusao");
  const btnConfirmar = document.getElementById("confirmarExclusao");

  btnCancelar.addEventListener("click", () => {
    modalExcluir.classList.add("hidden");
    metaIdParaExcluir = null;
  });

  btnConfirmar.addEventListener("click", async () => {
    if (!metaIdParaExcluir) return;

    try {
      await fetch(`http://localhost:3000/api/goals/${metaIdParaExcluir}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      modalExcluir.classList.add("hidden");
      metaIdParaExcluir = null;
      carregarMetas();
    } catch (err) {
      console.error("Erro ao excluir meta:", err.message);
    }
  });
});
