# HAMMOND

HAMMOND is the working name for an internal website for the Minds Matter organiztion. The will provide a single location where Mentors and Tutors can track the progress of their students.

Hammond uses a MVC structure, with the view being handled by Angular.

Hammonds back-end is develpoed with RESTful practices in mind. The Controllers are separate from the Queriying languages, and Administrators have access to the creation, editing, and deleting all dynamic information that is is on the site (ie Users, Assignments, etc...). The API is developed using Asp.Net, with Entity Framework Core for handling data querying.

```
Hammond.API
  -Controllers
  -Data => Repositories/ Seed Data
  -Models
  
```

Front-end uses angular 6. It's developed with desktop use in mind, since most of the students will be accessing the site from chromebooks provided by Minds Matter. Improvements to the site's mobile presentation are planned, since Mentors and tutors will likely be accessing it from the phones regularly.

```
 Hammond-SPA
  -src
    -app
      -admin => includes all components that display on admin page
        -registrations => all admin related components that post to the database
      -assignments
      -home
      -landing pages => landing pages are routed to after login based on 'role'
      -mentor
      -nav
      -signin
      -student
      -user
    
```

## Going Forward
The admin page needs sorting and paging to be completed. The majority of the front-end work needed for students, tutors, and mentors will be displaying info which will be similar to that aspact from the admin pages. The intent is to include a messaging system as well for those groups.

Once the site is completed, the plan is to host it using Azure services.

