"export const renderProyectoTemplate = (data) => `
  <!-- HERO -->
  <section class="project-hero" style="position: relative; width: 100%; height: 100vh; overflow: hidden; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 8vh;">
    ${data.hero.video ? `
    <video autoplay muted loop playsinline style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; filter: brightness(0.7);">
      <source src="${data.hero.video}" type="video/mp4" />
    </video>
    ` : `
    <img src="${data.hero.image}" alt="${data.title}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; filter: brightness(0.7);" />
    `}
    <div class="project-hero-content gsap-reveal" style="position: relative; z-index: 1; text-align: center; color: #FFFFFF; max-width: 1200px; padding: 0 2rem;">
      <h1 style="font-family: var(--font-family-serif); font-size: clamp(4rem, 10vw, 9rem); font-weight: 400; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: -0.02em;">${data.title}</h1>
      <p style="font-size: clamp(1.2rem, 2.5vw, 2rem); font-weight: 300; opacity: 0.9; max-width: 800px; margin: 0 auto; text-shadow: 0 2px 10px rgba(0,0,0,0.5);">${data.hero.subtitle}</p>
    </div>
  </section>

  <!-- META BENTO -->
  <section class="project-meta" style="padding: 6rem 4vw; background-color: var(--color-secondary); color: var(--color-primary);">
    <div class="container-fluid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1px; background: rgba(0,0,0,0.05); border-top: 1px solid rgba(0,0,0,0.05); border-bottom: 1px solid rgba(0,0,0,0.05);">
      
      <div class="meta-item gsap-bento-item" style="background: var(--color-secondary); padding: 4rem 2rem; display: flex; flex-direction: column; justify-content: space-between;">
        <span class="text-caption" style="color: var(--color-text-muted); text-transform: upperc
<truncated 11880 bytes>