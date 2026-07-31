// ===================================================
// CONFIGURAÇÃO DA API
// ===================================================
const API_BASE_URL = "https://meu-projeto-api-w5z9.onrender.com";

// ===================================================
// FUNÇÃO: Preenche os slots do álbum com imagens da API
// ===================================================
async function preencherFigurinhas() {
    try {
        const response = await fetch(`${API_BASE_URL}/figurinhas`);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const figurinhas = await response.json();

        // Mapeamento numérico garantido
        const porId = new Map(figurinhas.map(f => [Number(f.id), f]));

        // Seleção dos slots presentes no DOM
        const slots = document.querySelectorAll(".sticker-slot");

        slots.forEach(slot => {
            const slotNumeroEl = slot.querySelector(".slot-number");
            if (!slotNumeroEl) return;

            // Extrai apenas os dígitos numéricos (imune a espaços, quebras de linha e o caractere #)
            const match = slotNumeroEl.textContent.match(/\d+/);
            if (!match) return;

            const id = parseInt(match[0], 10);
            if (!porId.has(id)) return;

            const figurinha = porId.get(id);

            // Previne inserção duplicada caso a função seja reexecutada
            if (slot.querySelector(".sticker-img")) return;

            const img = document.createElement("img");
            img.className = "sticker-img";
            img.alt = figurinha.nome;

            // Handlers definidos ANTES da atribuição do src (evita race condition)
            img.onload = () => {
                slot.classList.add("slot-preenchido");
            };

            img.onerror = () => {
                console.warn(`[API] Falha ao carregar a imagem da figurinha ID ${id}: ${figurinha.nome}`);
            };

            // Concatenação estrita: Domínio Base + Rota Relativa da Imagem
            img.src = `${API_BASE_URL}${figurinha.imagem_url}`;

            slot.insertBefore(img, slot.firstChild);
        });

        console.log(`✅ [API] ${figurinhas.length} figurinhas processadas com sucesso.`);

    } catch (erro) {
        console.error("⚠️ [API] Erro durante a integração com o backend:", erro.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const bookElement = document.getElementById("book");
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");
    const soundToggle = document.getElementById("sound-toggle");
    const iconOn = soundToggle?.querySelector(".sound-icon-on");
    const iconOff = soundToggle?.querySelector(".sound-icon-off");

    let isMuted = false;
    let pageFlip = null;

    try {
        // 1. Inicializa o StPageFlip imediatamente para garantir a renderização da interface
        pageFlip = new St.PageFlip(bookElement, {
            width: 550,
            height: 800,
            size: "stretch",
            minWidth: 315,
            maxWidth: 1000,
            minHeight: 420,
            maxHeight: 1350,
            drawShadow: true,
            maxShadowOpacity: 0.4,
            showCover: true,
            mobileScrollSupport: true,
            useMouseEvents: false,
            showPageCorners: false,
            disableFlipByClick: true,
            flippingTime: 800
        });

        pageFlip.loadFromHTML(document.querySelectorAll(".page"));
        bookElement.style.display = "block";

        // 2. Chama o preenchimento das figurinhas de forma assíncrona (não bloqueante)
        preencherFigurinhas();

        // 3. Lógica de manipulação de gestos / arraste
        let activeDragPage = null;
        let isClicking = false;
        let startX = 0;
        let startY = 0;
        let dragStarted = false;

        document.querySelectorAll(".page").forEach((page, index) => {
            page.addEventListener("mousedown", (e) => {
                if (e.target.closest("button") || e.target.closest("a")) return;
                isClicking = true;
                startX = e.clientX;
                startY = e.clientY;
                dragStarted = false;
                activeDragPage = { page, index };
            });

            page.addEventListener("touchstart", (e) => {
                if (e.target.closest("button") || e.target.closest("a")) return;
                const touch = e.touches[0];
                isClicking = true;
                startX = touch.clientX;
                startY = touch.clientY;
                dragStarted = false;
                activeDragPage = { page, index };
            });
        });

        const handleMove = (clientX, clientY, isTouch = false) => {
            if (!isClicking || !activeDragPage) return;
            
            const deltaX = clientX - startX;
            const deltaY = clientY - startY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            const bookRect = bookElement.getBoundingClientRect();

            if (distance > 10 && !dragStarted) {
                dragStarted = true;
                let cornerX, cornerY;
                
                const centerY = bookRect.top + bookRect.height / 2;
                cornerY = (startY < centerY) ? 0 : bookRect.height;
                cornerX = (activeDragPage.index % 2 === 0) ? bookRect.width : 0;
                
                document.body.classList.add("dragging");
                pageFlip.startUserTouch({ x: cornerX, y: cornerY });
            }
            
            if (dragStarted) {
                const relX = clientX - bookRect.left;
                const relY = clientY - bookRect.top;
                pageFlip.userMove({ x: relX, y: relY }, isTouch);
            }
        };

        const handleRelease = (clientX, clientY, isTouch = false) => {
            if (dragStarted) {
                const bookRect = bookElement.getBoundingClientRect();
                const relX = clientX - bookRect.left;
                const relY = clientY - bookRect.top;
                pageFlip.userStop({ x: relX, y: relY }, isTouch);
            }
            isClicking = false;
            dragStarted = false;
            activeDragPage = null;
            document.body.classList.remove("dragging");
        };

        window.addEventListener("mousemove", (e) => handleMove(e.clientX, e.clientY, false));
        window.addEventListener("touchmove", (e) => {
            if (e.touches.length > 0) handleMove(e.touches[0].clientX, e.touches[0].clientY, true);
        });

        window.addEventListener("mouseup", (e) => handleRelease(e.clientX, e.clientY, false));
        window.addEventListener("touchend", (e) => {
            const touch = e.changedTouches[0] || e.touches[0];
            handleRelease(touch ? touch.clientX : startX, touch ? touch.clientY : startY, true);
        });

    } catch (error) {
        console.error("Erro ao inicializar biblioteca StPageFlip:", error);
    }

    // 4. Síntese do Som de Folhear (Web Audio API)
    function playPaperTurnSound() {
        if (isMuted) return;

        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;

            const audioCtx = new AudioContext();
            const duration = 0.45;
            const sampleRate = audioCtx.sampleRate;
            const bufferSize = sampleRate * duration;
            const buffer = audioCtx.createBuffer(1, bufferSize, sampleRate);
            const data = buffer.getChannelData(0);

            for (let i = 0; i < bufferSize; i++) {
                const progress = i / bufferSize;
                const noise = Math.random() * 2 - 1;
                const envelope = (progress < 0.3) ? (progress / 0.3) : ((1 - progress) / 0.7);
                const paperCrackle = Math.random() > 0.985 ? (Math.random() * 2 - 1) * 0.35 : 0;
                data[i] = (noise * 0.65 + paperCrackle) * envelope * 0.12;
            }

            const noiseNode = audioCtx.createBufferSource();
            noiseNode.buffer = buffer;

            const bandpassFilter = audioCtx.createBiquadFilter();
            bandpassFilter.type = "bandpass";
            bandpassFilter.Q.value = 2.0;
            bandpassFilter.frequency.setValueAtTime(1500, audioCtx.currentTime);
            bandpassFilter.frequency.exponentialRampToValueAtTime(350, audioCtx.currentTime + duration);

            const lowpassFilter = audioCtx.createBiquadFilter();
            lowpassFilter.type = "lowpass";
            lowpassFilter.frequency.setValueAtTime(3800, audioCtx.currentTime);

            noiseNode.connect(bandpassFilter);
            bandpassFilter.connect(lowpassFilter);
            lowpassFilter.connect(audioCtx.destination);

            noiseNode.start();
        } catch (e) {
            console.warn("Falha ao reproduzir áudio:", e);
        }
    }

    // 5. Controles de Áudio
    if (soundToggle) {
        soundToggle.addEventListener("click", () => {
            isMuted = !isMuted;
            if (iconOn && iconOff) {
                iconOn.classList.toggle("hidden", isMuted);
                iconOff.classList.toggle("hidden", !isMuted);
            }
        });
    }

    // 6. Controles de Navegação
    if (pageFlip) {
        pageFlip.on("changeState", (e) => {
            if (e.data === "flipping") playPaperTurnSound();
        });

        pageFlip.on("flip", (e) => {
            const currentPage = e.data;
            const totalPages = pageFlip.getPageCount();

            if (btnPrev) btnPrev.classList.toggle("hidden", currentPage === 0);
            if (btnNext) btnNext.classList.toggle("hidden", currentPage === totalPages - 1);
        });

        if (btnPrev) btnPrev.addEventListener("click", () => pageFlip.flipPrev());
        if (btnNext) btnNext.addEventListener("click", () => pageFlip.flipNext());

        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") pageFlip.flipPrev();
            if (e.key === "ArrowRight") pageFlip.flipNext();
        });

        if (btnPrev) btnPrev.classList.add("hidden");
    }
});