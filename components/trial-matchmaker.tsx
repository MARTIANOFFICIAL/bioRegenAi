"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ExternalLink, MapPin, Calendar, Users, Beaker } from "lucide-react"

export function TrialMatchmaker() {
  const [searchTerm, setSearchTerm] = useState("")
  const [cellType, setCellType] = useState("")
  const [condition, setCondition] = useState("")
  const [phase, setPhase] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])

  // Mock clinical trial data
  const mockTrials = [
    {
      id: "NCT04713839",
      title: "Mesenchymal Stem Cells for the Treatment of Aging Frailty",
      status: "Recruiting",
      phase: "Phase 2",
      condition: "Frailty",
      intervention: "Allogeneic Mesenchymal Stem Cells",
      location: "Miami, Florida, United States",
      distance: "Virtual participation available",
      lastUpdated: "2023-06-15",
      sponsor: "Longeveron Inc.",
      description:
        "This study evaluates the safety and efficacy of LMSCs (Longeveron Mesenchymal Stem Cells) in aging frailty. The primary outcome measures include changes in physical function and inflammatory biomarkers.",
      eligibility: "Ages 70-85, Clinical Frailty Scale score 5-7, Able to walk 10 meters independently",
      biomarkers: ["IL-6", "TNF-α", "CRP"],
      cellTypes: ["MSC"],
      url: "#",
    },
    {
      id: "NCT05116540",
      title: "iPSC-Derived Dopaminergic Neurons for Parkinson's Disease",
      status: "Recruiting",
      phase: "Phase 1",
      condition: "Parkinson's Disease",
      intervention: "iPSC-derived dopaminergic progenitor cells",
      location: "San Francisco, California, United States",
      distance: "On-site participation required",
      lastUpdated: "2023-08-22",
      sponsor: "University of California, San Francisco",
      description:
        "This first-in-human study evaluates the safety of transplanting iPSC-derived dopaminergic progenitor cells in patients with advanced Parkinson's disease.",
      eligibility:
        "Ages 50-75, Diagnosis of idiopathic Parkinson's disease for at least 5 years, Hoehn and Yahr stage 3-4",
      biomarkers: ["α-synuclein", "DJ-1", "LRRK2"],
      cellTypes: ["iPSC"],
      url: "#",
    },
    {
      id: "NCT04614337",
      title: "Senolytic Therapy to Delay Progression of Alzheimer's Disease",
      status: "Active, not recruiting",
      phase: "Phase 2",
      condition: "Alzheimer's Disease",
      intervention: "Dasatinib + Quercetin",
      location: "Rochester, Minnesota, United States",
      distance: "On-site participation required",
      lastUpdated: "2023-05-30",
      sponsor: "Mayo Clinic",
      description:
        "This study evaluates whether senolytic drugs (dasatinib plus quercetin) can reduce senescent cell burden and associated inflammation in patients with early Alzheimer's disease.",
      eligibility:
        "Ages 65-90, Clinical diagnosis of mild cognitive impairment or early Alzheimer's disease, MMSE score 20-28",
      biomarkers: ["p16INK4a", "SASP factors", "Amyloid-β", "Tau"],
      cellTypes: [],
      url: "#",
    },
    {
      id: "NCT05209698",
      title: "Hematopoietic Stem Cell Transplantation for Rejuvenation of the Immune System",
      status: "Not yet recruiting",
      phase: "Phase 1/2",
      condition: "Immunosenescence",
      intervention: "Autologous HSC transplantation with ex vivo telomere extension",
      location: "Stanford, California, United States",
      distance: "On-site participation required",
      lastUpdated: "2023-09-10",
      sponsor: "Stanford University",
      description:
        "This study investigates whether autologous hematopoietic stem cell transplantation with ex vivo telomere extension can rejuvenate the aging immune system.",
      eligibility: "Ages 65-80, Evidence of immunosenescence, No active malignancies or autoimmune diseases",
      biomarkers: ["Telomere length", "CD28- T cells", "TREC levels"],
      cellTypes: ["HSC"],
      url: "#",
    },
    {
      id: "NCT04815005",
      title: "Neural Stem Cell Therapy for Age-Related Macular Degeneration",
      status: "Recruiting",
      phase: "Phase 1/2",
      condition: "Age-Related Macular Degeneration",
      intervention: "Subretinal transplantation of human NSCs",
      location: "Boston, Massachusetts, United States",
      distance: "On-site participation required",
      lastUpdated: "2023-07-18",
      sponsor: "Massachusetts Eye and Ear Infirmary",
      description:
        "This study evaluates the safety and preliminary efficacy of subretinal transplantation of human neural stem cells in patients with geographic atrophy secondary to age-related macular degeneration.",
      eligibility: "Ages 55+, Diagnosis of geographic atrophy, BCVA 20/80 or worse in the study eye",
      biomarkers: ["VEGF", "Complement factors", "Inflammatory cytokines"],
      cellTypes: ["NSC"],
      url: "#",
    },
  ]

  const handleSearch = () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Filter trials based on search criteria
      const filtered = mockTrials.filter((trial) => {
        const matchesSearch =
          searchTerm === "" ||
          trial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          trial.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          trial.condition.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCellType =
          cellType === "" || trial.cellTypes.some((c) => c.toLowerCase() === cellType.toLowerCase())

        const matchesCondition = condition === "" || trial.condition.toLowerCase().includes(condition.toLowerCase())

        const matchesPhase = phase === "" || trial.phase.includes(phase)

        return matchesSearch && matchesCellType && matchesCondition && matchesPhase
      })

      setResults(filtered)
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="search">Search Terms</Label>
          <Input
            id="search"
            placeholder="Enter keywords (e.g., stem cell, aging)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cell-type">Cell Type</Label>
          <Select value={cellType} onValueChange={setCellType}>
            <SelectTrigger id="cell-type">
              <SelectValue placeholder="Select cell type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Cell Type</SelectItem>
              <SelectItem value="iPSC">iPSCs</SelectItem>
              <SelectItem value="MSC">MSCs</SelectItem>
              <SelectItem value="HSC">HSCs</SelectItem>
              <SelectItem value="NSC">NSCs</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="condition">Condition</Label>
          <Select value={condition} onValueChange={setCondition}>
            <SelectTrigger id="condition">
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Condition</SelectItem>
              <SelectItem value="Alzheimer">Alzheimer's Disease</SelectItem>
              <SelectItem value="Parkinson">Parkinson's Disease</SelectItem>
              <SelectItem value="Frailty">Frailty</SelectItem>
              <SelectItem value="Macular">Macular Degeneration</SelectItem>
              <SelectItem value="Immuno">Immunosenescence</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phase">Trial Phase</Label>
          <Select value={phase} onValueChange={setPhase}>
            <SelectTrigger id="phase">
              <SelectValue placeholder="Select trial phase" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Phase</SelectItem>
              <SelectItem value="Phase 1">Phase 1</SelectItem>
              <SelectItem value="Phase 2">Phase 2</SelectItem>
              <SelectItem value="Phase 3">Phase 3</SelectItem>
              <SelectItem value="Phase 4">Phase 4</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="virtual" />
          <Label htmlFor="virtual">Virtual participation</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="recruiting" />
          <Label htmlFor="recruiting">Recruiting only</Label>
        </div>
      </div>

      <Button onClick={handleSearch} disabled={loading} className="w-full">
        {loading ? "Searching..." : "Find Matching Clinical Trials"}
      </Button>

      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Found {results.length} matching trials</h3>

          <Tabs defaultValue="list" className="space-y-4">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="detail">Detailed View</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {results.map((trial) => (
                  <Card key={trial.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div>
                          <CardTitle className="text-lg">{trial.title}</CardTitle>
                          <CardDescription>
                            {trial.id} • {trial.sponsor}
                          </CardDescription>
                        </div>
                        <Badge variant={trial.status === "Recruiting" ? "default" : "outline"}>{trial.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <Beaker className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>
                            {trial.phase} • {trial.intervention}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{trial.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Updated: {trial.lastUpdated}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{trial.eligibility.split(",")[0]}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href={trial.url} target="_blank" rel="noopener noreferrer">
                          View Trial Details
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="detail">
              <Card>
                <CardHeader>
                  <CardTitle>Trial Details</CardTitle>
                  <CardDescription>Select a trial from the list to view detailed information</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px] pr-4">
                    {results.map((trial) => (
                      <div key={trial.id} className="mb-8 pb-8 border-b last:border-0">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-bold">{trial.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {trial.id} • {trial.sponsor}
                            </p>
                          </div>
                          <Badge variant={trial.status === "Recruiting" ? "default" : "outline"}>{trial.status}</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-medium mb-2">Trial Information</h4>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start">
                                <span className="font-medium w-24">Phase:</span>
                                <span>{trial.phase}</span>
                              </li>
                              <li className="flex items-start">
                                <span className="font-medium w-24">Condition:</span>
                                <span>{trial.condition}</span>
                              </li>
                              <li className="flex items-start">
                                <span className="font-medium w-24">Intervention:</span>
                                <span>{trial.intervention}</span>
                              </li>
                              <li className="flex items-start">
                                <span className="font-medium w-24">Location:</span>
                                <span>{trial.location}</span>
                              </li>
                              <li className="flex items-start">
                                <span className="font-medium w-24">Last Updated:</span>
                                <span>{trial.lastUpdated}</span>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Eligibility</h4>
                            <p className="text-sm">{trial.eligibility}</p>

                            <h4 className="font-medium mt-4 mb-2">Biomarkers</h4>
                            <div className="flex flex-wrap gap-2">
                              {trial.biomarkers.map((biomarker) => (
                                <Badge key={biomarker} variant="outline">
                                  {biomarker}
                                </Badge>
                              ))}
                            </div>

                            {trial.cellTypes.length > 0 && (
                              <>
                                <h4 className="font-medium mt-4 mb-2">Cell Types</h4>
                                <div className="flex flex-wrap gap-2">
                                  {trial.cellTypes.map((cellType) => (
                                    <Badge key={cellType} variant="secondary">
                                      {cellType}
                                    </Badge>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Description</h4>
                          <p className="text-sm">{trial.description}</p>
                        </div>

                        <Button variant="outline" size="sm" asChild>
                          <a href={trial.url} target="_blank" rel="noopener noreferrer">
                            View on ClinicalTrials.gov
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </a>
                        </Button>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}

