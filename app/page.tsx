"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Star, BookOpen } from "lucide-react";
import { books } from "@/data/books";
import { BookCard } from "@/components/book-card";
import { HeroCarousel } from "@/components/hero-carousel";
import { useStore } from "@/components/store-provider";

const authors = [["JC", "James Clear", "New from James Clear"], ["NH", "Napoleon Hill", "New from Napoleon Hill"], ["RK", "Robert Kiyosaki", "New from Robert Kiyosaki"], ["BT", "Brian Tracy", "New from Brian Tracy"]];
const categories = [["01", "Business & finance", "Money, ideas & work", "Business"], ["02", "Personal growth", "Make room to become", "Personal Growth"], ["03", "Fiction & stories", "Worlds worth getting lost in", "Fiction"], ["04", "Faith & wellbeing", "Books for the inner life", "Wellbeing"]];

export default function Home() {
  const { lang } = useStore();
  const sw = lang === "SW";
  return <>
    <section className="hero wrap">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-dot"/> {sw ? "MAKTABA HURU YA VITABU, KWA MUONEKANO MPYA" : "A LIBRARY FOR CURIOUS MINDS"}</div>
        <h1>{sw ? <>Fungua<br/><em>ulimwengu</em><br/>mpya.</> : <>A little more<br/><em>wonder,</em> in every<br/>chapter.</>}</h1>
        <p>{sw ? "Vitabu vinavyochochea mawazo, kupanua upeo, na kukusindikiza katika kila sura ya maisha." : "Thoughtful reads for slow mornings, bold ideas, and the joy of finding your next favourite book."}</p>
        <div className="hero-buttons"><Link className="button dark" href="/shop">{sw ? "Gundua vitabu" : "Explore the library"} <ArrowRight size={16}/></Link><Link className="text-link" href="/about">{sw ? "Kuhusu sisi" : "Our story"} <ArrowUpRight size={15}/></Link></div>
        <div className="hero-trust"><span className="trust-avatars"><i>J</i><i>A</i><i>M</i></span><span>{sw ? <>Wasomaji wanapenda<br/><b>kote Tanzania</b></> : <>Chosen with care<br/><b>for readers in Tanzania</b></>}</span><span className="trust-divider"/><span className="rating"><Star size={13} fill="currentColor"/> 4.9 <small>{sw ? "wasomaji" : "reader rating"}</small></span></div>
      </div>
      <HeroCarousel/>
    </section>

    <section className="ticker"><div className="ticker-inner"><span>Ideas worth carrying with you <b>✳</b></span><span>Ideas worth carrying with you <b>✳</b></span><span>Ideas worth carrying with you <b>✳</b></span></div></section>

    <section className="authors wrap section-pad"><div className="section-heading"><div><div className="eyebrow">GOOD COMPANY, GREAT BOOKS</div><h2>Meet the minds <em>behind the pages.</em></h2></div><Link href="/shop" className="text-link">Browse all authors <ArrowRight size={15}/></Link></div><div className="author-row">{authors.map(([initial, name, sub], i) => <Link href={`/shop?author=${encodeURIComponent(name)}`} className="author-item" key={name}><div className={`author-avatar avatar-${i}`}><span>{initial}</span></div><div><span className="author-kicker">{sub}</span><strong>{name}</strong></div><ArrowUpRight className="author-arrow" size={16}/></Link>)}</div></section>

    <section className="recommend section-pad"><div className="wrap"><div className="section-heading"><div><div className="eyebrow">A FEW WE THINK YOU’LL LOVE</div><h2>Picked for <em>your next chapter.</em></h2></div><Link href="/shop" className="text-link">See everything <ArrowRight size={15}/></Link></div><div className="feature-grid">{books.slice(0, 4).map(book => <BookCard key={book.id} book={book} compact/>)}</div></div></section>

    <section className="category-section wrap section-pad"><div className="section-heading"><div><div className="eyebrow">FOLLOW YOUR CURIOSITY</div><h2>Find your <em>kind of story.</em></h2></div><p className="section-aside">From page-turners to big ideas, there’s always somewhere new to begin.</p></div><div className="category-grid">{categories.map(([num, title, sub, category], i) => <Link href={`/shop?category=${encodeURIComponent(category)}`} className={`category-card category-${i}`} key={num}><span className="category-num">{num} / COLLECTION</span><span className="category-glyph">{["⌘", "✳", "❧", "☼"][i]}</span><span className="category-title">{title}</span><span className="category-sub">{sub}</span><span className="category-arrow"><ArrowUpRight size={17}/></span></Link>)}</div><Link href="/shop" className="category-all">Explore all categories <ArrowRight size={15}/></Link></section>

    <section className="best-section"><div className="wrap section-pad"><div className="section-heading"><div><div className="eyebrow">READER FAVOURITES, FOR GOOD REASON</div><h2>What everyone’s <em>reading.</em></h2></div><Link href="/shop" className="text-link">Shop bestsellers <ArrowRight size={15}/></Link></div><div className="best-grid">{books.slice(4, 8).map(book => <BookCard book={book} key={book.id}/>)}</div></div></section>

    <section className="newsletter wrap"><div className="newsletter-mark"><BookOpen size={24}/></div><div><div className="eyebrow">THE WISDOMBRIDGE LETTER</div><h2>Good stories deserve<br/><em>to be shared.</em></h2><p>New arrivals, thoughtful recommendations, and the occasional note from our bookshelves.</p></div><form className="newsletter-form" onSubmit={event => { event.preventDefault(); alert("Thanks for your interest! This demo does not store email addresses yet."); }}><label htmlFor="email">YOUR EMAIL ADDRESS</label><div><input id="email" type="email" required placeholder="you@example.com"/><button type="submit" aria-label="Subscribe"><ArrowRight size={18}/></button></div><small>Demo form · Your email isn’t stored or sent.</small></form></section>
  </>;
}
