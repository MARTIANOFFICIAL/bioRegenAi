"use client"

import { useEffect, useRef } from "react"

interface BiomarkerLineChartProps {
  biomarkerType: string
  diseaseFilter: string
}

export function BiomarkerLineChart({ biomarkerType, diseaseFilter }: BiomarkerLineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Generate mock data for the line chart
  const generateLineData = () => {
    const biomarkers = getBiomarkers(biomarkerType)
    const ages = [20, 30, 40, 50, 60, 70, 80, 90]

    const data: { [key: string]: number[] } = {}

    biomarkers.forEach((biomarker) => {
      const values: number[] = []

      // Generate age-dependent values with some randomness
      ages.forEach((age, i) => {
        let baseValue = 0

        // Different patterns based on biomarker type
        if (biomarkerType === "epigenetic") {
          // Epigenetic age increases faster than chronological age as people get older
          baseValue = age * (1 + (i / ages.length) * 0.5)
        } else if (biomarkerType === "telomere") {
          // Telomere length decreases with age
          baseValue = 100 - age * 0.8 - i * i
        } else if (biomarkerType === "inflammatory") {
          // Inflammatory markers tend to increase with age, especially after 50
          baseValue = 20 + (age > 50 ? (age - 50) * 1.5 : age * 0.2)
        } else if (biomarkerType === "metabolic") {
          // Metabolic markers often show nonlinear patterns
          baseValue = 80 + Math.sin(age / 10) * 20 + age / 10
        }

        // Add some randomness
        const randomFactor = 0.85 + Math.random() * 0.3
        values.push(baseValue * randomFactor)
      })

      data[biomarker] = values
    })

    return { biomarkers, ages, data }
  }

  const getBiomarkers = (type: string) => {
    // Return a subset of biomarkers based on type
    const allBiomarkers = {
      epigenetic: ["DNAm GrimAge", "DNAm PhenoAge", "Horvath Clock"],
      telomere: ["Leukocyte TL", "Lymphocyte TL"],
      inflammatory: ["IL-6", "CRP", "TNF-α"],
      metabolic: ["Glucose", "HbA1c", "Cholesterol"],
    }

    return allBiomarkers[type as keyof typeof allBiomarkers] || ["Biomarker 1", "Biomarker 2"]
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { biomarkers, ages, data } = generateLineData()

    // Set canvas dimensions
    canvas.width = 800
    canvas.height = 400

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set padding
    const padding = { left: 60, right: 40, top: 20, bottom: 60 }

    // Calculate chart dimensions
    const chartWidth = canvas.width - padding.left - padding.right
    const chartHeight = canvas.height - padding.top - padding.bottom

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(padding.left, padding.top)
    ctx.lineTo(padding.left, canvas.height - padding.bottom)
    ctx.lineTo(canvas.width - padding.right, canvas.height - padding.bottom)
    ctx.strokeStyle = "#000"
    ctx.stroke()

    // Draw x-axis labels (ages)
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.font = "12px Arial"

    ages.forEach((age, i) => {
      const x = padding.left + (i / (ages.length - 1)) * chartWidth
      ctx.fillText(age.toString(), x, canvas.height - padding.bottom + 10)
    })

    // Draw x-axis title
    ctx.fillText("Age (years)", canvas.width / 2, canvas.height - 15)

    // Calculate y-axis scale
    let minValue = Number.POSITIVE_INFINITY
    let maxValue = Number.NEGATIVE_INFINITY

    Object.values(data).forEach((values) => {
      values.forEach((value) => {
        minValue = Math.min(minValue, value)
        maxValue = Math.max(maxValue, value)
      })
    })

    // Add some padding to the y-axis scale
    minValue = Math.max(0, minValue * 0.9)
    maxValue = maxValue * 1.1

    // Draw y-axis labels
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"

    const yLabelCount = 5
    for (let i = 0; i <= yLabelCount; i++) {
      const value = minValue + (maxValue - minValue) * (i / yLabelCount)
      const y = canvas.height - padding.bottom - (i / yLabelCount) * chartHeight

      ctx.fillText(value.toFixed(1), padding.left - 10, y)

      // Draw grid line
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(canvas.width - padding.right, y)
      ctx.strokeStyle = "#eee"
      ctx.stroke()
    }

    // Draw y-axis title
    ctx.save()
    ctx.translate(15, canvas.height / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.textAlign = "center"
    ctx.fillText(getBiomarkerLabel(biomarkerType), 0, 0)
    ctx.restore()

    // Draw lines for each biomarker
    const colors = ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33"]

    biomarkers.forEach((biomarker, index) => {
      const values = data[biomarker]

      ctx.beginPath()

      values.forEach((value, i) => {
        const x = padding.left + (i / (ages.length - 1)) * chartWidth
        const y = canvas.height - padding.bottom - ((value - minValue) / (maxValue - minValue)) * chartHeight

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.strokeStyle = colors[index % colors.length]
      ctx.lineWidth = 2
      ctx.stroke()

      // Add data points
      values.forEach((value, i) => {
        const x = padding.left + (i / (ages.length - 1)) * chartWidth
        const y = canvas.height - padding.bottom - ((value - minValue) / (maxValue - minValue)) * chartHeight

        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fillStyle = colors[index % colors.length]
        ctx.fill()
      })
    })

    // Draw legend
    const legendX = canvas.width - padding.right - 150
    const legendY = padding.top + 20

    biomarkers.forEach((biomarker, index) => {
      const y = legendY + index * 20

      // Draw line
      ctx.beginPath()
      ctx.moveTo(legendX, y)
      ctx.lineTo(legendX + 20, y)
      ctx.strokeStyle = colors[index % colors.length]
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw point
      ctx.beginPath()
      ctx.arc(legendX + 10, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = colors[index % colors.length]
      ctx.fill()

      // Draw label
      ctx.fillStyle = "#000"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText(biomarker, legendX + 30, y)
    })
  }, [biomarkerType, diseaseFilter])

  const getBiomarkerLabel = (type: string) => {
    switch (type) {
      case "epigenetic":
        return "Epigenetic Age (years)"
      case "telomere":
        return "Telomere Length (kb)"
      case "inflammatory":
        return "Inflammatory Marker Level (pg/mL)"
      case "metabolic":
        return "Metabolic Marker Level (mg/dL)"
      default:
        return "Biomarker Value"
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <canvas ref={canvasRef} className="min-w-full" style={{ height: "400px" }} />
      <p className="text-center text-sm text-muted-foreground mt-2">
        Age-related changes in {biomarkerType} biomarkers
      </p>
    </div>
  )
}

