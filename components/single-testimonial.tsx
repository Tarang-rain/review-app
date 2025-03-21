import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const SingleTestimonial = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="p-4 border rounded-md bg-card">
			<h3 className="text-lg font-medium mb-4">Single Testimonial Widget</h3>
			<p className="text-muted-foreground mb-4">
				Click below to view a featured testimonial
			</p>

			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<Button variant="default">View Featured Testimonial</Button>
				</DialogTrigger>

				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Featured Testimonial</DialogTitle>
						<DialogDescription>
							Our customer of the month shares their experience
						</DialogDescription>
					</DialogHeader>
					<div className="py-4">
						<div className="p-4 bg-muted rounded-md">
							<p className="italic text-lg">
								"This product has completely transformed how our team works. The
								efficiency gains are remarkable, and the support team has been
								incredible every step of the way."
							</p>
							<div className="mt-4 text-right">
								<p className="font-medium">Jane Smith</p>
								<p className="text-sm text-muted-foreground">CEO, Acme Inc.</p>
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default SingleTestimonial;
