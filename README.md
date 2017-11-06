# event-driven-mvc-with-backbone
show event driven style MVC programing using Backbone.js

### Concept

"flow only one way"

```
User action
  click !

View
  .trigger()
  
Controller
  .on()

Model / Collection
  add / update / remove
  
View
  observe model change
```
