# exhibitly
## Artwork collection mobile app

exhibitly is a mobile app that allows the viewing of various museum's
artworks, and sorting them into user-defined collections.

You can try the [hosted online demo of exhibitly](http://peter.widearea.org:8081/).

### Main Display

When first opened, it displays a number of artworks from the pre-configured
museums. Additional artworks are loaded when reaching the bottom of the
currently loaded list. From this page, an artwork can be clicked for detailed
information.

### Search

Artworks can be searched with a specific keyword. It will display all artworks
matching the given keyword from all pre-configured museums.

### Detailed Artwork Information

The detailed artwork information screen shows an image of the chosen work. It also
dispalys the name of the work, artist name, year of production and
description - where available.

### Collections

The Collections screen shows the collections currently defined by the user.

### Add and Remove Buttons

Each of the artworks show the Add Button, which can be used to add it to a
collection. When pressed, it displays the current list of collections and an option
to create a new collection. 

When part of a collection, an artwork has a Remove Button, which removes it from its
collection.

On the first start, the app contains a default empty collection named 'My First
Collection'. Collections are currently only stored for the duration of the current
session, as no backend storage has been implemented yet.

## Museum APIs

exhibitly is designed for the code to be easily adjusted to work with
additional museum APIs. It currently has two musem APIs pre-configured:

* Art Institute Of Chicago
* The Cleveland Museum of Art

## Compatibility

It is written in Typescript and utilises React Native to create an app that
works on Android, iOS and Web.

It has been tested and is known to work with Android API 35, Expo 51.0.35,
Typescript 5.6.2, JS Node 21.4.0 and npm 10.8.3. It also uses the axios,
expo-status-bar react-router-native and react-native-popup-menu packages.

## Minimum Installation Requirements

* JS Node (tested and working with version 21.4.0)
* npm (tested and working with version 10.8.3)

## Installation

### For Web

 git clone https://github.com/stephenbowyer/exhibitly  
 cd exhibitly/exhibitly  
 npm install  
 npm run web

### For Android (Android SDK required)

 git clone https://github.com/stephenbowyer/exhibitly  
 cd exhibitly/exhibitly  
 npm install  
 npm run android
