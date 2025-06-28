const postsContainer = document.getElementById("posts");
const form = document.getElementById("formPost");
const textarea = document.getElementById("textarea");
const userName = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

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

if (!usuarioId) {
  alert("Token inválido. Faça login novamente.");
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});

async function carregarUsuario() {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${usuarioId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Usuário não encontrado.");

    const usuario = await response.json();
    userName.innerText = usuario.nome || "Usuário";
  } catch (err) {
    console.error("Erro ao carregar usuário:", err.message);
    userName.innerText = "Usuário";
  }
}

// =================== COMENTÁRIOS ===================

function renderizarComentarios(metaId, comentarios, container) {
  container.innerHTML = "";
  comentarios.forEach((comentario) => {
    const li = document.createElement("li");
    li.textContent = comentario.conteudo;
    container.appendChild(li);
  });
}

async function carregarComentarios(metaId) {
  const container = document.getElementById(`comentarios-${metaId}`);
  if (!container) return;

  try {
    const res = await fetch(`http://localhost:3000/api/comment/meta/${metaId}`);
    const comentarios = await res.json();
    renderizarComentarios(metaId, comentarios, container);
  } catch (error) {
    console.error("Erro ao carregar comentários:", error);
  }
}

function ativarEnvioDeComentarios() {
  document.querySelectorAll(".form-comentario").forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const metaId = form.getAttribute("data-meta-id");
      const input = form.querySelector(".comentario-input");
      const conteudo = input.value.trim();

      if (!conteudo) return;

      try {
        const response = await fetch("http://localhost:3000/api/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ meta_id: metaId, conteudo }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error);

        input.value = "";
        const comentariosContainer = document.getElementById(`comentarios-${metaId}`);
        const novoComentario = document.createElement("li");
        novoComentario.textContent = conteudo;
        comentariosContainer.appendChild(novoComentario);
      } catch (err) {
        alert("Erro ao comentar: " + err.message);
      }
    });
  });
}

function renderizarMeta(meta) {
  const li = document.createElement("li");
  li.classList.add("post");

  li.innerHTML = `
    <div class="meta-card">
      <strong>${meta.usuario?.nome || "Anônimo"}</strong>
      <p>${meta.descricao}</p>
      <small>Incentivos: <span id="incentivo-count-${meta.id}">${meta.incentivos || 0}</span></small>
      <br />
      <button class="btn-apoiar" data-meta-id="${meta.id}">Apoiar</button>

      <form class="form-comentario" data-meta-id="${meta.id}">
        <input type="text" class="comentario-input" placeholder="Escreva um comentário..." required />
        <button type="submit">Comentar</button>
      </form>
      <ul class="comentarios-lista" id="comentarios-${meta.id}"></ul>
    </div>
  `;

  postsContainer.appendChild(li);
  carregarComentarios(meta.id);
  ativarEnvioDeComentarios();

  const btn = li.querySelector(".btn-apoiar");
  btn.addEventListener("click", async () => {
    try {
      const response = await fetch("http://localhost:3000/api/incentive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ meta_id: meta.id }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao incentivar");

      const countSpan = document.getElementById(`incentivo-count-${meta.id}`);
      const novoValor = parseInt(countSpan.innerText) + 1;
      countSpan.innerText = novoValor;

      btn.disabled = true;
      btn.innerText = "Apoiado!";
    } catch (err) {
mostrarToast("Você já apoiou esta meta", "error");    }
  });
}

// =================== METAS ===================

async function carregarMetas() {
  try {
    const response = await fetch("http://localhost:3000/api/goals", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const metas = await response.json();

    if (!Array.isArray(metas)) {
      console.error("Erro: dados recebidos não são uma lista de metas", metas);
      return;
    }

    postsContainer.innerHTML = "";

    metas.forEach((meta) => {
      renderizarMeta(meta);
    });
  } catch (err) {
    console.error("Erro ao carregar metas:", err.message);
  }
}

// Publicar nova meta
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const texto = textarea.value.trim();

  if (!texto) return;

  try {
    await fetch("http://localhost:3000/api/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        titulo: "Meta",
        descricao: texto,
      }),
    });

    textarea.value = "";
    await carregarMetas(); // Recarrega o feed após publicar
  } catch (err) {
    console.error("Erro ao publicar meta:", err.message);
  }
});

// Inicialização
carregarUsuario();
carregarMetas();

function mostrarToast(mensagem, tipo = "error") {
  const toast = document.getElementById("toast");
  toast.className = `toast ${tipo}`;
  toast.innerText = mensagem;
  toast.classList.add("show");
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hidden");
  }, 3000);
}



