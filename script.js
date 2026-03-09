document.addEventListener('DOMContentLoaded', () => {

    // 1. SMART TIME-BASED GREETING 🕒
    const heroGreeting = document.getElementById('hero-greeting');
    const heroSubtext = document.getElementById('hero-subtext');
    const heroTitle = document.querySelector('.hero h1'); 
    
    if (heroGreeting && heroSubtext && heroTitle) {
        const currentHour = new Date().getHours();
        heroTitle.innerText = "SUPRA Restaurant"; 
        if (currentHour >= 5 && currentHour < 12) {
            heroGreeting.innerText = "RISE AND DINE";
            heroSubtext.innerText = "Start your day with authentic Kumbakonam flavors & crispy dosas.";
        } else if (currentHour >= 12 && currentHour < 17) {
            heroGreeting.innerText = "A ROYAL MIDDAY FEAST";
            heroSubtext.innerText = "Indulge in our signature Biryanis and traditional South Indian meals.";
        } else if (currentHour >= 17 && currentHour < 22) {
            heroGreeting.innerText = "EVENING ELEGANCE";
            heroSubtext.innerText = "Experience the true Soul of South under the evening lights.";
        } else {
            heroGreeting.innerText = "FLAVORS OF THE NIGHT";
            heroSubtext.innerText = "The night is young. Satisfy your soul with our hot & spicy specials.";
        }
    }

    // 2. SOULFUL AMBIANCE PLAYER 🎵
    const bgMusic = document.getElementById('bg-music');
    const musicPlayerBtn = document.getElementById('music-player');
    const recordIcon = musicPlayerBtn.querySelector('.record-icon');
    let isPlaying = false;

    musicPlayerBtn.addEventListener('click', () => {
        if(isPlaying) { bgMusic.pause(); recordIcon.classList.remove('spinning'); } 
        else { bgMusic.play().catch(e => console.log("Audio play failed:", e)); recordIcon.classList.add('spinning'); }
        isPlaying = !isPlaying;
    });

    // 3. ENHANCED SCRATCH CARD DISCOUNT LOGIC 💳
    setTimeout(() => {
        document.getElementById('splash-screen').style.opacity = '0';
        setTimeout(() => { 
            document.getElementById('splash-screen').style.display = 'none'; 
            document.getElementById('offer-modal').style.display = 'flex';
            initScratchCard(); 
        }, 1000);
    }, 2000);

    function initScratchCard() {
        const canvas = document.getElementById('scratch-card');
        const claimBtn = document.getElementById('claim-offer-btn');
        if(canvas) {
            const ctx = canvas.getContext('2d');
            // Responsive width based on container
            const container = document.getElementById('scratch-container');
            canvas.width = container.offsetWidth; 
            canvas.height = container.offsetHeight;
            
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = '#c5a880';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Text alignment logic for perfect centering
            ctx.font = 'bold 24px Lato';
            ctx.fillStyle = '#111';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('✨ Scratch Here ✨', canvas.width / 2, canvas.height / 2);

            let isDragging = false;
            let scratchedPixels = 0;
            const totalPixels = canvas.width * canvas.height;

            const scratch = (e) => {
                if(!isDragging) return;
                
                // Stop the glowing pulse animation once they start scratching!
                container.style.animation = 'none';

                const rect = canvas.getBoundingClientRect();
                const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
                const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

                ctx.globalCompositeOperation = 'destination-out';
                ctx.beginPath();
                ctx.arc(x, y, 20, 0, Math.PI * 2);
                ctx.fill();

                scratchedPixels += Math.PI * 20 * 20;
                // Reveal code after 40% is scratched
                if(scratchedPixels > totalPixels * 0.4) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    claimBtn.style.display = 'block';
                    canvas.style.pointerEvents = 'none'; 
                }
            };

            canvas.addEventListener('mousedown', () => isDragging = true);
            canvas.addEventListener('mouseup', () => isDragging = false);
            canvas.addEventListener('mousemove', scratch);
            canvas.addEventListener('touchstart', () => isDragging = true);
            canvas.addEventListener('touchend', () => isDragging = false);
            canvas.addEventListener('touchmove', scratch);
        }
    }

    document.querySelector('.close-modal').addEventListener('click', () => document.getElementById('offer-modal').style.display = 'none');
    document.getElementById('claim-offer-btn').addEventListener('click', () => {
        alert("Awesome! 50% OFF Coupon 'FIRSTSUPRA' applied to your cart.");
        document.getElementById('offer-modal').style.display = 'none';
        discountActive = true;
        updateCartUI(); 
    });

    // 4. INTERACTIVE VISUAL TABLE BOOKING 🪑 
    const tables = document.querySelectorAll('.table');
    const tableInput = document.getElementById('selected-table-input');
    
    tables.forEach(table => {
        table.addEventListener('click', () => {
            tables.forEach(t => t.classList.remove('selected'));
            table.classList.add('selected');
            tableInput.value = table.getAttribute('data-table');
        });
    });

    const bookingForm = document.getElementById('bookingForm');
    if(bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const nameInput = bookingForm.querySelectorAll('input[type="text"]')[1];
            if(!tableInput.value) { alert("Please select a table from the Visual Map first! 🪑"); return; }

            const btn = bookingForm.querySelector('.btn-solid');
            const originalText = btn.innerText;
            btn.innerText = "Processing...";
            btn.style.opacity = "0.8";

            setTimeout(() => {
                alert(`🎉 Success, ${nameInput.value || 'Guest'}! Your ${tableInput.value} has been officially reserved. We will call you shortly to confirm.`);
                bookingForm.reset();
                tables.forEach(t => t.classList.remove('selected'));
                btn.innerText = "RESERVED ✔";
                btn.style.background = "#25D366"; 
                btn.style.color = "#fff";
                btn.style.opacity = "1";
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = "var(--gold)";
                    btn.style.color = "#000";
                }, 3000);
            }, 1200);
        });
    }

    // 5. SMOOTH EMOJI CURSOR TRAIL ✨
    document.addEventListener('mousemove', function(e) {
        let spark = document.createElement('div');
        spark.innerHTML = '✨'; 
        spark.classList.add('emoji-spark');
        spark.style.left = e.clientX + 'px'; 
        spark.style.top = e.clientY + 'px';
        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 800);
    });

    // 6. DARK/LIGHT MODE TOGGLE 🌓
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        if(document.body.classList.contains('light-mode')) { themeBtn.innerHTML = '<i class="fas fa-moon"></i>'; } 
        else { themeBtn.innerHTML = '<i class="fas fa-sun"></i>'; }
    });

    // 7. AOS & NAVBAR
    AOS.init({ duration: 1000, once: false });
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.style.top = '0';
            nav.style.background = document.body.classList.contains('light-mode') ? 'rgba(255, 255, 255, 0.98)' : 'rgba(10, 10, 10, 0.98)';
        } else {
            nav.style.top = '35px'; 
            nav.style.background = 'linear-gradient(rgba(0,0,0,0.9), transparent)';
        }
    });

    // 8. AI FOOD RECOMMENDER BOT 🤖
    const aiBtn = document.getElementById('ai-bot-btn');
    const aiWindow = document.getElementById('ai-bot-window');
    const aiInput = document.getElementById('ai-input');
    const aiBody = document.getElementById('ai-body');

    aiBtn.addEventListener('click', () => aiWindow.style.display = aiWindow.style.display === 'flex' ? 'none' : 'flex');
    document.getElementById('close-ai').addEventListener('click', () => aiWindow.style.display = 'none');

    document.getElementById('ai-send').addEventListener('click', handleAiLogic);
    aiInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') handleAiLogic(); });

    function handleAiLogic() {
        let val = aiInput.value.toLowerCase().trim();
        if(!val) return;
        aiBody.innerHTML += `<p class="user-msg">${val}</p>`;
        aiInput.value = '';
        aiBody.scrollTop = aiBody.scrollHeight;

        let reply = "I highly recommend our SUPRA Special Biryani! It fixes everything! 🍗🔥";
        if(val.includes('sad') || val.includes('cry')) reply = "Don't be sad! Have our hot Chicken Biryani to instantly boost your mood! 😍";
        else if(val.includes('happy') || val.includes('good')) reply = "Awesome! Celebrate this moment with our sweet & cold Madurai Jigarthanda! 🥤✨";
        else if(val.includes('tired') || val.includes('work')) reply = "Wake up and refresh with our strong Kumbakonam Filter Coffee! ☕💪";
        else if(val.includes('hungry')) reply = "Perfect! Our Mutton Mandi or Non-Veg Meals will satisfy your big appetite! 🍛🍖";
        
        setTimeout(() => {
            aiBody.innerHTML += `<p class="bot-msg">${reply}</p>`;
            aiBody.scrollTop = aiBody.scrollHeight;
        }, 800);
    }

    // 9. LIVE CART LOGIC 🛒
    let cart = [];
    let total = 0;
    let discountActive = false;

    document.getElementById('cart-icon').addEventListener('click', () => document.getElementById('cart-sidebar').classList.add('open'));
    document.getElementById('close-cart').addEventListener('click', () => document.getElementById('cart-sidebar').classList.remove('open'));

    document.querySelectorAll('.add-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            cart.push({ name: btn.getAttribute('data-name'), price: parseInt(btn.getAttribute('data-price')) });
            updateCartUI();
            btn.innerText = "✓ Added";
            setTimeout(() => btn.innerText = "Add to Cart", 1000);
        });
    });

    function updateCartUI() {
        document.getElementById('cart-count').innerText = cart.length;
        total = cart.reduce((sum, item) => sum + item.price, 0);
        let displayTotal = total;
        if(discountActive && total > 0) displayTotal = total * 0.5; 
        document.getElementById('total-price').innerText = displayTotal + (discountActive ? " (50% Off)" : "");
        
        const container = document.getElementById('cart-items');
        if(cart.length === 0) {
            container.innerHTML = '<p style="color: #888; text-align: center; margin-top: 50px;">Your cart is empty.</p>';
            return;
        }
        container.innerHTML = cart.map(item => `<div class="cart-item"><span>${item.name}</span><span style="color:var(--gold)">₹${item.price}</span></div>`).join('');
    }

    // 10. LIVE TRACKING MODAL 📍
    const trackModal = document.getElementById('tracking-modal');
    document.getElementById('close-tracking').addEventListener('click', () => trackModal.style.display = 'none');

    document.getElementById('checkout-btn').addEventListener('click', () => {
        if(cart.length === 0) { alert('Your cart is empty! Add some delicious food first.'); return; }
        
        document.getElementById('cart-sidebar').classList.remove('open');
        trackModal.style.display = 'flex';
        
        document.getElementById('line-1').classList.remove('active');
        document.getElementById('track-step-2').classList.remove('active');
        document.getElementById('line-2').classList.remove('active');
        document.getElementById('track-step-3').classList.remove('active');

        setTimeout(() => { document.getElementById('line-1').classList.add('active'); document.getElementById('track-step-2').classList.add('active'); }, 2500); 
        setTimeout(() => { document.getElementById('line-2').classList.add('active'); document.getElementById('track-step-3').classList.add('active'); }, 5500); 
    });

    // 11. REVIEW SYSTEM ⭐
    let currentSlide = 0;
    const slides = document.querySelectorAll('.review-slide');
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 4000);

    const reviewModal = document.getElementById('review-modal');
    document.getElementById('write-review-btn').addEventListener('click', () => reviewModal.style.display = 'flex');
    document.querySelector('.close-review').addEventListener('click', () => reviewModal.style.display = 'none');

    let userRating = 0;
    const stars = document.querySelectorAll('.interactive-stars i');
    stars.forEach(star => {
        star.addEventListener('click', (e) => {
            userRating = e.target.getAttribute('data-value');
            stars.forEach(s => s.classList.remove('active'));
            for(let i=0; i<userRating; i++) { stars[i].classList.add('active'); }
        });
    });

    document.getElementById('submit-review-btn').addEventListener('click', () => {
        if(document.getElementById('reviewer-name').value && document.getElementById('review-text').value && userRating > 0) {
            alert("Thank you! Your review has been submitted for approval.");
            reviewModal.style.display = 'none';
        } else alert("Please provide a rating, name, and review.");
    });
});