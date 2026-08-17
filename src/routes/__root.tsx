import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useState, useEffect, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  FileText, 
  Settings,
  Bell,
  Search,
  User,
  Menu,
  X,
  Ticket,
  CheckSquare
} from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { cn } from "@/lib/utils";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Страница не найдена</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Запрашиваемая страница не существует или была перемещена.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Ошибка загрузки страницы
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Что-то пошло не так. Попробуйте обновить страницу или вернуться на главную.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Попробовать снова
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            На главную
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ИВЦ ЖКХ и ТЭК | Личный кабинет УК" },
      { name: "description", content: "Система управления взаиморасчетами и работы с абонентами" },
      { property: "og:title", content: "ИВЦ ЖКХ и ТЭК | Личный кабинет УК" },
      { property: "og:description", content: "Личный кабинет управляющей компании и РСО" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function SidebarItem({ 
  to, 
  icon: Icon, 
  children,
  onClick
}: { 
  to: string; 
  icon: any; 
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      activeProps={{ className: "bg-primary/10 text-primary" }}
      inactiveProps={{ className: "text-muted-foreground hover:bg-accent hover:text-foreground" }}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all"
    >
      <Icon className="h-4 w-4" />
      {children}
    </Link>
  );
}

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [role, setRole] = useState<'admin' | 'resident'>('admin');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Поиск по запросу: "${searchQuery}"\nПоиск осуществляется по л/с, адресам и номерам заявок.`);
    }
  };


  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen relative">
        {/* Sidebar Overlay for Mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={cn(
          "w-64 border-r bg-card flex flex-col fixed inset-y-0 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="h-16 flex items-center justify-between px-6 border-b">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent truncate">
              {role === 'admin' ? 'ИВЦ ЖКХ и ТЭК' : 'Мой Дом'}
            </span>
            <button 
              className="lg:hidden p-2 rounded-md hover:bg-accent"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {role === 'admin' ? (
              <>
                <SidebarItem to="/" icon={LayoutDashboard} onClick={() => setIsSidebarOpen(false)}>Дашборд</SidebarItem>
                <SidebarItem to="/debtors" icon={Users} onClick={() => setIsSidebarOpen(false)}>Должники</SidebarItem>
                <SidebarItem to="/requests" icon={MessageSquare} onClick={() => setIsSidebarOpen(false)}>Обращения</SidebarItem>
                <SidebarItem to="/tickets" icon={Ticket} onClick={() => setIsSidebarOpen(false)}>Взаимодействие с ИВЦ</SidebarItem>
                <SidebarItem to="/tasks" icon={CheckSquare} onClick={() => setIsSidebarOpen(false)}>Задачи</SidebarItem>
                <SidebarItem to="/reports" icon={FileText} onClick={() => setIsSidebarOpen(false)}>Отчеты</SidebarItem>
              </>
            ) : (
              <>
                <SidebarItem to="/resident/" icon={LayoutDashboard} onClick={() => setIsSidebarOpen(false)}>Главная</SidebarItem>
                <SidebarItem to="/resident/bills" icon={FileText} onClick={() => setIsSidebarOpen(false)}>Квитанции</SidebarItem>
              </>
            )}
            <div className="pt-4 mt-4 border-t border-border">
              <SidebarItem to="/notifications" icon={Bell} onClick={() => setIsSidebarOpen(false)}>Уведомления</SidebarItem>
              <SidebarItem to="/settings" icon={Settings} onClick={() => setIsSidebarOpen(false)}>Настройки</SidebarItem>
            </div>
          </nav>
          <div className="p-4 border-t border-border mt-auto">
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                УК
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium truncate">{role === 'admin' ? 'ООО "Уютный Дом"' : 'Иванов А.И.'}</span>
                <button className="text-xs text-primary font-medium hover:underline text-left" onClick={() => setRole(r => r === 'admin' ? 'resident' : 'admin')}>
                  Сменить роль ({role === 'admin' ? 'Админ' : 'Житель'})
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-16 border-b bg-card/50 backdrop-blur sticky top-0 z-40 flex items-center justify-between px-4 sm:px-8">
            <div className="flex items-center gap-4 flex-1">
              <button 
                className="lg:hidden p-2 rounded-md hover:bg-accent"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
              <form onSubmit={handleSearch} className="relative w-full max-w-md hidden sm:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Поиск по л/с, адресу или ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-background border rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </form>

            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to="/notifications" className="relative p-2 rounded-full hover:bg-accent transition-colors block">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
              </Link>
              <button className="p-2 rounded-full hover:bg-accent transition-colors">
                <User className="h-5 w-5" />
              </button>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-8 overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

