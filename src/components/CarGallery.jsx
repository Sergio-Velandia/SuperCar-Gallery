import { useState, useEffect, useRef } from "react";

const cars = [
  {
    id: 1,
    brand: "Porsche",
    model: "911 GT3 RS",
    year: 2024,
    hp: 518,
    speed: "3.2s",
    price: "$223,800",
    color: "#E8341C",
    accent: "#FF6B4A",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=85&fit=crop",
    tag: "TRACK BEAST",
  },
  {
    id: 2,
    brand: "Ferrari",
    model: "SF90 Stradale",
    year: 2024,
    hp: 986,
    speed: "2.5s",
    price: "$507,000",
    color: "#C8A951",
    accent: "#F0D070",
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1400&q=85&fit=crop",
    tag: "HYBRID ICON",
  },
  {
    id: 3,
    brand: "Lamborghini",
    model: "Aventador SVJ",
    year: 2023,
    hp: 770,
    speed: "2.8s",
    price: "$517,770",
    color: "#F5A623",
    accent: "#FFD166",
    image: "https://res.cloudinary.com/unix-center/image/upload/c_limit,dpr_3.0,f_auto,fl_progressive,g_center,h_580,q_75,w_906/k6he0ktcmvcyq27zuhtz.jpg",
    tag: "PURE FURY",
  },
  {
    id: 4,
    brand: "McLaren",
    model: "720S",
    year: 2024,
    hp: 720,
    speed: "2.8s",
    price: "$301,500",
    color: "#E63946",
    accent: "#FF6B78",
    image: "https://hips.hearstapps.com/hmg-prod/images/mclaren-720s-black-by-mansory-1640341441.jpg",
    tag: "PURE SPEED",
  },
  {
    id: 5,
    brand: "Bugatti",
    model: "Chiron Super Sport",
    year: 2023,
    hp: 1578,
    speed: "2.4s",
    price: "$3,900,000",
    color: "#9B51E0",
    accent: "#C77DFF",
    image: "https://placervial.com/wp-content/uploads/2019/09/Bugatti-Chiron-Supersport-300-01.jpg",
    tag: "HYPERCAR",
  },
  {
    id: 6,
    brand: "Aston Martin",
    model: "DBS 770 Ultimate",
    year: 2024,
    hp: 770,
    speed: "3.2s",
    price: "$340,000",
    color: "#1B998B",
    accent: "#2EC4B6",
    image: "https://en.wheelz.me/wp-content/uploads/2024/12/hero3-25798-scaled-1.webp",
    tag: "BRITISH LEGEND",
  },
  {
    id: 7,
    brand: "Koenigsegg",
    model: "Jesko Absolut",
    year: 2024,
    hp: 1600,
    speed: "2.5s",
    price: "$3,000,000",
    color: "#E63946",
    accent: "#FF8FA3",
    image: "https://octane.rent/wp-content/uploads/2025/09/Koenigsegg_Jesko_1.jpg",
    tag: "300 MPH DREAM",
  },
  {
    id: 8,
    brand: "Pagani",
    model: "Huayra R",
    year: 2023,
    hp: 850,
    speed: "2.7s",
    price: "$3,100,000",
    color: "#C0A060",
    accent: "#E8C97A",
    image: "https://www.topgear.com/sites/default/files/2022/05/FFS-Oliver-Top-Gear-0001_FF27437.jpg",
    tag: "ITALIAN ART",
  },
  {
    id: 9,
    brand: "Rimac",
    model: "Nevera",
    year: 2024,
    hp: 1914,
    speed: "1.97s",
    price: "$2,400,000",
    color: "#0077B6",
    accent: "#00B4D8",
    image: "https://cdn.motor1.com/images/mgl/NGeYy2/s1/rimac-nevera-r.webp",
    tag: "ELECTRIC BEAST",
  },
  {
    id: 10,
    brand: "BMW",
    model: "M4 Competition",
    year: 2024,
    hp: 503,
    speed: "3.5s",
    price: "$97,700",
    color: "#2D6A4F",
    accent: "#52B788",
    image: "https://www.topgear.com/sites/default/files/2024/10/1-BMW-M4-review-2024-UK.jpg",
    tag: "DAILY WEAPON",
  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg: #080808;
    --surface: #111111;
    --text: #F0EEE8;
    --muted: rgba(240,238,232,0.35);
  }

  html, body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    overflow: hidden;
    height: 100%;
    width: 100%;
    overscroll-behavior: none;
    -webkit-overflow-scrolling: touch;
  }

  .app {
    width: 100dvw;
    height: 100dvh;
    position: relative;
    overflow: hidden;
    /* Notch / home bar */
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }

  .bg-image {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    transition: opacity 0.7s ease, transform 0.7s ease;
    transform: scale(1.05);
    will-change: opacity, transform;
  }
  .bg-image.active {
    opacity: 1;
    transform: scale(1);
  }
  .bg-image.inactive {
    opacity: 0;
    transform: scale(1.08);
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      120deg,
      rgba(8,8,8,0.95) 0%,
      rgba(8,8,8,0.72) 45%,
      rgba(8,8,8,0.22) 100%
    );
    z-index: 1;
  }

  .accent-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    transition: background 0.6s ease;
    z-index: 3;
  }

  .content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2.5rem 2rem 2rem;
    /* Espacio para los dots del lado derecho */
    padding-right: 3rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.1rem;
    letter-spacing: 0.25em;
    color: var(--muted);
  }

  .counter {
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    color: var(--muted);
    font-weight: 300;
  }

  .car-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 1.5rem;
  }

  .tag {
    font-size: 0.62rem;
    letter-spacing: 0.3em;
    font-weight: 500;
    margin-bottom: 0.6rem;
    transition: color 0.5s ease;
  }

  .brand {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(3rem, 15vw, 7rem);
    line-height: 0.9;
    letter-spacing: 0.02em;
    transition: opacity 0.4s ease, transform 0.4s ease;
  }
  .brand.animating {
    opacity: 0;
    transform: translateY(20px);
  }

  .model {
    font-size: clamp(0.9rem, 3.8vw, 1.4rem);
    font-weight: 300;
    letter-spacing: 0.08em;
    color: var(--muted);
    margin-top: 0.3rem;
    transition: opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s;
  }
  .model.animating {
    opacity: 0;
    transform: translateY(15px);
  }

  .specs {
    display: flex;
    gap: 1.5rem;
    margin-top: 1.2rem;
    transition: opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s;
  }
  .specs.animating {
    opacity: 0;
    transform: translateY(12px);
  }

  .spec {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .spec-label {
    font-size: 0.58rem;
    letter-spacing: 0.2em;
    color: var(--muted);
    font-weight: 400;
    text-transform: uppercase;
  }

  .spec-value {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.3rem;
    letter-spacing: 0.05em;
    transition: color 0.5s ease;
  }

  .dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: var(--muted);
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .dot.active {
    height: 20px;
    border-radius: 2px;
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .price-label {
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    color: var(--muted);
    text-transform: uppercase;
    margin-bottom: 0.2rem;
  }

  .price {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(1.3rem, 5vw, 1.6rem);
    letter-spacing: 0.04em;
    transition: color 0.5s ease;
  }

  .arrows {
    display: flex;
    gap: 0.8rem;
    align-items: center;
  }

  .arrow-btn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid rgba(240,238,232,0.15);
    background: transparent;
    color: var(--text);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    transition: all 0.25s ease;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    user-select: none;
  }
  .arrow-btn:active {
    transform: scale(0.88);
    opacity: 0.7;
  }

  .side-nav {
    position: absolute;
    right: 1.2rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    align-items: center;
  }

  .progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    transition: width 0.5s cubic-bezier(0.4,0,0.2,1), background 0.5s ease;
    z-index: 3;
  }

  .year {
    font-size: 0.62rem;
    letter-spacing: 0.2em;
    color: var(--muted);
    font-weight: 300;
    margin-top: 0.4rem;
  }

  /* ── SMALL MOBILE (≤390px) ── */
  @media (max-width: 390px) {
    .content {
      padding: 1.2rem 1rem 1rem;
      padding-right: 2.6rem;
    }
    .brand {
      font-size: clamp(2.6rem, 19vw, 3.8rem);
    }
    .model {
      font-size: clamp(0.8rem, 5vw, 1rem);
    }
    .specs { gap: 1rem; margin-top: 0.8rem; }
    .spec-value { font-size: 1.1rem; }
    .arrow-btn { width: 42px; height: 42px; font-size: 0.95rem; }
    .arrows { gap: 0.6rem; }
    .side-nav { right: 0.6rem; gap: 0.28rem; }
    .dot.active { height: 14px; }
  }

  /* ── REGULAR MOBILE (391px–480px) ── */
  @media (min-width: 391px) and (max-width: 480px) {
    .content {
      padding: 1.4rem 1.2rem 1.2rem;
      padding-right: 2.8rem;
    }
    .brand {
      font-size: clamp(2.8rem, 17vw, 4.2rem);
    }
    .side-nav { right: 0.8rem; }
    .dot.active { height: 16px; }
  }

  /* ── LANDSCAPE MÓVIL ── */
  @media (max-height: 500px) and (orientation: landscape) {
    .content {
      padding: 0.9rem 1.2rem 0.7rem;
      padding-right: 2.8rem;
    }
    .car-info { padding-bottom: 0.4rem; }
    .brand { font-size: clamp(1.8rem, 11vh, 3rem); }
    .tag { margin-bottom: 0.25rem; }
    .year { margin-top: 0.15rem; }
    .specs { margin-top: 0.5rem; gap: 1rem; }
    .spec-value { font-size: 1.1rem; }
    .overlay {
      background: linear-gradient(
        100deg,
        rgba(8,8,8,0.97) 0%,
        rgba(8,8,8,0.80) 50%,
        rgba(8,8,8,0.25) 100%
      );
    }
  }
`;

export default function CarGallery() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const car = cars[current];

  const changeCar = (next) => {
    if (animating) return;
    setDirection(next > current ? 1 : -1);
    setAnimating(true);
    setTimeout(() => {
      setCurrent((next + cars.length) % cars.length);
      setTimeout(() => setAnimating(false), 50);
    }, 350);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    // Solo swipe horizontal, ignora si el gesto es más vertical
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      changeCar(diffX > 0 ? current + 1 : current - 1);
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") changeCar(current + 1);
      if (e.key === "ArrowLeft") changeCar(current - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, animating]);

  const progressWidth = ((current + 1) / cars.length) * 100;

  return (
    <>
      <style>{styles}</style>
      <div className="app" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>

        {cars.map((c, i) => (
          <div
            key={c.id}
            className={`bg-image ${i === current ? "active" : "inactive"}`}
            style={{ backgroundImage: `url(${c.image})` }}
          />
        ))}

        <div className="overlay" />
        <div className="accent-line" style={{ background: car.color }} />
        <div className="progress-bar" style={{ width: `${progressWidth}%`, background: car.accent }} />

        <div className="side-nav">
          {cars.map((c, i) => (
            <div
              key={c.id}
              className={`dot ${i === current ? "active" : ""}`}
              style={i === current ? { background: car.accent } : {}}
              onClick={() => changeCar(i)}
            />
          ))}
        </div>

        <div className="content">
          <div className="header">
            <span className="logo">VELOCE</span>
            <span className="counter">
              {String(current + 1).padStart(2, "0")} / {String(cars.length).padStart(2, "0")}
            </span>
          </div>

          <div className="car-info">
            <div className="tag" style={{ color: car.accent }}>{car.tag}</div>

            <div className={`brand ${animating ? "animating" : ""}`}>{car.brand}</div>
            <div className={`model ${animating ? "animating" : ""}`}>{car.model}</div>
            <div className="year">{car.year}</div>

            <div className={`specs ${animating ? "animating" : ""}`}>
              <div className="spec">
                <span className="spec-label">Power</span>
                <span className="spec-value" style={{ color: car.accent }}>
                  {car.hp}<span style={{ fontSize: "0.7rem" }}>hp</span>
                </span>
              </div>
              <div className="spec">
                <span className="spec-label">0–100</span>
                <span className="spec-value" style={{ color: car.accent }}>{car.speed}</span>
              </div>
            </div>
          </div>

          <div className="bottom">
            <div>
              <div className="price-label">Starting at</div>
              <div className="price" style={{ color: car.accent }}>{car.price}</div>
            </div>
            <div className="arrows">
              <button
                className="arrow-btn"
                onClick={() => changeCar(current - 1)}
                style={{ borderColor: `${car.accent}33` }}
              >←</button>
              <button
                className="arrow-btn"
                onClick={() => changeCar(current + 1)}
                style={{ borderColor: `${car.accent}33`, background: `${car.accent}15` }}
              >→</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}