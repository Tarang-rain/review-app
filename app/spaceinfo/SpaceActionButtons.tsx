"use client";

import { Button } from "@/components/ui/button";
import { Video, FileType2 } from "lucide-react";
import { useState } from "react";
import { TestimonialModal } from "./TestimonialModal";
import axios from "axios";
import toast from "react-hot-toast";

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
				onSubmit={async (data) => {
					try {
						const res = await axios.post("/api/testimonial", {
							...data,
							space_id: spaceData.space_id,
						});

						if (res.data.status === 200) {
							toast.success("Testimonial submitted successfully");
							setIsModalOpen(false);
						}
					} catch (error) {
						if (axios.isAxiosError(error)) {
							const axiosError = error;
							if (axiosError.response?.status === 400) {
								toast.error(
									axiosError.response.data.message || "Something went wrong"
								);
							} else {
								toast.error(
									axiosError.response?.data?.message || "Something went wrong"
								);
							}
						} else {
							console.error("something went wrong", error);
						}
					}
				}}
			/>
		</>
	);
}
