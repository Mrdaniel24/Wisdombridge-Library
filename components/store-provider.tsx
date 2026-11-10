"use client";
import { createContext, useContext, useEffect, useState } from "react";
type Store = { cart: Record<string,number>; wishlist: string[]; lang:"EN"|"SW"; toggleLang:()=>void; add:(id:string)=>void; setQty:(id:string,n:number)=>void; remove:(id:string)=>void; toggleWish:(id:string)=>void };
const Context=createContext<Store|null>(null);
export function StoreProvider({children}:{children:React.ReactNode}) {
 const [cart,setCart]=useState<Record<string,number>>({}); const [wishlist,setWishlist]=useState<string[]>([]); const [lang,setLang]=useState<"EN"|"SW">("EN"); const [ready,setReady]=useState(false);
 useEffect(()=>{try{setCart(JSON.parse(localStorage.getItem("ph-cart")||"{}"));setWishlist(JSON.parse(localStorage.getItem("ph-wishlist")||"[]"));setLang((localStorage.getItem("ph-lang") as "EN"|"SW")||"EN")}catch{}setReady(true)},[]);
 useEffect(()=>{if(ready){localStorage.setItem("ph-cart",JSON.stringify(cart));localStorage.setItem("ph-wishlist",JSON.stringify(wishlist));localStorage.setItem("ph-lang",lang)}},[cart,wishlist,lang,ready]);
 const add=(id:string)=>setCart(c=>({...c,[id]:(c[id]||0)+1})); const setQty=(id:string,n:number)=>setCart(c=>{const x={...c}; if(n<1)delete x[id];else x[id]=n;return x}); const remove=(id:string)=>setCart(c=>{const x={...c};delete x[id];return x}); const toggleWish=(id:string)=>setWishlist(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);
 return <Context.Provider value={{cart,wishlist,lang,toggleLang:()=>setLang(l=>l==="EN"?"SW":"EN"),add,setQty,remove,toggleWish}}>{children}</Context.Provider>
}
export function useStore(){const v=useContext(Context);if(!v)throw new Error("StoreProvider missing");return v}
