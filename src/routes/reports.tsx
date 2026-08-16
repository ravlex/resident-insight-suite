import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/reports")({
  component: () => (
    <div className="flex flex-col items-center justify-center h-full text-muted-foreground italic">
      Раздел "Отчеты и аналитика" находится в разработке...
    </div>
  ),
  head: () => ({
    meta: [{ title: "Отчеты | ИВЦ ЖКХ" }],
  })
});
