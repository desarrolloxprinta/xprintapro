import { createLayout } from '../layout.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getAreaTecnicaPostBySlug } from '../lib/supabase.js'

gsap.registerPlugin(ScrollTrigger)

export async function renderAreaTecnicaPost(slug = 'senalizacion-de-parkings') {
  const post = await getAreaTecnicaPostBySlug(slug)

  if (!post) {
    return await createLayout({
      content: `
        <div class="container" style="padding-top: 150px; text-align: center;">
          <h2>Artículo no encontrado</h2>
          <a href="/" class="btn-primary" style="margin-top: 2rem; display: inline-block;">Volver al inicio</a>
        </div>
      `,
      pageClass: 'page-404'
    })
  }

  const tocHTML = post.sections.map(section => `
    <li class="toc-item">
      <a href="#${section.id}" class="toc-link">${section.title}</a>
    </li>
  `).join('')

  const contentHTML = post.sections.map(section => `
    <div id="${section.id}" class="blog-section gsap-reveal">
      ${section.content}
    </div>
  `).join('')

  const audioHTML = post.audioUrl ? `
    <div class="custom-audio-wrapper gsap-reveal">
      <div class="custom-audio-glass">
        <div class="custom-audio-glow"></div>
        <div class="custom-audio-inner">
          <button class="custom-audio-playbtn" id="audio-play-btn" aria-label="Reproducir resumen">
            <svg class="icon-play" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <svg class="icon-pause" viewBox="0 0 24 24" fill="currentColor" style="display: none;"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
          </button>
          <div class="custom-audio-details">
            <span class="custom-audio-title">Escucha el resumen</span>
            <div class="custom-audio-track" id="audio-track">
              <div class="custom-audio-progress" id="audio-progress"></div>
            </div>
            <div class="custom-audio-time">
              <span id="audio-current-time">0:00</span> / <span id="audio-duration">0:00</span>
            </div>
          </div>
        </div>
      </div>
      <audio id="blog-audio-element" src="${post.audioUrl}" preload="metadata"></audio>
    </div>
  ` : '';

  const leadMagnetHTML = post.pdfUrl ? `
    <div class="lead-magnet-2026 gsap-reveal">
      <div class="lead-magnet-2026__bg-element"></div>
      <div class="lead-magnet-2026__content">
        <div class="lead-magnet-2026__header">
          <span class="lead-magnet-2026__badge">Material Exclusivo</span>
          <h3 class="lead-magnet-2026__title">Descarga el informe técnico en PDF</h3>
          <p class="lead-magnet-2026__desc">Accede a la guía detallada de este artículo con diagramas y mejores prácticas para aplicar en tu próximo proyecto.</p>
        </div>
        
        <form id="lead-magnet-form" class="lead-form-grid">
          <div class="lead-input-group">
            <input type="text" id="lm-name" class="lead-input" required placeholder=" ">
            <label class="lead-label" for="lm-name">Nombre y apellidos</label>
          </div>
          <div class="lead-input-group">
            <input type="text" id="lm-company" class="lead-input" required placeholder=" ">
            <label class="lead-label" for="lm-company">Empresa</label>
          </div>
          <div class="lead-input-group">
            <input type="email" id="lm-email" class="lead-input" required placeholder=" ">
            <label class="lead-label" for="lm-email">Email corporativo</label>
          </div>
          <div class="lead-input-group">
            <input type="tel" id="lm-phone" class="lead-input" required placeholder=" ">
            <label class="lead-label" for="lm-phone">Teléfono</label>
          </div>
          <button type="submit" class="lead-submit-btn">
            <span>Obtener Informe PDF</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </form>

        <div id="lead-magnet-success" class="lead-success-state">
          <div class="lead-success-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h4 class="lead-success-title">¡Todo listo!</h4>
          <a href="${post.pdfUrl}" target="_blank" class="lead-download-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Abrir PDF Ahora
          </a>
        </div>
      </div>
    </div>
  ` : '';

  const layoutHTML = `
    <main>
      <div class="nav-spacer"></div>

      <!-- Hero Header Section (Ignite Clone) -->
      <section class="section_blog-header">
        <div class="padding-global padding-section-large padding-bottom-none">
          <div class="blog-content_component">
            
            <div class="blog_header-top">
              <h1 class="blog-header_heading gsap-reveal">${post.title}</h1>
              <div class="spacer-xxlarge"></div>
            </div>
            
            <div class="blog_category gsap-reveal">
              <div>${post.category}</div>
            </div>
            
            <div class="blog_date gsap-reveal">
              <div>${post.date}</div>
            </div>

          </div>
        </div>
      </section>

      <!-- Intro Section (Ignite Clone) -->
      <section class="section_blog-intro">
        <div class="padding-global padding-section-medium">
          <div class="blog-content_component">
            <div class="blog-intro_text-wrapper">
              <div class="gsap-reveal">
                ${post.intro || "Un buen proyecto de señalización combina diferentes capas. Todas deben funcionar juntas y mantener una lógica visual coherente, adaptada tanto a vehículos como a peatones."}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Content Section -->
      <section class="blog-content-section">
        <div class="padding-global">
          <div class="blog-content_component">
            
            <!-- Sidebar: Table of Contents (Span 3) -->
            <div class="blog-content_content-left">
              ${audioHTML}
              <div class="post-content_sidebar-content">
                <h4 class="toc-title">Índice de contenidos</h4>
                <div class="post-content_link-content">
                  <div class="post-content_progress"></div>
                  <ul class="toc-list">
                    ${tocHTML}
                  </ul>
                </div>
              </div>
            </div>

            <!-- Main Content (Span 6, offset 4) -->
            <div class="blog-content_content">
              <article class="blog-main-content">
                ${post.heroVideo ? `<video src="${post.heroVideo}" class="blog-content-image gsap-reveal" autoplay loop muted playsinline></video>` : ''}
                ${contentHTML}
                ${leadMagnetHTML}
              </article>
            </div>
            
          </div>
        </div>
      </section>

    </main>
  `

  return await createLayout({
    content: layoutHTML,
    pageClass: 'page-area-tecnica'
  })
}

export function initAreaTecnicaPostAnimations() {
  setTimeout(() => {
    // 1. Reveal Animations
    const revealElements = document.querySelectorAll('.gsap-reveal')
    revealElements.forEach((el, index) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    // 2. Interactive TOC Logic
    const sections = document.querySelectorAll('.blog-section')
    const navLinks = document.querySelectorAll('.toc-link')
    const progressLine = document.querySelector('.post-content_progress')
    const tocContainer = document.querySelector('.post-content_link-content')

    if (tocContainer && progressLine) {
      const setProgressHeight = gsap.quickTo(progressLine, "height", { duration: 0.3, ease: "power2.out" })

      sections.forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onToggle: self => {
            if (self.isActive) {
              navLinks.forEach(link => link.classList.remove('w--current'))
              
              const currentLink = navLinks[i]
              if (currentLink) {
                currentLink.classList.add('w--current')
                const containerRect = tocContainer.getBoundingClientRect()
                const linkRect = currentLink.getBoundingClientRect()
                const targetHeight = (linkRect.top - containerRect.top) + (linkRect.height / 2)
                setProgressHeight(targetHeight)
              }
            }
          }
        })
      })
      
      // Smooth scroll
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault()
          const targetId = link.getAttribute('href')
          const targetSection = document.querySelector(targetId)
          if (targetSection) {
            window.scrollTo({ top: targetSection.offsetTop - 100, behavior: 'smooth' })
          }
        })
      })
    }

    // 3. Custom Audio Player Logic
    const audioEl = document.getElementById('blog-audio-element')
    const playBtn = document.getElementById('audio-play-btn')
    const progressBar = document.getElementById('audio-progress')
    const track = document.getElementById('audio-track')
    const currentTimeEl = document.getElementById('audio-current-time')
    const durationEl = document.getElementById('audio-duration')
    
    if (audioEl && playBtn) {
      const iconPlay = playBtn.querySelector('.icon-play')
      const iconPause = playBtn.querySelector('.icon-pause')

      const formatTime = (time) => {
        if (isNaN(time)) return '0:00'
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
      }

      audioEl.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audioEl.duration)
      })

      playBtn.addEventListener('click', () => {
        if (audioEl.paused) {
          audioEl.play()
          iconPlay.style.display = 'none'
          iconPause.style.display = 'block'
        } else {
          audioEl.pause()
          iconPlay.style.display = 'block'
          iconPause.style.display = 'none'
        }
      })

      audioEl.addEventListener('timeupdate', () => {
        const progress = (audioEl.currentTime / audioEl.duration) * 100
        progressBar.style.width = `${progress}%`
        currentTimeEl.textContent = formatTime(audioEl.currentTime)
      })

      track.addEventListener('click', (e) => {
        const rect = track.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const percent = clickX / rect.width
        audioEl.currentTime = percent * audioEl.duration
      })
      
      audioEl.addEventListener('ended', () => {
        iconPlay.style.display = 'block'
        iconPause.style.display = 'none'
        progressBar.style.width = '0%'
      })
    }

    // 4. Formulario Lead Magnet Logic
    const leadForm = document.getElementById('lead-magnet-form')
    const successMsg = document.getElementById('lead-magnet-success')
    const formContainer = document.querySelector('.lead-magnet-2026__content')
    
    if (leadForm && successMsg) {
      leadForm.addEventListener('submit', (e) => {
        e.preventDefault()
        
        const tl = gsap.timeline()
        tl.to(leadForm, { opacity: 0, y: -20, duration: 0.4 })
          .set(leadForm, { display: 'none' })
          .set(successMsg, { display: 'flex' })
          .fromTo(successMsg, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" })
      })
    }

    ScrollTrigger.refresh()
  }, 100)
}
