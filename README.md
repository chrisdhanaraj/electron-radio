# Electron Radio

- Project was bootstrapped with Create React App and Electron Builder
- Project uses redux to keep application state
- Project *requires* Firebase configuration to run in development mode

### State Tree

It's pretty simplified, looks like

```js
audio: true // muted or not
tracklist: false // tracklist UI open or not
show // show details
  isLoggedIn: false
  description: ""
  djName: ""
  endTime: ""
  profilePic: "/static/media/ibmcr.bb401254.svg"
  showName: ""
  startTime: ""
  songlist:
```

### Actions

Again, pretty simplified. A couple main actions (note, initial Firebase connection is not wired to redux) that map more or less 1:1 to the parent state tree

```js
setAudioState = audioState => {};
setTracklistState = tracklistState => {};
updateRadioState = radioState => {};
```

