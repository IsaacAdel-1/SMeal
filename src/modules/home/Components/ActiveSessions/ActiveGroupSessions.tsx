import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import type { ActiveSessionType } from "../../types";
import ActiveSession from "./ActiveSession";

export default function ActiveGroupSessions({
  sessions,
  isLoading,
}: {
  sessions: ActiveSessionType[] | undefined;
  isLoading: boolean;
}) {
  const { t, i18n } = useTranslation();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const list = sessions ?? [];

  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => setCurrent(carouselApi.selectedScrollSnap());
    carouselApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      carouselApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [carouselApi]);

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold text-foreground">{t("activeGroupSessions.title")}</h2>

      {isLoading ? (
        <div className="h-44 animate-pulse rounded-2xl border border-border bg-card" />
      ) : list.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-card p-6 text-muted-foreground">
          {t("activeGroupSessions.empty")}
        </p>
      ) : (
        <>
          {/* Re-create the carousel when the reading direction changes. */}
          <Carousel key={i18n.dir()} setApi={setCarouselApi} opts={{ direction: i18n.dir() }}>
            <CarouselContent>
              {list.map((session) => (
                <CarouselItem key={session.sessionId} className="lg:basis-1/2">
                  <ActiveSession session={session} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {list.length > 1 && (
            <div className="mt-4 flex justify-center gap-2">
              {list.map((session, i) => (
                <button
                  type="button"
                  key={session.sessionId}
                  aria-label={t("activeGroupSessions.goToSession", { number: i + 1 })}
                  aria-current={i === current}
                  onClick={() => carouselApi?.scrollTo(i)}
                  className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-brand" : "w-2 bg-surface-control"}`}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
