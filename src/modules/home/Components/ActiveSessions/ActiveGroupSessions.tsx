import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import useActiveSessions from "../../hooks/useActiveSession";
import type { ActiveSessionType } from "../../types";
import ActiveSession from "./ActiveSession";

export default function ActiveGroupSessions() {
  const { t, i18n } = useTranslation();
  const { data: sessions } = useActiveSessions();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => setCurrent(carouselApi.selectedScrollSnap());
    carouselApi.on("select", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  return (
    <div>
      <h2>{t("activeGroupSessions.title")}</h2>

      <Carousel setApi={setCarouselApi} opts={{ direction: i18n.dir() }}>
        <CarouselContent>
          {sessions?.data?.map((session: ActiveSessionType) => (
            <CarouselItem key={session.sessionId}>
              <ActiveSession session={session} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-4 flex justify-center gap-2">
        {sessions?.data?.map((session: ActiveSessionType, i: number) => (
          <button
            key={session.sessionId}
            aria-label={t("activeGroupSessions.goToSession", { number: i + 1 })}
            onClick={() => carouselApi?.scrollTo(i)}
            className={`h-2 rounded-full ${
              i === current ? "w-6 bg-brand" : "w-2 bg-surface-control"
            }`}
          />
        ))}
      </div>
    </div>
  );
}