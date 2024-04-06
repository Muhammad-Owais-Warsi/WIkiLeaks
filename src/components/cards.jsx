export default function Card(props) {
    return (
        <div>
            <div>Title: {props.title}</div>
            <div>Body: {props.body}</div>
            <button>Author: {props.author}</button>
        </div>
    );
}