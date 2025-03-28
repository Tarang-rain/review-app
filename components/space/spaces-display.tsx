import { SpaceCard } from "./space-card";
import { EmptySpaceState } from "./empty-space-state";
import { SpaceCardType } from "./SpaceCardType";

export function SpacesDisplay({ spaces }: { spaces: SpaceCardType[] }) {
	return (
		<div>
			{spaces.length === 0 ? (
				<EmptySpaceState />
			) : (
				<div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 ">
					{spaces.map((space: SpaceCardType, index) => (
						<SpaceCard key={index} space={space} />
					))}
				</div>
			)}
		</div>
	);
}
