--getUserById
SELECT * FROM users WHERE id=1;

--getAllTodosByUserID
SELECT * FROM todos WHERE user_id=1;

--getAllCompletedTodosByUserId
SELECT * FROM todos WHERE user_id=1 AND completed=true;

--getAllIncompleteTodosByUserId
SELECT * FROM todos WHERE user_id=1 AND completed=false;
