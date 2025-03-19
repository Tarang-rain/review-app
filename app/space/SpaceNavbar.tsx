import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const SpaceNavbar = async ({ spaceName }: { spaceName: string }) => {
	return (
		<div className="flex items-center justify-between w-4/5 mx-auto">
			<p className="font-medium text-xl first-letter:capitalize">{spaceName}</p>

			<div className="space-x-5">
				<Link href={`/spaceinfo/${spaceName}`}>
					<Button className="bg-secondary text-primary hover:bg-accent">
						View <ArrowUpRight />
					</Button>
				</Link>
				<Button>Options</Button>
			</div>
		</div>
	);
};

export default SpaceNavbar;
