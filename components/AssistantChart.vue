<template>
  <figure class="rounded-xl border border-gray-200 bg-white p-3 dark:border-navy-800 dark:bg-navy-950">
    <figcaption v-if="spec.titulo" class="mb-2 text-center text-xs font-semibold text-ink dark:text-gray-100">{{ spec.titulo }}</figcaption>

    <!-- Torta / dona -->
    <div v-if="spec.tipo === 'torta' || spec.tipo === 'dona'" class="flex items-center gap-3">
      <svg viewBox="0 0 100 100" class="h-28 w-28 shrink-0" role="img" :aria-label="spec.titulo || ''">
        <path v-for="(s, i) in slices" :key="i" :d="s.d" :fill="colors[i % colors.length]" stroke="white" stroke-width="1" class="dark:stroke-navy-950" />
        <circle v-if="spec.tipo === 'dona'" cx="50" cy="50" r="24" fill="white" class="dark:fill-navy-950" />
      </svg>
      <ul class="min-w-0 flex-1 space-y-1 text-xs">
        <li v-for="(d, i) in spec.datos" :key="i" class="flex items-center gap-2">
          <span class="h-2.5 w-2.5 shrink-0 rounded-sm" :style="{ background: colors[i % colors.length] }" />
          <span class="truncate text-ink-muted dark:text-gray-300">{{ d.etiqueta }}</span>
          <span class="ml-auto tabular-nums text-ink dark:text-gray-100">{{ fmt(Number(d[key])) }} · {{ pct(Number(d[key])) }}</span>
        </li>
      </ul>
    </div>

    <!-- Barras horizontales -->
    <ul v-else-if="horizontal" class="space-y-1.5 text-xs">
      <li v-for="(d, i) in spec.datos" :key="i">
        <div class="mb-0.5 flex justify-between gap-2"><span class="truncate text-ink-muted dark:text-gray-300">{{ d.etiqueta }}</span><span class="tabular-nums text-ink dark:text-gray-100">{{ fmt(Number(d[key])) }}</span></div>
        <div class="h-2 rounded bg-gray-100 dark:bg-navy-900"><div class="h-2 rounded bg-accent" :style="{ width: `${(Number(d[key]) / max) * 100}%` }" /></div>
      </li>
    </ul>

    <!-- Barras verticales / líneas -->
    <svg v-else :viewBox="`0 0 ${W} ${H}`" class="h-44 w-full" role="img" :aria-label="spec.titulo || ''">
      <line :x1="PL" :y1="H - PB" :x2="W - PR" :y2="H - PB" stroke="currentColor" class="text-gray-300 dark:text-navy-700" />
      <template v-if="spec.tipo === 'barras'">
        <g v-for="(d, i) in spec.datos" :key="i">
          <rect :x="xBand(i) + bandW * 0.15" :y="y(Number(d[key]))" :width="bandW * 0.7" :height="H - PB - y(Number(d[key]))" :fill="colors[0]" rx="2" />
          <text :x="xBand(i) + bandW / 2" :y="y(Number(d[key])) - 4" text-anchor="middle" class="fill-ink text-[9px] tabular-nums dark:fill-gray-100">{{ fmt(Number(d[key])) }}</text>
        </g>
      </template>
      <template v-else>
        <polyline :points="spec.datos.map((d, i) => `${xBand(i) + bandW / 2},${y(Number(d[key]))}`).join(' ')" fill="none" :stroke="colors[0]" stroke-width="2" />
        <g v-for="(d, i) in spec.datos" :key="i">
          <circle :cx="xBand(i) + bandW / 2" :cy="y(Number(d[key]))" r="3" :fill="colors[0]" />
          <text :x="xBand(i) + bandW / 2" :y="y(Number(d[key])) - 7" text-anchor="middle" class="fill-ink text-[9px] tabular-nums dark:fill-gray-100">{{ fmt(Number(d[key])) }}</text>
        </g>
      </template>
      <text v-for="(d, i) in spec.datos" :key="'l' + i" :x="xBand(i) + bandW / 2" :y="H - PB + 12" text-anchor="middle" class="fill-ink-soft text-[8.5px] dark:fill-gray-400">{{ short(String(d.etiqueta)) }}</text>
    </svg>
  </figure>
</template>

<script setup lang="ts">
import type { ChartSpec } from '~/composables/useAssistant'
const props = defineProps<{ spec: ChartSpec }>()
const { locale } = useI18n()

const colors = ['#2E6DB4', '#1F3A5F', '#7FA8DC', '#5F82AC', '#97AECB', '#C3D1E3', '#274F86', '#0F1D30']
const key = computed(() => props.spec.series[0].clave)
// En un panel angosto, más de 5 barras o etiquetas largas se leen mejor en horizontal.
const horizontal = computed(
  () => props.spec.tipo === 'barras_horizontales' || (props.spec.tipo === 'barras' && (props.spec.datos.length > 5 || props.spec.datos.some((d) => String(d.etiqueta).length > 10))),
)
const values = computed(() => props.spec.datos.map((d) => Number(d[key.value]) || 0))
const max = computed(() => Math.max(...values.value, 0.0001))
const total = computed(() => values.value.reduce((a, b) => a + b, 0) || 1)

const fmt = (v: number) => {
  const n = new Intl.NumberFormat(locale.value === 'en' ? 'en-US' : 'es-PY', { maximumFractionDigits: 1 }).format(v)
  if (props.spec.formato === 'porcentaje') return `${n}%`
  if (props.spec.formato === 'anios') return locale.value === 'en' ? `${n} yr` : `${n} a`
  return n
}
const pct = (v: number) => `${Math.round((v / total.value) * 100)}%`
const short = (s: string) => (s.length > 11 ? s.slice(0, 10) + '…' : s)

const W = 320
const H = 170
const PL = 8
const PR = 8
const PB = 18
const PT = 16
const bandW = computed(() => (W - PL - PR) / Math.max(props.spec.datos.length, 1))
const xBand = (i: number) => PL + i * bandW.value
const y = (v: number) => H - PB - (v / max.value) * (H - PB - PT)

const slices = computed(() => {
  let a0 = -Math.PI / 2
  return values.value.map((v) => {
    const a1 = a0 + (v / total.value) * Math.PI * 2
    const large = a1 - a0 > Math.PI ? 1 : 0
    const p = (a: number) => `${50 + 48 * Math.cos(a)},${50 + 48 * Math.sin(a)}`
    const d = `M50,50 L${p(a0)} A48,48 0 ${large} 1 ${p(a1 - 0.0001)} Z`
    a0 = a1
    return { d }
  })
})
</script>
