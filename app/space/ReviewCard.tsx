import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

interface SimpleReviewProps {
	name: string;
	review: string;
	uploadedAt: string;
}

const ReviewCard = ({ name, review, uploadedAt }: SimpleReviewProps) => {
	const initials = name
		.split(" ")
		.map((part) => part[0])
		.join("")
		.toUpperCase();

	const formattedDate = new Date(uploadedAt).toLocaleDateString("en-GB");

	return (
		<Card className="w-full max-w-md mx-auto overflow-hidden transition-all duration-200 hover:shadow-md border-secondary/50">
			<CardContent className="p-0">
				<div className="bg-secondary/5 p-3 border-b border-secondary/10">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2.5">
							<Avatar className="h-9 w-9 border border-primary/10">
								<AvatarFallback className="bg-primary/5 text-primary text-sm">
									{initials}
								</AvatarFallback>
							</Avatar>
							<div>
								<h3 className="font-medium text-base first-letter:capitalize">
									{name}
								</h3>
								<p className="text-xs text-muted-foreground">{formattedDate}</p>
							</div>
						</div>
					</div>
				</div>

				<div className="p-3 relative">
					<div className="pl-5 pt-2">
						<p className="text-sm leading-relaxed text-muted-foreground">
							{review}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ReviewCard;
