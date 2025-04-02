import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StemCellOptimizer } from "@/components/stem-cell-optimizer"
import { BiomarkerDashboard } from "@/components/biomarker-dashboard"
import { TrialMatchmaker } from "@/components/trial-matchmaker"

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">BioRegen AI</h1>
          <p className="text-muted-foreground">
            A unified platform for stem cell research optimization, aging biomarker tracking, and clinical trial
            matching
          </p>
        </div>

        <Tabs defaultValue="optimizer" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="optimizer">Protocol Optimizer</TabsTrigger>
            <TabsTrigger value="biomarkers">Biomarker Dashboard</TabsTrigger>
            <TabsTrigger value="trials">Clinical Trials</TabsTrigger>
          </TabsList>

          <TabsContent value="optimizer" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Stem Cell Protocol Optimizer</CardTitle>
                <CardDescription>
                  Predict the success rate of your stem cell protocols using machine learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StemCellOptimizer />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="biomarkers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Aging Biomarker Dashboard</CardTitle>
                <CardDescription>Visualize correlations between aging biomarkers and diseases</CardDescription>
              </CardHeader>
              <CardContent>
                <BiomarkerDashboard />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trials" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Clinical Trial Matchmaker</CardTitle>
                <CardDescription>Find relevant clinical trials based on your research parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <TrialMatchmaker />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

