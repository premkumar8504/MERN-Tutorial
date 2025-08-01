import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

const TodoItems = ({ todoItems, onDeleteClick, onToggleComplete }) => {
  // Group items by completion status
  const pendingItems = todoItems.filter((item) => !item.completed);
  const completedItems = todoItems.filter((item) => item.completed);

  return (
    <div>
      {pendingItems.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Tasks to Do
          </h2>
          <div className="space-y-3">
            {pendingItems.map((item) => (
              <TodoItem
                key={item.id}
                id={item.id}
                todoDate={item.dueDate}
                todoName={item.todoName || item.name} // use todoName if available, fallback to name
                completed={item.completed}
                onDeleteClick={onDeleteClick}
                onToggleComplete={onToggleComplete}
              />
            ))}
          </div>
        </div>
      )}

      {completedItems.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-500 mb-3">
            Completed Tasks
          </h2>
          <div className="space-y-3">
            {completedItems.map((item) => (
              <TodoItem
                key={item.id}
                id={item.id}
                todoDate={item.dueDate}
                todoName={item.todoName || item.name} // use todoName if available, fallback to name
                completed={item.completed}
                onDeleteClick={onDeleteClick}
                onToggleComplete={onToggleComplete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

TodoItems.propTypes = {
  todoItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string,
      todoName: PropTypes.string, // allow both for compatibility
      dueDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default TodoItems;