import { useState, useEffect, useRef } from 'react'
import { FLEET_VEHICLES, FLEET_METRICS } from '../data/mockData'

// Simulates live telemetry updates
export function useLiveTelemetry() {
  const [vehicles, setVehicles] = useState(FLEET_VEHICLES)
  const [metrics, setMetrics] = useState({ activeVehicles: 4, onTime: 94, alertCount: 3, efficiency: 89 })
  const [tick, setTick] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setVehicles(prev => prev.map(v => {
        if (v.status !== 'active') return v
        const speedDelta = (Math.random() - 0.5) * 6
        const newSpeed = Math.max(20, Math.min(90, v.speed + speedDelta))
        const newFuel = Math.max(10, v.fuel - 0.02)
        const latDelta = (Math.random() - 0.5) * 0.001
        const lngDelta = (Math.random() - 0.5) * 0.001
        return { ...v, speed: Math.round(newSpeed), fuel: Math.round(newFuel * 10) / 10, lat: v.lat + latDelta, lng: v.lng + lngDelta }
      }))
      setMetrics(prev => ({
        ...prev,
        onTime: Math.max(85, Math.min(99, prev.onTime + (Math.random() - 0.5))),
        efficiency: Math.max(80, Math.min(98, prev.efficiency + (Math.random() - 0.5) * 0.5)),
      }))
      setTick(t => t + 1)
    }, 2000)
    return () => clearInterval(intervalRef.current)
  }, [])

  return { vehicles, metrics, tick }
}

export function useStreamingMetric(base, variance = 5, interval = 1500) {
  const [value, setValue] = useState(base)
  useEffect(() => {
    const id = setInterval(() => {
      setValue(Math.round((base + (Math.random() - 0.5) * variance) * 10) / 10)
    }, interval)
    return () => clearInterval(id)
  }, [base, variance, interval])
  return value
}
