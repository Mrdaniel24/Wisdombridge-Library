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
  const [paused, setPaused] = useState(false);
  const { add } = useStore();
  const reduceMotion = useReducedMotion();
  const activeBook = books[activeIndex];
  useEffect(() => {
    const resize = () => setStep(window.innerWidth <= 640 ? 54 : window.innerWidth <= 900 ? 68 : 92);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  useEffect(() => {
    if (reduceMotion || paused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % books.length);
      setAdded(false);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [reduceMotion, paused]);
  const move = (step: number) => {
    setActiveIndex((index) => (index + step + books.length) % books.length);
    setAdded(false);
  };

  return (
    <section className="hero-carousel" aria-label="Featured books carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="hero-carousel-kicker"><span className="carousel-index">0{activeIndex + 1}</span><span>{activeBook.category.toUpperCase()} · WISDOMBRIDGE LIBRARY</span><span>SCROLL TO EXPLORE</span></div>
      <div className="hero-stage" role="region" aria-roledescription="carousel" aria-label="Featured books">
        <div className="hero-shelf" aria-hidden="true"/>
        {books.map((book, index) => {
          const offset = ((index - activeIndex + books.length + Math.floor(books.length / 2)) % books.length) - Math.floor(books.length / 2);
          const depth = Math.abs(offset);
          if (depth > 4) return null;
          const style = { "--depth": depth, "--shade": 1 - depth * .09 } as CSSProperties;
          return (
            <motion.button
              type="button"
              key={book.id}
              className={`hero-arc-book ${offset === 0 ? "is-active" : ""}`}
              style={style}
              onClick={() => { setActiveIndex(index); setAdded(false); }}
              aria-label={`Select ${book.title} by ${book.author}`}
              aria-pressed={offset === 0}
              initial={reduceMotion ? false : { opacity: 0, y: 34, rotateZ: offset * 2 }}
              animate={{
                opacity: 1 - depth * .08,
                x: offset * step,
                y: depth * depth * 3.3,
                z: -depth * 18,
                rotateY: offset * -9,
                rotateZ: offset * 1.6,
                scale: 1 - depth * .075,
              }}
              transition={{ duration: reduceMotion ? 0 : .72, ease: [.18, .72, .22, 1], delay: Math.min(depth * .035, .14) }}
            >
              <Cover book={book} large/>
            </motion.button>
          );
        })}

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

