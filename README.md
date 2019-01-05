# Project 1: Fruition Note Taking App

Fruition is a web note taking app that is meant to be used on any device. While taking notes, any word can be hgihlighted and its definiton(s) or synonyms will be displayed after hitting the corresponding buttons. Word data is taken from Merriam-Webster and Oxford dictionaries APIs. It utilizes firebase for user authentication and storage of note data, and materialize in place of bootstrapp for simple, clean styling. 

## The Basics

First, an account must be created through firebase using email and password. Once logged in, notes can be created on the main page simply by hitting a large plus sign which will prompt a filename input and creation button. Note files are listed on the home screen and loaded from firebase. Any note can simply be clicked into, redirecting to an edit note page. Editing notes is done in a textarea with a save to firebase button for saving and a define highlighted word button below save.