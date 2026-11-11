"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Check, ShoppingBag } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { books, formatTZS } from "@/data/books";
import { Cover } from "@/components/book-card";
import { useStore } from "@/components/store-provider";

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const [step, setStep] = useState(92);
  const { add } = useStore();
  const reduceMotion = useReducedMotion();
  const activeBook = books[activeIndex];
  useEffect(() => {
    const resize = () => setStep(window.innerWidth <= 640 ? 54 : window.innerWidth <= 900 ? 68 : 92);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  const move = (step: number) => {
    setActiveIndex((index) => (index + step + books.length) % books.length);
    setAdded(false);
  };

  return (
    <section className="hero-carousel" aria-label="Featured books carousel">
      <div className="hero-carousel-kicker"><span className="live-dot"/> THE WISDOMBRIDGE COLLECTION <span>01 — {String(books.length).padStart(2, "0")}</span></div>
      <div className="hero-stage" role="region" aria-roledescription="carousel" aria-label="Featured books">
        <div className="hero-starfield" aria-hidden="true">
          {Array.from({ length: 24 }, (_, i) => <i key={i} style={{ left: `${(i * 43 + 11) % 97}%`, top: `${(i * 29 + 13) % 87}%`, opacity: .17 + (i % 4) * .08 }}/>) }
        </div>
        <div className="hero-orbit hero-orbit-one" aria-hidden="true"/>
        <div className="hero-orbit hero-orbit-two" aria-hidden="true"/>
        <div className="hero-shelf" aria-hidden="true"/>
        {books.map((book, index) => {
          const offset = ((index - activeIndex + books.length + Math.floor(books.length / 2)) % books.length) - Math.floor(books.length / 2);
          const depth = Math.abs(offset);
          if (depth > 4) return null;
          const style = {
            "--offset": offset,
            "--depth": depth,
            "--x": `${offset * step}px`,
            "--rise": `${depth * depth * 3.3}px`,
            "--tilt": `${offset * -9}deg`,
            "--scale": 1 - depth * .075,
            "--shade": 1 - depth * .13,
            "--z": `${-depth * 18}px`,
          } as CSSProperties;
          return (
            <motion.button
              type="button"
              key={book.id}
              className={`hero-arc-book ${offset === 0 ? "is-active" : ""}`}
              style={style}
              onClick={() => { setActiveIndex(index); setAdded(false); }}
              aria-label={`Select ${book.title} by ${book.author}`}
              aria-pressed={offset === 0}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : .45, ease: [.2, .8, .2, 1] }}
            >
              <Cover book={book} large/>
            </motion.button>
          );
        })}
        <div className="hero-play-ring" aria-hidden="true"><span/></div>
        <button type="button" className="carousel-arrow carousel-prev" onClick={() => move(-1)} aria-label="Previous book"><ChevronLeft size={19}/></button>
        <button type="button" className="carousel-arrow carousel-next" onClick={() => move(1)} aria-label="Next book"><ChevronRight size={19}/></button>
      </div>
      <div className="hero-carousel-caption" aria-live="polite">
        <div className="carousel-book-copy">
          <span className="carousel-category">{activeBook.category.toUpperCase()} · {activeIndex + 1} / {books.length}</span>
          <Link href={`/books/${activeBook.id}`} className="carousel-book-title">{activeBook.title}</Link>
          <span className="carousel-book-author">{activeBook.author}</span>
        </div>
        <div className="carousel-buy">
          <strong>{formatTZS(activeBook.price)}</strong>
          <button type="button" onClick={() => { add(activeBook.id); setAdded(true); }}>
            {added ? <><Check size={14}/> Added</> : <><ShoppingBag size={14}/> Add to bag</>}
          </button>
        </div>
      </div>
      <div className="carousel-progress" aria-label="Choose a featured book">
        {books.map((book, index) => <button type="button" key={book.id} className={index === activeIndex ? "current" : ""} onClick={() => setActiveIndex(index)} aria-label={`Go to ${book.title}`}/>) }
      </div>
      <Link href={`/books/${activeBook.id}`} className="carousel-discover">Discover this book <ArrowRight size={13}/></Link>
    </section>
  );
}
