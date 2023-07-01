import Link from "next/link";
import styles from "./Notes.module.css";

/* I need this if I'm not using fetch, like for example when I am using an SDK
export const dynamic = "auto",
	dynamicParams = true,
	revalidate = 0,
	fetchCache = "auto",
	runtime = "nodejs",
	preferredRegion = "auto";
*/

interface Notes {
	collectionId: string;
	collectionName: string;
	content: string;
	created: string;
	id: string;
	title: string;
	updated: string;
}

type NoteProp = {
	note: Notes;
};

async function getNotes() {
	const res = await fetch(
		"http://127.0.0.1:8090/api/collections/posts/records?page=1&perPage=30",
		{ cache: "no-store" }
	);
	const data = await res.json();

	return data?.items as Notes[];
}

export default async function NotesPage() {
	const notes = await getNotes();

	return (
		<div>
			<h1>Notes</h1>
			<div className={styles.grid}>
				{notes?.map((note) => {
					return <Note key={note.id} note={note} />;
				})}
			</div>
		</div>
	);
}

const Note = ({ note }: NoteProp) => {
	const { id, title, content, created } = note || {};

	return (
		<Link href={`/notes/${id}`}>
			<div className={styles.note}>
				<h2>{title}</h2>
				<h5>{content}</h5>
				<p>{created}</p>
			</div>
		</Link>
	);
};
