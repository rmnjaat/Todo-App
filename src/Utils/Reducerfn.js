//reducer functions
 export default function reducerFn(todos, action) {
    switch (action.type) {
        case "add": {
            return [
                ...todos,
                {
                    id: action.id,
                    title: action.title,
                    isCompleted: false,
                    lastEdited: new Date().toLocaleString(),
                },
            ];
        }

        case "edit": {
            return todos.map((todo) => {
                if (todo.id != action.task.id) {
                    return todo;
                } else {
                    return action.task;
                }
            });
        }

        case "delete": {
            return todos.filter((todo) => todo.id != action.id);
        }
    }
}
