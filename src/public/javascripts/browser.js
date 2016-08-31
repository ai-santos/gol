$(function(){

  const filterTodoList = function(){
    const filter = $('.todo-list-items-filter').val().toLowerCase()
    const completedFilter = $('.todo-list-items-filter-buttons .active').data('filter')

    $('.todo-list-item').each(function(){
      const todoListItem = $(this)
      const title = todoListItem.find('.todo-list-item-title-input').val().toLowerCase()
      const completed = todoListItem.is('.complete-todo-list-item')

      if (
          (
            (completedFilter === 'all') ||
            (completedFilter === 'incomplete' && completed === false) ||
            (completedFilter === 'complete' && completed === true)
          ) &&
          title.includes(filter)
      ){
        todoListItem.show()
      }else{
        todoListItem.hide()
      }
    })
  }

  $('.todo-list-items-filter-buttons > .btn').on('click', function(event){
    const button = $(this)
    button.addClass('active');
    button.siblings().removeClass('active');
    filterTodoList();
  })

  $('.todo-list-items-filter').on('keyup', function(){
    filterTodoList();
  })
  
  $('.todo-list-item-edit-button').on('click', function(event){
    event.preventDefault()
    $(this).closest('.todo-list-item').addClass('editing-todo-list-item')
  });
  
  $('.todo-list-item-cancel-button').on('click', function(event){
    event.preventDefault()
    const root = $(this).closest('.todo-list-item')
    root.removeClass('editing-todo-list-item')
    const input = root.find('.todo-list-item-title-input')
    input.val(input.data('initial-value'))
  });

  $('.todo-list-item-checkbox').on('change', function(event){
    $(this).closest('form').submit();
  });

})