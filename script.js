document.addEventListener('DOMContentLoaded', () => {
    // 1. Elemente abrufen
    const carouselContainer = document.querySelector('.carousel-container');
    const prevButton = document.querySelector('.carousel-nav-prev');
    const nextButton = document.querySelector('.carousel-nav-next');
    const items = document.querySelectorAll('.carousel-item');
    
    if (!carouselContainer || items.length === 0 || !prevButton || !nextButton) {
        console.error("Fehler: Karussell-Elemente fehlen. Kann den 2D-Slider nicht initialisieren.");
        return;
    }

    // 2. Konfigurationsvariablen für den 2D-Slider
    const totalItems = items.length; // Gesamtanzahl der Videos (7)
    
    // Die effektive Breite pro Element (568px width + 2*10px padding = 588px)
    const itemWidth = 588; 
    
    let currentIndex = 0; 

    // 3. Funktion zum Verschieben des Karussells
    function updateSlider() {
        // Führt die Verschiebung durch
        const offset = -currentIndex * itemWidth;
        carouselContainer.style.transform = `translateX(${offset}px)`;
        
        // Passt die Pfeil-Sichtbarkeit an
        prevButton.style.opacity = currentIndex === 0 ? '0.4' : '1';
        
        // Stoppt bei Index 5 (totalItems - 2)
        nextButton.style.opacity = currentIndex >= totalItems - 2 ? '0.4' : '1'; 
    }

    // 4. Pfeil nach rechts (Nächstes Video)
    nextButton.addEventListener('click', () => {
        // Lässt nur scrollen, solange der Index kleiner als 5 ist
        if (currentIndex < totalItems - 2) { 
            currentIndex++; 
            updateSlider();
        }
    });

    // 5. Pfeil nach links (Vorheriges Video)
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--; 
            updateSlider();
        }
    });

    // Initialisierung des Sliders
    updateSlider(); 
    
    // -------------------------------------------------------------------
    // ✅ NEUER & KRITISCHER TEIL: Lade-Mechanismus für die IFrames
    // -------------------------------------------------------------------
    // Behebt den Fehler 153 und inkonsistentes Laden durch verzögertes Setzen des src-Attributs
    const allIframes = document.querySelectorAll('.carousel-item iframe');
    allIframes.forEach(iframe => {
        // Holt die korrekte URL aus dem data-src Attribut
        const videoSrc = iframe.getAttribute('data-src');
        if (videoSrc) {
            // Setzt das src-Attribut. Dies erzwingt den Ladevorgang des Videos.
            iframe.setAttribute('src', videoSrc);
        }
    });
});