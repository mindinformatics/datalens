Flag anonymous
---------------------

About
---------------------
Module provides ability to show configurable message "Login or Register
to use this flag" to anonymous users instead of flag link.

Basic usage
---------------------
Flag anonymous module helps you to show existing "flagging" ability to
anonymous users and motivate them to login or register in a simple way.

Requirements
---------------------
 * Flag

Installation
---------------------
 1. Install the module to modules/contrib or modules folder
 2. Enable Flag anonymous module

Configuration
---------------------
 * Go to a Flags list page /admin/structure/flags

 * Click "Edit" link on Flag which you'd like to configure
    * Or click "Add flag" button if you'd like to add a new Flag

 * Scroll down flag edit page to "Flag Anonymous settings" section
 * Check "Display login link for anonymous users." checkbox to enable module
   functionality.

 * Set "Anonymous link text" - it's a "Login or Register to use this flag"
   message. You can use placeholders:
    * [login] - Login link
    * [register] - Registration link
    * [login-url] - Login URL
    * [register-url] - Registration URL

 * If you'd like to see your flag and message for anonymous users in an entity
   links section - check needed display modes checkboxes in "Display in entity
   links" section.

 * If you'd like to use your flag and message for anonymous users as a
   separated entity field - check "Display link as field" checkbox.

 * Fill or change other needed fields and click "Save Flag" button.
