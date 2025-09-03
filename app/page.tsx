
"use client";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Product = { id: string; title: string; price: number; image: string; category: string; };
const PRODUCTS: Product[] = [
  { id: "led_strip", title: "LED-lysstripe (USB)", price: 199, image: "/p_led_strip.png", category: "Underholdning" },
  { id: "bt_speaker", title: "Mini Bluetooth-høyttaler", price: 249, image: "/p_bt_speaker.png", category: "Underholdning" },
  { id: "powerbank", title: "Powerbank 10.000 mAh", price: 299, image: "/p_powerbank.png", category: "Gadgets" },
  { id: "bike_light", title: "Sykkellys – sett", price: 149, image: "/p_bike_light.png", category: "Sport" },
  { id: "rgb_bulb", title: "Smart RGB-pære (E27)", price: 179, image: "/p_rgb_bulb.png", category: "Underholdning" },
  { id: "mini_fan", title: "Bordvifte USB", price: 129, image: "/p_mini_fan.png", category: "Hjem & Kontor" },
  { id: "ring_light", title: "Selfie ring light", price: 189, image: "/p_ring_light.png", category: "Underholdning" },
  { id: "vr_headset", title: "VR-brille (mobil)", price: 349, image: "/p_vr_headset.png", category: "Underholdning" },
  { id: "action_cam", title: "Mini action-kamera", price: 499, image: "/p_action_cam.png", category: "Underholdning" },
  { id: "tripod", title: "Bordstativ/Tripod", price: 159, image: "/p_tripod.png", category: "Foto & Video" },
  { id: "usb_hub", title: "USB 3.0 4-port", price: 159, image: "/p_usb_hub.png", category: "Gadgets" },
  { id: "key_finder", title: "Bluetooth nøkkelfinner", price: 219, image: "/p_key_finder.png", category: "Gadgets" }
];

export default function HomePage() {
  const [cart, setCart] = useState<{id: string; qty: number}[]>([]);
  const add = (id: string) => setCart(prev => {
    const f = prev.find(p => p.id === id);
    if (f) return prev.map(p => p.id===id? {...p, qty: p.qty+1}:p);
    return [...prev, {id, qty:1}];
  });
  const remove = (id: string) => setCart(prev => prev.filter(p => p.id !== id));
  const items = cart.map(ci => ({ ...PRODUCTS.find(p => p.id===ci.id)!, qty: ci.qty }));
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  const categories = useMemo(() => {
    const set = new Set(PRODUCTS.map(p => p.category));
    return ["Alle", ...Array.from(set)];
  }, []);
  const [filter, setFilter] = useState("Alle");
  const list = filter==="Alle" ? PRODUCTS : PRODUCTS.filter(p => p.category===filter);

  const checkout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: items.map(i => ({ id: i.id, qty: i.qty })) }),
    });
    const data = await res.json();
    if (data?.url) window.location.href = data.url;
    else alert(data?.error || "Klarte ikke å starte betaling.");
  };

  return (
    <div className="container p-4">
      <div className="my-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Små, kule og nyttige dubeditter</h1>
        <p className="text-gray-600 mt-2">Rask utsjekk via Stripe. Gratis frakt over 500 kr.</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1 rounded-full border ${filter===c? 'bg-black text-white' : 'bg-white hover:bg-gray-50'}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {list.map(p => (
          <Card key={p.id}>
            <CardContent className="p-4">
              <img src={p.image} alt={p.title} className="w-full h-28 object-contain" />
              <div className="mt-2 font-semibold">{p.title}</div>
              <div className="text-sm text-gray-600">{p.category}</div>
              <div className="mt-1 font-bold">{p.price} kr</div>
              <Button className="mt-2 w-full" onClick={() => add(p.id)}>Legg i kurv</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="sticky bottom-4 left-0 right-0">
        <div className="container px-4">
          {items.length > 0 && (
            <div className="rounded-2xl bg-white border shadow-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="text-sm">
                {items.map(i => (
                  <div key={i.id} className="flex items-center gap-2">
                    <span>{i.title} × {i.qty}</span>
                    <button className="text-red-600 underline" onClick={() => remove(i.id)}>Fjern</button>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-3 md:mt-0">
                <div className="font-bold">Sum: {total} kr</div>
                <Button onClick={checkout}>Gå til betaling</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
