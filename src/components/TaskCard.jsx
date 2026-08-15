function TaskCard(props) {
  const task = props.task;
  const column = props.columnName;

  // figuring out the border color based on priority
  // just using plain if/else, nothing fancy
  let borderColor = "rgb(200, 200, 200)"; // default gray just in case

  if (task.priority === "High") {
    borderColor = "rgb(220, 53, 69)"; // red
  } else if (task.priority === "Medium") {
    borderColor = "rgb(255, 193, 7)"; // yellow
  } else if (task.priority === "Low") {
    borderColor = "rgb(40, 167, 69)"; // green
  }

  const cardStyle = {
    borderLeft: "6px solid " + borderColor,
  };

  return (
    <div className="task-card" style={cardStyle}>
      {task.isEditing ? (
        // EDIT MODE - show an input instead of text
        <div>
          <input
            type="text"
            value={task.editText}
            onChange={(e) =>
              props.onEditChange(column, task.id, e.target.value)
            }
          />
          <div className="card-buttons">
            <button onClick={() => props.onSaveEdit(column, task.id)}>
              Save
            </button>
          </div>
        </div>
      ) : (
        // NORMAL MODE - clicking the text turns on edit mode
        <div>
          <p
            className="task-text"
            onClick={() => props.onToggleEdit(column, task.id)}
          >
            {task.text}
          </p>
          <p className="priority-label">Priority: {task.priority}</p>

          <div className="card-buttons">
            {/* only show back button if not already in todo */}
            {column !== "todo" && (
              <button onClick={() => props.onMove(column, task.id, "back")}>
                ◀ Back
              </button>
            )}

            {/* only show next button if not already in done */}
            {column !== "done" && (
              <button
                onClick={() => props.onMove(column, task.id, "forward")}
              >
                Next ▶
              </button>
            )}

            <button onClick={() => props.onDelete(column, task.id)}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskCard;
