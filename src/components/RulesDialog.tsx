import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { HelpCircle } from 'lucide-react'

export const RulesDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/90 backdrop-blur-sm hover:bg-white"
                >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Правила
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Правила игры</DialogTitle>
                    <DialogDescription>
                        Нужно поймать все 10 страниц календаря!
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-2">Как играть:</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                            <li>• Кликай на летающие листки календаря</li>
                            <li>• При клике проигрывается песня &quot;3 сентября&quot;</li>
                            <li>• Собери все 10 страниц для победы быстрее друзей!</li>
                        </ul>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg">
                        <p className="text-sm text-yellow-800">
                            💡 Совет: Листки летают по разным траекториям,
                            будь внимателен!
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
