"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Upload } from "lucide-react"
import { BiomarkerHeatmap } from "./biomarker-heatmap"
import { BiomarkerLineChart } from "./biomarker-line-chart"

export function BiomarkerDashboard() {
  const [biomarkerType, setBiomarkerType] = useState("epigenetic")
  const [ageRange, setAgeRange] = useState("all")
  const [diseaseFilter, setDiseaseFilter] = useState("all")

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="biomarker-type">Biomarker Type</Label>
          <Select value={biomarkerType} onValueChange={setBiomarkerType}>
            <SelectTrigger id="biomarker-type">
              <SelectValue placeholder="Select biomarker type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="epigenetic">Epigenetic Clock</SelectItem>
              <SelectItem value="telomere">Telomere Length</SelectItem>
              <SelectItem value="inflammatory">Inflammatory Markers</SelectItem>
              <SelectItem value="metabolic">Metabolic Markers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="age-range">Age Range</Label>
          <Select value={ageRange} onValueChange={setAgeRange}>
            <SelectTrigger id="age-range">
              <SelectValue placeholder="Select age range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ages</SelectItem>
              <SelectItem value="20-40">20-40 years</SelectItem>
              <SelectItem value="41-60">41-60 years</SelectItem>
              <SelectItem value="61-80">61-80 years</SelectItem>
              <SelectItem value="80+">80+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="disease-filter">Disease Filter</Label>
          <Select value={diseaseFilter} onValueChange={setDiseaseFilter}>
            <SelectTrigger id="disease-filter">
              <SelectValue placeholder="Filter by disease" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Diseases</SelectItem>
              <SelectItem value="alzheimers">Alzheimer's Disease</SelectItem>
              <SelectItem value="parkinsons">Parkinson's Disease</SelectItem>
              <SelectItem value="diabetes">Type 2 Diabetes</SelectItem>
              <SelectItem value="cvd">Cardiovascular Disease</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Upload Your Data</h3>
            <div className="flex items-center space-x-2">
              <Input id="file-upload" type="file" className="hidden" accept=".csv,.xlsx" />
              <Label
                htmlFor="file-upload"
                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload CSV/Excel
              </Label>
              <Button variant="outline">Use Sample Data</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="heatmap" className="space-y-4">
        <TabsList>
          <TabsTrigger value="heatmap">Correlation Heatmap</TabsTrigger>
          <TabsTrigger value="trends">Age Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="heatmap" className="space-y-4">
          <BiomarkerHeatmap biomarkerType={biomarkerType} ageRange={ageRange} diseaseFilter={diseaseFilter} />
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <BiomarkerLineChart biomarkerType={biomarkerType} diseaseFilter={diseaseFilter} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

