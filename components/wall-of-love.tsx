import React from "react";
import { X, Layout, Columns, ChevronRight } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { LayoutSelection } from "./layout-selection";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const Wall = ({ isOpen, onClose }: ModalProps) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose} defaultOpen={true}>
			<DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-xl font-semibold">
						Choose Layout
					</DialogTitle>
					<button
						onClick={onClose}
						className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
					>
						<X className="h-4 w-4" />
					</button>
				</DialogHeader>
				<LayoutSelection />
			</DialogContent>
		</Dialog>
	);
};
