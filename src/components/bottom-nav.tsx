"use client";
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Scale, Clock, Folder, Calendar, User } from 'lucide-react';

const items = [
  { path: '/', label: 'Today', icon: Clock },
  { path: '/cases', label: 'Cases', icon: Folder },
  { path: '/calendar', label: 'Calendar', icon: Calendar },
  { path: '/profile', label: 'Profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    if (path === '/cases') return pathname.startsWith('/cases') || pathname.startsWith('/case');
    return pathname.startsWith(path);
  };

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-card px-5 py-6 lg:flex">
        <Link href="/" className="mb-10 flex items-center gap-3 rounded-xl px-2" aria-label="AdvDiary home">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-navy-900 text-white shadow-sm">
            <Scale className="size-6" strokeWidth={1.8} />
          </span>
          <span className="min-w-0">
            <span className="block text-lg font-bold tracking-tight text-foreground">AdvDiary</span>
            <span className="block text-xs text-muted-foreground">Legal practice workspace</span>
          </span>
        </Link>

        <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          Workspace
        </div>
        <nav aria-label="Main navigation" className="flex flex-col gap-1">
          {items.map(item => {
            const active = isActive(item.path);
            return (
              <Link key={item.path} href={item.path} aria-current={active ? 'page' : undefined}
                className={`nav-link flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm ${active ? 'bg-navy-900 text-white shadow-sm dark:bg-white dark:text-navy-900' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                <item.icon className="size-[18px] shrink-0" strokeWidth={1.8} />
                <span className={active ? 'font-semibold' : 'font-medium'}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto rounded-2xl border border-border bg-background p-4">
          <div className="mb-2 flex size-9 items-center justify-center rounded-xl bg-gold-400/15 text-gold-500">
            <Scale className="size-[18px]" strokeWidth={1.8} />
          </div>
          <p className="text-sm font-semibold text-foreground">Your practice, in order.</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Cases, hearings, and clients together in one place.</p>
        </div>
      </aside>

      <nav aria-label="Main navigation" className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card pb-safe lg:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-around gap-1 px-2 pt-1.5">
          {items.map(item => {
            const active = isActive(item.path);
            return (
              <button key={item.path} onClick={() => router.push(item.path)} aria-current={active ? 'page' : undefined}
                className={`nav-link flex min-h-12 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-2 ${active ? 'bg-navy-900/8 dark:bg-white/8' : ''}`}>
                <item.icon className={`size-[22px] transition-transform duration-200 ${active ? 'scale-105 text-navy-900 dark:text-white' : 'text-slate-400'}`} strokeWidth={1.75} />
                <span className={`text-[10px] ${active ? 'font-semibold text-navy-900 dark:text-white' : 'font-medium text-slate-400'}`}>{item.label}</span>
                {active && <div className="nav-indicator h-[3px] w-4 rounded-full bg-navy-900 dark:bg-white" />}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
