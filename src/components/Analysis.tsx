import { Analysis } from '@prisma/client'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { Button } from './ui/button'

export default function EntryAnalysis({
  analysis,
}: {
  analysis: Analysis | null
}) {
  const analysisData = [
    { name: 'Subject', value: analysis?.subject },
    { name: 'Summary', value: analysis?.summary },
    { name: 'Mood', value: analysis?.mood },
    { name: 'Color', value: analysis?.color },
    { name: 'Negative', value: analysis?.negative ? 'false' : 'true' },
  ]

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'secondary'}>Analysis</Button>
      </SheetTrigger>
      <SheetContent className="bg-background text-foreground">
        <SheetHeader>
          <SheetTitle>Analysis</SheetTitle>
          <SheetDescription>powered by ChatGPT</SheetDescription>
        </SheetHeader>
        <dl className="mt-16 space-y-4">
          {analysisData.map((item) => (
            <div key={item.name} className="">
              <dt className="text-xs font-semibold uppercase opacity-75">
                {item.name}
              </dt>
              <dd className="h-[calc(100vh/10)] rounded-md border border-border bg-secondary p-2 text-sm text-secondary-foreground">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </SheetContent>
    </Sheet>
  )
}
