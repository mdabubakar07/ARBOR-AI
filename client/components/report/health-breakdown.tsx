import { Leaf, TreePine, Sprout } from 'lucide-react'
import type { Assessment } from '@/lib/arbor'
import { HealthCategoryCard } from './health-category-card'

export function HealthBreakdown({ assessment }: { assessment: Assessment }) {
  return (
    <div>
      <p className="font-mono text-xs tracking-[0.25em] text-primary">
        VISIBLE BREAKDOWN
      </p>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <HealthCategoryCard
          title="LEAF"
          icon={Leaf}
          result={assessment.leaf}
          delay={0}
        />
        <HealthCategoryCard
          title="STEM"
          icon={TreePine}
          result={assessment.stem}
          delay={0.08}
        />
        <HealthCategoryCard
          title="GROUND"
          icon={Sprout}
          result={assessment.ground}
          delay={0.16}
        />
      </div>
    </div>
  )
}
