const postsContainer = document.getElementById("posts");
const form = document.getElementById("formPost");
const textarea = document.getElementById("textarea");
const userName = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");

const token = localStorage.getItem("token");
if (!token) window.location.href = "login.html";

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
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

// =================== VARIÁVEL GLOBAL DO NOME ===================
let nomeUsuarioLogado = "Usuário";

async function carregarUsuario() {
  try {
    const response = await fetch(`http://localhost:3000/api/usuarios/${usuarioId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Usuário não encontrado.");
    const usuario = await response.json();
    nomeUsuarioLogado = usuario.nome || "Usuário";

    if (userName) {
      userName.innerText = nomeUsuarioLogado;
    }
  } catch (err) {
    console.error("Erro ao carregar usuário:", err.message);
  }
}

// =================== MODAL EXCLUSÃO ===================
let comentarioIdParaExcluir = null;
let metaIdParaAtualizar = null;

function ativarModalExclusaoComentario(id, metaId) {
  comentarioIdParaExcluir = id;
  metaIdParaAtualizar = metaId;
  document.getElementById("modalExcluirComentario").classList.remove("hidden");
}

document.getElementById("confirmarExcluirComentario").onclick = async () => {
  if (!comentarioIdParaExcluir) return;
  try {
    await fetch(`http://localhost:3000/api/comment/${comentarioIdParaExcluir}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    document.getElementById("modalExcluirComentario").classList.add("hidden");
    await carregarComentarios(metaIdParaAtualizar);
  } catch {
    mostrarToast("Erro ao excluir comentário", "error");
  }
};
document.getElementById("cancelarExcluirComentario").onclick = () => {
  document.getElementById("modalExcluirComentario").classList.add("hidden");
};

// =================== COMENTÁRIOS ===================
function renderizarComentario(comentario, metaId) {
  const nome = comentario.usuario?.nome || "Anônimo";
  const li = document.createElement("li");
  li.classList.add("comentario");
  li.innerHTML = `
    <div class="comentario-cabecalho">
      <strong>${nome}</strong> comentou:
    </div>
    <p>${comentario.conteudo}</p>
    ${
      comentario.usuario_id === usuarioId
        ? `<button class="btn-excluir-comentario" data-id="${comentario.id}" data-meta="${metaId}">🗑</button>`
        : ""
    }
  `;
  return li;
}

async function carregarComentarios(metaId) {
  const container = document.getElementById(`comentarios-${metaId}`);
  container.innerHTML = "";
  try {
    const res = await fetch(`http://localhost:3000/api/comment/meta/${metaId}`);
    const comentarios = await res.json();

    comentarios.forEach(({ id, conteudo, usuario, usuario_id }) => {
  const nome = usuario?.nome || "Anônimo";

  const li = document.createElement("li");
  li.classList.add("comentario");
  li.innerHTML = `
    <div class="comentario-cabecalho">
      <strong>${nome}</strong> comentou:
    </div>
    <p>${conteudo}</p>
   ${String(usuario_id) === String(usuarioId)
  ? `<button class="btn-excluir-comentario" data-id="${id}" data-meta="${metaId}" title="Excluir comentário">
        <span class="icone-lixeira">🗑</span>
     </button>`
  : ''}
  `;
  container.appendChild(li);
});


    // atualizar botões excluir
    document.querySelectorAll(".btn-excluir-comentario").forEach((btn) => {
      btn.onclick = () => {
        ativarModalExclusaoComentario(
          btn.dataset.id,
          btn.dataset.meta
        );
      };
    });
  } catch (err) {
    console.error("Erro ao carregar comentários:", err);
  }
}


function ativarExclusao() {
  document.querySelectorAll(".btn-excluir-comentario").forEach((btn) => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      const metaId = btn.getAttribute("data-meta");
      ativarModalExclusaoComentario(id, metaId);
    };
  });
}

function ativarEnvioDeComentarios() {
  document.querySelectorAll(".form-comentario").forEach((form) => {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const metaId = form.getAttribute("data-meta-id");
      const input = form.querySelector(".comentario-input");
      const conteudo = input.value.trim();
      if (!conteudo) return;

      try {
        const response = await fetch("http://localhost:3000/api/comment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ meta_id: metaId, conteudo }),
        });

        const { data } = await response.json();
        if (!response.ok) throw new Error("Falha ao comentar");

        input.value = "";

        const comentario = data[0];
        comentario.usuario = { nome: nomeUsuarioLogado }; // adiciona nome manualmente
        const container = document.getElementById(`comentarios-${metaId}`);
        const novo = renderizarComentario(comentario, metaId);
        container.appendChild(novo);
        ativarExclusao();
      } catch (err) {
        mostrarToast("Erro ao comentar: " + err.message);
      }
    };
  });
}

// =================== METAS ===================
function renderizarMeta(meta) {
  const li = document.createElement("li");
  li.classList.add("post");

  li.innerHTML = `
    <div class="meta-card">
      <strong>${meta.usuario?.nome || "Anônimo"}</strong>
      <p>${meta.descricao}</p>
      
      <div class="incentivo-container">
        <button class="btn-apoiar" data-meta-id="${meta.id}">
          <img src="/apoio.svg" alt="Apoiar" class="icone-incentivo" />
        </button>
        <span id="incentivo-count-${meta.id}" class="contador-incentivo">${meta.incentivos || 0}</span>
      </div>

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
      countSpan.innerText = parseInt(countSpan.innerText) + 1;

      btn.disabled = true;
    } catch (err) {
      mostrarToast("Você já apoiou esta meta", "error");
    }
  });
}


async function carregarMetas() {
  try {
    const response = await fetch("http://localhost:3000/api/goals", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const metas = await response.json();

    postsContainer.innerHTML = "";
    metas.forEach(renderizarMeta);
  } catch (err) {
    console.error("Erro ao carregar metas:", err.message);
  }
}

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
      body: JSON.stringify({ titulo: "Meta", descricao: texto }),
    });

    textarea.value = "";
    await carregarMetas();
  } catch (err) {
    console.error("Erro ao publicar meta:", err.message);
  }
});

function mostrarToast(mensagem, tipo = "error") {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.className = `toast ${tipo}`;
  toast.innerText = mensagem;
  toast.classList.add("show");
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hidden");
  }, 3000);
}

carregarUsuario();
carregarMetas();
