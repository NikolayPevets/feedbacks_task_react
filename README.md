We start with an empty page with text “Loading”:
1.	on page load:
a.	if it is the first load and LocalStorage is empty - we request guests and their diets and save this in LocalStorage
b.	if we already opened the app - get the list of guests from LocalStorage
2.	display guests list when guests and diets are loaded (from API or LocalStorage)
3.	make clickable guests who ate pizza - vegans should be displayed with green
4.	when clicking the guest name: 
a.	hide the guest list
b.	if the feedback for the guest was not filled - show a form with necessary fields and the 5-star rating (3 stars is the default rating)
c.	otherwise (if the feedback for the guest was filled), show the page with filled information and DELETE button (show only the information, no forms should be visible here)
5.	show empty feedback form for a current guest if DELETE button was clicked
a.	show an error message if a phone number is wrong (the phone field should be 3-10 chars length and accept numbers, +, () and a space " " char)
b.	by default show the CANCEL button
c.	show SAVE button when information is filled and valid
6.	CANCEL button closes the form and shows the guests list
7.	SAVE button stores feedback to LocalStorage and shows guests list 
8.	DELETE button removes feedback from LocalStorage and shows guests list (and removes a tick mark from the guest, of course)
9.	mark guests with saved feedback using   (use emoji "tick" symbol)
10.	add the "Clear app" button which removes all cached data (guests list, guests feedback). When clicking on it the app should be refreshed and the new guests' list is requested (step 1a)
