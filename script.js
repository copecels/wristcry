
document.addEventListener('DOMContentLoaded', () => {
  const desktopLayer = document.getElementById('desktop-layer');
  let zIndexCounter = 100;

  const windowContents = {
    apologize: `
      <div class="inner-content" style="min-width:200px; max-width:280px;">
        <h3 style="margin-bottom:5px;">about me</h3>
        <p>hi im a 21 yo compsci student</p>
        <p>you can use any pronouns to me</p>
        <p>i literally dont care about that shit.</p>
      </div>
    `,
    saved: `
      <div class="inner-content">
        <h3>looking 4 me??</h3>
        <a href="https://x.com/user47392068" target="_blank" rel="noopener noreferrer">twitter</a><br>
        <a href="https://instagram.com/USERNAME" target="_blank" rel="noopener noreferrer">instagram</a><br>
        <a href="https://t.me/USERNAME" target="_blank" rel="noopener noreferrer">telegram</a><br>
        <a href="https://open.spotify.com/user/USERNAME" target="_blank" rel="noopener noreferrer">spotify</a>
      </div>
    `,
    forgive: `
      <div class="inner-content">
        <h3>more info about me</h3>
        <p>
        i dont have any dni list i just interact with whoever i want.
        please filter your own timeline :p.
        currently into girls und panzer, code geass,
        arknights, and invincible.
        still a wip site bc no time lol.
        also learning devops + networking :3
        </p>
      </div>
    `,
    forget: `
      <div class="inner-content audio-player">
        <p>Track 01 - Null.wav</p>
        <audio controls style="width:200px;height:30px;">
          <source src="assets/audio/placeholder.mp3" type="audio/mpeg">
        </audio>
      </div>
    `
  };

  function createWindow(title, contentKey, isError = false) {
    const win = document.createElement('div');
    win.className = 'win95-window dynamic-window';

    // SAFE QUERY
    const navEl = document.querySelector('.nav-links');
    const centerEl = document.querySelector('.center-stage');

    const navRect = navEl ? navEl.getBoundingClientRect() : null;
    const centerRect = centerEl ? centerEl.getBoundingClientRect() : null;

    let startX, startY;
    let isOverlapping = true;
    let attempts = 0;

    while (isOverlapping && attempts < 10) {
      startX = Math.random() * (window.innerWidth - 300);
      startY = Math.random() * (window.innerHeight - 200);

      const hitNav = navRect && (
        startX < navRect.right &&
        startX + 300 > navRect.left &&
        startY < navRect.bottom &&
        startY + 200 > navRect.top
      );

      const hitCenter = centerRect && (
        startX < centerRect.right &&
        startX + 300 > centerRect.left &&
        startY < centerRect.bottom &&
        startY + 200 > centerRect.top
      );

      if (!hitNav && !hitCenter) isOverlapping = false;
      attempts++;
    }

    win.style.left = `${startX}px`;
    win.style.top = `${startY}px`;
    win.style.zIndex = zIndexCounter++;

    if (isError) {
      win.innerHTML = `
        <div class="title-bar">
          <div class="title-text">Error</div>
          <button class="win-btn close-btn">X</button>
        </div>
        <div class="error-popup">
          ⚠️ Fatal Exception 0E at memory address 0x00000000
        </div>
      `;
    } else {
      win.innerHTML = `
        <div class="title-bar">
          <div class="title-text">
            <span class="icon">📁</span> ${title}
          </div>
          <div class="controls">
            <button class="win-btn min-btn">_</button>
            <button class="win-btn close-btn">X</button>
          </div>
        </div>
        <div class="window-content">
          ${windowContents[contentKey]}
        </div>
      `;
    }

    desktopLayer.appendChild(win);

    win.addEventListener('mousedown', () => {
      win.style.zIndex = zIndexCounter++;
    });

    const closeBtn = win.querySelector('.close-btn');
    if (closeBtn) closeBtn.onclick = () => win.remove();

    const minBtn = win.querySelector('.min-btn');
    if (minBtn) {
      minBtn.onclick = () => {
        const body = win.querySelector('.window-content');
        body.style.display =
          body.style.display === 'none' ? 'block' : 'none';
      };
    }

    makeDraggable(win);
  }

  function makeDraggable(el) {
    const header = el.querySelector('.title-bar');
    let dragging = false, offsetX = 0, offsetY = 0;

    function move(e) {
      if (!dragging) return;
      el.style.left = `${e.clientX - offsetX}px`;
      el.style.top = `${e.clientY - offsetY}px`;
    }

    function stop() {
      dragging = false;
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', stop);
    }

    header.addEventListener('mousedown', (e) => {
      dragging = true;
      const rect = el.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      el.style.zIndex = zIndexCounter++;

      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', stop);
    });
  }

  document.getElementById('btn-apologize')
    ?.addEventListener('click', e => {
      e.preventDefault();
      createWindow('Profile.exe', 'apologize');
    });

  document.getElementById('btn-saved')
    ?.addEventListener('click', e => {
      e.preventDefault();
      createWindow('Network.sys', 'saved');
    });

  document.getElementById('btn-forgive')
    ?.addEventListener('click', e => {
      e.preventDefault();
      createWindow('About.txt', 'forgive');
    });

  document.getElementById('btn-forget')
    ?.addEventListener('click', e => {
      e.preventDefault();
      createWindow('Media Player', 'forget');
    });

  document.getElementById('btn-pure')
    ?.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.dynamic-window')
        .forEach(win => {
          win.classList.add('fade-out');
          setTimeout(() => win.remove(), 500);
        });
    });

});