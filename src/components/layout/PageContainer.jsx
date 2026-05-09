export default function PageContainer({ children, className = '' }) {
  return (
    <main className={`max-w-5xl mx-auto px-4 py-6 w-full ${className}`}>
      {children}
    </main>
  );
}
