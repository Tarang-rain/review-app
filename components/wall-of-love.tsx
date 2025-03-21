import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Wall = () => {
	const [open, setOpen] = useState(false);
	
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="default" size="lg" className="w-full">
					Preview Wall of Love
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-xl">
				<DialogHeader>
					<DialogTitle>Wall of Love</DialogTitle>
					<DialogDescription>
						A showcase of your customer testimonials
					</DialogDescription>
				</DialogHeader>
				<div className="grid grid-cols-2 gap-4 py-4">
					<div className="bg-muted p-4 rounded-md">
						<p className="italic">"Amazing product, saved me hours of work!"</p>
						<p className="text-sm mt-2 font-medium">- John Doe</p>
					</div>
					<div className="bg-muted p-4 rounded-md">
						<p className="italic">"Incredible service, highly recommended."</p>
						<p className="text-sm mt-2 font-medium">- Jane Smith</p>
					</div>
					<div className="bg-muted p-4 rounded-md">
						<p className="italic">"Best purchase I've made this year."</p>
						<p className="text-sm mt-2 font-medium">- Sam Johnson</p>
					</div>
					<div className="bg-muted p-4 rounded-md">
						<p className="italic">"The support team is outstanding!"</p>
						<p className="text-sm mt-2 font-medium">- Lisa Chen</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default Wall;
