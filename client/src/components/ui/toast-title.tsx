import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
 
export function ToastWithTitle() {
    const { toast } = useToast()
 
    return (
        <Button
            variant="outline"
            onClick={() => {
                toast({
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request. Select a date and try again.",
                })
            }}
        >
            Show Toast
        </Button>
    )
}