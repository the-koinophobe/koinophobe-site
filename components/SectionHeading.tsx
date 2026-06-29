import { Reveal } from "./Reveal";

type Props = {
  kicker?: string;
  title: string;
  intro?: string;
  center?: boolean;
  titleAs?: "h1" | "h2";
};

export function SectionHeading({ kicker, title, intro, center = false, titleAs = "h2" }: Props) {
  const Title = titleAs;
  return (
    <Reveal className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {kicker && (
        <span className="mb-3 inline-block rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
          {kicker}
        </span>
      )}
      <Title className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </Title>
      {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
    </Reveal>
  );
}
