// Section or page heading with an optional subtitle. Text is passed in as props (from data/pages.js).
const sizes = {
    h1: "text-4xl md:text-5xl",
    h2: "text-3xl md:text-4xl",
  };
  
  export default function SectionHeading({
    title,
    subtitle = "",
    align = "start",
    as: Tag = "h2",
  }) {
    if (!title) return null;
  
    const isCenter = align === "center";
  
    return (
      <div className={`mb-8 md:mb-10 ${isCenter ? "text-center" : "text-start"}`}>
        <Tag
          className={`font-heading font-bold leading-tight text-ink ${sizes[Tag] ?? sizes.h2}`}
        >
          {title}
        </Tag>
        {subtitle ? (
          <p
            className={`mt-3 max-w-[62ch] text-lg text-ink-muted ${isCenter ? "mx-auto" : ""}`}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
    );
  }