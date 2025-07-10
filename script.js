// DOM要素の取得
const topbar = document.querySelector(".topbar");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const faqItems = document.querySelectorAll(".faq-item");
const fadeElements = document.querySelectorAll(".fade-in");

// スムーズスクロール機能
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// トップバーのスクロール効果
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    topbar.style.background = "rgba(255, 255, 255, 0.98)";
    topbar.style.boxShadow = "0 2px 30px rgba(0, 0, 0, 0.15)";
  } else {
    topbar.style.background = "rgba(255, 255, 255, 0.95)";
    topbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  }
});

// モバイルメニューの開閉
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

// FAQの開閉機能
faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    // 他のFAQアイテムを閉じる
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
      }
    });

    // クリックされたアイテムの開閉
    if (isActive) {
      item.classList.remove("active");
    } else {
      item.classList.add("active");
    }
  });
});

// スクロールアニメーション
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

// アニメーション対象要素の監視
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".value-card, .roadmap-item, .testimonial-card, .faq-item, .kids-image"
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
});

// 子供たちの画像のスクロールアニメーション
const kidsImage = document.querySelector(".kids-image");
if (kidsImage) {
  const kidsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    },
    { threshold: 0.3 }
  );

  kidsObserver.observe(kidsImage);
}

// フォーム送信処理
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // フォームデータの取得
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // 送信処理のシミュレーション
    const submitButton = contactForm.querySelector(".submit-button");
    const originalText = submitButton.textContent;

    submitButton.textContent = "送信中...";
    submitButton.disabled = true;

    // 実際の送信処理はここに実装
    setTimeout(() => {
      alert(
        "お問い合わせありがとうございます。後日担当者よりご連絡いたします。"
      );
      contactForm.reset();
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 2000);
  });
}

// CTAボタンのクリック処理
const ctaButton = document.querySelector(".cta-button");
if (ctaButton) {
  ctaButton.addEventListener("click", () => {
    // お問い合わせセクションにスクロール
    const contactSection = document.querySelector("#pricing");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
}

// パフォーマンス最適化：画像の遅延読み込み
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
});

// レスポンシブ対応：ウィンドウリサイズ時の処理
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navMenu.classList.remove("active");
    menuToggle.classList.remove("active");
  }
});

// ページ読み込み完了時の処理
window.addEventListener("load", () => {
  // ローディングアニメーションの終了
  document.body.classList.add("loaded");

  // 初期スクロール位置の調整（アンカーリンク対応）
  if (window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  }
});

// キーボードナビゲーション対応
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // ESCキーでモバイルメニューを閉じる
    navMenu.classList.remove("active");
    menuToggle.classList.remove("active");

    // ESCキーでFAQを閉じる
    faqItems.forEach((item) => {
      item.classList.remove("active");
    });
  }
});

// タッチデバイス対応
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener("touchstart", (e) => {
  touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener("touchend", (e) => {
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartY - touchEndY;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // 上スワイプ
      console.log("上スワイプ");
    } else {
      // 下スワイプ
      console.log("下スワイプ");
    }
  }
}

// アクセシビリティ向上
document.addEventListener("DOMContentLoaded", () => {
  // フォーカス可能な要素にフォーカスインジケーターを追加
  const focusableElements = document.querySelectorAll(
    "a, button, input, textarea, select"
  );

  focusableElements.forEach((element) => {
    element.addEventListener("focus", () => {
      element.style.outline = "2px solid #2563eb";
      element.style.outlineOffset = "2px";
    });

    element.addEventListener("blur", () => {
      element.style.outline = "";
      element.style.outlineOffset = "";
    });
  });
});

// エラーハンドリング
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error);
});

// パフォーマンス監視
if ("performance" in window) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType("navigation")[0];
      console.log(
        "Page load time:",
        perfData.loadEventEnd - perfData.loadEventStart,
        "ms"
      );
    }, 0);
  });
}
