const $ = (s, el = document) => el.querySelector(s); const $$ = (s, el = document) => [...el.querySelectorAll(s)];

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const today = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

function applyTheme(choice) {
    const dark = choice === 'dark' || (choice === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
    $$('[data-theme]').forEach(b => b.setAttribute('aria-pressed', b.dataset.theme === choice)); }  $$
('[data-theme]').forEach(b => b.addEventListener('click', () => {
    localStorage.setItem('tf-theme', b.dataset.theme);
    applyTheme(b.dataset.theme);
}));

applyTheme(localStorage.getItem('tf-theme') || 'system');

let sidebarOpen = false, modalOpen = false;
const lockScroll = () => document.body.classList.toggle('overflow-hidden', sidebarOpen || modalOpen);

const sidebar = $('#sidebar'), overlay = $('#overlay'), openBtn = $('#openSidebar');
const desktop = matchMedia('(min-width: 1024px)');

function toggleSidebar(open) {
    sidebarOpen = open;
    sidebar.classList.toggle('-translate-x-full', !open);
    overlay.classList.toggle('opacity-0', !open);
    overlay.classList.toggle('pointer-events-none', !open);
    openBtn.setAttribute('aria-expanded', open);
    sidebar.inert = !open && !desktop.matches;
    lockScroll();
    if (open) $('#closeSidebar').focus();
}

openBtn.addEventListener('click', () => toggleSidebar(true));
$('#closeSidebar').addEventListener('click', () => { toggleSidebar(false); openBtn.focus(); }); overlay.addEventListener('click', () => toggleSidebar(false)); $$('#sidebar nav a').forEach(a => a.addEventListener('click', () => toggleSidebar(false)));
desktop.addEventListener('change', () => toggleSidebar(false));
toggleSidebar(false);

const userBtn = $('#userBtn'), userMenu = $('#userMenu');

function toggleMenu(open) {
    userMenu.classList.toggle('invisible', !open);
    userMenu.classList.toggle('opacity-0', !open);
    userMenu.classList.toggle('scale-95', !open);
    userBtn.setAttribute('aria-expanded', open);
}

userBtn.addEventListener('click', e => {
    e.stopPropagation();
    toggleMenu(userBtn.getAttribute('aria-expanded') !== 'true');
});

document.addEventListener('click', e => { 
    if (!userMenu.contains(e.target)) toggleMenu(false); 
});

const CAT = {
    Produto: 'bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
    Infraestrutura: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300',
    Design: 'bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
    Dados: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
    Marketing: 'bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300'
};

const PRIO = {
    Alta: { dot: 'bg-red-500', text: 'text-red-700 dark:text-red-300' },
    Média: { dot: 'bg-amber-500', text: 'text-amber-700 dark:text-amber-300' },
    Baixa: { dot: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-300' }
};

const projects = [
    { nome: 'Novo checkout da loja', responsavel: 'Marina Costa', categoria: 'Produto', prioridade: 'Alta', prazo: '2026-10-09', descricao: 'Reescrita do fluxo de pagamento com Pix, carteiras digitais e recuperação de carrinho. A meta é reduzir o abandono em 20% até o fim do trimestre.' },
    { nome: 'Migração de dados para a nuvem', responsavel: 'Rafael Lima', categoria: 'Infraestrutura', prioridade: 'Alta', prazo: '2026-10-08', descricao: 'Move os bancos legados para a nova região sem janela de indisponibilidade.' },
    { nome: 'Biblioteca de componentes', responsavel: 'Júlia Andrade', categoria: 'Design', prioridade: 'Média', prazo: '2026-10-30', descricao: 'Tokens, componentes e documentação compartilhados entre web e app.' },
    { nome: 'Painel de métricas para clientes', responsavel: 'Pedro Nogueira', categoria: 'Dados', prioridade: 'Média', prazo: '2026-11-20', descricao: 'Relatórios self-service com filtros por período, equipe e canal.' },
    { nome: 'Campanha de lançamento Q4', responsavel: 'Camila Torres', categoria: 'Marketing', prioridade: 'Baixa', prazo: '2026-12-05', descricao: 'Plano de mídia e conteúdo para o lançamento de dezembro.' },
    { nome: 'Auditoria de acessibilidade', responsavel: 'Júlia Andrade', categoria: 'Produto', prioridade: 'Média', prazo: '2026-11-14', descricao: 'Revisão WCAG 2.2 AA em todas as telas do app, com correção dos pontos críticos e relatório final por equipe.' }
];

const SLOTS = [
    'sm:col-span-2 xl:col-span-2 xl:row-span-2',
    '', '', '', '', 
    'sm:col-span-2 xl:col-span-4'
];

const slot = i => (i < SLOTS.length ? SLOTS[i] : '');
const initials = n => n.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
const fmt = d => new Date(d + 'T00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '');

function card(p, i) {
    const big = i === 0, wide = i === 5, pr = PRIO[p.prioridade];
    return `
  <article class="project-card group flex flex-col justify-between gap-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg focus-within:border-blue-400 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/60 ${big ? 'sm:p-7' : ''} ${wide ? 'xl:flex-row xl:items-center' : ''} ${slot(i)}">
    <div class="flex flex-col gap-3 ${wide ? 'xl:max-w-3xl' : ''}">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <span class="rounded-md px-2.5 py-1 text-xs font-semibold ${CAT[p.categoria] || CAT.Produto}">${esc(p.categoria)}</span>
        <span class="flex items-center gap-1.5 text-xs font-medium ${pr.text}" title="Prioridade ${esc(p.prioridade.toLowerCase())}">
          <i class="h-2 w-2 rounded-full ${pr.dot}"></i>${esc(p.prioridade)}
        </span>
      </div>
      <h3 class="font-semibold leading-snug tracking-tight transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 ${big ? 'text-2xl xl:text-3xl' : 'text-lg'}">${esc(p.nome)}</h3>
      <p class="text-sm text-slate-500 dark:text-slate-400 ${big ? 'xl:text-base' : 'line-clamp-3'}">${esc(p.descricao)}</p>
    </div>
    <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-sm dark:border-slate-800 ${wide ? 'xl:shrink-0 xl:justify-end xl:gap-8 xl:border-t-0 xl:pt-0' : ''}">
      <span class="flex items-center gap-2 font-medium">
        <span class="grid h-7 w-7 place-items-center rounded-full bg-blue-100 text-[11px] font-semibold text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">${esc(initials(p.responsavel))}</span>${esc(p.responsavel)}
      </span>
      <span class="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
        ${fmt(p.prazo)}
      </span>
    </div>
  </article>`;
}

const grid = $('#projectGrid');

function render(list = projects) {
    grid.innerHTML = list.map(card).join('');
    $('#emptyState').classList.toggle('hidden', list.length > 0);
    $('#resultCount').textContent = `${list.length} ${list.length === 1 ? 'projeto' : 'projetos'}`;
}

$('#search').addEventListener('input', e => {
    const q = e.target.value.trim().toLowerCase();
    render(projects.filter(p => `${p.nome} ${p.responsavel} ${p.categoria}`.toLowerCase().includes(q)));
});

render();

const modal = $('#modal'), panel = $('#modalPanel'), form = $('#projectForm'), submitBtn = $('#submitBtn');
let lastFocus;

function toggleModal(open) {
    if (open === modalOpen) return;
    modalOpen = open;
    if (open) lastFocus = document.activeElement;
    modal.classList.toggle('invisible', !open);
    modal.classList.toggle('opacity-0', !open);
    panel.classList.toggle('translate-y-6', !open);
    lockScroll();
    if (open) {
        $('#prazo').min = today();
        setTimeout(() => $('#nome').focus(), 50);
    } else if (lastFocus) {
        lastFocus.focus();
    }
}

$('#newProjectBtn').addEventListener('click', () => toggleModal(true));
['#closeModal', '#cancelModal', '#modalBackdrop'].forEach(s => $(s).addEventListener('click', () => toggleModal(false)));

document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (userBtn.getAttribute('aria-expanded') === 'true') { toggleMenu(false); userBtn.focus(); return; }
    if (sidebarOpen) { toggleSidebar(false); openBtn.focus(); return; }
    toggleModal(false);
});

$('#descricao').addEventListener('input', e => $('#descCount').textContent = `${e.target.value.length}/200`);

let toastTimer;

function toast(text) {
    const t = $('#toast');
    clearTimeout(toastTimer);
    t.textContent = text;
    t.classList.remove('invisible', 'opacity-0', 'translate-y-4');
    toastTimer = setTimeout(() => {
        t.classList.add('opacity-0', 'translate-y-4');
        setTimeout(() => t.classList.add('invisible'), 300);
    }, 2800);
}

form.addEventListener('submit', e => {
    e.preventDefault();

    let isValid = true;

    const setErro = (idInput, idMsg, condicaoDeErro) => {
        const input = document.getElementById(idInput);
        const msg = document.getElementById(idMsg);
        
        if (condicaoDeErro) {
            input.classList.remove('border-slate-300', 'focus:border-blue-600');
            input.classList.add('border-red-500', 'focus:border-red-500');
            msg.classList.remove('hidden');
            isValid = false;
        } else {
            input.classList.add('border-slate-300', 'focus:border-blue-600');
            input.classList.remove('border-red-500', 'focus:border-red-500');
            msg.classList.add('hidden');
        }
    };

    const nomeVal = document.getElementById('nome').value.trim();
    setErro('nome', 'erro-nome', nomeVal.length < 3);

    const respVal = document.getElementById('responsavel').value;
    setErro('responsavel', 'erro-responsavel', respVal === "");

    const catVal = document.getElementById('categoria').value;
    setErro('categoria', 'erro-categoria', catVal === "");

    const prazoVal = document.getElementById('prazo').value;
    setErro('prazo', 'erro-prazo', prazoVal === "");

    const descVal = document.getElementById('descricao').value.trim();
    setErro('descricao', 'erro-descricao', descVal.length < 10);

    const prioridadeSelecionada = document.querySelector('input[name="prioridade"]:checked');
    const erroPrioridade = document.getElementById('erro-prioridade');
    
    if (!prioridadeSelecionada) {
        erroPrioridade.classList.remove('hidden');
        isValid = false;
    } else {
        erroPrioridade.classList.add('hidden');
    }

    if (!isValid) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Criando…';

    setTimeout(() => {
        projects.push({ 
            nome: nomeVal, 
            responsavel: respVal, 
            categoria: catVal, 
            prioridade: prioridadeSelecionada.value, 
            prazo: prazoVal, 
            descricao: descVal 
        });

        $('#search').value = '';
        render();
        
        $('#kpiAtivos').textContent = +$('#kpiAtivos').textContent + 1;

        form.reset();
        $('#descCount').textContent = '0/200';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Criar projeto';

        toggleModal(false);
        toast('Projeto criado com sucesso.');

        const added = grid.lastElementChild;
        added.scrollIntoView({ behavior: 'smooth', block: 'center' });
        added.classList.add('ring-2', 'ring-blue-500');
        setTimeout(() => added.classList.remove('ring-2', 'ring-blue-500'), 2500);
    }, 700);
});