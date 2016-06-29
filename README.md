# Shared Event Lists [http://www.sharedeventlists.com]
Back End Repo: [https://github.com/SarahHartwick/shared-list-api]
Heroku: [https://sharedeventlists.herokuapp.com]

I created an application that allows friends/family to share lists of items
that are needed for events.

## Functionality

-   Users can signup/signin & create events (with a name, date, location)
-   Users can then add items to their event's list
-   Users who have created events can then share that event's list with friends
-   Users who have been invited to events can view the list of needed items, add
items to the list, claim items & delete items
-   Users can view the list of items that they have claimed, and mark the items
as purchased or unpurchased
-   Users can unclaim items, which removes them from their item list & re-adds
them to the event's list as unclaimed
-   Users can view all events they have created & events that they have been
invited to
-   Users can delete events they have created, but not events they have only
been invited to
-   Users can search events by name, but they cannot open events that they are
not invited to

## Models

-   Users, Profiles, Events, items
-   Users have one Profile, Profiles belong to one User
-   Users have many Events (as creator), Events have one User (as creator)
-   Profiles have many Events, Events have many Profiles (as invitees)
-   Events have many Items, Items have one Event
-   Users have many Items, Items have one User (who claimed it)

## Future Updates

-   I would like to add the ability to invite a User who does not have an
account already via sending an email, as well as notifications for Users
-   I would like to extend it further to having multiple lists per event (eg
individual packing lists, to-do lists for planning etc)
