import TaskCard from "./TaskCard.jsx";

// this component is basically just one column
// it gets a list of tasks as a prop and loops over them with .map
function Column(props) {
  return (
    <div className="column">
      <h2 className="column-title">
        {props.title} ({props.tasks.length})
      </h2>

      <div className="column-tasks">
        {props.tasks.length === 0 && (
          <p className="empty-text">No tasks here</p>
        )}

        {props.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            columnName={props.columnName}
            onDelete={props.onDelete}
            onMove={props.onMove}
            onToggleEdit={props.onToggleEdit}
            onEditChange={props.onEditChange}
            onSaveEdit={props.onSaveEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;
