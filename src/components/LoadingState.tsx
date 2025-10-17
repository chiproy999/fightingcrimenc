// Simple skeleton component inline to avoid dependency issues

const LoadingState = () => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto container-mobile">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-police rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white font-bold text-2xl">FC</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-2">Loading Latest Updates...</h2>
          <p className="text-muted-foreground">Fetching real-time NC crime news</p>
        </div>
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card/50 backdrop-blur-sm rounded-lg p-6 space-y-4 border border-border/50">
                <div className="flex gap-2 mb-2">
                  <div className="h-5 w-16 bg-muted/70 rounded animate-pulse" />
                  <div className="h-5 w-20 bg-muted/70 rounded animate-pulse" />
                </div>
                <div className="h-6 w-full bg-muted/70 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-muted/70 rounded animate-pulse" />
                <div className="flex gap-4">
                  <div className="h-4 w-24 bg-muted/70 rounded animate-pulse" />
                  <div className="h-4 w-32 bg-muted/70 rounded animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted/70 rounded animate-pulse" />
                  <div className="h-4 w-full bg-muted/70 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-muted/70 rounded animate-pulse" />
                </div>
                <div className="h-9 w-32 bg-muted/70 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoadingState;