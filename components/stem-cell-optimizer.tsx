"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function StemCellOptimizer() {
  const [cellType, setCellType] = useState("")
  const [growthFactors, setGrowthFactors] = useState("")
  const [temperature, setTemperature] = useState([37])
  const [ph, setPh] = useState([7.4])
  const [result, setResult] = useState<null | { success: number; recommendations: string[] }>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // Mock prediction based on inputs
      let successRate = 0

      // Simple logic for demo purposes
      if (cellType === "ipsc") {
        successRate += 30
      } else if (cellType === "msc") {
        successRate += 40
      } else if (cellType === "hsc") {
        successRate += 35
      }

      if (growthFactors.toLowerCase().includes("tgf")) {
        successRate += 15
      }

      if (temperature[0] >= 36.5 && temperature[0] <= 37.5) {
        successRate += 20
      }

      if (ph[0] >= 7.2 && ph[0] <= 7.6) {
        successRate += 15
      }

      // Cap at 95% max
      successRate = Math.min(successRate, 95)

      // Generate recommendations
      const recommendations = []
      if (successRate < 50) {
        if (cellType === "ipsc") {
          recommendations.push("Consider adding ROCK inhibitor Y-27632 to improve iPSC survival")
        }
        if (!growthFactors.toLowerCase().includes("fgf")) {
          recommendations.push("Add FGF2 (10ng/ml) to your growth factor cocktail")
        }
        recommendations.push("Optimize oxygen levels to 5% for better outcomes")
      }

      setResult({
        success: successRate,
        recommendations:
          recommendations.length > 0 ? recommendations : ["Your protocol looks good! No specific recommendations."],
      })
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cell-type">Cell Type</Label>
            <Select value={cellType} onValueChange={setCellType} required>
              <SelectTrigger id="cell-type">
                <SelectValue placeholder="Select cell type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ipsc">Induced Pluripotent Stem Cells (iPSCs)</SelectItem>
                <SelectItem value="msc">Mesenchymal Stem Cells (MSCs)</SelectItem>
                <SelectItem value="hsc">Hematopoietic Stem Cells (HSCs)</SelectItem>
                <SelectItem value="nsc">Neural Stem Cells (NSCs)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="growth-factors">Growth Factors (comma separated)</Label>
            <Input
              id="growth-factors"
              placeholder="e.g., TGF-β, FGF2, EGF"
              value={growthFactors}
              onChange={(e) => setGrowthFactors(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Temperature (°C): {temperature[0]}</Label>
            <Slider value={temperature} min={35} max={39} step={0.1} onValueChange={setTemperature} />
          </div>

          <div className="space-y-2">
            <Label>pH: {ph[0]}</Label>
            <Slider value={ph} min={6.8} max={8.0} step={0.1} onValueChange={setPh} />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Analyzing Protocol..." : "Predict Success Rate"}
        </Button>
      </form>

      {result && (
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Success Probability</span>
                  <span className="text-sm font-medium">{result.success}%</span>
                </div>
                <Progress value={result.success} className="h-2" />
              </div>

              <Alert variant={result.success >= 70 ? "default" : "destructive"}>
                {result.success >= 70 ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertTitle>
                  {result.success >= 70 ? "High probability of success" : "Protocol may need optimization"}
                </AlertTitle>
                <AlertDescription>
                  Based on our analysis, your protocol has a {result.success}% chance of success.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <h4 className="font-medium">Recommendations:</h4>
                <ul className="space-y-1">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="text-sm flex items-start">
                      <span className="mr-2 mt-0.5">•</span> {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

