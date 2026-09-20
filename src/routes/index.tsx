import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  categories,
  connections,
  receipts,
  type ReceiptCategory,
  type ReceiptMoment,
} from "../data/receipts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LIFE//RECEIPTS — Every ordinary moment leaves a trace" },
      {
        name: "description",
        content: "An interactive digital museum exploring the quiet connections hidden inside everyday digital receipts.",
      },
      { property: "og:title", content: "LIFE//RECEIPTS" },
      { property: "og:description", content: "Every ordinary moment leaves a trace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LifeReceipts,
});

function LifeReceipts() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ReceiptCategory | "all">("all");
  const [selectedId, setSelectedId] = useState(receipts[0].id);

  const visibleReceipts = useMemo(
    () => receipts.filter((receipt) => activeCategory === "all" || receipt.category === activeCategory),
    [activeCategory],
  );

  useEffect(() => {
    if (!visibleReceipts.some((receipt) => receipt.id === selectedId) && visibleReceipts[0]) {
      setSelectedId(visibleReceipts[0].id);
    }
  }, [selectedId, visibleReceipts]);

  const selected = receipts.find((receipt) => receipt.id === selectedId) ?? receipts[0];

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <MuseumNav menuOpen={menuOpen} onMenuChange={setMenuOpen} />
      <main>
        <section className="hero-field relative flex min-h-[94svh] flex-col px-5 pb-8 pt-28 sm:px-8 lg:px-12 lg:pt-32">
          <div className="hero-crosshair" aria-hidden="true" />
          <div className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col justify-between">
            <div className="grid grid-cols-12 gap-4">
              <p className="col-span-7 font-mono text-[10px] uppercase leading-relaxed text-muted-foreground sm:col-span-4">
                An interactive archive<br />of ordinary evidence
              </p>
              <p className="col-span-5 text-right font-mono text-[10px] uppercase leading-relaxed text-muted-foreground sm:col-start-10 sm:col-span-3">
                Collection 001<br />2025—2026
              </p>
            </div>

            <div className="py-16 sm:py-20 lg:py-10">
              <p className="mb-5 font-mono text-[11px] uppercase text-signal-red">Open archive / 1,284 traces</p>
              <h1 className="max-w-[1400px] font-display text-[clamp(4rem,14vw,13rem)] font-light uppercase leading-[0.72]">
                <span className="block">Life</span>
                <span className="ml-[12vw] block italic text-paper">Receipts</span>
              </h1>
            </div>

            <div className="grid items-end gap-8 border-t border-border pt-5 sm:grid-cols-2 lg:grid-cols-12">
              <p className="max-w-sm font-display text-2xl font-light leading-tight sm:text-3xl lg:col-span-5">
                Every ordinary moment<br />leaves a trace.
              </p>
              <a
                href="#constellation"
                className="group flex items-center justify-between border-b border-foreground pb-2 font-mono text-[11px] uppercase sm:justify-self-end lg:col-span-3 lg:col-start-10 lg:w-full"
              >
                Enter the constellation
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section id="constellation" className="scroll-mt-20 border-t border-border bg-ink px-5 py-20 text-ink-foreground sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1500px]">
            <SectionHeader index="01" label="The constellation" title="Nothing happens alone." />
            <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-ink-border py-4">
              <span className="mr-2 font-mono text-[9px] uppercase text-ink-muted">Filter traces</span>
              <FilterButton active={activeCategory === "all"} onClick={() => setActiveCategory("all")}>
                All
              </FilterButton>
              {categories.map((category) => (
                <FilterButton
                  key={category.id}
                  category={category.id}
                  active={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </FilterButton>
              ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
              <Constellation
                receipts={receipts}
                connections={connections}
                visibleReceipts={visibleReceipts}
                selectedId={selected.id}
                onSelect={setSelectedId}
              />
              <ReceiptDetail receipt={selected} />
            </div>
          </div>
        </section>

        <section id="stories" className="bg-paper px-5 py-20 text-paper-foreground sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1500px]">
            <SectionHeader index="02" label="A found pattern" title="The night train home." dark />
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
              <div className="lg:col-span-5 lg:col-start-2">
                <p className="font-display text-4xl font-light leading-[1.08] sm:text-5xl lg:text-6xl">
                  Six late journeys.<br />One song, every time.
                </p>
                <p className="mt-8 max-w-md text-sm leading-7 text-paper-muted">
                  A listening history and a location trail tell a story neither could tell alone. Across four months, the same track appears within minutes of the same platform.
                </p>
              </div>
              <div className="lg:col-span-5 lg:col-start-8">
                <PatternList />
              </div>
            </div>
            <div className="mt-20 grid gap-6 border-t border-paper-border pt-6 sm:grid-cols-3 lg:mt-28">
              <Metric value="04" label="months apart" />
              <Metric value="06" label="matching journeys" />
              <Metric value="1:17" label="hours remembered" />
            </div>
          </div>
        </section>

        <section id="about" className="border-t border-border bg-background px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="font-mono text-[10px] uppercase text-muted-foreground">Museum note / 03</p>
            </div>
            <div className="lg:col-span-8 lg:col-start-5">
              <p className="font-display text-[clamp(2.3rem,5vw,5rem)] font-light leading-[1.04]">
                We leave behind more than data. We leave evidence of who we were becoming.
              </p>
              <div className="mt-14 flex flex-col gap-8 border-t border-border pt-6 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-lg text-sm leading-7 text-muted-foreground">
                  LIFE//RECEIPTS is an experiment in reading digital residue differently—not as metrics, but as memory, ritual, coincidence and change.
                </p>
                <a href="#constellation" className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase">
                  Return to archive
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <MuseumFooter />
    </div>
  );
}

function MuseumNav({ menuOpen, onMenuChange }: { menuOpen: boolean; onMenuChange: (open: boolean) => void }) {
  const items = [
    ["#constellation", "Archive"],
    ["#stories", "Stories"],
    ["#about", "About"],
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12" aria-label="Main navigation">
        <a href="#top" className="font-mono text-xs font-medium uppercase" aria-label="LIFE RECEIPTS home">LIFE//R<span className="text-signal-red">●</span></a>
        <div className="hidden items-center gap-10 sm:flex">
          {items.map(([href, label], index) => (
            <a key={href} href={href} className="nav-link font-mono text-[10px] uppercase text-muted-foreground">
              <span className="mr-2 text-signal-red">0{index + 1}</span>{label}
            </a>
          ))}
        </div>
        <button
          type="button"
          className="grid h-9 w-9 place-items-center border border-border sm:hidden"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => onMenuChange(!menuOpen)}
        >
          {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>
      {menuOpen && (
        <div className="border-t border-border bg-background px-5 py-5 sm:hidden">
          {items.map(([href, label], index) => (
            <a key={href} href={href} onClick={() => onMenuChange(false)} className="flex border-b border-border py-4 font-mono text-xs uppercase">
              <span className="mr-4 text-signal-red">0{index + 1}</span>{label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function SectionHeader({ index, label, title, dark = false }: { index: string; label: string; title: string; dark?: boolean }) {
  return (
    <div className="mb-14 grid gap-6 lg:mb-20 lg:grid-cols-12">
      <p className={`font-mono text-[10px] uppercase ${dark ? "text-paper-muted" : "text-ink-muted"}`}>{index} / {label}</p>
      <h2 className="font-display text-5xl font-light leading-none sm:text-7xl lg:col-span-8 lg:col-start-5 lg:text-8xl">{title}</h2>
    </div>
  );
}

function FilterButton({ children, active, category, onClick }: { children: React.ReactNode; active: boolean; category?: ReceiptCategory; onClick: () => void }) {
  return (
    <button
      type="button"
      data-category={category}
      aria-pressed={active}
      onClick={onClick}
      className="filter-button font-mono text-[10px] uppercase"
    >
      {category && <span className="category-dot" />}{children}
    </button>
  );
}

function Constellation({ receipts: allReceipts, connections: allConnections, visibleReceipts, selectedId, onSelect }: {
  receipts: ReceiptMoment[];
  connections: Array<[string, string]>;
  visibleReceipts: ReceiptMoment[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const visibleIds = new Set(visibleReceipts.map((item) => item.id));
  return (
    <div className="constellation relative min-h-[520px] overflow-hidden border border-ink-border sm:min-h-[650px]" aria-label="Interactive constellation of digital receipts">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {allConnections.map(([fromId, toId]) => {
          const from = allReceipts.find((item) => item.id === fromId);
          const to = allReceipts.find((item) => item.id === toId);
          if (!from || !to) return null;
          const visible = visibleIds.has(fromId) && visibleIds.has(toId);
          return <line key={`${fromId}-${toId}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} className={visible ? "constellation-line" : "constellation-line opacity-10"} />;
        })}
      </svg>
      <div className="absolute left-4 top-4 font-mono text-[9px] uppercase text-ink-muted">Map 01 — proximity + association</div>
      <div className="absolute bottom-4 right-4 font-mono text-[9px] uppercase text-ink-muted">Select a trace to inspect</div>
      {allReceipts.map((receipt, index) => {
        const visible = visibleIds.has(receipt.id);
        return (
          <button
            key={receipt.id}
            type="button"
            data-category={receipt.category}
            data-size={receipt.size}
            className="receipt-node"
            style={{ left: `${receipt.x}%`, top: `${receipt.y}%`, animationDelay: `${index * 110}ms` }}
            aria-label={`${receipt.title}, ${receipt.category}, ${receipt.date}`}
            aria-pressed={selectedId === receipt.id}
            disabled={!visible}
            onClick={() => onSelect(receipt.id)}
          >
            <span className="node-core" />
            <span className="node-label">{receipt.time}<br />{receipt.title}</span>
          </button>
        );
      })}
    </div>
  );
}

function ReceiptDetail({ receipt }: { receipt: ReceiptMoment }) {
  return (
    <aside key={receipt.id} className="receipt-slip self-start bg-paper p-6 text-paper-foreground sm:p-8" aria-live="polite">
      <div className="flex items-start justify-between border-b border-dashed border-paper-border pb-5">
        <p className="font-mono text-[10px] uppercase">L//R Archive</p>
        <p className="font-mono text-[10px] text-paper-muted">No. {receipt.id.slice(-2)}</p>
      </div>
      <div className="py-8">
        <div className="mb-8 flex items-center gap-2 font-mono text-[9px] uppercase text-paper-muted">
          <span className="category-dot" data-category={receipt.category} />{receipt.category}
        </div>
        <p className="font-mono text-[10px] text-paper-muted">{receipt.date} · {receipt.time}</p>
        <h3 className="mt-3 font-display text-4xl font-light leading-none">{receipt.title}</h3>
        <div className="mt-9 space-y-3 border-y border-dashed border-paper-border py-5 font-mono text-[10px] leading-relaxed">
          <p>{receipt.source}</p>
          <p>{receipt.detail}</p>
        </div>
        <p className="mt-8 font-display text-2xl font-light italic leading-snug">“{receipt.reflection}”</p>
      </div>
      <div className="flex justify-between border-t border-dashed border-paper-border pt-5 font-mono text-[9px] uppercase text-paper-muted">
        <span>Verified trace</span><span>LR/{receipt.id.toUpperCase()}</span>
      </div>
    </aside>
  );
}

function PatternList() {
  const entries = [
    ["12 Mar", "23:31", "King's Cross", "Nights"],
    ["28 Mar", "00:06", "King's Cross", "Nights"],
    ["19 Apr", "23:42", "King's Cross", "Nights"],
    ["02 Jun", "00:11", "King's Cross", "Nights"],
    ["16 Jun", "23:53", "King's Cross", "Nights"],
    ["07 Jul", "00:04", "King's Cross", "Nights"],
  ];
  return (
    <div className="border-t border-paper-foreground">
      {entries.map(([date, time, place, track], index) => (
        <div key={date} className="grid grid-cols-[28px_1fr_auto] items-center gap-3 border-b border-paper-border py-4 font-mono text-[9px] uppercase sm:grid-cols-[36px_1fr_1fr_auto]">
          <span className="text-paper-muted">0{index + 1}</span>
          <span>{date} · {time}</span>
          <span className="hidden text-paper-muted sm:block">{place}</span>
          <span className="italic">{track}</span>
        </div>
      ))}
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return <div><p className="font-display text-6xl font-light sm:text-7xl">{value}</p><p className="mt-2 font-mono text-[9px] uppercase text-paper-muted">{label}</p></div>;
}

function MuseumFooter() {
  return (
    <footer className="bg-ink px-5 py-10 text-ink-foreground sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-8 border-t border-ink-border pt-6 sm:flex-row sm:items-end sm:justify-between">
        <p className="font-display text-3xl font-light uppercase">Life//Receipts</p>
        <div className="flex gap-8 font-mono text-[9px] uppercase text-ink-muted">
          <span>WebRush 2026</span><span>Collection 001</span><span>All traces fictional</span>
        </div>
      </div>
    </footer>
  );
}