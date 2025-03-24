import { Clipboard } from "lucide-react";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface EmbedLayoutProps {
	layoutType: string;
}

export const EmbedLayout = ({ layoutType }: EmbedLayoutProps) => {
	const [copied, setCopied] = useState<string | null>(null);

	const carouselCode = `<script type="text/javascript" src="https://testimonial.to/js/iframeResizer.min.js"></script>
<iframe
   id='testimonialto-carousel-test-101-tag-all-light'
   src="https://localhost:3000/test-192"
   frameborder="0"
   scrolling="no"
   width="100%">
</iframe>
<script type="text/javascript">
  iFrameResize({
    log: false,
    checkOrigin: false
  }, '#testimonialto-carousel-test-101-tag-all-light');
</script>`;
	const handleCopy = (text: string, id: string) => {
		navigator.clipboard.writeText(text).then(
			() => {
				setCopied(id);
				setTimeout(() => setCopied(null), 2000);
			},
			(err) => {
				console.error("Could not copy text: ", err);
			}
		);
	};

	const CodeBlock = ({ code, id }: { code: string; id: string }) => (
		<div className="relative" style={{ overflow: "hidden" }}>
			<button
				onClick={() => handleCopy(code, id)}
				className="absolute top-2 right-2 bg-secondary text-xs px-2 py-1 rounded z-10"
			>
				{copied === id ? "Copied!" : "Copy"}
			</button>
			<div style={{ position: "relative", width: "100%" }}>
				<SyntaxHighlighter
					language="html"
					style={gruvboxDark}
					customStyle={{
						overflowX: "auto",
						overflowY: "hidden",
						padding: "12px",
						borderRadius: "6px",
						margin: 0,
						maxWidth: "100%",
						fontSize: "12px",
					}}
					wrapLines={true}
					wrapLongLines={false}
				>
					{code}
				</SyntaxHighlighter>
			</div>
		</div>
	);

	return (
		<div
			className="space-y-6 p-4 "
			style={{ overflowX: "hidden", width: "100%" }}
		>
			<div>
				<h3 className="text-lg font-medium mb-4">
					Carousel Layout Configuration
				</h3>
				<p className="text-sm mb-4">
					Follow these steps to embed the testimonial carousel on your website.
				</p>
			</div>

			<div className="w-full" style={{ overflowX: "hidden" }}>
				<div className="grid w-full grid-cols-2 mb-4">
					<button
						className="px-4 py-2 text-sm font-medium rounded-md"
						value="installation"
					>
						Installation
					</button>
					<button className="px-4 py-2 text-sm font-medium" value="preview">
						Preview
					</button>
				</div>
				<div className="space-y-6" style={{ overflowX: "hidden" }}>
					<div>
						<h4 className="text-sm font-medium mb-2">
							Add the iFrame Resizer Script
						</h4>
						<CodeBlock code={carouselCode} id="script" />
					</div>
				</div>
			</div>
			<div></div>
		</div>
	);
};
