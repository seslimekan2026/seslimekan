// --- PROFİL MODAL İŞLEMLERİ ---
function openProfileModal(name, age, avatar, bio) {
    document.getElementById('modalName').innerText = name;
    document.getElementById('modalAge').innerText = age + ' Yaşında';
    document.getElementById('modalAvatar').src = avatar;
    document.getElementById('modalBio').innerText = bio;
    document.getElementById('profileModal').classList.remove('hidden');
}

function closeProfileModal() {
    document.getElementById('profileModal').classList.add('hidden');
}

// Modal dışına tıklandığında kapatma
document.getElementById('profileModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeProfileModal();
    }
});

// --- YAZILI SOHBET (CHAT) MANTIĞI ---
function sendMessage(event) {
    event.preventDefault();
    const input = document.getElementById('messageInput');
    const messageText = input.value.trim();
    
    if (messageText === '') return;

    const chatContainer = document.getElementById('chatContainer');
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Yeni mesaj HTML yapısı
    const messageHTML = `
        <div class="flex items-start space-x-2.5 animate-fade-in">
            <img src="https://i.pravatar.cc/150?img=11" class="w-8 h-8 rounded-full object-cover cursor-pointer mt-1" onclick="openProfileModal('Ben', 24, 'https://i.pravatar.cc/150?img=11', 'Yeni katıldım, selamlar!')">
            <div>
                <div class="flex items-baseline space-x-2">
                    <span class="text-xs font-bold text-indigo-400 cursor-pointer hover:underline" onclick="openProfileModal('Ben', 24, 'https://i.pravatar.cc/150?img=11', 'Yeni katıldım, selamlar!')">Ben</span>
                    <span class="text-[10px] text-gray-500">${timeNow}</span>
                </div>
                <p class="bg-gray-800 text-gray-100 text-sm px-3 py-2 rounded-2xl rounded-tl-none mt-0.5 inline-block">${escapeHtml(messageText)}</p>
            </div>
        </div>
    `;

    chatContainer.insertAdjacentHTML('beforeend', messageHTML);
    input.value = '';
    
    // Otomatik en alta kaydır
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Güvenlik için basit HTML karakter koruması
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// --- SESLİ ODAYA KATILMA / MİKROFON KONTROLÜ ---
let isInVoice = false;

function toggleVoiceJoin() {
    const btn = document.getElementById('joinVoiceBtn');
    const muteBtn = document.getElementById('micMuteBtn');
    
    isInVoice = !isInVoice;

    if (isInVoice) {
        btn.innerHTML = `<i class="fa-solid fa-phone-slash"></i> <span>Sesten Ayrıl</span>`;
        btn.classList.remove('bg-indigo-600', 'hover:bg-indigo-500');
        btn.classList.add('bg-red-600', 'hover:bg-red-500');
        muteBtn.classList.remove('hidden');
        alert("Sese başarıyla katıldın! (Mikrofon simgesine basarak sesini açıp kapatabilirsin)");
    } else {
        btn.innerHTML = `<i class="fa-solid fa-microphone"></i> <span>Sese Katıl</span>`;
        btn.classList.remove('bg-red-600', 'hover:bg-red-500');
        btn.classList.add('bg-indigo-600', 'hover:bg-indigo-500');
        muteBtn.classList.add('hidden');
    }
}

let isMuted = false;
function toggleMute() {
    isMuted = !isMuted;
    const muteBtn = document.getElementById('micMuteBtn');
    if (isMuted) {
        muteBtn.innerHTML = `<i class="fa-solid fa-microphone-slash text-red-400"></i>`;
        muteBtn.classList.add('bg-red-900/50');
    } else {
        muteBtn.innerHTML = `<i class="fa-solid fa-microphone"></i>`;
        muteBtn.classList.remove('bg-red-900/50');
    }
}
