"use client";

import { Button } from "@/components/ui/button";
import { Video, FileType2 } from "lucide-react";
import { useState } from "react";
import { TestimonialModal } from "./TestimonialModal";

interface SpaceActionButtonsProps {
	spaceData: any;
}

export function SpaceActionButtons({ spaceData }: SpaceActionButtonsProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalType, setModalType] = useState<"video" | "text">("video");

	const handleOpenModal = (type: "video" | "text") => {
		setModalType(type);
		setIsModalOpen(true);
	};

	return (
		<>
			<div className="flex flex-col w-full space-y-3 pt-4">
				<Button
					variant="default"
					className="w-full gap-2"
					style={{
						backgroundColor: spaceData?.button_color || "inherit",
						borderColor: spaceData?.button_color || "inherit",
					}}
					onClick={() => handleOpenModal("video")}
				>
					<Video className="h-4 w-4" />
					{spaceData?.collection_type === "Text Only"
						? "Send Testimonial"
						: "Record a Video"}
				</Button>

				{spaceData?.collection_type !== "Video Only" && (
					<Button
						variant="outline"
						className="w-full gap-2"
						onClick={() => handleOpenModal("text")}
					>
						<FileType2 className="h-4 w-4" />
						Send in Text
					</Button>
				)}
			</div>

			<TestimonialModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				initialData={spaceData}
				onSubmit={(data) => {
					console.log(data);
					setIsModalOpen(false);
				}}
			/>
		</>
	);
}
