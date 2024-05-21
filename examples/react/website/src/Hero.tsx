export type HeroProps = {
  title: string;
  subline: string;
  buttonText: string;
  secondaryButtonText: string;
};

export function Hero({
  title,
  subline,
  buttonText,
  secondaryButtonText,
}: HeroProps) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{subline}</p>
      <div className="actions">
        <button>{buttonText}</button>
        <button>{secondaryButtonText}</button>
      </div>
    </div>
  );
}
