<script>
    import { onMount, tick, onDestroy } from 'svelte';
    
    let eras = [
        { era: "Origins and Early Development", styleClass: "arpanet" },           // 1960s–70s
        { era: "Birth of the Internet", styleClass: "birth-internet" },            // 1980s
        { era: "Rise of the World Wide Web", styleClass: "early-web" },            // Early 1990s
        { era: "Dot-com Boom", styleClass: "dotcom" },                              // Late 1990s
        { era: "Web 2.0 and Social Media", styleClass: "web-2-0" },                 // 2000s
        { era: "Mobile and Cloud Era", styleClass: "mobile-cloud" },               // 2010s
        { era: "Post-Modern Internet", styleClass: "post-modern" },                // 2020s
        { era: "The Future of the Internet", styleClass: "future" }                 // Beyond 2025
    ];

    let currentStyle = eras[0].styleClass;
    let articleContent = '';

    function getMostVisibleEraSection() {
        if (typeof window === 'undefined') return currentStyle; // Avoid code running server-side
        const sections = document.querySelectorAll('section.era');
        let maxVisible = 0;
        let dominantClass = currentStyle;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));

            if (visibleHeight > maxVisible) {
                maxVisible = visibleHeight;
                for (const era of eras) {
                    if (section.classList.contains(era.styleClass)) {
                        dominantClass = era.styleClass;
                        break;
                    }
                }
            }
        });

        return dominantClass;
    }

    function handleScroll() {
        const dominantStyle = getMostVisibleEraSection();
        if (dominantStyle !== currentStyle) {
            currentStyle = dominantStyle;
        }
    }

    onMount(async () => {
        const response = await fetch('/article.html');
        articleContent = await response.text();

        // Wait for content to render and be part of the DOM
        await tick();

        // Attach scroll listener only if in the browser
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll);
            window.addEventListener('resize', handleScroll); // Handle window resize
            handleScroll(); // Initial run to detect dominant section
        }
    });

    onDestroy(() => {
        // Cleanup event listeners when the component is destroyed
        if (typeof window !== 'undefined') {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        }
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="/styles.css" />
    <link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Georgia&display=swap" rel="stylesheet" />
</svelte:head>

<main class={currentStyle}>
    {@html articleContent}
</main>
