const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  return (
    <main>
      <header className="nav">
        <a className="brand" href="#top" aria-label="HOLYCORES 首页">
          <img className="brand-logo" src="/brand/logo-1.0.svg" alt="" />
          <strong>HOLYCORES</strong>
        </a>
        <nav aria-label="主导航">
          <a href="#compute">算力平台</a>
          <a href="#architecture">核心架构</a>
          <a href="#software">软件生态</a>
          <a href="#company">关于我们</a>
        </nav>
        <a className="nav-cta" href="#contact">联系团队 <Arrow /></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> BORN FOR INTELLIGENCE</p>
          <h1>算力，生而<br />自由。</h1>
          <p className="lead">HOLYCORES 构建面向下一代人工智能的高性能计算平台，让先进算力更开放、更高效、更易于规模化。</p>
          <div className="actions">
            <a className="button primary" href="#compute">探索产品 <Arrow /></a>
            <a className="button ghost" href="#architecture">了解架构 <span>→</span></a>
          </div>
        </div>
        <div className="core-visual" aria-label="HOLYCORES 芯片架构概念图">
          <div className="orbit orbit-a" />
          <div className="orbit orbit-b" />
          <div className="chip">
            <div className="chip-grid" />
            <span>HC</span>
            <small>NOVA™</small>
          </div>
          <div className="data-tag tag-a"><b>128</b><span>CORE MESH</span></div>
          <div className="data-tag tag-b"><b>4.2</b><span>TB/S FABRIC</span></div>
          <div className="crosshair" />
        </div>
        <div className="hero-index">01 — 05</div>
      </section>

      <section className="statement" id="architecture">
        <p className="section-label">我们的使命 / OUR MISSION</p>
        <h2>重新定义智能时代的<br /><em>计算底座。</em></h2>
        <div className="statement-foot">
          <p>从芯片架构、系统互联到编译软件，HOLYCORES 以全栈协同创新突破算力边界。</p>
          <span className="round-arrow">↓</span>
        </div>
      </section>

      <section className="products" id="compute">
        <div className="section-head">
          <div>
            <p className="section-label">产品矩阵 / COMPUTE AT EVERY SCALE</p>
            <h2>从云端，到边缘。</h2>
          </div>
          <p>统一架构，灵活扩展。为每一种智能负载提供恰到好处的算力。</p>
        </div>
        <div className="product-grid">
          <article className="product-card ice">
            <div className="card-top"><span>01</span><span>CLOUD AI SYSTEM</span></div>
            <div className="cube"><span>HC</span></div>
            <div><h3>天穹 · GALAXY</h3><p>大规模云端智算集群</p></div>
            <a href="#contact" aria-label="了解天穹 GALAXY"><Arrow /></a>
          </article>
          <article className="product-card violet">
            <div className="card-top"><span>02</span><span>AI ACCELERATOR</span></div>
            <div className="rack"><i /><i /><i /><strong>NOVA</strong></div>
            <div><h3>星核 · NOVA</h3><p>数据中心 AI 加速卡</p></div>
            <a href="#contact" aria-label="了解星核 NOVA"><Arrow /></a>
          </article>
          <article className="product-card lime">
            <div className="card-top"><span>03</span><span>EDGE AI</span></div>
            <div className="mini-chip"><i /><i /><b>HC<br />SPARK</b></div>
            <div><h3>灵核 · SPARK</h3><p>低功耗边缘推理芯片</p></div>
            <a href="#contact" aria-label="了解灵核 SPARK"><Arrow /></a>
          </article>
        </div>
      </section>

      <section className="platform" id="software">
        <div className="code-art">
          <span>01</span><span>10</span><span>11</span><span>00</span>
          <strong>OPEN<br />BY DESIGN</strong>
        </div>
        <div className="platform-copy">
          <p className="section-label">HOLYFLOW™ SOFTWARE STACK</p>
          <h2>软件定义算力，<br />开放释放潜能。</h2>
          <p>一套面向开发者的开放软件栈。从主流框架到芯片指令，让模型迁移、优化与部署更加简单。</p>
          <ul>
            <li><span>01</span>兼容主流 AI 框架</li>
            <li><span>02</span>统一编译与运行时</li>
            <li><span>03</span>开放 SDK 与开发工具</li>
          </ul>
          <a className="text-link" href="#contact">进入开发者中心 <Arrow /></a>
        </div>
      </section>

      <section className="numbers" id="company">
        <p className="section-label">BUILT TO SCALE / 关键性能</p>
        <div className="number-grid">
          <div><strong>4×</strong><span>性能功耗比提升</span></div>
          <div><strong>128</strong><span>可扩展计算核心</span></div>
          <div><strong>4.2<small>TB/s</small></strong><span>片上互联带宽</span></div>
          <div><strong>∞</strong><span>开放生态可能</span></div>
        </div>
      </section>

      <section className="contact" id="contact">
        <p className="section-label">LET'S BUILD WHAT'S NEXT</p>
        <h2>一起，构建<br />智能新世界。</h2>
        <a href="mailto:hello@holycores.com">hello@holycores.com <Arrow /></a>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><img className="brand-logo" src="/brand/logo-1.0.svg" alt="" /><strong>HOLYCORES</strong></a>
        <p>开放架构。极致性能。无限智能。</p>
        <div><span>© 2026 HOLYCORES</span><a href="#top">返回顶部 ↑</a></div>
      </footer>
    </main>
  );
}
