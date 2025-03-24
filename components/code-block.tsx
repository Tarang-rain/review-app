import React, { useState } from "react";
import { Copy, Check, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface CodeBlockProps {
	code: string;
	language?: string;
	showLineNumbers?: boolean;
	title?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
	code,
	language = "html",
	showLineNumbers = true,
	title,
}) => {
	const [copied, setCopied] = useState(false);
	const [liked, setLiked] = useState(false);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		toast("Copied to clipboard");
		setTimeout(() => setCopied(false), 2000);
	};

	const handleLike = () => {
		setLiked(!liked);
	};

	return (
		<div className="relative group rounded-lg overflow-hidden">
			{title && (
				<div className="px-4 py-2 bg-muted/50 border-b text-sm font-medium">
					{title}
				</div>
			)}
			<div className="absolute right-2 top-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
				<Button
					variant="secondary"
					size="sm"
					className="h-8 px-2"
					onClick={handleLike}
				>
					<Heart
						className={cn(
							"h-4 w-4 transition-colors",
							liked ? "fill-red-500 text-red-500" : "text-muted-foreground"
						)}
					/>
				</Button>
				<Button
					variant="secondary"
					size="sm"
					className="h-8 px-2"
					onClick={handleCopy}
				>
					{copied ? (
						<Check className="h-4 w-4" />
					) : (
						<Copy className="h-4 w-4" />
					)}
				</Button>
			</div>
		</div>
	);
};
