"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  ExternalLink,
  Gamepad2,
  Menu,
  PartyPopper,
  Rocket,
  Search,
  Sparkles,
  Store,
  Trophy,
  UserRound,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import { categories, projectCounts, projects, type Project, type ProjectCategory } from "@/data/projects";

const accentClass = {
  pink: "accent-pink",
  yellow: "accent-yellow",
  cyan: "accent-cyan",
  green: "accent-green",
} as const;

const quizQuestions = [
  { q: "Siapa yang membuat game rhythm dengan desain pastel?", options: ["Calista", "Gishella", "Ghini", "Najma"], answer: "Calista" },
  { q: "Karya siapa yang menampilkan hujan emoji lucu dan confetti?", options: ["Julian", "Ghini", "Hauzan", "Gibral"], answer: "Ghini" },
  { q: "Siapa yang punya fitur Tilt Card 3D mengikuti kursor?", options: ["Wildan", "Julian", "Rifat", "Hauzan"], answer: "Rifat" },
  { q: "Siapa kreator petualangan menangkap harta karun dengan High Score?", options: ["Gibral", "Wildan", "Julian", "Rifat"], answer: "Wildan" },
  { q: "Siapa yang membuat desain 3D futuristik dengan medali?", options: ["Julian", "Gibral", "Hauzan", "Rifat"], answer: "Julian" },
  { q: "Buku harian digital dengan objek mengambang adalah karya siapa?", options: ["Najma", "Gishella", "Ghini", "Atiqa"], answer: "Gishella" },
  { q: "Siapa yang membuat profil dengan bintang setiap kali layar diklik?", options: ["Calista", "Najma", "Atiqa", "Gishella"], answer: "Najma" },
  { q: "Siapa yang menciptakan dunia warna-warni dengan partikel kursor?", options: ["Hauzan", "Rifat", "Wildan", "Julian"], answer: "Hauzan" },
  { q: "Roket, confetti, dan balok Minecraft ada di website milik siapa?", options: ["Gibral", "Hauzan", "Rifat", "Julian"], answer: "Gibral" },
  { q: "Game cerita interaktif dengan pilihan ganda adalah karya siapa?", options: ["Cleo", "Gishella", "Ghini", "Calista"], answer: "Cleo" },
  { q: "Siapa yang memiliki website profil bertema e-sports gelap?", options: ["Aryasatya", "Julian", "Rifat", "Wildan"], answer: "Aryasatya" },
  { q: "Biodata pastel dengan tema camilan Yupi adalah karya siapa?", options: ["Putri", "Ghini", "Gishella", "Calista"], answer: "Putri" },
];

function categoryIcon(category: ProjectCategory) {
  if (category === "Biodata") return <UserRound size={16} strokeWidth={2.4} />;
  if (category === "Game") return <Gamepad2 size={16} strokeWidth={2.4} />;
  return <Store size={16} strokeWidth={2.4} />;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`project-card ${accentClass[project.accent]}`}>
      <div className="project-card-topline">
        <span className="project-category">
          {categoryIcon(project.category)} {project.category}
        </span>
        <span className="project-index">{project.id.slice(0, 2).toUpperCase()}</span>
      </div>
      <div className="project-card-visual" aria-hidden="true">
        <div className="visual-orbit orbit-one" />
        <div className="visual-orbit orbit-two" />
        <Sparkles className="visual-sparkle" size={24} />
        <span className="visual-label">{project.category === "Toko Online" ? "SHOP" : "CREATE"}</span>
      </div>
      <div className="project-card-body">
        <div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
        <div className="project-tags">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
        <a className="project-link" href={project.href} aria-label={`${project.cta}: ${project.title}`}>
          {project.cta} <ArrowUpRight size={17} />
        </a>
      </div>
    </article>
  );
}

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function Showcase() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("Semua");
  const [activeQuestions, setActiveQuestions] = useState(() => quizQuestions.slice(0, 5));
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesCategory = selectedCategory === "Semua" || project.category === selectedCategory;
      const searchableText = [project.title, project.category, project.description, ...project.tags]
        .join(" ")
        .toLowerCase();
      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [query, selectedCategory]);

  const featuredProjects = projects.filter((project) => project.featured);
  const currentQuestion = activeQuestions[quizIndex];

  function restartQuiz() {
    setActiveQuestions(shuffle(quizQuestions).slice(0, 5));
    setQuizIndex(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setQuizFinished(false);
  }

  function chooseAnswer(option: string) {
    if (selectedAnswer || !currentQuestion) return;
    setSelectedAnswer(option);
    if (option === currentQuestion.answer) {
      setQuizScore((score) => score + 20);
    }
  }

  function nextQuestion() {
    if (!selectedAnswer) return;
    if (quizIndex === activeQuestions.length - 1) {
      setQuizFinished(true);
      return;
    }
    setQuizIndex((index) => index + 1);
    setSelectedAnswer(null);
  }

  return (
    <div className="site-shell" id="top">
      <header className="site-header">
        <div className="page-width nav-inner">
          <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark"><Rocket size={19} /></span>
            <span>Ekskul<span className="brand-accent">TIK</span></span>
          </a>
          <button
            className="mobile-menu-button"
            type="button"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Navigasi utama">
            <a href="#galeri" onClick={() => setMenuOpen(false)}>Galeri</a>
            <a href="#pengalaman" onClick={() => setMenuOpen(false)}>Pengalaman</a>
            <a href="#kuis" onClick={() => setMenuOpen(false)}>Kuis</a>
            <a href="#memori" onClick={() => setMenuOpen(false)}>Memori</a>
            <a className="nav-cta" href="#galeri" onClick={() => setMenuOpen(false)}>Jelajahi karya <ArrowDownRight size={16} /></a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero page-width">
          <div className="hero-copy">
            <h1>Karya kecil.<br /><em>Ide besar.</em></h1>
            <p className="hero-lede">
              Ruang untuk merayakan website, game, biodata, dan toko online yang lahir dari rasa ingin tahu anak-anak Ekskul TIK.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#galeri">Lihat semua karya <ArrowUpRight size={18} /></a>
              <a className="text-link" href="#pengalaman">Kenali pengalaman kami <ChevronRight size={17} /></a>
            </div>
            <div className="hero-note"><Sparkles size={17} /> Dibuat dengan rasa ingin tahu, dirayakan bersama.</div>
          </div>
          <div className="hero-art" aria-label="Ilustrasi abstrak karya kreatif" role="img">
            <div className="hero-art-grid" />
            <div className="hero-sticker sticker-one">TIK<br />LAB</div>
            <div className="hero-sticker sticker-two">23<br /><small>PROJECTS</small></div>
            <div className="hero-orb"><Rocket size={56} strokeWidth={1.5} /></div>
            <div className="hero-art-caption"><span>01</span><strong>Play. Build. Share.</strong><span>↗</span></div>
          </div>
        </section>

        <section className="stats-strip page-width" aria-label="Statistik karya">
          <div><strong>{projectCounts.total}</strong><span>Total karya</span></div>
          <div><strong>{projectCounts.biodata}</strong><span>Biodata</span></div>
          <div><strong>{projectCounts.games}</strong><span>Game interaktif</span></div>
          <div><strong>{projectCounts.stores}</strong><span>Toko online</span></div>
        </section>

        <section className="featured-section page-width" aria-labelledby="featured-title">
          <div className="featured-heading"><div><p className="section-kicker">Curator&apos;s picks</p><h2 id="featured-title">Pilihan untuk<br /><span>mulai menjelajah.</span></h2></div><p>Beberapa karya yang langsung menarik perhatian kami.</p></div>
          <div className="featured-list">
            {featuredProjects.slice(0, 3).map((project, index) => (
              <a className={`featured-item ${accentClass[project.accent]}`} href={project.href} key={project.id}>
                <span className="featured-number">0{index + 1}</span><span className="featured-type">{project.category}</span><strong>{project.title}</strong><ArrowUpRight size={18} />
              </a>
            ))}
          </div>
        </section>

        <section className="section page-width" id="galeri">
          <div className="section-heading">
            <div><p className="section-kicker">01 / The collection</p><h2>Temukan karya<br /><span>yang bikin penasaran.</span></h2></div>
            <p className="section-intro">Setiap kartu membawa kamu ke karya asli. Klik, coba, dan temukan cerita di baliknya.</p>
          </div>

          <div className="gallery-toolbar">
            <label className="search-box">
              <Search size={18} />
              <span className="sr-only">Cari karya</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nama, karya, atau tag..." />
              {query && <button type="button" aria-label="Hapus pencarian" onClick={() => setQuery("")}><X size={16} /></button>}
            </label>
            <div className="category-tabs" role="tablist" aria-label="Filter kategori">
              {categories.map((category) => (
                <button
                  key={category}
                  className={selectedCategory === category ? "is-active" : ""}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="result-meta"><span>{filteredProjects.length} karya ditemukan</span><span>{selectedCategory === "Semua" ? "Semua kategori" : selectedCategory}</span></div>
          {filteredProjects.length > 0 ? (
            <div className="project-grid">
              {filteredProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
          ) : (
            <div className="empty-state"><CircleHelp size={34} /><h3>Belum ada karya yang cocok.</h3><p>Coba kata pencarian lain atau tampilkan semua kategori.</p><button className="button button-dark" type="button" onClick={() => { setQuery(""); setSelectedCategory("Semua"); }}>Reset filter</button></div>
          )}
        </section>

        <section className="section experience-section page-width" id="pengalaman">
          <div className="section-heading compact"><div><p className="section-kicker">02 / More to explore</p><h2>Masih ada<br /><span>yang bisa dicoba.</span></h2></div><p className="section-intro">Showcase ini bukan hanya galeri. Ada beberapa pengalaman kecil yang kami siapkan untuk kamu.</p></div>
          <div className="experience-grid">
            <a className="experience-card experience-ai" href="https://ai-chatbot-five-mu-84.vercel.app/" target="_blank" rel="noreferrer">
              <span className="experience-icon"><Bot size={23} /></span><span className="experience-arrow"><ExternalLink size={18} /></span><p className="section-kicker">Interactive assistant</p><h3>Tanya AI<br /><em>apa saja.</em></h3><p>Teman ngobrol untuk pertanyaan coding, ide, dan hal-hal yang bikin penasaran.</p>
            </a>
            <a className="experience-card experience-memory" href="https://ojannnn-prog.github.io/memori-esdeh/" target="_blank" rel="noreferrer">
              <span className="experience-icon"><BrainCircuit size={23} /></span><span className="experience-arrow"><ExternalLink size={18} /></span><p className="section-kicker">Memory capsule</p><h3>Memori<br /><em>kelas 6.</em></h3><p>Potongan cerita, momen, dan kenangan yang kami simpan dalam bentuk digital.</p>
            </a>
          </div>
        </section>

        <section className="quiz-section page-width" id="kuis">
          <div className="quiz-card">
            <div className="quiz-intro"><p className="section-kicker">03 / Play along</p><h2>Seberapa kenal<br /><span>kamu dengan karya kami?</span></h2><p>Uji ingatanmu lewat lima pertanyaan acak tentang karya-karya di galeri.</p><div className="quiz-score-pill"><Trophy size={17} /> Skor terbaik: <strong>{quizScore}</strong></div></div>
            <div className="quiz-panel">
              {!quizFinished && currentQuestion ? (
                <>
                  <div className="quiz-panel-top"><span>Soal {quizIndex + 1} / {activeQuestions.length}</span><span><Clock3 size={15} /> 5 pertanyaan</span></div>
                  <div className="quiz-progress"><span style={{ width: `${((quizIndex + (selectedAnswer ? 1 : 0)) / activeQuestions.length) * 100}%` }} /></div>
                  <h3>{currentQuestion.q}</h3>
                  <div className="quiz-options">
                    {currentQuestion.options.map((option) => {
                      const isSelected = selectedAnswer === option;
                      const isCorrect = selectedAnswer && option === currentQuestion.answer;
                      const isWrong = isSelected && option !== currentQuestion.answer;
                      return <button key={option} type="button" className={`${isSelected ? "is-selected" : ""} ${isCorrect ? "is-correct" : ""} ${isWrong ? "is-wrong" : ""}`} onClick={() => chooseAnswer(option)} disabled={Boolean(selectedAnswer)}><span>{option}</span>{isCorrect && <Check size={17} />}</button>;
                    })}
                  </div>
                  {selectedAnswer && <button className="button button-dark quiz-next" type="button" onClick={nextQuestion}>{quizIndex === activeQuestions.length - 1 ? "Lihat hasil" : "Pertanyaan berikutnya"} <ArrowUpRight size={17} /></button>}
                </>
              ) : (
                <div className="quiz-result"><PartyPopper size={34} /><p className="section-kicker">Sesi selesai</p><h3>Skormu<br /><em>{quizScore} / 100</em></h3><p>{quizScore === 100 ? "Ingatanmu luar biasa!" : quizScore >= 60 ? "Kerja bagus, kamu cukup mengenal karya kami." : "Yuk keliling galeri sekali lagi."}</p><button className="button button-dark" type="button" onClick={restartQuiz}>Main lagi <ArrowUpRight size={17} /></button></div>
              )}
            </div>
          </div>
        </section>

        <section className="closing-section page-width" id="memori">
          <div className="closing-mark"><Sparkles size={24} /></div><p className="section-kicker">End note</p><h2>Setiap karya adalah<br /><em>awal dari sesuatu.</em></h2><p>Terima kasih sudah berkunjung dan memberi ruang untuk ide-ide kecil kami tumbuh.</p><a className="text-link" href="#top">Kembali ke atas <ArrowUpRight size={17} /></a>
        </section>
      </main>

      <footer className="site-footer"><div className="page-width footer-inner"><a className="brand footer-brand" href="#top"><span className="brand-mark"><Rocket size={19} /></span><span>Ekskul<span className="brand-accent">TIK</span></span></a><p>Made with curiosity · 2026</p><p>© Ekskul TIK Showcase</p></div></footer>
    </div>
  );
}
