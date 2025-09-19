export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse-slow">
        <div className="w-16 h-16 bg-accent rounded-full opacity-20"></div>
      </div>
    </div>
  );
}
