// Centres page content with a max width of about 1180px. Reads no data.
export default function Container({ children, className = "", as: Tag = "div" }) {
    return (
      <Tag className={`mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8 ${className}`}>
        {children}
      </Tag>
    );
  }