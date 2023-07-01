import styles from "../Notes.module.css";

interface Note {
	collectionId: string;
	collectionName: string;
	content: string;
	created: string;
	id: string;
	title: string;
	updated: string;
}

interface Params {
	id: string;
}

async function getNote(noteID: string) {
	const res = await fetch(
		`http://127.0.0.1:8090/api/collections/posts/records/${noteID}`,
		{
			next: { revalidate: 10 },
		}
	);
	const data: Note = await res.json();

	return data;
}

export default async function NotePage({ params }: { params: Params }) {
	const note = await getNote(params.id);

	return (
		<div>
			<h1>Note: {note.id}</h1>
			<div className={styles.note}>
				<h3>{note.title}</h3>
				<h5>{note.content}</h5>
				<p>{note.created}</p>
			</div>
		</div>
	);
}
