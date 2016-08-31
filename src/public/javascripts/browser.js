$(function(){
  
  $('.todo-list-item-edit-button').on('click', function(event){
    event.preventDefault()
    $(this).closest('.todo-list-item').addClass('editing-todo-list-item')
  });
  
  $('.todo-list-item-cancel-button').on('click', function(event){
    event.preventDefault()
    var root = $(this).closest('.todo-list-item')
    root.removeClass('editing-todo-list-item')
    var input = root.find('.todo-list-item-title-input')
    input.val(input.data('initial-value'))
  });

  $('.todo-list-item-checkbox').on('change', function(event){
    $(this).closest('form').submit();
  });

})