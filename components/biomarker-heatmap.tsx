"use client"

import { useEffect, useRef } from "react"

interface BiomarkerHeatmapProps {
  biomarkerType: string
  ageRange: string
  diseaseFilter: string
}

export function BiomarkerHeatmap({ biomarkerType, ageRange, diseaseFilter }: BiomarkerHeatmapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Mock data for the heatmap
  const generateHeatmapData = () => {
    const biomarkers = getBiomarkers(biomarkerType)
    const diseases = getDiseases(diseaseFilter)

    const data: number[][] = []
    for (let i = 0; i < biomarkers.length; i++) {
      const row: number[] = []
      for (let j = 0; j < diseases.length; j++) {
        // Generate a correlation value between -1 and 1
        // More structured based on the inputs to make it look realistic
        let base = Math.sin(((i * j) / (biomarkers.length * diseases.length)) * Math.PI)

        // Adjust based on biomarker type
        if (biomarkerType === "epigenetic" && diseases[j].includes("Alzheimer")) {
          base = Math.abs(base) * 0.8 // Strong positive correlation
        } else if (biomarkerType === "telomere" && diseases[j].includes("Aging")) {
          base = -Math.abs(base) * 0.9 // Strong negative correlation
        }

        row.push(base)
      }
      data.push(row)
    }

    return { biomarkers, diseases, data }
  }

  const getBiomarkers = (type: string) => {
    switch (type) {
      case "epigenetic":
        return ["DNAm GrimAge", "DNAm PhenoAge", "Horvath Clock", "Hannum Clock", "DunedinPACE"]
      case "telomere":
        return ["Leukocyte TL", "Buccal Cell TL", "Lymphocyte TL", "Granulocyte TL"]
      case "inflammatory":
        return ["IL-6", "TNF-α", "CRP", "IL-1β", "IL-10", "IFN-γ"]
      case "metabolic":
        return ["Glucose", "Insulin", "HbA1c", "Cholesterol", "Triglycerides", "HDL", "LDL"]
      default:
        return ["Biomarker 1", "Biomarker 2", "Biomarker 3", "Biomarker 4"]
    }
  }

  const getDiseases = (filter: string) => {
    if (filter !== "all") {
      switch (filter) {
        case "alzheimers":
          return ["Alzheimer's Disease"]
        case "parkinsons":
          return ["Parkinson's Disease"]
        case "diabetes":
          return ["Type 2 Diabetes"]
        case "cvd":
          return ["Cardiovascular Disease"]
        default:
          return [filter]
      }
    }

    return [
      "Alzheimer's Disease",
      "Parkinson's Disease",
      "Type 2 Diabetes",
      "Cardiovascular Disease",
      "Cancer",
      "Accelerated Aging",
      "Frailty",
    ]
  }

// Add these improvements to your visualization components

// Enhanced Heatmap Rendering
useEffect(() => {
  const renderHeatmap = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Performance optimization
    const pixelRatio = window.devicePixelRatio || 1;
    const canvas = canvasRef.current;
    const { width, height } = canvas.getBoundingClientRect();
    
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);

    // Memoize expensive calculations
    const { biomarkers, diseases, data } = useMemo(
      () => generateHeatmapData(),
      [biomarkerType, diseaseFilter]
    );

    // Improved color scale
    const colorScale = (value: number) => {
      const hue = value > 0 ? 0 : 240; // Red for positive, blue for negative
      const lightness = 50 - Math.abs(value) * 30;
      return `hsl(${hue}, 100%, ${lightness}%)`;
    };

    // Add tooltip interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Find hovered cell and show tooltip
      // Implement tooltip logic here
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    return () => canvas.removeEventListener('mousemove', handleMouseMove);
  };

  const resizeObserver = new ResizeObserver(renderHeatmap);
  resizeObserver.observe(canvasRef.current);
  return () => resizeObserver.disconnect();
}, [biomarkerType, ageRange, diseaseFilter]);
  

    // Draw cells
    for (let i = 0; i < biomarkers.length; i++) {
      for (let j = 0; j < diseases.length; j++) {
        const value = data[i][j]

        // Color based on correlation value (-1 to 1)
        let color
        if (value < 0) {
          // Negative correlation: blue
          const intensity = Math.round(255 * Math.abs(value))
          color = `rgb(0, 0, ${intensity})`
        } else {
          // Positive correlation: red
          const intensity = Math.round(255 * value)
          color = `rgb(${intensity}, 0, 0)`
        }

        ctx.fillStyle = color
        ctx.fillRect(150 + j * cellWidth, 50 + i * cellHeight, cellWidth, cellHeight)

        // Add correlation value text
        ctx.fillStyle = "#fff"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(value.toFixed(2), 150 + j * cellWidth + cellWidth / 2, 50 + i * cellHeight + cellHeight / 2)
      }
    }

    // Draw legend
    const legendWidth = 20
    const legendHeight = 200
    const legendX = canvas.width - 50
    const legendY = (canvas.height - legendHeight) / 2

    // Draw gradient
    const gradient = ctx.createLinearGradient(legendX, legendY, legendX, legendY + legendHeight)
    gradient.addColorStop(0, "rgb(0, 0, 255)") // Blue for -1
    gradient.addColorStop(0.5, "rgb(255, 255, 255)") // White for 0
    gradient.addColorStop(1, "rgb(255, 0, 0)") // Red for 1

    ctx.fillStyle = gradient
    ctx.fillRect(legendX, legendY, legendWidth, legendHeight)

    // Draw legend labels
    ctx.fillStyle = "#000"
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"
    ctx.fillText("-1.0", legendX + legendWidth + 5, legendY)
    ctx.fillText("0.0", legendX + legendWidth + 5, legendY + legendHeight / 2)
    ctx.fillText("+1.0", legendX + legendWidth + 5, legendY + legendHeight)

    // Draw legend title
    ctx.save()
    ctx.translate(legendX - 10, legendY + legendHeight / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.textAlign = "center"
    ctx.fillText("Correlation", 0, 0)
    ctx.restore()
  }, [biomarkerType, ageRange, diseaseFilter])

  return (
    <div className="w-full overflow-x-auto">
      <canvas ref={canvasRef} className="min-w-full" style={{ height: "500px" }} />
      <p className="text-center text-sm text-muted-foreground mt-2">
        Correlation between {biomarkerType} biomarkers and age-related diseases
      </p>
    </div>
  )
}

