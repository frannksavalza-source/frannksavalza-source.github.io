(() => {
  const PROJECT_ID = "project-06";
  const DETAIL_ID = "her-life-detail";
  let lastTrigger = null;
  let previousBodyOverflow = "";
  let backgroundState = null;

  const detailMarkup = `
    <div class="mario-detail__topbar">
      <button class="mario-detail__back" type="button" data-close-her-life>
        <span aria-hidden="true">←</span>
        返回项目
      </button>
      <span class="mario-detail__index">项目作品 · 06</span>
    </div>
    <div class="mario-detail__content">
      <header class="mario-detail__hero">
        <span class="mario-detail__number" aria-hidden="true">06</span>
        <div>
          <p class="mario-detail__eyebrow">AI VIDEO · FAMILY DRAMA</p>
          <h1 id="her-life-title">《不扫兴的父母》</h1>
        </div>
      </header>

      <p class="mario-detail__lead">
        从亲戚饭桌上的一句句催婚追问开始，用克制的近景、暖色室内光线与递进对白，
        呈现两代人在一次家庭聚餐中的正面交锋——以及父母最终站在女儿这边的“反向催婚”。
      </p>

      <dl class="mario-detail__facts" aria-label="作品信息">
        <div><dt>类型</dt><dd>家庭 / 现实题材</dd></div>
        <div><dt>片长</dt><dd>00:31</dd></div>
        <div><dt>规格</dt><dd>16:9 · 720P</dd></div>
        <div><dt>形式</dt><dd>AI 剧情短片</dd></div>
      </dl>

      <section class="mario-detail__section" aria-labelledby="her-life-video-heading">
        <div class="mario-detail__section-title">
          <span aria-hidden="true"></span>
          <h2 id="her-life-video-heading">视频预览</h2>
        </div>
        <div class="mario-detail__video-frame">
          <video controls playsinline preload="metadata" poster="./covers/her-life-poster.jpg" aria-label="播放《不扫兴的父母》完整视频">
            <source src="./videos/her-life.web.mp4" type="video/mp4" />
            您的浏览器暂不支持视频播放，请更换浏览器后重试。
          </video>
        </div>
      </section>

      <div class="mario-detail__story-grid">
        <section class="mario-detail__copy" aria-labelledby="her-life-overview-heading">
          <p class="mario-detail__kicker">01 · 项目概述</p>
          <h2 id="her-life-overview-heading">一张饭桌，一场催婚攻防战</h2>
          <p>
            短片把代际观念冲突浓缩在一次家庭聚餐中：亲戚的追问逐步加码，
            父母却反过来替女儿挡下压力。情绪从克制走向坚定，
            让“不扫兴的父母”这一态度在半分钟内完成清晰转折。
          </p>
        </section>
        <aside class="mario-detail__focus" aria-label="制作重点">
          <p class="mario-detail__kicker">制作重点</p>
          <ul>
            <li>角色一致性</li>
            <li>台词节奏</li>
            <li>情绪反差</li>
            <li>镜头衔接</li>
          </ul>
        </aside>
      </div>

      <section class="mario-detail__section" aria-labelledby="her-life-stills-heading">
        <div class="mario-detail__section-title">
          <span aria-hidden="true"></span>
          <h2 id="her-life-stills-heading">关键画面</h2>
        </div>
        <div class="mario-detail__stills">
          <figure>
            <img src="./covers/her-life-01.jpg" alt="女儿低头紧握双手的压抑近景" loading="lazy" />
            <figcaption>群像压力下的个人情绪落点</figcaption>
          </figure>
          <figure>
            <img src="./covers/her-life-02.jpg" alt="父亲郑重表达立场的近景画面" loading="lazy" />
            <figcaption>父亲的态度转折成为全片记忆点</figcaption>
          </figure>
        </div>
      </section>

      <section class="mario-detail__copy mario-detail__copy--wide" aria-labelledby="her-life-camera-heading">
        <p class="mario-detail__kicker">02 · 叙事与镜头</p>
        <h2 id="her-life-camera-heading">让镜头距离跟着冲突一起收紧</h2>
        <p>
          开场以饭桌群像建立家庭关系，中段切入人物近景强化追问压力，
          结尾把视觉重心交给父母，让坚定的回答成为全片记忆点。
          统一的暖色饭桌光线保留生活感，也让这场“反向催婚”更显真实。
        </p>
      </section>
    </div>
  `;

  const closeDetail = () => {
    const detail = document.getElementById(DETAIL_ID);
    if (!detail) return;

    const video = detail.querySelector("video");
    if (video) video.pause();
    detail.classList.add("is-closing");

    window.setTimeout(() => {
      detail.remove();
      document.body.style.overflow = previousBodyOverflow;
      if (backgroundState?.root) {
        backgroundState.root.inert = backgroundState.hadInert;
        if (backgroundState.ariaHidden === null) {
          backgroundState.root.removeAttribute("aria-hidden");
        } else {
          backgroundState.root.setAttribute("aria-hidden", backgroundState.ariaHidden);
        }
      }
      backgroundState = null;
      lastTrigger?.focus();
      lastTrigger = null;
    }, 260);
  };

  const onDetailKeydown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeDetail();
      return;
    }

    if (event.key !== "Tab") return;
    const detail = document.getElementById(DETAIL_ID);
    if (!detail) return;
    const focusable = Array.from(
      detail.querySelectorAll('button:not([disabled]), video[controls], a[href], [tabindex]:not([tabindex="-1"])'),
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const openDetail = (trigger) => {
    if (document.getElementById(DETAIL_ID)) return;
    lastTrigger = trigger;
    previousBodyOverflow = document.body.style.overflow;

    const detail = document.createElement("div");
    detail.id = DETAIL_ID;
    detail.className = "mario-detail";
    detail.setAttribute("role", "dialog");
    detail.setAttribute("aria-modal", "true");
    detail.setAttribute("aria-labelledby", "her-life-title");
    detail.setAttribute("tabindex", "-1");
    detail.innerHTML = detailMarkup;
    detail.addEventListener("keydown", onDetailKeydown);
    detail.querySelectorAll("[data-close-her-life]").forEach((button) => {
      button.addEventListener("click", closeDetail);
    });

    document.body.appendChild(detail);
    document.body.style.overflow = "hidden";
    const appRoot = document.getElementById("root");
    if (appRoot) {
      backgroundState = {
        root: appRoot,
        hadInert: appRoot.inert,
        ariaHidden: appRoot.getAttribute("aria-hidden"),
      };
      appRoot.inert = true;
      appRoot.setAttribute("aria-hidden", "true");
    }
    window.requestAnimationFrame(() => {
      detail.classList.add("is-open");
      detail.querySelector("[data-close-her-life]")?.focus();
    });
  };

  const createProjectCard = () => {
    if (document.getElementById(PROJECT_ID)) return true;

    const projects = document.querySelector("section#projects");
    if (!projects) return false;
    const stack = Array.from(projects.children).find(
      (child) => child.tagName === "DIV" && child.classList.contains("relative"),
    );
    if (!stack) return false;

    const shell = document.createElement("div");
    shell.id = PROJECT_ID;
    shell.className = "mario-six-shell";
    shell.innerHTML = `
      <article class="mario-six-card" aria-labelledby="project-06-title">
        <div class="mario-six-card__header">
          <div class="mario-six-card__identity">
            <span class="mario-six-card__number" aria-hidden="true">06</span>
            <div>
              <p class="mario-six-card__eyebrow">AI VIDEO · FAMILY DRAMA</p>
              <h3 id="project-06-title">AI 家庭剧情短片</h3>
              <p class="mario-six-card__meta"><span aria-hidden="true"></span>含视频预览 · 00:31</p>
            </div>
          </div>
          <button class="mario-six-card__detail-button" type="button" data-open-her-life aria-haspopup="dialog" aria-controls="her-life-detail">
            <span>查看详情</span><span aria-hidden="true">↗</span>
          </button>
        </div>

        <button class="mario-six-card__visual" type="button" data-open-her-life aria-haspopup="dialog" aria-controls="her-life-detail" aria-label="查看《不扫兴的父母》作品详情">
          <img src="./covers/her-life-poster.jpg" alt="《不扫兴的父母》家庭剧情短片海报画面" loading="lazy" />
          <span class="mario-six-card__shade" aria-hidden="true"></span>
          <span class="mario-six-card__play" aria-hidden="true"><span></span></span>
          <span class="mario-six-card__caption">
            <strong>《不扫兴的父母》</strong>
            <small>饭桌上的催婚攻防战</small>
          </span>
        </button>
      </article>
    `;

    shell.querySelectorAll("[data-open-her-life]").forEach((button) => {
      button.addEventListener("click", () => openDetail(button));
    });
    stack.appendChild(shell);
    window.requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
    return true;
  };

  const root = document.getElementById("root") || document.body;
  const observer = new MutationObserver(() => {
    if (!document.getElementById(PROJECT_ID)) createProjectCard();
  });
  observer.observe(root, { childList: true, subtree: true });
  createProjectCard();

  // Top guide button
  const GUIDE_ID = "mario-guide";
  const guideMarkup = `
    <button class="mario-guide__trigger" type="button" aria-expanded="false" aria-controls="mario-guide-panel">
      <span aria-hidden="true">?</span>
      指引
    </button>
    <div class="mario-guide__panel" id="mario-guide-panel" role="region" aria-label="站点导航指引" hidden>
      <div class="mario-guide__panel-inner">
        <p class="mario-guide__title">站点指引</p>
        <ul>
          <li>下滑浏览 <strong>6</strong> 个项目作品</li>
          <li>点击项目卡片 → 查看详情</li>
          <li>项目六为 AI 短片，可直接播放视频</li>
          <li>按 <kbd>Esc</kbd> 或点击返回按钮关闭详情</li>
        </ul>
        <button class="mario-guide__close" type="button" aria-label="关闭指引">关闭</button>
      </div>
    </div>
  `;

  const createGuide = () => {
    if (document.getElementById(GUIDE_ID)) return true;

    const guide = document.createElement("div");
    guide.id = GUIDE_ID;
    guide.className = "mario-guide";
    guide.innerHTML = guideMarkup;
    document.body.appendChild(guide);

    const trigger = guide.querySelector(".mario-guide__trigger");
    const panel = guide.querySelector(".mario-guide__panel");
    const closeBtn = guide.querySelector(".mario-guide__close");

    const openGuide = () => {
      panel.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
      closeBtn.focus();
    };
    const closeGuide = () => {
      panel.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
      trigger.focus();
    };

    trigger.addEventListener("click", () => {
      if (panel.hidden) openGuide();
      else closeGuide();
    });
    closeBtn.addEventListener("click", closeGuide);

    document.addEventListener("click", (event) => {
      if (!guide.contains(event.target) && !panel.hidden) closeGuide();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !panel.hidden) closeGuide();
    });

    return true;
  };
  createGuide();
})();
