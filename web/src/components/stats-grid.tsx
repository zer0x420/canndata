// src/components/stats-grid.tsx
const StatsGrid = ({ stats }: { stats: Record<string, string | number | undefined | any> }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
    {Object.entries(stats).map(([key, value]) => (
      <div key={key} className="bg-muted rounded-md p-4 text-center">
        <div className="text-sm text-muted-foreground uppercase">{key}</div>
        <div className="text-xl font-semibold">{value ?? "-"}</div>
      </div>
    ))}
  </div>
)

export default StatsGrid
