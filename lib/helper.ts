import { ObjectId } from "mongodb";

export function serializeDocument(doc: any) {
	if (!doc) return null;

	const serialized = { ...doc };

	// Convert ObjectId to string
	if (serialized._id && serialized._id instanceof ObjectId) {
		serialized._id = serialized._id.toString();
	}

	// Convert any Date objects to ISO string
	Object.keys(serialized).forEach((key) => {
		if (serialized[key] instanceof Date) {
			serialized[key] = serialized[key].toISOString();
		}
	});

	return serialized;
}
