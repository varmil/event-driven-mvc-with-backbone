const EVENT_SUBMITTED = 'submitted'
const EVENT_TASK_DELETED = 'deleted'

// the Root View (controller view)
const ParentView = Backbone.View.extend({
  initialize: () => {
    // create models and collections
    this.taskCollection = new TaskCollection()

    // create sub views
    this.tasksView = new TasksView({ collection: this.taskCollection })
    this.addTaskView = new AddTaskView()

    // set event handlers
    this.addTaskView.on(EVENT_SUBMITTED, (value) => {
      const model = new TaskModel({
        title: value
      })
      this.taskCollection.add(model)
    })
  },
})


// this has input form (presentational view)
const AddTaskView = Backbone.View.extend({
  el: '.....',

  events: {
    submit: 'onSubmitted'
  },

  onSubmitted: (e) => {
    this.trigger(EVENT_SUBMITTED, $('#title').val())
  },
})


// mixed presentational and controller
const TasksView = Backbone.View.extend({
  el: '.....',

  // NOTE: this class does NOT have any "taskViewList" or something,
  // because this class has collection, collection includes models,
  // and the each model is attached to the view, so we can access all views
  initialize: () => {
    this.collection.on('add', (model) => {
      const newView = new TaskView(model)

      // set event handlers
      newView.once(EVENT_TASK_DELETED, () => {
        newView.remove()
        this.collection.remove(model)
      })

      // render
      this.$el.append(this.newView.$el);
      newView.render()
    })
  },
})


// single task view (presentational view)
const TaskView = Backbone.View.extend({
  el: '.....',

  events: {
    'click .delete': 'onDeleteClicked'
  },

  onDeleteClicked: (e) => {
    this.trigger(EVENT_TASK_DELETED)
  },

  render: () => { /*TODO*/ },
})


// collection and model
const TaskCollection = Backbone.Collection.extend({ model: TaskModel })
const TaskModel = Backbone.Model.extend(/*TODO*/)
