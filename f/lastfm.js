function fetchTrackInfo() {
    fetch('https://lastfm-last-played.biancarosa.com.br/worbgge/latest-song')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.track) {
                const track = data.track;
                const trackName = track.name;
                const artistName = track.artist["#text"];
                const imageUrl = track.image[3]["#text"];
                const trackContainer = document.getElementById('track-container');

                const trackContent = `
                    <div class="track-info" id="track-info">
                        <img src="${imageUrl}" alt="${trackName} album art" class="album-art">
                        <div class="track-details">
                            <div class="track-name-wrapper">
                                <div class="track-name">${trackName}</div>
                            </div>
                            <div class="artist-name">${artistName}</div>
                        </div>
                    </div>
                `;

                trackContainer.innerHTML = trackContent;

                const trackNameWrapper = document.querySelector('.track-name-wrapper');
                const containerWidth = document.querySelector('.container').offsetWidth;
                const trackNameWidth = trackNameWrapper.offsetWidth;

                if (trackNameWidth > containerWidth) {
                    const cloneTrackName = document.createElement('div');
                    cloneTrackName.classList.add('track-name');
                    cloneTrackName.textContent = trackName;
                    trackNameWrapper.appendChild(cloneTrackName);
                    trackNameWrapper.classList.add('scrolling');
                } else {
                    trackNameWrapper.classList.remove('scrolling');
                }
            } else {
                document.getElementById('track-container').innerHTML = '<p>Sorry, could not fetch track data.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching track data:', error);
            document.getElementById('track-container').innerHTML = `<p>Error fetching track data. ${error.message}</p>`;
        });
}

fetchTrackInfo();
setInterval(fetchTrackInfo, 60000);
