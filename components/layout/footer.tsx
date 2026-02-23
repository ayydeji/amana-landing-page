export function Footer() {
  return (
    <footer className=" bg-bg">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-6 py-6 lg:px-12">
        <span className="font-(family-name:--font-display) text-lg text-text">
          amana<span className="text-lime">.</span>compliance
        </span>
        <span className="text-sm text-text-faint">
          © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
