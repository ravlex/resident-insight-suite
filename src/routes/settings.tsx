import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
  component: () => (
    <div className="flex flex-col items-center justify-center h-full text-muted-foreground italic">
      Раздел "Настройки системы" находится в разработке...
    </div>
  ),
  head: () => ({
    meta: [{ title: "Настройки | ИВЦ ЖКХ" }],
  })
});
